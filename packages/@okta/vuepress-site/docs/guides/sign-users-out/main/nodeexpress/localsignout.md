Create a new route to handle the logout of your application and invoke the `req.logout()` method

```js
app.get('/local-logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
```
