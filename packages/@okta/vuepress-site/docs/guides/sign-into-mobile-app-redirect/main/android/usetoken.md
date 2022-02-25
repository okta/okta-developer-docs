To make authenticated requests to your resource server, get the access token from the `SessionClient`. The function below sends a request using `HttpURLConnection`:

```java
private void callServerApi() throws IOException, AuthorizationException {
  var token = sessionClient.getTokens();
  var accessToken = token.getAccessToken();

  var url = new URL("https://${resourceUrl}");
  var connection = (HttpURLConnection) url.openConnection();

  var bearerToken = String.format("Bearer %s", accessToken);
  connection.setRequestProperty("Authorization", bearerToken);
  connection.setRequestProperty("Accept", "application/json");

  try {
    var responseCode = connection.getResponseCode();
    if (responseCode == 200) {
      logger.info("Authenticated successfully");
    } else {
      // handle error codes
    }
  } finally {
    connection.disconnect();
  }
}
```
