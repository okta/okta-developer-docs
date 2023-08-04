You can use the same middleware function to [require authentication for everything](#require-authentication-for-everything) to protect only specific routes. Add it as a new parameter to the route handler when required:

```js
app.use('/profile', ensureSignedIn, (req, res) => {
  res.render('profile', { user: req.user });
});
```
