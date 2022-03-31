1. Add the sign-in and sign-out functionality to the `app.js` file, just below the `app.use('/users', usersRouter);` line:

```js
app.use('/login', passport.authenticate('oidc'));

app.use('/authorization-code/callback',
  passport.authenticate('oidc', { failureRedirect: '/error' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
```

2. Update the existing `router.get()` call inside `routes/index.js` file to pass on the `authenticated` variable, like so:

```js
router.get('/', function(req, res, next) {
  res.render('index', { authenticated: req.isAuthenticated() });
});
```

3. Add buttons to support sign-in and sign-out flows to the `views/layout.pug` file. Display either the sign-in or sign-out button based on the current authenticated state.

```pug
  if authenticated
      form(method="post", action="/logout")
        button(type="submit") Logout
  else
      form(method="get", action="/login")
        button(type="submit") Login
```
