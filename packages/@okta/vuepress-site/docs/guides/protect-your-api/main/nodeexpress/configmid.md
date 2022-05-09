1. Create a verifier instance bound to the issuer and set the audience by adding the following lines to your `server.js`:

   ```js
   const OktaJwtVerifier = require('@okta/jwt-verifier');
   const oktaJwtVerifier = new OktaJwtVerifier({
     issuer: 'https://${yourOktaDomain}/oauth2/default'
   });
   const audience = 'api://default';
   ```

2. Make sure to replace the placeholders with your own values.
