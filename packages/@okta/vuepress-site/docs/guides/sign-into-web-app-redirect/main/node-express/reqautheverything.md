You can use a middleware function to protect every endpoint so only authenticated users can access anything.

1. Open **app.js**.
1. Add the middleware function:

   ```js
   function ensureSignedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   res.redirect('/signin')
   }
   ```

1. Add the following line into the view engine setup to enforce authentication.

   ```js
   app.use(ensureSignedIn());
   ```
