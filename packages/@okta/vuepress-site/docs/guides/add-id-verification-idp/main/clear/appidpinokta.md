Use the [IdP API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider) to add <StackSnippet snippet="idp" inline /> as an IDV vendor in Okta. Create your own `POST` request body or copy the [example request](#example-request) and input your values.

> **Note:** To add <StackSnippet snippet="idp" inline /> using the Admin Console, see [Add an Identity Verification vendor as Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=id-verification).

1. Set the following request body parameters:

    * Enter a value for `name`.
    * Set `type` to `IDV_CLEAR`.
    * Set `ID_PROOFING` as the protocol type.
    * Use the **Client ID** and **Client Secret** values from the [previous section](#create-an-app-at-the-idv-vendor) as the `client_id` and `client_secret` values.
    * Set the `scopes` array to include the `profile`, `identity_assurance`, and `openid` scopes.
      * `profile`: This scope allows the IDV vendor to request access to basic user profile information from Okta.
      * `identity_assurance`: This scope requests access to the `verified_claims` object so that the IDV vendor can send and receive information about the level of assurance of the IDV flow.
      * `openid`: This scope is required to make the request an OpenID Connect (OIDC) request.

1. Send the `POST /api/v1/idps` request.

1. After you create the IDV vendor, copy the value of `id` from the response body and paste it into a text editor. Use it in the next section.

### Example request

```json
{
  "type": "IDV_CLEAR",
  "name": "CLEAR1 IDV",
  "protocol": {
    "type": "ID_PROOFING",
    "scopes": [
      "profile",
      "identity_assurance",
      "openid"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "DISABLED",
      "profileMaster": false,
      "groups": null
    },
    "accountLink": {
      "filter": null,
      "action": "AUTO"
    },
    "subject": {
      "userNameTemplate": {
        "template": "source.userName"
      },
      "filter": null,
      "matchType": "USERNAME",
      "matchAttribute": null
    },
    "maxClockSkew": 0
  }
}
```

### Example response

```json
{
  "id": "0oab50jh0UPiB6xde0w6",
  "name": "CLEAR1 IDV",
  "status": "ACTIVE",
  "created": "2025-01-14T19:59:41.000Z",
  "lastUpdated": "2025-01-14T19:59:41.000Z",
  "protocol": {
    "type": "ID_PROOFING",
    "endpoints": {
      "authorization": {
        "url": "https://verified.clearme.com/oauth/idv_authorize",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://verified.clearme.com/hydra/oauth2/token",
        "binding": "HTTP-POST"
      },
      "par": {
        "url": "https://verified.clearme.com/oauth/par",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "openid",
      "profile",
      "identity_assurance"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "DISABLED",
      "profileMaster": false,
      "groups": null
    },
    "subject": {
      "userNameTemplate": {
        "template": "source.userName"
      },
      "filter": null,
      "matchType": "USERNAME",
      "matchAttribute": null
    },
    "maxClockSkew": 0
  },
  "type": "IDV_CLEAR",
  "_links": {
    "users": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oab50jh0UPiB6xde0w6/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oab50jh0UPiB6xde0w6/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```
