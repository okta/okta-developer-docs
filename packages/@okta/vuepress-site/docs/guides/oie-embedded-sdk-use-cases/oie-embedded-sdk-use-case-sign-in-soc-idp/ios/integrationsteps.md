## Integration steps

### Summary

The following steps document how to use the sample code to integrate the
SDK with your app.

<div class="common-image-format">

 ![Diagram showing the integration flow of the sample app and Swift SDK](/img/oie-embedded-sdk/oie-embedded-sdk-swift-sample-code-overview.png)

</div>

### Steps

#### Step 1: Initiate user sign in

#### Step 1: Launch app and initialize SDK

The first step is to initialize the SDK when the user opens your app.
This is done by creating an instance of `SocialLogin` and passing
into it's initializer a`configuration` object.

 ```swift
self.authHandler = SocialLogin(configuration: configuration)
```

For more information on how to set the `configuration` parameter, see
[SDK](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#sdk)
in
[Download and set up the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/ios/main)


#### Step 2: User initiates sign in

When the user initiates a social login within your app, the next step
is to call the `login()` method passing in the `facebook` service type
and `completion` closure. This closure is invoked once when the sign in completes
and returns either a fatal error or success with a token.

```swift
self.authHandler?.login(service: .facebook)
 { result in
     switch result {
     case .success(let token):
         print(token)
     case .failure(let error):
         print(error)
     }
}
```

#### Step 3: Send user to home screen after successful sign in

The final integration step is to send the user to the default home page
after success. Optionally, you can obtain basic user information after a
successful sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/ios/main/#get-user-profile-information-after-sign-in).

## Sample code

The following sample code is also located in Okta's
[okta-idx-swift repository](https://github.com/okta/okta-idx-swift/blob/master/Samples/Signin%20Samples/BasicLogin.swift).

```swift
import AuthenticationServices

public class SocialLogin {
    private let configuration: IDXClient.Configuration
    private weak var presentationContext: ASWebAuthenticationPresentationContextProviding?
    private var webAuthSession: ASWebAuthenticationSession?

    private var client: IDXClient?
    private var completion: ((Result<IDXClient.Token, LoginError>) -> Void)?

    public init(configuration: IDXClient.Configuration) {
        self.configuration = configuration
    }

    // Public function used to initiate login using a given Social Authentication service. Optionally,
    // a presentation context can be supplied when presenting the ASWebAuthenticationSession instance.
    public func login(service: IDXClient.Remediation.SocialAuth.Service,
                      from presentationContext: ASWebAuthenticationPresentationContextProviding? = nil,
                      completion: @escaping (Result<IDXClient.Token, LoginError>) -> Void)
    {
        self.presentationContext = presentationContext
        self.completion = completion

        // Initializes a new IDXClient with the supplied configuration.
        IDXClient.start(with: configuration) { (client, error) in
            guard let client = client else {
                self.finish(with: error)
                return
            }

            self.client = client

            // Performs the first request to IDX to retrieve the first response.
            client.resume { (response, error) in
                guard let response = response else {
                    self.finish(with: error)
                    return
                }

                // Find the Social IDP remediation that matches the requested social auth service.
                guard let remediation = response.remediations.first(where: { remediation in
                    let socialRemediation = remediation as? IDXClient.Remediation.SocialAuth
                    return socialRemediation?.service == service
                }) as? IDXClient.Remediation.SocialAuth
                else {
                    self.finish(with: .cannotProceed)
                    return
                }

                // Switch to the main queue to initiate the AuthenticationServices workflow.
                DispatchQueue.main.async {
                    self.login(with: remediation)
                }
            }
        }
    }

    func login(with remediation: IDXClient.Remediation.SocialAuth) {
        // Retrieve the Redirect URL scheme from our configuration, to
        // supply it to the ASWebAuthenticationSession instance.
        guard let client = client,
              let scheme = URL(string: client.context.configuration.redirectUri)?.scheme
        else {
            finish(with: .cannotProceed)
            return
        }

        // Create an ASWebAuthenticationSession to trigger the IDP OAuth2 flow.
        let session = ASWebAuthenticationSession(url: remediation.redirectUrl,
                                                 callbackURLScheme: scheme)
        { [weak self] (callbackURL, error) in
            // Ensure no error occurred, and that the callback URL is valid.
            guard error == nil,
                  let callbackURL = callbackURL,
                  let client = self?.client
            else {
                self?.finish(with: error)
                return
            }

            // Ask the IDXClient for what the result of the social login was.
            let result = client.redirectResult(for: callbackURL)

            switch result {
            case .authenticated:
                // When the social login result is `authenticated`, use the
                // IDXClient to exchange the callback URL returned from
                // ASWebAuthenticationSession with an Okta token.
                client.exchangeCode(redirect: callbackURL) { (token, error) in
                    guard let token = token else {
                        self?.finish(with: error)
                        return
                    }
                    self?.finish(with: token)
                }

            default:
                self?.finish(with: .cannotProceed)
            }
        }

        // Start and present the web authentication session.
        session.presentationContextProvider = presentationContext
        session.prefersEphemeralWebBrowserSession = true
        session.start()

        self.webAuthSession = session
    }

    public enum LoginError: Error {
        case error(_ error: Error)
        case message(_ string: String)
        case cannotProceed
        case unknown
    }
}

// Utility functions to help return responses to the caller.
extension SocialLogin {
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
