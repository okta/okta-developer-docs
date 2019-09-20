Similar to protecrting an individual route, we will use a middleware to check for a bearer token and verify it:

```js
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}}
```

Then, once you have your app instance, you will apply the middleware to `*`:

```js
app.all('*', authenticationRequired);
```
