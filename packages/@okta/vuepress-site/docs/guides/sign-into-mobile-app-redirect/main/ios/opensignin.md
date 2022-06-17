Sign the user in by updating the `signIn` function of `ContentView.swift`:

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
         // Handle errors
         showError(title: "Unable to Sign In", error: error)
      }
   }
}
```

The app hands the sign-in flow to the Okta SDK that then presents the sign-in web view and waits for a result. If the sign-in is succesful, the app first stores the token and then updates the user interface by setting the `signedIn` state variable to `true`.

The stored token is used to check if the user is already signed in when the app is launched, and for use in API calls to the Okta org and authorization servers.

When you sign out the user make sure you remove the credential that was stored when the user signed in. Replace the `signOut` function with the following code:

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
         // Handle errors
         showError(title: "Unable to Sign Out", error: error)
      }
      busy = false
   }
}
```
