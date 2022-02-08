### Set up the Okta configuration settings

Use the required [configuration settings](#okta-org-app-integration-configuration-settings) to initialize your Auth JS instance:

* `clientId`: Your client ID &mdash; `${yourClientId}`
* ` issuer`: The authorization server in your Okta org &mdash; `${yourIssuer}`
* `useInteractionCodeFlow`: Set this option to `true` to enable Identity Engine features that use the [Interaction Code flow](/docs/concepts/interaction-code/#the-interaction-code-flow)
* `scopes`: The required OAuth 2.0 [scopes](/docs/reference/api/oidc/#scopes) for your app
* `redirectUri`: Set your callback redirect URI. This value must be configured in your Okta app **Sign-in redirect URIs** and **Trusted Origins** lists.

You can create a `src/config.js` file to define your configuration settings. For example:

```js
export default {
  oidc: {
    clientId: '${yourClientId}',
    issuer: '${yourIssuer}',
    redirectUri: '${yourLocalAppDomain}/login/callback',
    scopes: ['openid', 'profile', 'email'],
    useInteractionCodeFlow: true
  }
}
```

### Create the Auth client instance to support the sign-in form

Before you create the sign-in form, you need to create the authentication client instance and methods to support Okta authentication. For example, create a `src/auth.js` file with the following content:

```js
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
import sampleConfig from '@/config'

const OktaAuth = require('@okta/okta-auth-js').OktaAuth

const authClient = new OktaAuth({
  issuer: 'https://${yourOktaDomain}',
  clientId: '${clientId}',
  scopes: ['openid', 'email', 'profile'],
  redirectUri: window.location.origin + '/login/callback',
  tokenManager: {
        storage: 'localStorage'
      },
  transformAuthState,
  useInteractionCodeFlow: true
})

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    return authClient.idx.authenticate({ username: email, password: pass })
    .then(handleTransaction)
    .catch(showError);

    return authClient.signInWithCredentials({
      username: email,
      password: pass
    }).then(transaction => {
      if (transaction.status === 'SUCCESS') {
        return authClient.token.getWithoutPrompt({
          responseType: ['id_token', 'token'],
          sessionToken: transaction.sessionToken,
        }).then(response => {
          localStorage.token = response.tokens.accessToken
          localStorage.idToken = response.tokens.idToken
          if (cb) cb(true)
          this.onChange(true)
        })
      }
    }).catch(err => {
      console.error(err.message)
      if (cb) cb(false)
      this.onChange(false)
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    delete localStorage.idToken
    if (cb) cb()
    this.onChange(false)
    return authClient.signOut()
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {
  },

  handleTransaction(transaction) {
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
      throw new Error('TODO: add handling for ' + transaction.status + ' status');
  }
}

}
```

> **Note**: See [Okta Auth JS configuration reference](https://github.com/okta/okta-auth-js#configuration-reference) for additional Auth JS client configurations.

### Instantiate Okta authentication

Add Okta authentication by instantiating `OktaAuth` with the settings from [Set up the Okta configuration settings](#set-up-the-okta-configuration-settings) in your `main.js` file:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'

import sampleConfig from '@/config'

const oktaAuth = new OktaAuth(sampleConfig.oidc)

createApp(App)
  .use(router)
  .use(OktaVue, {
    oktaAuth,
    onAuthRequired: () => {
      router.push('/login')
    },
    onAuthResume: () => {
      router.push('/login')
    },
  })
  .mount('#app')
```

### Create a Sign-In Widget container

To render the Sign-In Widget in Vue.js, you must create a wrapper that allows Okta to treat it as a Vue component. For example, create a `src/components/Login.vue` file with the following content:

```html
<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

import sampleConfig from '../config'

export default {
  name: 'Login',
  mounted: function () {
    this.$nextTick(function () {
      const { issuer, clientId, redirectUri, scopes, useInteractionCodeFlow } = sampleConfig.oidc
      this.widget = new OktaSignIn({
        clientId,
        redirectUri,
        logo: require('@/assets/logo.png'),
        i18n: {
          en: {
            'primaryauth.title': 'Sign in to my Okta Sign-In Widget Vue.js app'
          }
        },
        authParams: {
          issuer,
          scopes,
        },
        useInteractionCodeFlow
      })

      const originalUri = this.$auth.getOriginalUri();
      if (!originalUri) {
        this.$auth.setOriginalUri('/');
      }

      this.widget.showSignInToGetTokens({
        el: '#okta-signin-container',
        scopes
      }).then(tokens => {
        this.$auth.handleLoginRedirect(tokens)
      }).catch(err => {
        throw err
      })

    })
  },
  unmounted () {
    // Remove the widget from the DOM on path change
    this.widget.remove()
  }
}
</script>
```
