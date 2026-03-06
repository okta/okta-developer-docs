#### Provider configuration with OAuth 2.0

Okta recommends using OAuth 2.0 with service apps for automation. First, create an OAuth 2.0 service app in your Admin Console:

1. Sign in to your Admin Console.
1. Go to **Applications** > **Applications**, and click **Create App Integration**.
1. Select **API Services** and click **Next**.
1. Enter an app name like **Terraform Automation**, and click **Save**.
1. Note the **Client ID**.
1. In the **Public keys** section, generate a public/private key pair for authentication. See [Generate the JWK using the Admin Console](/docs/guides/implement-oauth-for-okta-serviceapp/main/#generate-the-jwk-using-the-admin-console).
1. Ensure that the private key is in PKCS#1 format (begins with `-----BEGIN RSA PRIVATE KEY-----`). If your key begins with `-----BEGIN PRIVATE KEY-----` (PKCS#8 format), convert it:

```bash
   openssl rsa -in original-key.pem -out rsa-key.pem -traditional
```

8. Click the **Okta API Scopes** tab and grant: `okta.brands.manage`, `okta.brands.read`, `okta.templates.manage`, `okta.domains.manage` for your app.
9. Click the **Admin roles** tab, and then click **Edit assignments**.
10. Assign the appropriate admin role (for example, super admin for testing or a custom role with brand management permissions). Note that both scopes and admin role assignment are required for authentication to succeed.

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

> **Note**: Never commit private keys to version control. Add `*.pem` and `keys/` to your `.gitignore` file. Consider using environment variables or a secrets management system like HashiCorp Vault for production.

**Use:**

```bash
  # For test environment
  terraform apply -var-file="test.tfvars"

  # For production environment
  terraform apply -var-file="production.tfvars"
```
