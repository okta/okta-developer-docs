---
title: List your apps
---

* For Outbound SAML, use the [Apps API](/docs/reference/api/apps/#list-applications) to return a list of all apps and collect the app `id` for each app that you want to update.

* For Inbound SAML, use the [IdPs API](/docs/reference/api/idps/#list-identity-providers-with-defaults) to return a list of all Identity Providers (IdP) and collect the full response for each IdP that you want to update.

The following example shows a call for Outbound SAML apps.

Request: `GET /api/v1/apps`

Truncated Response:

```json
{
    "id": "00000id1U3iyFqLu0g4",
    "name": "appname",
    "label": "Application Name",
    "status": "ACTIVE",
    "lastUpdated": "2015-01-24T00:09:01.000Z",
    "created": "2014-01-06T23:42:40.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null,
      "loginRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": true,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "login": true
      }
    },
    "features": [],
    "signOnMode": "SAML_2_0",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      },
      "revealPassword": true,
      "signing": {
        "kid": "ZcLGUsl4Xn3996YYel6KPvOxZOhNWfly5-q36CByH4o"
      }
    },
    "settings": {
      "app": {
        "instanceType": null
      },
      "notifications": {
        "vpn": {
          "network": {
            "connection": "DISABLED"
          },
          "message": null,
          "helpUrl": null
        }
      }
    }
  }
```

<NextSectionLink/>
