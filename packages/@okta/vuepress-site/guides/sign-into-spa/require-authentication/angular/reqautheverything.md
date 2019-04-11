To require authentication for all routes, use a loop to add `OktaAuthGuard` to every item in the `Routes` collection.

```javascript

import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard } from '@okta/okta-angular';

const appRoutes: Routes = [
  // Your routes...
];

// Require authentication on every route
appRoutes.forEach(route => {
  router.canActivate = router.canActivate || [];
  route.canActivate.push(OktaAuthGuard);
});

// NgModule...
```