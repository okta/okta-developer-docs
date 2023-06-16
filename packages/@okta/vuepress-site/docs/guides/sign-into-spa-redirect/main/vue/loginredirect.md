1. Add Okta authentication by instantiating `OktaAuth` with the settings from [Configure your app](#configure-your-app) in your `main.js` file. Your updated file should look like this:

   ```js
   import { createApp } from 'vue'
   import { OktaAuth } from '@okta/okta-auth-js'
   import OktaVue from '@okta/okta-vue'
   import App from './App.vue'
   import router from './router'

   import sampleConfig from '@/config'

   const oktaAuth = new OktaAuth(sampleConfig.oidc)

   createApp(App)
     .use(router)
     .use(OktaVue, { oktaAuth })
     .mount('#app')
   ```

2. Add buttons to support sign-in and sign-out actions inside the `src/components/HelloWorld.vue` component `<template>` element. Display either the sign-in or sign-out button based on the current authenticated state.

   ```html
   <div>
     <button v-if="authState && authState.isAuthenticated" @click="logout">Logout</button>
     <button v-else @click="login">Login</button>
   </div>
   ```

3. Update the template to support sign-in and sign-out actions by updating the `<script>` element as follows:

   ```js
   <script>
   export default ({
     name: 'home',
     methods: {
       async login () {
         await this.$auth.signInWithRedirect({ originalUri: '/' })
       },
       async logout () {
         await this.$auth.signOut()
       }
     }
   })
   </script>
   ```
