The request and the x.509 certificate are truncated for brevity.

```json
{ ...
    "signOn": { ...
        "spCertificate": {
                "x5c": [
                "MIIDnjC...EruxrghxV\r\n"
                ]
            },
        "slo": {
                "enabled": true,
                "issuer": "https://${myapp.exampleco.com}",
                "logoutUrl": "https://${exampleSAMLAppLogoutURL}"
            },
        "participateSlo": {
                "enabled": true,
                "logoutRequestUrl": "http://${exampleSAMLAppLogoutRequestURL}",
                "sessionIndexRequired": true,
                "bindingType": "POST"
            }
    }
}
```
