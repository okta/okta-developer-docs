The `OktaAuthGuard` can protect a route to a single component as well with `canActivate` property.

1. Add the `canActivate` property to the `routes` array in `app-routing.module.ts`:

   ```ts
   { path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard] }
   ```

The single `/profile` route is protected directly. If you're not authenticated and go to this page, you must sign in before being routed to the `ProfileComponent`.
