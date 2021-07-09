## Integration steps

### Step 1: Build a sign-in page on the client

Build a sign-in page that captures both the user's name and password.

Example:

<div class="common-image-format">

![Sign in screenshot](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign in screenshot")

</div>

### Step 2: Authenticate user credentials

When the user initiates the sign in (for example, **Continue** button click), create
an `AuthenticationOptions` object and set its `username` and `password`
properties to the values entered by the user. Send this object to the
`IDXAuthenticationWrapper`'s `authenticate` method.

```java
AuthenticationResponse authenticationResponse =
                idxAuthenticationWrapper.authenticate(new AuthenticationOptions(username, password), beginResponse.getProceedContext());
```

### Step 3: Handle the response from the sign in

Depending on the `AuthenticationResponse.AuthenticationStatus` value, you need to handle the response accordingly:

#### Success status

For a successful user sign in (`AuthenticationStatus.Success`), use the `getTokenResponse` method to retrieve the token and proceed to process the authenticated user request.

For example:

```java
    ...
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
    ...
```

#### Other status

You need to handle other returned `AuthenticationStatus` cases if the user didn't sign in successfully.

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

### Step 4: Get user profile information-optional

Optionally, you can obtain basic user information after a successful user
sign in by making a request to Okta's Open ID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/java/main/#getuserprofileinfo).
