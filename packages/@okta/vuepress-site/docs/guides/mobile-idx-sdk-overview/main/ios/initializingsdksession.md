This example shows parts of a singleton class for handling the sign-in flow. It initializes the client using the configuration example shown earlier.

```swift
import OktaIdx

struct OktaPlistContent: Codable {
...
}

class SignInController {
    // Return the singleton controller, creating the instance on the first call.
    static let shared: SignInController? = {
        let instance = SignInController(configuration: nil,
                                        client: nil)

        return instance
    }()

    var configuration: IDXClient.Configuration?
    var client: IDXClient?

    ...


    // Create a client and request the first response.
    func initializeSDK() {
        guard let configuration = loadConfiguration() else {
            // Could not create a configuration. Handle the error.
            return
        }

        self.configuration = configuration

        IDXClient.start(with: configuration) { (client, error) in
            guard let client = client else {
                // Handle the error.
                return
            }

            self.client = client

            // Request the first response.
            client.resume()
        }
    }

    func loadConfiguration() -> IDXClient.Configuration? {
    ...
    }


```
