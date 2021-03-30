Implementing a login button requires that you know IF you should show the button as well as how to implement the button.

The `okta-react` SDK provides you with:
- an [authState](https://github.com/okta/okta-auth-js#authstatemanager) object that provides information on the state of the current user's authentication
- an [oktaAuth](https://github.com/okta/okta-auth-js) object that provides methods to read more details about, or to modify, the current authentication

Function-based components can use the `useOktaAuth` [React hook](https://reactjs.org/docs/hooks-intro.html) to access the `oktaAuth` or the `authState` objects.

Class-based components can use the `withOktaAuth` [higher-order component](https://reactjs.org/docs/higher-order-components.html) to receive the `oktaAuth` and `authState` objects as props.

You can use the `authState.isAuthenticated` property to show or hide a button depending on whether the user is signed in.

The `oktaAuth.signInWithRedirect()` method lets you specify the path you'd like the user to be navigated to after authenticating.

Function-based component example:

```javascript
import { useOktaAuth } from '@okta/okta-react';
import React from 'react';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = () => oktaAuth.signInWithRedirect({originalUri: '/profile'});

  if( authState.isPending ) {
    return (
      <div>Loading authentication...</div>
    );
  } else if( !authState.isAuthenticated ) {
    return (
      <div>
        <a onClick={login}>Login</a>
      </div>
    );
  }
};
export default Home;
```

Class-based component example:

```javascript
import { withOktaAuth } from '@okta/okta-react';
import React, { Component } from 'react';

export default withOktaAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  async login() {
    this.props.oktaAuth.signInWithRedirect({originalUri: '/profile'});
  }

  render() {
    if( this.props.authState.isPending ) {
      return (
        <div>Loading authentication...</div>
      );
    } else if( !this.props.authState.isAuthenticated ) {
      return (
        <div>
          <a onClick={this.login}>Login</a>
        </div>
      );
    }
  }
});
```
