Use the [IdP API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider) to add your custom IDV vendor in Okta. Create your own `POST` request body or copy the [example request](#example-request) and input your values.

> **Note:** To add a custom IDV vendor using the Admin Console, see [Add an Identity Verification vendor as Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=id-verification).

1. Set the following request body parameters:

    * Enter a value for `name`.
    * Set `type` to `IDV_STANDARD`.
    * Set `ID_PROOFING` as the protocol type.
    * Use the **Client ID** and **Client Secret** values from the [previous section](#create-an-app-at-the-idv-vendor) as the `client_id` and `client_secret` values.
    * Use the URLs that your IDV vendor provided in the following parameters:
      * `issuer.url`: The **Issuer URL** that your IDV vendor provided.
      * `endpoints.par.url`: The **PAR request URL** that your IDV vendor provided.
      * `endpoints.authorization.url`: The **Authorize URL** that your IDV vendor provided.
      * `endpoints.token.url`: The **Token URL** that your IDV vendor provided.
      * `endpoints.jwks.url`: The **JWKS URL** that your IDV vendor provided.
    * Set the `scopes` array to include the `profile`, `identity_assurance`, and `openid` scopes.
      * `profile`: This scope allows the IDV vendor to request access to basic user profile information from Okta.
      * `identity_assurance`: This scope requests access to the `verified_claims` object so that the IDV vendor can send and receive information about the level of assurance of the IDV flow.
      * `openid`: This scope is required to make the request an OpenID Connect (OIDC) request.

1. Send the `POST /api/v1/idps` request.

1. After you create the IDV vendor, copy the value of `id` from the response body and paste it into a text editor. Use it in the next section.


### Example request

```json
{
  "type": "IDV_STANDARD",
  "name": "Custom IDV",
  "protocol": {
    "type": "ID_PROOFING",
    "endpoints": {
      "par": {
        "url": "https://idv.example.com/par",
        "binding": "HTTP-REDIRECT"
      },
      "authorization": {
        "url": "https://idv.example.com/authorize",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://idv.example.com/token",
        "binding": "HTTP-POST"
      },
      "jwks": {
        "url": "https://idv.example.com/jwks",
        "binding": "HTTP-REDIRECT"
      }
    },
    "issuer": {
      "url": "https://idv.example.com"
    },
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
  },
  "properties": {
    "idvMetadata": {
      "vendorDisplayName": "Custom IDV",
      "termsOfUse": "https://idv.example.com/terms",
      "privacyPolicy": "https://idv.example.com/privacy"
    }
  }
}
```

### Example response

```json
{
  "id": "0oa2pstvoFV4GYCw30g5",
  "name": "Custom IDV IdP",
  "status": "ACTIVE",
  "created": "2025-01-15T20:54:04.000Z",
  "lastUpdated": "2025-01-15T20:54:05.000Z",
  "protocol": {
    "type": "ID_PROOFING",
    "endpoints": {
      "par": {
        "url": "https://idv.example.com/par",
        "binding": "HTTP-REDIRECT"
      },
      "authorization": {
        "url": "https://idv.example.com/authorize",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://idv.example.com/token",
        "binding": "HTTP-POST"
      },
      "jwks": {
        "url": "https://idv.example.com/jwks",
        "binding": "HTTP-REDIRECT"
      },
      "issuer": {
        "url": "https://idv.example.com"
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
      },
      "policy": {
        "provisioning": {
          "action": "DISABLED",
          "profileMaster": false,
          "groups": null
        },
        "subject": {
          "userNameTemplate": {
            "template": "source.userName",
            "filter": null,
            "matchType": "USERNAME",
            "matchAttribute": null
          },
          "maxClockSkew": 0,
          "properties": {
            "idvMetadata": {
              "vendorDisplayName": "Custom IDV",
              "termsOfUse": "https://idv.example.com/terms",
              "privacyPolicy": "https://idv.example.com/privacy"
            }
          }
        },
        "type": "IDV_STANDARD",
        "_links": {
          "users": {
            "href": "https://{yourOktaDomain}/api/v1/idps/0oa2pstvoFV4GYCw30g5/users",
            "hints": {
              "allow": [
                "GET"
              ]
            }
          },
          "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/idps/0oa2pstvoFV4GYCw30g5/lifecycle/deactivate",
            "hints": {
              "allow": [
                "POST"
              ]
            }
          }
        }
      }
    }
  }
}
```
