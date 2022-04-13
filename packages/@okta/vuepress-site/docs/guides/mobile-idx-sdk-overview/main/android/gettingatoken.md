```kotlin
private suspend fun handleResponse(response: IdxResponse) {
    // Check if sign-in is successful.
    if (response.isLoginSuccessful) {
        // Exchange the sign-in session token for a connection token.
        when (val exchangeCodesResult = client?.exchangeInteractionCodeForTokens(response.remediations[ISSUE]!!)) {
            is IdxClientResult.Error -> {
                // Handle error.
            }
            is IdxClientResult.Success -> {
                // Handle success.
                // The token is in `exchangeCodesResult.result`.
                // Store it securely for future use.
            }
            else -> {
                // Handle error.
            }
        }
        return
    }

    ...
}
```
