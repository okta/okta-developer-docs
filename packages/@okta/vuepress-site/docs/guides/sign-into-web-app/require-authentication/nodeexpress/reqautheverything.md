If you require authentication for all routes, add the `oidc.ensureAuthenticated()` middleware. If the user isn't authenticated, they are redirected to the sign-in page:

```js
app.all('*', oidc.ensureAuthenticated());
```
