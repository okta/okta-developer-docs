The following sample application code renders the Sign-In Widget and after a successful authentication receives an object with OAuth tokens. From the `login.components.ts` file:

```javascript
ngOnInit() {
    // When navigating to a protected route, the route path is saved as the `originalUri`
    // If no `originalUri` is saved, then redirect back to the app root
    const originalUri = this.oktaAuth.getOriginalUri();
    if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
      this.oktaAuth.setOriginalUri('/');
    }

    this.signIn.showSignInToGetTokens({
      el: '#sign-in-widget',
      scopes: sampleConfig.oidc.scopes
    }).then((tokens: Tokens) => {
      // Remove the widget
      this.signIn.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
  }
  ```

The following sample application code in the `home.component.ts` file retrieves the user information from the ID token:

```javascript
async ngOnInit() {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name as string;
    }
  }
  ```

And displays the user's name on the Custom Login Page after you sign in.

### Routes

Some application routes require authentication to render. Define these protected routes with the [`OktaAuthGuard`](https://github.com/okta/okta-angular#oktaauthguard) method from the `@okta/okta-angular` SDK. For example, in the sample application, the Profile page is protected using this method:

```JavaScript
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';

...

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ OktaAuthGuard ],
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [ OktaAuthGuard ],
  },
];
```
