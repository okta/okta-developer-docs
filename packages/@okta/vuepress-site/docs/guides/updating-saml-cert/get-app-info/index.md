---
title: Get the app info
---

Use the [List Apps API](/docs/reference/api/apps/#list-applications) to return a list of all apps.

For each app to update, collect the `id`, `name`, and `label` elements.

Request: `GET /api/v1/apps`

Truncated Response:

```json

{
    "id": "0000000000aaaaaBBBBBo",
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
