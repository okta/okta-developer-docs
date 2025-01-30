```JSON
{
    "id": "0oa78rktqwQbG2m9O0g4",
    "name": "Org2Org",
    "status": "ACTIVE",
    "created": null,
    "lastUpdated": "2025-01-15T19:45:16.000Z",
    "protocol": {
        "type": "SAML2",
        "endpoints": {
            "sso": {
                "url": "http://{yourOktaDomain}/app/okta_org2org/exk78hrRdLRNV4EZY0g4/sso/saml",
                "binding": "HTTP-POST",
                "destination": "http://{yourOktaDomain}"
            },
            "acs": {
                "binding": "HTTP-POST",
                "type": "INSTANCE"
            }
        },
        "algorithms": {
            "request": {
                "signature": {
                    "algorithm": "SHA-256",
                    "scope": "REQUEST"
                }
            },
            "response": {
                "signature": {
                    "algorithm": "SHA-256",
                    "scope": "ANY"
                }
            }
        },
        "settings": {
            "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "honorPersistentNameId": true
        },
        "credentials": {
            "trust": {
                "issuer": "http://{yourOktaDomain}/exk78hrRdLRNV4EZY0g4",
                "audience": "https://{yourOktaDomain}/saml2/service-provider/spjhiydxfezknoimtoye",
                "kid": "eb5c22a1-c2c2-484b-839f-2ca6d29fd519",
                "revocation": null,
                "revocationCacheLifetime": 0
            },
            "signing": {
                "kid": "uiiidnMQ4_WXZlt-ovtrRKJDK6UivJfFSnrfN4nNdwg"
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
                "template": "idpuser.subjectNameId"
            },
            "filter": "",
            "matchType": "USERNAME",
            "matchAttribute": null
        },
        "maxClockSkew": 120000,
        "mapAMRClaims": false,
        "trustClaims": true
    },
    .....
}
```
