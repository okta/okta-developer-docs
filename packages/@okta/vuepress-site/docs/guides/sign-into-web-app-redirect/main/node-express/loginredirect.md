Create a link for the user to start the sign-in process and be redirected to Okta.

1. Open **views** > **layout.pug** .
1. Add the code for a sign-in and a sign-out link.

   ```pug
   if authenticated
       form(method="post", action="/signout")
         button(type="submit") Sign out
   else
       form(method="get", action="/signin")
         button(type="submit") Sign in
   ```

1. Open **routes** > **index.js**.
1. Update `router.get()` to pass on the `authenticated` variable:

   ```js
   router.get('/', function(req, res, next) {
     res.render('index', { authenticated: req.isAuthenticated() });
   });
   ```

1. Open **app.js**.
1. Add the route handler for the sign-in and sign-out functionality:

   ```js
   app.use('/signin', passport.authenticate('oidc'));

   app.post('/signout', (req, res) => {
      req.signout(err => {
         if (err) { return next(err); }
         let params = {
            id_token_hint: '',
            post_signout_redirect_uri: 'http://localhost:3000/'
         }
         res.redirect('/');
         req.session.destroy();
      });
   });
   ```
