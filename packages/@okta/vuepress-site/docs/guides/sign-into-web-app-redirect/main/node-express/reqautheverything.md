Add middleware to protect all the routes in your app:

```js
function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

app.use(ensureLoggedIn());
```
