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
    
    // #1 Store instance of stateManager into the iOS keychain
    stateManager.writeToSecureStorage()

    // #2 Use tokens
    print(stateManager.accessToken)
    print(stateManager.idToken)
    print(stateManager.refreshToken)
}
```

To restore `OktaOidcStateManager` object from iOS keychain do the following:
1. Create `OktaOidcConfig` object with the same config data that you used for the browser sign in
2. Call `OktaOidcStateManager.readFromSecureStorage` funtion and pass `OktaOidcConfig` object as a parameter

```swift
let config = OktaOidcConfig(/* plist */)
authStateManager = OktaOidcStateManager.readFromSecureStorage(for: config)
```
