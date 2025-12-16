---
title: Migrate your brand customizations with automation
meta:
  - name: description
    content: Migrate your brand customizations from a test to production org using Terraform, PowerShell, or Go automation.
layout: Guides
---

This guide details how to automate copying custom branding settings&mdash;including themes, email content, and error page HTML&mdash;from an Okta test environment to a live production environment.

#### Learning outcomes

Configure and run a brand customization synchronization from a test or preview environment to a production environment using automated tools.

#### What you need

* A branded Okta test or preview org and a production Okta org
* Automated tooling (Terraform provider, PowerShell module, or Okta CLI client)
* Okta Terraform provider 4.9.1 or later (for Terraform users)
* PowerShell 7.0+ and Okta.PowerShell module v2.0.2+ (for PowerShell users)
* Go-based okta-cli-client (for CLI users - currently in beta, requires source compilation)

## Prerequisites and tool setup

This guide assumes that you have already registered and verified separate custom domains for your test and production environments (for example, `test.example.com` and `portal.example.com`).

> **Important:** Brands can be created programmatically, but **themes are automatically generated** when a brand is created. You must import existing themes before you can manage them with automation tools. This guide demonstrates the proper import workflow.

### Limitations

* The Okta Management API doesn't provide endpoints to customize the generic, system-generated SMS messages (such as those used for MFA codes). This functionality remains limited to the Admin Console interface.
* Themes cannot be created or deleted programmatically - each brand automatically receives exactly one theme that can only be read and updated.
* Custom error page HTML content cannot be modified when multibrand customization is enabled in your org.

### Terraform environment setup

#### Provider configuration with OAuth 2.0

Okta recommends using OAuth 2.0 with service apps for automation. First, create an OAuth 2.0 service app in your Okta Admin Console:

1. Sign in to your Okta Admin Console
2. Navigate to **Applications** > **Applications**
3. Click **Create App Integration**
4. Select **API Services** and click **Next**
5. Enter a name (e.g., "Terraform Automation")
6. Click **Save**
7. Note the **Client ID** 
8. Generate a public/private key pair for authentication (see [Okta documentation](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-a-public-private-key-pair))
9. Ensure the private key is in PKCS#1 format (begins with `-----BEGIN RSA PRIVATE KEY-----`). If your key begins with `-----BEGIN PRIVATE KEY-----` (PKCS#8 format), convert it:
   ```bash
   openssl rsa -in original-key.pem -out rsa-key.pem -traditional
   ```
10. **Grant OAuth Scopes:** Click the **Okta API Scopes** tab and grant: `okta.brands.manage`, `okta.brands.read`, `okta.templates.manage`, `okta.domains.manage`
11. **Assign Admin Roles:** Click the **Admin Roles** tab, then click **Edit assignments** and assign the appropriate admin role (e.g., Super Administrator for testing, or a custom role with brand management permissions). Note that both scopes and admin role assignment are required for authentication to succeed.

Create a Terraform configuration file with the Okta provider:

```hcl
terraform {
  required_providers {
    okta = {
      source  = "okta/okta"
      version = "~> 4.9.1"
    }
  }
  
  # Backend configuration for state management
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "okta" {
  org_name     = var.okta_org_name
  base_url     = var.okta_base_url
  client_id    = var.okta_client_id
  scopes       = ["okta.brands.manage", "okta.brands.read", "okta.templates.manage"]
  private_key  = file(var.okta_private_key_path)  # Use file() function to read the key
}

# Variables for environment switching
variable "okta_org_name" {
  type        = string
  description = "Okta organization name (subdomain)"
}

variable "okta_base_url" {
  type        = string
  description = "Okta base URL"
  default     = "okta.com"
}

variable "okta_client_id" {
  type        = string
  description = "OAuth 2.0 service app client ID"
  sensitive   = true
}

variable "okta_private_key_path" {
  type        = string
  description = "Path to private key file (must be PKCS#1 RSA format)"
  sensitive   = true
}

variable "target_domain_name" {
  type        = string
  description = "Custom domain for this environment"
}
```

#### Environment-specific variable files

Create separate `.tfvars` files for each environment:

**test.tfvars:**
```hcl
okta_org_name         = "dev-test"
okta_base_url         = "oktapreview.com"
okta_client_id        = "0oa1234567890abcdef"
okta_private_key_path = "./keys/test-private-key.pem"
target_domain_name    = "test.example.com"
```

**production.tfvars:**
```hcl
okta_org_name         = "acme-prod"
okta_base_url         = "okta.com"
okta_client_id        = "0oa9876543210fedcba"
okta_private_key_path = "./keys/prod-private-key.pem"
target_domain_name    = "portal.example.com"
```

> **Security Note:** Never commit private keys to version control. Add `*.pem` and `keys/` to your `.gitignore` file. Consider using environment variables or a secrets management system like HashiCorp Vault for production.

**Usage:**
```bash
# For test environment
terraform apply -var-file="test.tfvars"

# For production environment
terraform apply -var-file="production.tfvars"
```

### PowerShell module authentication

The Okta.PowerShell module requires PowerShell 7.0+ and should use OAuth device flow authentication for security best practices.

#### OAuth Device Flow Authentication (Recommended)

First, create an OIDC Native Application in your Okta Admin Console:

1. Navigate to **Applications** > **Applications** > **Create App Integration**
2. Select **OIDC - OpenID Connect**
3. Select **Native Application**
4. Enter a name (e.g., "PowerShell Brand Management")
5. Grant type: Enable **Device Authorization**
6. Add required scopes: `okta.brands.manage`, `okta.brands.read`, `okta.templates.manage`
7. In **Assignments**, assign the appropriate users or groups who will run the scripts
8. Note the **Client ID**

Then configure PowerShell:

```powershell
# Install the module (one time)
Install-Module -Name Okta.PowerShell -Scope CurrentUser

# Configure for your target environment
$Configuration = Get-OktaConfiguration
$Configuration.BaseUrl = 'https://your-org.okta.com'  # Change per environment
$Configuration.ClientId = 'your_client_id'
$Configuration.Scope = "okta.brands.manage okta.brands.read okta.templates.manage"

# This will open a browser for authentication
Invoke-OktaEstablishAccessToken

# Verify connection
try {
    $brands = Invoke-OktaListBrands
    Write-Host "Successfully connected to $($Configuration.BaseUrl)"
    Write-Host "Found $($brands.Count) brand(s)"
} catch {
    Write-Error "Failed to connect: $_"
}
```

### API authentication

Your OAuth access token can be obtained using the client credentials flow with your service app credentials. Set environment variables to switch between test and production environments.

```bash
# Set variables for test environment
export OKTA_ORG_URL="https://dev-test.oktapreview.com"
export OKTA_CLIENT_ID="0oa1234567890abcdef"
export OKTA_PRIVATE_KEY_PATH="./keys/test-private-key.pem"

# To target production, change these variables:
# export OKTA_ORG_URL="https://acme-prod.okta.com"
# export OKTA_CLIENT_ID="0oa9876543210fedcba"
# export OKTA_PRIVATE_KEY_PATH="./keys/prod-private-key.pem"
```

To obtain an access token, you'll need to create a JWT and exchange it for an OAuth access token. This process is handled automatically by Terraform and PowerShell, but for direct API calls you can use a helper script or library to generate the JWT.

## Define reusable branding content

All customization logic is centralized into reusable blocks (content strings) that are applied identically across both environments.

### Terraform (HCL content blocks)

Create a `locals.tf` file with reusable content strings:

```hcl
locals {
  # Brand metadata
  brand_name = "Acme Co. User Portal Brand"
  
  # Theme colors
  primary_color                    = "#0047AB"
  secondary_color                  = "#f0f4f8"
  primary_color_contrast          = "#FFFFFF"
  secondary_color_contrast        = "#000000"
  
  # Shared HTML for User Activation Email Body (VTL/Velocity supported)
  user_activation_email = <<EOT
    <html>
      <body style="font-family: Arial, sans-serif;">
        <p>Hello $${user.profile.firstName},</p>
        <p>Your new account has been created at $${org.name}.</p>
        <p>Click <a href="$${activationLink}">Activate My Account</a> to get started.</p>
        <p>Thank you!</p>
      </body>
    </html>
  EOT
  
  # Note: Custom error page HTML can only be modified if multibrand 
  # customization is NOT enabled in your org
  custom_error_page_html = <<EOT
    <div style="text-align: center; padding: 50px; font-family: sans-serif;">
      <h1 style="color: #0047AB;">Oops! Something Went Wrong.</h1>
      <p style="font-size: 1.2em;">We encountered an unexpected error.</p>
      <p>Please check the URL or try again later.</p>
      <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; 
                         background-color: #0047AB; color: white; text-decoration: none; 
                         border-radius: 5px;">Go Home</a>
    </div>
  EOT
}
```

### PowerShell (string variables)

Create a configuration script with reusable variables:

```powershell
# brands-config.ps1
$BrandName = "Acme Co. User Portal Brand"

# Theme colors
$ThemeColors = @{
    primaryColorHex                    = "#0047AB"
    primaryColorContrastHex            = "#FFFFFF"
    secondaryColorHex                  = "#f0f4f8"
    secondaryColorContrastHex          = "#000000"
    signInPageTouchPointVariant        = "BACKGROUND_SECONDARY_COLOR"
    endUserDashboardTouchPointVariant  = "OKTA_DEFAULT"
    errorPageTouchPointVariant         = "OKTA_DEFAULT"
    emailTemplateTouchPointVariant     = "OKTA_DEFAULT"
}

# Email templates
$UserActivationBody = @'
<html>
  <body style="font-family: Arial, sans-serif;">
    <p>Hello ${user.profile.firstName},</p>
    <p>Your new account has been created at ${org.name}.</p>
    <p>Click <a href="${activationLink}">Activate My Account</a> to get started.</p>
    <p>Thank you!</p>
  </body>
</html>
'@

# Error page (only if multibrand NOT enabled)
$CustomErrorPageHTML = @'
<div style="text-align: center; padding: 50px; font-family: sans-serif;">
  <h1 style="color: #0047AB;">Oops! Something Went Wrong.</h1>
  <p style="font-size: 1.2em;">We encountered an unexpected error.</p>
  <p>Please check the URL or try again later.</p>
  <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; 
                     background-color: #0047AB; color: white; text-decoration: none; 
                     border-radius: 5px;">Go Home</a>
</div>
'@
```

## Synchronize branding metadata

This section shows how to manage brands in each target environment. You can either work with the existing default brand or create new custom brands (if multibrand is enabled).

### Terraform: Option 1 - Customize existing default brand

Most orgs will want to customize their existing default brand:

```hcl
# main.tf

# First, discover the existing default brand
data "okta_brands" "test" {}

# Import the default brand (first brand in the list)
import {
  to = okta_brand.default_brand
  id = tolist(data.okta_brands.test.brands)[0].id
}

# Now manage the default brand
resource "okta_brand" "default_brand" {
  name                            = "Acme Co. Portal"  # You can rename it
  agree_to_custom_privacy_policy  = true
  custom_privacy_policy_url       = "https://www.acme.com/privacy"
  remove_powered_by_okta          = true
  locale                          = "en"
}
```

### Terraform: Option 2 - Create new custom brand (requires multibrand)

If your org has multibrand enabled and you want to create a new brand:

```hcl
# main.tf

# Create a new custom brand (requires multibrand feature)
resource "okta_brand" "custom_app_brand" {
  name                            = local.brand_name
  agree_to_custom_privacy_policy  = true
  custom_privacy_policy_url       = "https://www.acme.com/privacy"
  remove_powered_by_okta          = true
  locale                          = "en"
}

# Associate with a custom domain (domain must exist first)
# resource "okta_domain" "custom" {
#   name                    = var.target_domain_name
#   brand_id                = okta_brand.custom_app_brand.id
#   certificate_source_type = "OKTA_MANAGED"  # or "MANUAL"
# }
```

> **Note:** Creating new brands requires the multibrand feature to be enabled in your Okta org. If you're unsure, start with Option 1 (customizing the default brand).

### PowerShell CLI: Working with brands

PowerShell can work with both the default brand and custom brands:

```powershell
# Source your configuration
. .\brands-config.ps1

# List existing brands to see what you have
$existingBrands = Invoke-OktaListBrands
Write-Host "Found $($existingBrands.Count) brand(s) in your org"

# Option 1: Work with the default/first brand (most common)
$targetBrand = $existingBrands[0]
Write-Host "Working with brand: $($targetBrand.name) (ID: $($targetBrand.id))"

# Update the brand properties
$updateParams = @{
    name                          = $BrandName
    agreeToCustomPrivacyPolicy    = $true
    customPrivacyPolicyUrl        = "https://www.acme.com/privacy"
    removePoweredByOkta           = $true
    locale                        = "en"
}

$targetBrand = Update-OktaBrand -BrandId $targetBrand.id -Brand $updateParams
$BrandId = $targetBrand.id

# Option 2: Create a new custom brand (requires multibrand feature)
# Note: Brand creation via PowerShell requires using the API directly
# $brandPayload = @{
#     name                          = $BrandName
#     agreeToCustomPrivacyPolicy    = $true
#     customPrivacyPolicyUrl        = "https://www.acme.com/privacy"
#     removePoweredByOkta           = $true
#     locale                        = "en"
# } | ConvertTo-Json -Depth 10
# 
# $newBrand = Invoke-OktaApi -Uri "api/v1/brands" -Method POST -Body $brandPayload
# $BrandId = $newBrand.id

Write-Host "Brand ID for operations: $BrandId"
```

### API

```bash
# List existing brands
curl -X GET "${OKTA_ORG_URL}/api/v1/brands" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Accept: application/json"

# Most commonly, you'll work with your existing default brand (first in list)
BRAND_ID=$(curl -s -X GET "${OKTA_ORG_URL}/api/v1/brands" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Accept: application/json" | jq -r '.[0].id')

echo "Working with Brand ID: $BRAND_ID"

# Update the brand properties
curl -X PUT "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Acme Co. User Portal Brand",
    "agreeToCustomPrivacyPolicy": true,
    "customPrivacyPolicyUrl": "https://www.acme.com/privacy",
    "removePoweredByOkta": true,
    "locale": "en"
  }'

# To create a NEW custom brand (requires multibrand feature):
# curl -X POST "${OKTA_ORG_URL}/api/v1/brands" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -H "Content-Type: application/json" \
#   -H "Accept: application/json" \
#   -d '{
#     "name": "Acme Co. User Portal Brand",
#     "agreeToCustomPrivacyPolicy": true,
#     "customPrivacyPolicyUrl": "https://www.acme.com/privacy",
#     "removePoweredByOkta": true,
#     "locale": "en"
#   }'
```

## Apply Sign-In Widget customization

**Critical:** Themes are automatically created when a brand is created and cannot be created directly. You must import existing themes before managing them.

### Terraform

```hcl
# Get the list of themes for the brand
data "okta_themes" "brand_themes" {
  brand_id = okta_brand.custom_app_brand.id
}

# Import the auto-generated theme (required step!)
import {
  to = okta_theme.custom_theme
  id = "${okta_brand.custom_app_brand.id}/${tolist(data.okta_themes.brand_themes.themes)[0].id}"
}

# Now manage the theme
resource "okta_theme" "custom_theme" {
  brand_id = okta_brand.custom_app_brand.id
  theme_id = tolist(data.okta_themes.brand_themes.themes)[0].id
  
  # Required color settings
  primary_color_hex              = local.primary_color
  secondary_color_hex            = local.secondary_color
  primary_color_contrast_hex     = local.primary_color_contrast
  secondary_color_contrast_hex   = local.secondary_color_contrast
  
  # Required touch point variants
  sign_in_page_touch_point_variant       = "BACKGROUND_SECONDARY_COLOR"
  end_user_dashboard_touch_point_variant = "OKTA_DEFAULT"
  error_page_touch_point_variant         = "OKTA_DEFAULT"
  email_template_touch_point_variant     = "OKTA_DEFAULT"
  
  # Optional: Custom images (provide local file paths)
  # logo             = "${path.module}/assets/logo.png"
  # favicon          = "${path.module}/assets/favicon.ico"
  # background_image = "${path.module}/assets/background.jpg"
}
```

### PowerShell CLI

```powershell
# Get the theme for the brand
$themes = Invoke-OktaListBrandThemes -BrandId $BrandId
$themeId = $themes[0].id

Write-Host "Updating theme: $themeId"

# Update the theme with custom settings
$themeUpdate = [PSCustomObject]$ThemeColors

try {
    $updatedTheme = Update-OktaBrandTheme -BrandId $BrandId -ThemeId $themeId -Theme $themeUpdate
    Write-Host "Successfully updated theme"
    
    # Optional: Upload custom logo
    # Invoke-OktaUploadBrandThemeLogo -BrandId $BrandId -ThemeId $themeId -File ".\assets\logo.png"
    
    # Optional: Upload background image
    # Invoke-OktaUploadBrandThemeBackgroundImage -BrandId $BrandId -ThemeId $themeId -File ".\assets\background.jpg"
    
} catch {
    Write-Error "Failed to update theme: $_"
}
```

### API

```bash
# Get theme ID
THEME_ID=$(curl -s -X GET "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/themes" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Accept: application/json" | jq -r '.[0].id')

echo "Updating Theme ID: $THEME_ID"

# Update theme colors and variants
curl -X PUT "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/themes/${THEME_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "primaryColorHex": "#0047AB",
    "secondaryColorHex": "#f0f4f8",
    "primaryColorContrastHex": "#FFFFFF",
    "secondaryColorContrastHex": "#000000",
    "signInPageTouchPointVariant": "BACKGROUND_SECONDARY_COLOR",
    "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
    "errorPageTouchPointVariant": "OKTA_DEFAULT",
    "emailTemplateTouchPointVariant": "OKTA_DEFAULT"
  }'

echo "Theme updated successfully"

# Optional: Upload logo (multipart/form-data)
# curl -X POST "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/themes/${THEME_ID}/logo" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -F "file=@./assets/logo.png"

# Optional: Upload background image
# curl -X POST "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/themes/${THEME_ID}/background-image" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -F "file=@./assets/background.jpg"
```

## Apply email template customization

Synchronizes email template content across environments.

### Terraform

```hcl
resource "okta_email_customization" "user_activation" {
  brand_id      = okta_brand.custom_app_brand.id
  template_name = "UserActivation"
  language      = "en"
  is_default    = true
  subject       = "Welcome to Acme Co - Activate Your Account"
  body          = local.user_activation_email
}

# Additional templates
resource "okta_email_customization" "forgot_password" {
  brand_id      = okta_brand.custom_app_brand.id
  template_name = "ForgotPassword"
  language      = "en"
  is_default    = true
  subject       = "Reset Your Acme Co Password"
  body          = <<EOT
    <html>
      <body style="font-family: Arial, sans-serif;">
        <p>Hello $${user.profile.firstName},</p>
        <p>Click <a href="$${resetPasswordLink}">Reset Password</a> to reset your password.</p>
        <p>This link expires in $${tokenExpirationHours} hours.</p>
      </body>
    </html>
  EOT
}
```

### PowerShell CLI

```powershell
# Create or update User Activation email template
$emailCustomization = @{
    subject   = "Welcome to Acme Co - Activate Your Account"
    language  = "en"
    isDefault = $true
    body      = $UserActivationBody
}

$emailPayload = $emailCustomization | ConvertTo-Json -Depth 10

try {
    # Try to create the customization
    $result = Invoke-OktaApi -Uri "api/v1/brands/$BrandId/templates/email/UserActivation/customizations" `
                              -Method POST `
                              -Body $emailPayload
    Write-Host "Created UserActivation email template"
} catch {
    if ($_.Exception.Response.StatusCode -eq 409) {
        # Already exists, update it instead
        Write-Host "Email template exists, updating..."
        
        # Get existing customization ID
        $existing = Invoke-OktaApi -Uri "api/v1/brands/$BrandId/templates/email/UserActivation/customizations"
        $customizationId = $existing[0].id
        
        $result = Invoke-OktaApi -Uri "api/v1/brands/$BrandId/templates/email/UserActivation/customizations/$customizationId" `
                                  -Method PUT `
                                  -Body $emailPayload
        Write-Host "Updated UserActivation email template"
    } else {
        Write-Error "Failed to customize email template: $_"
    }
}
```

### API

```bash
# Create or update UserActivation email template customization
# Note: EMAIL_BODY should contain your HTML email template
EMAIL_BODY='<html><body style="font-family: Arial, sans-serif;"><p>Hello ${user.profile.firstName},</p><p>Your new account has been created at ${org.name}.</p><p>Click <a href="${activationLink}">Activate My Account</a> to get started.</p><p>Thank you!</p></body></html>'

# Create a new customization (if it doesn't exist)
curl -X POST "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/templates/email/UserActivation/customizations" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{
    \"language\": \"en\",
    \"isDefault\": true,
    \"subject\": \"Welcome to Acme Co - Activate Your Account\",
    \"body\": $(echo "$EMAIL_BODY" | jq -Rs .)
  }"

# Or update an existing customization
# First get the customization ID
# CUSTOMIZATION_ID=$(curl -s -X GET "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/templates/email/UserActivation/customizations" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -H "Accept: application/json" | jq -r '.[0].id')
#
# curl -X PUT "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/templates/email/UserActivation/customizations/${CUSTOMIZATION_ID}" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -H "Content-Type: application/json" \
#   -H "Accept: application/json" \
#   -d "{
#     \"language\": \"en\",
#     \"isDefault\": true,
#     \"subject\": \"Welcome to Acme Co - Activate Your Account\",
#     \"body\": $(echo "$EMAIL_BODY" | jq -Rs .)
#   }"

echo "Email template customization applied"
```

## Apply error page customization

**Important:** Custom error page HTML content cannot be modified if multibrand customization is enabled in your org. This section only applies to orgs without multibrand.

### Terraform

```hcl
# Note: Custom error page HTML content cannot be modified if multibrand 
# customization is enabled in your org.
# 
# Error pages are managed through the Custom Pages API, but Terraform 
# support for custom error page content is limited. 
#
# For most use cases, error page branding is controlled through the 
# theme resource (colors, logos, etc.) rather than custom HTML.
```

### PowerShell CLI

```powershell
# Note: This only works if multibrand customization is NOT enabled
try {
    $pagePayload = @{
        pageContent = $CustomErrorPageHTML
    } | ConvertTo-Json -Depth 10
    
    Invoke-OktaApi -Uri "api/v1/brands/$BrandId/pages/sign-in/customized" `
                   -Method PUT `
                   -Body $pagePayload
    
    Write-Host "Error page customization applied"
} catch {
    if ($_.Exception.Message -like "*403*") {
        Write-Warning "Error page customization is disabled (multibrand may be enabled)"
    } else {
        Write-Error "Failed to update error page: $_"
    }
}
```

### API

```bash
# Note: Error page HTML customization is only supported when multibrand is NOT enabled
# This API call may return 403 if multibrand customization is enabled in your org

ERROR_PAGE_HTML='<div style="text-align: center; padding: 50px; font-family: sans-serif;"><h1 style="color: #0047AB;">Oops! Something Went Wrong.</h1><p style="font-size: 1.2em;">We encountered an unexpected error.</p><p>Please check the URL or try again later.</p><a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0047AB; color: white; text-decoration: none; border-radius: 5px;">Go Home</a></div>'

curl -X PUT "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/pages/sign-in/customized" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{
    \"pageContent\": $(echo "$ERROR_PAGE_HTML" | jq -Rs .)
  }"

# If you receive a 403 error, multibrand customization is enabled
# and error page HTML customization is not available
echo "Error page customization applied (if multibrand is not enabled)"
```

## Final synchronization step

After the content is defined in the script or configuration file:

1. Run against the test environment: Execute your chosen tool (Terraform `apply`, PowerShell script, or cURL commands) using the test environment variables or context.
1. Verify: Manually test the customization on your test custom domain (https://test.example.com/login/default).
1. Run against production: Change your environment variables (or tool configuration) to target production and re-run the exact same script or configuration. The code is designed to be idempotent and creates the brand in production using the production domain ID.
