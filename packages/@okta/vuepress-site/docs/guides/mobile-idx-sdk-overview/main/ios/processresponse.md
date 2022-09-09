This example shows part of the implementation of the `InteractionCodeFlowDelegate` protocol functions called by the SDK for different parts of the sign-in flow and for errors.

```swift

import OktaIdx
import AuthFoundation

class SignInController: InteractionCodeFlowDelegate {
   ...

   var currentResponse: Response? = nil

   ...

   // Delegate function called for each sign-in step.
   func authentication<Flow>(flow: Flow, received response: Response) where Flow : InteractionCodeFlow {
      currentResponse = response

      // Request a token from the server if the sign-in attempt is successful.
      guard !response.isLoginSuccessful else {
         // Handle retrieving the access token.
         return
      }

      // If no remediations are present, abort the login process.
      guard let remediation = currentResponse?.remediations.first else {
         // Handle the error and finish the sign-in flow.
         return
      }

      // Check for messages, such as entering an incorrect code.
      if let message = response.messages.allMessages.first {
         // Handle the messages as appropriate.
         return
      }

      // Build the UI using the information in the remediations and authenticators.

      ...
   }

   // Delegate function called when a token is successfully exchanged.
   func authentication<Flow>(flow: Flow, received token: Token) {
      // Securely store the token for the user.
   }

   // Delegate function called before the first sign-in step.
    func authenticationStarted<Flow>(flow: Flow) {
      // Do any initialization required by your app.
   }

   // Delegate function called after the sign-in flow is complete.
   func authenticationFinished<Flow>(flow: Flow) {
      // Do any cleanup required by your app and update the UI as appropriate.
   }

   // Delegate functions called when errors occur
   func authentication<Flow>(flow: Flow, received error: InteractionCodeFlowError) where Flow : InteractionCodeFlow {
      // Handle the error.
   }

   func authentication<Flow>(flow: Flow, received error: OAuth2Error) {
      // Handle the error.
   }

...
}

```
