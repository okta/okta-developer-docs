It is common in Vue to protect the parent route and add [child routes](https://router.vuejs.org/guide/essentials/nested-routes.html) so that all child routes are also guarded.

Protect a route by adding the following into a route:

```ts
meta: {
  requiresAuth: true
}
```

Add the previous property inside your default `Home` route inside `src/router/index.js` and move your `/profile` route to be a child of `Home`, like so:

```ts
{
  path: '/',
  name: 'home',
  component: HomeView,
  children: [
    {
      path: '/profile',
      component: ProfileView
    }
  ],
  meta: {
    requiresAuth: true
  }
},
```

Both routes are now protected and require the user to sign in to visit.
