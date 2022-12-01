> **Note**: The examples in this guide use Java 11 and Spring Boot MVC

### 1: Your app displays the sign-in page

Create a sign-in page that captures the user's username and password:

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

> **Note**: The account's username is also its primary email address.

### 2: The user submits their username and password

When the user submits their username and password, create an `AuthenticationOptions` object and assign its `username` and `password` properties to the values entered by the user. Pass this object as a parameter to `IdxAuthenticationWrapper.authenticate()`.

```java
// Begin authentication challenge flow
AuthenticationResponse beginResponse = 
    idxAuthenticationWrapper.begin(constructRequestContext());

// Remember the user’s state
ProceedContext proceedContext = beginResponse.getProceedContext();

// set the user's credentials
AuthenticationOptions authenticationOptions =
    new AuthenticationOptions(username, password);

// submit username and password
AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.authenticate(authenticationOptions, proceedContext);
```

### 3: Your app displays a list of authenticators

`IdxAuthenticationWrapper.authenticate()` returns an `AuthenticationResponse` object. Query its `AuthenticationStatus` property to discover the current status of the authentication process. A status of `AWAITING_AUTHENTICATOR_SELECTION` indicates that the user has supplied the correct password and must select a secondary authentication factor to verify their identity.

Display all of the authenticators that the user has enrolled and are ready for use.

```java
// Update the user's state
proceedContext = authenticationResponse.getProceedContext();

// Check the current authentication status
AuthenticationStatus authenticationStatus = 
   authenticationResponse.getAuthenticationStatus();

switch (authenticationStatus) {
    case AWAITING_AUTHENTICATOR_SELECTION:
        List<Authenticator> authenticators = 
            authenticationResponse.getAuthenticators();

    // show authenticators to the user and prompt for choice

    // other case statements
}
```

You can find the names and IDs of the available authenticators in the `AuthenticationResponse` object's authenticators collection.

<div class="half wireframe-border">

![A choose your authenticator form with only an email authenticator option and a next button](/img/wireframes/choose-authenticator-form-email-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36772&t=wzNwSZkdctajVush-1 choose-authenticator-form-email-only
 -->

</div>

### 4: The user submits the email authenticator

When the user submits the email authenticator, pass the authenticator's ID as a parameter to `idxAuthenticationWrapper.selectAuthenticator()`.

```java
Authenticator authenticator =
    authenticators.get(Integer.parseInt(selection));

idxAuthenticationWrapper.selectAuthenticator(
    proceedContext, authenticator);
```

### 5: The user verifies their identity with the email authenticator

Identity Engine sends a verification email to the user if the call is successful. The returned `AuthenticationResponse` object has an `AuthenticationStatus` of `AWAITING_AUTHENTICATOR_VERIFICATION`. This status indicates that Identity Engine is waiting for the user to check their email and either click the magic link or enter the OTP.

To learn how to support verification with magic links or OTP, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/java/main/#_5-submit-the-email-authenticator).

### 6: Your app handles an authentication success response

When the user correctly verifies their identity using the email authenticator, the returned `AuthenticationResponse` object has an `AuthenticationStatus` of `SUCCESS`. Call `authenticationResponse.getTokenResponse()` to retrieve the user's OIDC claims information and pass it into your application. The user has now signed in.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions =
    new VerifyAuthenticatorOptions(code);

AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);

switch (authenticationStatus) {
    case SUCCESS:
        TokenResponse tokenResponse = authenticationResponse.getTokenResponse();
        String accessToken = tokenResponse.getAccessToken();
```

Store these tokens for future requests and redirect the user to the default page after a successful sign-in attempt.

> **Note**: You can request basic user information from Okta's OpenID Connect authorization server after a user has signed in successfully. See [Get the user profile information](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/aspnet/main/#get-the-user-profile-information).
