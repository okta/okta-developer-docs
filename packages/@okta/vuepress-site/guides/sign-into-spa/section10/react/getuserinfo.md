User info ("claims") are returned from the `getUser()` method on the `Auth` object. The `Auth` object is made available in your components as `props.auth` via the `withAuth` Higher Order Component (HOC)

```javascript

const { auth } = this.props; // via withAuth HOC

const userinfo = await auth.getUser(); // returns an array

```