User info ("claims") is returned from the [getUser()](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#authgetuser) method on the [Auth](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#auth) object. This object is made available in your components as `props.auth` via the [withAuth](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#withauth) Higher Order Component (HOC).

```javascript

import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';

async function checkAuthentication() {
  const authenticated = await this.props.auth.isAuthenticated();
  if (authenticated !== this.state.authenticated) {
    if (authenticated && !this.state.userinfo) {
      const userinfo = await this.props.auth.getUser();
      this.setState({ authenticated, userinfo });
    } else {
      this.setState({ authenticated });
    }
  }
}

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    return (
      <div>
        {this.state.authenticated !== null &&
        <div>
          {this.state.authenticated &&
            <div>
              <p>Welcome back, {this.state.userinfo.name}!</p>
            </div>
          }
        </div>
        }
      </div>
    );
  }
});
```

