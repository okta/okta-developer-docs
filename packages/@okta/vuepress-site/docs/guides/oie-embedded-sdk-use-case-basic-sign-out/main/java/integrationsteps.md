## Integration steps

### Step 1: Create a sign out UI element

The first step is to create a link, button, or other similar UI element that allows the user to sign out of the app.

<div class="common-image-format">

![Displays a Sign out button](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-out-link.png)

</div>

### Step 2: Revoke access token

When the sign-out request is initiated, create the following flow:

1. Obtain the access token from the active session state.

1. Call the [`IDXAuthenticationWrapper.revoketoken()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L497) method, passing in the access token obtained from the previous step.

1. Invalidate the current session.

```java
   ...
    public String logout(final HttpSession session) {
        logger.info(":: Logout ::");

        // retrieve access token
        TokenResponse tokenResponse =
                (TokenResponse) session.getAttribute("tokenResponse");

        if (tokenResponse != null) {
            String accessToken = tokenResponse.getAccessToken();
            // revoke access token
            logger.info("Revoking access token");
            idxAuthenticationWrapper.revokeToken(TokenType.ACCESS_TOKEN, accessToken);
        }

        // invalidate session
        session.invalidate();
        return "redirect:/";
    }
    ...
```

### Step 3: Send user to the signed out page

After the access token is revoked and the session is no longer valid, redirect the user to the signed-out page.
