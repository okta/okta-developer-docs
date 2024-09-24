### Start the flow and display the authenticator list

The challenge flow follows the same first four steps as the [enrollment flow](#integrate-sdk-for-authenticator-enrollment):

* Build a sign-in page on the client
* Authenticate the user credentials
* Handle the response from the sign-in flow
* Display a list of possible authenticator factors

### Check authenticator status

When the user selects Google Authenticator, update Identity Engine with the chosen factor by calling `selectAuthenticator()`.


```java
case AWAITING_AUTHENTICATOR_SELECTION:
    // Request the list of authenticators, and then present a selection list to the user.
    // authenticationResponse.getAuthenticators()

    // Continue with the selected factor.
    authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

> **Note:**  This state is skipped if your application's sign-on policy contains only one factor.

### Receive the time-based one-time passcode TOTP from Google Authenticator 

The user's copy of Google Authenticator now displays the TOTP for the newly added account. The user enters the passcode into a challenge page.

<div class="half">

![A one-time passcode being shown in Google Authenticator](/img/authenticators/authenticators-google-one-time-password.png)

</div>

### Display challenge page and process password

The challenge flow now follows the same final steps as the [Enrollment flow](#_8-challenge-user-for-totp):

* Challenge the user for TOTP
* Sign the user in
