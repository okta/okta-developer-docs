If you require authentication for certain routes, add the oidc.ensureAuthenticated() middleware. If the user is not authenticated, they will be redirected to the login page:

```java
app.get('/protected', oidc.ensureAuthenticated(), (req, res) => {
  res.send(JSON.stringify(req.userContext.userinfo));
});
```
