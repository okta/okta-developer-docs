### 1 - 4: Sign-in and Select Authenticator
The challenge flow follows the same first four steps as the [enrollment flow](#integrate-sdk-for-authenticator-enrollment):

* [Display the initial sign-in UI](#_1-display-the-initial-sign-in-ui).
* [Start the sign-in flow](#_2-start-the-sign-in-flow).
* [Authenticate the user credentials](#_3-authenticate-the-user-credentials).
* [Display a list of authenticators available for enrollment](#_4-display-a-list-of-authenticators-available-for-enrollment).


### 5: Display an OTP entry field

The `.challengeAuthenticator` remediation type used for requesting a password is also used for one-time codes. A Google Authencator code request is represented by an authenticator with a `type` of `.app` and a `key` of `"google_otp"`.

This version of `handleChallenge(remediation:)` includes Google Authenticator:


```swift
func handleChallenge(_ remediation: Remediation) {
    guard let authenticator = remediation.authenticators.first else {
        finish(with: .unexpectedAuthenticator)
        return
    }

    let type = authenticator.type
    switch type {
    case .password:
        remediation["credentials.passcode"]?.value = password
        remediation.proceed()

    case .app:
        if authenticator.key == "google_otp" {
            // Tell the UI to present a UI for requesting a one-time key.
        }

    default:
        finish(with: .unexpectedAuthenticator)
        return
    }
}
```

The `EnrollAuthenticatorView` from [the enrollment flow](#_5-display-the-shared-secret-qr-code-and-request-the-code) also works for the challenge case as the shared secret section is shown only if the data is in the remediation. The following screenshots show that view with a field for entering the OTP, and the same view displays a message that's part of the remediation.

<div class="common-image-format">

![Display the OTP entry field and any warning message.](/img/authenticators/ios-authenticators-google-code-screen.png "Two screenshots. The first shows a form containing an OTP code entry filed and continue and cancel buttons. The second shows the same form with a warning message.")

</div>

The next response from the SDK is also handled the same way, and is either: a user who successfully signs in and ends the sign-in flow, a message to display (for example, an incorrect code), or an error that terminates the sign-in flow.
