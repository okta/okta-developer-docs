```kotlin
import com.okta.authfoundation.client.OidcClientResult
import com.okta.authfoundationbootstrap.CredentialBootstrap
import com.okta.idx.kotlin.dto.IdxRemediation.Type.ISSUE
import com.okta.idx.kotlin.dto.IdxResponse

private suspend fun handleResponse(response: IdxResponse) {
    // Check if the sign-in flow is successful.
    if (response.isLoginSuccessful) {
        // Exchange the sign-in session token for a token.
        when (val exchangeCodesResult = flow?.exchangeInteractionCodeForTokens(response.remediations[ISSUE]!!)) {
            is OidcClientResult.Error -> {
                // Handle the error.
            }
            is OidcClientResult.Success -> {
                // Handle a successful sign-in flow.
                // Store it securely for future use.
                CredentialBootstrap.defaultCredential().storeToken(exchangeCodesResult.result)
            }
            else -> {
                // Handle the error.
            }
        }
        return
    }

    ...
}
```
