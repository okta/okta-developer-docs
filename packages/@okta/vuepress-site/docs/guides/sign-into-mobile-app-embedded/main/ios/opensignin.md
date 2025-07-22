Update the `signIn()` function of `ContentView.swift` with the code to sign in the user:

```swift
func signIn() {
   Task {
      do {
         if let token = try await WebAuthentication.shared?.signIn(from: nil)
         {
            try Credential.store(token)
            updateStatus("Signed in", infoText: "", signedInStatus: true)
         }
      } catch {
         // Handle sign-in and token storage errors.
         showError(title: "Unable to Sign In", error: error)
      }
   }
}
```

The app hands the sign-in flow to the Okta SDK. The SDK presents the sign-in web view and waits for a result. If the sign-in flow is successful, the app first stores the token using `Credential.store(_:)`, and then updates the user interface by setting the `signedIn` state variable to `true`.

The stored token is used for the following:

* To check if the user is already signed in when the app is launched.
* For API calls to the Okta org and authorization servers.

Remove the stored credential when the user signs out. Replace the `signOut()` function with the following code:

```swift
func signOut() {
   Task {
      do {
         // Show the activity indicator and block UI input.
         busy = true
         try await WebAuthentication.shared?.signOut(from: nil)
         // Remove the stored credential.
         try Credential.default?.remove()
         updateStatus("Signed out", infoText: "", signedInStatus: false)
      }
      catch {
         // Handle sign-out and token removal errors.
         showError(title: "Unable to Sign Out", error: error)
      }
      busy = false
   }
}
```
