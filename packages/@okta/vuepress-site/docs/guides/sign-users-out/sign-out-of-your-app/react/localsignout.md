Call the `logout` method on the [Auth](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#authlogouturi) object. The [withAuth](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#withauth) [higher-order component](https://reactjs.org/docs/higher-order-components.html) makes this object easily available within your components.

```javascript
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

// Basic component with logout button
class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    this.props.auth.logout('/');
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
