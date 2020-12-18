Configure an [OktaAuth](https://github.com/okta/okta-auth-js) object in your top-level component and pass it as a prop to the [Security](https://github.com/okta/okta-react#security) component. This component provides the [React.Context](https://reactjs.org/docs/context.html) to make an `oktaAuth` object and an [authState](https://github.com/okta/okta-auth-js#authstatemanager) object available to child or descendant components.  

```javascript
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';

const config = {
  // Configuration here
};

const oktaAuth = new OktaAuth(config);

const App = () => {
  return (
    <Router>
      <Security oktaAuth={oktaAuth}>
        { /* App routes go here */ }
      </Security>
    </Router>
  );
};

export default App;
```
