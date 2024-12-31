The Okta Angular SDK requires an instance of an `OktaAuth` object with configuration properties. Set the `clientID` and `issuer` properties with the values from the CLI earlier. This can happen by directly setting the properties, with variable replacement that happens as part of the build process, or during app load time.

Make the following changes to `src/app/app.config.ts`:

1. Add the following import lines to the code to pull in the dependencies:

   ```ts
   import { OktaAuthModule } from '@okta/okta-angular';
   import { OktaAuth } from '@okta/okta-auth-js';
   ```

2. Add an `OktaAuth` object before the `appConfig` as follows, replacing the placeholder values with your own values (see [Find your config values](/docs/guides/sign-into-spa-redirect/angular/main/#find-your-config-values)):

   ```ts
   const oktaAuth = new OktaAuth({
     issuer: 'https://{yourOktaDomain}',
     clientId: '{yourClientID}',
     redirectUri: window.location.origin + '/login/callback',
     scopes: ['openid', 'profile', 'offline_access']
   });
   ```

3. Add the Okta configuration to the `OktaAuthModule` static `forRoot` method in the `ApplicationConfig` object using the `importProvidersFrom` function:

   ```ts
   export const appConfig: ApplicationConfig = {
    providers: [
      // other providers as required
      importProvidersFrom(
           OktaAuthModule.forRoot({ oktaAuth })
      )
    ]
   };
   ```
