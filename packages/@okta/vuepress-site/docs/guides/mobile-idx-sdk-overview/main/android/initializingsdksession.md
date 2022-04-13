<!-- code from DynamicAuthViewModel.kt in dynamic-app sample --> 


```
private fun createClient() {
    _state.value = DynamicAuthState.Loading
    viewModelScope.launch {
        when (val clientResult = IdxClient.start(IdxClientConfigurationProvider.get())) {
            is IdxClientResult.Error -> {
                _state.value = DynamicAuthState.Error("Failed to create client")
            }
            is IdxClientResult.Success -> {
                client = clientResult.result
                when (val resumeResult = clientResult.result.resume()) {
                    is IdxClientResult.Error -> {
                        _state.value = DynamicAuthState.Error("Failed to call resume")
                    }
                    is IdxClientResult.Success -> {
                        handleResponse(resumeResult.result)
                    }
                }
            }
        }
    }
}
```