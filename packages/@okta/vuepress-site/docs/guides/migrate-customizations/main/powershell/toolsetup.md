The Okta.PowerShell module requires PowerShell 7.0+ and should use OAuth 2.0 device flow authentication as a security best practice.

#### Configure an app for OAuth 2.0 Device flow authentication (recommended)

Create an OIDC native app in your Admin Console:

1. Go to **Applications** > **Applications** > **Create App Integration**.
2. Select **OIDC - OpenID Connect**.
3. Select **Native Application**.
4. Enter a name like **PowerShell Brand Management**.
5. Enable **Device Authorization** as the grant type and click **Save**.
6. On the **Okta API Scopes** tab, grant the following scopes: `okta.brands.manage`, `okta.brands.read`, `okta.templates.manage`.
7. On the **Assignments** tab, assign the appropriate users or groups who you want to run the scripts.
8. Note the **Client ID**.

#### Configure PowerShell

```powershell
  # Install the module (one time)
  Install-Module -Name Okta.PowerShell -Scope CurrentUser

  # Configure for your target environment
  $Configuration = Get-OktaConfiguration
  $Configuration.BaseUrl = 'https://your-org.okta.com'  # Change per environment
  $Configuration.ClientId = 'your_client_id'
  $Configuration.Scope = "okta.brands.manage okta.brands.read okta.templates.manage"

  # This opens a browser for authentication
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
