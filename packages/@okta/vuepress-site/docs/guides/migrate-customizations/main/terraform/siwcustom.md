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
