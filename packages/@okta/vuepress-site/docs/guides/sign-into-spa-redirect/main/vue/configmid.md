1. Create a `src/config.js` file to define your configuration settings.

2. Enter the following contents into it, replacing the placeholder values with the values that you obtained earlier from the CLI:

   ```js
   export default {
     oidc: {
       clientId: '{yourClientID}',
       issuer: 'https://{yourOktaDomain}/oauth2/default',
       redirectUri: window.location.origin + '/login/callback',
       scopes: ['openid', 'offline_access', 'profile', 'email']
     }
   }
   ```
