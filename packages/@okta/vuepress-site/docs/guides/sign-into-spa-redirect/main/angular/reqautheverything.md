The Okta Angular SDK has a guard to check for the authenticated state that you can add to protected routes. It is common in Angular to use feature modules and protect the route to the feature so that all child routes are also guarded.

In the `AppRoutingModule`, add the `OktaAuthGuard` to protect the route accessing a feature module using the `canActivate` property.

```ts
{
  path: 'protected',
  loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
  canActivate: [OktaAuthGuard] 
},
```