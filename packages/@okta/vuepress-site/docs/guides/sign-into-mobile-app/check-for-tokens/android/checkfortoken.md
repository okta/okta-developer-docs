After the `AuthenticateClient` instance is created, make sure that the user is signed in:

```java
if (client.isLoggedIn()) {
    //user already logged in. Skip login screen.
}
```

If the user is signed in and you want to make sure that the `access_token` is still valid, you can check the validity of the token in two ways. The first way is to simply check the expiration time:

```java
if (client.isLoggedIn()) {
    Tokens tokens = client.getTokens();
    int expiration = tokens.getExpiresIn();
    long currentTime = System.currentTimeMillis();
    OktaIdToken idToken = OktaIdToken.parseIdToken(client.getTokens().getIdToken());
    if (currentTime > expiration + idToken.getClaims().iat) {
        //access_token expired
    }
}
```

Another way to check the validity of the `access_token` is to use the [introspect](/docs/reference/api/oidc/#introspect) endpoint. This gives you more information about the token in the [response properties](/docs/reference/api/oidc/#response-properties-3):

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

If the `access_token` is expired or inactive, you can get a new one by using the `refresh_token`:

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

