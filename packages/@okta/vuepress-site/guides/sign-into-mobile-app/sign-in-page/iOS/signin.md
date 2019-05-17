Start the authorization flow by simply calling `signInWithBrowser` on `OktaOidc`. After a successful sign-in, this operation returns a valid `OktaOidcStateManager` instance in its callback:

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
