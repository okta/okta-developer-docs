### Map the Authentication SDK password recovery methods to Identity Engine SDK

If your application uses the Classic Engine Authentication SDK methods to recover a password through Okta, you generally start by calling `authClient.forgotPassword`. You then call verify on the returned transaction (`transaction.verify`) with a passcode. After this call, you check for a successful status (`transaction.status`), which completes the transaction. You then need to redirect back to Okta to get tokens (`session.setCookieAndRedirect`).

> **Note:** The `setCookieAndRedirect` method requires access to third-party cookies. Identity Engine deprecates this method.

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

For the Identity Engine SDK, you generally start the password recovery flow with a call to `idx.start` on your `OktaAuth` object (for example, `authClient`). An `identify` step then names the user, and a `currentAuthenticatorEnrollment-recover` action begins recovery. An `authenticator-verification-data` step sends the recovery code, and a final `challenge-authenticator` step verifies it. This call returns a status on the transaction object (`transaction.status`) that the application code must handle. When finally successful (`IdxStatus.SUCCESS`), your application receives access and ID tokens with the success response.

See the following code snippet for this example, which ends with the user's confirmed new (recovered) password entered in a form on the page:

```JavaScript
let transaction = await authClient.idx.start();
transaction = await authClient.idx.proceed({ step: 'identify', username: 'some-username' });
transaction = await authClient.idx.proceed({ actions: ['currentAuthenticatorEnrollment-recover'] });

// the email authenticator's id comes from the previous response and is required to trigger the challenge
const emailAuthenticatorId = transaction.nextStep.relatesTo.value.id;
transaction = await authClient.idx.proceed({
  step: 'authenticator-verification-data',
  authenticator: { id: emailAuthenticatorId, methodType: 'email' },
});

// gather verification code from email (this call should happen in a separate step)
transaction = await authClient.idx.proceed({ step: 'challenge-authenticator', credentials: { passcode: 'xxx' } });

// gather the user's confirmed new password from a form on the page (this call should happen in a separate step)
const password = passwordInput.value;
const confirmPassword = confirmPasswordInput.value;

if (password !== confirmPassword) {
  throw new Error('Passwords do not match');
}

transaction = await authClient.idx.proceed({ step: 'reset-authenticator', credentials: { passcode: password } });

if (transaction.status === IdxStatus.SUCCESS) {
  authClient.tokenManager.setTokens(transaction.tokens);
}
```

For further details and reference material, see [Migrating from authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md).
