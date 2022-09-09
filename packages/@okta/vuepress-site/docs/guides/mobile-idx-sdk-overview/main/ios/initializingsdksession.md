This example shows parts of a singleton class for managing the sign-in flow. It assumes that the configuration information is in a property list file called  `Okta.plist`.

```swift
import OktaIdx
import AuthFoundation

class SignInController {
   var flowClient: InteractionCodeFlow?
   var username: String?

   // Return the singleton controller, creating the instance on the first call.
   static let shared: SignInController? = {
      let instance = SignInController()

      return instance
   }()


   ...

   // Start the sign-in flow by entering a username and password
   public func signIn(username: String,
                      password: String,
                      completion: @escaping (Result<SuccessResultType, LoginError>) -> Void) {
      self.username =  username
      // A completion handler is one way to separate the manager from the view model.
      self.completion = completion

      // Initalize the SDK client if needed.
      if flowClient == nil {
         do {
             try flowClient = InteractionCodeFlow()
         } catch {
             // An error occured inializating the SDK. Handle the error.
         }
      }

      // Set this controller as the delegate that's notified
      // when responses or errors for the flow are returned.
      flowClient?.add(delegate: self)

      // Request the initial step in the flow
      flowClient?.start() { result in
         switch result {
            case .success(let response):
               self.currentResponse = response
               // Handle the current response.
            case .failure(let error):
               // An error occured. Handle the error.
         }
      }
   }
...
}
```
