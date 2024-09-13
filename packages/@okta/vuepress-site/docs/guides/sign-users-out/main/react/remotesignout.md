This sends the user's browser to the [OIDC logout page](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/logoutCustomASWithPost), and then redirects back to the [postLogoutRedirectUri](https://github.com/okta/okta-auth-js#postlogoutredirecturi) that was specified in the config (or `window.location.origin` if no `postLogoutRedirectUri` was specified). This URI must be one of those listed in the **Sign-out redirect URIs** section of your application's settings. See [Define the sign-out callback](#define-the-sign-out-callback).

Function-based component example:

```javascript
import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

// Basic component with logout button
const Logout = () => { 
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    // Will redirect to Okta to end the session then redirect back to the configured `postLogoutRedirectUri`
    await oktaAuth.signOut();
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
    // Will redirect to Okta to end the session then redirect back to the configured `postLogoutRedirectUri`
    await this.props.oktaAuth.signOut();
  }

  render() {
    return (
      <a onClick={this.logout}>Logout</a>
    );
  }
});

// withOktaAuth() makes the Okta
// - "oktaAuth" object available as "this.props.oktaAuth"
Logout = withOktaAuth(Logout);
export default Logout;
```
