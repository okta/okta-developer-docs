### Map the Authentication SDK to Identity Engine SDK

If your application uses the Classic Engine Authentication SDK methods to authenticate through Okta with an org configured for MFA, you generally start the authentication flow with a call to the `signInWithCredentials` method on an `OktaAuth` object (for example, `authClient`), using the parameters of username and password. This call returns a status on the transaction object (`transaction.status === 'MFA_REQUIRED'`) that the application code must handle to identify the factor and start the challenge by calling (`transaction.factors`). This call returns a new status on the transaction object: (`transaction.status === 'MFA_CHALLENGE'`), which is then handled by your code to verify the factor challenge, for example, sending an SMS code parameter back to Okta to successfully validate the user. If successful (`transaction.status === 'SUCCESS'`), you make a call to the `setCookieAndRedirect` method to retrieve a sessionToken.

>**Note:** The `setCookieAndRedirect` method requires access to third-party cookies and is deprecated in the Identity Engine SDK.

See the following code snippet for a function that moves through MFA status:

```JavaScript
  function showMfaAuthn() {
  const transaction = appState.transaction;
  // MFA_ENROLL https://github.com/okta/okta-auth-js/blob/master/docs/authn.md#mfa_enroll
  if (transaction.status === 'MFA_ENROLL') {
    return showMfaEnrollFactors();
  }
  // MFA_ENROLL_ACTIVATE https://github.com/okta/okta-auth-js/blob/master/docs/authn.md#mfa_enroll_activate
  if (transaction.status === 'MFA_ENROLL_ACTIVATE') {
    return showMfaEnrollActivate();
  }
    // MFA_REQUIRED https://github.com/okta/okta-auth-js/blob/master/docs/authn.md#mfa_required
  if (transaction.status === 'MFA_REQUIRED') {
    return showMfaRequired();
  }
  // MFA_CHALLENGE https://github.com/okta/okta-auth-js/blob/master/docs/authn.md#mfa_challenge
  if (transaction.status === 'MFA_CHALLENGE') {
    return showMfaChallenge();
  }
  throw new Error(`TODO: showMfaAuthn: handle transaction status ${appState.transaction.status}`);
}

```

To migrate your code to the Identity Engine SDK, the authentication flow is very similar, but you must replace the method calls to those in the new SDK and update your code to handle the different transaction object statuses that are returned.

#### Identity Engine SDK authentication flow for MFA

For the Identity Engine SDK, you generally start the authentication flow with a call to the `idx.authenticate` method on an `OktaAuth` object (for example, `authClient`), using the parameters of username and password, or no parameters at all (see [Identity Engine code options](#identity-engine-sdk-code-options)). This call returns a status on the transaction object (`transaction.status`) of `Idx.status.PENDING` that the application must handle. The `nextStep` parameter included in the response provides details on what data the next must include. In the MFA instance, recursive calls to the same `idx.authenticate` method require a call with a factor type (for example, email or SMS) that initiates the challenge, and then a follow-up call to verify the challenge.

If successful (`transaction.status === IdxStatus.SUCCESS`), your application receives access and ID tokens with the success response.

See the following code snippet for this example:

```JavaScript
const transaction = await authClient.idx.authenticate({
  username: 'some-username',
  password: 'some-password',
});
if (transaction.status === IdxStatus.PENDING) { } = await authClient.idx.authenticate();
// gather user inputs (this call should happen in a separated request)
const {
  status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ name: 'authenticator', ... }]
    options // [{ name: 'email', ... }, ...]
  }
}
} = await authClient.idx.authenticate({ authenticator: 'email' });
// gather verification code from email (this call should happen in a separated request)
const {
  status, // IdxStatus.SUCCESS
  tokens
} = await authClient.idx.authenticate({ verificationCode: 'xxx' });

if (transaction.status === IdxStatus.SUCCESS) {
  authClient.tokenManager.setTokens(transaction.tokens); // App receives tokens directly
}

```

For further details on MFA, see [idx.authenticate](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) in the Okta Auth JavaScript SDK.

For further details on the password and email multifactor authentication flow using Identity Engine, see [Sign-in with email and password factors](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/nodejs/main/) and the sample application.
