The Okta Angular SDK requires an instance of an `OktaAuth` object with configuration properties. You should set the `clientID` and `issuer` properties with the values you got from the CLI earlier. This can happen by directly setting the properties, with variable replacement that happens as part of the build process, or during application load time.

Make the following changes to `src/app/app.module.ts`:

1. Add the following import lines to the code to pull in the dependencies:

   ```ts
   import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
   import { OktaAuth } from '@okta/okta-auth-js';
   ```

2. Add `OktaAuthModule` to the `@NgModule` `imports` array.

3. Add a new `OktaAuth` object like the one below, replacing the placeholder values with your own values:

   ```ts
   const oktaAuth = new OktaAuth({
     issuer: 'https://${yourOktaDomain}/oauth2/default',
     clientId: '${yourClientID}',
     redirectUri: window.location.origin + '/login/callback'
   });
   ```

4. Add the Okta configuration to the `OktaAuthModule` using the `forRoot` static method:

   ```ts
   OktaAuthModule.forRoot({ oktaAuth })
   ```
