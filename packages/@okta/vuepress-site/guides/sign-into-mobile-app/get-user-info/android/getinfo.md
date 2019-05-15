Your code can get the user's info with the `getUserProfile` method:

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

The `JSONObject` in `onSuccess` contains the user's info.
