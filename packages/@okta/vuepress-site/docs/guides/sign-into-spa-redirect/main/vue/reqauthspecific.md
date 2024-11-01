To protect a single route, you can just add the `requiresAuth: true` meta to individual routes.

Revert the changes that you made in the previous section and just protect the individual `/profile` route:

```javascript
{
  path: '/profile',
  component: ProfileView,
  meta: {
    requiresAuth: true
  }
},
```
