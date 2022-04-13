After a successful sign-in, store the `exchangeCodesResult.result` locally as it contains the refresh token and access token. To sign out revoke these tokens.


```kotlin
fun logout() {
    viewModelScope.launch(Dispatchers.IO) {
        try {
            val refreshToken = Storage.tokens.refreshToken
            if (refreshToken != null) {
                // Revoking the refresh token revokes both!
                revokeToken("refresh_token", refreshToken)
            } else {
                revokeToken("access_token", Storage.tokens.accessToken)
            }

            // Logout successful. Redirect to login page.
        } catch (e: Exception) {
            // Logout failed. Handle error.
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

    val response =
        OktaIdxClientConfigurationProvider.get().okHttpCallFactory.newCall(request).execute()
    println("Revoke Token Response: $response")
}
```
