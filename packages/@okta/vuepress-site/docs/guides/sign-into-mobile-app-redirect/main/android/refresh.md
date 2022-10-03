Use the `refreshToken()` method to get a new access token.

```kotlin
if (CredentialBootstrap.defaultCredential().token != null && CredentialBootstrap.defaultCredential().getAccessTokenIfValid() == null) {
  // The access_token expired, refresh the token.
  when (val result = CredentialBootstrap.defaultCredential().refreshToken()) {
    is OidcClientResult.Error -> {
        // An error occurred. Access the error in `result.exception`.
    }
    is OidcClientResult.Success -> {
      // Token refreshed successfully.
    }
  }
}
```
