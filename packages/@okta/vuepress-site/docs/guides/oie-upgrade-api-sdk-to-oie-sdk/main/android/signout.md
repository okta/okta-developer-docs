### Okta Authentication SDK basic sign-out flow

The sign-out flow for a Classic Engine Java Auth SDK app typically involves deleting any persistent session storage and redirecting the user to a sign-out page.

### Identity Engine SDK basic sign-out flow

The Identity Engine Java SDK contains a revoke option in the wrapper client to revoke the access token in Okta.

>**Note:** In a mobile app, there is no session storage. You must store the tokens yourself, and then clear them when you use this method.

This step is required since the user is authorized by an Okta authorization server. The following code snippet shows how the `IDXAuthenticationWrapper.revokeToken()` method is called:

```java
String accessToken = tokenResponse.getAccessToken();
// revoke access token
idxAuthenticationWrapper.revokeToken(TokenType.ACCESS_TOKEN, accessToken);
```

See [User sign-out flow (local app)](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/android/main/) for further details on the Identity Engine user sign-out flow.
