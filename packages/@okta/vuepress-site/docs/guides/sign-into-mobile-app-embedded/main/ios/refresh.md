You refreshed a token when checking for an existing session in [Check for a session at startup](#check-for-a-session-at-startup). In this case you may want to catch any errors that occur.

Update `refreshToken` in `ContentView.swift` with the following code:

```swift
func refreshToken() {
   if let credential = Credential.default {
      Task {
         busy = true
         do {
            try await credential.refreshIfNeeded()
         }
         catch {
            showError(title: "Unable to Refresh Token", error: error)
         }
         busy = false
      }
   } else {
      showError(title: "Unable to Refresh Token", message: "An unknown issue prevented refreshing the token. Please try again.")
   }
}
```

Most of the code is for handling errors or controlling the state of the busy view.

Tokens are refreshed regularly. Each refresh requires network activity, which is one of the operations that requires higher battery use. In your production app, the best practice is to refresh a token only when it's required to authenticate a server call. Some other considerations for refreshing a token include the following:

* Check if network connectivity is disabled, such as Airplane Mode.
* Check if the device is using cellular data rather than Wi-Fi.
* Handle failed refresh attempts, especially when the server can't be reached.

The `Token` class contains information such as expiry date. The following function displays the access token, its issue and expiry dates, and any associated refresh token in the info area:

```swift
func showTokenInfo() {
   infoText = ""
   var tokenString = "Unable to show token"
   if let token = Credential.default?.token {
      let dateFormatter = DateFormatter()
      dateFormatter.timeStyle = .medium
      dateFormatter.dateStyle = .medium

      tokenString = ""
      if let issued = token.issuedAt {
         tokenString += "Issue Date: \(dateFormatter.string(from: issued))\n"
      }
      if let expiry = token.expiresAt {
         tokenString += "Expiry Date: \(dateFormatter.string(from: expiry))\n"
      }
      if token.isExpired {
         tokenString += "---EXPIRED---\n"
      }
      tokenString += "\nAccess Token\n\n\(token.accessToken)\n\n"
      if let refreshToken = token.refreshToken {
         tokenString += "\nRefresh Token\n\n\(refreshToken)"
      }
   }
   infoText = tokenString
}
```

