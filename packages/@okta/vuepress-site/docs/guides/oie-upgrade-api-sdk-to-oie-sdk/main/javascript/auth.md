### Map the Authentication SDK to the Identity Engine SDK

If your app uses the Classic Engine Authentication SDK, you typically authenticate through Okta with the `signInWithCredentials` method. Call it on an `OktaAuth` object (for example, `authClient`) with a username and password. This call returns a status on the transaction object (`transaction.status`) that the app code must handle. If successful (`transaction.status === 'SUCCESS'`), call the `setCookieAndRedirect` method to retrieve a `sessionToken`.

> **Note:** The `setCookieAndRedirect` method requires access to third-party cookies. Identity Engine deprecates this method. Many browsers now block third-party cookies by default, which can break this call in Production.

See the following code snippet for this example:

```JavaScript
authClient.signInWithCredentials({
  username: 'some-username',
  password: 'some-password'
})
.then(function(transaction) {
  if (transaction.status === 'SUCCESS') {
    authClient.session.setCookieAndRedirect(transaction.sessionToken); // Sets a cookie on redirect
  } else {
    throw 'We cannot handle the ' + transaction.status + ' status';
  }
})
.catch(function(err) {
  console.error(err);
});

```

The authentication flow for the Identity Engine SDK is similar. However, you must replace the method calls with those in the new SDK. You also need to update your code to handle the different transaction object statuses it returns.

#### Identity Engine SDK authentication flow

For the Identity Engine SDK, start the authentication flow with a call to the `idx.start` method on your `OktaAuth` object. Each following call to `idx.proceed` must include a `step` value naming the remediation to run, based on the previous response's `nextStep` field. See [Identity Engine code options](#identity-engine-sdk-code-options) for more on these approaches. Each call returns a status on the transaction object (`transaction.status`) that the app code must handle. If successful (`transaction.status === IdxStatus.SUCCESS`), your app receives access and ID tokens directly in the response. The Identity Engine SDK requires no redirect or third-party cookie access.

See the following code snippet for this example:

```JavaScript
let transaction = await authClient.idx.start();
transaction = await authClient.idx.proceed({ step: 'identify', username: 'some-username' });
transaction = await authClient.idx.proceed({ step: 'select-authenticator-authenticate', authenticator: 'okta_password' });
transaction = await authClient.idx.proceed({ step: 'challenge-authenticator', credentials: { passcode: 'some-password' } });

if (transaction.status === IdxStatus.SUCCESS) {
  authClient.tokenManager.setTokens(transaction.tokens); // App receives tokens directly
}

```

> **Note:** Because the browser calls your Okta org directly, add your app's origin as a trusted origin in your org. Otherwise, the browser's CORS preflight check blocks the request. See [Grant cross-origin access to websites](/docs/guides/enable-cors/main/#grant-cross-origin-access-to-websites).

For further details and reference material, see [Migrating from Authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md) in the Okta Auth JavaScript SDK.

For further details on the password authentication flow using Identity Engine and a sample app, see [Auth JS fundamentals](/docs/guides/auth-js/main/).

#### Identity Engine SDK code options

The Identity Engine SDK methods can mirror the code styles used in the Classic Engine Authentication SDK. This can make migration easier. Or use a more open, flexible style that takes advantage of the SDK's recursive calls. The Identity Engine SDK refers to these styles as up-front and on-demand, respectively. See [Approaches](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#approaches) in the Identity Engine SDK.
