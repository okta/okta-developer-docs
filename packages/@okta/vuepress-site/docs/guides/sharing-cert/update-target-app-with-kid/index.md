---
title: Update the target app to use the new credential
---

Update the target app to use the new application key credential that you just shared. When you update the target app with the source app's key ID `kid`, the target app starts using the same certificate to sign assertions.

Request: `PUT /api/v1/apps/0oa8ae0dv4RGQvjyZ0h7`

```json
{
  "name": "myorg_app2",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI"
    }
  }
}
```

Response:

``` json
{
  "id": "0oa8ae0dv4RGQvjyZ0h7",
  "name": "myOrg_app2",
  "label": "App 2",
  "status": "ACTIVE",
  "lastUpdated": "2016-10-03T16:53:50.000Z",
  "created": "2016-09-27T22:53:34.000Z",
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "myorg_app2_link": true
    }
  },
  "features": [],
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI"
    }
  },
}
```

> **Note:** The response has been truncated for clarity.

<NextSectionLink>Next Steps</NextSectionLink>
