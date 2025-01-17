Add the following constants to the top of `index.js`, replacing the placeholders with your own values.

   ```js
   const OktaJwtVerifier = require('@okta/jwt-verifier');
   const oktaJwtVerifier = new OktaJwtVerifier({
     issuer: 'https://{yourOktaDomain}/oauth2/{yourAuthServerName}'
   });
   const audience = '{yourAudience}';
   ```

  >**Note:** If you're using a custom authorization server other than `default`, use the authorization server `id` in place of the `{yourAuthServerName}` placeholder.

