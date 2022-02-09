### Set up the Okta configuration settings

Use the required [configuration settings](#okta-org-app-integration-configuration-settings) to initialize your Auth JS instance:

* `clientId`: Your client ID &mdash; `${yourClientId}`
* `issuer`: The authorization server in your Okta org &mdash; `${yourIssuer}`
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

const authClient = new OktaAuth({
  issuer: 'https://${yourOktaDomain}',
  clientId: '${clientId}',
  scopes: ['openid', 'email', 'profile'],
  redirectUri: window.location.origin + '/login/callback',
  tokenManager: {
        storage: 'localStorage'
      },
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

    return authClient.idx.authenticate({
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

### Create the sign-in component

Create a Vue component that displays the sign-in form. For example, create a `src/components/Login.vue` file with the following content:

```html
<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="login" autocomplete="off">
      <label><input v-model="email" placeholder="email" v-focus></label>
      <label><input v-model="pass" placeholder="password" type="password"></label><br>
      <button type="submit">login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </div>
</template>

<script>
  import auth from '../auth'
  export default {
    data () {
      return {
        email: '',
        pass: '',
        error: false
      }
    },
    methods: {
      login () {
        auth.login(this.email, this.pass, loggedIn => {
          if (!loggedIn) {
            this.error = true
          } else {
            this.$router.replace(this.$route.query.redirect || '/')
          }
        })
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }
</style>

```
