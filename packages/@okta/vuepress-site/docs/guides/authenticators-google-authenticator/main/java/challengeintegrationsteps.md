### 1 - 4: Start flow and display authenticator list

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

### 6: Receive TOTP from Google Authenticator 

The user's copy of Google Authenticator now displays the time-based one-time password (TOTP) for the newly added account which they will enter into a challenge page.

<div class="common-image-format">

![A one-time password being shown in Google Authenticator](/img/authenticators/authenticators-google-one-time-password.png)

</div>

### 7 - 8: Display challenge page and process password

The challenge flow now follows the same final steps as the [Enrollment flow](#_8-challenge-user-for-totp):

* Challenge user for TOTP
* Sign user in
