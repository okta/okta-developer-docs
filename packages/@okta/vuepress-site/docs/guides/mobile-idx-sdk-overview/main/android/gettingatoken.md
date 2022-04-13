```kotlin
private suspend fun handleResponse(response: IdxResponse) {
    // If a response is successful, immediately exchange it for a token and set it on `LoggedInUserView`.
    if (response.isLoginSuccessful) {
        when (val exchangeCodesResult = client?.exchangeInteractionCodeForTokens(response.remediations[ISSUE]!!)) {
            is IdxClientResult.Error -> {
                // Handle error.
            }
            is IdxClientResult.Success -> {
                // Handle success.
                // Token is available in `exchangeCodesResult.result` store it locally for further use.
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
