There are two options when you want to synchronize branding metadata with Terraform:

1. [Customize the existing default brand](#customize-the-existing-default-brand)
2. [Create a custom brand (requires multibrand)](#create-a-custom-brand-requires-multibrand)

### Customize the existing default brand

Most orgs want to customize their existing default brand:

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

### Create a custom brand (requires multibrand)

If your org has multibrand enabled and you want to create a brand, use the following example:

```hcl
# main.tf

# Create a new custom brand (requires the multibrand feature)
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

> **Note:** To create brands, you need the multibrand feature enabled in your Okta org. If you're unsure, start with customizing the default brand.
