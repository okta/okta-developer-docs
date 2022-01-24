### Integrate the SIW with your SPA app

Integrate the SIW to your Vue.js app to add Okta authentication:

 * [Create a new Vue.js app](#create-a-new-vue-js-app)(optional): Create a new simple Vue.js app if you don't have an existing app.
 * [Install dependencies](#install-dependencies): Install the Okta libraries for the integration.
 * [Load the Sign-In Widget](#load-the-sign-in-widget): Create the Sign-In Widget instance and a wrapper for the SIW to be rendered as a Vue.js component.
 * [Create routes](#create-routes): Create the routes for your app.
 * [Connect the routes](#connect-the-routes): Connect your routes to the appropriate components.

[Start your app](#start-your-app) to test your creation. Sign in with an [existing user from your Okta org](/docs/guides/quickstart/cli/main/#add-a-user-using-the-admin-console).

After successfully authenticating with Okta, the app obtains the user's `id_token`, which contains basic claims for the user's identity. You can extend the set of claims by modifying the SIW [scopes](/docs/reference/api/oidc/#scopes) settings to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/#scope-values). See [Sign users in to your SPA guide for Vue.js](/docs/guides/sign-into-spa/vue/main/#use-the-access-token) to learn how to use the user's `access_token` to protect routes and validate tokens.

See [Run the sample Vue.js app](#run-the-sample-vue-js-app) for an example of a simple embedded authentication Vue.js app that uses the Okta SIW and libraries.

### Create a new Vue.js app

If you don't have an existing Vue.js app, you can quickly create a new app by using the [Vue CLI](https://cli.vuejs.org/guide/installation.html):

```bash
npm install -g @vue/cli
vue create okta-app
```

* Manually select the following features: defaults and **Router**.
* Select **3.x** for the Vue.js version.
* Select **Y** for router history mode.

Go into your app directory to view the created files:

```bash
cd okta-app
```

### Install dependencies

Add the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/) library into your Vue.js app. You can install it by using `npm`:

```bash
cd okta-app
npm install @okta/okta-signin-widget
```

You also need `@okta/okta-vue` for route protection and `@okta/okta-auth-js` for SIW dependencies:

```bash
npm install @okta/okta-vue
npm install @okta/okta-auth-js
```

### Load the Sign-In Widget

#### Initialize the Sign-In Widget

Initialize the Sign-In Widget for your sign-in page by setting the required [configuration settings](#okta-org-app-integration-configuration-settings) for your app. In addition, you must set the `useInteractionCodeFlow` option to `true` to enable Identity Engine features in the embedded Sign-In Widget.

You can create a `config.js` file to define your configuration settings. For example:

```js
const { CLIENT_ID, ISSUER, USE_INTERACTION_CODE } = process.env

const BASENAME = process.env.NODE_ENV === 'production' ? '/custom-login' : '';
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    useInteractionCodeFlow: USE_INTERACTION_CODE_FLOW
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages'
  },
  app: {
    basename: BASENAME
  }
}
```

Create a file to instantiate `OktaSignIn` and `OktaAuth` with [your configuration settings](#okta-org-app-integration-configuration-settings). You should make use of environment variables or external configuration files, but for the purpose of this example snippet, the configuration settings are declared in the following `src/okta/index.js` file:

```js
import OktaSignIn from '@okta/okta-signin-widget'
import { OktaAuth } from '@okta/okta-auth-js'

const oktaSignIn = new OktaSignIn({
  baseUrl: 'https://${yourOktaDomain}',
  clientId: '${clientId}',
  redirectUri: 'http://localhost:8080/login/callback',
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  pkce: true,
  useInteractionCodeFlow: true,
  scopes: ['openid', 'profile', 'email'],
  i18n: {
    en: {
      'primaryauth.title': 'Sign in to my Vue app`
    }
  }
});

const oktaAuth = new OktaAuth({
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  clientId: '${clientId}',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email']
})

export { oktaAuth, oktaSignIn };
```

Replace the `${...}` placeholders with values from your [Okta org app integration configuration settings](#okta-org-app-integration-configuration-settings).

> **Note:** `baseUrl` setting is not a required for OIDC applications as of SIW version 5.15.0. `['openid', 'profile', 'email']` are commonly used scopes. See [Scopes](/docs/reference/api/oidc/#scopes) for details of additional supported scopes.

### Create a SIW wrapper

To render the SIW in Vue.js, you must create a wrapper that allows Okta to treat it as a Vue component.

For example, create a `src/components/Login.vue` file with the following content:

```html
<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import {oktaSignIn} from '../okta'

export default {
  name: 'Login',
  mounted: function () {
    this.$nextTick(function () {
      oktaSignIn.showSignInAndRedirect(
        { el: '#okta-signin-container' }
      )
    })
  },
  unmounted () {
    // Remove the widget from the DOM on path change
    oktaSignIn.remove()
  }
}
</script>
```
