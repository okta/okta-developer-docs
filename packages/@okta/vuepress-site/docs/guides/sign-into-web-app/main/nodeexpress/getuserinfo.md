The OIDC Middleware automatically populates `req.userContext.userinfo` with the information Okta sends back about the user. You can check whether the user is logged in with a truthy check on `req.userContext.userinfo` in your actions or views.

```js
app.get('/', (req, res) => {
  if (req.userContext.userinfo) {
    res.send(`Hi ${req.userContext.userinfo.name}!`);
  } else {
    res.send('Please Sign In');
  }
});
```
