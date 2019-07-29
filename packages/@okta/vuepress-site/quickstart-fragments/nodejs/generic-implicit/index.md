---
exampleDescription: NodeJS Implicit Example
---

## Okta Node.js Quickstart

Now that your clients can get tokens, let's validate those tokens on your server. Okta has created a simplified Node library to make this easy for Okta applications: [Okta JWT Verifier](https://www.npmjs.com/package/@okta/jwt-verifier). We'll show you how to validate access tokens for a specific Okta authorization server (the issuer) and add a secondary check for the audience of the token.

To learn more about validating Okta access tokens, please see [Validate Access Tokens](/docs/guides/validate-access-tokens/).

> If you would prefer to download a complete sample application instead, please visit [Express Sample Applications for Okta][] and follow those instructions.

<DomainAdminWarning />

```javascript
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  assertClaims: {
    aud: 'api://default'
  }
});

// The access token string, which should be obtained from the Authorization header on the request to your server
const accessTokenString = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Imk2UnRjSkxvbUg0e...';
const expectedAudience = 'api://default';

oktaJwtVerifier.verifyAccessToken(accessTokenString, expectedAudience)
  .then(jwt => {
    // the token is valid
    console.log(jwt.claims);
  })
  .catch(err => {
    // a validation failed, inspect the error
  });
```
[Express Sample Applications for Okta]: https://github.com/okta/samples-nodejs-express-4
