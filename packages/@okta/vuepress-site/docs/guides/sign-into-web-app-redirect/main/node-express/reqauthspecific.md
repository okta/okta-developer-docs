Add middleware to `app.js` that protects a specific route, then add it to the specific routes that you want to protect:

```js
function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

...

app.use('/profile', ensureLoggedIn, (req, res) => {
  res.render('profile', { user: req.user });
});
```
