---
title: Update the source app to use the new certificate
---

Update the source app with the updated key ID (`kid`) so that the source app uses the new credential to sign assertions.

Request: `PUT /api/v1/apps/0oa8ae1t5yev2ajDs0h7`

```json
{
  "name": "myorg_app1",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "signing": {
      "kid": "w__Yr9AElCftDtLP5CmjzZFMKXndqHtx7B3QPkg8jrI"
    }
  }
}
```

Response:

```json
{
  "id": "0oa8ae1t5yev2ajDs0h7",
  "name": "myorg_app1",
  "status": "ACTIVE",
  "lastUpdated": "2016-09-30T22:23:38.000Z",
  "created": "2016-09-27T22:51:53.000Z",
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "myorg_app1_link": true
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
  }
}
```

> **Note:** The response has been truncated for clarity.

<NextSectionLink/>
