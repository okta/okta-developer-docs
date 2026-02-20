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

  # Error page (only if multibrand isn't enabled)
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
