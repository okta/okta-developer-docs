
In order to handle the redirect back from Okta, you need to capture the token values from the `Login Redirect URI` callback and pass them to the `handleAuthentication()` method of the `OktaAuthService`. We have provided `OktaCallbackComponent` that implements this logic. We show you how to set this up below using [Angular Router](https://angular.io/guide/router):

```javascript
//...
import {
  OktaCallbackComponent,
} from '@okta/okta-angular';

const CALLBACK_PATH = '/implicit/callback';

const appRoutes: Routes = [
  // ...
  {
    path: CALLBACK_PATH,
    component: OktaCallbackComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
})

```

