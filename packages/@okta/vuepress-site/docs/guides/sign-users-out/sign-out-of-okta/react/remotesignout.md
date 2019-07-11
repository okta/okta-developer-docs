After performing [local signout](/docs/guides/sign-users-out/react/sign-out-of-your-app/), navigate the user's browser to the [OIDC logout page](https://developer.okta.com/docs/reference/api/oidc/#logout).

This page clears the user's Okta session, and then redirects back to the `post_logout_redirect_uri` that is provided. This URI must be one of those listed in the `Logout redirect URI` section of your application's settings. See [Define the signout callback](/docs/guides/sign-users-out/define-signout-callback/).

```javascript
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

const issuer = 'https://{yourOktaDomain}/oauth2/default';
const redirectUri = `${window.location.origin}/logged_out`;

// Basic component with logout button
class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    // Read idToken before local session is cleared
    const idToken = await this.props.auth.getIdToken();

    // Clear local session
    await this.props.auth.logout('/');

    // Clear remote session
    window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
  }

  render() {
    return (
      <a onClick={this.login}>Logout</a>
    );
  }
});

// withAuth() makes Okta "Auth" object available as "this.props.auth"
Logout = withAuth(Logout);


```
