Define a route that handles a path like `login/callback`. Here's how to do it in [Angular Router](https://angular.io/guide/router):

```javascript
const CALLBACK_PATH = 'login/callback';

const appRoutes: Routes = [
  {
    path: CALLBACK_PATH,
    // Later: Add a component
  },
  // Other routes...
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
})
```

These examples use `login/callback` as a default route path. The route path is used in the next step.

Your application is responsible for parsing the information Okta sends to this callback route. Our SDKs do this for you (covered later in [Handle the callback from Okta](#handle-the-callback-from-okta)). For now, just define the route itself.
