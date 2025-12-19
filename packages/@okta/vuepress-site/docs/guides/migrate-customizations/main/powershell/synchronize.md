### Working with brands

PowerShell can work with both the default brand and custom brands.

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
