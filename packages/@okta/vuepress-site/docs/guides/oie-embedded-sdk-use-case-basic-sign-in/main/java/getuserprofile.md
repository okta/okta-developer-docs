## Get the user profile information

After the user signs in successfully, you can use the tokens returned in the previous step to request basic user information. 

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
}
catch (Exception e) {
   logger.error("Error retrieving profile from user info endpoint", e);
}
```
