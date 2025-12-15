---
title: Sign users in to a mobile app with a self-hosted sign-in page
excerpt: Learn how to sign users in to your mobile app using a self-hosted sign-in page and the Okta Client SDK.
layout: Guides
---

Add authentication to your mobile app using a self-hosted sign-in page and the Okta Client SDK.

---

#### Learning outcomes

* Configure your Okta orga for password-based direct authentication.
* Set up an iOS project with the necessary Okta SDKs.
* Build a credential manager to handle authentication state.
* Create a SwiftUI interface for username/password sign-in flows.
* Implement token refresh and session management.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Familiarity with Xcode, Swift, and basic iOS development concepts

---

## Overview

Building a streamlined authentication experience is essential for modern iOS apps. While multifactor authentication provides enhanced security, many apps start with a simpler approach, such as username and password authentication. With the Okta Client SDK, you can implement a fully native, password-based sign-in flow like direct authentication. This keeps users within your app while still leveraging the Okta identity platform.

## Understand Okta direct authentication for password authentication

Direct authenication enables your iOS app to authenticate users directly through the Okta APIs without browser-based flows. This means your app maintains complete control over the UI and user experience while Okta handles the security and token management behind the scenes.

For password-only authentication, the flow is straightforward:

1. User enters credentials in your native UI.
1. Your app sends credentials to Okta through direct authentication.
1. Okta validates the credentials and returns OAuth 2.0 tokens.
1. Your app securely stores these tokens for API access.

This approach works well for internal apps, rapid prototyping, or scenarios where you want to add MFA capabilities later without restructuring your codebase.

## Configure your Okta org

Before diving into code, you need to set up your Okta tenant to support direct authentication with password authentication.

### Set up a native app

1. Go to **Applications** > **Applications** in your Admin Console.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the sign-in method.
1. Choose **Native Application** as the application type.
1. Click **Next**.
1. Configure your app settings:
    * **App integration name**: iOS Password Mobile Self-Hosted
    * **Grant type**: Ensure that **Authorization Code** is selected
    * **Sign-in redirect URIs**: `com.okta.{yourOktaDomain}:/callback`
    * **Sign-out redirect URIs**: `com.okta.{yourOktaDomain}:/`
    > **Note**: Replace `{yourOktaDomain}` with your actual Okta domain, such as, `dev-123456.okta.com`.
1. In the **Assignments** > **Controlled access** section, choose your preferred access control.
1. Click **Save** and note the Client ID, you need this later.

### Configure your authorization server

To enable password-based authentication:

1. Go to **Security** > **API**.
1. Select the authorization server that you want to use for this sign-in flow.
1. Click the **Access Policies** tab.
1. Verify or create an access policy:
    * If no policies exist, click **Add Policy**.
    * Name the policy and give it a description.
    * Assign the policy to **All clients**.
    * Click **Create Policy**.
1. Add a rule to your policy:
    * Click **Add rule**.
    * Name the policy rule.
    * In the **IF Grant type is** section, click **Advanced** and select **Resource Owner Password**.
    * Leave the **Any user assigned the app** default for **AND User is**.
    * Leave the **Any scopes** default for **AND Scopes requested**.
    * Click **Create rule**.
1. Go to **Applications** > **Applications** and select the app you just created.
1. Select the **Sign On** tab (or **Authentication**, depending on your org configuration) and scroll down to the **User authentication** section.
1. For this example, select **Password only**.

> **Caution:** You must enable the Resource Owner Password grant type for the direct authentication password flows to work.

## Setting up your iOS project

Now that you have configured your Okta org, create the iOS app.

### Create an Xcode project

1. Open Xcode and select **File** > **New** > **Project**.
1. Choose **iOS** > **App**, and then click **Next**.
1. Configure your project:
    * **Product Name**: `OktaPasswordAuth`
    * **Interface**: `SwiftUI`
    * **Language**: Swift
1. Click **Next** and save your project.

### Add Okta SDK Dependencies

Use Swift Package Manager to add the Okta Mobile SDK:

1. In Xcode, go to **File** > **Add Package Dependencies**.
1. Enter the repository URL: `https://github.com/okta/okta-mobile-swift`.
1. Click **Add Package**.
1. When prompted to choose products, select the following dependencies:
    * `OktaDirectAuth`
    * `AuthFoundation`
1. Ensure that both are added to your app target.
1. Click **Add Package**.

### Create the Okta Configuration File

Rather than hardcoding configuration values, use a property list file:

1. Right-click your project's root folder.
1. Select **New File From Template**.
1. Choose **Property List** and click **Next**.
1. Name the property file **Okta.plist**.
1. Click **Create**.
1. Right-click **Okta.plist**, select **Open As** > **Source Code**, and paste the following xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>scopes</key>
    <string>openid profile offline_access</string>
    <key>redirectUri</key>
    <string>com.okta.{yourOktaDomain}:/callback</string>
    <key>clientId</key>
    <string>{yourClientID}</string>
    <key>issuer</key>
    <string>https://{yourOktaDomain}/oauth2/default</string>
    <key>logoutRedirectUri</key>
    <string>com.okta.{yourOktaDomain}:/</string>
</dict>
</plist>
```

1. Replace `{yourOktaDomain}` and `{yourClientID}` with the actual values from the app that you created in a previous step.

## Building the authentication service

With the setup complete, implement the core authentication logic and create a service layer that handles all interactions with the Okta DirectAuth API.

### Understanding the AuthService architecture

The `AuthService` is the heart of our authentication system. It serves as a centralized layer that manages the entire authentication lifecycle, from the initial sign-in flow to session maintenance. By encapsulating all authentication logic in a single service, we achieve several important goals:

**Separation of concerns:** The service isolates authentication logic from UI code, making both easier to test and maintain. Your SwiftUI views don't need to know how DirectAuth works-they simply call methods like authenticate() or logout().

State Management: The service maintains the current authentication state (idle, authenticating, authenticated, or error), allowing your UI to react appropriately. This state-driven approach makes it easy to show loading indicators, error messages, or authenticated content.
Security Best Practices: All token handling and storage is managed through the service, ensuring credentials are stored securely in the iOS keychain via AuthFoundation. Your UI never directly touches sensitive data.
Testability: By defining a protocol (AuthServicing), you can easily create mock implementations for unit testing your views without making actual network calls to Okta.
The service will handle five key responsibilities:
Authentication: Validating user credentials with Okta
Token Storage: Securely persisting tokens in the keychain
Session Management: Tracking whether a user is currently authenticated
Token Refresh: Obtaining new access tokens without re-authentication
User Profile Retrieval: Fetching user information from Okta
Let's build this step by step, starting with the protocol that defines our service contract.
Create the Service Protocol
Create a new folder named Services in your project, then add a file called AuthService.swift:


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

This protocol defines the contract for our authentication service, making it easy to test and mock later.
Implement the AuthService
Below the protocol, add the implementation. We'll build this step by step, starting with the basic structure:
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

This sets up the basic structure of our AuthService. Let's break down what each part does:
Authentication States
enum AuthState: Equatable {
    case notAuthenticated
    case authenticating
    case authenticated
    case error(String)
}

The AuthState enum represents all possible states of the authentication flow. Your UI will observe this state and update accordingly:
notAuthenticated: User is signed out, show login form
authenticating: Sign-in is in progress, show loading indicator
authenticated: User is signed in, show authenticated content
error(String): Authentication failed, show error message
Properties
The authenticationState property holds the current state and is marked as private(set), meaning only the AuthService can modify it, but external code can read it.
The directAuth property holds our DirectAuth flow instance that communicates with Okta's APIs.
The computed properties isAuthenticated and currentToken provide convenient access to authentication status and the current access token.
Initialization
The initializer does two important things:
Configures DirectAuth: It attempts to load your Okta configuration from Okta.plist. If that fails, it falls back to a default configuration.
Restores Existing Sessions: It checks if a valid credential already exists in the keychain. If it does, the user is automatically signed in without needing to re-enter their credentials.
Now let's implement the authentication methods. Add the following code after the init() method:
// MARK: - Authentication Methods
    
    func authenticate(username: String, password: String) async throws {
        // 1️⃣ Update state to show authentication is in progress
        authenticationState = .authenticating
        
        do {
            // 2️⃣ Send credentials to Okta via DirectAuth
            let response = try await directAuth.start(username, with: .password(password))
            
            // 3️⃣ Process the authentication response
            switch response {
            case .success(let token):
                // 4️⃣ Store credential securely in keychain
                let credential = try Credential.store(token)
                Credential.default = credential
                authenticationState = .authenticated
                
            default:
                // 5️⃣ Handle unexpected response
                authenticationState = .error("Authentication failed")
            }
            
        } catch {
            // 6️⃣ Handle errors and update state
            authenticationState = .error(error.localizedDescription)
            throw error
        }
    }

Understanding the Authentication Flow
The authenticate method orchestrates the entire sign-in process. Let's examine each step:
1️⃣ Update State to Show Authentication is in Progress
authenticationState = .authenticating

This immediately updates the UI to show a loading indicator, providing instant feedback to the user that their sign-in attempt is being processed.
2️⃣ Send Credentials to Okta via DirectAuth
let response = try await directAuth.start(username, with: .password(password))

This line does the heavy lifting. It sends the username and password to Okta's DirectAuth API endpoint. The await keyword means this is an asynchronous call the app will wait for Okta's response without blocking the UI thread.
3️⃣ Process the Authentication Response
DirectAuth returns a response that can be one of several types. For password-only authentication, we primarily care about the success case.
4️⃣ Store Credential Securely in Keychain
case .success(let token):
    let credential = try Credential.store(token)
    Credential.default = credential
    authenticationState = .authenticated

When authentication succeeds, Okta returns a Token object containing:
Access Token: Used to authorize API requests
ID Token: Contains user identity information
Refresh Token: Used to obtain new access tokens without re-authentication
The Credential.store(token) method securely persists these tokens in the iOS keychain using the AuthFoundation library. Setting Credential.default makes this the active credential for the current session.
5️⃣ Handle Unexpected Response
default:
    authenticationState = .error("Authentication failed")

If we receive a response type we don't handle (like an MFA challenge when MFA isn't configured), we treat it as an error.
6️⃣ Handle Errors and Update State
catch {
    authenticationState = .error(error.localizedDescription)
    throw error
}

Any network errors, invalid credentials, or other issues are caught here. We update the state so the UI can show an error message, and we re-throw the error so calling code can also handle it if needed.
Next, let's implement the logout functionality. Add this method after authenticate:
func logout() async throws {
        // 1️⃣ Revoke tokens on Okta's server
        if let credential = Credential.default {
            try? await credential.revoke()
        }
        
        // 2️⃣ Clear local credential from keychain
        Credential.default = nil
        
        // 3️⃣ Reset authentication state
        authenticationState = .notAuthenticated
    }

Understanding the Logout Process
The logout method ensures a complete and secure sign-out:
1️⃣ Revoke Tokens on Okta's Server
if let credential = Credential.default {
    try? await credential.revoke()
}

This tells Okta to invalidate the current tokens. Even if someone somehow obtained a copy of the tokens, they can no longer be used after revocation. We use try? because we want logout to succeed locally even if the network call fails.
2️⃣ Clear Local Credential from Keychain
Credential.default = nil

This removes the stored tokens from the device's keychain, ensuring no sensitive data remains locally.
3️⃣ Reset Authentication State
authenticationState = .notAuthenticated

This updates the UI to show the login screen again.

Now let's add token refresh capability. Add this method after logout:
func refreshAccessToken() async throws {
        // 1️⃣ Verify a credential exists
        guard let credential = Credential.default else {
            throw NSError(domain: "AuthService", 
                         code: -1, 
                         userInfo: [NSLocalizedDescriptionKey: "No credential available"])
        }
        
        // 2️⃣ Exchange refresh token for new access token
        try await credential.refresh()
    }

Understanding Token Refresh
Access tokens have a limited lifetime (typically 1 hour) for security. Rather than forcing users to sign in again, we use the refresh token:
1️⃣ Verify a Credential Exists
guard let credential = Credential.default else {
    throw NSError(...)
}

We can't refresh if there's no stored credential. This guard ensures we have a credential before attempting refresh.
2️⃣ Exchange Refresh Token for New Access Token
try await credential.refresh()

This method automatically:
Sends the refresh token to Okta
Receives a new access token (and potentially a new refresh token)
Updates the stored credential in the keychain
All without requiring the user to re-enter their password
Finally, let's add user profile retrieval. Add this method after refreshAccessToken:
func getCurrentUser() async throws -> UserInfo? {
        // 1️⃣ Return cached user info if available
        if let userInfo = Credential.default?.userInfo {
            return userInfo
        }
        
        // 2️⃣ Fetch user info from Okta's UserInfo endpoint
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




Understanding User Profile Retrieval
The getCurrentUser method fetches user profile information from Okta:
1️⃣ Return Cached User Info if Available
if let userInfo = Credential.default?.userInfo {
    return userInfo
}

After the first fetch, AuthFoundation caches the user info. This avoids unnecessary network calls for data that rarely changes.
2️⃣ Fetch User Info from Okta's UserInfo Endpoint
guard let userInfo = try await Credential.default?.userInfo() else {
    return nil
}

If not cached, this method calls Okta's /userinfo endpoint using the current access token. The response includes standard OpenID Connect claims like:
sub: Unique user identifier
name: User's full name
email: Email address
preferred_username: Username or email used for sign-in
3️⃣ Return nil if Fetch Fails
catch {
    return nil
}

If the network request fails or the token is invalid, we gracefully return nil rather than crashing. The calling code can decide how to handle the missing data.
Complete AuthService Code
Here's the complete AuthService implementation with all methods together for reference:
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
        // 1️⃣ Update state to show authentication is in progress
        authenticationState = .authenticating
        
        do {
            // 2️⃣ Send credentials to Okta via DirectAuth
            let response = try await directAuth.start(username, with: .password(password))
            
            // 3️⃣ Process the authentication response
            switch response {
            case .success(let token):
                // 4️⃣ Store credential securely in keychain
                let credential = try Credential.store(token)
                Credential.default = credential
                authenticationState = .authenticated
                
            default:
                // 5️⃣ Handle unexpected response
                authenticationState = .error("Authentication failed")
            }
            
        } catch {
            // 6️⃣ Handle errors and update state
            authenticationState = .error(error.localizedDescription)
            throw error
        }
    }
    
    func logout() async throws {
        // 1️⃣ Revoke tokens on Okta's server
        if let credential = Credential.default {
            try? await credential.revoke()
        }
        
        // 2️⃣ Clear local credential from keychain
        Credential.default = nil
        
        // 3️⃣ Reset authentication state
        authenticationState = .notAuthenticated
    }
    
    func refreshAccessToken() async throws {
        // 1️⃣ Verify a credential exists
        guard let credential = Credential.default else {
            throw NSError(domain: "AuthService", 
                         code: -1, 
                         userInfo: [NSLocalizedDescriptionKey: "No credential available"])
        }
        
        // 2️⃣ Exchange refresh token for new access token
        try await credential.refresh()
    }
    
    func getCurrentUser() async throws -> UserInfo? {
        // 1️⃣ Return cached user info if available
        if let userInfo = Credential.default?.userInfo {
            return userInfo
        }
        
        // 2️⃣ Fetch user info from Okta's UserInfo endpoint
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

With the AuthService complete, you now have a robust authentication layer that handles sign-in, sign-out, token management, and user profile retrieval. This service forms the foundation of your app's security, and because it's protocol-based, it's easy to test and maintain.
Building the SwiftUI Interface
With the service layer complete, let's create the user interface. We'll use the MVVM (Model-View-ViewModel) pattern to keep our views clean and testable.
Understanding the UI Architecture
Before we dive into code, let's understand the components we'll be building and how they work together:
LoginViewModel: The Bridge Between UI and Business Logic
The LoginViewModel acts as an intermediary layer between your SwiftUI views and the AuthService. This separation provides several benefits:
UI State Management: The view model maintains UI-specific state (like loading indicators and error messages) separately from authentication state
User Input Handling: It holds the username and password values bound to text fields, keeping form data out of the service layer
Action Coordination: It translates user actions (button taps) into service calls, handling any UI-specific logic before and after
Testability: You can test view logic independently by injecting a mock AuthService
Think of the view model as a translator: it speaks "SwiftUI" to your views and "business logic" to your service.
Create the View Model
Create a new folder named ViewModels and add LoginViewModel.swift:
import Foundation
import AuthFoundation
import Observation

@Observable
final class LoginViewModel {
    
    // MARK: - Dependencies
    
    private let credentialManager: CredentialManaging
    
    // MARK: - UI State
    
    var username: String = ""
    var password: String = ""
    var isLoading: Bool = false
    var errorMessage: String?
    
    var authState: CredentialManager.AuthState {
        credentialManager.authenticationState
    }
    
    var canSubmit: Bool {
        !username.isEmpty && !password.isEmpty && !isLoading
    }

    var token: String {
        authService.currentToken ?? "No Token"
    }
    
    // MARK: - Initialization
    
    init(credentialManager: CredentialManaging = CredentialManager()) {
        self.credentialManager = credentialManager
    }
    
    // MARK: - Actions
    
    @MainActor
    func login() async {
        errorMessage = nil
        isLoading = true
        
        defer { isLoading = false }
        
        do {
            try await credentialManager.authenticate(username: username, password: password)
            // Clear password after successful login
            password = ""
        } catch {
            errorMessage = error.localizedDescription
        }
    }
    
    @MainActor
    func logout() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            try await credentialManager.logout()
            username = ""
            password = ""
            errorMessage = nil
        } catch {
            errorMessage = "Logout failed: \(error.localizedDescription)"
        }
    }
    
    @MainActor
    func refreshToken() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            try await credentialManager.refreshAccessToken()
        } catch {
            errorMessage = "Token refresh failed: \(error.localizedDescription)"
        }
    }
    
    @MainActor
    func fetchUserProfile() async -> UserInfo? {
        do {
            return try await credentialManager.getCurrentUser()
        } catch {
            errorMessage = "Failed to fetch user profile: \(error.localizedDescription)"
            return nil
        }
    }
}


LoginView: The Main Authentication Interface
The LoginView is your app's primary authentication screen. It will dynamically display different content based on the authentication state:
Login Form (notAuthenticated): Username and password fields with a sign-in button
Loading State (authenticating): A progress indicator while credentials are being verified
Success View (authenticated): Token preview, action buttons, and navigation to other screens
Error Display: User-friendly error messages when authentication fails
The view observes the LoginViewModel and automatically updates when the authentication state changes, providing a reactive and responsive user experience.

Create the Login View
Create a Views folder, move ContentView.swift in there and rename ContentView.swift to LoginView.swift. Replace its contents with:
import SwiftUI
import AuthFoundation

struct LoginView: View {
    
    @State private var viewModel = LoginViewModel()
    @State private var showingProfile = false
    @State private var showingTokenInfo = false
    
    var body: some View {
        NavigationStack {
            Group {
                switch viewModel.authState {
                case .notAuthenticated, .error:
                    loginFormView
                    
                case .authenticating:
                    loadingView
                    
                case .authenticated:
                    authenticatedView
                }
            }
            .navigationTitle("Okta DirectAuth")
        }
        .sheet(isPresented: $showingProfile) {
            ProfileView(viewModel: viewModel)
        }
        .sheet(isPresented: $showingTokenInfo) {
            TokenDetailsView()
        }
    }
}

// MARK: - Login Form

private extension LoginView {
    
    var loginFormView: some View {
        VStack(spacing: 24) {
            headerView
            
            VStack(spacing: 16) {
                usernameField
                passwordField
            }
            .padding(.horizontal)
            
            loginButton
            
            if let error = viewModel.errorMessage {
                errorView(message: error)
            }
            
            Spacer()
        }
        .padding()
    }
    
    var headerView: some View {
        VStack(spacing: 8) {
            Image(systemName: "lock.shield")
                .font(.system(size: 60))
                .foregroundColor(.blue)
            
            Text("Welcome Back")
                .font(.title)
                .fontWeight(.bold)
            
            Text("Sign in with your Okta credentials")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .padding(.top, 40)
    }
    
    var usernameField: some View {
        TextField("Email or Username", text: $viewModel.username)
            .textFieldStyle(.roundedBorder)
            .textInputAutocapitalization(.never)
            .autocorrectionDisabled()
            .keyboardType(.emailAddress)
            .textContentType(.username)
    }
    
    var passwordField: some View {
        SecureField("Password", text: $viewModel.password)
            .textFieldStyle(.roundedBorder)
            .textContentType(.password)
            .onSubmit {
                if viewModel.canSubmit {
                    Task { await viewModel.login() }
                }
            }
    }
    
    var loginButton: some View {
        Button(action: { Task { await viewModel.login() } }) {
            Text("Sign In")
                .fontWeight(.semibold)
                .frame(maxWidth: .infinity)
                .padding()
                .background(viewModel.canSubmit ? Color.blue : Color.gray)
                .foregroundColor(.white)
                .cornerRadius(10)
        }
        .disabled(!viewModel.canSubmit)
        .padding(.horizontal)
    }
    
    func errorView(message: String) -> some View {
        HStack {
            Image(systemName: "exclamationmark.triangle.fill")
            Text(message)
                .font(.footnote)
        }
        .foregroundColor(.red)
        .padding()
        .background(Color.red.opacity(0.1))
        .cornerRadius(8)
        .padding(.horizontal)
    }
}

// MARK: - Loading View

private extension LoginView {
    
    var loadingView: some View {
        VStack(spacing: 16) {
            ProgressView()
                .scaleEffect(1.5)
            Text("Signing in...")
                .font(.headline)
        }
    }
}

// MARK: - Authenticated View

private extension LoginView {
    
    var authenticatedView: some View {
        VStack(spacing: 24) {
            successHeader
            
            tokenPreview
            
            actionButtons
            
            Spacer()
        }
        .padding()
    }
    
    var successHeader: some View {
        VStack(spacing: 12) {
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 70))
                .foregroundColor(.green)
            
            Text("Successfully Authenticated")
                .font(.title2)
                .fontWeight(.bold)
            
            Text("You're now signed in to your account")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .padding(.top, 20)
    }
    
    var tokenPreview: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Access Token")
                .font(.caption)
                .foregroundColor(.secondary)
            
            ScrollView {
                Text(viewModel.token)
                    .font(.system(.caption, design: .monospaced))
                    .textSelection(.enabled)
                    .padding()
            }
            .frame(height: 120)
            .background(Color.secondary.opacity(0.1))
            .cornerRadius(8)
        }
    }
    
    var actionButtons: some View {
        VStack(spacing: 12) {
            Button(action: { showingProfile = true }) {
                Label("View Profile", systemImage: "person.circle")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            
            Button(action: { showingTokenInfo = true }) {
                Label("Token Details", systemImage: "key.fill")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.indigo)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            
            Button(action: { Task { await viewModel.refreshToken() } }) {
                Label("Refresh Token", systemImage: "arrow.clockwise")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.orange)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .disabled(viewModel.isLoading)
            
            Button(action: { Task { await viewModel.logout() } }) {
                Label("Sign Out", systemImage: "rectangle.portrait.and.arrow.right")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .disabled(viewModel.isLoading)
        }
    }
}


Create Supporting Views

ProfileView: Displaying User Information
Once authenticated, users want to see their profile information. The ProfileView will:
Fetch and display the user's profile data from Okta (name, email, username, user ID)
Show metadata like when the profile was last updated
Handle loading states while fetching data
Display a friendly error message if the profile can't be loaded
This view demonstrates how to use the authenticated access token to retrieve additional user information beyond basic authentication.

Create ProfileView.swift in the Views folder:
import SwiftUI
import AuthFoundation

struct ProfileView: View {
    
    let viewModel: LoginViewModel
    @Environment(\.dismiss) var dismiss
    @State private var userInfo: UserInfo?
    @State private var isLoading = true
    
    var body: some View {
        NavigationStack {
            Group {
                if isLoading {
                    ProgressView()
                } else if let user = userInfo {
                    profileContent(user: user)
                } else {
                    errorContent
                }
            }
            .navigationTitle("Profile")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
            .task {
                userInfo = await viewModel.fetchUserProfile()
                isLoading = false
            }
        }
    }
    
    private func profileContent(user: UserInfo) -> some View {
        List {
            Section("User Information") {
                ProfileRow(label: "Name", value: user.name ?? "Not provided")
                ProfileRow(label: "Email", value: user.email ?? "Not provided")
                ProfileRow(label: "Username", value: user.preferredUsername ?? "Not provided")
                ProfileRow(label: "User ID", value: user.subject ?? "Unknown")
            }
            
            if let updatedAt = user.updatedAt {
                Section("Metadata") {
                    ProfileRow(label: "Last Updated", 
                             value: updatedAt.formatted(date: .long, time: .shortened))
                }
            }
        }
    }
    
    private var errorContent: some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.triangle")
                .font(.system(size: 50))
                .foregroundColor(.orange)
            Text("Unable to load profile")
                .font(.headline)
            Text("Please try again later")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
    }
}

struct ProfileRow: View {
    let label: String
    let value: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
            Text(value)
                .font(.body)
        }
    }
}

TokenDetailsView: Developer-Friendly Token Inspector
The TokenDetailsView serves as a debugging and verification tool that displays:
Token Type: The OAuth token type (typically "Bearer")
Access Token: The JWT used for authorizing API requests
ID Token: The JWT containing user identity claims
Refresh Token: The token used to obtain new access tokens
Scopes: The permissions granted to this token
This view is particularly useful during development to verify that tokens are being issued correctly and to understand what's stored in the credential. In production apps, you'd typically remove or restrict access to this view.
Create TokenDetailsView.swift:

import SwiftUI
import AuthFoundation

struct TokenDetailsView: View {
    
    @Environment(\.dismiss) var dismiss
    
    private var credential: Credential? {
        Credential.default
    }
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    if let token = credential?.token {
                        tokenSection(title: "Token Type", value: token.tokenType)
                        
                        tokenSection(title: "Access Token", 
                                   value: token.accessToken,
                                   monospaced: true)
                        
                        if let scopes = token.scope {
                            tokenSection(title: "Scopes", 
                                       value: scopes.joined(separator: ", "))
                        }
                        
                        if let idToken = token.idToken?.rawValue {
                            tokenSection(title: "ID Token", 
                                       value: idToken,
                                       monospaced: true)
                        }
                        
                        if let refreshToken = token.refreshToken {
                            tokenSection(title: "Refresh Token", 
                                       value: refreshToken,
                                       monospaced: true)
                        }
                        
                        if let expiresIn = token.expiresIn {
                            tokenSection(title: "Expires In", 
                                       value: "\(expiresIn) seconds")
                        }
                    } else {
                        emptyState
                    }
                }
                .padding()
            }
            .navigationTitle("Token Details")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
    
    private func tokenSection(title: String, value: String, monospaced: Bool = false) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.headline)
                .foregroundColor(.primary)
            
            Text(value)
                .font(monospaced ? .system(.caption, design: .monospaced) : .caption)
                .foregroundColor(.secondary)
                .textSelection(.enabled)
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.secondary.opacity(0.1))
                .cornerRadius(8)
        }
    }
    
    private var emptyState: some View {
        VStack(spacing: 16) {
            Image(systemName: "key.slash")
                .font(.system(size: 50))
                .foregroundColor(.gray)
            Text("No Token Available")
                .font(.headline)
            Text("Please sign in to view token details")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
    }
}


How They Work Together
Here's the flow of data through these components:
User enters credentials in LoginView text fields
Text field values are bound to LoginViewModel properties
User taps "Sign In" button
LoginView calls viewModel.login()
LoginViewModel calls authService.authenticate()
AuthService updates its state
LoginViewModel observes the state change
LoginView automatically re-renders based on new state
When authenticated, user can navigate to ProfileView or TokenDetailsView
This architecture keeps concerns separated: the view handles presentation, the view model handles UI logic, and the service handles authentication business logic.


Testing Your Implementation
You're now ready to test the complete authentication flow:
Build and Run: Press Cmd+R to build and run your app in the simulator
Enter Credentials: Use valid Okta user credentials from your org
Sign In: Tap the "Sign In" button
View Token: After successful authentication, you'll see your access token
Explore Features:
Tap "View Profile" to see user information
Tap "Token Details" to inspect all tokens
Tap "Refresh Token" to get a new access token
Tap "Sign Out" to clear the session
Handling Common Issues
Invalid Credentials If you see an authentication error, verify:
The username and password are correct
The user is assigned to your application in Okta
The Resource Owner Password grant is enabled in your authorization server
Configuration Errors If the app crashes on launch:
Double-check your Okta.plist values
Ensure your Client ID and Issuer URL are correct
Verify the redirect URIs match exactly
Token Expiration Access tokens typically expire after 1 hour. Use the "Refresh Token" button to get a new one without re-authenticating

Understanding Session Persistence
One of the key features of our implementation is automatic session restoration. When users close and reopen the app, they remain signed in thanks to these lines in AuthService:
.init() {
    // ... initialization code ...
    
    // Check for existing credential
    if Credential.default?.token != nil {
        authenticationState = .authenticated
    }
}

The AuthFoundation library stores tokens securely in the iOS keychain, which persists across app launches. This creates a seamless experience while maintaining security.
Security Considerations
While this implementation provides a functional authentication system, keep these security points in mind:
Use HTTPS Only: Ensure all API calls use secure connections. Okta enforces this by default.
Consider Adding MFA: Password-only authentication is less secure than password + MFA. Consider adding support for additional factors as your app matures.
Handle Token Expiration: Always implement token refresh logic to maintain sessions without requiring repeated sign-ins.
Secure Storage: Never store passwords locally. The AuthFoundation library handles secure token storage in the keychain automatically.
Error Handling: Provide clear error messages without exposing sensitive security details.

Congratulations 🎉🎉🎉
You've built a complete, native authentication system for iOS using Okta DirectAuth with username and password authentication. Your app now handles credential validation, secure token storage, session management, and token refresh — all without leaving your native Swift UI.
This foundation makes it easy to add more sophisticated authentication features later, such as biometric verification, multi-factor authentication, or passwordless flows, while maintaining the same clean architecture.
The combination of SwiftUI's reactive UI framework and Okta's DirectAuth SDK provides a powerful, secure, and user-friendly authentication experience that can scale with your application's needs.