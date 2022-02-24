Check for an existing session in two steps. First, initialize the authorization state manager (`authStateManager`) from a saved session. Then veriy that the access token is still valid by checking the expiry. The state manager session and its associated token are already saved by the `signIn` function calling `writeToSecureStorage`.

Update the `tokenExpired` utility function to check for token expiry:

```swift
func configureSDK() {
...
  // Check for an existing session
  self.authStateManager = OktaOidcStateManager.readFromSecureStorage(for: config)
  if let authStateManager = self.authStateManager,
    let tokenString = authStateManager.accessToken,
    !tokenExpired(tokenString) {
      updateStatus("Signed In.", infoText: "", signedInStatus: true)
    }
}
```

Then add this code to the end of `configureSDK` to initialize the state manager from a saved session and to check if the token is still valid:

```swift
func configureSDK () {
...
  // Check for an existing session
  self.authStateManager = OktaOidcStateManager.readFromSecureStorage(for: config)
  if let authStateManager = self.authStateManager,
    let tokenString = authStateManager.accessToken,
    !tokenExpired(tokenString) {
      updateStatus("Signed In.", infoText: "", signedInStatus: true)
    }
}
```

The `if let` assigments for both `authStateManager` and `tokenString` ensure that both are valid before updating the status of the app.
