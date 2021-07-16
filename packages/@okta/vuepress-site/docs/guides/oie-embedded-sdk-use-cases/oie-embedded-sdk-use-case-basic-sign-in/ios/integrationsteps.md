## Sample code

The following sample code illustrates how to implement basic sign-in with username and password.

> **Note:** The Swift SDK and sample app are dynamic in nature and do not follow a
prescriptive and explicit flow used in these examples. These examples are meant to be a
learning tool to help you understand how to implement specific use cases using the SDK.
Although, you can implement such examples in your own native application, you won't
be able to reap the benefits of dynamic authentication such as a policy driven logic
that require no changes when policy configurations are changed.

### Executing code

The following example shows how to execute the basic login code described in
[Implementing code](#implementing-code). Note that the completion handler supplied
to the `login` function will be invoked once, either with a fatal error, or with
a token.

 ```swift
 self.authHandler = BasicLogin(configuration: configuration)
 self.authHandler?.login(username: "user@example.com",
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

### Implementing code

The following code implements the basic login functionality.

```swift
import Foundation
import OktaIdx

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
