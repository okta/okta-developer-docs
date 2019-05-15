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
