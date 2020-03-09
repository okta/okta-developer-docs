After performing [local signout](/docs/guides/sign-users-out/react/sign-out-of-your-app/), navigate the user's browser to the [OIDC logout page](https://developer.okta.com/docs/reference/api/oidc/#logout).

This page clears the user's Okta session, and then redirects back to the `post_logout_redirect_uri` that is provided. This URI must be one of those listed in the `Logout redirect URI` section of your application's settings.

Open your Okta Developer Console:

<a href="https://login.okta.com/" target="_blank" class="Button--blue">Go to Console</a>

1. Select **Applications**, and then select your application.

2. Select **General** and click **Edit**.

3. In the **Logout redirect URI section**, add the **Base URI** of your application. You can optionally follow that URI with a path (for example, `http://localhost:8080/logged_out`). Also, add any URIs where your application runs in production, such as `https://app.example.com/logged_out`.

4. Click **Save**.

Function-based component example:
```javascript
import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const issuer = 'https://${yourOktaDomain}/oauth2/default';
const redirectUri = `${window.location.origin}/logged_out`;

// Basic component with logout button
const Logout = () => { 
  const { authState, authService } = useOktaAuth();

  const logout = async () => {
    // Read idToken before local session is cleared
    const idToken = authState.idToken;
    await authService.logout('/');

    // Clear remote session
    window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
  };

  return (
    <a onClick={logout}>Logout</a>
  );
};

export default Logout;
```

Class-based component example:
```javascript
import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

// Basic component with logout button
class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    // Read idToken before local session is cleared
    const idToken = this.props.authState.idToken;

    // Clear local session
    await this.props.authService.logout('/');

    // Clear remote session
    window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
  }

  render() {
    return (
      <a onClick={this.logout}>Logout</a>
    );
  }
});

// withOktaAuth() makes the Okta 
// - "authService" object available as "this.props.authService"
// - "authState" object available as "this.props.authState"
Logout = withOktaAuth(Logout);
export default Logout;
```
