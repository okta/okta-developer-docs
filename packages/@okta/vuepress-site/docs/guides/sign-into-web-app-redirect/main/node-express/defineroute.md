When you [created an app integration in the Admin Console](#create-an-app-integration-in-the-admin-console), you set the sign-in redirect URL to <StackSnippet snippet="signinredirecturi" inline /> and the sign-out redirect URL to <StackSnippet snippet="signoutredirecturi" inline />. In this sample, only the sign-in callback requires additional code:

1. Open **app.js**.
1. Add the route handler for the callback directly after the `app.post('/signout', ...)` code:

```js
app.use('/authorization-code/callback',
  passport.authenticate('oidc', { failureMessage: true, failWithError: true }),
  (req, res) => {
    res.redirect('/profile');
  }
);
```
