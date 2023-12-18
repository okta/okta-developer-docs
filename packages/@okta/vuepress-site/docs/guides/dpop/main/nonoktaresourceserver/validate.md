1. Read the value in the `DPoP` header and decode the DPoP JWT.
2. Get the `jwk` (public key) from the header portion of the DPoP JWT.
3. Verify the signature of the DPoP JWT using the public key and algorithm in the JWT header.
4. Verify that the `htu` and `htm` claims are in the DPoP JWT payload and match with the current API request HTTP method and URL.
5. Calculate the `jkt` (SHA-256 thumbprint of the public key).
6. Extract the DPoP-bound access token from the `Authorization` header, verify it with Okta, and extract the claims. You can also use the `/introspect` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) to extract the access token claims.
7. Validate the token binding by comparing `jkt` from the access token with the calculated `jkt` from the `DPoP` header.<br>
<br>
