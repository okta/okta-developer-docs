If you require authentication for certain routes, add the `oidc.ensureAuthenticated()` middleware. If the user isn't authenticated, they are redirected to the sign-in page:

```js
app.get('/protected', oidc.ensureAuthenticated(), (req, res) => {
  res.send(JSON.stringify(req.userContext.userinfo));
});
```
