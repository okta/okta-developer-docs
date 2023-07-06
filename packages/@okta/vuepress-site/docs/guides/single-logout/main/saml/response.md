The response and the x.509 certificate are truncated for brevity.

```json
{...
      "signOn": { ...
       "participateSlo": {
            "enabled": true,
            "logoutRequestUrl": "http://myapp.exampleco.com/saml/slo",
            "sessionIndexRequired": true,
            "bindingType": "POST"
       },
       "spCertificate": {
            "x5c": [
                "MIIDnjCC ... EruxrghxV\r\n"
            ]
       },
       "allowMultipleAcsEndpoints": false,
       "acsEndpoints": [],
       "samlSignedRequestEnabled": false,
       "slo": {
            "enabled": true,
            "issuer": "https://myapp.exampleco.com",
            "logoutUrl": "http://myapp.exampleco.com"
        }
     } ...
}
```
