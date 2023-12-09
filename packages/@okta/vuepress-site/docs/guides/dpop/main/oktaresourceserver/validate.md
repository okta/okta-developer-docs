1. Read the value in the `DPoP` header and decode the DPoP JWT.
2. Get the `jwk` (public key) from the header portion of the DPoP JWT.
3. Verify the signature of the DPoP JWT using the public key and algorithm in the JWT header.
4. Verify that the `htu` and `htm` claims are in the DPoP JWT payload and match with the current API request HTTP method and URL.
5. Calculate the `jkt` (SHA-256 thumbprint of the public key).
6. Extract the DPoP-bound access token from the `Authorization` header, verify it with Okta, and extract the claims. You can also use the `/introspect` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) to extract the access token claims.
7. Validate the token binding by comparing `jkt` from the access token with the calculated `jkt` from the `DPoP` header.
8. If presented to an Okta protected resource with an access token, The Okta resource server verifies that:
    * The value of the `ath` claim equals the hash of the access token
    * The public key to which the access token is bound matches the public key from the DPoP proof

    The Okta resource server calculates the hash of the token value presented and verifies that it's the same as the hash value in the `ath` field. Since the `ath` field value is covered by the DPoP proof's signature, its inclusion binds the access token value to the holder of the key used to generate the signature.
