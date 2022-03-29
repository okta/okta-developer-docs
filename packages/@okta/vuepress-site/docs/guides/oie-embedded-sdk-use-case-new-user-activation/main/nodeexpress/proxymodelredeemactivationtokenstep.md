
When the user opens their email and clicks on the activation link, they are sent back to your app. Your app pulls the activation token from the URL's query parameter and passed it to the Embedded SDK to continue the registration process. Specifically, make a call to `OktaAuth.idx.register()` passing in the activation token.

```javascript
router.get('/register', async (req, res, next) => {
  const activationToken = query['activationToken'] || query['token'];
  const transaction = await authClient.idx.register({ activationToken });
  ...
}
```
