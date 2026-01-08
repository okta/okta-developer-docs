```powershell
# Note: This only works if multibrand customization isn't enabled
try {
    $pagePayload = @{
        pageContent = $CustomErrorPageHTML
    } | ConvertTo-Json -Depth 10

    Invoke-OktaApi -Uri "api/v1/brands/$BrandId/pages/sign-in/customized" `
                   -Method PUT `
                   -Body $pagePayload

    Write-Host "Error page customization applied"
} catch {
    if ($_.Exception.Message -like "*403*") {
        Write-Warning "Error page customization is disabled (multibrand may be enabled)"
    } else {
        Write-Error "Failed to update error page: $_"
    }
}
```
