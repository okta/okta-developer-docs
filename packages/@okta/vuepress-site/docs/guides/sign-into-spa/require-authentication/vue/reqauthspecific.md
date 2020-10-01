Set the `requiresAuth` property to `true` in the optional `meta` object as part of the route definition.

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'
import Private from '@/components/Private' // Some component you define

const config = {
  // Configuration here
}

Vue.use(Auth, {...config})

const CALLBACK_PATH = '/login/callback'

const router = new Router({
  mode: 'history',
  routes: [
    { path: CALLBACK_PATH, component: Auth.handleCallback() },
    { path: '/private', component: Private, meta: { requiresAuth: true } },
  ]
})

Vue.use(Router)

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
```
