* Update the `participate_slo` property to `true`.
* Add the following new properties:
  * `frontchannel_logout_uri`: Enter the URL where Okta sends the IdP-initiated logout request.
  * `frontchannel_logout_session_required`: Set to `true` to include the (`sid`) session ID and issuer (`iss`) as part of the IdP-initiated logout request. This ends a specific user’s session rather than all active user sessions within that browser.
