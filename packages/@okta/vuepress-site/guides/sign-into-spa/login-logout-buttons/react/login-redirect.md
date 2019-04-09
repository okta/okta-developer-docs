
The [Auth](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#auth) object is provided on the component's props via the [withAuth](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#withauth) Higher Order Component (HOC).
You can show/hide the correct button by checking the value returned from the [auth.isAuthenticated()](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#authisauthenticated) method. 

```javascript

import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';

async function checkAuthentication() {
  const authenticated = await this.props.auth.isAuthenticated();
  if (authenticated !== this.state.authenticated) {
    this.setState({ authenticated });
  }
}

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  render() {
    return (
      <div>
        {!this.state.authenticated &&
          <div>
            <a onClick={this.login}>Login</a>
          </div>
        }
      </div>
    );
  }
});
```

