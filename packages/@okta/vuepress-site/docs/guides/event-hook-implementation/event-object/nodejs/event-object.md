```JSON
{
        "actor": {
            "id": "00u2di94bAMSEPvAY1d6",
            "type": "User",
            "alternateId": "okta.trainer@okta.com",
            "displayName": "Okta Trainer",
            "detailEntry": null
        },
        "client": {
            "userAgent": {
                "rawUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
                "os": "Mac OS X",
                "browser": "CHROME"
            },
            "zone": "null",
            "device": "Computer",
            "id": null,
            "ipAddress": "174.89.174.56",
            "geographicalContext": {
                "city": "Toronto",
                "state": "Ontario",
                "country": "Canada",
                "postalCode": "M6B",
                "geolocation": {
                    "lat": 43.7114,
                    "lon": -79.4462
                }
            }
        },
        "authenticationContext": {
            "authenticationProvider": null,
            "credentialProvider": null,
            "credentialType": null,
            "issuer": null,
            "interface": null,
            "authenticationStep": 0,
            "externalSessionId": "102lMcfHbwSTuS5V1oPHJs3lw"
        },
        "displayMessage": "Deactivate Okta User",
        "eventType": "user.lifecycle.deactivate",
        "outcome": {
            "result": "SUCCESS",
            "reason": null
        },
        "published": "2020-11-16T18:15:12.862Z",
        "securityContext": {
            "asNumber": 577,
            "asOrg": "example",
            "isp": "exampleISP",
            "domain": "example.com",
            "isProxy": false
        },
        "severity": "INFO",
        "debugContext": {
            "debugData": {
                "requestId": "X7LBsMxeqO-ADcGcmp0WGQAAB@g",
                "requestUri": "/admin/user/deactivate/00u3m90rxKjGQ0G6L1d6",
                "threatSuspected": "false",
                "url": "/admin/user/deactivate/00u3m90rxKjGQ0G6L1d6?"
            }
        },
        "legacyEventType": "core.user.config.user_deactivated",
        "transaction": {
            "type": "WEB",
            "id": "X7LBsMxeqO-ADcGcmp0WGQAAB@g",
            "detail": {}
        },
        "uuid": "ab62c0bc-2837-11eb-9823-9fb8f750c5a9",
        "version": "0",
        "request": {
            "ipChain": [
                {
                    "ip": "174.89.174.56",
                    "geographicalContext": {
                        "city": "Toronto",
                        "state": "Ontario",
                        "country": "Canada",
                        "postalCode": "M6B",
                        "geolocation": {
                            "lat": 43.7114,
                            "lon": -79.4462
                        }
                    },
                    "version": "V4",
                    "source": null
                }
            ]
        },
        "target": [
            {
                "id": "00u3m90rxKjGQ0G6L1d6",
                "type": "User",
                "alternateId": "johndoet@doesnotexist.com",
                "displayName": "John Doe",
                "detailEntry": null
            }
        ]
    }
```
