The resource server is required to calculate the hash of the token value presented and verify that it's the same as the hash value in the `ath` field. Since the `ath` field value is covered by the DPoP proof's signature, its inclusion binds the access token value to the holder of the key used to generate the signature.


the validation section will need to be updated to suit validation for accessing Okta resources

For such an access token, a resource server MUST check that a DPoP proof was also received in the DPoP header field of the HTTP request, check the DPoP proof according to the rules in Section 4.3, and check that the public key of the DPoP proof matches the public key to which the access token is bound per Section 6.




ensure that the value of the `ath` claim equals the hash of that access token, and
confirm that the public key to which the access token is bound matches the public key from the DPoP proof

should grant access to the endpoint requested

------------

The resource server must perform validation on the access token to complete the flow and grant access. When the client sends an access request with the access token, validation should verify that the `cnf` claim is present. Then validation should compare the `jkt` in the access token with the public key in the JWT value of the `DPoP` header.


The following is a high-level overview of the validation steps that the resource server must perform.

* Read the value in the `DPoP` header and decode the DPoP JWT.
* Get the `jwk` (public key) from the header portion of the DPoP JWT.
* Verify the signature of the DPoP JWT using the public key and algorithm in the JWT header.
* Verify that the `htu` and `htm` claims are in the DPoP JWT payload and match with the current API request HTTP method and URL.
* Calculate the `jkt` (SHA-256 thumbprint of the public key).
* Extract the DPoP-bound access token from the `Authorization` header, verify it with Okta, and extract the claims. You can also use the `/introspect` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/introspectCustomAS) to extract the access token claims.
* Validate the token binding by comparing `jkt` from the access token with the calculated `jkt` from the `DPoP` header.

> **Note:** The resource server must not grant access to the resource unless all checks are successful.

For instructional purposes, this guide provides example validation in a Node.js Express app using the third-party site Glitch. Glitch is a browser-based development environment that can build a full-stack web application online. Use the Glitch example to review and quickly implement the validation code. It includes all dependencies required to complete validation.

Copy (remix on Glitch) the [Validation DPoP Tokens](https://glitch.com/~validate-dpop-tokens) Glitch project to have a working code sample. The validation steps at the beginning of this section are included in the code for quick implementation.

> **Note:** See [Libraries for Token Signing/Verification](https://jwt.io/libraries) to view other libraries/SDKs in different languages that you can use for JWT verification.