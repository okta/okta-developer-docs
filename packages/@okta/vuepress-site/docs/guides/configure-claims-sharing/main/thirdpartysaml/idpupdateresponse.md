```JSON
{
    "id": "0oa3pz2xfBuSWuFS5806",
    "name": "Third-Party SAML IdP",
    "status": "ACTIVE",
    "created": null,
    "lastUpdated": "2025-03-28T22:32:50.000Z",
    "protocol": {
        "type": "SAML2",
        "endpoints": {
            "sso": {
                "url": "https://{thirdPartyIdP}/app/exk3pz2wtedH1OogK806/sso/saml",
                "binding": "HTTP-POST",
                "destination": "https://{thirdPartyIdP}/app/exk3pz2wtedH1OogK806/sso/saml"
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
                "issuer": "http://www.okta.com/exk3pz2wtedH1OogK806",
                "audience": "https://www.okta.com/saml2/service-provider/spsdltuedojpkaubppdr",
                "kid": "174763cb-fdcc-46d3-a74f-8b422deb16cd",
                "revocation": null,
                "revocationCacheLifetime": 0
            },
            "signing": {
                "kid": "PhlpvIVkdAVHDW94I5sd8wOMRMvI8mFI_mXxWBm2W28"
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
    "type": "SAML2",
   ...
}
```
