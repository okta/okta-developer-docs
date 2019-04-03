To require authentication on a specific route, use `OktaAuthGuard` on your route definition. See [canActivate] (https://angular.io/api/router/CanActivate).

```javascript

import { Routes, RouterModule } from '@angular/router';
import {
  OktaAuthGuard,
} from '@okta/okta-angular';

const appRoutes: Routes = [
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
})

```