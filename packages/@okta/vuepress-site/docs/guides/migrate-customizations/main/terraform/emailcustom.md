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
