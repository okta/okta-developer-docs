1. Create a middleware method inside `server.js` to verify the token in the `Authorization` header. The JWT is added to the `req` object:

   ```js
   const authenticationRequired = async (req, res, next) => {
     const authHeader = req.headers.authorization || '';
     const match = authHeader.match(/Bearer (.+)/);
     if (!match) {
       return res.status(401).send();
     }

     try {
       const accessToken = match[1];
       if (!accessToken) {
         return res.status(401, 'Not authorized').send();
       }
       req.jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience);
       next();
     } catch (err) {
       return res.status(401).send(err.message);
     }
   };
   ```

2. Register the middleware for all routes to the app instance:

   ```js
   app.all('*', authenticationRequired); // Require authentication for all routes
   ```
