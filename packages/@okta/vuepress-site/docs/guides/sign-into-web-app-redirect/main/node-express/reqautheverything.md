You can use a middleware function to protect every endpoint so that only authenticated users have access.

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

1. Add the following line before the `/profile` definition to enforce authentication of all routes defined after adding the middleware.

   ```js
   app.use(ensureSignedIn);
   ```
