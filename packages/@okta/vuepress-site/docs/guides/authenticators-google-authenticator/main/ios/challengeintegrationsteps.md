### 1 - 4: Sign-in and Select Authenticator
The challenge flow follows the same first four steps as the [enrollment flow](#integrate-sdk-for-authenticator-enrollment):

* [Display the initial sign-on UI](#_1-display-the-initial-sign-on-ui).
* [Start the sign-on flow](#_2-start-the-sign-on-flow).
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

The next response from the SDK is also handled the same way, and is either: a successful login that ends the sign-on flow, a message to display (e.g. an incorrect code), or an error that terminates the sign-on flow.
