This can be done inside a viewModel class. Start by calling `IdxClient.start()` and on success call `resume()` on the result and handle the response.

```kotlin
@Volatile
private var client: IdxClient? = null


private fun createClient() {
    viewModelScope.launch {
        // Initiate the IDX client and start IDX flow.
        when (val clientResult = IdxClient.start(OktaIdxClientConfigurationProvider.get())) {
            is IdxClientResult.Error -> {
                // Handle error.
            }
            is IdxClientResult.Success -> {
                client = clientResult.result
                // Call the IDX API resume to receive the first IDX response.
                when (val resumeResult = clientResult.result.resume()) {
                    is IdxClientResult.Error -> {
                        // Handle error.
                    }
                    is IdxClientResult.Success -> handleResponse(resumeResult.result)
                }
            }
        }
    }
}

private suspend fun handleResponse(response: IdxResponse) {
  // Handle the successful response.
  // This includes processing remediations, messages and getting tokens on successful login.
}
```
