`OktaAuthGuard` is used to require authentication on individual routes. To require authentication in your entire application, you can add the guard to every route. See [canActivate] (https://angular.io/api/router/CanActivate)

```javascript

import { Routes, RouterModule } from '@angular/router';
import {
  OktaAuthGuard,
} from '@okta/okta-angular';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  // ... more routes
];

// Require authentication on every route
appRoutes.forEach(route => {
  router.canActivate = router.canActivate || [];
  route.canActivate.push(OktaAuthGuard);
});

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
})

```