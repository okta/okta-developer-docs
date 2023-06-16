The Okta Vue SDK provides the [LoginCallback](https://github.com/okta/okta-vue#use-the-logincallback-component) component for the callback route. It handles token parsing, token storage, and redirecting to a protected page after a user is authenticated.

1. Import `LoginCallback` and `navigationGuard` inside the `src/router/index.js` file by adding the following to the top.

   ```js
   import { LoginCallback, navigationGuard } from '@okta/okta-vue'
   ```

2. Add a new route for the callback to the `routes` array. The path should match the path provided in the `redirectUri` property inside the `src/config.js` file.

   ```js
   {
     path: '/login/callback',
     component: LoginCallback
   },
   ```

3. The Okta Vue SDK provides navigation guard logic to circumvent navigational guard mixin issues in `vue-router-next`. Add the following before `export default router`:

   ```js
   router.beforeEach(navigationGuard)
   ```
