After performing [local signout](/docs/guides/sign-users-out/angular/sign-out-of-your-app/), navigate the user's browser to the [OIDC logout page](/docs/reference/api/oidc/#logout).

This page clears the user's Okta session, and then redirects back to the `post_logout_redirect_uri` that is provided. This URI must be one of those listed in the `Logout redirect URI` section of your application's settings. See [Define the signout callback](/docs/guides/sign-users-out/define-signout-callback/).

```javascript
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

const issuer = 'https://{yourOktaDomain}/oauth2/default';
const redirectUri = `${window.location.origin}/logged_out`;

@Component()
export class LogoutComponent {
  constructor(public oktaAuth: OktaAuthService) {

  }
  logout() {
    // Read idToken before local session is cleared
    const idToken = await this.oktaAuth.getIdToken();

    // Clear local session
    await this.oktaAuth.logout('/');

    // Clear remote session
    window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
  }
}
```
