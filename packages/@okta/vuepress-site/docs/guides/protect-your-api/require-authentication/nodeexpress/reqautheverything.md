Similar to protecting an individual route, we will use a middleware to check for a bearer token and verify it:

```js
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  // The expected audience passed to verifyAccessToken() is required, and can be either a string (direct match) or an array
  // strings (the actual aud claim in the token must match one of the strings).
  const expectedAudience = 'api://default';

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}}
```

Once you have your app instance, you will apply the middleware to `*`:

```js
app.all('*', authenticationRequired);
```
