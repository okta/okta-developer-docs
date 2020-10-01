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
