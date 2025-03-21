Use the [IdP API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider) to add Persona as an IDV in Okta. Create your own `POST` request body or copy the [example request](#example-request) and input your values.

> **Note:** To add Persona using the Admin Console, see [Add an Identity Verification vendor as Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=id-verification).

1. Set the following request body parameters:

    * Enter a value for `name`.

    * Set `ID_PROOFING` as the protocol type.

    * Use the API key from the [previous section](#configure-the-api-key-and-redirect-uri-of-the-persona-app) as the `apiKey` value.

    * Use the Inquiry Template ID from the [previous section](#configure-identity-verification-template) as the `inquiryTemplateId` value, which begins with `itmpl_`.

1. Send the `POST` request to the `api/v1/idps` endpoint.

1. After you create the IDV, copy the value of `id` from the response body and paste it into a text editor. Use it in the next section.

### Example request

```json
{
    "type": "IDV_PERSONA",
    "name": "Persona IDV",
    "protocol": {
        "type": "ID_PROOFING",
        "credentials": {
            "bearer": {
                "apiKey": "{PersonaAPIkey}"
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
    "properties": {
        "inquiryTemplateId": "{PersonaInquiryTemplateId}"
    }
}
```

### Example response

```json
{
    "id": {"IDVId"},
    "name": "Persona IDV",
    "status": "ACTIVE",
    "created": "2024-11-15T15:22:17.000Z",
    "lastUpdated": "2024-11-15T15:22:17.000Z",
    "protocol": {
        "type": "ID_PROOFING",
        "endpoints": {
            "authorization": {
                "url": "https://withpersona.com/verify",
                "binding": "HTTP-REDIRECT"
            }
        },
        "credentials": {
            "bearer": {
                "apiKey": 
                    "{PersonaAPIkey}"
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
    "properties": {
        "inquiryTemplateId": "{PersonaInquiryTemplateId}"
    },
    "type": "IDV_PERSONA",
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