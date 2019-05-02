Before using the SDK you have to create a new object of OktaOidc class. You can instantiate OktaOidc w/o parameters that means that SDK will use Okta.plist for configuration values. Alternatively you can create OktaOidc instance with custom configuration.

```swfit
import OktaOidc

// Use the default Okta.plist configuration
let oktaOidc = OktaOidc()

// Use configuration from another resource
let config = OktaOidcConfig(/* plist */)
// or: let config = OktaOidcConfig(/* dictionary */)

// Instantiate OktaOidc with custom configuration object
let oktaOidc = OktaOidc(configuration: config)
```

Then, you can start the authorization flow by simply calling `signInWithBrowser`. In case of successful authorization, this operation will return valid `OktaOidcStateManager` instance in its callback:

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

Developer is responsible for further storage of the state manager. The `OktaOidcStateManager` instance can be securly stored in the iOS keychain: 

```swift
authStateManager.writeToSecureStorage()
let config = OktaOidcConfig(/* plist */)
authStateManager = OktaOidcStateManager.readFromSecureStorage(for: config)
```

In native applications, it is common for users to have a long-lived session. It is important for the app to manage the user's session by refreshing tokens when they expire, using the `renew` method or re-prompting the user to sign in.

```swift
authStateManager.renew { newAccessToken, error in
    if let error = error else {
        // Error
        return
    }

    // renewed TokenManager
}
```
