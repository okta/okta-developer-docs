This snippet from the `src/router/index.js` router file provides access to the `/profile` component only if `requiresAuth` metadata is true:

```javascript
 {
    path: '/profile',
    component: ProfileComponent,
    meta: {
      requiresAuth: true
    }
},
```
