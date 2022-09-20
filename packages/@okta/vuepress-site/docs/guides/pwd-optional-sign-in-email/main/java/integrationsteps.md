### 1: Your app displays the sign-in page

Create a sign-in page that captures the user's username.

<div class="half border">

![Screenshot showing a sign-in page with a username field and a Next button.](/img/pwd-optional/pwd-optional-sign-in-page.png)

</div>

> **Note**: The account's username is also its primary email address.

### 2: The user submits their username

When the user submits their username, create an `AuthenticationOptions` object and assign its `username` property to the value entered by the user. Pass this object as a parameter to `IdxAuthenticationWrapper.authenticate()`.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin(constructRequestContext());
ProceedContext proceedContext = beginResponse.getProceedContext();
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.authenticate(new AuthenticationOptions(username), proceedContext);
```

### 3. The user verifies their identity with the email authenticator

`authenticate()` returns an `AuthenticationResponse` object. Query its `AuthenticationStatus` property to discover the current status of the authentication process. A status of `AWAITING_AUTHENTICATOR_VERIFICATION` indicates that the user needs to verify their identity with the email authenticator challenge.

```java
switch (response.getAuthenticationStatus()) {
   case AWAITING_AUTHENTICATOR_VERIFICATION:
       return verifyForm(response);

   // other case statements

   default:
       return unsupportedPolicy();
}
```

The email authenticator supports user verification by One-Time Password (OTP) and by magic links. To learn more, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/java/main/#integrate-email-challenge-with-magic-links).

### 4. Your app handles an authentication success response

After the user verifies their identity using the email authenticator, the current status of the authentication process is now `Success`. Call `AuthenticationResponse.getTokenResponse()` to retrieve the user's OIDC claims information and pass it into your application. The user has now signed in. Store these tokens for future requests and redirect the user to the default page.

> **Note:** In cases where additional sign-in authenticators are required, the user needs to choose and verify all required authenticators before Identity Engine returns an `AuthenticationStatus` equal to `SUCCESS`.
