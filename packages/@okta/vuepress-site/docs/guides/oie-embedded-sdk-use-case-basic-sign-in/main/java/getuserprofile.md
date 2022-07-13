## Get the user profile information

Depending on your requirements and what information you want to retrieve after the user successfully signs in, you can obtain basic user information by making a request to the authorization server.

Using the [`TokenResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/TokenResponse.java) object obtained from the `IDXAuthenticationWrapper.authenticate()` method, make a request to the [`/v1/userinfo`](/docs/references/api/oidc/#userinfo) endpoint:

```java
try {
        String userInfoUrl = getNormalizedUri(issuer, "/v1/userinfo");

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(tokenResponse.getAccessToken());

        HttpEntity<String> requestEntity = new HttpEntity<>(null, httpHeaders);

        ParameterizedTypeReference<Map<String, String>> responseType =
                new ParameterizedTypeReference<Map<String, String>>() { };
        ResponseEntity<Map<String, String>> responseEntity =
                restTemplate.exchange(userInfoUrl, HttpMethod.GET, requestEntity, responseType);

        claims = responseEntity.getBody();
        Assert.notNull(claims, "claims cannot be null");
        user = claims.get("preferred_username");
} catch (Exception e) {
        logger.error("Error retrieving profile from user info endpoint", e);
}
```
