This example shows part of the implementation of the `InteractionCodeFlowDelegate` protocol functions called by the SDK for different parts of the sign-in flow and for errors.

The example publishes important state variables, such as the current response. A controller or SwiftUI view can subscribe to changes and update the UI. One advantage of this model is that you can reuse your sign-in controller in other apps.

```swift

import OktaIdx
import AuthFoundation

class SignInController: InteractionCodeFlowDelegate, ObservableObject {
   static let shared = SignInController()

   // Published properties for the main state information of the flow
   @MainActor @Published var currentResponse: Response? = nil
   @MainActor @Published var currentRemediation: Remediation? = nil
   @MainActor @Published var currentMessage: Response.Message? = nil
   @MainActor @Published var currentError: Error? = nil

   // Set to true after the user has signed in successfully.
   @MainActor @Published var successfulSignIn: Bool = false

   private var flow: InteractionCodeFlow?

   private init() { }

//   ...

   // Delegate function called for each sign-in step.
   func authentication<Flow>(flow: Flow, received response: Response)
                            where Flow : InteractionCodeFlow {
      // Request a token from the server if the sign-in attempt is successful.
      if response.isLoginSuccessful {
         // Handle retrieving the access token.
      } else {
         DispatchQueue.main.async {
            // Publish the new response for any listeners
            self.currentResponse = response

            // Check for messages, such as entering an incorrect code.
            if let message = response.messages.allMessages.first {
               // Publish the message for listners to update state,
               // such as showing a message in the UI.
               self.currentMessage = message
               return
            }


            // If no remediations are present, abort the login process.
            guard let remediation = self.currentResponse?.remediations.first else {
               return
            }
            // Publish the new remediation.
            self.currentRemediation = remediation
         }
      }
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
   func authentication<Flow>(flow: Flow, received error: InteractionCodeFlowError)
                            where Flow : InteractionCodeFlow {
      // Publish the error from the main thread.
      DispatchQueue.main.async {
         self.currentError = error
      }
   }

   func authentication<Flow>(flow: Flow, received error: OAuth2Error) {
      // Publish the error from the main thread.
      DispatchQueue.main.async {
         self.currentError = error
      }
   }
}

```
