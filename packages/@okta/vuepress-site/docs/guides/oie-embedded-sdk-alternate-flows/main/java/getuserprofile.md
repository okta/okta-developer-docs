
Using the `tokenResponse` obtained from `IDXAuthenticationWrapper`'s `authenticate`
method, make a request to the following endpoint:

```java
...
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
...
```

See [`/userinfo` endpoint](/docs/reference/api/oidc/#userinfo) for more response details.
