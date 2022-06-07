```kotlin
import com.okta.idx.kotlin.dto.IdxRemediation.Type.ISSUE
import com.okta.idx.kotlin.dto.IdxResponse
import com.okta.idx.kotlin.client.IdxClientResult

private suspend fun handleResponse(response: IdxResponse) {
    // Check if the sign-in flow is successful.
    if (response.isLoginSuccessful) {
        // Exchange the sign-in session token for a connection token.
        when (val exchangeCodesResult = client?.exchangeInteractionCodeForTokens(response.remediations[ISSUE]!!)) {
            is IdxClientResult.Error -> {
                // Handle the error.
            }
            is IdxClientResult.Success -> {
                // Handle a successful sign-in flow.
                // The token is in `exchangeCodesResult.result`.
                // Store it securely for future use.
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
