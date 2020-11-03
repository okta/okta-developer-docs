First, set up a middleware function that checks for a bearer token and verifies it:

```js
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  // The expected audience passed to verifyAccessToken() is required, and can be either a string (direct match) or
  // an array  of strings (the actual aud claim in the token must match one of the strings).
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

If you have a route you want to protect, use the above middleware:

```js
app.get('/api/messages', authenticationRequired, (req, res) => {
  res.json({
    messages: [
      {
        date:  new Date(),
        text: 'I am a robot.'
      },
      {
        date:  new Date(new Date().getTime() - 1000 * 60 * 60),
        text: 'Hello, world!'
      }
    ]
  });
});
```
