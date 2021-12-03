First, create an [OktaAuth](https://github.com/okta/okta-auth-js) object with your configuration and pass it to the `okta-vue` plugin. You need to use the `okta-vue` plugin after adding the router to the app.

```javascript
// main.js

import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const config = {
  clientId: '${clientId}',
  issuer: `https://${yourOktaDomain}/oauth2/default`,
  redirectUri: 'http://localhost:8080/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}

createApp(App)
    .use(router)
    .use(OktaVue, { oktaAuth })
    .mount('#app')
```

Then, create your top-level component and have it render the components of the current route.  Set an 'authenticated' property on this top-level component that lower components can read.

```vue
// App.vue

<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return { authenticated: false }
  },
  created () { this.isAuthenticated() },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    }
  }
}
</script>
```
