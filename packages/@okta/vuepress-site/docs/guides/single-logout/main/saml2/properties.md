* Add the `spCertificate` object. This is the signature certificate or CA in .pem format. Your app must sign the SLO request with the certificate.
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
