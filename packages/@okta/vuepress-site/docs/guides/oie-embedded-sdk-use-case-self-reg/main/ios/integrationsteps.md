The following steps document how to integrate the sample code into your app. The sample code wraps the SDK's functionality using a more prescriptive and explicit interface. It converts the SDK's generic remediation interface into explicit authentication steps and automatically executes steps such as the code-to-token exchange. The following diagram illustrates this call flow from your app's UI to the sample code, SDK, and API. The Integrating code component in the diagram represents the code you need to write to call the sample code's interface.

<div class="full">

 ![Displays the integration flow of the sample app and Swift SDK](/img/oie-embedded-sdk/oie-embedded-sdk-swift-sample-code-overview.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4590-39096&mode=design&t=aNZwypVsE0zfHlUi-11  oie-embedded-sdk-swift-sample-code-overview

 -->

</div>

### 1: Launch the app and initialize the SDK

The first step is to initialize the SDK when the user opens your app. This is done by creating an instance of `MultifactorLogin` and passing into its initializer a `configuration` object and `stephandler` closure. The `stephandler` closure is called whenever an app interaction is requested during the password recovery flow. In this case, the `stephandler` closure is called for the following user interactions:

1. Choose the email factor for authentication.
1. Verify the email verification code.
1. Choose the phone factor method (for example: SMS). Note that this step won't be called if the user skips the phone factor.

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

See [SDK](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#sdk) in [Download and set up the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/ios/main) for more information on how to set the `configuration` parameter.

### 2: The user initiates the sign-up

When the user enters their username and password and initiates the new user registration flow, call the `register` method, passing in the username, password, and `completion` closure. This closure is invoked once when the sign-up completes and returns either a fatal error or success with a token.

```swift
self.authHandler.register(username: "user@example.com",
                          password: "secretPassword",
                          profile: [
                              .firstName: "Jane",
                              .lastName: "Doe"
                          ])
{ result in
    switch result {
    case .success(let token):
        print(token)
    case .failure(let error):
        print(error)
    }
}
```

### 3: Send the user to the home page after a successful sign-in flow

The final integration step is to send the user to the default home page after the user successfully signs in. Optionally, you can obtain basic user information after a user successfully signs in by making a request to Okta's OpenID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/ios/main/#get-the-user-profile-information).

### Sample code

The following sample code is also located in Okta's [okta-idx-swift repository](https://github.com/okta/okta-idx-swift/blob/master/Samples/Signin%20Samples/BasicLogin.swift).

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

    // Internal convenience method used to initialize an IDXClient.
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

    // Public function used to initiate login using a username and password.
    public func login(username: String, password: String, completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void) {
        self.username = username
        self.password = password
        self.completion = completion

        start()
    }

    // Public function used to initiate self-service user registration.
    public func register(username: String, password: String, profile: [ProfileField: String], completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void) {
        self.username = username
        self.password = password
        self.profile = profile
        self.completion = completion

        start()
    }

    // Public function to initiate a password reset for an existing user.
    public func resetPassword(username: String, completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void) {
        self.username = username
        self.completion = completion

        start()
    }

    // Method called by you to select an authenticator. This can be used in
    // response to a `Step.chooseFactor` stepHandler call.
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

    // Method called by you to select an authentication factor method. This
    // can be used in response to a `Step.chooseMethod` stepHandler call.
    //
    // Typically this is used to select either SMS or Voice when using a Phone factor.
    // When enrolling in a new factor, the phone number should be supplied with
    // the format: `+15551234567`. (e.g. + followed by the country-code and phone number).
    public func select(factor: IDXClient.Authenticator.Kind,
                       method: IDXClient.Authenticator.Method,
                       phoneNumber: String? = nil)
    {
        // Retrieve the appropriate remedation, authentication factor field and method, to
        // select the appropriate method type.
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

    // Method used to verify a factor. When a factor is selected, the user will
    // receive a verification code. Once they receive it, you will use this method
    // to supply it back to Okta.
    public func verify(code: String) {
        guard let remediation = response?.remediations[.challengeAuthenticator] ?? response?.remediations[.enrollAuthenticator]
        else {
            finish(with: .cannotProceed)
            return
        }

        remediation.credentials?.passcode?.value = code
        remediation.proceed(completion: nil)
    }

    // Enumeration representing the different actionable steps that the
    // `stepHandler` can receive. You can use these values to determine
    // what UI to present to the user to select factors, authenticator methods,
    // and to verify authenticator verification codes.
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

        // The challenge authenticator remediation is used to request a passcode
        // of some sort from the user, either the user's password, or an
        // authenticator verification code.
        case .enrollAuthenticator: fallthrough
        case .challengeAuthenticator:
            guard let authenticator = remediation.authenticators.first else {
                finish(with: .unexpectedAuthenticator)
                return
            }

            switch authenticator.type {
            // We may be requested to supply a password on a separate remediation
            // step, for example if the user can authenticate using a factor other
            // than password. In this case, if we have a password, we can immediately
            // supply it.
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
            // Find the factor types available to the user at this time.
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

            // Find the methods available to the user.
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
