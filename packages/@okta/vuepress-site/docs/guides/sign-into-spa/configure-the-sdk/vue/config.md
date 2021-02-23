First, create an [OktaAuth](https://github.com/okta/okta-auth-js) object with your configuration and pass it to the `okta-vue` plugin. You need to use `okta-vue` plugin after `vue-router`.

```javascript
// router/index.js

import Vue from 'vue'
import OktaVue from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'
import Router from 'vue-router'

Vue.use(Router)

const config = {
  // Configuration here
}
const oktaAuth = new OktaAuth(config)

// router configuration from previous section here

Vue.use(OktaVue, { oktaAuth })

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
