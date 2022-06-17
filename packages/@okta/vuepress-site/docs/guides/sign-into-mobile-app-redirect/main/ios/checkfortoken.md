To check for an existing session may take two steps:

1. Check for an existing valid token, one that hasn't expired.
1. Try and refresh the token if it has expired.

The `Credential` class manages the tokens for a user. The `signIn()` function you wrote earlier calls `store(_:)` to save the users' credentials. A session exists if there's a default credential. It's possible to check if a credential has expired and request a refresh, but it's easier to call `refreshIfNeeded()` which only tries to refresh the token if it's expired.

Add an .onAppear modifier to the main content view that checks for the session:

```swift
var body: some View {
   ZStack {
      ...
            ProgressView("Waiting")
         }
      }
      .onAppear() {
         busy = true
         // Check for an existing valid token.
         if let credential = Credential.default {
            Task {
               do {
                  // Make sure the token is valid.
                  try await credential.refreshIfNeeded()
                  isSignedIn = true
               }
               catch {
                  // The user wasn't signed in or the token couldn't be refreshed.
                  // No action is required.
               }
               // Hide the activity view.
               busy = false
            }
         }
      }
   }
   ...
```
