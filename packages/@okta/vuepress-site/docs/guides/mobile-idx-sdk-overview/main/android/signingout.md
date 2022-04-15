This code assumes that the access token is stored after a successful sign-in:

```kotlin
fun logout() {
    viewModelScope.launch(Dispatchers.IO) {
        try {
            // First load a refresh token if one exists.
            val refreshToken = Storage.tokens.refreshToken
            if (refreshToken != null) {
                // Revoking the refresh token also revokes the access token.
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
    // Create an API request to revoke the token.
    val formBody = FormBody.Builder()
        .add("client_id", BuildConfig.CLIENT_ID)
        .add("token_type_hint", tokenType)
        .add("token", token)
        .build()

    val request = Request.Builder()
        .url("${BuildConfig.ISSUER}/v1/revoke")
        .post(formBody)
        .build()

    // send the request to revoke the token.
    val response = OktaIdxClientConfigurationProvider.get().okHttpCallFactory.newCall(request).execute()

    println("Revoke Token Response: $response")
}
```
  qq