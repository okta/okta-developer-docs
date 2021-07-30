---
title: Okta Auth JS and React
language: React
icon: code-react
excerpt: Integrate Okta with a React app using Auth JS.
---

This guide will walk you through integrating authentication into a React app with Okta by performing these steps:
- [Prerequisites](#prerequisites)
- [Add an OpenID Connect Client in Okta](#add-an-openid-connect-client-in-okta)
- [Create a React App](#create-a-react-app)
- [Install Dependencies](#install-dependencies)
- [Create a Custom Sign-In Form](#create-a-custom-sign-in-form)
- [Create Routes](#create-routes)
  - [`/`](#)
  - [`/protected`](#protected)
  - [`/login`](#login)
  - [`/login/callback`](#logincallback)
  - [Connect the Routes](#connect-the-routes)
- [Start your app](#start-your-app)
- [Conclusion](#conclusion)
- [Support](#support)

> This guide is for `@okta/okta-auth-js` v5.1.1 and `@okta/okta-react` v6.0.0.

## Prerequisites
If you do not already have a **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client in Okta
* Sign in to the Okta Developer Dashboard, and select **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect application with appropriate values for your app. For example:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| App Name             | OpenID Connect App (must be unique)                 |
| Login redirect URIs  | `http://localhost:3000/login/callback`              |
| Logout redirect URIs | `http://localhost:3000/`                       |
| Allowed grant types  | Authorization Code                                  |

> **Note:** It is important to choose the appropriate application type for apps which are public clients. Failing to do so may result in Okta API endpoints attempting to verify an app's client secret, which public clients are not designed to have, hence breaking the sign-in or sign-out flow.
> **Note:** CORS is automatically enabled for the granted login redirect URIs.

## Create a React App

To create a React app, you can use [Create React App](https://create-react-app.dev/):

```bash
npx create-react-app okta-app
```

This creates a new project in a folder named `okta-app` and installs all required dependencies.

```bash
cd okta-app
```

## Install Dependencies

A simple way to add authentication to a React app is using the [Okta Auth JS](/code/javascript/okta_auth_sdk/) library. You can install it using `npm`:

```bash
npm install @okta/okta-auth-js
```

You also need `@okta/okta-react` and `react-router-dom` to manage your routes. You can use `@okta/okta-react` to support other router libraries, but `react-router-dom` has pre-existing support.

```bash
npm install @okta/okta-react react-router-dom
```

## Create a Custom Sign-In Form
If the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) doesn't fit your needs, [Okta Auth JS](/code/javascript/okta_auth_sdk/) provides lower-level access to User Lifecycle operations, MFA, and more. For this example, you create a simple username and password form without MFA.

Create a `src/SignInForm.jsx` file:

`src/SignInForm.jsx` using a function-based component:

```jsx
import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const SignInForm = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    oktaAuth.signInWithCredentials({ username, password })
    .then(res => {
      const sessionToken = res.sessionToken;
      setSessionToken(sessionToken);
      // sessionToken is a one-use token, so make sure this is only called once
      oktaAuth.signInWithRedirect({ sessionToken });
    })
    .catch(err => console.log('Found an error', err));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          id="username" type="text"
          value={username}
          onChange={handleUsernameChange} />
      </label>
      <label>
        Password:
        <input
          id="password" type="password"
          value={password}
          onChange={handlePasswordChange} />
      </label>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};
export default SignInForm;
```

`src/SignInForm.jsx` using a class-based component:

```jsx
import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      const sessionToken = res.sessionToken;
      this.setState(
        { sessionToken },
        // sessionToken is a one-use token, so make sure this is only called once
        () => this.props.oktaAuth.signInWithRedirect({sessionToken})
      );
    })
    .catch(err => console.log('Found an error', err));
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    if (this.state.sessionToken) {
      // Hide form while sessionToken is converted into id/access tokens
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            id="username" type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange} />
        </label>
        <label>
          Password:
          <input
            id="password" type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange} />
        </label>
        <input id="submit" type="submit" value="Submit" />
      </form>
    );
  }
});
```

## Create Routes
Some routes require authentication in order to render. Defining those routes is easy using `SecureRoute` from `@okta/okta-react`. Let's take a look at what routes are needed for this example:

- `/`: A default page to handle basic control of the app.
- `/protected`: A route protected by `SecureRoute`.
- `/login`: Redirect to the org sign-in page.
- `/login/callback`: A route to parse tokens after a redirect.

### `/`
First, create `src/Home.jsx` to provide links to navigate our app:

`src/Home.jsx` using a function-based component:

```jsx
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  if (!authState) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated ?
    <button onClick={() => {oktaAuth.signOut()}}>Logout</button> :
    <button onClick={() => {history.push('/login')}}>Login</button>;

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

`src/Home.jsx` using a class-based component:

```jsx
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Home extends Component {

  render() {
    if (!this.props.authState) {
      return <div>Loading...</div>;
    }

    const button = this.props.authState.isAuthenticated ?
      <button onClick={() => {this.props.oktaAuth.signOut()}}>Logout</button> :
      <button onClick={() => {this.props.history.push('/login')}}>Login</button>;

    return (
      <div>
        <Link to='/'>Home</Link><br/>
        <Link to='/protected'>Protected</Link><br/>
        {button}
      </div>
    );
  }
});
```

### `/protected`
This route will only be visible to users with a valid `accessToken`.

Create a new component `src/Protected.jsx`:

```jsx
import React from 'react';

const Home = () => <h3>Protected</h3>;
export default Home;
```

### `/login`
This route redirects if the user is already logged in. If the user is coming from a protected page, they'll be redirected back to the page upon successful sign in.

Create a new component `src/SignIn.jsx`:

`src/SignIn.jsx` using a function-based component:
```jsx
import React from 'react';
import { Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';
import { useOktaAuth } from '@okta/okta-react';

const SignIn = () => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <SignInForm />;
};

export default SignIn;
```

`src/SignIn.jsx` using a class-based component:

```jsx
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class SignIn extends Component {
  render() {
    if (!this.props.authState) {
      return <div>Loading...</div>;
    }
    return this.props.authState.isAuthenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <SignInForm />;
  }
});
```

### `/login/callback`
The component for this route (LoginCallback) comes with `@okta/okta-react`. It handles token parsing, token storage, and redirecting to a protected page if one triggered the sign in.

### Connect the Routes
Update `src/App.js` to include your project components and routes. `Security` is the component that controls the authentication flows, so it requires your OpenID Connect configuration. By default, `@okta/okta-react` redirects to Okta's sign-in page when the user isn't authenticated.

In this example, `onAuthRequired` is overridden to redirect to the custom sign-in route instead, which requires a component that is a descendent of Router to have access to `react-router`'s `history`.  Other router libraries will have their own methods of managing browser history:

Update `src/App.js` to use function-based components:
```jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';

const App = () => {
  return (
    <Router>
      <AppWithRouterAccess/>
    </Router>
  );
}

export default App;
```

And, create its companion at `src/AppWithRouterAccess.jsx`. Make sure to replace the `{...}` placeholders with your Okta values.

```jsx
import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import SignIn from './SignIn';
import Protected from './Protected';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    clientId: '{clientId}',
    redirectUri: window.location.origin + '/login/callback',
    onAuthRequired: onAuthRequired,
    pkce: true
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path='/' exact={true} component={Home} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login' render={() => <SignIn />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;
```

You can also update `src/App.js` and `src/AppWithRouterAccess.jsx` to use class-based components:

```jsx
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';

class App extends Component {
  render() {
    return (
      <Router>
        <AppWithRouterAccess />
      </Router>
    );
  }
}

export default App;
```
```jsx
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Home from './Home';
import SignIn from './SignIn';
import Protected from './Protected';

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);

    this.oktaAuth = new OktaAuth({
      issuer: 'https://{yourOktaDomain}/oauth2/default',
      clientId: '{clientId}',
      redirectUri: window.location.origin + '/login/callback',
      onAuthRequired: this.onAuthRequired,
      pkce: true
    });
  }

  onAuthRequired() {
    this.props.history.push('/login');
  }

  async restoreOriginalUri(_oktaAuth, originalUri) {
    this.props.history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  render() {
    return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={this.restoreOriginalUri}>
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/protected' component={Protected} />
        <Route path='/login' render={() => <SignIn />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Security>
    );
  }
});
```

## Start your app
Finally, start your app:

```bash
npm start
```

## Conclusion
You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

Want to learn how to use the user's `access_token`? Check out our <a href='/docs/guides/sign-into-spa/react/before-you-begin/' data-proofer-ignore>React How To Guide</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support
Have a question or see a bug? Post your question on the [Okta Developer Forum](https://devforum.okta.com/).
