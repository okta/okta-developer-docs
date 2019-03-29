We provide a `SecureRoute` component which extends the `Route` component to require authentication. Use `SecureRoute` on any routes which require authentication.

```javascript
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute } from '@okta/okta-react';

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config} >
            <Route path="/public" />
            <SecureRoute path="/private" />
        </Security>
      </Router>
    );
  }
}

```