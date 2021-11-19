The `LoginCallback` component of the Vue SDK Auth object handles the logic to parse the response that Okta sends back to your application. All you need to do is wire it up to the route you defined:

```javascript
// router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { LoginCallback } from '@okta/okta-vue'

const CALLBACK_PATH = '/login/callback'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: CALLBACK_PATH,
      component: LoginCallback
    },
    // Other routes...
  ]
})

export default router
```
