### Okta Authentication SDK authentication flow for password recovery

For a password recovery flow using the Classic Engine Java Auth SDK, a typical app has to first instantiate the `AuthenticationClient` object and call the `recoverPassword()` method with the username. In this password recovery scenario, the email factor is used to recover the password, therefore the  `FactorType.EMAIL` argument is also provided.

```java
authenticationResponse = authenticationClient.recoverPassword(email, FactorType.EMAIL, null, ignoringStateHandler);
```

If the `recoverPassword()` method is successful, Okta sends an email to the user with a recovery token. The app receives the recovery token from the user and calls the `AuthenticationClient.verifyRecoveryToken()` method.

```java
authenticationResponse = authenticationClient.verifyRecoveryToken(recoveryToken,ignoringStateHandler);
```

A successful response from `verifyRecoveryToken()` includes a state token and a security recovery question. The app presents the user with the recovery question and then passes the user’s recovery answer to the `AuthenticationClient.answerRecoveryQuestion()` method.

```java
authenticationResponse = authenticationClient.answerRecoveryQuestion(secQnAnswer, stateToken, ignoringStateHandler);
```

After a successful response from `answerRecoveryQuestion()`, the app requests the user for a new password and sends the new password to the `AuthenticationClient.resetPassword()` method.

```java
authenticationResponse = authenticationClient.resetPassword(newPassword.toCharArray(), stateToken, ignoringStateHandler);
```

The user is authenticated after a successful response from `resetPassword()`.

### Okta Identity Engine SDK authentication flow for password recovery

To upgrade the previous Classic Engine password recovery flow, the recovery process is replaced with the Identity Engine remediation pattern loop of:

[`AuthenticationStatus` -> `selectAuthenticator()` -> `AuthenticationStatus` -> `verifyAuthenticator()` -> `AuthenticationStatus`]

The flow starts when the app instantiates the `IDXAuthenticationWrapper` client object and calls the `begin()` method. Then the recovery flow continues with the following process:

- `IDXAuthenticationWrapper.recoverPassword()` method is called with the username &mdash; This is similar to passing the username to the Java Auth SDK’s `AuthenticationClient.recoverPassword()` method.

  ```java
  ProceedContext proceedContext = Util.getProceedContextFromSession(session);
  AuthenticationResponse authenticationResponse =
      idxAuthenticationWrapper.recoverPassword(username, proceedContext);
  ```

- Okta returns a response with `AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` and a list of authenticators to verify (in this case, email is the only authenticator on the list) &mdash; Unlike the Classic Engine authentication flow, the user (or the app) selects the recovery authenticator to use. This method makes the app’s code generic to handle any recovery authenticator that is configured.

- `IDXAuthenticationWrapper.selectAuthenticator()` method is called with the authenticator selected (email) &mdash; This is synonymous with passing `FactorType.EMAIL` to the Java Auth SDK’s `AuthenticationClient.recoverPassword()` method. This method triggers Okta to send the recovery email to the user.

- Okta returns a response with `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` &mdash; This status implies that Okta is waiting for the user and app to submit the email verification code for recovery.

- `IDXAuthenticationWrapper.verifyAuthenticator()` method is called with the email verification code obtained from the user &mdash; This method replaces the Java Auth SDK’s `AuthenticationClient.verifyRecoveryToken()` and `AuthenticationClient.answerRecoveryQuestion()` method. With the Identity Engine, a recovery token isn't required, and the recovery question is replaced with a verification code.

- Okta returns a response with `AuthenticationStatus=AWAITING_PASSWORD_RESET` &mdash; This status implies that Okta is waiting for the app to submit a new password for the user.

- `IDXAuthenticationWrapper.verifyAuthenticator()` method is called with the user’s new password value, which is synonymous with the Java Auth SDK’s `AuthenticationClient.resetPassword()` method.

  ```java
  ProceedContext proceedContext = Util.getProceedContextFromSession(session);
  VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(newPassword);
  AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
  ```

- If the password update is successful, a response of `AuthenticationStatus=SUCCESS` is returned and the app calls `AuthenticationResponse.getTokenResponse()` to retrieve the required tokens for authenticated user activity.

For further details on how the password recovery with email use case is implemented with the Java Identity Engine SDK, see [User password recovery](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/java/main/).
