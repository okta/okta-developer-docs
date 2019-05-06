The following is an example of getting user information from the `/userinfo` endpoint:

```java
client.getUserProfile(new RequestCallback<JSONObject, AuthorizationException>() {
    @Override
    public void onSuccess(@NonNull JSONObject result) {
        //handle JSONObject result.
    }

    @Override
    public void onError(String error, AuthorizationException exception) {
        //handle error
    }
});
```

In `onSuccess` the user info returned is a `JSONObject` with the following [properties](https://developer.okta.com/docs/api/resources/oidc/#response-example-success-5).