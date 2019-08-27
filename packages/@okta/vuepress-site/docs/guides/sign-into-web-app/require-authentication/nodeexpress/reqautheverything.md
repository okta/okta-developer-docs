If you require authentication for all routes, add the oidc.ensureAuthenticated() middleware. If the user is not authenticated, they will be redirected to the login page:

```js
app.all('*', oidc.ensureAuthenticated());
```
