Use `SecureRoute` on all routes to require authentication before accessing the entire application. 

```javascript
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute } from '@okta/okta-react';

const App = () => { 
  return (
    <Router>
      <Security {...config} >
          <SecureRoute path="/" />
      </Security>
    </Router>
  );
};

export default App;
```

Note that if you will be doing a login redirect flow, the [callback](/docs/guides/sign-users-out/angular/define-signout-callback/) **must not be secured** by a `<SecureRoute>`.

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';

const App = () => { 
  return (
    <Router>
      <Security {...config} >
        <Switch>
          <Route path="/login/callback" component={LoginCallback} />
          <SecureRoute path="/" />
        </Switch>
      </Security>
    </Router>
  );
};

export default App;
```
