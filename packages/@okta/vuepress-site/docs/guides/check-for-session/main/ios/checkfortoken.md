The Credential class manages the tokens for a user, and a session exists if there's a default credential. Although there are calls to check if a credential is expired and to request a refresh, this code uses `refreshIfNeeded()` that only tries to refresh the token if it's expired.

Check for an existing session by adding an `.onAppear` modifier above the `.alert(isPresented:){}` modifier of the main content view:

```SWIFT
var body: some View {
   ZStack {
      ...
            ProgressView("Waiting")
         }
      }
      .onAppear() {
         // Show the activity indicator.
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
      .alert(isPresented:)
    ...
   ```
