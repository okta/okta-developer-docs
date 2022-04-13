<!-- code from DashboardViewModel.kt in dynamic-app sample -->


```
fun logout() {
    _logoutStateLiveData.value = LogoutState.Loading

    viewModelScope.launch(Dispatchers.IO) {
        try {
            val refreshToken = TokenViewModel.tokenResponse.refreshToken
            if (refreshToken != null) {
                // Revoking the refresh token revokes both!
                revokeToken("refresh_token", refreshToken)
            } else {
                revokeToken("access_token", TokenViewModel.tokenResponse.accessToken)
            }

            _logoutStateLiveData.postValue(LogoutState.Success)
        } catch (e: Exception) {
            _logoutStateLiveData.postValue(LogoutState.Failed)
        }
    }
}


private fun revokeToken(tokenType: String, token: String) {
    val formBody = FormBody.Builder()
        .add("client_id", BuildConfig.CLIENT_ID)
        .add("token_type_hint", tokenType)
        .add("token", token)
        .build()

    val request = Request.Builder()
        .url("${BuildConfig.ISSUER}/v1/revoke")
        .post(formBody)
        .build()

    val response = IdxClientConfigurationProvider.get().okHttpCallFactory.newCall(request).execute()
}



```