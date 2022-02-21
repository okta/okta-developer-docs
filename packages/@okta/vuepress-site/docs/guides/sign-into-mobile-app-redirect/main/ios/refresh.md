Replace `refreshToken` in `ContentView` with the following code:

```swift
func refreshToken() {
  guard let authStateManager = authStateManager else {
    showError(title: "Unable to Renew Token",
              message: "Could not communincate with the Okta server.")
    return
  }

  var tokenInfo = OKTIDToken.init(idTokenString: authStateManager.accessToken!)
  let currentExpiry = tokenInfo!.expiresAt

  authStateManager.renew() { authStateManager, error in
    if let error = error {
      showError(title: "Unable to Renew Token",
      error: error)
      return
    }

    if authStateManager != nil {
      self.authStateManager = authStateManager
    }

    tokenInfo = OKTIDToken.init(idTokenString: (authStateManager?.accessToken!)!)

    if tokenInfo!.expiresAt == currentExpiry {
      showError(title: "Token Not Renewed",
                message: "An uknown issue prevented renewing the token.")
    } else {
      authStateManager?.writeToSecureStorage()
      statusText = "Token renewed."
      showTokenInfo()
    }
  }
}
```

Most of the code is checking for errors. The completion updates the state manager if needed, then checks that a new token was issued. If there is a new token, save it to secure storage, update the status text, and show the new token.