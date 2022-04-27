### 1: Start password recovery

To begin the password recovery flow, the user must

1. Click the **Forgot Password?** link on the sign-in page.
2. Enter their **Email or Username** in the box and click **Next**.
3. Choose **Email** as the authenticator they want to use for password recovery and click **Submit**.

Okta then sends the user an email that matches the Forgot Password template you altered earlier. This follows the first three steps in the [User Password Recovery](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/java/main/#summary-of-steps) guide.

<div class="common-image-format">

![Screenshot of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png "Password Recovery Email")

</div>

The **Reset Password** link in the email includes the `otp` and `request.relayState` variables as query parameters back to the application. For example,

`http://localhost:8080/magic-link/callback?otp=${oneTimePassword}&state=${request.relayState}` becomes `http://localhost:8080/magic-link/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`.

### 2: Handle the OTP and state parameters

Create a callback handler method that takes the `otp` and `state` parameters in the query string and passes them as parameters to the `IdxAuthenticationWrapper.verifyAuthenticator` method. First, check that the `otp` and `state` parameters have values. If either parameters are `null` or `state` does not match the state stored in the current `ProceedContext` session variable, throw an error.

```java
@RequestMapping(value = {"magic-link/callback"}, method = RequestMethod.GET)
public ModelAndView displayIndexOrHomePage(
    final @RequestParam(name = "state", required = false) String state,
    final @RequestParam(name = "otp", required = false) String otp,
    final HttpSession session) {

    ProceedContext proceedContext = (ProceedContext) session.getAttribute("proceedContext");

    // correlate received state with the client context
    if (Strings.hasText(otp) && proceedContext != null &&
       (Strings.isEmpty(state) || !state.equals(proceedContext.getClientContext().getState())))
    {
        ModelAndView mav = new ModelAndView("error");
        mav.addObject("errors", "Could not correlate client context with the received state value " + state + " in callback");
        return mav;
    }
```

If `ProceedContext` is `null` (because the user is clicking the magic link in a different browser), advise the user to return to the original tab in the browser where they requested a password reset and enter the OTP value to proceed.

```java
    AuthenticationResponse authenticationResponse;

    if (Strings.hasText(otp)) {
        if (proceedContext == null) {
            // user has clicked magic link in a different browser
            ModelAndView mav = new ModelAndView("info");
            mav.addObject("message", "Please enter OTP " + otp + " in the original browser tab to finish the flow.");
            return mav;
        }
```

If `otp`, `state` and `ProceedContext` are valid and not `null`, call `IDXAuthenticationWrapper.verifyAuthenticator`, using its `verifyAuthenticatorOptions` parameter to pass in the `otp` value.

```java
        VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(otp);
        authenticationResponse = authenticationWrapper
                .verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
        return responseHandler.handleKnownTransitions(authenticationResponse, session);
    }

    // In unhandled case, return to index
    return new ModelAndView("index");
}
```

### 3: Handle the response from the recovery flow

If the `otp` and `state` values are valid, Okta verifies that there is a password recovery in progress and returns a status of `AWAITING_PASSWORD_RESET`. This indicates that you can redirect the user to your password reset page.

```java
public ModelAndView handleKnownTransitions(
    AuthenticationResponse response, HttpSession session)
{
    ModelAndView terminalModelAndView = handleTerminalTransitions(response, session);
    if (terminalModelAndView != null) {
        return terminalModelAndView;
    }

    switch (response.getAuthenticationStatus()) {
        case AWAITING_PASSWORD_RESET:
            return registerPasswordForm("Reset Password");

        // other case statements
    }
}

```

### 4: Display password reset page and continue the password recovery flow

Display the password reset page and continue the password recovery flow described in the [User password recovery guide](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/java/main/).

<div class="common-image-format">

![Screenshot of password reset page](/img/advanced-use-cases/java-custom-pwd-recovery-custom-sdk-reset-pwd-page.png "Password Reset Page")

</div>
