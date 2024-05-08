### The user launches the sign-in page

Build a sign-in page where users input their username and password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

Begin the authentication process by calling `IDXAuthenticationWrapper.begin()` and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

### The user submits their username and password

When the user submits their username and password, create an `AuthenticationOptions` object and assign its `Username` and `Password` properties to the values entered by the user. Pass this object as a parameter to `IDXAuthenticationWrapper.authenticate()`.

```java
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.authenticate(
      new AuthenticationOptions(username, password),
      beginResponse.getProceedContext()
   );
```

### Your app handles an authentication success response

`IDXAuthenticationWrapper.authenticate()` returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with an [`AuthenticationStatus`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) property indicating the current state of the sign-in flow. Handle the returned `AuthenticationStatus` value accordingly:

#### Success status

If the Java SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS`, then the user is successfully signed in. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

```java
public ModelAndView handleTerminalTransitions(AuthenticationResponse response, HttpSession session) {
   Util.updateSession(session, response.getProceedContext());
   if (response.getTokenResponse() != null) {
      return homeHelper.proceedToHome(response.getTokenResponse(), session);
   }

   if (response.getAuthenticators() == null && response.getErrors().size() > 0) {
      ModelAndView modelAndView = new ModelAndView("error");
      modelAndView.addObject("errors", response.getErrors());
      return modelAndView;
   }

   if (response.getAuthenticationStatus() == SKIP_COMPLETE) {
      ModelAndView modelAndView = homeHelper.proceedToHome(response.getTokenResponse(), session);
      modelAndView.addObject("info", response.getErrors());
      return modelAndView;
   }
   return null;
}
```

#### Other authentication statuses

Handle other returned [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) cases if there are other factors to verify. For example:

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

There's no explicit failed status from `AuthenticationStatus`. Check the response handler for an error in `AuthenticationResponse` for failed authentication, and handle the flow accordingly. For example:

```java
if (responseHandler.needsToShowErrors(authenticationResponse)) {
    ModelAndView modelAndView = new ModelAndView("redirect:/login");
    modelAndView.addObject("errors", authenticationResponse.getErrors());
    return modelAndView;
}
```
