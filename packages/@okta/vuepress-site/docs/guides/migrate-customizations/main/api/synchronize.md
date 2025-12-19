```bash
# List existing brands
curl -X GET "${OKTA_ORG_URL}/api/v1/brands" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Accept: application/json"

# Most commonly, you'll work with your existing default brand (first in list)
BRAND_ID=$(curl -s -X GET "${OKTA_ORG_URL}/api/v1/brands" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Accept: application/json" | jq -r '.[0].id')

echo "Working with Brand ID: $BRAND_ID"

# Update the brand properties
curl -X PUT "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Acme Co. User Portal Brand",
    "agreeToCustomPrivacyPolicy": true,
    "customPrivacyPolicyUrl": "https://www.acme.com/privacy",
    "removePoweredByOkta": true,
    "locale": "en"
  }'

# To create a NEW custom brand (requires multibrand feature):
# curl -X POST "${OKTA_ORG_URL}/api/v1/brands" \
#   -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#   -H "Content-Type: application/json" \
#   -H "Accept: application/json" \
#   -d '{
#     "name": "Acme Co. User Portal Brand",
#     "agreeToCustomPrivacyPolicy": true,
#     "customPrivacyPolicyUrl": "https://www.acme.com/privacy",
#     "removePoweredByOkta": true,
#     "locale": "en"
#   }'
```
