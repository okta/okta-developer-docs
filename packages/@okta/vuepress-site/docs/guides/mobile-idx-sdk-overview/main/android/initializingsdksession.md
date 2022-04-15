
This example creates the client in the viewmodel `launch` coroutine. Start by calling `IdxClient.start()` and on success, request the first response by calling `resume()` on the result.

```kotlin
@Volatile
private var client: IdxClient? = null


private fun createClient() {
    viewModelScope.launch {
        // Initialize the SDK client and start sign-in flow.
        when (val clientResult = IdxClient.start(OktaIdxClientConfigurationProvider.get())) {
            is IdxClientResult.Error -> {
                // Handle the error.
            }
            is IdxClientResult.Success -> {
                client = clientResult.result
                // Request the first response by calling resume and handle the asynchronous response.
                when (val resumeResult = clientResult.result.resume()) {
                    is IdxClientResult.Error -> {
                        // Handle the error.
                    }
                    is IdxClientResult.Success -> handleResponse(resumeResult.result)
                }
            }
        }
    }
}

private suspend fun handleResponse(response: IdxResponse) {
  // Process the response.
}
```
