After the `AuthenticateClient` instance is created, make sure that the user is signed in:

```java
if (sessionClient.isAuthenticated()) {
    //user already logged in. Skip login screen.
}
```

If the user is signed in and you want to make sure that the `access_token` is still valid, you can check the validity of the token in two ways. The first way is to simply check the expiration time:

```java
if (sessionClient.isAuthenticated()) {
    try {
        if (sessionClient.getTokens().isAccessTokenExpired()) {
            //access_token expired
        }
    } catch (AuthorizationException e) {
        //handle error
    }
}
```

Another way to check the validity of the `access_token` is to use the [introspect](https://developer.okta.com/docs/api/resources/oidc/#introspect) endpoint. This gives you more information about the token in the [response properties](https://developer.okta.com/docs/api/resources/oidc/#response-properties-3):

```java
sessionClient.introspectToken(sessionClient.getTokens().getRefreshToken(),
    TokenTypeHint.ACCESS_TOKEN, new RequestCallback<IntrospectInfo, AuthorizationException>() {
        @Override
        public void onSuccess(@NonNull IntrospectInfo result) {
            //handle introspect info.
        }

        @Override
        public void onError(String error, AuthorizationException exception) {
            //handle request error
        }
    }
);
```
