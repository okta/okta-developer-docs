After performing [local signout](/docs/guides/sign-users-out/angular/sign-out-of-your-app/), navigate the user's browser to the [OIDC logout page](https://developer.okta.com/docs/reference/api/oidc/#logout).

This page clears the user's Okta session, and then redirects back to the `post_logout_redirect_uri` that is provided. This URI must be one of those listed in the `Logout redirect URI` section of your application's settings.

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then select your application.

2. Select **General** and click **Edit**.

3. In the **Logout redirect URI section**, add the **Base URI** of your application. You can optionally follow that URI with a path, for example, `http://localhost:8080/logged_out`. Also, add any URIs where your application runs in production, such as `https://app.example.com/logged_out`.

4. Click **Save**.

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
