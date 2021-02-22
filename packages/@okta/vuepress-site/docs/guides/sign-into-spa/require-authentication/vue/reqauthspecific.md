Set the `requiresAuth` property to `true` in the optional `meta` object as part of the route definition.

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import OktaVue, { LoginCallback } from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'
import Private from '@/components/Private' // Some component you define

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
    { path: '/private', component: Private, meta: { requiresAuth: true } },
  ]
})

Vue.use(OktaVue, { oktaAuth })

export default router
```
