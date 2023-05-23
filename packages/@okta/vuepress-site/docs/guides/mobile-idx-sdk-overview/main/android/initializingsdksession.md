
This example creates the flow in the viewmodel `launch` coroutine. Start by calling `CredentialBootstrap.oidcClient.createInteractionCodeFlow` and on success, request the first response by calling `resume()` on the result.

```kotlin
import com.okta.authfoundation.client.OidcClientResult
import com.okta.authfoundationbootstrap.CredentialBootstrap
import com.okta.idx.kotlin.client.InteractionCodeFlow
import com.okta.idx.kotlin.client.InteractionCodeFlow.Companion.createInteractionCodeFlow
import com.okta.idx.kotlin.dto.IdxResponse

@Volatile
private var flow: InteractionCodeFlow? = null

private fun createClient() {
    viewModelScope.launch {
        // Initialize the SDK and start sign-in flow.
        when (
            val clientResult = CredentialBootstrap.oidcClient.createInteractionCodeFlow(
                redirectUrl = BuildConfig.REDIRECT_URI,
            )
        ) {
            is OidcClientResult.Error -> {
                // Handle the error.
            }
            is OidcClientResult.Success -> {
                flow = clientResult.result
                // Request the first response by calling resume and handle the asynchronous response.
                when (val resumeResult = clientResult.result.resume()) {
                    is OidcClientResult.Error -> {
                        // Handle the error.
                    }
                    is OidcClientResult.Success -> handleResponse(resumeResult.result)
                }
            }
        }
    }
}

private suspend fun handleResponse(response: IdxResponse) {
  // Process the response.
}
```
