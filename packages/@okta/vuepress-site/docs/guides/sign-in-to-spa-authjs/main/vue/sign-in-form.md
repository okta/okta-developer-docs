This section helps you build a basic password-only sign-in use case for your app. This use case is outlined in the following sequence diagram with your single-page app as the client:

<div class="full">

![Sequence diagram that displays the back and forth between the resource owner, SDK, authorization server, and resource server for a basic SPA password sign-in flow.](/img/oie-embedded-sdk/password-only-spa-authjs-flow.svg)

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true
actor "Resource Owner (User)" as user
participant "Client (SPA)" as client
participant "Auth JS (SDK)" as sdk
participant "Authorization server (Okta)" as okta

autonumber "<b>#."
user -> client: Navigate to app sign-in page
client -> client: Display sign-in page, instantiate OktaAuth()
user -> client: Enter credentials
client -> sdk: Call idx.authenticate(username,password)
sdk -> okta: API request to authenticate user
okta -> sdk: Return Auth response
sdk -> client: Return tokens and idxStatus.SUCCESS
client -> client: For idxStatus.SUCCESS, store tokens in browser storage
client -> user: Direct user to authenticated page
client -> client: For idxStatus.SUCCESS, store tokens in browser storage
client -> sdk: (Optional) Call token.getUserInfo() to get user info
sdk -> okta: (Optional) API request to get user info
okta -> sdk: (Optional) Return user info response
sdk -> client: (Optional) Return user info
client -> user:  (Optional) Display required user info
@enduml

-->
The steps in the following sections focus on the interaction between your client app, the user, and the Auth JS SDK.

### Set up the Okta configuration settings

Before you code your forms and routes, use the required [configuration settings](#okta-org-app-integration-configuration-settings) to initialize your Okta Auth JS instance:

* `clientId`: Your client ID&mdash;`{yourClientId}`
* `issuer`: The authorization server in your Okta org (for example, `https://{yourOktaDomain}/oauth2/default`)
* `scopes`: The required OAuth 2.0 [scopes](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#scopes) for your app
* `redirectUri`: Set your callback redirect URI. This value must be configured in your Okta app **Sign-in redirect URIs** and **Trusted Origins** lists.

You can create a `src/config.js` file to define your configuration settings. For example:

```js
export default {
  oidc: {
    clientId: '{yourClientId}',
    issuer: 'https://{yourOktaDomain}/oauth2/default',
    redirectUri: '{yourLocalAppDomain}/login/callback',
    scopes: ['openid', 'profile', 'email'],
    tokenManager: {
      storage: 'localStorage'
    }
  }
}
```

> **Note**: See the [Okta Auth JS configuration reference](https://github.com/okta/okta-auth-js#configuration-reference) for more Auth JS client configurations.

### Create the sign-in component

Create a Vue component that displays the sign-in form and submits the authentication request to Okta. Handle the response from the authentication request, which follows the [Interaction Code flow](/docs/guides/implement-grant-type/interactioncode/main/#interaction-code-flow). For Auth JS Interaction Code methods, see the [Auth JS Identity Engine module readme](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#usage).

For example, create a `src/components/Login.vue` file with the following content:

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
          console.log('TODO: add handling for status: ', transaction.status,
            'message: ', transaction.messages,
            'next step: ', transaction.nextStep)
          break
        case 'FAILURE':
          // failure from idx.authenticate
          this.error = true
          this.msg = transaction.messages[0].message
          console.log(transaction.status, transaction.messages)
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
