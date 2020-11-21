Call the [tokenManager.clear](https://github.com/okta/okta-auth-js#tokenmanagerclear) method on the [oktaAuth](https://github.com/okta/okta-auth-js) instance. The [useOktaAuth](https://github.com/okta/okta-react#useoktaauth) [React Hook](https://reactjs.org/docs/hooks-intro.html) or [withOktaAuth](https://github.com/okta/okta-react#withoktaauth) [higher-order component](https://reactjs.org/docs/higher-order-components.html) makes this object easily available within your components.

Function-based component example:
```javascript
import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

// Basic component with logout button
const Logout = () => {
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    oktaAuth.tokenManager.clear();
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
    this.props.oktaAuth.tokenManager.clear();
  }

  render() {
    return (
      <a onClick={this.logout}>Logout</a>
    );
  }
});

// withOktaAuth() makes Okta "oktaAuth" object available
// as "this.props.oktaAuth"
Logout = withOktaAuth(Logout);
export default Logout;
```
