Define a route that handles a path like `/login/callback`. Here's how to do it in [react-router](https://github.com/ReactTraining/react-router):


```jsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const CALLBACK_PATH = '/login/callback';

const App = () => {
  return (
    <Router>
      <Route path={CALLBACK_PATH} />
    </Router>
  );
};

export default App;
```

Our examples use `login/callback` as a default route path, but you can change this. The route path is used in the next step.

Your application is responsible for parsing the information Okta sends to this callback route. Our SDKs can do this for you (covered later in <GuideLink link="../handle-callback/">Handle the callback from Okta</GuideLink>). For now, just define the route itself.
