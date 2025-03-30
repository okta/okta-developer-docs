```JSON
{
    "id": "0oa3rmyd0GTuaQdPt806",
    "issuerMode": "DYNAMIC",
    "name": "OIDC3rdParty",
    "status": "ACTIVE",
    "created": "2025-03-28T21:57:24.000Z",
    "lastUpdated": "2025-03-28T21:58:44.000Z",
    "protocol": {
        "type": "OIDC",
        "endpoints": {
            "authorization": {
                "url": "https://cmdip-curd-ct18.clouditude.com/authorize",
                "binding": "HTTP-REDIRECT"
            },
            "token": {
                "url": "https://cmdip-curd-ct18.clouditude.com/token",
                "binding": "HTTP-POST"
            },
            "jwks": {
                "url": "https://cmdip-curd-ct18.clouditude.com/oauth2/v1/keys",
                "binding": "HTTP-REDIRECT"
            }
        },
        "scopes": [
            "email",
            "openid",
            "profile"
        ],
        "issuer": {
            "url": "https://cmdip-curd-ct18.clouditude.com"
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
            "action": "DISABLED"
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
        "mapAMRClaims": false,
        "trustClaims": true
    },
    "type": "OIDC",
    "_links": {
        "authorize": {
            "href": "https://cmsp-curd-ct18.clouditude.com/oauth2/v1/authorize?idp=0oa3rmyd0GTuaQdPt806&client_id={clientId}&response_type={responseType}&response_mode={responseMode}&scope={scopes}&redirect_uri={redirectUri}&state={state}&nonce={nonce}",
            "templated": true,
            "hints": {
                "allow": [
                    "GET"
                ]
             }
        },
        "clientRedirectUri": {
            "href": "https://cmsp-curd-ct18.clouditude.com/oauth2/v1/authorize/callback",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```