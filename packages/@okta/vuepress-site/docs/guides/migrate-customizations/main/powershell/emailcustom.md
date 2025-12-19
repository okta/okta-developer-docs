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
