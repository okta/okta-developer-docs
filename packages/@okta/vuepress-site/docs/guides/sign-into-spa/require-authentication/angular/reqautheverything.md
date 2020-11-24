To require authentication for all routes, use a loop to add `OktaAuthGuard` to every item in the `Routes` collection except login callback route.

```javascript

import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard } from '@okta/okta-angular';

const CALLBACK_PATH = 'login/callback';
const pathExceptions = [
  CALLBACK_PATH
];

const appRoutes: Routes = [
  // Your routes...
];

// Require authentication on every route except login callback route
const protectedRoutes = appRoutes.filter(route => !pathExceptions.includes(route.path));
protectedRoutes.forEach(route => {
  router.canActivate = router.canActivate || [];
  route.canActivate.push(OktaAuthGuard);
});

// NgModule...
```