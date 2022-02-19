### Create routes

Typically, an app contain routes that require authentication in order to render. Use the `SecureRoute` component from [Okta React SDK](https://github.com/okta/okta-react) (`@okta/okta-react`) to define authenticated routes for your app. The following are some basic routes that you need to configure for your app:

* A [default page](#default-page-route) to handle basic control of the app
* A [login route](#login-route) to show the Sign-In Widget
* A [callback route](#callback-route) to parse tokens after a redirect from Okta
* A [protected route](#protected-route) for authenticated users to access protected content

#### Default page route

To create the default `/index` page, edit the `src/Home.js` file to provide links to relevant locations in your app. You need to provide a `Login` link to render the Sign-In Widget, a `Logout` link to sign-out of your authenticated session, and links to authenticated pages by using the `authState` object (see [`authStateManager` in the Auth JS SDK](https://github.com/okta/okta-auth-js#authstatemanager)). The [`useOktaAuth()` method is a React hook](https://github.com/okta/okta-react#useoktaauth) that returns an object containing the `authState` and the `oktaAuth` instance. This hook triggers the page to rerender whenever `authState` is updated.

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

#### Protected route

Create a protected route that is only available to users with a valid `accessToken`.

In this `/protected` component example, a `src/Protected.js` file is created to show a basic protected page:

```js
import React from 'react';

const Protected = () => <h3>Protected</h3>;
export default Protected;
```

#### Login route

This route hosts the Sign-In Widget and redirects if the user is already signed in. If the user is coming from a protected page, they'll be redirected back to the page upon successful sign in.

For example, create a `src/Login.js` file with the Login route component:

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

#### Callback route

The [Okta React SDK](https://github.com/okta/okta-react) provides the [LoginCallback](https://github.com/okta/okta-react#logincallback) component for the callback route. It handles token parsing, token storage, and redirects the user to the `/` path. If a `SecureRoute` triggered the redirect, then the callback is directed to the secured route. See how the callback route component is called from the route definition file (`src/AppWithRouterAccess.js`) in the [Connect the routes](#connect-the-routes) section.

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
