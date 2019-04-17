You could create a `callMessagesApi` function that makes an authenticated request to your server.

```java
private void callMessagesApi() {
    Uri uri = Uri.parse("https://{resourceUrl}");
    HashMap<String, String> properties = new HashMap<>();
    properties.put("queryparam", "queryparam");
    HashMap<String, String> postParameters = new HashMap<>();
    postParameters.put("postparam", "postparam");

    client.authorizedRequest(uri, properties, postParameters, HttpConnection.RequestMethod.POST,
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