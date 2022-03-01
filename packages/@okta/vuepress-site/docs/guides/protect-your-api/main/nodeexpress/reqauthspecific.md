1. Remove the call to register the middleware for all routes in the app instance.

2. Add the middleware to the specific routes that require authentication.

```js
app.get('/api/whoami', authenticationRequired, (req, res) => {
  res.json(req.jwt?.claims);
});
```
