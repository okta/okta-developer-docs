The `@okta/oidc-middleware` package autogenerates a `/logout` route for you.  Send a `POST` request to `/logout`:

```html
<form method="post" action="/logout">
  <button id="logout-button" type="submit">Logout</button>
</form>
```

If you prefer to handle this yourself, you can define a route which invokes the `oidc.forceLogoutAndRevoke()` method:

```js
app.post('/forces-logout', oidc.forceLogoutAndRevoke(), (req, res) => {
  // Nothing here will execute, after the redirects the user will end up wherever the `routes.logoutCallback.afterCallback` specifies (default `/`)
});
```
