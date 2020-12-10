This navigate the user's browser to the [OIDC logout page](/docs/reference/api/oidc/#logout), and then redirects back to the [postLogoutRedirectUri](https://github.com/okta/okta-auth-js#postlogoutredirecturi) that was specified in the config (or `window.location.origin` if no `postLogoutRedirectUri` was specified). This URI must be one of those listed in the `Logout redirect URI` section of your application's settings. See [Define the signout callback](/docs/guides/sign-users-out/define-signout-callback/).

```javascript
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component()
export class LogoutComponent {
  constructor(public oktaAuth: OktaAuthService) {

  }
  logout() {
    // Will redirect to Okta to end the session then redirect back to the configured `postLogoutRedirectUri`
    await this.oktaAuth.signOut();
  }
}
```
