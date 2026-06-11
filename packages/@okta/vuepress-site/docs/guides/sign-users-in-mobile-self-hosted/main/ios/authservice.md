#### Understand the AuthService architecture

The `AuthService` is the heart of the Okta authentication system. It serves as a centralized layer that manages the entire authentication lifecycle, from the initial sign-in flow to session maintenance. By encapsulating all authentication logic in a single service, Okta achieves several important goals:

**Separation of concerns**: The service isolates authentication logic from UI code, making it easier to both test and maintain. Your SwiftUI views don't need to know how direct authentication works, they simply call methods like `authenticate()` or `logout()`.

**State management**: The service maintains the current authentication state (idle, authenticating, authenticated, or error), allowing your UI to respond appropriately. This state-driven approach makes it easy to show loading indicators, error messages, or authenticated content.

**Security best practices**: All token handling and storage is managed through the service, ensuring that credentials are stored securely in the iOS keychain through [`AuthFoundation`](https://okta.github.io/okta-mobile-swift/development/documentation/authfoundation/). Your UI never directly touches sensitive data.

**Testability**: By defining a protocol (`AuthServicing`), you can easily create mock implementations for unit testing your views without making actual network calls to Okta.

The service handles five key responsibilities:

* **Authentication**: Validate user credentials with Okta.
* **Token storage**: Persist tokens securely in the keychain.
* **Session management**: Track whether a user is authenticated.
* **Token refresh**: Obtain new access tokens without re-authentication.
* **User profile retrieval**: Fetch user information from Okta.

Build this step by step, starting with the protocol that defines the service contract.

#### Create the service protocol

Create a folder named `Services` in your project, then add a file called `AuthService.swift`:

```swift
import Foundation
import AuthFoundation
import OktaDirectAuth
import Observation

protocol AuthServicing {
    var isAuthenticated: Bool { get }
    var currentToken: String? { get }
    var authenticationState: AuthService.AuthState { get }

    func authenticate(username: String, password: String) async throws
    func logout() async throws
    func refreshAccessToken() async throws
    func getCurrentUser() async throws -> UserInfo?
}
```

This protocol defines the contract for the Okta authentication service, making it easy to test and mock later.

#### Implement the AuthService

Below the protocol, add the implementation. Build this step by step, starting with the basic structure:

```swift
@Observable
final class AuthService: AuthServicing {

    // MARK: - Authentication States

    enum AuthState: Equatable {
        case notAuthenticated
        case authenticating
        case authenticated
        case error(String)
    }

    // MARK: - Properties

    private(set) var authenticationState: AuthState = .notAuthenticated

    private let directAuth: DirectAuthenticationFlow?

    var isAuthenticated: Bool {
        authenticationState == .authenticated
    }

    var currentToken: String? {
        Credential.default?.token.accessToken
    }

    // MARK: - Initialization

    init() {
        // Initialize DirectAuth with configuration from Okta.plist
        if let config = try? OAuth2Client.PropertyListConfiguration() {
            self.directAuth = try? DirectAuthenticationFlow(client: OAuth2Client(config))
        } else {
            self.directAuth = try? DirectAuthenticationFlow()
        }

        // Check for existing credential
        if Credential.default?.token != nil {
            authenticationState = .authenticated
        }
    }
}
```

This sets up the basic structure of our `AuthService`. The following code breaks down what each part does:

**Authentication states**

```swift
enum AuthState: Equatable {
    case notAuthenticated
    case authenticating
    case authenticated
    case error(String)
}
```

The `AuthState` enum represents all possible states of the authentication flow. Your UI observes this state and updates accordingly:

* `notAuthenticated`: User is signed out, show sign-in form
* `authenticating`: Sign-in attempt is in progress, show loading indicator
* `authenticated`: User is signed in, show authenticated content
* `error(String)`: Authentication failed, show error message

**Properties**

The `authenticationState` property holds the current state and is marked as `private(set)`, meaning only the `AuthService` can modify it, but external code can read it.

The `directAuth` property holds our direct authentication flow instance that communicates with the Okta APIs.

The computed properties `isAuthenticated` and `currentToken` provide convenient access to authentication status and the current access token.

**Initialization**

The initializer does two important things:

* **Configures direct authentication**: It attempts to load your Okta configuration from `Okta.plist`. If that fails, it falls back to a default configuration.
* **Restores existing sessions**: It checks if a valid credential exists in the keychain. If it does, the user is automatically signed in without needing to re-enter their credentials.
