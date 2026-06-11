With the `AuthService` complete, you now have a robust authentication layer that handles the sign-in and sign-out flows, token management, and user profile retrieval. This service forms the foundation of your app's security, and because it's interface-based, it's easy to test and maintain.

Here's the complete `AuthService.kt` implementation with all methods together for reference:

```kotlin
package com.okta.android.passwordauth.auth

import com.okta.android.passwordauth.BuildConfig
import com.okta.authfoundation.client.OAuth2ClientResult
import com.okta.authfoundation.client.dto.OidcUserInfo
import com.okta.authfoundation.credential.Credential
import com.okta.directauth.DirectAuthenticationFlowBuilder
import com.okta.directauth.api.DirectAuthenticationFlow
import com.okta.directauth.model.DirectAuthenticationError
import com.okta.directauth.model.DirectAuthenticationState
import com.okta.directauth.model.PrimaryFactor
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

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

class AuthService : AuthServicing {

    private val _authenticationState = MutableStateFlow<AuthState>(AuthState.NotAuthenticated)
    override val authenticationState: StateFlow<AuthState> = _authenticationState.asStateFlow()

    private val directAuth: DirectAuthenticationFlow =
        DirectAuthenticationFlowBuilder.create(
            issuerUrl = BuildConfig.ISSUER,
            clientId = BuildConfig.CLIENT_ID,
            scope = BuildConfig.SCOPES.split(" ")
        ) {
            authorizationServerId = "default"
        }.getOrThrow()

    override suspend fun restoreSession() {
        if (Credential.getDefaultAsync() != null) {
            _authenticationState.value = AuthState.Authenticated
        }
    }

    override suspend fun authenticate(username: String, password: String) {
        _authenticationState.value = AuthState.Authenticating

        when (val state = directAuth.start(username, PrimaryFactor.Password(password))) {
            is DirectAuthenticationState.Authenticated -> {
                val credential = Credential.store(state.token)
                Credential.setDefaultAsync(credential)
                _authenticationState.value = AuthState.Authenticated
            }

            is DirectAuthenticationState.MfaRequired ->
                _authenticationState.value =
                    AuthState.Error("Additional verification is required for this account.")

            is DirectAuthenticationError.HttpError.Oauth2Error ->
                _authenticationState.value =
                    AuthState.Error(state.errorDescription ?: "Authentication failed.")

            else ->
                _authenticationState.value = AuthState.Error("Authentication failed.")
        }
    }

    override suspend fun logout() {
        val credential = Credential.getDefaultAsync()
        if (credential != null) {
            credential.revokeAllTokens()
            credential.delete()
        }
        _authenticationState.value = AuthState.NotAuthenticated
    }

    override suspend fun refreshAccessToken() {
        val credential = Credential.getDefaultAsync() ?: return
        credential.refreshToken()
    }

    override suspend fun getCurrentUser(): OidcUserInfo? {
        val credential = Credential.getDefaultAsync() ?: return null
        return when (val result = credential.getUserInfo()) {
            is OAuth2ClientResult.Success -> result.result
            is OAuth2ClientResult.Error -> null
        }
    }

    override suspend fun currentAccessToken(): String? {
        return Credential.getDefaultAsync()?.getAccessTokenIfValid()
    }
}
```
