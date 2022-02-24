Add the sign-in and sign-out functionalities to the `app.js` file.

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

Add the following to your `routes/index.js` file to pass on the `authenticated` variable:

```js
router.get('/', function(req, res, next) {
  res.render('index', { authenticated: req.isAuthenticated() });
});
```

Add buttons to support sign-in and sign-out flows to the `views/layout.pug` file. Display either the sign-in or sign-out button based on the current authenticated state.

```pug
  if authenticated
      form(method="post", action="/logout")
        button(type="submit") Logout
  else
      form(method="get", action="/login")
        button(type="submit") Login  
```
