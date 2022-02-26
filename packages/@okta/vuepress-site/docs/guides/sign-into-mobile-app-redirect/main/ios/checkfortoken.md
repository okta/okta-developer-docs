Check for an existing session in two steps.

1. Initialize the authorization state manager (`authStateManager`) from a saved session.
2. Verify that the access token is still valid by checking the expiry.

The state manager session and its associated token are already saved by the `signIn` function calling `writeToSecureStorage`.

1. Update the `tokenExpired` utility function to check for token expiry:

```swift
func tokenExpired(_ tokenString: String?) -> Bool {
  guard let accessToken = tokenString,
  let tokenInfo = OKTIDToken.init(idTokenString: accessToken) else {
    return false
  }
    
  return Date() > tokenInfo.expiresAt
}
```

2. Add this code to the end of `configureSDK` to initialize the state manager from a saved session and to check if the token is still valid:

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
