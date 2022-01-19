Define a route that handles a path like `/login/callback`. Here's how to do it in [vue-router](https://router.vuejs.org/):


```javascript
// router/index.js

import { createRouter, createWebHistory } from 'vue-router'

const CALLBACK_PATH = '/login/callback'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: CALLBACK_PATH,
      // Later: Add a component
    },
    // Other routes...
  ]
})

export default router
```

These examples use `login/callback` as a default route path. The route path is used in the next step.

Your application is responsible for parsing the information Okta sends to this callback route. The SDKs do this for you (covered later in [Handle the callback from Okta](#handle-the-callback-from-okta)). For now, just define the route itself.
