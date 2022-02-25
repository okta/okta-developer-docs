Set the `requiresAuth` property to `true` in the optional `meta` object as part of the route definition. Add the `navigationGuard` function from `okta-vue` to the router as a global guard.

```javascript
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
import { createRouter, createWebHistory } from 'vue-router'
import Private from '@/components/Private' // Some component you define

const CALLBACK_PATH = '/login/callback'

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: CALLBACK_PATH, component: LoginCallback },
    { path: '/private', component: Private, meta: { requiresAuth: true } },
  ]
})

router.beforeEach(navigationGuard)

export default router
```
