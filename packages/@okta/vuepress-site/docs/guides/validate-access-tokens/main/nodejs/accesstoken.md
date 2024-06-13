This code uses the [Okta JWT Verifier for NodeJS](https://github.com/okta/okta-jwt-verifier-js).

```javascript
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://${yourOktaDomain}/oauth2/default' // issuer required
});
```

For any access token to be valid, the following are asserted:

- Signature is valid. The private key signed the token, and this private key has a corresponding public key in the JWKS response from the authorization server.
- Access token isn't expired. This requires the local system time to be in sync with Okta and checks the `exp` claim of the access token.
- The `aud` claim in the JWT matches any expected `aud` claim passed to `verifyAccessToken()`.
- The `iss` claim matches the issuer that the verifier is constructed with.
- Custom claim assertions that you add are confirmed.

With a verifier, you can now verify access tokens:

```javascript
oktaJwtVerifier.verifyAccessToken(accessTokenString, expectedAud)
.then( jwt => {
  // the token is valid
  console.log(jwt.claims);
})
.catch( err => {
  // a validation failed, inspect the error
});
```

The expected audience passed to `verifyAccessToken()` is required, and can be either a string (direct match) or an array of strings (the actual `aud` claim in the token must match one of the strings):

```javascript
// Passing a string for expectedAud
oktaJwtVerifier.verifyAccessToken(accessTokenString, 'api://default')
.then( jwt => console.log('token is valid') )
.catch( err => console.warn('token failed validation') );

// Passing an array for expectedAud
oktaJwtVerifier.verifyAccessToken(
  accessTokenString,
  [ 'api://special', 'api://default']
)
.then( jwt => console.log('token is valid') )
.catch( err => console.warn('token failed validation') );
```
