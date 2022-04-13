<!-- code from DynamicAuthViewModel.kt in dynamic-app sample -->

```
package com.okta.idx.android.dynamic.auth

import com.okta.idx.kotlin.dto.IdxResponse
import com.okta.idx.kotlin.dto.TokenResponse

sealed class DynamicAuthState {
    object Loading : DynamicAuthState()

    data class Form(
        internal val idxResponse: IdxResponse,
        val fields: List<DynamicAuthField>,
        val messages: List<String>,
    ) : DynamicAuthState()

    data class Error(val message: String) : DynamicAuthState()

    data class Tokens(val tokenResponse: TokenResponse) : DynamicAuthState()
}



private suspend fun handleResponse(response: IdxResponse) {
    if (response.isLoginSuccessful) {
        when (val exchangeCodesResult =
            client?.exchangeInteractionCodeForTokens(response.remediations[IdxRemediation.Type.ISSUE]!!)) {
            is IdxClientResult.Error -> {
                _state.value = DynamicAuthState.Error("Failed to call resume")
            }
            is IdxClientResult.Success -> {
                _state.value = DynamicAuthState.Tokens(exchangeCodesResult.result)
            }
        }
        return
    }
	...
```