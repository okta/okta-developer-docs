The `OktaAuthGuard` can protect a route to a single component as well with `canActivate` property.

1. Add the `canActivate` property to the `routes` array in `app-routing.module.ts`:

   ```ts
   { path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard] }
   ```

The single `/profile` route is protected directly, and on launch goes directly to the sign-in page (no need to click sign-in button).
