The Okta Angular SDK has a guard to check for the authenticated state that you can add to protected routes. It's common in Angular to use feature modules and protect the route to the feature so that all child routes are also guarded.

In `app.routes.ts`, add the `OktaAuthGuard` to protect the route accessing a lazy loaded feature module using the `canActivate` property.

1. Update the Okta import statement to:

   ```ts
   import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
   ```

2. Add the following route to the `routes` array:

   ```ts
   {
     path: 'protected',
     loadChildren: () => import('./protected/routes').then(m => m.PROTECTED_FEATURE_ROUTES),    canActivate: [OktaAuthGuard]
   },
   ```

3. Create a new protected feature route with the CLI command `ng generate component protected`.

4. Add a new file `app/protected/routes.ts` and define the route for this feature:

   ```ts
   import { Route } from '@angular/router';
   import { ProtectedComponent } from './protected.component';

   export const PROTECTED_FEATURE_ROUTES: Route[] = [
      { path: '', component: ProtectedComponent }
   ];
   ```

5. Make sure that you’re signed out, and then try going to `/protected`. You’re automatically redirected to the Okta sign-in page. Any child routes are also protected.
