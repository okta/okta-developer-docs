Add `OktaAuthModule` to the imports section of your application module's `@NgModule` declaration.

Your application module should provide a configuration object using the `OKTA_CONFIG` injection token. This value is required to initialize the `OktaAuthService` when it's created by the Angular dependency injection system. 


```javascript
import {
  OKTA_CONFIG,
  OktaAuthModule,
} from '@okta/okta-angular';

const config = {
  // Configuration here
};

@NgModule({
  imports: [
    OktaAuthModule,
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config },
  ],
})


```
