This sends the user's browser to the [OIDC logout page](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/logoutCustomASWithPost), and then redirects back to the [postLogoutRedirectUri](https://github.com/okta/okta-auth-js#postlogoutredirecturi) that was specified in the config (or `window.location.origin` if no `postLogoutRedirectUri` was specified). This URI must be one of those listed in the **Sign-out redirect URIs** section of your application's settings. See [Define the sign-out callback](#define-the-sign-out-callback).

```javascript
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component()
export class LogoutComponent {
  constructor(public oktaAuth: OktaAuthService) {
  }

  async logout() {
    // Will redirect to Okta to end the session then redirect back to the configured `postLogoutRedirectUri`
    await this.oktaAuth.signOut();
  }
}
```
