### Sample application and SDK integration overview

Similar to the Okta APIs, the SDK uses a generic interface to handle each step of the user sign-in flow. This interface enables apps to use a dynamic model when responding to policy changes within Okta. This dynamic model is purely policy-driven, accepting new functionality without updating your app's code. This feature is important for mobile devices where launching app updates is a complex process. See how the [sample application](/docs/guides/oie-embedded-common-run-samples/ios/main/) uses the SDK to implement this dynamic policy-driven behavior.

### Integrate the SDK with the sample code in this guide

In contrast to the sample app, the [sample code](https://github.com/okta/okta-idx-swift/tree/master/Samples/Signin%20Samples) provided in this step-by-step guide wraps the SDK with a more prescriptive and explicit interface built to help understand how to use the SDK. It's recommended that you implement similar code that uses the dynamic approach implemented in the sample app.

The following content breaks down the process of integrating the sample code into your app. The sample code converts the SDK's generic remediation interface into explicit authentication steps and automatically executes steps, such as the code-to-token exchange. 

The following diagram illustrates this call flow from your app's UI to the sample code, SDK, and API.

<div class="full">

 ![Diagram showing the integration flow of the sample app and Swift SDK](/img/oie-embedded-sdk/oie-embedded-sdk-swift-sample-code-overview.png)

</div>

> **Note:** The integrating code component represents the code that you write to call the sample code's interface.

### Launch the app and initialize the SDK

Initialize the SDK when the user opens your app by creating an instance of `BasicLogin` and passing a `configuration` object into its initializer.

 ```swift
self.authHandler = BasicLogin(configuration: configuration)
```

See [SDK](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#sdk) in [Download and set up the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/ios/main) for more information on how to set the configuration parameters, 

### The user initiates the sign-in flow

When the user submits their login credentials, call the `login` method, passing in the username, password, and `completion` closure. This closure is invoked after the sign-in process completes and returns either a fatal error or a success status with a token.

```swift
 self.authHandler.login(username: "user@example.com",
                       password: "secretPassword")
{ result in
    switch result {
    case .success(let token):
        print(token)
    case .failure(let error):
        print(error)
    }
}
```

### Send the user to the home page after a successful sign-in flow

As a final step, send the user to the default home page after a successful sign-in. Optionally, you can obtain basic user information after the successful sign-in by making a request to the Okta OpenID Connect authorization server. See [Get the user profile information](#get-the-user-profile-information) for more information on making a request.

### Sample code

The following sample code demonstrates the user sign-in flow and is also located in the [okta-idx-swift repository](https://github.com/okta/okta-idx-swift/blob/master/Samples/Signin%20Samples/BasicLogin.swift).

```swift
public class BasicLogin {
    let configuration: IDXClient.Configuration
    var username: String?
    var password: String?

    var client: IDXClient?
    var completion: ((Result<IDXClient.Token, LoginError>) -> Void)?

    public init(configuration: IDXClient.Configuration) {
        self.configuration = configuration
    }

    // Public method that initiates the login flow.
    public func login(username: String, password: String, completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void) {
        self.username = username
        self.password = password
        self.completion = completion

        // Initiates the creation of an IDX client.
        IDXClient.start(with: configuration) { (client, error) in
            guard let client = client else {
                self.finish(with: error)
                return
            }

            self.client = client

            // Assign ourselves as the delegate receiver, to be notified
            // when responses or errors are returned.
            client.delegate = self

            // Calls the IDX API to receive the first IDX response.
            client.resume(completion: nil)
        }
    }

    public enum LoginError: Error {
        case error(_ error: Error)
        case message(_ string: String)
        case cannotProceed
        case unexpectedAuthenticator
        case unknown
    }
}

/// Implementation details of performing basic username/password authentication.
extension BasicLogin: IDXClientDelegate {
    // Delegate method sent when an error occurs.
    public func idx(client: IDXClient, didReceive error: Error) {
        finish(with: error)
    }

    // Delegate method sent when a token is successfully exchanged.
    public func idx(client: IDXClient, didReceive token: IDXClient.Token) {
        finish(with: token)
    }

    // Delegate method invoked whenever an IDX response is received, regardless
    // of what action or remediation is called.
    public func idx(client: IDXClient, didReceive response: IDXClient.Response) {
        // If a response is successful, immediately exchange it for a token.
        guard !response.isLoginSuccessful else {
            response.exchangeCode(completion: nil)
            return
        }

        // If no remediations are present, abort the login process.
        guard let remediation = response.remediations.first else {
            finish(with: .cannotProceed)
            return
        }

        // If any error messages are returned, report them and abort the process.
        if let message = response.messages.allMessages.first {
            finish(with: .message(message.message))
            return
        }

        // Handle the various remediation choices the client may be presented with within this policy.
        switch remediation.type {
        case .identify:
            remediation.identifier?.value = username
            remediation.credentials?.passcode?.value = password
            remediation.proceed(completion: nil)

        // In identify-first policies, the password is supplied on a separate response.
        case .challengeAuthenticator:
            guard remediation.authenticators.first?.type == .password else {
                finish(with: .unexpectedAuthenticator)
                return
            }

            remediation.credentials?.passcode?.value = password
            remediation.proceed(completion: nil)

        default:
            finish(with: .cannotProceed)
        }
    }
}

// Utility functions to help return responses to the caller.
extension BasicLogin {
    func finish(with error: Error?) {
        if let error = error {
            finish(with: .error(error))
        } else {
            finish(with: .unknown)
        }
    }

    func finish(with error: LoginError) {
        completion?(.failure(error))
        completion = nil
    }

    func finish(with token: IDXClient.Token) {
        completion?(.success(token))
        completion = nil
    }
}
```
