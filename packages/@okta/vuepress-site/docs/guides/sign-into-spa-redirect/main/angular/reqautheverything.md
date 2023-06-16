The Okta Angular SDK has a guard to check for the authenticated state that you can add to protected routes. It's common in Angular to use feature modules and protect the route to the feature so that all child routes are also guarded.

In `app-routing.module.ts`, add the `OktaAuthGuard` to protect the route accessing a lazy loaded feature module using the `canActivate` property.

1. Update the Okta import statement to:

   ```ts
   import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
   ```

2. Add the following route to the `routes` array:

   ```ts
   {
     path: 'protected',
     loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
     canActivate: [OktaAuthGuard]
   },
   ```

3. Create a new protected module with the CLI command `ng generate module protected`.

4. Make sure that you are signed out, and then try navigating to `/protected`. You are automatically redirected to the Okta sign-in page. Any child routes are also protected.
