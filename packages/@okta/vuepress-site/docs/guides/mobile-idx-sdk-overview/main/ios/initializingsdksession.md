This example shows parts of a singleton class for managing the sign-in flow. It assumes that the configuration information is in a property list file called  `Okta.plist`.

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

// ...

   @MainActor
   public func start() async throws {
      do {
         // Call the init method that loads the configuration information from Okta.plist.
         try flow = InteractionCodeFlow()
      } catch {
         // An error occured inializating the SDK. Handle the error.
         currentError = error
         return
      }

      // Receive calls when responses or errors are returned.
      flow!.add(delegate: self)

      do {
         // Request an initial response from the server.
         // Responses call the appropriate InteractionCodeFlowDelegate function.
         let response = try await flow!.start()
         currentResponse = response
      } catch {
         currentError = error
      }
   }

// ...
}
```

