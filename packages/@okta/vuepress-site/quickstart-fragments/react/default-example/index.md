---
exampleDescription: React PKCE
---

## Okta React Quickstart

This guide will walk you through integrating authentication into a React app with Okta by performing these steps:

1. Add an OpenID Connect Client in Okta
2. Install the Okta React SDK
3. Attach Components to the Secure Router
4. Use the Access Token

At the end of the React instructions you can choose your server type to learn more about post-authentication workflows, such as verifying tokens that your React application can send to your server.

> If you would prefer to download a complete sample application instead, please visit [React Sample Applications for Okta][] and follow those instructions.

## Prerequisites

If you don't have a React app, or are new to React, please start with [React's documentation](https://facebook.github.io/react/docs/installation.html#creating-a-new-application). It will walk you through the creation of a React app, creating routes, and other application development essentials.

## Add an OpenID Connect Client in Okta

In Okta, applications are OpenID Connect clients that can use Okta Authorization servers to authenticate users.  Your Okta org already has a default authorization server, so you just need to create an OIDC client that will use it.

* Log into the Okta Developer Dashboard, click **Applications** then **Add Application**.
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect application with values suitable for your app. If you are running this locally and using the defaults from [React's documentation](https://facebook.github.io/react/docs/installation.html#creating-a-new-application), your `port` will be `3000`:

| Setting             | Value                                        |
| ------------------- | -------------------------------------------- |
| App Name            | My SPA App                                   |
| Base URIs           | http://localhost:{port}                      |
| Login redirect URIs | http://localhost:{port}/implicit/callback    |
| Allowed grant types | Authorization Code                           |

After you have created the application there are two more values you will need to gather:

| Setting       | Where to Find                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------                                                      |
| Client ID     | In the applications list, or on the "General" tab of a specific application.                                                        |
| Org URL       | <span class="is-signed-in">`https://{yourOktaDomain}` <br></span>On the home screen of the developer dashboard, in the upper right. |

These values will be used in your React application to setup the OpenID Connect flow with Okta.

## Install the Okta React SDK

You will need to use the [Okta React SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react) library to sign in the user by redirecting to the authorization endpoint on your Okta org. You can install it via npm:

```bash
npm install @okta/okta-react --save
```

### Configuration

You will need the values from the OIDC client that you created in the previous step to instantiate the middleware. You will also need to know your Okta org URL, which you can see on the home page of the Okta Developer console. Your Okta org URL + `oauth2/default` will be the `issuer` param.

In your application's `App.js` file, import the following objects and pass in your configuration:
<DomainAdminWarning />

```typescript
import { Security, ImplicitCallback } from '@okta/okta-react';

const config = {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '{clientId}',
  pkce: true
}
```

## Attach Components to the Secure Router

You'll need to provide these routes in your sample application, so that we can sign the user in and handle the callback from Okta. We will show you how to set these up below using [React Router DOM](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom):

* `/`: A default home page to handle basic control of the app.
* `/implicit/callback`: This is where auth is handled for you after redirection.

### Provide the Login and Logout Buttons

In the relevant location in your application, you will want to provide `Login` and `Logout` buttons for the user. You can show/hide the correct button by using the `auth.isAuthenticated()` method. For example:

```typescript
// src/Home.js

import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ?
      <button onClick={this.logout}>Logout</button> :
      <button onClick={this.login}>Login</button>;
  }
});
```

### Update your `App.js`

Finally, passing in your configuration into `Security`, and connect your application's paths:

```typescript
// src/App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';

const config = {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '{clientId}',
  pkce: true
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config}>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/implicit/callback' component={ImplicitCallback}/>
        </Security>
      </Router>
    );
  }
}

export default App;
```

## Use the Access Token

Your React application now has an access token in local storage that was issued by your Okta Authorization server. You can use this token to authenticate requests for resources on your server or API. As a hypothetical example, let's say that you have an API that gives us messages for our user.  You could create a `MessageList` component that gets the access token from local storage, and use it to make an authenticated request to your server.

Please continue down to the next section, Server Setup, to learn about access token validation on the server.  Here is what the React component could look like for this hypothetical example:

```typescript
import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: null
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:{serverPort}/api/messages', {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();
      this.setState({ messages: data.messages });
    } catch (err) {
      // handle error as needed
    }
  }

  render() {
    if (!this.state.messages) return <div>Loading..</div>;
    const items = this.state.messages.map(message =>
      <li key={message}>{message}</li>
    );
    return <ul>{items}</ul>;
  }
}));
```

[React Sample Applications for Okta]: https://github.com/okta/samples-js-react
