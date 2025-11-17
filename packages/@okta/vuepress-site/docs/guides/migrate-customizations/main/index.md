---
title: Migrate your brand customizations with automation
excerpt: Migrate your brand customizations from a test to production org using Terrafrom, PowerShell, or Go automation.
layout: Guides
---

This guide details how to automate the process of copying custom branding settings &mdash;including CSS, email content, and error page HTML &mdash;from an Okta test environment to a live production environment.

#### Learning outcomes

Configure and run a brand customization synchronization from a test or preview environment to a production environment using automated tools.

#### What you need

* A branded Okta test or preview org and a production Okta org
* Automated tooling (Terraform Provider, PowerShell Module, or Okta Go CLI)

## Prerequisites and tool setup

This guide assumes you have already registered and verified separate custom domains for your test and production environments (for example, `test.example.com` and `portal.example.com`). Okta also assumes your Terraform or CLI tools are fully authenticated and configured.

>**New to these tools?** If you have not configured authentication or installed the necessary SDKs (Terraform Provider, PowerShell Module, Okta Go CLI), refer to the introductory guides on the respective GitHub repositories before proceeding.

### Terraform environment setup

Define environment variables that control the target organization and API key. Synchronization is achieved by switching these variables before running `terraform apply`.

```hcl
# Set variables for UAT environment execution
export OKTA_ORG_URL="[https://test.example.com](https://test.example.com)"
export OKTA_API_TOKEN="test_api_token"
export UAT_DOMAIN_NAME="test.example.com"

# To target PRODUCTION, change these variables:
# export OKTA_ORG_URL="[https://portal.example.com](https://portal.example.com)"

# export OKTA_API_TOKEN="prod_api_token"
# export PROD_DOMAIN_NAME="portal.example.com"
```

### PowerShell CLI authentication

```powershell
# Run this once per session to authenticate against the target organization
Invoke-OktaEstablishAccessToken
# Note: Ensure your environment variables or profile settings target the correct Org URL.
```

### Go CLI and API authentication

Your API token is managed by `okta configure`. You need to switch the `ORG_URL` environment variable for synchronization.

```go
# Set variables for UAT environment execution
ORG_URL="[https://test.example.com](https://test.example.com)"

# To target PRODUCTION, change this:
# ORG_URL="[https://portal.example.com](https://portal.example.com)"
```

## Define resuable branding content

All customization logic is centralized into reusable blocks (content strings) that are applied identically across both environments.

### Terraform (HCL content blocks)

These are the reusable content strings used in the core `main.tf` file.

```hcl
# Shared CSS for Sign-In Widget
locals {
  custom_signin_css = <<EOT
    <style>
      .auth-content { background-color: #f0f4f8 !important; }
      .o-form-button-bar .button-primary {
        background-color: #0047AB !important;
        border-color: #0047AB !important;
      }
    </style>
  EOT

  # Shared HTML for User Activation Email Body (VTL supported)
  user_activation_email = <<EOT
    <html>
      <body>
        <p>Hello ${"$"}user.profile.firstName,</p>
        <p>Your new account has been created. Click <a href="${"$"}activationLink">Activate My Account</a> to get started.</p>
        <p>Thank you!</p>
      </body>
    </html>
  EOT

  # Shared HTML for Custom Error Page
  custom_error_page_html = <<EOT
    <div style="text-align: center; padding: 50px; font-family: sans-serif;">
      <h1 style="color: #0047AB;">Oops! Something Went Wrong.</h1>
      <p style="font-size: 1.2em;">We encountered an unexpected error. Please check the URL or try again.</p>
      <p>Error details: <code style="color: #cc0000;">{{message}}</code></p>
      <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0047AB; color: white; text-decoration: none; border-radius: 5px;">Go Home</a>
    </div>
  EOT
}
```

### PowerShell CLI (string variables)

The content is stored in PowerShell strings, ready to be injected through `Set-OktaTheme` or `Invoke-OktaRestMethod`.

```powershell
$BrandName = "Example Co. User Portal Brand"

$CustomCSS = @'
    <style>
      .auth-content { background-color: #f0f4f8 !important; }
      .o-form-button-bar .button-primary { background-color: #0047AB !important; border-color: #0047AB !important; }
    </style>
'@

$UserActivationBody = @'
    <html><body><p>Hello ${user.profile.firstName},</p><p>Your new account has been created. Click <a href="${activationLink}">Activate My Account</a> to get started.</p><p>Thank you!</p></body></html>
'@

$CustomErrorPageHTML = @'
    <div style="text-align: center; padding: 50px; font-family: sans-serif;">
      <h1 style="color: #0047AB;">Oops! Something Went Wrong.</h1>
      ...
    </div>
'@
```

## Synchronize branding metadata

This step ensures the core brand object exists and is correctly linked to the custom domain of the target environment (test or production).

### Terraform

The `terraform apply` command handles both environments by fetching the appropriate domain ID based on the `target_domain` variable.

```terraform
# Use a variable to define the target domain name for this run
variable "target_domain_name" { type = string } 

data "okta_custom_domain" "portal" {
  name = var.target_domain_name
}

resource "okta_brand" "custom_app_brand" {
  name             = "Acme Co. User Portal Brand"
  is_default       = false 
  # Links to the domain found in the 'data' block (UAT or PROD domain)
  custom_domain_id = data.okta_custom_domain.portal.id 
  theme_id         = "primary" 
}
```

### PowerShell CLI

Script to create or update the brand object and get its ID.

```PowerShell
$BrandProperties = @{
    Name = $BrandName
    IsDefault = $false
    # Note: Assumes $DomainId was retrieved for the target environment
    CustomDomainId = $DomainId
}
$Brand = Get-OktaBrand | Where-Object { $_.Name -eq $BrandName }
if (-not $Brand) {
    $Brand = New-OktaBrand -Properties $BrandProperties
}
$BrandId = $Brand.Id
Write-Host "Brand ID for target environment: $BrandId"
```

### Go CLI or API

Requires manual identification of the brand ID or creating it through a direct API call.

```go
# --- 1. Find the Domain ID (Manual or via okta domains list) ---
DOMAIN_ID="<Target_Domain_ID>"

# --- 2. Create the Brand (if it doesn't exist) and set BRAND_ID ---
# Use the ORG_URL environment variable to target UAT or PROD
curl -v -X POST "${ORG_URL}/api/v1/brands" \
-H "Authorization: SSWS ${API_TOKEN}" \
-H "Content-Type: application/json" \
-d '{ "name": "Example User Portal Brand", "customDomainId": "'"${DOMAIN_ID}"'" }'
# Manually set the ID after creation:
# BRAND_ID="<Created_Brand_ID>"
```

## Apply Sign-in Widget customization

Applies the custom CSS (defined in section [Define resuable branding content](#define-resuable-branding-content)) to the Brand's theme in the target environment.

### Terraform

```hcl
resource "okta_customized_signin_page" "branded_signin" {
  brand_id    = okta_brand.custom_app_brand.id
  widget_customizations_xml = local.custom_signin_css
}
```

### PowerShell CLI

```powershell
$ThemeId = (Get-OktaBrand -BrandId $BrandId).DefaultThemeId
Set-OktaTheme -BrandId $BrandId -ThemeId $ThemeId -ExtraCss $CustomCSS
Write-Host "Sign-In Widget CSS synchronized."
```

### Go CLI or API

```go
THEME_ID=$(curl -s -X GET "${ORG_URL}/api/v1/brands/${BRAND_ID}/themes" \
-H "Authorization: SSWS ${API_TOKEN}" | jq -r '.[0].id')

curl -v -X PUT "${ORG_URL}/api/v1/brands/${BRAND_ID}/themes/${THEME_ID}" \
-H "Authorization: SSWS ${API_TOKEN}" \
-H "Content-Type: application/json" \
-d '{ "extraCss": "'"$(echo $CUSTOM_CSS | tr -d '\n')"'" }'
```

## Apply email template customization

Synchronizes the email content (defined in section [Define resuable branding content](#define-resuable-branding-content)) for key templates.

### Terraform

```terraform
resource "okta_email_customization" "user_activation_customization" {
  brand_id      = okta_brand.custom_app_brand.id
  template_name = "UserActivation"
  subject       = "Your Example Co. Account is Ready!"
  body          = local.user_activation_email
}
# Repeat this resource block for other templates like "ForgotPassword" and "Email"
```
### PowerShell CLI

```powershell
$EmailPayload = @{
    subject = "Your Example Co. Account is Ready!"
    language  = "en"
    isDefault = $true
    body    = $UserActivationBody
} | ConvertTo-Json -Depth 10

$CustomizationUri = "api/v1/brands/$BrandId/templates/email/UserActivation/customizations"
# Use POST to create or PUT to update
Invoke-OktaRestMethod -Uri $CustomizationUri -Method POST -Body $EmailPayload
Write-Host "User Activation email template synchronized."
```

### Go CLI or API

```go
# --- Customize User Activation Template ---
# Ensure ORG_URL is set to the correct environment (test or PROD)
curl -v -X POST "${ORG_URL}/api/v1/brands/${BRAND_ID}/templates/email/UserActivation/customizations" \
-H "Authorization: SSWS ${API_TOKEN}" \
-H "Content-Type: application/json" \
-d '{
    "subject": "Your Example Co. Account is Ready!",
    "body": "<html>...</html>",
    "language": "en",
    "isDefault": true
}'
```

## Apply error page customization

Applies the custom HTML for the hosted error page.

### Terraform

```terraform
resource "okta_custom_page" "error_page" {
  # Link to the target environment's custom domain
  custom_domain_id = data.okta_custom_domain.portal.id
  page_name        = "ERROR_PAGE"
  content          = local.custom_error_page_html
}
```

### PowerShell CLI

```powershell
$PageUri = "api/v1/brands/$BrandId/templates/pages/ERROR_PAGE"

$PagePayload = @{
    content = $CustomErrorPageHTML
} | ConvertTo-Json -Depth 10

Invoke-OktaRestMethod -Uri $PageUri -Method PUT -Body $PagePayload
Write-Host "Error Page content synchronized."
```

### Go CLI or API

```go
# Ensure ORG_URL is set to the correct environment (UAT or PROD)
curl -v -X PUT "${ORG_URL}/api/v1/brands/${BRAND_ID}/templates/pages/ERROR_PAGE" \
-H "Authorization: SSWS ${API_TOKEN}" \
-H "Content-Type: application/json" \
-d '{
    "content": "'"$(echo $CUSTOM_ERROR_PAGE_HTML | tr -d '\n')"'"
}'
```

## Final synchronization step

After the content is defined in the script or configuration file:

1. Run against the test environment: Execute your chosen tool (Terraform `apply`, PowerShell script, or cURL commands) using the test environment variables or context.
1. Verify: Manually test the customization on your test custom domain (https://test.example.com/login/default).
1. Run against production: Change your environment variables (or tool configuration) to target production and re-run the exact same script or configuration. The code is designed to be idempotent and creates the brand in production using the production domain ID.
