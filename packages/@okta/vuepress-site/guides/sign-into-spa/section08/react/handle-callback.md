The React SDK contains a component that can handle the callback route automatically. The `ImplicitCallback` component contains logic to parse the response Okta sends back to your application.

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