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
