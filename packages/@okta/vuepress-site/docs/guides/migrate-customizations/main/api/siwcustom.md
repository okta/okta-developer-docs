```bash
# Get theme ID
THEME_ID=$(curl -s -X GET "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/themes" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Accept: application/json" | jq -r '.[0].id')

echo "Updating Theme ID: $THEME_ID"

# Update theme colors and variants
curl -X PUT "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/themes/${THEME_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "primaryColorHex": "#0047AB",
    "secondaryColorHex": "#f0f4f8",
    "primaryColorContrastHex": "#FFFFFF",
    "secondaryColorContrastHex": "#000000",
    "signInPageTouchPointVariant": "BACKGROUND_SECONDARY_COLOR",
    "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
    "errorPageTouchPointVariant": "OKTA_DEFAULT",
    "emailTemplateTouchPointVariant": "OKTA_DEFAULT"
  }'

echo "Theme updated successfully"

# Optional: Upload logo (multipart/form-data)
# curl -X POST "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/themes/${THEME_ID}/logo" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -F "file=@./assets/logo.png"

# Optional: Upload background image
# curl -X POST "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/themes/${THEME_ID}/background-image" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -F "file=@./assets/background.jpg"
```
