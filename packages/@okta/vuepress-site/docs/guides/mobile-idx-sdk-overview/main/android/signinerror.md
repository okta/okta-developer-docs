<!-- code from DynamicAuthViewModel.kt in dynamic-app sample -->


```
private fun proceed(remediation: IdxRemediation) {
    cancelPolling()
    viewModelScope.launch {
        _state.value = DynamicAuthState.Loading
        when (val resumeResult = client?.proceed(remediation)) {
            is IdxClientResult.Error -> {
                _state.value = DynamicAuthState.Error("Failed to call proceed")
            }
            is IdxClientResult.Success -> {
                handleResponse(resumeResult.result)
            }
        }
    }
}

```