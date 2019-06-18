Define a route that handles a path like `/implicit/callback`. Here's how to do it in [react-router](https://github.com/ReactTraining/react-router):


```javascript
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const CALLBACK_PATH = '/implicit/callback';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path={CALLBACK_PATH} />
      </Router>
    );
  }
}

```
