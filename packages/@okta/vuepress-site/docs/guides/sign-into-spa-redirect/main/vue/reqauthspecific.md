To protect a single route, you can just add the `requiresAuth: true` meta to individual routes.

Revert the changes you made in the previous section and just protect the individual `/profile` route, like so:

```javascript
{
  path: '/profile',
  component: ProfileComponent,
  meta: {
    requiresAuth: true
  }
},
```
