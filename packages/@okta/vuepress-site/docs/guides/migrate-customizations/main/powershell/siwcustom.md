```powershell
# Get the theme for the brand
$themes = Invoke-OktaListBrandThemes -BrandId $BrandId
$themeId = $themes[0].id

Write-Host "Updating theme: $themeId"

# Update the theme with custom settings
$themeUpdate = [PSCustomObject]$ThemeColors

try {
    $updatedTheme = Update-OktaBrandTheme -BrandId $BrandId -ThemeId $themeId -Theme $themeUpdate
    Write-Host "Successfully updated theme"

    # Optional: Upload custom logo
    # Invoke-OktaUploadBrandThemeLogo -BrandId $BrandId -ThemeId $themeId -File ".\assets\logo.png"

    # Optional: Upload background image
    # Invoke-OktaUploadBrandThemeBackgroundImage -BrandId $BrandId -ThemeId $themeId -File ".\assets\background.jpg"

} catch {
    Write-Error "Failed to update theme: $_"
}
```
