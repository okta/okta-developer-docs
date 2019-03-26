placeholder

```javascript

import { Routes, RouterModule } from '@angular/router';
import {
  OktaAuthGuard,
} from '@okta/okta-angular';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ OktaAuthGuard ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
})

```