### 1 - 4: Sign-in and Select Authenticator
The challenge flow follows the same first 3-4 steps as the [enrollment flow](/docs/guides/authenticators-google-authenticator/ios/main/#integrate-sdk-for-authenticator-enrollment):

* Display the initial sign-in UI
* Start the sign-on flow
* Authenticate the user credentials
* Display a list of possible authenticator factors

Step 4, displaying a list of authenticators, depends on the policy settings.

### 5: Display and capture a code entry

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

The same utlity functions work for both a challenge and an enrollment. The SwiftUI form also works because the QR Code and shared secret display only if there's data. The next steps are also the same, either a successful login, a message, or an error.
