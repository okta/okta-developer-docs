
Next, the user opens the email and clicks on the activation link which redirects them back to your app. Your app pulls the activation token from the URL and passes it to the Embedded SDK to continue the registration and account sign up process. Specifically, make a call to `OktaAuth.idx.register()` passing in the activation token.


```javascript
router.get('/register', async (req, res, next) => {
  const activationToken = query['activationToken'] || query['token'];
  const transaction = await authClient.idx.register({ activationToken });
  ...
}
```
