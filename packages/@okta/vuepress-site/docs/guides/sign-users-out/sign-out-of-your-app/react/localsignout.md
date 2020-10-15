Call the `logout` method on the [authService](https://github.com/okta/okta-react#authservicelogouturi) object. The [useOktaAuth](https://github.com/okta/okta-react#useoktaauth) [React Hook](https://reactjs.org/docs/hooks-intro.html) or [withOktaAuth](https://github.com/okta/okta-react#withoktaauth) [higher-order component](https://reactjs.org/docs/higher-order-components.html) makes this object easily available within your components.

Function-based component example:
```javascript
import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

// Basic component with logout button
const Logout = () => {
  const { authService } = useOktaAuth();

  const logout = async () => {
    authService.logout('/');
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
    this.props.authService.logout('/');
  }

  render() {
    return (
      <a onClick={this.logout}>Logout</a>
    );
  }
});

// withOktaAuth() makes Okta "authService" object available
// as "this.props.authService"
Logout = withOktaAuth(Logout);
export default Logout;
```
