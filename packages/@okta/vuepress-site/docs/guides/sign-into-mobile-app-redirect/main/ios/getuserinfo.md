Update the `showUserInfo` function of `ContentView`:

```swift
func showUserInfo() {
  guard let authStateManager = authStateManager else {
    showError(title: "Unable to Show User Info",
              message: "No Okta client found.")

    return
  }

  authStateManager.getUser() { response, error in
    if let error = error {
      showError(title: "Unable to Read User Info", error: error)
      return
    }

    if response != nil {
      let sortedResponse = response!.sorted { return $0.key < $1.key }
      var userInfoText = ""
      sortedResponse.forEach { userInfoText += ("\($0): \($1) \n") }
      infoText = userInfoText
    }
  }
}
```

The call to `getUser` takes a completion handler as it interacts with your Okta org server. Your production app may present a busy cursor and status while it waits for the callback. The completion handler then shows an error if appropriate or sorts the user info keys before displaying the raw data.