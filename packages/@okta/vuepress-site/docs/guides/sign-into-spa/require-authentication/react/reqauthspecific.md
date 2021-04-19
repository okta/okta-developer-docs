Use the React SDK's `SecureRoute` component instead of `Route` for the routes that require authentication.

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute } from '@okta/okta-react';

const App = () => { 
  return (
    <Router>
      <Security {...config} >
        <Switch>
          <Route path="/public" />
          <SecureRoute path="/private" />
        </Switch>
      </Security>
    </Router>
  );
};

export default App;
```
