First, pass the configuration to the Auth handler from the `okta-vue` package.  Use the `router.beforeEach()` call to instruct Vue to check the authorization permissions before rendering a route.

```javascript
// router/index.js

import Vue from 'vue'
import Auth from '@okta/okta-vue'
import Router from 'vue-router'

const config = { 
  // Configuration here
}

Vue.use(Auth, {...config})

// router configuration from previous section here

router.beforeEach(Vue.prototype.$auth.authRedirectGuard()) // Add this

Vue.use(Router)

export default router
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

export default App;
```
