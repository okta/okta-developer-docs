The `LoginCallback` component of the Vue SDK Auth object handles the logic to parse the response that Okta sends back to your application. All you need to do is wire it up to the route you defined:

```javascript
// router/index.js

import Vue from 'vue'
import Router from 'vue-router'
import OktaVue, { LoginCallback } from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'

Vue.use(Router)

const config = {
  // Configuration here
}
const oktaAuth = new OktaAuth(config)

const CALLBACK_PATH = '/login/callback'

const router = new Router({
  mode: 'history',
  routes: [
    { path: CALLBACK_PATH, component: LoginCallback },
  ]
})

Vue.use(OktaVue, { oktaAuth })

export default router
```
