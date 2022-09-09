Getting the authorization token takes two-steps. First, request a the token after the sign-in is successful. Then receive that token from the server. The access token is represented by a `Token` object from the `AuthFoundation` library that is a dependency for the Swift IDX SDK. You can store the token securely in the Keychain using Credential, another class from the `AuthFoundation` library.

This example shows part of the implementation of the `InteractionCodeFlowDelegate` protocol functions that are called as part of getting the authorization token.


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
         response.exchangeCode()
         return
      }
      ...
   }

   // Delegate function called when a token is successfully exchanged.
   func authentication<Flow>(flow: Flow, received token: Token) {
      // Store the token in the keychain.
      do {
         try Credential.store(token,
                              tags: ["displayName": "My User"],
                              security: [
                                  .accessibility(.afterFirstUnlock),
                                  .accessControl(.biometryAny)
                              ])
      }
      catch {
          // Token not stored. Handle the error.
      }
   }

   ...
}
```


