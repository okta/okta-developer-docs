Configure a `Security` component in your top-level component. This component provides the [React.Context](https://reactjs.org/docs/context.html) to make an `authService` object and an `authState` object available to child or descendant components.  

```javascript
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';

const config = {
  // Configuration here
};

const App = () => { 
  return (
    <Router>
      <Security {...config}>
        { /* App routes go here */ }
      </Security>
    </Router>
  );
};

export default App;
```
