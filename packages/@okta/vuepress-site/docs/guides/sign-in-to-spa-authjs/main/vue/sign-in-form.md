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

### Create the sign-in component

Create a Vue component that displays the sign-in form and submits the authentication request to Okta. You need to handle the response from the authentication request which follows the [Interaction Code flow](/docs/concepts/interaction-code/#the-interaction-code-flow). For example, create a `src/components/Login.vue` file with the following content:

```html
<template>
  <div class="login">
    <h1>Sign in</h1>
    <p v-if="$route.query.redirect">
      You need to sign in first.
    </p>
    <form @submit.prevent="signIn" autocomplete="off">
      Email: <label><input v-model="email" placeholder="email" v-focus></label><br><br>
      Password: <label><input v-model="pass" placeholder="password" type="password"></label><br>
      <br>
      <button type="submit">Continue</button>
      <p v-if="error" class="error">{{msg}}</p>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      pass: '',
      msg: '',
      error: false
    }
  },
  methods: {
    signIn () {
      this.$auth.idx.authenticate({
      username: this.email,
      password: this.pass
    }).then(transaction => {
      switch (transaction.status) {
        case 'SUCCESS':
          this.$auth.tokenManager.setTokens(transaction.tokens)
          this.$router.replace(this.$route.query.redirect || '/')
          break
        case 'PENDING':
          // next IDX step not handled in this app yet
          this.error = true
          this.msg = transaction.messages[0].message
          console.error('TODO: add handling for status: ', transaction.status,
            'message: ', transaction.messages,
            'next step: ', transaction.nextStep)
          break
        case 'FAILURE':
          // failure from idx.authenticate
          this.error = true
          this.msg = transaction.messages[0].message
          console.error(transaction.status)
          console.error(transaction.messages)
          break
        default:
          this.error = true
          this.msg = transaction.messages[0].message
          console.error('What happened?: ', transaction.status, transaction.messages)
      }
    }).catch(err => {
      this.error = true
      this.msg = err.message
      console.error(err.message)
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

### Create the Vue.js app and instantiate the Okta Auth JS client

Create the Vue.js app definition by importing all the required libraries and instantiate the Okta Auth JS client with the settings from [`config.js`](#set-up-the-okta-configuration-settings). For example, create a `src/main.js` file with the following content:

### Define the Vue.js app

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
import sampleConfig from '@/config'

const oktaAuth = new OktaAuth(sampleConfig.oidc)

createApp(App)
.directive('focus', {
  // When the bound element is inserted into the DOM...
  mounted: function (el) {
    // Focus the element
    el.focus()
  }
})
.use(router)
.use(OktaVue, { oktaAuth,
  onAuthRequired: () => {
    router.push('/login')
  },
  onAuthResume: () => {
    router.push('/login')
  },
})
.mount('#app')
```
