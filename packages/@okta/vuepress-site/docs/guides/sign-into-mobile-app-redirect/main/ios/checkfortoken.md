When you check for an existing session, it may take two steps:

- Check for an existing valid token.
- Refresh the token if it has expired.

The `Credential` class manages the tokens for a user. The `signIn()` function you wrote in [Open the sign-in page](#open-the-sign-in-page) calls `store(_:)` to save the user's credentials. A session exists if there's a default credential. Although there are calls to check if a credential has expired and to request a refresh, this code uses `refreshIfNeeded()` that only tries to refresh the token if it's expired.

Add an `.onAppear` modifier to the main content view that checks for an existing session:

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
                  // The token is valid, update the app state.
                  isSignedIn = true
               }
               catch {
                  // The user wasn't signed in or the token couldn't be refreshed.
                  // No action is required.
               }
               // The token is invalid, hide the activity indicator.
               busy = false
            }
         } else {
            // There is no existing session, hide the activity indicator.
            busy = false
         }
      }
   }
   ...
```
