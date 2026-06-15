With the `AuthService` complete, you now have a robust authentication layer that handles the sign-in and sign-out flows, token management, and user profile retrieval. This service forms the foundation of your app's security, and because it's protocol-based, it's easy to test and maintain.

Here's the complete `AuthService` implementation with all methods together for reference:

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
            self.directAuth = (try? DirectAuthenticationFlow(client: OAuth2Client(config)))
        } else {
            self.directAuth = try? DirectAuthenticationFlow()
        }

        // Check for existing credential
        if Credential.default?.token != nil {
            authenticationState = .authenticated
        }
    }

    // MARK: - Authentication Methods

    func authenticate(username: String, password: String) async throws {
        // Update state to show authentication is in progress
        authenticationState = .authenticating

        do {
            // Send credentials to Okta through DirectAuth
            let response = try await directAuth.start(username, with: .password(password))

            // Process the authentication response
            switch response {
            case .success(let token):
                // Store credential securely in keychain
                let credential = try Credential.store(token)
                Credential.default = credential
                authenticationState = .authenticated

            default:
                // Handle unexpected response
                authenticationState = .error("Authentication failed")
            }

        } catch {
            // Handle errors and update state
            authenticationState = .error(error.localizedDescription)
            throw error
        }
    }

    func logout() async throws {
        // Revoke tokens on Okta's server
        if let credential = Credential.default {
            try? await credential.revoke()
        }

        // Clear local credential from keychain
        Credential.default = nil

        // Reset authentication state
        authenticationState = .notAuthenticated
    }

    func refreshAccessToken() async throws {
        // Verify a credential exists
        guard let credential = Credential.default else {
            throw NSError(domain: "AuthService",
                         code: -1,
                         userInfo: [NSLocalizedDescriptionKey: "No credential available"])
        }

        // Exchange refresh token for new access token
        try await credential.refresh()
    }

    func getCurrentUser() async throws -> UserInfo? {
        // Return cached user info if available
        if let userInfo = Credential.default?.userInfo {
            return userInfo
        }

        // Fetch user info from Okta's UserInfo endpoint
        do {
            guard let userInfo = try await Credential.default?.userInfo() else {
                return nil
            }
            return userInfo
        } catch {
            // 3️⃣ Return nil if fetch fails
            return nil
        }
    }
}
```
