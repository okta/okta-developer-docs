```JSON
{
    "id": "0oa3q52z4b7iDGJfh806",
    "issuerMode": "DYNAMIC",
    "name": "Org2Org OIDC IdP",
    "status": "ACTIVE",
    "created": "2025-01-14T21:56:04.000Z",
    "lastUpdated": "2025-01-17T20:01:09.000Z",
    "protocol": {
        "type": "OIDC",
        "endpoints": {
            "authorization": {
                "url": "https://{yourOktaIdPDomain}/oauth2/v1/authorize",
                "binding": "HTTP-REDIRECT"
            },
            "token": {
                "url": "https://{yourOktaIdPDomain}/oauth2/v1/token",
                "binding": "HTTP-POST"
            },
            "jwks": {
                "url": "https://{yourOktaIdPDomain}/oauth2/v1/keys",
                "binding": "HTTP-REDIRECT"
            }
        },
        "scopes": [
            "email",
            "openid",
            "profile"
        ],
        "issuer": {
            "url": "https://{yourOktaIdPDomain}"
        },
        "credentials": {
            "client": {
                "client_id": "0oa3q52oiB4UBbQFT806",
                "client_secret": "X7i4OV8UXUkrqIhr2vFs0RzeYFy3AUmXe_huqfgMw-eiw1KMUUCEs7X7YXrR_9Sq"
            }
        }
    },
    "policy": {
        "provisioning": {
            "action": "AUTO",
            "profileMaster": false,
            "groups": {
                "action": "NONE"
            },
            "conditions": {
                "deprovisioned": {
                    "action": "NONE"
                },
                "suspended": {
                    "action": "NONE"
                }
            }
        },
        "accountLink": {
            "filter": null,
            "action": "AUTO"
        },
        "subject": {
            "userNameTemplate": {
                "template": "idpuser.email"
            },
            "filter": "",
            "matchType": "USERNAME",
            "matchAttribute": ""
        },
        "maxClockSkew": 0,
        "trustClaims": true
    },
    "type": "OIDC"
}
```
