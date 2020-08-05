---
title: Okta Sign-In Widget and React
language: React
icon: code-react
excerpt: Integrate Okta with a React app using the Sign-In Widget.
---

This guide will walk you through integrating authentication into a React app with Okta by performing these steps:

1. [Add an OpenID Connect Client in Okta](#add-an-openid-connect-client-in-okta)
2. [Create a React App](#create-a-react-app)
3. [Install Dependencies](#install-dependencies)
4. [Create a Widget Wrapper](#create-a-widget-wrapper)
5. [Create Routes](#create-routes)
6. [Connect the Routes](#connect-the-routes)
7. [Start Your App](#start-your-app)

## Prerequisites

If you do not already have a **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client in Okta

* Log into the Okta Developer Dashboard, and **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect app with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| App Name             | OpenId Connect App *(must be unique)*               |
| Login redirect URIs  | http://localhost:3000/implicit/callback             |
| Logout redirect URIs | http://localhost:3000/login                         |
| Allowed grant types  | Authorization Code                                  |

> **Note:** CORS is automatically enabled for the granted login redirect URIs.

## Create a React App

To quickly create a React app, we recommend the create-react-app CLI. Follow their guide [here](https://github.com/facebookincubator/create-react-app#quick-overview).

## Install Dependencies

A simple way to add authentication into a React app is using the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) library. We can install it via `npm`:

```bash
cd okta-app
npm install @okta/okta-signin-widget --save
```

We'll also need `@okta/okta-react` and `react-router-dom` to manage our routes:

```bash
npm install @okta/okta-react react-router-dom --save
```

## Create a Widget Wrapper

To provide a fully featured and customizable login experience, the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) is available to handle User Lifecycle operations, MFA, and more. To render the Sign-In Widget in React, we must create a wrapper that allows us to treat it as a React component.

Create a `src/OktaSignInWidget.js` file:

```jsx
// src/OktaSignInWidget.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export default class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      authParams: {
        // If your app is configured to use the Implicit Flow 
        // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
        // you will need to uncomment the below line
        // pkce: false
      }
    });
    this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
};
```

## Create Routes

Some routes require authentication in order to render. Defining those routes is easy using `SecureRoute` from `@okta/okta-react`. Lets take a look at what routes are needed for this example:

* `/`: A default page to handle basic control of the app.
* `/protected`: A route protected by `SecureRoute`.
* `/login`: Show the login page.
* `/implicit/callback`: A route to parse tokens after a redirect.

### `/`

First, create `src/Home.js` to provide links to navigate our app:

```jsx
// src/Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    this.props.authService.login('/');
  }

  async logout() {
    this.props.authService.logout('/');
  }

  render() {
    if (this.props.authState.isPending) return null;

    const button = this.props.authState.isAuthenticated ?
      <button onClick={this.logout}>Logout</button> :
      <button onClick={this.login}>Login</button>;

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

Create a new component `src/Protected.js`:

```jsx
// src/Protected.js

import React from 'react';

export default () => <h3>Protected</h3>;
```

### `/login`

This route hosts the Sign-In Widget and redirects if the user is already logged in. If the user is coming from a protected page, they'll be redirected back to the page upon login.

Create a new component `src/Login.js`:


```jsx
// src/Login.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Login extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSuccess(res) {
    if (res.status === 'SUCCESS') {
      return this.props.authService.redirect({
        sessionToken: res.session.token
      });
   } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  onError(err) {
    console.log('error logging in', err);
  }

  render() {
    if (this.props.authState.isPending) return null;
    return this.props.authState.isAuthenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <OktaSignInWidget
        baseUrl={this.props.baseUrl}
        onSuccess={this.onSuccess}
        onError={this.onError}/>;
  }
});
```


### `/implicit/callback`

The component for this route (LoginCallback) comes with `@okta/okta-react`. It handles token parsing, token storage, and redirecting to a protected page if one triggered the login.

### Connect the Routes

Our example is using `react-router-dom`. By default you can include your components and Routes in `src/App.js`. If you need access to particular router properties, such as the `history` object that we use to override the default login flow, you need to create a wrapper component around `<Router>`.

Update `src/App.js` to create a Router and call `<AppWithRouterAccess`>` as a child component:

```jsx
// src/App.js


import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';

class App extends Component {
  render() {
    return (
      <Router>
        <AppWithRouterAccess/>
      </Router>
    );
  }
}

export default App;
```

Create `src/AppWithRouterAccess.js` and include your project components and routes. `Security` is the component that controls the authentication flows, so it requires your OpenId Connect configuration. By default, `@okta/okta-react` redirects to Okta's login page when the user isn't authenticated. In this example, `onAuthRequired` is overridden to redirect to the custom login route instead:

```jsx
// src/AppWithRouterAccess.jsx

import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login')
  }

  render() {

    // Note: If your app is configured to use the Implicit Flow 
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add the below property to what is passed to <Security>
    //
    // pkce={false}

    return (
        <Security issuer='https://${yourOktaDomain}/oauth2/default'
                  clientId='{clientId}'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={this.onAuthRequired} >
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <Route path='/login' render={() => <Login baseUrl='https://${yourOktaDomain}' />} />
          <Route path='/implicit/callback' component={LoginCallback} />
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

Want to learn how to use the user's `access_token`? Check out our <a href='/docs/guides/sign-into-spa/react/before-you-begin/' data-proofer-ignore>React how to guide</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support

Have a question or see a bug? Post your question on [Okta Developer Forums](https://devforum.okta.com/).
