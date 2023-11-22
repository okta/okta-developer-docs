* Read the value in the `DPoP` header and decode the DPoP JWT.
* Get the `jwk` (public key) from the header portion of the DPoP JWT.
* Verify the signature of the DPoP JWT using the public key and algorithm in the JWT header.
* Verify that the `htu` and `htm` claims are in the DPoP JWT payload and match with the current API request HTTP method and URL.
* Calculate the `jkt` (SHA-256 thumbprint of the public key).
* Extract the DPoP-bound access token from the `Authorization` header, verify it with Okta, and extract the claims. You can also use the `/introspect` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) to extract the access token claims.
* Validate the token binding by comparing `jkt` from the access token with the calculated `jkt` from the `DPoP` header.<br>
<br>