Define a route that handles a path like `/login/callback`. Here's how to do it in [vue-router](https://router.vuejs.org/):


```javascript
// router/index.js

import Vue from 'vue'
import Router from 'vue-router'

const CALLBACK_PATH = '/login/callback'

const router = new Router({
  // router will be passed to your Vue constructor

  mode: 'history',
  routes: [
    {
      path: CALLBACK_PATH,
      // Later: Add a component
    },
    // Other routes...
  ]
})

Vue.use(Router)

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
```

Our examples use `login/callback` as a default route path, but you can change this. The route path is used in the next step.

Your application is responsible for parsing the information Okta sends to this callback route. Our SDKs can do this for you (covered later in <GuideLink link="../handle-callback/">Handle the callback from Okta</GuideLink>). For now, just define the route itself.
