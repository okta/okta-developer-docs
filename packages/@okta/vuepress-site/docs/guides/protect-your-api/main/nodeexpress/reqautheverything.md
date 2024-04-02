You can use a middleware function to protect any endpoint so only authenticated users can access it.

1. Add a function in a constant `authenticationRequired` to the list of constants at the top of `index.js`:

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

2. Add the following code to `index.js` to register the middleware for all endpoints. Include it after the call to `app.listen()`:

   ```js
   app.all('*', authenticationRequired);
   ```
