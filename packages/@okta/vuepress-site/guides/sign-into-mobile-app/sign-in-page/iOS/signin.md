Start the authorization flow by simply calling `signInWithBrowser` on `OktaOidc`. After a successful sign-in, this operation returns a valid `OktaOidcStateManager` instance in its callback:

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

You are responsible for persisting the state manager. You can securely store the `OktaOidcStateManager` instance in the iOS keychain:

```swift
authStateManager.writeToSecureStorage()
let config = OktaOidcConfig(/* plist */)
authStateManager = OktaOidcStateManager.readFromSecureStorage(for: config)
```
