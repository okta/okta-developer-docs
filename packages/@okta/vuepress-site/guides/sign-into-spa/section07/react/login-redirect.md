The `Auth` object is provided on your component's props via the `withAuth` component. You can use the `auth.isAuthenticated()` method to show or hide a button depending on whether the user is signed in.

```javascript
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';

async function checkAuthentication() {
  const authenticated = await this.props.auth.isAuthenticated();
}

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
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
    this.props.auth.login('/profile');
  }

  render() {
    return (
      <div>
        {this.state.authenticated !== null &&
        <div>
          {!this.state.authenticated &&
            <div>
              <a onClick={this.login}>Login</a>
            </div>
          }
        </div>
        }
      </div>
    );
  }
});
```

The `login()` method lets you specify the path you'd like the user to be navigated to after authenticating.