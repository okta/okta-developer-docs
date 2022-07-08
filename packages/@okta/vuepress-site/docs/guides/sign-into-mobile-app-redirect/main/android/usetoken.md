To make authenticated requests to your resource server, add the access token interceptor to your `OkHttpClient` instance.

```kotlin
private suspend fun callResourceServer() {
    val accessTokenInterceptor = CredentialBootstrap.defaultCredential().accessTokenInterceptor()
    val okHttpClient = OkHttpClient.Builder().addInterceptor(accessTokenInterceptor).build()
    val request = Request.Builder().url("https://${resourceUrl}").build()
    okHttpClient.newCall(request).enqueue(object : Callback {
        override fun onFailure(call: Call, e: IOException) {
            // An error occurred.
        }

        override fun onResponse(call: Call, response: Response) {
            if (response.code == 200) {
                // Authenticated successfully.
            } else {
                // Invalid status code.
            }
        }
    })
}
```

Credentials are internally refreshed when needed. An authorization header is added only if there's a valid access token.
