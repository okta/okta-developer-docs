### Map the Authentication SDK to the Identity Engine SDK

If your application uses the Classic Engine Authentication SDK methods to authenticate through Okta, you generally start the authentication flow with a call to the `signInWithCredentials` method on an OktaAuth object (for example, `authClient`), using the parameters of username and password. This call returns a status on the transaction object (`transaction.status`), which must be handled by the application code. If successful (`transaction.status === 'SUCCESS'`), you make a call to the `setCookieAndRedirect` method to retrieve a sessionToken.

> **Note:** The `setCookieAndRedirect` method requires access to third-party cookies and is deprecated in the Identity Engine SDK.

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

To migrate your code to the Identity Engine SDK, the authentication flow is very similar, but you must replace the method calls to those in the new SDK and update your code to handle the different transaction object statuses that are returned.

#### Okta Identity Engine SDK authentication flow

For the Identity Engine SDK, you generally start the authentication flow with a call to the `idx.authenticate` method on an OktaAuth object (for example, `authClient`), using the parameters of username and password, or no parameters at all (see [Okta Identity Engine code options](#okta-identity-engine-sdk-code-options)). This call returns a status on the transaction object (`transaction.status`), which must be handled by the application code. If successful (`transaction.status === IdxStatus.SUCCESS`), your application receives access and ID tokens with the success response.

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

For further details and reference material, see [Migrating from authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md) in the Okta Auth JavaScript SDK.

For further details on the password authentication flow using Identity Engine and a sample application, see [Basic Sign in flow with the password factor](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/).

#### Okta Identity Engine SDK code options

The Identity Engine SDK methods provide an opportunity to mirror the code styles used in the Classic Engine Authentication SDK, which can facilitate an easier migration path. It also provides an opportunity to use a more open, flexible code style that takes advantage of the recursive nature of the SDK.These styles are respectively referenced in the Identity Engine SDK as Up-Front and On-Demand. See [Approaches](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#approaches) in the Identity Engine SDK.
