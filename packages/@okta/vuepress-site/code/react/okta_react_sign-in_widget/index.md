---
title: Okta Sign-In Widget and React
language: React
icon: code-react
excerpt: Integrate Okta with a React app using the Sign-In Widget.
---

This guide will walk you through integrating authentication into a React app with Okta by performing these steps:

- [Prerequisites](#prerequisites)
- [Add an OpenID Connect Client in Okta](#add-an-openid-connect-client-in-okta)
- [Create a React App](#create-a-react-app)
- [Install Dependencies](#install-dependencies)
- [Config](#config)
- [Create a Widget Wrapper](#create-a-widget-wrapper)
- [Create Routes](#create-routes)
  - [`/`](#index-page)
  - [`/protected`](#protected)
  - [`/login`](#login)
  - [`/login/callback`](#logincallback)
  - [Connect the Routes](#connect-the-routes)
- [Start your app](#start-your-app)
- [Conclusion](#conclusion)
- [Support](#support)

> This guide is for `@okta/okta-signin-widget` v5.5.0, `@okta/okta-react` v5.0.0 and `okta-auth-js` v4.8.0.

## Prerequisites

If you do not already have a **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client in Okta

* Sign in to the Okta Developer Dashboard, and select **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect app with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| App Name             | OpenID Connect App                                  |
| Login redirect URIs  | `http://localhost:3000/login/callback`              |
| Logout redirect URIs | `http://localhost:3000`                       |
| Allowed grant types  | Authorization Code                                  |

> **Note:** It is important to choose the appropriate application type for apps which are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, hence breaking the sign-in or sign-out flow.

> **Note:** CORS is automatically enabled for the granted login redirect URIs.

## Create a React App

To quickly create a React app, we recommend using Create React App.

```bash
npx create-react-app okta-app
cd okta-app
```

If you need more information, see [the Create React App getting started guide](https://create-react-app.dev/docs/getting-started).

## Install Dependencies

To provide a fully-featured and customizable sign-in experience, the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) is available to handle User Lifecycle operations, MFA, and more. You can install it using `npm`:

```bash
npm install @okta/okta-signin-widget
```

You also need `@okta/okta-auth-js`, `@okta/okta-react` and `react-router-dom` to manage our routes:

```bash
npm install @okta/okta-auth-js @okta/okta-react react-router-dom
```

## Config

Create a `src/config.js` file. Make sure to replace the `{...}` placeholders with your Okta values.

```js
const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{clientId}',
  redirectUri: window.location.origin + '/login/callback',
};

const oktaSignInConfig = {
  baseUrl: 'https://{yourOktaDomain}',
  clientId: '{clientId}',
  redirectUri: window.location.origin + '/login/callback',
  authParams: {
    // If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to uncomment the below line
    // pkce: false
  }
  // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};

export { oktaAuthConfig, oktaSignInConfig };
```

## Create a Widget Wrapper

To render the Sign-In Widget in React, you must create a wrapper that allows you to treat it as a React component.

Create a `src/OktaSignInWidget.js` file:

```jsx
import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current)
      return false;
    
    const widget = new OktaSignIn(config);

    widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return (<div ref={widgetRef} />);
};
export default OktaSignInWidget;
```

## Create Routes

Some routes require authentication in order to render. Defining those routes is easy using `SecureRoute` from `@okta/okta-react`. Let's take a look at what routes are needed for this example:

* `/`: A default page to handle basic control of the app.
* `/protected`: A route protected by `SecureRoute`.
* `/login`: Show the sign-in page.
* `/login/callback`: A route to parse tokens after a redirect.

### `/ - index page`

First, create `src/Home.js` to provide links to navigate our app:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();

  if (authState.isPending) return null;

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

### `/protected`

This route will only be visible to users with a valid `accessToken`.

Create a new component `src/Protected.js`:

```jsx
import React from 'react';

const Protected = () => <h3>Protected</h3>;
export default Protected;
```

### `/login`

This route hosts the Sign-In Widget and redirects if the user is already logged in. If the user is coming from a protected page, they'll be redirected back to the page upon login.

Create a new component `src/Login.js`:

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
    console.log('error logging in', err);
  };

  if (authState.isPending) return null;

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <OktaSignInWidget
      config={config}
      onSuccess={onSuccess}
      onError={onError}/>;
};
export default Login;
```

### `/login/callback`

The component for this route (LoginCallback) comes with `@okta/okta-react`. It handles token parsing, token storage, and redirecting to a protected page if one triggered the login.

### Connect the Routes

Our example is using `react-router-dom`. By default you can include your components and Routes in `src/App.js`. If you need access to particular router properties, such as the `history` object that's used to override the default sign-in flow, you need to create a wrapper component around `<Router>`.

Update `src/App.js` to create a Router and call `<AppWithRouterAccess`>` as a child component:

```jsx
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

Create `src/AppWithRouterAccess.js` and include your project components and routes. `Security` is the component that controls the authentication flows, so it requires your OpenID Connect configuration. By default, `@okta/okta-react` redirects to Okta's sign-in page when the user isn't authenticated. In this example, `onAuthRequired` is overridden to redirect to the custom sign-in route instead:


```jsx
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


## Start your app

Finally, start your app:

```bash
npm start
```

## Conclusion

You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

Want to learn how to use the user's `access_token`? Check out our <a href='/docs/guides/sign-into-spa/react/before-you-begin/' data-proofer-ignore>React how to guide</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support

Have a question or see a bug? Post your question on the [Okta Developer Forum](https://devforum.okta.com/).
