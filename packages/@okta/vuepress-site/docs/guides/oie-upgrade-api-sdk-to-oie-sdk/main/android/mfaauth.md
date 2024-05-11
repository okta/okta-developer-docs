### Okta Authentication SDK authentication flow for MFA

For a multifactor sign-in authentication flow using the Java Auth SDK, a typical app has to instantiate the `AuthenticationClient` object and call the `authenticate()` method, similar to the [Map basic sign-in code to the Identity Engine SDK](#map-basic-sign-in-code-to-the-identity-engine-sdk) use case.

In this MFA scenario, there is an additional email factor to verify, therefore the `authenticate()` call returns an `AuthenticationResponse` object with a list of one additional factor to verify: the email factor. The `AuthenticationResponse.getFactors()` method is used to return the list of factors to verify.

```java
final String factorId = authenticationResponse.getFactors().get(0).getId();
final FactorType factorType = authenticationResponse.getFactors().get(0).getType();
final String stateToken = authenticationResponse.getStateToken();

// we only support Email factor for sample purpose
if (factorType == FactorType.EMAIL) {
    AuthenticationResponse authResponse = authenticationClient.verifyFactor(factorId, stateToken, authenticationStateHandler);
    // Show verify email view.
} else {
    // Show error view.
}
```

For the email factor, the app has to verify a code that is sent to the user’s email. The `AuthenticationClient.challengeFactor()` is called to send the verify code email, then the `AuthenticationClient.verifyFactor()` method is used to verify the code from the email.

> **Note:** If there is only one factor in the list, the app doesn’t need to call `challengeFactor()`, as it is automatically triggered.

```java
try {
    VerifyPassCodeFactorRequest verifyPassCodeFactorRequest =
            authenticationClient.instantiate(VerifyPassCodeFactorRequest.class);
    verifyPassCodeFactorRequest.setStateToken(stateToken);
    verifyPassCodeFactorRequest.setPassCode(passcode);
    verifyPassCodeFactorRequest.setRememberDevice(false);

    authenticationResponse = authenticationClient.verifyFactor(factorId,
            verifyPassCodeFactorRequest, authenticationStateHandler);
} catch (AuthenticationException e) {
    // Go to error view.
}
```

If the `verifyFactor()` method is successful, an `AuthenticationResponse` object is returned with a session token and a `SUCCESS` status.

### Identity Engine SDK authentication flow for MFA

The Identity Engine MFA authentication flow is initially similar to implementing using the Classic Engine SDK, however, there are slight differences in handling the subsequent multifactors. The authentication flow starts when the app instantiates the `IDXAuthenticationWrapper` client object and calls the `begin()` method. After receiving the username and password from the user, the app passes them as arguments to the `authenticate()` method (similar to the Classic Engine `AuthenticationClient.authenticate()` method). This method returns the Identity Engine `AuthenticationResponse` object with an `AuthenticationStatus`.

> **Note:** Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

If additional factors are required, then `AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` and a list of authenticators (`AuthenticationResponse.getAuthenticators()`) to be verified are returned in the `AuthenticationResponse`. This is where the Identity Engine MFA differs from the Classic Engine MFA. The Identity Engine MFA flow has the following general pattern:

- AuthenticationResponse returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` &mdash; implying that the app/user has to select the authenticator to verify. The app can provide the user with a selection of authenticators to verify (if there is more than one authenticator) or the app can choose to select the authenticator on behalf of the user and present the user with an appropriate message.

- The app calls `IDXAuthenticationWrapper.selectAuthenticator()` to select the authenticator to verify &mdash; this is synonymous with the Java Auth SDK’s `AuthenticationClient.challengeFactor()` method, where the authenticator challenge is triggered. In this case, an email is sent with the verify code.

> **Note:** Unlike the Java Auth SDK’s `challengeFactor()`, the single authenticator isn’t automatically selected. The app must call the `selectAuthenticator()` method to trigger the authenticator challenge.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

- AuthenticationResponse returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` &mdash; implying that Okta is waiting for the authenticator verification from the user/app.

- The app calls `IDXAuthenticationWrapper.verifyAuthenticator()` to provide the authenticator verification &mdash; this is synonymous with the Java Auth SDK’s `AuthenticationClient.verifyFactor()` method, where the app provides the challenge verification. In this case, the code within the user’s email is provided as an argument.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new
     VerifyAuthenticatorOptions(code);

AuthenticationResponse authenticationResponse =
     idxAuthenticationWrapper.verifyAuthenticator(proceedContext,
     verifyAuthenticatorOptions);
```

- AuthenticationResponse returns either:
  - `AuthenticationStatus=SUCCESS` &mdash; the MFA process is successful and the app can call `AuthenticationResponse.getTokenResponse()` to retrieve the required tokens for authenticated user activity.
  OR
  -`AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` &mdash; additional authenticator verification is required, and the app can loop through the MFA remediation process again: `[AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` -> `selectAuthenticator()` -> `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` -> `verifyAuthenticator()` -> `check AuthenticationStatus]`.

The number of required/optional authenticators for MFA are configured in the Admin Console and in the authentication policies. The Identity Engine-enabled app is structured in a way that enables the MFA challenges to differ based on user, group, context, and available factors since the MFA process is driven by policies set in Okta and not hard-coded into the app.

For further details on how this use case is implemented with the Java Identity Engine SDK, see [Sign-in flow with password and email](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/android/main/).
