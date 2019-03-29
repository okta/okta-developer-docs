We provide a `SecureRoute` component which extends the `Route` component to require authentication. Use `SecureRoute` on all routes to require authentication before accessing the entire application.

```javascript
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute } from '@okta/okta-react';

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config} >
            <SecureRoute path="/" />
        </Security>
      </Router>
    );
  }
}

```