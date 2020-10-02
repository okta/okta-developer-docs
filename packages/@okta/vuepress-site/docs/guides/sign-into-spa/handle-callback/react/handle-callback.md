The `LoginCallback` component in the React SDK contains logic to parse the response Okta sends back to your application. All you need to do is wire it up to the route you defined:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';

const CALLBACK_PATH = '/login/callback';

const App = () => {
  return (
    <Router>
      <Security {...config} >
          <Route path={CALLBACK_PATH} component={LoginCallback} />
      </Security>
    </Router>
  );
};
export default App;
```
