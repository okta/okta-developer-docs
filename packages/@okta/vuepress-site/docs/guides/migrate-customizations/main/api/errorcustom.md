```bash
# Note: Error page HTML customization is only supported when multibrand is NOT enabled
# This API call may return 403 if multibrand customization is enabled in your org

ERROR_PAGE_HTML='<div style="text-align: center; padding: 50px; font-family: sans-serif;"><h1 style="color: #0047AB;">Oops! Something Went Wrong.</h1><p style="font-size: 1.2em;">We encountered an unexpected error.</p><p>Please check the URL or try again later.</p><a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0047AB; color: white; text-decoration: none; border-radius: 5px;">Go Home</a></div>'

curl -X PUT "${OKTA_ORG_URL}/api/v1/brands/${BRAND_ID}/pages/sign-in/customized" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{
    \"pageContent\": $(echo "$ERROR_PAGE_HTML" | jq -Rs .)
  }"

# If you receive a 403 error, multibrand customization is enabled
# and error page HTML customization is not available
echo "Error page customization applied (if multibrand is not enabled)"
```
