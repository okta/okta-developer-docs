You refreshed a token when checking for an existing session in [Check for a session at startup](#check-for-a-session-at-startup). In this case you may want to catch any errors that occur.

Update `refreshToken` in `ContentView` with the following code:

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

Most of the code is for controling the state of the busy view or handling errors.

An expired token usualy needs to be refreshed only when using it to contact the server. These are a few of the things to consider when you choose how often you're production app refreshes the token:

- Network calls increase the power use of your app.
- Is the device in a state that disables the network, such as Airplane mode.
- Is the device using Data rather than WiFi.
- How to handle failed refresh attempts, especially when the server can't be reached.

Credential can be used get the tokens and read information about them, such as expiry date. The following function displays the access token, it's issue and expiry dates, and any associated refresh token in the info area:

```swift
func showTokenInfo() {
   infoText = ""
   var tokenString = "Unable to show token"
   if let token = Credential.default?.token {
      let dateFormatter = DateFormatter()
      dateFormatter.dateStyle = .medium
      dateFormatter.timeStyle = .medium

      tokenString = "Access Token\n\n\(token.accessToken)\n\n"
      if let issued = token.issuedAt {
         tokenString += "Issue Date: \(dateFormatter.string(from: issued))\n"
      }
      if let expiry = token.expiresAt {
         tokenString += "Expiry Date: \(dateFormatter.string(from: expiry))\n"
      }
      if token.isExpired {
         tokenString += "---EXPIRED---\n"
      }
      if let refreshToken = token.refreshToken {
         tokenString += "\nRefresh Token\n\n\(refreshToken)"
      }
   }
   infoText = tokenString
}
```

