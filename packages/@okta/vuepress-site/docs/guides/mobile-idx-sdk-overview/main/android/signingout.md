This code assumes storing the access token after a successful sign-in flow:

```kotlin
import com.okta.authfoundation.client.OidcClientResult
import com.okta.authfoundation.credential.RevokeTokenType
import com.okta.authfoundationbootstrap.CredentialBootstrap

fun logout() {
    viewModelScope.launch {
        // Revoking the refresh token also revokes the access token.
        when (val revokeResult = CredentialBootstrap.defaultCredential().revokeToken(RevokeTokenType.REFRESH_TOKEN)) {
            is OidcClientResult.Error -> {
                // Sign-out failed, handle the error.
            }
            is OidcClientResult.Success -> {
                // Sign-out successful. Redirect to a sign-in view.
            }
        }
    }
}
```
