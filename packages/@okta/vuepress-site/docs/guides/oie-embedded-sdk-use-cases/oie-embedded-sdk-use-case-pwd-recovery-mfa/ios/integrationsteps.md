## Integration steps

### Summary

There are many different ways to integrate the Swift SDK into your app. Using
the sample code as a wrapper around the SDK, this guide describes the [steps](#steps)
involved in integrating this use case into your application. Feel free to modify
the sample code to fit your individual needs. The diagram below illustrates
how the sample code and SDK fit into the overall integration.

<div class="common-image-format">

 ![Diagram showing the integration flow of the sample app and Swift SDK](/img/oie-embedded-sdk/oie-embedded-sdk-swift-sample-code-overview.png
 "Swift sample and sdk diagram")

</div>

### Steps

#### Step 1: Initialize MultifactorLogin

The first step is to initialize `MultifactorLogin` and pass in a
`configuration` object and `stephandler` function or code block.
This `stephandler` allows you to interact with the authentication flow
and gives you the ability to prompt the user to select and verify the
email authenticator during the password recovery process.

 ```swift
self.authHandler = MultifactorLogin(configuration: configuration)
{ step in
    switch step {
    case .chooseFactor(let factors):
        // Use this to prompt the user for the factor you'd like to authenticate with.
        if factors.contains(.email) {
            self.authHandler?.select(factor: .email)
        }
    case .verifyCode(factor: let factor):
        // Prompt the user for the verification code; when they supply it, call the `verify` function.
        if factor == .email {
            self.authHandler?.verify(code: "123456")
        }
    }
    case .chooseMethod(let methods):
        // Use this to prompt the user for the method you'd like to authenticate with.
        if methods.contains(.sms) {
            self.authHandler?.select(factor: .phone,
                                     method: .sms,
                                     phoneNumber: "+15551234567")
        }
     }
}
```

For more information on how to set the `configuration` parameter, see
[SDK](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#sdk)
in
[Download and set up the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/ios/main)


#### Step 2: Call the resetPassword method

The next step is to call the `resetPassword` method passing
in the username and password. The method can take a completion handler which
will be invoked once, either with a fatal error, or success
with a token.

```swift
self.authHandler.resetPassword(username: "user@example.com")
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

Optionally, you can obtain basic user information after a successful password recovery by
making a request to Okta's Open ID Connect authorization server. See
[Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/ios/main/#get-user-profile-information-after-sign-in).

## Sample code

```swift
public class MultifactorLogin {
    let configuration: IDXClient.Configuration
    var username: String?
    var password: String?
    let stepHandler: ((Step) -> Void)?
    var profile: [ProfileField: String]?

    var client: IDXClient?
    var response: IDXClient.Response?
    var completion: ((Result<IDXClient.Token, LoginError>) -> Void)?

    public init(configuration: IDXClient.Configuration, stepHandler: ((Step) -> Void)? = nil) {
        self.configuration = configuration
        self.stepHandler = stepHandler
    }

    func start() {
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

    public func login(username: String, password: String, completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void) {
        self.username = username
        self.password = password
        self.completion = completion

        start()
    }

    public func register(username: String, password: String, profile: [ProfileField: String], completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void) {
        self.username = username
        self.password = password
        self.profile = profile
        self.completion = completion

        start()
    }

    public func resetPassword(username: String, completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void) {
        self.username = username
        self.completion = completion

        start()
    }

    public func select(factor: IDXClient.Authenticator.Kind?) {
        guard let remediation = response?.remediations[.selectAuthenticatorAuthenticate] ?? response?.remediations[.selectAuthenticatorEnroll],
              let authenticatorsField = remediation["authenticator"]
        else {
            finish(with: .cannotProceed)
            return
        }

        if let factor = factor {
            let factorField = authenticatorsField.options?.first(where: { field in
                field.authenticator?.type == factor
            })
            authenticatorsField.selectedOption = factorField
            remediation.proceed(completion: nil)
        } else if let skipRemediation = response?.remediations[.skip] {
            skipRemediation.proceed(completion: nil)
        } else {
            finish(with: .cannotProceed)
            return
        }
    }

    public func select(factor: IDXClient.Authenticator.Kind,
                       method: IDXClient.Authenticator.Method,
                       phoneNumber: String? = nil)
    {
        guard let remediation = response?.remediations[.selectAuthenticatorAuthenticate] ?? response?.remediations[.selectAuthenticatorEnroll],
              let authenticatorsField = remediation["authenticator"],
              let factorField = authenticatorsField.options?.first(where: { field in
                field.authenticator?.type == factor
              }),
              let methodOption = factorField["methodType"]?.options?.first(where: { field in
                field.value as? String == method.stringValue
              })
        else {
            finish(with: .cannotProceed)
            return
        }

        authenticatorsField.selectedOption = methodOption
        factorField["phoneNumber"]?.value = phoneNumber

        remediation.proceed(completion: nil)
    }

    public func verify(code: String) {
        guard let remediation = response?.remediations[.challengeAuthenticator] ?? response?.remediations[.enrollAuthenticator]
        else {
            finish(with: .cannotProceed)
            return
        }

        remediation.credentials?.passcode?.value = code
        remediation.proceed(completion: nil)
    }

    public enum Step {
        case chooseFactor(_ factors: [IDXClient.Authenticator.Kind])
        case chooseMethod(_ methods: [IDXClient.Authenticator.Method])
        case verifyCode(factor: IDXClient.Authenticator.Kind)
    }

    public enum ProfileField: String {
        case firstName, lastName
    }

    public enum LoginError: Error {
        case error(_ error: Error)
        case message(_ string: String)
        case cannotProceed
        case unexpectedAuthenticator
        case noStepHandler
        case unknown
    }
}

extension MultifactorLogin: IDXClientDelegate {
    public func idx(client: IDXClient, didReceive error: Error) {
        finish(with: error)
    }

    public func idx(client: IDXClient, didReceive token: IDXClient.Token) {
        finish(with: token)
    }

    public func idx(client: IDXClient, didReceive response: IDXClient.Response) {
        self.response = response

        // If a response is successful, immediately exchange it for a token.
        guard !response.isLoginSuccessful else {
            response.exchangeCode(completion: nil)
            return
        }

        // If we can select enroll profile, immediately proceed to that.
        if let remediation = response.remediations[.selectEnrollProfile],
           profile != nil
        {
            remediation.proceed(completion: nil)
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

        // If we have no password, we assume we're performing an account recovery.
        if password == nil,
           (remediation.type == .identify || remediation.type == .challengeAuthenticator),
           let passwordAuthenticator = response.authenticators.current as? IDXClient.Authenticator.Password
        {
            passwordAuthenticator.recover(completion: nil)
            return
        }

        // Handle the various remediation choices the client may be presented with within this policy.
        switch remediation.type {
        case .identify: fallthrough
        case .identifyRecovery:
            remediation.identifier?.value = username
            remediation.credentials?.passcode?.value = password
            remediation.proceed(completion: nil)

        // The challenge authenticator remediation is used to request a passcode of some sort from the user, either the user's password, or an authenticator verification code.
        case .enrollAuthenticator: fallthrough
        case .challengeAuthenticator:
            guard let authenticator = remediation.authenticators.first else {
                finish(with: .unexpectedAuthenticator)
                return
            }

            switch authenticator.type {
            // We may be requested to supply a password on a separate remediation step, for example if the user can authenticate using a factor other than password. In this case, if we have a password, we can immediately supply it.
            case .password:
                if let password = password {
                    remediation.credentials?.passcode?.value = password
                    remediation.proceed(completion: nil)
                } else {
                    fallthrough
                }

            default:
                guard let stepHandler = stepHandler else {
                    finish(with: .noStepHandler)
                    return
                }

                stepHandler(.verifyCode(factor: authenticator.type))
            }

        case .selectAuthenticatorEnroll: fallthrough
        case .selectAuthenticatorAuthenticate:
            let factors: [IDXClient.Authenticator.Kind]
            factors = remediation["authenticator"]?
                .options?.compactMap({ field in
                    field.authenticator?.type
                }) ?? []

            // If a password is supplied, immediately select the password factor if it's given as a choice.
            if factors.contains(.password) && password != nil {
                select(factor: .password)
            } else {
                guard let stepHandler = stepHandler else {
                    finish(with: .noStepHandler)
                    return
                }

                stepHandler(.chooseFactor(factors))
            }

        case .authenticatorEnrollmentData: fallthrough
        case .authenticatorVerificationData:
            guard let stepHandler = stepHandler else {
                finish(with: .noStepHandler)
                return
            }

            let methods: [IDXClient.Authenticator.Method]
            methods = remediation.authenticators.flatMap({ authenticator in
                authenticator.methods ?? []
            })

            stepHandler(.chooseMethod(methods))

        case .enrollProfile:
            remediation["userProfile.firstName"]?.value = profile?[.firstName]
            remediation["userProfile.lastName"]?.value = profile?[.lastName]
            remediation["userProfile.email"]?.value = username
            remediation.proceed(completion: nil)

        default:
            finish(with: .cannotProceed)
        }
    }
}

// Utility functions to help return responses to the caller.
extension MultifactorLogin {
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
