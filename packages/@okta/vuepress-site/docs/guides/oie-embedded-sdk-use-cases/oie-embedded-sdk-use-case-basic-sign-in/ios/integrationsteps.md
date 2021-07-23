## Integration steps

### Summary

The following steps document how to use the sample code to integrate the
SDK with your app.

<div class="common-image-format">

 ![Diagram showing the integration flow of the sample app and Swift SDK](/img/oie-embedded-sdk/oie-embedded-sdk-swift-sample-code-overview.png)

</div>

### Steps

#### Step 1: Launch app and initialize SDK

The first step is to initialize the SDK when the user opens your app.
This is done by creating an instance of `BasicLogin` and passing into
it's initializer a`configuration` object.

 ```swift
self.authHandler = BasicLogin(configuration: configuration)
```

For more information on how to set the `configuration` parameter, see
[SDK](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#sdk)
in
[Download and set up the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/ios/main)

#### Step 2: User initiates sign in

When the user enters their credentials and initiates the sign in flow,
call the `login()` method, passing in the username, password,
and `completion` closure. This closure is invoked once when the sign in completes
and returns either a fatal error or success with a token.

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

#### Step 3: Get user profile information (optional)

Optionally, you can obtain basic user information after a successful sign-in by
making a request to Okta's Open ID Connect authorization server. See
[Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/ios/main/#get-user-profile-information-after-sign-in).

## Sample code

The following sample code is also located in Okta's
[okta-idx-swift repository](https://github.com/okta/okta-idx-swift/blob/master/Samples/Signin%20Samples/BasicLogin.swift).

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
