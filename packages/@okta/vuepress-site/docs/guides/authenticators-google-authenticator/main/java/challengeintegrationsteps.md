### 1 - 4: Sign-in and Select Authenticator

The challenge flow follows the same first four steps as the [enrollment flow](#integrate-sdk-for-authenticator-enrollment):

* Build a sign-in page on the client
* Authenticate the user credentials
* Handle the response from the sign-in flow
* Display a list of possible authenticator factors

### 5: Check Authenticator Status

When the user selects Google Authenticator, update Okta with the chosen factor by calling the `selectAuthenticator()` method.


```java
case AWAITING_AUTHENTICATOR_SELECTION:
    // get the possible list of factors and have the user select one
    // authenticationResponse.getAuthenticators()

    // continue with the selected factor
    authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

> **NOTE:** If your application's sign-on policy only contains one factor, this state will be skipped.

### 6: Get one-time password from Google Authenticator

The user’s copy of Google Authenticator now displays the time-based one-time password for the newly added account which they will enter into a challenge page.

![A one-time password being shown in Google Authenticator](/img/authenticators/authenticators-google-one-time-password.png)

After the user selects Google Authenticator and prompts the for a time-based one-time password (the _code_), verify the code with Okta by calling the `verifyAuthenticator` method:

```java
case AWAITING_AUTHENTICATOR_VERIFICATION:
    // confirm the TOTP code with Okta and to back into the state machine
    authenticationResponse = idxAuthenticationWrapper
        .verifyAuthenticator(proceedContext, new VerifyAuthenticatorOptions(code));
```

### 7: Handle the Success status.

A user is only successfully authenticated once the `AuthentiationStatus` is `SUCCESS`. After a user is authenticated, If your application needs to make other HTTP requests on behalf of the user, you can access their ID and access tokens, by calling the `getTokenResponse()` object.

```java
case SUCCESS:
    TokenResponse tokenResponse = authenticationResponse.getTokenResponse();
    String accessToken = tokenResponse.getAccessToken();
    … your code …
```
