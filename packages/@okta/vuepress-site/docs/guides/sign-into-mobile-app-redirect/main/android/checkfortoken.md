Verify that the user is already signed in by checking the authentication status of the active session using the `isAuthenticated` method.

1. Add the following code after the `SessionClient` instance is obtained from the `WebAuthClient` instance:

```java
if (sessionClient.isAuthenticated()) {
    logger.info("User is already authenticated");
    findViewById(R.id.browser_sign_in_btn).setVisibility(View.GONE);
    findViewById(R.id.logout_btn).setVisibility(View.VISIBLE);
    showUserInfo();
} else {
    sessionClient.clear();
}
```

2. Verify that an authorized user still has access by checking that the access token is still valid. There are two ways to do this:

The simplest way is by checking the expiration date of the token. To do this, add the following code after confirming that a user is still authenticated:

```java
if (sessionClient.isAuthenticated()) {
  …
  try {
    if (sessionClient.getTokens().isAccessTokenExpired()) {
      // access_token expired
    }
  } catch (AuthorizationException error) {
    logger.severe(String.format("Error: %s : %s", error.error, error.errorDescription));
  }
}
```

Another way is to use the [introspect](/docs/reference/api/oidc/#introspect) endpoint. This gives you more information about the token in the [response properties](/docs/reference/api/oidc/#response-properties-3), and you can use that information to check for token expiration:

```java
sessionClient.introspectToken(sessionClient.getTokens().getRefreshToken(),
  TokenTypeHint.ACCESS_TOKEN, new RequestCallback<>() {
    @Override
    public void onSuccess(@NonNull IntrospectInfo result) {
      var expirationTime = result.getExp();
      // check if expiration time has passed
    }

    @Override
    public void onError(String error, AuthorizationException exception) {
      // handle request error
    }
  }
);
```
