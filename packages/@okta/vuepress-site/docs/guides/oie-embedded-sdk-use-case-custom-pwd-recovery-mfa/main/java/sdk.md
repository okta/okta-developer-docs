### 1: Start password recovery

The user starts the password recovery flow by completing these steps:

1. Click the **Forgot Password?** link on the sign-in page.
2. Enter their **Email or Username** in the dialog and then clicks **Next**.
3. Choose **Email** as the authenticator they want to use for password recovery and clicks **Submit**.

After the user completes these steps, Okta verifies that an account exists for the user using the information they entered in step 2 above. If the account exists, Okta then sends a recovery email that matches the Forgot Password template that was altered earlier to the associated email address.

<div class="common-image-format">

![Example of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png "Password recovery email")

</div>

The email's **Reset Password** link includes the `otp` and `request.relayState` variables sent back as query parameters to the application. For instance, the URL in the email template,  `http://localhost:8080/magic-link/callback?otp=${oneTimePassword}&state=${request.relayState}`, might be rendered as `http://localhost:8080/magic-link/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32` in the email sent to the user.

### 2: Handle the OTP and state parameters

Create a mapping that maps a request for the magic link URL to a method that takes the `otp` and `state` parameters from the query string, and makes the following checks:

1. That `otp` and `state` are not `null`.
2. That `state` matches the state stored in the current `ProceedContext` session variable.

If either check returns false, throw an error.

```java
@RequestMapping(value = {"magic-link/callback"}, method = RequestMethod.GET)
public ModelAndView displayIndexOrHomePage(
    final @RequestParam(name = "state", required = false) String state,
    final @RequestParam(name = "otp", required = false) String otp,
    final HttpSession session) 
{
    ProceedContext proceedContext = 
        (ProceedContext)session.getAttribute("proceedContext");

    // correlate received state with the client context
    if (Strings.hasText(otp) && proceedContext != null &&
        (Strings.isEmpty(state) || 
         !state.equals(proceedContext.getClientContext().getState())))
    {
        ModelAndView mav = new ModelAndView("error");
        mav.addObject("errors", 
            "Could not correlate client context with the received state value " +
            state + " in callback");
        return mav;
    }
```

If `ProceedContext` is `null` (because the user clicked the magic link from a different browser), advise the user to return to the original tab in the browser, where they requested the password reset, and enter the OTP to proceed.

```java
    AuthenticationResponse authenticationResponse;

    if (Strings.hasText(otp))
    {
        if (proceedContext == null)
        {
            // user has clicked magic link in a different browser
            ModelAndView mav = new ModelAndView("info");
            mav.addObject("message", "Please enter OTP " + otp +
                " in the original browser tab to finish the flow.");
            return mav;
        }
```

If `otp`, `state` and `ProceedContext` are valid and not `null`, call `IDXAuthenticationWrapper.verifyAuthenticator()`, using the `verifyAuthenticatorOptions` parameter to pass in the `otp` value.

```java
        VerifyAuthenticatorOptions verifyAuthenticatorOptions = 
            new VerifyAuthenticatorOptions(otp);
        authenticationResponse = authenticationWrapper
            .verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
        return responseHandler
            .handleKnownTransitions(authenticationResponse, session);
    }

    // In unhandled case, return to index
    return new ModelAndView("index");
}
```

### 3: Handle the response from the recovery flow

If the `otp` and `state` values are valid, Okta verifies that a password recovery is in progress and returns a status of `AWAITING_PASSWORD_RESET`. This status indicates that you can redirect the user to your password reset page.

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

Display the password reset page and continue the password recovery flow described in the [User password recovery summary of steps](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/java/main/#summary-of-steps).

<div class="common-image-format">

![Screenshot of password reset page](/img/advanced-use-cases/java-custom-pwd-recovery-custom-sdk-reset-pwd-page.png "Password Reset Page")

</div>
