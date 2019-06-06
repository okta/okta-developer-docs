Use `OktaAuthGuard` on your route definition (see [canActivate](https://angular.io/api/router/CanActivate) in the Angular docs).

```javascript
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard } from '@okta/okta-angular';
import { ProtectedComponent } from './protected.component';

const appRoutes: Routes = [
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ OktaAuthGuard ],
  },
  // Other routes...
];

// NgModule...
```
