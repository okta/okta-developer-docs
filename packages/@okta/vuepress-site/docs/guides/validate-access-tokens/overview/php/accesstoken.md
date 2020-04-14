See the instructions for the [Okta JWT Verifier for PHP](https://github.com/okta/okta-jwt-verifier-php).

## Verify the Token Signature

You verify the Access or ID token's signature by matching the key that was used to sign in with one of the keys that you retrieved from your Okta Authorization Server's JWK endpoint. Specifically, each public key is identified by a `kid` attribute, which corresponds with the `kid` claim in the Access or ID token header.

If the `kid` claim doesn't match, it's possible that the signing keys have changed. Check the `jwks_uri` value in the Authorization Server metadata and try retrieving the keys again from Okta.

### Verify the Claims

You should verify the following:

- The `iss` (issuer) claim matches the identifier of your Okta Authorization Server.
- Verify that the `aud` (audience) claim is the value configured in the Authorization Server.
- The `exp` (expiry time) claim is the time at which this token will expire, expressed in Unix time. You should make sure that this has not already passed.


