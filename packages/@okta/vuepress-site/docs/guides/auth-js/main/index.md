---
title: Auth JS fundamentals
---

<ApiLifecycle access="ie" /><br>

> **Note:** This document is only for Okta Identity Engine. If you’re using Okta Classic Engine, see [Auth JS fundamentals](/docs/guides/archive-auth-js/main/). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide explains authentication fundamentals using Auth JS, known more formally as the Okta Auth JavaScript SDK, and provides a simple, single-page application (SPA) to demonstrate a sign-in use case.

---

**Learning outcomes**

* Understand how to implement basic sign-in using Auth JS.
* Understand basic installation and code configurations using AuthJS.
* Implement the sample SPA use case and sign a user in to the application.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Okta Auth JS SDK Interaction Code reference documentation](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#introduction)
* Basic knowledge of building front-end JavaScript applications

**Sample code**

* [static-spa sample](https://github.com/okta/okta-auth-js/tree/master/samples/generated/static-spa)

---

## About the Okta Auth JavaScript SDK

The Okta Auth JS SDK builds on top of the [Authentication API](/docs/reference/api/authn/) and [OpenID Connect API](/docs/reference/api/oidc/), as well as the Identity Engine [interaction code](/docs/concepts/interaction-code/) flow, to enable you to create a fully branded sign-in experience using JavaScript.

The Okta Auth JS SDK is used by Okta's [Sign-in Widget](https://github.com/okta/okta-signin-widget), which powers the default Okta sign-in page. If you're building a JavaScript front end or single-page application (SPA), the Auth JS SDK provides added control and customization beyond what is possible with the Widget.

In this guide you'll learn how to use the Auth JS SDK with a simple static page application to authenticate and store an OpenID Connect (OIDC) token (`idToken`) and access token (`accessToken`).

If you'd like to explore the entire Auth JS SDK, see [Okta Auth JS JavaScript SDK](https://github.com/okta/okta-auth-js/#readme).

## Installation

Install Auth JS by linking out to the Okta CDN, or installing locally through `npm` or another package manager.

### CDN

To use the CDN, include this script in your target HTML page:

```html
<!-- Latest CDN production Auth JS SDK-->
<script src="https://global.oktacdn.com/okta-auth-js/6.0.0/okta-auth-js.polyfill.js" type="text/javascript"></script>
```

More information is available in the [Okta Auth JS SDK](https://github.com/okta/okta-auth-js/#okta-auth-javascript-sdk).

### npm

```shell
# Run this command in your project root folder.
# yarn
yarn add @okta/okta-auth-js

# npm
npm install @okta/okta-auth-js
```

More information is available in the [Okta Auth JS SDK](https://github.com/okta/okta-auth-js/#using-the-npm-module).

## Add code to reference the SDK

The following sections display basic code snippets you use when accessing Auth JS.

### Initialize the SDK

To initialize the SDK, create a new instance of the `OktaAuth` object. The `apps.js` file of the static-spa sample ues the function `createAuthClient()`:

```JavaScript
 function createAuthClient() {
  // The `OktaAuth` constructor can throw if the config is malformed
  try {
    authClient = new OktaAuth({
      issuer: config.issuer,
      clientId: config.clientId,
      redirectUri: config.redirectUri,
      scopes: config.scopes,
      tokenManager: {
        storage: config.storage
      },
      transformAuthState
    });
    if (config.startService) {
      authClient.start();
    }
  } catch (error) {
    return showError(error);
  }
}
```

The object is initialized with the configurations from your Okta org app integration: `issuer`, `clientId`, and `redirectUri`. These values are referenced in the sample application's `config` variable and `loadConfig` function.

### Create a sign-in page

Build a sign-in page that captures both the username and password. As an example, from the `index.html` page of the static-spa sample:

```HTML
<!-- authMethod: form -->
        <!-- static signin form (authn and oie)-->
        <div id="static-signin-form" style="display: none" class="panel pure-form pure-form-aligned">
          <div class="pure-control-group">
            <label for="username">Username</label>
            <input name="username" type="email" autocomplete="username">
          </div>
          <div class="pure-control-group">
            <label for="password">Password</label>
            <input name="password" type="password" autocomplete="password">
          </div>
          <div class="pure-controls">
            <p><a href="/" data-se="recover-password" onclick="_showRecoverPassword(event)">Forgot your password?</a></p>
            <a class="pure-button pure-button-primary" href="/" data-se="submit" onclick="_submitStaticSigninForm(event)">Signin</a>
          </div>
        </div>
```

### Authenticate user credentials

After the user enters a username and password and clicks **Signin**, the function `submitStaticSigninform` is called and sends the credentials for authentication to the Okta org for verification using the `idx.authenticate` method.

See [`idx.authenticate`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate).

```JavaScript
function submitStaticSigninForm() {
  const username = document.querySelector('#static-signin-form input[name=username]').value;
  const password = document.querySelector('#static-signin-form input[name=password]').value;

  if (!config.useInteractionCodeFlow) {
    // Authn
    return authClient.signIn({ username, password })
      .then(handleTransaction)
      .catch(showError);
  }

  return authClient.idx.authenticate({ username, password })
    .then(handleTransaction)
    .catch(showError);

}
```

### Handle responses

For a successful sign-in, the response from Okta includes a status field value of `SUCCESS` and includes the access and ID tokens. The `handleTransaction` function in the static-spa sample processes this state, as well as other values of the status field. The `endAuthFlow` function stores the tokens.

```JavaScript
function handleTransaction(transaction) {
  if (!config.useInteractionCodeFlow) {
    // Authn
    return handleTransactionAuthn(transaction);
  }

  // IDX
  if (transaction.messages) {
    showError(transaction.messages);
  }

  switch (transaction.status) {
    case 'PENDING':
      if (transaction.nextStep.name === 'identify') {
        renderDynamicSigninForm(transaction);
        break;
      }
      hideSigninForm();
      updateAppState({ transaction });
      showMfa();
      break;
    case 'FAILURE':
      showError(transaction.error);
      break;
    case 'SUCCESS':
      hideSigninForm();
      endAuthFlow(transaction.tokens);
      break;
    default:
      throw new Error(transaction.status + ' status');
  }
```

See [`status`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#status).

### Get the user profile information

The static-spa sample application renders user and access token information after a successful sign in. The function `getUserInfo` retrieves the user details:

```JavaScript
function getUserInfo() {
  return authClient.token.getUserInfo()
    .then(function(value) {
      updateAppState({ userInfo: value });
      renderApp();
    })
    .catch(function (error) {
      // This is expected when Okta SSO does not exist
      showError(error);
    });
}
```

And the `accessToken` information is rendered using the `renderAuthenticated` and `renderUserInfo` functions.

See [`token.getUserInfo`](https://github.com/okta/okta-auth-js#tokengetuserinfoaccesstokenobject-idtokenobject).

## Run the sample application

Run the static-spa sample application to see a working example of the authentication flow using the Auth JS SDK. To run the Auth JS SDK static-spa sample application:

* Create an app integration on your Okta org.
* Download and install the sample application.
* Run the sample application.

<img src="/img/okta-sign-in-javascript-custom.png" alt="Screenshot of a custom sign-in form used with the Auth JS SDK" width="400">

### Create an app integration

Create an app integration in the Okta org that represents the application you want to add authentication to:

1. In the Admin Console, go to **Applications** > **Applications**.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Single-Page Application** for the **Application Type**.
1. On the **New Single-Page App Integration** page:

   * Enter an application name.
   * Select the **Interaction Code** checkbox.
   * Select the **Refresh Token** checkbox.
   * Set **Sign-in redirect URIs** to `http://localhost:8080/login/callback`.

1. In the **Assignments** section, select **Allow everyone in your organization to access**.
1. Click **Save**.
1. Select the **Sign On** tab.
1. In the **Sign On Policy** section, verify that the **Available Authenticators** settings are appropriate for your app. For this use case, ensure that the **1 factor type** authenticator is **Password / IdP**.
1. In the **Security** > **API** > **Authorization Servers** section, verify that the custom authorization server uses the Interaction Code grant type by selecting the **default** server, clicking **Access Policies**, and editing the **Default Policy Rule**. Review the **If Grant type is** section to ensure the **Interaction Code** checkbox is selected.
1. In the **Security** > **API** > **Trusted Origins** page, ensure that there is an entry for your sign in redirect URI (`http://localhost:8080`). See [Enable CORS](/docs/guides/enable-cors/).

> **Note:** From the **General** tab of your app integration, save the generated **Client ID** value, which is used in the next section.

### Download and install the sample app

The sample app, `static-spa` resides in the `okta-auth-js` repository. Clone the repository and install the project dependencies:

1. Clone the Okta Auth JavaScript SDK repository to your local project directory and navigate to the `static-spa` directory:

```shell
git clone https://github.com/okta/okta-auth-js.git
cd okta-auth-js/samples/generated/static-spa
```

2. Install the dependencies with a package manager, `npm` for example:

```shell
npm install
```

3. In the `apps.js` file, update your Okta org configurations (`issuer` and `clientId`) for the static-spa application in the `config` variable:

```JavaScript
var config = {
  issuer: `https://${yourOktaDomain}/oauth2/default`, //For example, `"https://example.okta.com/oauth2/default"`
  clientId: `${yourClientId}`, // for example, `0oa2am3kk1CraJ8xO1d7`
  scopes: ['openid','email'],
  storage: 'sessionStorage',
  useInteractionCodeFlow: true,
  requireUserSession: 'true',
  authMethod: 'form',
  startService: false,
  useDynamicForm: false,
  uniq: Date.now() + Math.round(Math.random() * 1000), // to guarantee a unique state
  idps: '',
};
```

> **Note:** You can also set these configurations when you run the sample app.

### Run the sample app

1. In the `static-spa` directory, run the sample application:

    ```shell
    npm start
    ```

1. Navigate to `http://localhost:8080`. The static-spa application page appears with a custom login form. Application status details appear to the right of the screen.

1. Sign in with a user from your org assigned to the app integration. The static-spa application page appears printing the user's info and access token details to the page.

> **Note:** You can also configure an embedded Sign-In Widget use-case or a redirect use-case by updating the configuration details in the application. Click `Edit Config` to make those changes. For more information, see the [static-spa sample](https://github.com/okta/okta-auth-js/tree/master/samples/generated/static-spa#configuring).

## See also

* [Basic sign-in flow using the password factor](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main)
* [Okta Auth JS and React](/docs/guides/sign-in-to-spa-authjs/react/main)
* [Okta Auth JS and Vue](/docs/guides/sign-in-to-spa-authjs/vue/main)