After `AuthenticateClient` instance is created you can check if the user is logged in with the following:

```java
if (client.isLoggedIn()) {
    //user already logged in. Skip login screen.
}
```

If the user is logged in and you want to check if the `access_token` is still valid you can check the validity of the token in two ways the first is to simply check the expiration time:

```java
if (client.isLoggedIn()) {
    Tokens tokens = client.getTokens();
    int expiration = tokens.getExpiresIn();
    long currentTime = System.currentTimeMillis();
    if (currentTime > expiration + currentTime) {
        //access_token expired
    }
}
```

Another way to check the validity of the `access_token` is to use the [introspect](https://developer.okta.com/docs/api/resources/oidc/#introspect) endpoint. This will give you more information about the token in the [response properties](https://developer.okta.com/docs/api/resources/oidc/#response-properties-3):

```java
client.introspectToken(client.getTokens().getAccessToken(),
    TokenTypeHint.ACCESS_TOKEN, new RequestCallback<IntrospectResponse, AuthorizationException>() {
        @Override
        public void onSuccess(@NonNull IntrospectResponse result) {
            //handle introspect response.
        }

        @Override
        public void onError(String error, AuthorizationException exception) {
            //handle error
        }
    }
);
```

If the `access_token` is expired or inactive you can get a new one by using the `refresh_token`:

```java
client.refreshToken(new RequestCallback<Tokens, AuthorizationException>() {
    @Override
    public void onSuccess(@NonNull Tokens result) {
        //token refreshed successfully.
    }

    @Override
    public void onError(String error, AuthorizationException exception) {
        //handle error
    }
});
```

