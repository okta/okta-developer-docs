One of the key features of this implementation is automatic session restoration. When users close and reopen the app, they remain signed in because `restoreSession()` checks for an existing credential:

```kotlin
override suspend fun restoreSession() {
    if (Credential.getDefaultAsync() != null) {
        _authenticationState.value = AuthState.Authenticated
    }
}
```

`AuthFoundation` stores tokens securely on the device, and they persist across app launches. This creates a seamless experience while maintaining security.

#### Understand the authentication flow

The `authenticate` method orchestrates the entire sign-in process. Add it to the `AuthService` class:

```kotlin
import com.okta.directauth.model.DirectAuthenticationError
import com.okta.directauth.model.DirectAuthenticationState
import com.okta.directauth.model.PrimaryFactor

override suspend fun authenticate(username: String, password: String) {
    // 1. Update state to show authentication is in progress.
    _authenticationState.value = AuthState.Authenticating

    // 2. Send the credentials to Okta using direct authentication.
    when (val state = directAuth.start(username, PrimaryFactor.Password(password))) {
        // 3. On success, store the token and make it the default credential.
        is DirectAuthenticationState.Authenticated -> {
            val credential = Credential.store(state.token)
            Credential.setDefaultAsync(credential)
            _authenticationState.value = AuthState.Authenticated
        }

        // 4. This sample supports password-only sign-in.
        is DirectAuthenticationState.MfaRequired ->
            _authenticationState.value =
                AuthState.Error("Additional verification is required for this account.")

        // 5. Surface a server error message when one is available.
        is DirectAuthenticationError.HttpError.Oauth2Error ->
            _authenticationState.value =
                AuthState.Error(state.errorDescription ?: "Authentication failed.")

        // 6. Handle any other error or unexpected state.
        else ->
            _authenticationState.value = AuthState.Error("Authentication failed.")
    }
}
```

The following breaks down what each step does:

1. **Show progress.** Setting the state to `Authenticating` immediately updates the UI to show a loading indicator, giving the user instant feedback.

1. **Send the credentials.** `directAuth.start(username, PrimaryFactor.Password(password))` is a `suspend` function that sends the username and password to the Okta direct authentication endpoint and returns a `DirectAuthenticationState`. The SDK also emits this state on the `directAuth.authenticationState` flow.

1. **Store the token.** When the state is `Authenticated`, Okta has returned a token that contains the access, ID, and refresh tokens. `Credential.store(state.token)` persists it securely, and `Credential.setDefaultAsync(credential)` makes it the active credential for the session.

1. **Handle MFA.** If the org policy requires another factor, the flow returns `MfaRequired`. This password-only sample treats that as an error. You can extend the flow to handle additional factors later.

1. **Handle server errors.** An `Oauth2Error` (such as invalid credentials) carries an `errorDescription` you can show the user.

1. **Handle everything else.** Any other error or unexpected state becomes a generic error message.

#### Understand the log-out process

The `logout` method ensures a complete and secure log-out flow. Add it to the `AuthService` class:

```kotlin
override suspend fun logout() {
    val credential = Credential.getDefaultAsync()
    if (credential != null) {
        // 1. Revoke the tokens on the Okta server.
        credential.revokeAllTokens()
        // 2. Remove the stored tokens from the device.
        credential.delete()
    }
    // 3. Reset the authentication state.
    _authenticationState.value = AuthState.NotAuthenticated
}
```

1. `revokeAllTokens()` tells Okta to invalidate the access and refresh tokens, so they can't be used even if someone obtains a copy.
1. `delete()` removes the stored credential from the device, ensuring that no sensitive data remains locally.
1. Resetting the state to `NotAuthenticated` returns the UI to the sign-in screen.

#### Understand token refresh

Access tokens have a limited lifetime (typically one hour) for security. Rather than forcing users to sign in again, use the refresh token. Add this method to the `AuthService` class:

```kotlin
override suspend fun refreshAccessToken() {
    val credential = Credential.getDefaultAsync() ?: return
    credential.refreshToken()
}
```

`refreshToken()` sends the refresh token to Okta, receives a new access token (and potentially a new refresh token), and updates the stored credential, all without requiring the user to re-enter their password. Requesting the `offline_access` scope is what makes a refresh token available.

#### Understand user profile retrieval

The `getCurrentUser` method fetches user profile information from Okta. Add it, along with a helper to read the current access token:

```kotlin
import com.okta.authfoundation.client.OAuth2ClientResult
import com.okta.authfoundation.client.dto.OidcUserInfo

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
```

`getUserInfo()` calls the Okta `/userinfo` endpoint using the current access token and returns an `OidcUserInfo`. It internally refreshes the access token if it's expired. The result exposes standard OpenID Connect claims (`name`, `email`, `preferredUsername`, and `subject`) through the `com.okta.authfoundation.claims` extension properties.

`getAccessTokenIfValid()` returns the current access token when it hasn't expired, or `null` otherwise.
