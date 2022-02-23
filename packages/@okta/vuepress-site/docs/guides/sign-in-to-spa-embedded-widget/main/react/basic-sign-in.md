### Create routes

Typically, an app contain routes that require authentication in order to render. Use the `<SecureRoute>` component from [Okta React SDK](https://github.com/okta/okta-react) to define authenticated routes for your app. The following are some basic routes that you need to configure for your app:

* A [default page](#default-page-route) to handle basic control of the app
* A [login route](#login-route) to show the Sign-In Widget
* A [callback route](#callback-route) to parse tokens after a redirect from Okta
* A [protected route](#protected-route) for authenticated users to access protected content

#### Default page route

To create the default `/` page, edit the `src/Home.jsx` file to provide links to relevant locations in your app.

You need to provide a `Login` link to render the Sign-In Widget, a `Logout` link to sign-out of your authenticated session, and links to authenticated pages by using the `authState` object (see [`authStateManager` in the Auth JS SDK](https://github.com/okta/okta-auth-js#authstatemanager)). The [`useOktaAuth()` method is a React hook](https://github.com/okta/okta-react#useoktaauth) that returns an object containing the `authState` and the `oktaAuth` instance. This hook triggers the page to rerender whenever `authState` is updated.

```jsx
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  if (!authState) {
    return <div>Loading ...</div>;
  }

  const handleLogin = async () => history.push('/login');

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <div id="home">
      <Link to="/">Home</Link> | &nbsp;
      <Link id="protected" to="/protected">Protected</Link> | &nbsp;
      {
        authState.isAuthenticated
          ? <button id="logout-button" type="button" onClick={handleLogout}>Logout</button>
          : <button id="login-button" type="button" onClick={handleLogin}>Login</button>
      }
    </div>
  );

};
export default Home;
```

#### Protected route

Create a protected route that is only available to users with a valid `accessToken`.

In this `/protected` component example, a `src/Protected.jsx` file is created to show a basic protected page:

```jsx
import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Protected = () => {
  <h3 id="protected">Protected</h3>
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user info ...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p id="welcome">
          Welcome, &nbsp;{userInfo.name}!
        </p>
        <p>You have successfully authenticated against your Okta org, and have been redirected back to this application.</p>
      </div>
    </div>
  );
};

export default Protected;
```

#### Login route

This route hosts the Sign-In Widget and redirects the user to the default home page if the user is already signed in.

For example, create a `src/Login.jsx` file with the Login route component:

```jsx
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
    console.log('Sign in error:', err);
  };

  if (!authState) {
    return <div>Loading ... </div>;
  }

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;
};

export default Login;
```

#### Callback route

The [Okta React SDK](https://github.com/okta/okta-react) provides the [`LoginCallback`](https://github.com/okta/okta-react#logincallback) component for the callback route. It handles token parsing, token storage, and redirects the user to the `/` path. If a `<SecureRoute>` triggered the redirect, then the callback is directed to the secured route. See how the callback route component is called from the route definition file (`src/App.jsx`) in the [Connect the routes](#connect-the-routes) section.

### Connect the routes

Update `src/App.jsx` to include your project components and routes. The `<Security>` component controls the authentication flows, so it requires your OpenID Connect configuration. By default, `@okta/okta-react` redirects to Okta's sign-in page when the user isn't authenticated. In this example, `onAuthRequired` is overridden to redirect to the custom sign-in route instead.

> **Note:** This example uses the `react-router-dom` version 5.x module for the `useHistory` and `Route` objects.

```jsx
import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import Profile from './Profile';
import config from './config';

import logo from './logo.svg';
import './App.css';

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '', window.location.origin));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>My Okta-React app</p>
        <img src={logo} className="App-logo" alt="logo" />
      <Security
        oktaAuth={oktaAuth}
        onAuthRequired={customAuthHandler}
        restoreOriginalUri={restoreOriginalUri}
      >
        <Route path="/" exact component={Home} />
        <SecureRoute path="/protected" component={Protected} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/login/callback" component={LoginCallback} />
    </Security>
    </header>
    </div>
  );
};

export default App;

```

### Start your app

To run and test your app, execute:

```js
npm start
```

Open a browser and navigate to your app URL. For example: [http://localhost:3000](http://localhost:3000)
