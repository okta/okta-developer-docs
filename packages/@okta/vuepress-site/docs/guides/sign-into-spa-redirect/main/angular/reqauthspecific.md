The `OktaAuthGuard` can protect a route to a single component as well with `canActivate` property.

1. Add the `canActivate` property to the `routes` array in `app-routing.module.ts`:

   ```ts
   { path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard] }
   ```

The single `/profile` route is protected directly, and when navigating to the page it prompts you to sign in first before routing you to the `ProfileComponent`.
