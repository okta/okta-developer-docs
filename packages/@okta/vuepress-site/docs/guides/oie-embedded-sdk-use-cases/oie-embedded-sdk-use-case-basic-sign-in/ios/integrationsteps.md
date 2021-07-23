## Integration steps

### Summary

There are many different ways to integrate the Swift SDK into your app. The
sample code provided in this guide acts as a wrapper

 Using
the sample code as a wrapper around the SDK, this guide describes the steps
involved in integrating this use case into your application. Feel free to modify
the sample code to fit your individual needs. The diagram below illustrates
how the integration code you write calls into the sample code and SDK.

<div class="common-image-format">

 ![Diagram showing the integration flow of the sample app and Swift SDK](/img/oie-embedded-sdk/oie-embedded-sdk-swift-sample-code-overview.png)

</div>

### Steps

#### Step 1: Initiate user sign in

The first step is initialize the user sign in

The first step is to initialize `BasicLogin` and pass in a
`configuration` object.

 ```swift
self.authHandler = BasicLogin(configuration: configuration)
```

For more information on how to set the `configuration` parameter, see
[SDK](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#sdk)
in
[Download and set up the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/ios/main)


#### Step 2: Call the login method

The next step is to call the `login` method passing in the username
and password. The method can take a completion handler which
will be invoked once, either with a fatal error, or success
with a token.

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

    public func login(username: String, password: String, completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void) {
        self.username = username
        self.password = password
        self.completion = completion

        IDXClient.start(with: configuration) { (client, error) in
            guard let client = client else {
                self.finish(with: error)
                return
            }

            self.client = client
            client.delegate = self
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
    public func idx(client: IDXClient, didReceive error: Error) {
        finish(with: error)
    }

    public func idx(client: IDXClient, didReceive token: IDXClient.Token) {
        finish(with: token)
    }

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
