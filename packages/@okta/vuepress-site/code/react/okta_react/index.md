---
title: Okta Auth JS and React
language: React
excerpt: Integrate Okta with a React app using Auth JS.
---

# Overview
This guide will walk you through integrating authentication into a React app with Okta by performing these steps:
1. [Add an OpenID Connect Client in Okta](#add-an-openid-connect-client-in-okta)
2. [Create a React App](#create-a-react-app)
3. [Install Dependencies](#install-dependencies)
4. [Create a Custom Login Form](#create-a-custom-login-form)
5. [Create Routes](#create-routes)
6. [Connect the Routes](#connect-the-routes)
7. [Start Your App](#start-your-app)

## Prerequisites
If you do not already have a **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client in Okta
* Log into the Okta Developer Dashboard, and **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect app with values similar to:

| Setting             | Value                                               |
| ------------------- | --------------------------------------------------- |
| App Name            | OpenId Connect App *(must be unique)*               |
| Login redirect URIs | http://localhost:3000/implicit/callback             |
| Logout redirect URIs| http://localhost:3000/login                         |

> **Note:** CORS is automatically enabled for the granted login redirect URIs.

## Create a React App
To quickly create a React app, we recommend the create-react-app CLI. Follow their guide [here](https://github.com/facebookincubator/create-react-app#quick-overview).

## Install Dependencies
A simple way to add authentication to a React app is using the [Okta Auth JS](/code/javascript/okta_auth_sdk) library. We can install it via `npm`:
```bash
npm install @okta/okta-auth-js --save
```

We'll also need `@okta/okta-react` and `react-router-dom` to manage our routes:
```bash
npm install @okta/okta-react react-router-dom --save
```

## Create a Custom Login Form
If the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget) does not fit your needs, [Auth-JS](/code/javascript/okta_auth_sdk) provides lower-level access to User Lifecycle operations, MFA, and more. For this example, we'll create a simple username and password form without MFA.

Create a `src/LoginForm.js` file:

```typescript
// src/LoginForm.js

import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default withAuth(class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      username: '',
      password: ''
    }

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
    .then(res => this.setState({
      sessionToken: res.sessionToken
    }))
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
      this.props.auth.redirect({sessionToken: this.state.sessionToken});
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
Some routes require authentication in order to render. Defining those routes is easy using `SecureRoute` from `@okta/okta-react`. Lets take a look at what routes are needed for this example:

- `/`: A default page to handle basic control of the app.
- `/protected`: A route protected by `SecureRoute`.
- `/login`: Redirect to the org login page.
- `/implicit/callback`: A route to parse tokens after a redirect.

### `/`
First, create `src/Home.js` to provide links to navigate our app:

```typescript
// src/Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;

    const button = this.state.authenticated ?
      <button onClick={this.props.auth.logout}>Logout</button> :
      <button onClick={this.props.auth.login}>Login</button>;
    
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

```typescript
// src/Protected.js

import React from 'react';

export default () => <h3>Protected</h3>;
```

### `/login`
This route redirects if the user is already logged in. If the user is coming from a protected page, they'll be redirected back to the page upon login.

Create a new component `src/Login.js`:

{% raw %}
```typescript
// src/Login.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }
  
  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <LoginForm baseUrl={this.props.baseUrl} />;
  }
});
```
{% endraw %}

### `/implicit/callback`
The component for this route (ImplicitCallback) comes with `@okta/okta-react`. It handles token parsing, token storage, and redirecting to a protected page if one triggered the login.

### Connect the Routes
Update `src/App.js` to include your project components and routes. `Security` is the component that controls the authentication flows, so it requires your OpenId Connect configuration. By default, `@okta/okta-react` redirects to Okta's login page when the user isn't authenticated. In this example, `onAuthRequired` is overridden to redirect to the custom login route instead:

```typescript
// src/App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

function onAuthRequired({history}) {
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer='https://{yourOktaDomain}/oauth2/default'
                  client_id='{clientId}'
                  redirect_uri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired} >
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <Route path='/login' render={() => <Login baseUrl='https://{yourOktaDomain}' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default App;
```

## Start your app
Finally, start your app:

```bash
npm start
```

## Conclusion
You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/api/resources/oidc).

Want to learn how to use the user's `access_token`? Check out our <a href='/quickstart/#/react/nodejs/generic' data-proofer-ignore>React Quickstart integrations</a> to learn about protecting routes on your server, validating the `access_token`, and more!

## Support 
Have a question or see a bug? Post your question on [Okta Developer Forums](https://devforum.okta.com/).
