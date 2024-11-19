### Your app displays the sign-in page

When the user launches the app, it will display the sign-in page.

Build a sign-in page that captures their username and password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

Call `IDXAuthenticationWrapper.begin()` and get a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object to begin the authentication process.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

### The user submits their username and password

Create an `AuthenticationOptions` object and assign its `Username` and `Password` properties to the values entered by the user to capture their login credentials. Pass this object as a parameter to `IDXAuthenticationWrapper.authenticate()`.

```java
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.authenticate(
      new AuthenticationOptions(username, password),
      beginResponse.getProceedContext()
   );
```

### Your app processes the authentication response

`IDXAuthenticationWrapper.authenticate()` returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with an [`AuthenticationStatus`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) property indicating the status of the sign-in flow. Handle the returned `AuthenticationStatus` value accordingly:

#### Processing successful login

After the user supplies their correct password, the Java SDK will return an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS`. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

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

#### Handling other authentication statuses

The app must handle other returned [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) values in cases where the sign-in flow is unsuccessful or if additional validation is required. 

Below is an example: 

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
