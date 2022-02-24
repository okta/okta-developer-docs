It is common in Vue to protect the parent route and add [child routes](https://router.vuejs.org/guide/essentials/nested-routes.html) so that all child routes are also guarded.

Protecting a route is done by adding the following into a route:

```ts
meta: {
  requiresAuth: true
}
```

Add the above property inside your default `Home` route inside `src/router/index.js`, and move your `/profile` route to be a child of `Home`, like so:

```ts
{
  path: '/',
  name: 'Home',
  component: Home,
  children: [
    {
      path: '/profile',
      component: ProfileComponent
    }
  ],
  meta: {
    requiresAuth: true
  }
},
```

You should now find that both routes are protected and require sign in to visit.