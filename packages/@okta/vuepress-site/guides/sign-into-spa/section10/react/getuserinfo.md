Your code can get the user's profile using the `getUser()` method on the `Auth` object. The `Auth` object is made available in your components as `props.auth` via the `withAuth` higher-order component.

```javascript

const { auth } = this.props; // via withAuth HOC

const userinfo = await auth.getUser(); // returns an array

```