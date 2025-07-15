Display the user info by updating the `showUserInfo()` function of `ContentView.swift`:

```swift
func showUserInfo() {
   guard let idToken = Credential.default?.token.idToken else {
      showError(title: "Unable to Show User Info",
                message: "Could not read the token for the current user.")
      return
   }

   var infoString = ("Name: \(idToken.name!)\n")
   infoString += "User Name: \(idToken.preferredUsername!)\n"
   infoString += "User ID: \(idToken.subject!)\n"
   if let issueDate = idToken.issuedAt {
      let dateFormatter = DateFormatter()
      dateFormatter.timeStyle = .medium
      dateFormatter.dateStyle = .medium
      infoString += "Issue Date: \(dateFormatter.string(from: issueDate))\n"
   }
   infoText = infoString
}
```

The function reads the user information from the local ID token. The available information depends on the scopes that are specified in the `Okta.plist` file. You can also request user information from the server with the `userInfo()` function of the `Credential` class.
