Getting the authorization token takes two-steps. First, request an access token after the sign-in flow is successful. Then receive that token from the server. The access token is represented by a `Token` object from the `AuthFoundation` library that is a dependency for the Swift IDX SDK. You can store the token securely in the Keychain using Credential, another class from the `AuthFoundation` library.

This example shows part of the implementation of the `InteractionCodeFlowDelegate` protocol functions that are called as part of getting the authorization token.


```swift

import OktaIdx
import AuthFoundation

class SignInController: InteractionCodeFlowDelegate, ObservableObject {

//   ...

   // Set to true after the user has signed in successfully.
   @MainActor @Published var successfulSignIn: Bool = false

   // Delegate function called for each sign-in step.
   func authentication<Flow>(flow: Flow, received response: Response) where Flow : InteractionCodeFlow {
      // If a sign-in is successful then request a token from the server.
      if response.isLoginSuccessful {
         Task {
            do {
               let _ = try await response.exchangeCode()
            } catch {
               DispatchQueue.main.async {
                  self.currentError = error
               }
            }
         }
      } else {
//      ...
      }
   }

   // Delegate function called when a token is successfully exchanged.
   func authentication<Flow>(flow: Flow, received token: Token)
   {
      // Setting the default credential also stores the token
      Credential.default = Credential(token: token)
      //
      DispatchQueue.main.async {
         self.successfulSignIn = true
      }
   }

//   ...
}
```


