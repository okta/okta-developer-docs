---
title: Update the key credential for the app to specify the new signing key id
---

Call the [Apps API](/docs/reference/api/apps/#update-key-credential-for-application) with the app ID you obtained in Step 1. In the body, include
the app name and the app label that you obtained in Step 1, the key ID that you obtained in Step 2, and the value *SAML_2_0* for the sign on mode.

Request:

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "appname",
  "label": "Application Name",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg9jrI"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/${aid}"

```

<NextSectionLink/>
