Get the access token to set up the request:

```java
Uri uri = Uri.parse("https://{yourApiEndpoint}");
HashMap<String, String> properties = new HashMap<>();
properties.put("queryparam", "queryparam");
HashMap<String, String> postParameters = new HashMap<>();
postParameters.put("postparam", "postparam");
```

Then, make an authenticated request to your API endpoint or resource server and handle the response:

```java
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
```