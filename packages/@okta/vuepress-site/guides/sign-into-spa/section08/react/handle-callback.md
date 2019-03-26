
In order to handle the redirect back from Okta, you need to capture the token values from the `Login Redirect URI` callback and pass them to the handleAuthentication() method of the Auth object. We have provided `ImplicitCallback` component that implements this logic. `ImplicitCallback` component can be mapped to a route as shown:


```javascript
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';

const CALLBACK_PATH = '/implicit/callback';

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config} >
            <Route path={CALLBACK_PATH} component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

```
