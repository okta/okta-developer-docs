### Map the Authentication SDK password recovery methods to Identity Engine SDK

If your application uses the Classic Engine Authentication SDK methods to recover a password through Okta, you generally start the flow by calling a method (`authClient.forgotPassword`) and then calling verify on the returned transaction (`transaction.verify`) with a passcode. After this call, you check for a successful status (`transaction.status`), which completes the transaction. You then need to redirect back to Okta to get tokens (`session.setCookieAndRedirect`).

> **Note:** The `setCookieAndRedirect` method requires access to third-party cookies and is deprecated in the Identity Engine SDK.

See the following code snippet for this example:

```JavaScript
authClient.forgotPassword({
  username: 'john.doe@example.com',
  factorType: 'SMS',
})
.then(function(transaction) {
  return transaction.verify({
    passCode: '123456' // The passCode from the SMS or CALL
  });
})
.then(function(transaction) {
  if (transaction.status === 'SUCCESS') {
    authClient.session.setCookieAndRedirect(transaction.sessionToken);
  } else {
    throw 'We cannot handle the ' + transaction.status + ' status';
  }
})
.catch(function(err) {
  console.error(err);
});
```

#### Identity Engine SDK authentication flow for password recovery

For the Identity Engine SDK, you generally start the password recovery flow with a call to `idx.start` on an `OktaAuth` object (for example, `authClient`), then drive the flow forward with `idx.proceed` calls that name an `actions` or `step` value. This call returns a status on the transaction object (`transaction.status`) that the application code must handle. When finally successful (`IdxStatus.SUCCESS`), your application receives access and ID tokens with the success response. There are other calls prior to that based on the password policy.

See the following code snippet for this example that shows the last call, which includes the user's confirmed new (recovered) password entered in a form on the page:

```JavaScript
const password = passwordInput.value;
const confirmPassword = confirmPasswordInput.value;

if (password !== confirmPassword) {
  throw new Error('Passwords do not match');
}

let transaction = await authClient.idx.start();
transaction = await authClient.idx.proceed({ actions: ['currentAuthenticator-recover'] });
transaction = await authClient.idx.proceed({ step: 'reset-authenticator', credentials: { passcode: password } });

if (transaction.status === IdxStatus.SUCCESS) {
  authClient.tokenManager.setTokens(transaction.tokens);
}
```

For further details and reference material, see [Migrating from authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md).
