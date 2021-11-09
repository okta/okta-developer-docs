### Okta Authentication SDK authentication flow for basic sign-out

Sign-out for a Classic Engine Java Auth SDK app typically involves deleting any persistent session storage and redirecting the user to a sign-out page:

```java
public String logout(final HttpSession session) {

    // invalidate session
    session.invalidate();
    return "redirect:/";
}
```

### Okta Identity Engine SDK authentication flow for basic sign-out

The Identity Engine Java SDK contains a revoke option in the wrapper client to revoke the access token in Okta. This step is required since the user is authorized by an Okta authorization server.
The following code snippet shows how the `IDXAuthenticationWrapper.revokeToken()` method is called:

```java
 public String logout(final HttpSession session) {

    // retrieve access token
    TokenResponse tokenResponse =
            (TokenResponse) session.getAttribute("tokenResponse");

    if (tokenResponse != null) {
        String accessToken = tokenResponse.getAccessToken();
        // revoke access token
        idxAuthenticationWrapper.revokeToken(TokenType.ACCESS_TOKEN, accessToken);
    }

    // invalidate session
    session.invalidate();
    return "redirect:/";
}
```

See [User sign out (local app)](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/java/main/) for further details on the Identity Engine user sign-out.
