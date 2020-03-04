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
