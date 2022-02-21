The Okta Angular SDK requires an instance of an `OktaAuth` object with configuration properties. You should set the `ClientID` and `Issuer` properties. This can happen by directly setting the properties, with variable replacement that happens as part of the build process, or during application load time.

Add `OktaAuthModule` to the `NgModule` `imports` array and configure the Okta provider so Okta services are added to the dependency injection system. The Okta Angular SDK provides the `OKTA_CONFIG` injection token where you'll use the `OktaAuth` instance as the value.

The code changes to configure Okta are shown below.

```ts
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{yourClientID}',
  redirectUri: window.location.origin + '/login/callback'
});

@NgModule({
  imports: [
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } }
  ]
})
```