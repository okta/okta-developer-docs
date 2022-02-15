### Create routes

Some routes require authentication in order to render. Defining those routes is easy using `SecureRoute` from `@okta/okta-react`. Let's take a look at what routes are needed for this example:

* `/`: A default page to handle basic control of the app.
* `/protected`: A route protected by `SecureRoute`.
* `/login`: Show the sign-in page.
* `/login/callback`: A route to parse tokens after a redirect.

#### `/ - index page`

First, create `src/Home.js` to provide links to navigate your app:

```js
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return null;

  const login = async () => history.push('/login');

  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ?
    <button onClick={logout}>Logout</button> :
    <button onClick={login}>Login</button>;

  return (
    <div>
      <Link to='/'>Home</Link><br/>
      <Link to='/protected'>Protected</Link><br/>
      {button}
    </div>
  );
};
export default Home;
```

#### `/protected`

This route is visible only to users with a valid `accessToken`.

Create a new `src/Protected.js` component:

```js
import React from 'react';

const Protected = () => <h3>Protected</h3>;
export default Protected;
```

#### `/login`

This route hosts the Sign-In Widget and redirects if the user is already logged in. If the user is coming from a protected page, they'll be redirected back to the page upon successful sign in.

Create a new `src/Login.js` component:

```js
import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';

const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log('error logging in', err);
  };

  if (!authState) return null;

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <OktaSignInWidget
      config={config}
      onSuccess={onSuccess}
      onError={onError}/>;
};
export default Login;
```

#### `/login/callback`

The component for this route (LoginCallback) comes with `@okta/okta-react`. It handles token parsing, token storage, and redirecting to a protected page if a sign-in was triggered.

### Connect the routes

This example is using `react-router-dom`. By default, you can include your components and Routes in `src/App.js`. If you need access to particular router properties, such as the 'history' object that's used to override the default sign-in flow, you need to create a wrapper component around `<Router>`.

Update `src/App.js` to create a Router and call `<AppWithRouterAccess>` as a child component:

```js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';

const App = () => (
  <Router>
    <AppWithRouterAccess/>
  </Router>
);
export default App;
```

Create `src/AppWithRouterAccess.js` and include your project components and routes. The `Security` component controls the authentication flows, so it requires your OpenID Connect configuration. By default, `@okta/okta-react` redirects to Okta's sign-in page when the user isn't authenticated. In this example, `onAuthRequired` is overridden to redirect to the custom sign-in route instead:

```js
import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import { oktaAuthConfig, oktaSignInConfig } from './config';

const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/protected' component={Protected} />
        <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Switch>
    </Security>
  );
};
export default AppWithRouterAccess;
```

### Start your app

To start your app, execute:

```js
npm start
```

Open a browser and navigate to your app URL.
