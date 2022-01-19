## React

## Use the Sign-In Widget with your SPA app

If you want to deploy a React single-page app (SPA) in the embedded authentication model, where your app retains authentication control without redirection to Okta, then you can use the Okta Sign-In Widget (SIW) to quickly add authentication. The Okta SIW is a JavaScript library that includes full sign-in features with Okta Identity Engine so the amount of authentication code you have to write for your app is minimal.

Before you build your React app, ensure that you [set up](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#get-set-up) your [Okta org for your use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-your-use-case) and [register your React app in Okta](#register-your-app-in-okta).

## Register your app in Okta

Before building your React app, you need to obtain the OpenID Connect client ID from your Okta org by creating an app integration. You can create an app integration through the [Okta CLI](https://cli.okta.com/), the [Okta Apps API](/docs/reference/api/apps/), or the [Admin Console](/docs/guides/quickstart/website/main/#using-the-admin-console).

1. To create an Okta app integration that represents your React.js app, sign in to [your Admin Console](https://login.okta.com).
2. From the side navigation, select **Applications** > **Applications**, and then click **Create App Integration**.
3. In the dialog box that appears, select **OIDC - OpenID Connect** as the **Sign-on method**, **Single-Page Application** as the **Application type**, and then click **Next**.
4. Fill in the following new app integration settings, and then click **Save**:

    | Setting                | Value/Description                                    |
    | -------------------    | ---------------------------------------------------  |
    | App integration name   | Specify a unique name for your app.                  |
    | Grant types            | Select **Authorization Code**, **Interaction Code**, and  **Refresh Token**. |
    | Sign-in redirect URIs  | `http://localhost:8080/login/callback`               |
    | Sign-out redirect URIs | `http://localhost:8080`                              |
    | Trusted Origins > Base URIs | Specify your app base URI. For example: `http://localhost:8080`|
    | Assignments   | Assign users for your app.                                |

    > **Note:** Cross-Origin Resource Sharing (CORS) is automatically enabled for the Trusted Origins base URI you've specified. Ensure that both **CORS** and **redirect** are selected in **Security** > **API** > **Trusted Origins** for your base URI.
### Okta org app integration configuration settings

You need two pieces of information from your org and app integration for your React app:

* **Client ID**: From the **General** tab of your app integration, save the generated **Client ID** value.
* **Issuer**: The [issuer](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) is the authorization server. Use `https://${yourOktaDomain}/oauth2/default` as the issuer for your app if you're using the Okta Developer Edition org. See [Issuer configuration](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#issuer) if you want to use another Okta custom authorization server.

## Build the React app

Build your React app by integrating the Okta libraries:

 * [Create a React app](#create-a-react-app)(optional): Create a new simple React.js app if you don't have an existing app.
 * [Install dependencies](#install-dependencies): Install the Okta libraries for the integration.
 * [Create Okta instances](#create-okta-instances): Create the Okta auth and SIW instances to be used in your app.
 * [Create a SIW wrapper](#create-a-siw-wrapper): Create a wrapper for the Sign-In Widget to be rendered as a React component.
 * [Create routes](#create-routes): Create the routes for your app.
 * [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.

[Start your app](#start-your-app) to test your creation. Sign in with an [existing user from your Okta org](/docs/guides/quickstart/cli/main/#add-a-user-using-the-admin-console).

After successfully authenticating with Okta, the app obtains the user's `id_token`, which contains basic claims for the user's identity. You can extend the set of claims by modifying the [scopes](/docs/reference/api/oidc/#scopes) to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/#scope-values). See [Sign users in to your SPA guide for Vue.js](/docs/guides/sign-into-spa/vue/main/#use-the-access-token) to learn how to use the user's `access_token` to protect routes and validate tokens.

See [Run the sample React app](#run-the-sample-react-app) for an example of a simple embedded authentication React app that uses the Okta SIW and libraries.

### Create a React app

If you don't have an existing React app, you can quickly create an app by using [Getting Started in Create React App](https://create-react-app.dev/docs/getting-started/):

```js
npx create-react-app okta-app
cd okta-app
```

### Install dependencies

To provide a fully-featured and customizable sign-in experience, the [Okta Sign-In Widget](https://developer.okta.com/code/javascript/okta_sign-in_widget/) is available to handle User Lifecycle operations, MFA, and more. Install it by using `npm`:

```js
npm install @okta/okta-signin-widget
```

Then install `@okta/okta-auth-js`, `@okta/okta-react` and `react-router-dom` to manage the routes:

```js
npm install @okta/okta-auth-js @okta/okta-react react-router-dom
```

### Create Okta instances

Create a `src/config.js` file to instantiate `OktaSignIn` and `OktaAuth` with your configuration settings:

```js
const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
};

const oktaSignInConfig = {
  baseUrl: 'https://${yourOktaDomain}',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
  authParams: {
    // If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to uncomment the below line
    // pkce: false
  useInteractionCodeFlow: true,
  }
  // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};

export { oktaAuthConfig, oktaSignInConfig };
```

Replace the `${...}` placeholders with values from your [Okta org app integration configuration settings](#okta-org-app-integration-configuration-settings).

### Create a SIW wrapper

To render the Sign-In Widget in React, you must create a wrapper that allows you to treat it as a React component.

Create a `src/OktaSignInWidget.js` file:

```js
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

## Run the sample React app

You can run the [sample embedded SIW React app](https://github.com/okta/samples-js-react/tree/master/custom-login) to quickly view a sample working React app with the Sign-In Widget.

1. Download the sample app: `git clone https://github.com/okta/samples-js-react.git`
2. Install the dependencies: `npm install`
3. Go to the `custom-login` directory: `cd samples-js-react/custom-login`
3. Set the environment variables with your [Okta org app integration configuration settings](#okta-org-app-integration-configuration-settings):

  ```js
  export ISSUER=https://${yourOktaDomain}/oauth2/default
  export CLIENT_ID=${yourAppClientId}
  export USE_INTERACTION_CODE=true
  ```

4. Run the app server: `npm start`

5. Open a browser window and navigate to the app's home page: http://localhost:8080.

## Support

Have a question or see a bug? Post your question on the [Okta Developer Forum](https://devforum.okta.com/).
