Your code can get the user's info with the `getUserProfile` method:

```java
sessionClient.getUserProfile(new RequestCallback<UserInfo, AuthorizationException>() {
    @Override
    public void onSuccess(@NonNull UserInfo result) {
        //handle UserInfo result.
        String name  = (String) result.get("name");
        String email = (String) result.get("email");
    }

    @Override
    public void onError(String error, AuthorizationException exception) {
        //handle failed userinfo request
    }
});
```

In `onSuccess` the user info returned is a `JSONObject` with the following [properties](/docs/reference/api/oidc/#response-example-success-5).
