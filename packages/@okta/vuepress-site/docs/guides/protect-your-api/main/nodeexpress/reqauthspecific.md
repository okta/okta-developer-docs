1. Remove the call to register the middleware for all endpoints from `index.js`.

1. Add the middleware to the specific routes that require authentication, for example:

   ```js
   app.get('/api/whoami', authenticationRequired, (req, res) => {
     res.json(req.jwt?.claims);
   });
   ```
