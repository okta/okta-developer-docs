
Configure a Security component in your top-level component. We provide the `Security` component that makes an Auth object available to child components and the `withAuth` Higher Order Component (HOC). We show you how to set these up using [React Router DOM](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom):

```javascript


import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config} >
          { /* App routes go here */ }
        </Security>
      </Router>
    );
  }
}

export default App;
```

## Outside Components

You may find that your application needs to interact with the `Auth` object outside of a child component context. 

In this case, you can create the `Auth` object directly and pass it to the `Security` component.

Note that `Auth` has a dependency on the `history` npm module. You should create an instance of this history object and pass it as a property to the `Auth` constructor. You should pass this same history object instance to `Router`.

```javascript

import { Auth } from '@okta/okta-react';
import createHistory from 'history/createBrowserHistory';

const auth = new Auth({
  history,
  ...config
});

import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <Router history={history}>
        <Security auth={auth} >
          { /* App routes go here */ }
        </Security>
      </Router>
    );
  }
}

ReactDOM.render(<App auth={auth} />, document.getElementById('root'));
```
