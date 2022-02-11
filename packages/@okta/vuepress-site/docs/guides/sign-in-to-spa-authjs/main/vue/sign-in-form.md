### Create the sign-in component

Create a Vue component that displays the sign-in form. For example, create a `src/components/Login.vue` file with the following content:

```html
<template>
  <div>
    <h1>Sign in</h1>
    <p v-if="$route.query.redirect">
      You need to sign in first.
    </p>
    <form @submit.prevent="login" autocomplete="off">
      Email: <label><input v-model="email" placeholder="email" v-focus></label><br><br>
      Password: <label><input v-model="pass" placeholder="password" type="password"></label><br>
      <br>
      <button type="submit">Continue</button>
      <p v-if="error" class="error">Incorrect sign-in information</p>
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

### Set up the Okta configuration settings

Use the required [configuration settings](#okta-org-app-integration-configuration-settings) to initialize your Okta Auth JS instance:

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
    tokenManager: {
      storage: 'localStorage'
    },
    useInteractionCodeFlow: true
  }
}
```

> **Note**: See [Okta Auth JS configuration reference](https://github.com/okta/okta-auth-js#configuration-reference) for additional Auth JS client configurations.

### Create the Auth JS client instance to support the sign-in form

Create an Auth JS client instance and add methods to support Okta authentication. Add Okta authentication by instantiating `OktaAuth` with the settings from [Set up the Okta configuration settings](#set-up-the-okta-configuration-settings). For example, create a `src/auth.js` file with the following content:

```js
import { OktaAuth } from '@okta/okta-auth-js';
import sampleConfig from '@/config'

const authClient = new OktaAuth(sampleConfig.oidc)

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
        console.error('ID token: ', transaction.tokens.idToken)
          authClient.tokenManager.setTokens(transaction.tokens)
          localStorage.token = transaction.tokens.accessToken
          localStorage.idToken = transaction.tokens.idToken
          if (cb) cb(true)
          this.onChange(true)
      }
      if (transaction.status == 'PENDING') {
        // next IDX step not handled in this app yet
        if (cb) cb(false)
        this.onchange(false)
      }
      if (transaction.status == 'FAILURE') {
        // failure from idx.authenticate
        console.error(transaction.error)
        if (cb) cb(false)
        this.onchange(false)
      }
    }).catch(err => {
      console.error(err.message)
      if (cb) cb(false)
      this.onChange(false)
    })
  },

  getToken (){
    return localStorage.token
  },

  getUser () {
    return authClient.token.getUserInfo()
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

### Define the Vue.js app

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
.directive('focus', {
  // When the bound element is inserted into the DOM...
  mounted: function (el) {
    // Focus the element
    el.focus()
  }
})
.use(router)
.mount('#app')
```

