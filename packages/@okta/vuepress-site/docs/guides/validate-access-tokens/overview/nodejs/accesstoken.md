This code uses [the Okta JWT Verifier for NodeJS](https://github.com/okta/okta-oidc-js/tree/master/packages/jwt-verifier).

```javascript
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{yourOktaDomain}/oauth2/default' // issuer required
});
```
For any access token to be valid, the following are asserted:

- Signature is valid (the token was signed by a private key which has a corresponding public key in the JWKS response from the authorization server).
- Access token is not expired (requires local system time to be in sync with Okta, checks the exp claim of the access token).
- The `aud` claim matches any expected `aud` claim passed to verifyAccessToken().
- The `iss` claim matches the issuer the verifier is constructed with.
- Any custom claim assertions that you add are confirmed

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
The expected audience passed to verifyAccessToken() is required, and can be either a string (direct match) or an array of strings (the actual `aud` claim in the token must match one of the strings):

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
