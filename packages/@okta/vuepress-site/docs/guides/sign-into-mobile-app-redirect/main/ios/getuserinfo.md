Display the user info by updating the `showUserInfo` function of `ContentView`:

```swift
func showUserInfo() {
   guard let credential = Credential.default else {
      showError(title: "Unable to Show User Info",
                message: "Could not read the token for the current user.")
      return
   }
   Task {
      do {
         busy = true
         let userInfo = try await credential.userInfo()
         busy = false
         var userInfoText = ""
         userInfo.payload.forEach { (key: String, value: Any) in
            userInfoText += ("\(key): \(value) \n")
         }
         infoText = userInfoText
      }
      catch {
         busy = false
         showError(title: "Unable to Show User Info", error: error)
      }
   }
}
```

The function first shows the activity indicator that blocks the UI, and then requests the credentials for the current user. The SDK calls the server and returns the user info array which is displayed in the info area.
