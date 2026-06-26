#### Understand the AuthService architecture

The `AuthService` is the heart of the Okta authentication system. It serves as a centralized layer that manages the entire authentication lifecycle, from the initial sign-in flow to session maintenance. By encapsulating all authentication logic in a single service, you achieve several important goals:

**Separation of concerns**: The service isolates authentication logic from UI code, making it easier to both test and maintain. Your composables don't need to know how direct authentication works, they simply call methods like `authenticate()` or `logout()`.

**State management**: The service exposes the current authentication state (not authenticated, authenticating, authenticated, or error) as a [`StateFlow`](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/), allowing your UI to react appropriately. This state-driven approach makes it easy to show loading indicators, error messages, or authenticated content.

**Security best practices**: All token handling and storage is managed through the service, ensuring that credentials are stored securely by [`AuthFoundation`](https://github.com/okta/okta-mobile-kotlin). Your UI never directly touches sensitive data.

**Testability**: By defining an interface (`AuthServicing`), you can easily create fake implementations for unit testing your view models without making actual network calls to Okta.

The service handles five key responsibilities:

* **Authentication**: Validate user credentials with Okta.
* **Token storage**: Persist tokens securely with `Credential`.
* **Session management**: Track whether a user is authenticated.
* **Token refresh**: Obtain new access tokens without re-authentication.
* **User profile retrieval**: Fetch user information from Okta.

Build this step by step, starting with the interface that defines the service contract.

#### Create the service interface

Create a package named `auth` in your project, then add a file called `AuthService.kt`. Start with the authentication state and the service contract:

```kotlin
package com.okta.android.passwordauth.auth

import com.okta.authfoundation.client.dto.OidcUserInfo
import kotlinx.coroutines.flow.StateFlow

sealed interface AuthState {
    data object NotAuthenticated : AuthState
    data object Authenticating : AuthState
    data object Authenticated : AuthState
    data class Error(val message: String) : AuthState
}

interface AuthServicing {
    val authenticationState: StateFlow<AuthState>

    suspend fun restoreSession()
    suspend fun authenticate(username: String, password: String)
    suspend fun logout()
    suspend fun refreshAccessToken()
    suspend fun getCurrentUser(): OidcUserInfo?
    suspend fun currentAccessToken(): String?
}
```

The `AuthState` values represent every state of the authentication flow. Your UI observes this state and updates accordingly:

* `NotAuthenticated`: The user is signed out, show the sign-in form.
* `Authenticating`: A sign-in attempt is in progress, show a loading indicator.
* `Authenticated`: The user is signed in, show authenticated content.
* `Error`: Authentication failed, show the error message.

The `AuthServicing` interface defines the contract for the Okta authentication service, making it easy to test and fake later.

#### Implement the AuthService

Below the interface, add the implementation. Start with the basic structure:

```kotlin
import com.okta.android.passwordauth.BuildConfig
import com.okta.authfoundation.credential.Credential
import com.okta.directauth.DirectAuthenticationFlowBuilder
import com.okta.directauth.api.DirectAuthenticationFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class AuthService : AuthServicing {

    private val _authenticationState = MutableStateFlow<AuthState>(AuthState.NotAuthenticated)
    override val authenticationState: StateFlow<AuthState> = _authenticationState.asStateFlow()

    // Build the direct authentication flow from your Okta configuration.
    private val directAuth: DirectAuthenticationFlow =
        DirectAuthenticationFlowBuilder.create(
            issuerUrl = BuildConfig.ISSUER,
            clientId = BuildConfig.CLIENT_ID,
            scope = BuildConfig.SCOPES.split(" ")
        ) {
            // Select the default custom authorization server.
            authorizationServerId = "default"
        }.getOrThrow()

    // Restore an existing session if a credential is already stored.
    override suspend fun restoreSession() {
        if (Credential.getDefaultAsync() != null) {
            _authenticationState.value = AuthState.Authenticated
        }
    }
}
```

This sets up the basic structure of the `AuthService`. The following code breaks down what each part does:

**Authentication state**

The `_authenticationState` is a private `MutableStateFlow` that only the `AuthService` can update. It's exposed publicly as a read-only `StateFlow` through `authenticationState`, which your UI collects.

**The direct authentication flow**

The `directAuth` property holds the `DirectAuthenticationFlow` instance that communicates with the Okta APIs. `DirectAuthenticationFlowBuilder.create(...)` returns a `Result`, so call `getOrThrow()` to unwrap it. The flow reads its `issuerUrl`, `clientId`, and `scope` from `BuildConfig`, and `authorizationServerId = "default"` targets the default custom authorization server.

**Restoring a session**

`restoreSession()` checks whether a valid credential already exists. `Credential.getDefaultAsync()` returns `null` when no credential is stored, so a non-null result means the user is still signed in. Call this when your app starts so users don't have to re-enter their credentials.
