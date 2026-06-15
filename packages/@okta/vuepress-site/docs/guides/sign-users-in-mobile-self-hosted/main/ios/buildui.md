Use the MVVM (Model-View-ViewModel) pattern to keep your views clean and testable.

#### Understand the UI architecture

Before we dive into code, let's understand the components that you build and how they work together:

`LoginViewModel`: The bridge between UI and business logic

The `LoginViewModel` acts as an intermediary layer between your SwiftUI views and the `AuthService`. This separation provides several benefits:

* **UI state management**: The view model maintains the UI-specific state (like loading indicators and error messages) separately from the authentication state.
* **User input handling**: It holds the username and password values bound to text fields, keeping form data out of the service layer.
* **Action coordination**: It translates user actions (button taps) into service calls, handling any UI-specific logic before and after.
* **Testability**: You can test view logic independently by injecting a mock `AuthService`.

Think of the view model as a translator: it speaks "SwiftUI" to your views and "business logic" to your service.

#### Create the view model

Create a folder named `ViewModels` and add `LoginViewModel.swift`:

```swift
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
```

`LoginView`: The main authentication interface

The `LoginView` is your app's primary authentication screen. It dynamically displays different content based on the authentication state:

* **Login form** (`notAuthenticated`)`: Username and password fields with a sign-in button
* **Loading state** (`authenticating`): A progress indicator while credentials are being verified
* **Success view** (`authenticated`): Token preview, action buttons, and navigation to other screens
* **Error display**: User-friendly error messages when authentication fails

The view observes the `LoginViewModel` and automatically updates when the authentication state changes, providing a reactive and responsive user experience.

#### Create the login view

Create a `Views` folder, move `ContentView.swift` in there and rename `ContentView.swift` to `LoginView.swift`. Replace its contents with the following code:

```swift
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
```

#### Create supporting views

`ProfileView`: Display user information

After the user is authenticated, they want to see their profile information. The `ProfileView` performs the following actions:

* Fetch and display the user's profile data from Okta (name, email, username, user ID)
* Show metadata like when the profile was last updated
* Handle loading states while fetching data
* Display a friendly error message if the profile can't be loaded

This view demonstrates how to use the authenticated access token to retrieve more user information beyond basic authentication.

Create `ProfileView.swift` in the `Views` folder:

```swift
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
```

`TokenDetailsView`: Developer-friendly token inspector

The `TokenDetailsView` serves as a debugging and verification tool that displays the following information:

* **Token type**: The OAuth token type (typically "Bearer")
* **Access token**: The JWT used for authorizing API requests
* **ID token**: The JWT that contains user identity claims
* **Refresh token**: The token used to obtain new access tokens
* **Scopes**: The permissions granted to this token

This view is useful during development to verify that tokens are issued correctly and to understand what's stored in the credentials. In production apps, you typically remove or restrict access to this view.

Create `TokenDetailsView.swift`:

```swift

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
```
