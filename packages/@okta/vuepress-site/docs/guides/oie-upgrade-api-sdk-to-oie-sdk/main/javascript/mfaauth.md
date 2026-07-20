### Map the Authentication SDK to Identity Engine SDK

If your application uses the Classic Engine Authentication SDK with an MFA-configured org, call `signInWithCredentials` with a username and password. This call returns a status on the transaction object (`transaction.status === 'MFA_REQUIRED'`). Your code must then identify the factor and start the challenge by calling `transaction.factors`. This call returns a new status on the transaction object (`transaction.status === 'MFA_CHALLENGE'`). Your code then verifies the factor challenge, for example, by sending an SMS code back to Okta to validate the user. If successful (`transaction.status === 'SUCCESS'`), you make a call to the `setCookieAndRedirect` method to retrieve a sessionToken.

>**Note:** The `setCookieAndRedirect` method requires access to third-party cookies. Identity Engine deprecates this method.

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

To migrate your code, keep the similar authentication flow, but replace the method calls with those in the Identity Engine SDK. Update your code to handle the different transaction object statuses the new SDK returns.

#### Identity Engine SDK authentication flow for MFA

For the Identity Engine SDK, you generally start the authentication flow with a call to `idx.start` on your `OktaAuth` object (for example, `authClient`). You then drive the flow forward with `idx.proceed` calls, each naming a `step` value (see [Identity Engine code options](#identity-engine-sdk-code-options)). This call returns a status on the transaction object (`transaction.status`) of `IdxStatus.PENDING` that the application must handle. The response's `nextStep` parameter provides details on what data the next call must include. For MFA, a `select-authenticator-authenticate` step lets the user choose a factor type, such as email or SMS. An `authenticator-verification-data` step then triggers the challenge, for example by sending the email code, and a final `challenge-authenticator` step verifies it.

If successful (`transaction.status === IdxStatus.SUCCESS`), your application receives access and ID tokens with the success response.

See the following code snippet for this example:

```JavaScript
let transaction = await authClient.idx.start();
transaction = await authClient.idx.proceed({ step: 'identify', username: 'some-username' });
transaction = await authClient.idx.proceed({ step: 'select-authenticator-authenticate', authenticator: 'okta_password' });
transaction = await authClient.idx.proceed({ step: 'challenge-authenticator', credentials: { passcode: 'some-password' } });

// transaction
// {
//   status,     // IdxStatus.PENDING
//   nextStep: {
//     inputs,   // [{ name: 'authenticator', ... }]
//     options   // [{ name: 'email', ... }, ...]
//   }
// }
// gather user's authenticator choice (this call should happen in a separate step, for example a form submit handler)
transaction = await authClient.idx.proceed({ step: 'select-authenticator-authenticate', authenticator: 'okta_email' });

// the previous response includes the email authenticator's id needed to trigger the challenge
const emailAuthenticatorId = transaction.nextStep.relatesTo.value.id;
transaction = await authClient.idx.proceed({
  step: 'authenticator-verification-data',
  authenticator: { id: emailAuthenticatorId, methodType: 'email' },
});

// gather verification code from email (this call should happen in a separate step)
transaction = await authClient.idx.proceed({ step: 'challenge-authenticator', credentials: { passcode: 'xxx' } });

if (transaction.status === IdxStatus.SUCCESS) {
  authClient.tokenManager.setTokens(transaction.tokens); // App receives tokens directly
}

```

For further details on MFA, see [idx.authenticate](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) in the Okta Auth JavaScript SDK.
