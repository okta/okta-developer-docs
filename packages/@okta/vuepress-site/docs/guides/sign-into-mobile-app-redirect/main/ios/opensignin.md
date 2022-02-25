Update the `signIn` function of `ContentView.swift` to sign the user in:

```swift
func signIn() {
  guard let rootViewController = UIApplication.shared.rootViewController else {
    showError(title: "Unable to Sign In",
    message: "An unkown error occured. Try restarting the app.")
    return
  }

  authSession?.signInWithBrowser(from: rootViewController) { authStateManager, error in

    if let error = error {
      showError(title: "Unable to Sign In",
      error: error)
      return
    }

    self.authStateManager = authStateManager
    authStateManager?.writeToSecureStorage()
    updateStatus("Signed In.", infoText: "", signedInStatus: true)
  }
}
```

After checking for a valid root view controller, the app hands the sign-in flow to the Okta SDK that then presents the sign-in web view. After the user signs in or cancels, the completion handler updates the app state by calling `updateStatus`. That function updates the user interface by setting the `signedIn` state variable.
