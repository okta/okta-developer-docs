The `handleCallback()` function of the Vue SDK Auth object handles the logic to parse the response that Okta sends back to your application. All you need to do is wire it up to the route you defined:

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@okta/okta-vue'

const config = {
  // Configuration here
}

Vue.use(Auth, {...config})

const CALLBACK_PATH = '/login/callback'

const router = new Router({
  mode: 'history',
  routes: [
    { path: CALLBACK_PATH, component: Auth.handleCallback() },
  ]
})

Vue.use(Router)

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
```
