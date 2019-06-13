You could create a `callMessagesApi` function that makes an authenticated request to your server. The access token is automatically used in the request properties by the `authorizedRequest` method.

```java
private void callMessagesApi() {
    Uri uri = Uri.parse("https://{resourceUrl}");
    HashMap<String, String> properties = new HashMap<>();
    properties.put("queryparam", "queryparam");
    HashMap<String, String> postParameters = new HashMap<>();
    postParameters.put("postparam", "postparam");

    sessionClient.authorizedRequest(uri, properties, postParameters, HttpConnection.RequestMethod.POST,
        new RequestCallback<JSONObject, AuthorizationException>() {
            @Override
            public void onSuccess(@NonNull JSONObject result) {
                //handle JSONObject result.
            }

            @Override
            public void onError(String error, AuthorizationException exception) {
                //handle error
            }
    });
}
```

If you don't want to use the `authorizedRequest` method and just want to get the access token:

```java
String accessToken = null;
try {
    Tokens token = sessionClient.getTokens();
    accessToken = token.getAccessToken();
} catch (AuthorizationException e) {
    //handle error
}

if (accessToken != null) {
    //use access token
}
```
