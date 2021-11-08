Use the `refreshToken` method to get a new access token:

```java
sessionClient.refreshToken(new RequestCallback<Tokens, AuthorizationException>() {
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
