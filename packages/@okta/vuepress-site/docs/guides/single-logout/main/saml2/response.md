The response and the x.509 certificate are truncated for brevity.

```json
{...
      "signOn": {
      "defaultRelayState": "",
      "ssoAcsUrl": "http://myapp.exampleco.com/saml/sso",
      "idpIssuer": "http://www.okta.com/{org.externalKey}",
      "audience": "urn:example:sp",
      "recipient": "http://myapp.exampleco.com/saml/sso",
      "destination": "http://myapp.exampleco.com/saml/sso",
      "subjectNameIdTemplate": "{user.userName}",
      "subjectNameIdFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
      "responseSigned": true,
      "assertionSigned": true,
      "signatureAlgorithm": "RSA_SHA256",
      "digestAlgorithm": "SHA256",
      "honorForceAuthn": true,
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "spIssuer": "https://myapp.exampleco.com",
      "requestCompressed": false,
      "attributeStatements": [],
      "inlineHooks": [],
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
