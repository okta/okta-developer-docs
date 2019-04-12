Configure a `Security` component in your top-level component. This component makes an `Auth` object available to child components and the `withAuth` [higher-order component](https://reactjs.org/docs/higher-order-components.html).

```javascript
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';

const config = {
  // Configuration here
};

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config}>
          { /* App routes go here */ }
        </Security>
      </Router>
    );
  }
}

export default App;
```
