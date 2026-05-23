The code snippet below uses the `Credential` object of the `AuthFoundation` library to revoke the tokens for the current user. You can use other features of `Credential` to revoke the tokens of a specific user.

```swift

import OktaIdx
import AuthFoundation

class SignInController: InteractionCodeFlowDelegate, ObservableObject {
//   ...

   // Sign out the current user.
   public func signOut() throws {
      try await Credential.default?.revoke()
   }
}

```

