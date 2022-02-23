The `OktaAuthGuard` can protect a route to a single component as well.


1. Import the `profile` component into `app-routing.module.ts`:

```ts
import { ProfileComponent } from './profile/profile.component';
```

2. Add the following to the `routes` array:

```ts
{ path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard] }
```

This single `/profile` route will now be protected.