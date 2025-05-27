> **Note**: See [Configure Single Logout in app integrations](https://help.okta.com/okta_help.htm?type=oie&id=apps-single-logout) to update your app using the Admin Console.

The following example shows you how to use the API to update your SAML 2.0 app integration for SLO. This includes adding the `participateSlo` object for IdP-initiated SLO.

> **Note:** The `participateSlo` object is independent of the existing `slo` [object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=6/settings&t=request) that you use to configure the SP-initiated logout flow.

1. Send a GET app request and copy the response body for use in the PUT request.

    `GET https://{yourOktaDomain}/api/v1/apps/{samlAppID}`

2. Update the response body by editing the `signOn` object:

    * Add the `spCertificate` object. This is the signature certificate or CA in `.pem` format. Your app must sign the SLO request with the certificate.
    * Update the `slo` object:
      * `enabled`: Set to `true` to enable SP-initiated single logout.
      * `issuer`: Enter the identifier for the SP app. This can be an ACS URL or the SP Entity ID. This value is included in the metadata sent in the SP-initiated SLO request.
      * `logoutUrl`: Enter the app URL where Okta sends the sign out response. If your SP app doesn't have a specific SLO URL, you can use the main app URL.
    * Add the `participateSlo` object:
      * `enabled`: Set to `true` to enable IdP-initiated SLO.
      * `logoutRequestUrl`: The URL where you want Okta to send the IdP-initiated logout request.
      * `sessionIndexRequired`: Set to `true` to include the session index (`sessionIndex`) as part of the IdP-initiated logout request. This ends a specific user’s session rather than all active user sessions within that browser.
    * `bindingType`: Set how your app expects Okta to send the IdP-initiated logout request:
      * `POST`: Send additional data in the request body
      * `REDIRECT`: Send data as query parameters in the request URL

    **Example request**

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

3. Use the updated response body in a PUT request.

    `PUT https://{yourOktaDomain}/api/v1/apps/{appID}`

    **Example response**

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
