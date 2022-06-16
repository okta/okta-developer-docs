### 1 - 4: Sign-in and Select Authenticator

The challenge flow follows the same first four steps as the [enrollment flow](#integrate-sdk-for-authenticator-enrollment):

* Build a sign-in page on the client
* Authenticate the user credentials
* Handle the response from the sign-in flow
* Display a list of possible authenticator factors

### 5: Check Authenticator Status

When the user selects Google Authenticator, update Identity Engine with the chosen factor by calling `selectAuthenticator()`.


```java
case AWAITING_AUTHENTICATOR_SELECTION:
    // Request the list of authenticators, and then present a selection list to the user.
    // authenticationResponse.getAuthenticators()

    // Continue with the selected factor.
    authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

> **NOTE:**  This state is skipped if your application's sign-on policy contains only one factor.

### 6: Receive OTP from Google Authenticator

The user's copy of Google Authenticator now displays the time-based one-time password (TOTP) for the newly added account which they will enter into a challenge page.

![A one-time password being shown in Google Authenticator](/img/authenticators/authenticators-google-one-time-password.png)

Add a page that prompts the user for the TOTP. Call `verifyAuthenticator()` passing in the TOTP as a parameter to verify it with Identity Engine:

```java
case AWAITING_AUTHENTICATOR_VERIFICATION:
    // confirm the TOTP code with Okta and to back into the state machine
    authenticationResponse = idxAuthenticationWrapper
        .verifyAuthenticator(proceedContext, new VerifyAuthenticatorOptions(code));
```

### 7: Handle the Success status

After successful user authentication, Identity Engine returns an `AuthenticationStatus` of `SUCCESS`. Call `getTokenResponse()` to retrieve their ID and access tokens.

```java
case SUCCESS:
    TokenResponse tokenResponse = authenticationResponse.getTokenResponse();
    String accessToken = tokenResponse.getAccessToken();
    … your code …
```
