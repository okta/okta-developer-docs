---
exampleDescription: React Native
---

## Okta React Native Quickstart

This guide will walk you through integrating authentication into a React Native app with Okta by performing these steps:

1. Add an OpenID Connect Client in Okta
2. Install the Okta React Native SDK
3. Provide the Login and Logout Buttons
4. Using the AccessToken

At the end of the React Native instructions you can choose your server type to learn more about post-authentication workflows, such as verifying tokens that your React Native application can send to your server.

## Prerequisites

* If you don't have a React Native app, or are new to React Native, please start with [React Native's documentation](https://github.com/react-community/create-react-native-app#getting-started). It will walk you through the creation of a React Native app and other application development essentials.
* If you are developing with an Android device emulator, make sure to check out the [React Native - Android Development](https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment) setup instructions.

## Add an OpenID Connect Client in Okta

In Okta, applications are OpenID Connect clients that can use Okta Authorization servers to authenticate users.  Your Okta org already has a default authorization server, so you just need to create an OIDC client that will use it.

* Log into the Okta Developer Dashboard, click **Applications** then **Add Application**.
* Choose **Native app** as the platform, then populate your new OpenID Connect application with values suitable for your app. If you are running this locally and using the defaults from [React Native's documentation](https://github.com/react-community/create-react-native-app#getting-started), your `port` will be `19000`:

| Setting             | Value                                         |
| ------------------- | --------------------------------------------  |
| App Name            | My Native App                                 |
| Login redirect URIs | {yourOktaScheme}:/+expo-auth-session          |
|                     | exp://localhost:{port}/+expo-auth-session     |
| Grant Types Allowed | Authorization Code, Refresh Token             |

After you have created the application there are two more values you will need to gather:

| Setting       | Where to Find                                                                  |
| ------------- | ------------------------------------------------------------------------------ |
| Client ID     | In the applications list, or on the "General" tab of a specific application.   |
| Org URL       | <span class="is-signed-in">`https://{yourOktaDomain}` <br></span>On the home screen of the developer dashboard, in the upper right.             |

These values will be used in your React Native application to setup the OpenID Connect flow with Okta.

## Install the Okta React Native SDK

You will need to use the [Okta React Native SDK](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react-native) library to sign in the user by redirecting to the authorization endpoint on your Okta org. You can install it via npm:

```bash
npm install --save @okta/okta-react-native
```

### Configuration

You will need the values from the OIDC client that you created in the previous step to instantiate the client. You will also need to know your Okta org URL, which you can see on the home page of the Okta Developer console.

Assuming you're using an app created with `create-react-native-app`, modify your `app.json` to add a `scheme`:

```javascript
{
  "expo": {
    "scheme": "{yourOktaScheme}"
  }
}
```

In your application's controller, create a new instance of the `TokenClient`:
{% include domain-admin-warning.html %}

```javascript
// App.js

import TokenClient from '@okta/okta-react-native';

const tokenClient = new TokenClient({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  client_id: '{clientId}',
  scope: 'openid profile',
  redirect_uri: __DEV__ ?
    'exp://localhost:{port}/+expo-auth-session' :
    '{yourOktaScheme}:/+expo-auth-session'
});
```

## Provide the Login and Logout Buttons

In the relevant location in your application, you will want to provide `Login` and `Logout` buttons for the user. You can show/hide the correct button by using the `isAuthenticated()` method. For example:

```javascript
import React from 'react';
import { Button, Text, View } from 'react-native';
import TokenClient from '@okta/okta-react-native';

const tokenClient = new TokenClient({
  // See configuration above
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { authenticated: false };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    await this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await tokenClient.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated: authenticated });
    }
  }

  async login() {
    await tokenClient.signInWithRedirect();
    this.checkAuthentication();
  }

  async logout() {
    await tokenClient.signOut();
    this.checkAuthentication();
  }

  render() {
    return (
      <View>
        <Text>Okta + React Native</Text>
        {this.state.authenticated ?
          <Button
            onPress={async () => {this.logout()}}
            title="Logout"
          /> :
          <Button
            onPress={async () => {this.login()}}
            title="Login"
          />
        }
      </View>
    );
  }
}
```

## Using the Access Token

Your React Native application now has an access token in [secure storage](https://docs.expo.io/versions/latest/sdk/securestore) that was issued by your Okta Authorization server. You can use this token to authenticate requests for resources on your server or API. As a hypothetical example, let's say that you have an API that gives us messages for our user.  You could create a `MessageList` component that gets the access token from secure storage, and use it to make an authenticated request to your resource server.

```javascript
async getMessages() => {
  fetch('http://localhost:{serverPort}/api/messages', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${await tokenClient.getAccessToken()}`,
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((json) => {
    this.setState({
      messages: JSON.stringify(json.messages, null, 4)
    });
  });
}
```

Please continue down to the next section, Server Setup, to learn about access token validation on the server.
