```bash
# Create or update UserActivation email template customization
# Note: EMAIL_BODY should contain your HTML email template
EMAIL_BODY='<html><body style="font-family: Arial, sans-serif;"><p>Hello ${user.profile.firstName},</p><p>Your new account has been created at ${org.name}.</p><p>Click <a href="${activationLink}">Activate My Account</a> to get started.</p><p>Thank you!</p></body></html>'

# Create a new customization (if it doesn't exist)
curl -X POST "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/templates/email/UserActivation/customizations" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{
    \"language\": \"en\",
    \"isDefault\": true,
    \"subject\": \"Welcome to Acme Co - Activate Your Account\",
    \"body\": $(echo "$EMAIL_BODY" | jq -Rs .)
  }"

# Or update an existing customization
# First get the customization ID
# CUSTOMIZATION_ID=$(curl -s -X GET "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/templates/email/UserActivation/customizations" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -H "Accept: application/json" | jq -r '.[0].id')
#
# curl -X PUT "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/templates/email/UserActivation/customizations/${CUSTOMIZATION_ID}" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -H "Content-Type: application/json" \
#   -H "Accept: application/json" \
#   -d "{
#     \"language\": \"en\",
#     \"isDefault\": true,
#     \"subject\": \"Welcome to Acme Co - Activate Your Account\",
#     \"body\": $(echo "$EMAIL_BODY" | jq -Rs .)
#   }"

echo "Email template customization applied"
```
