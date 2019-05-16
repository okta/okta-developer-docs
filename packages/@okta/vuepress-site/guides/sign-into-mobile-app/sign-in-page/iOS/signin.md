Before using the SDK, you have to create a new `OktaOidc` object. You can instantiate `OktaOidc` without parameters. If you do that, the SDK uses Okta.plist for configuration values. Alternatively, you can create the `OktaOidc` instance with a custom configuration.

```swift
import OktaOidc

// Use the default Okta.plist configuration
let oktaOidc = OktaOidc()

// Use configuration from another resource
let config = OktaOidcConfig(/* plist */)
// or: let config = OktaOidcConfig(/* dictionary */)

// Instantiate OktaOidc with custom configuration object
let oktaOidc = OktaOidc(configuration: config)
```

Then, you can start the authorization flow by simply calling `signInWithBrowser`. When successfully authorized, this operation returns a valid `OktaOidcStateManager` instance in its callback:

```swift
oktaOidc.signInWithBrowser(from: self) { stateManager, error in
    if let error = error {
        // Error
        return
    }

    // stateManager.accessToken
    // stateManager.idToken
    // stateManager.refreshToken
}
```
You are responsible for storing the state manager. You can securely store the `OktaOidcStateManager` instance in the iOS keychain:

```swift
authStateManager.writeToSecureStorage()
let config = OktaOidcConfig(/* plist */)
authStateManager = OktaOidcStateManager.readFromSecureStorage(for: config)
```

In native applications, it's common for users to have a long-lived session. It's important for the app to manage the user's session by refreshing tokens when they expire, using the `renew` method or re-prompting the user to sign in.

```swift
authStateManager.renew { newAccessToken, error in
    if let error = error else {
        // Error
        return
    }

    // renewed TokenManager
}
```
