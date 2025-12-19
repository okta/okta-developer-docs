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
