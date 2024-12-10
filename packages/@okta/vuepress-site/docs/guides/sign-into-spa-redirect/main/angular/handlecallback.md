The Okta Angular SDK has a callback component that handles the token exchange. Okta uses this inside `app.routes.ts` to handle the callback routing.

1. Import the component with the following line:

   ```ts
   import { OktaCallbackComponent } from '@okta/okta-angular';
   ```

2. Add a route for the callback to the `routes` array. The path should match the path provided in the `redirectUri` property when you configure the `OktaAuth` instance in `app.module.ts`.

   ```ts
   { path: 'login/callback', component: OktaCallbackComponent }
   ```
