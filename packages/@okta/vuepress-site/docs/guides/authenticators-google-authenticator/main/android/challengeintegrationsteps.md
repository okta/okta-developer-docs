### 1 - 4: Sign-in and Select Authenticator

The challenge flow follows the same first four steps as the [enrollment flow](#integrate-sdk-for-authenticator-enrollment):

- [Display the initial sign-in UI](#_1-display-the-initial-sign-in-ui).
- [Start the sign-in flow](#_2-start-the-sign-in-flow).
- [Authenticate the user credentials](#_3-authenticate-the-user-credentials).
- [Display a list of authenticators available for enrollment](#_4-display-a-list-of-authenticators-available-for-enrollment).

### 5: Display an OTP entry field

The `CHALLENGE_AUTHENTICATOR` remediation type used for requesting a password is also used for one-time codes. A Google Authenticator code request is represented by an authenticator with a `type` of `IdxAuthenticator.Kind.APP` and a `key` of `"google_otp"`.

This version of `handleChallenge()` includes Google Authenticator:

```kotlin
private suspend fun handleChallenge(remediation: IdxRemediation) {
    // If no authenticators are found for challenge show error and abort
    if (remediation.authenticators.isEmpty()) {
        // handle error
        return
    }
    val authenticator = remediation.authenticators.first()

    when (authenticator.type) {
        IdxAuthenticator.Kind.PASSWORD -> {
            // Update the value in the remediation object and proceed to the next step in IDX flow
            remediation["credentials.passcode"]?.value = password
            remediation.proceed()
        }
        IdxAuthenticator.Kind.APP -> {
            if (authenticator.key == "google_otp") {
                // get challenge form field from remediation
                handleAuthenticatorEnrollOrChallenge(remediation, null)
            }
        }
        else -> {
            // handle unknown authenticator error
            return
        }
    }
}
```

The dynamic UI built with `IdxDynamicField.createView()` from [the enrollment flow](#_5-display-the-shared-secret-qr-code-and-request-the-code) also works for the challenge case as the shared secret section is shown only if the data is in the remediation. The following screenshots show that view with a field for entering the OTP, and the same view displays a message that's part of the remediation.

<div class="common-image-format">

![Display the OTP entry field](/img/authenticators/android-authenticators-google-code-screen.png "Screenshot shows a form containing an OTP code entry filed and continue button.")

</div>

The next response from the SDK is also handled the same way, and is either: a user who successfully signs in and ends the sign-in flow, a message to display (for example, an incorrect code), or an error that terminates the sign-in flow.
