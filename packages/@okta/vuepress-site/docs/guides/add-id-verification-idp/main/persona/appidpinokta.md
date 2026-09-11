Use the [IdP API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider) to add Persona as an IDV vendor in Okta. Create your own `POST` request body or copy the [example request](#example-request) and input your values.

> **Note:** To add Persona using the Admin Console, see [Add an Identity Verification vendor as Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=id-verification).

1. Set the following request body parameters:

    * Enter a value for `name`.
    * Set `ID_PROOFING` as the protocol type.
    * Set `type` to `integrator-7184229_personaidv_1`.
    * Use the client ID and client secret from your [previous section](#configure-the-client-id-client-secret-and-redirect-uri-of-the-app) as the `client_id` and `client_secret` values.
    * Set the `scopes` array to include the `profile`, `identity_assurance`, and `openid` scopes.
      * `profile`: This scope allows the IDV vendor to request access to basic user profile information from Okta.
      * `identity_assurance`: This scope requests access to the `verified_claims` object so that the IDV vendor can send and receive information about the level of assurance of the IDV flow.
      * `openid`: This scope is required to make the request an OpenID Connect (OIDC) request.

1. Send the `POST /api/v1/idps` request.

1. After you create the IDV vendor, copy the value of `id` from the response body and paste it into a text editor. Use it in the next section.

### Example request

```json
{
    "type": "integrator-7184229_personaidv_1",
    "name": "Persona IDV",
    "protocol": {
        "type": "ID_PROOFING",
        "scopes": [
            "profile",
            "identity_assurance",
            "openid"
        ],
        "credentials": {
            "client": {
                "client_id": "{PersonaClientId}",
                "client_secret": "{PersonaClientSecret}"
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
    "id": "{IDVId}",
    "name": "Persona IDV",
    "status": "ACTIVE",
    "created": "2024-11-15T15:22:17.000Z",
    "lastUpdated": "2024-11-15T15:22:17.000Z",
    "protocol": {
        "type": "ID_PROOFING",
        "scopes": [
            "profile",
            "identity_assurance",
            "openid"
        ],
        "endpoints": {
            "par": {
                "url": "{PersonaParUrl}",
                "binding": "HTTP-POST"
            },
            "authorization": {
                "url": "{PersonaAuthorizationUrl}",
                "binding": "HTTP-REDIRECT"
            },
            "token": {
                "url": "{PersonaTokenUrl}",
                "binding": "HTTP-POST"
            },
            "jwks": {
                "url": "{PersonaJwksUrl}",
                "binding": "HTTP-REDIRECT"
            }
        },
        "credentials": {
            "client": {
                "client_id": "{PersonaClientId}",
                "client_secret": "{PersonaClientSecret}"
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
            "vendorDisplayName": "Persona",
            "termsOfUse": "{PersonaTermsOfUseUrl}",
            "privacyPolicy": "{PersonaPrivacyPolicyUrl}"
        }
    },
    "type": "integrator-7184229_personaidv_1",
    "_links": {
        "users": {
            "href": "https://{yourOktadomain}/api/v1/idps/0oal68on4q8cch2y55d7/users",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktadomain}/api/v1/idps/0oal68on4q8cch2y55d7/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```
