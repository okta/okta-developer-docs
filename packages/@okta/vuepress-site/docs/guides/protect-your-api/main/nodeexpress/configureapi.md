Add the following constants to the top of `index.js`, replacing the placeholders with your own values.

   ```js
   const OktaJwtVerifier = require('@okta/jwt-verifier');
   const oktaJwtVerifier = new OktaJwtVerifier({
     issuer: 'https://{yourOktaDomain}/oauth2/{yourAuthServerName}'
   });
   const audience = '{yourAudience}';
   ```
