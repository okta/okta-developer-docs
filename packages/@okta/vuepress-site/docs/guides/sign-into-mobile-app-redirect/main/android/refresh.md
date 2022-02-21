Use the `refreshToken()` method to get a new access token. Add the following code after checking for access token expiry:

```java
if (sessionClient.getTokens().isAccessTokenExpired()) {
  // access_token expired hence refresh token
  sessionClient.refreshToken(new RequestCallback<>() {
    @Override
    public void onSuccess(@NonNull Tokens result) {
      logger.info("Token refreshed successfully");
    }

    @Override
    public void onError(String msg, AuthorizationException error) {
      logger.severe(String.format("Error: %s : %s", error.error, error.errorDescription));
    }
  });
}
```