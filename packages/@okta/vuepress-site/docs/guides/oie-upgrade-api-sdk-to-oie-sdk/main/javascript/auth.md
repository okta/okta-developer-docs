### Map the Authentication SDK to the Identity Engine SDK

If your app uses the Classic Engine Authentication SDK methods to authenticate through Okta, you generally start the authentication flow with a call to the `signInWithCredentials` method on an `OktaAuth` object (for example, `authClient`), using the parameters of username and password. This call returns a status on the transaction object (`transaction.status`) that the app code must handle. If successful (`transaction.status === 'SUCCESS'`), call the `setCookieAndRedirect` method to retrieve a `sessionToken`.

> **Note:** The `setCookieAndRedirect` method requires access to third-party cookies and is deprecated in the Identity Engine SDK. Many browsers now block third-party cookies by default, which can break this call in production.

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

For the Identity Engine SDK, you generally start the authentication flow with a call to the `idx.authenticate` method on an `OktaAuth` object (for example, `authClient`), using the parameters of username and password, or no parameters at all (see [Identity Engine code options](#identity-engine-sdk-code-options)). This call returns a status on the transaction object (`transaction.status`) that the app code must handle. If successful (`transaction.status === IdxStatus.SUCCESS`), your app receives access and ID tokens directly in the response, with no redirect or third-party cookie access required.

See the following code snippet for this example:

```JavaScript
const transaction = await authClient.idx.authenticate({
  username: 'some-username',
  password: 'some-password',
});

if (transaction.status === IdxStatus.SUCCESS) {
  authClient.tokenManager.setTokens(transaction.tokens); // App receives tokens directly
}

```

> **Note:** Because the browser calls your Okta org directly, add your app's origin as a trusted origin in your org. Otherwise, the browser's CORS preflight check blocks the request. See [Grant cross-origin access to websites](/docs/guides/enable-cors/main/#grant-cross-origin-access-to-websites).

For further details and reference material, see [Migrating from Authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md) in the Okta Auth JavaScript SDK.

For further details on the password authentication flow using Identity Engine and a sample app, see [Auth JS fundamentals](/docs/guides/auth-js/main/).

#### Identity Engine SDK code options

The Identity Engine SDK methods provide an opportunity to mirror the code styles used in the Classic Engine Authentication SDK, which can facilitate an easier migration path. It also provides an opportunity to use a more open, flexible code style that takes advantage of the recursive nature of the SDK. These styles are respectively referenced in the Identity Engine SDK as up-front and on-demand. See [Approaches](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#approaches) in the Identity Engine SDK.
