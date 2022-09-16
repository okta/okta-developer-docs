### 1: Your app displays sign-up link on sign-in page

Add a link to your app's sign-in page. When the user clicks this link, redirect them to a sign-up page where they can sign up for a new account.

<div class="half border">

![A simple sign-in page with a sign-up link.](/img/pwd-optional/pwd-optional-sign-up-link-sign-in-page.png)

</div>

### 2: Your app displays sign-up page

Create a sign-up page that captures the user's first name, last name, and email address.

<div class="half border">

![A simple sign-up page with first name, last name, and email fields, and submit button.](/img/pwd-optional/pwd-optional-sign-up-page.png)

</div>

### 3: The user submits their new account details

When the user submits their account details, call `IDXAuthenticationWrapper.begin()` to start the authentication flow and then `getProceedContext()` to retrieve its current state.

```java
val beginResponse = idxAuthenticationWrapper.begin()
val beginProceedContext = beginResponse.getProceedContext()
val newUserRegistrationResponse = idxAuthenticationWrapper.fetchSignUpFormValues(beginProceedContext)
```

Create a `UserProfile` object and assign its `firstName`, `lastName`, and `email` attributes to the values entered by the user. Pass this object as a parameter to `IDXAuthenticationWrapper.register()`.

> **Note**: The `email` property represents the account's username and primary email address.

```java
val userProfile = UserProfile()
userProfile.addAttribute("lastName", lastname)
userProfile.addAttribute("firstName", firstname)
userProfile.addAttribute("email", email)

val proceedContext = newUserRegistrationResponse.getProceedContext()
val authenticationResponse = idxAuthenticationWrapper.register(proceedContext, userProfile)
```

### 4. The user verifies their identity using the email authenticator

`register()` returns an `AuthenticationResponse` object. Query its `AuthenticationStatus` property to discover the current status of the authentication process. A status of `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` indicates that the user needs to verify their identity with the email authenticator challenge.

```java
switch (response.getAuthenticationStatus()) {
   case AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION:
        List<String> factorMethods = new ArrayList<>();
        for (Authenticator authenticator : response.getAuthenticators()) {
            for (Authenticator.Factor factor : authenticator.getFactors()) {
                factorMethods.add(factor.getMethod());
            }
        }
        session.setAttribute("authenticators", response.getAuthenticators());
        modelAndView.addObject("factorList", factorMethods);
        modelAndView.addObject("authenticators", response.getAuthenticators());
        modelAndView.addObject("title", title);
        return modelAndView;

   // other cases

   default:
       return unsupportedPolicy();
}
```

The email authenticator supports user verification by One-Time Password (OTP) and by magic links. To learn more, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/java/main/#integrate-email-challenge-with-magic-links).

### 5. Your app displays the remaining optional authenticators

After the user verifies their identity using the email authenticator, the current status of the authentication process is now `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION`. Create and display a page that lists the remaining authenticators. Call `isSkipAuthenticatorPresent()` on the current context of the flow.

```java
boolean canSkip = authenticationWrapper.isSkipAuthenticatorPresent(response.getProceedContext());
```

If `true` &mdash; and all the listed authenticators are optional &mdash; add a **Skip** button to the form to skip their enrollment. If `false`, you should omit the **Skip** button.

<div class="half border">

![A form showing a list of authenticators to enroll, and Submit, Cancel, and Skip buttons.](/img/pwd-optional/pwd-optional-sign-up-authenticators-page.png)

</div>

### 6. The user skips the remaining optional authenticators

When the user clicks the **Skip** button, call `IDXAuthenticationWrapper.skipAuthenticatorEnrollment()` method. After the user skips the remaining optional authenticators, the current status of the authentication process is now `SKIP_COMPLETE`. Call `AuthenticationResponse.getTokenResponse()` to retrieve the required access, refresh and ID tokens to pass it into your application. The user has now signed in.

```java
val authenticationResponse =
    idxAuthenticationWrapper.skipAuthenticatorEnrollment(proceedContext)

if (response.getAuthenticationStatus() == SKIP_COMPLETE) {
   ModelAndView modelAndView = homeHelper.proceedToHome(response.getTokenResponse(), session);
   modelAndView.addObject("info", response.getErrors());
   return modelAndView;
}
```

Store these tokens for future requests and redirect the user to the default page after a successful sign-up attempt. In the example above, this is achieved in [`homeHelper`](https://github.com/okta/okta-idx-java/blob/master/samples/embedded-auth-with-sdk/src/main/java/com/okta/spring/example/helpers/HomeHelper.java)`.proceedToHome()`.
