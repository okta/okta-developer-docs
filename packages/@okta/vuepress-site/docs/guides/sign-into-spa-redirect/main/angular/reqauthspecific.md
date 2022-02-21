The `OktaAuthGuard` can protect a route to a single component as well. 

```ts
{ path: 'protected', component: ProtectedComponent, canActivate: [OktaAuthGuard] }
```