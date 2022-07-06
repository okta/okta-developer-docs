### 1: Build a sign-in form

Build a sign-in form that captures both the username and password. For example:

<div class="half">

![Displays the simple sign-in form for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-java.png)

</div>

### 2: Authenticate the user credentials

Begin the authentication process by calling the Java SDK `IDXAuthenticationWrapper.begin()` method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

After the user submits their credentials, call `IDXAuthenticationWrapper.authenticate()` with the credential values.

```java
AuthenticationResponse authenticationResponse =
                idxAuthenticationWrapper.authenticate(new AuthenticationOptions(username, password), beginResponse.getProceedContext());
```

### 3: Handle the response from Okta and the SDK

The `IDXAuthenticationWrapper.authenticate()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with an [`AuthenticationStatus`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java). Handle the returned `AuthenticationStatus` value accordingly.

#### Success status

If the Java SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS`, then the user is successfully signed in. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

> **Note:** You can obtain basic user information after the user is authenticated by making a request to Okta's Open ID Connect authorization server. See [Get the user profile information](#get-the-user-profile-information).

#### Other authentication statuses

You need to handle other returned `AuthenticationStatus` cases if there are additional actions to perform.

For example:

```java
    ...
        switch (response.getAuthenticationStatus()) {
            case AWAITING_PASSWORD_RESET:
                return registerPasswordForm("Reset Password");
            case PASSWORD_EXPIRED:
                return registerPasswordForm("Password Expired");
            case AWAITING_AUTHENTICATOR_SELECTION:
            case AWAITING_AUTHENTICATOR_VERIFICATION_DATA:
                return selectAuthenticatorForm(response, "Select Authenticator", session);
            case AWAITING_AUTHENTICATOR_VERIFICATION:
                return verifyForm();
            case AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION:
                return selectAuthenticatorForm(response, "Enroll Authenticator", session);
            default:
                return unsupportedPolicy();
        }
    ...
```

#### Failed authentication

There is no explicit failed status from `AuthenticationStatus`. Check the response handler for an error in `AuthenticationResponse` for failed authentication, and handle the flow accordingly. For example:

```java
if (responseHandler.needsToShowErrors(authenticationResponse)) {
    ModelAndView modelAndView = new ModelAndView("redirect:/login");
    modelAndView.addObject("errors", authenticationResponse.getErrors());
    return modelAndView;
}
```
