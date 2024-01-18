### The user clicks the sign-up link

Add a **Sign up** link to your app's sign-in page. The self-registration flow begins when the user clicks the **Sign up** link and the browser takes them to the Create Account page.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-password-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36729&t=wzNwSZkdctajVush-1 sign-in-form-username-password-sign-up-forgot-your-password-links
 -->

</div>

> **Note**: The account's username is also its email address.

Create a page for the user to enter their basic profile information: their email, first name, and family name. Call `IDXAuthenticationWrapper.begin()` to start the registration process, and then `getProceedContext()` to get the [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object that contains the current state of the authentication flow. Finally, pass `ProceedContext` as a parameter to `IDXAuthenticationWrapper.fetchSignUpFormValues()` to dynamically build the create account form:

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext beginProceedContext = beginResponse.getProceedContext();
AuthenticationResponse newUserRegistrationResponse = 
    idxAuthenticationWrapper.fetchSignUpFormValues(beginProceedContext);
```

The form should look similar to the following wireframe:

<div class="half wireframe-border">

![A sign-up form with fields for first name, family name, and email address, and a create account button](/img/wireframes/sign-up-form-first-last-name-email.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36911&t=2h5Mmz3COBLhqVzv-1  sign-up-form-first-last-name-email
 -->

</div>

### The user submits their profile data

When the user clicks **Sign Up**, create a `UserProfile` object and set its properties to the values entered by the user. Pass this object and the current `ProceeedContext` as parameters to `IDXAuthenticationWrapper.register()`.

```java
UserProfile userProfile = new UserProfile();
userProfile.addAttribute("lastName", lastname);
userProfile.addAttribute("firstName", firstname);
userProfile.addAttribute("email", email);

ProceedContext proceedContext = newUserRegistrationResponse.getProceedContext();

AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.register(proceedContext, userProfile);
```

`register()` returns an `AuthenticationResponse` object. Query its `AuthenticationStatus` property for the status of the registration process. A status of `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` indicates that the user must enroll an authentication factor to verify their identity.

### Display a list of required authenticators to enroll

Create a page that displays a list of required authentication factors the user can enroll to verify their identity. They must choose a factor from the list and click **Next**. If you complete the steps properly in [Configuration updates](#configuration-updates), the only required authenticator is the password factor. This is the sole factor stored in the `Authenticators` list property.

<div class="half wireframe-border">

![A choose your authenticator form with only a password authenticator option and a next button](/img/wireframes/choose-authenticator-form-password-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36946&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-password-only
 -->

</div>

This page is used several times during the registration flow. Use the response object's `Authenticators` collection to build the list. For example:

```java
public ModelAndView selectAuthenticatorForm(AuthenticationResponse response, String title, HttpSession session) {
   boolean canSkip = authenticationWrapper.isSkipAuthenticatorPresent(response.getProceedContext());
   ModelAndView modelAndView = new ModelAndView("select-authenticator");
   modelAndView.addObject("canSkip", canSkip);
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
}
```

### The user enrolls their password

When the user selects the password authenticator and clicks **Next**, pass the selected authenticator and current `ProceedContext` as parameters to `IDXAuthenticationWrapper.selectAuthenticator()`.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

`selectAuthenticator()` returns an `AuthenticationResponse` object with an `AuthenticationStatus` of `AWAITING_AUTHENTICATOR_VERIFICATION`. This indicates that the new user needs to verify the authenticator. In this case, this means the user needs to supply a new password.

Create a page that allows the user to supply a new password for verification. For example:

<div class="half wireframe-border">

![A set password form with two fields to enter and to confirm a password and a submit button](/img/wireframes/set-password-form-new-password-fields.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36973&t=2h5Mmz3COBLhqVzv-1 set-password-form-new-password-fields
 -->

</div>

When the user submits their new password, create a `VerifyAuthenticatorOptions` object that contains the new password. Pass this object as a parameter to `IDXAuthenticationWrapper.verifyAuthenticator()`.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions =
   new VerifyAuthenticatorOptions(newPassword);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

### Display a list of optional authenticators to enroll

`verifyAuthenticator()` returns an `AuthenticationResponse` object with an `AuthenticationStatus` property of `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION`. This indicates that the user still has authentication factors to enroll before registration is complete.

In this scenario, you configure the app's authentication policy to require a password and another factor. Therefore, the user must enroll at least one of either the email or phone factors. Redirect them to the list page you created earlier to choose which one.

<div class="half wireframe-border">

![A choose your authenticator form with email and phone authenticator options and a next button](/img/wireframes/choose-authenticator-form-email-phone.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37020&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-email-phone
 -->

</div>

### The user submits the email authenticator

If the user chooses and submits the email authenticator, pass the selected authenticator and current `ProceedContext` as parameters to `IDXAuthenticationWrapper.selectAuthenticator()`.

```java
authenticationResponse = 
   idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

### Display OTP input page

If the call is successful, a one-time passcode (OTP) is sent to the user's email. The returned `AuthenticationResponse` object has an `AuthenticationStatus` of `AWAITING_AUTHENTICATOR_VERIFICATION`. This status indicates that Identity Engine is waiting for the user to check their email and enter the OTP.

Build a form that allows the user to enter the OTP sent to them by email.

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--
   Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

### The user submits the OTP

The user opens the email and copies the OTP into the form. When the user submits the OTP, create a `VerifyAuthenticatorOptions` object that contains the OTP. Pass this object as a parameter to `IDXAuthenticationWrapper.verifyAuthenticator()`:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions =
   new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

### Display a second list of optional authenticators to enroll

`verifyAuthenticator()` returns an `AuthenticationResponse` object with an `AuthenticationStatus` property of `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION`. This indicates that the user still has authentication factors to enroll before registration is complete.

Redirect the user to the list page you created earlier to choose another authentication factor. The code is the same. The page should show only the phone factor. However, since this factor is optional and the user has now enrolled two factors, the `canSkip` property populated by `isSkipAuthenticatorPresent()` is now `true` meaning that the list page should now also display a **Skip** button.

<div class="half wireframe-border">

![A choose your authenticator form with only a phone authenticator option, and next and skip buttons](/img/wireframes/choose-authenticator-form-phone-only-with-skip.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37043&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-phone-only-with-skip
 -->

</div>

The user can either enroll in or skip the phone factor. Your code should handle both scenarios as follows.

### The user enrolls the phone authenticator

#### The user submits the phone authenticator

If the user submits the phone authenticator, pass the selected authenticator and the current `ProceedContext` as parameters to `IDXAuthenticationWrapper.selectAuthenticator()`.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

#### Display phone number input page

The returned `EnrollResponse` object has an `AuthenticationStatus` of `AWAITING_AUTHENTICATOR_ENROLLMENT_DATA`. This status indicates that Identity Engine is waiting for the user for more data before the factor can be enrolled. In this case, the user needs to supply a phone number and a phone verification method.

Build a form that allows the user to enter their phone number and a second form to select a phone verification method.

<div class="half wireframe-border">

![A form with a field for a phone number, formatting advice, and a next button](/img/wireframes/enter-phone-number-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37078&t=2h5Mmz3COBLhqVzv-1 enter-phone-number-form
 -->

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

<div class="half wireframe-border">

![A choose your phone verification method form with SMS and voice options and a next button](/img/wireframes/choose-phone-verification-method-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37129&t=vr9MuCR8C4rCt3hC-1 choose-phone-verification-method-form
 -->

</div>

#### The user submits their phone information

When the user submits their phone number and verification method, pass this information and the current `ProceedContext` object as parameters to `IDXAuthenticationWrapper.submitPhoneAuthenticator()`.

```java
ProceedContext proceedContext = Util.getProceedContextFromSession(session);

AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.submitPhoneAuthenticator(proceedContext,
         phone, getFactorFromMethod(session, mode));
```

#### Display SMS OTP input page

If the call is successful, your SMS provider sends a one-time passcode (OTP) in an SMS to the user's mobile phone. The returned `AuthenticationResponse` object has an `AuthenticationStatus` of `AWAITING_AUTHENTICATOR_VERIFICATION`. This status indicates that Identity Engine is waiting for the user to check their email and enter the OTP.

Build a form that allows the user to enter the OTP sent to them by SMS. Depending on your implementation, the page can be the same page that verifies the email code. The sample app reuses the same page for both email and phone verification.

<div class="half wireframe-border">

![A form with a field for a verification code, a note to find the code in an SMS, and a submit button](/img/wireframes/enter-verification-code-form-with-sms-message.png)

   <!--
   Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37154&t=vr9MuCR8C4rCt3hC-1 enter-verification-code-form-with-sms-message
   -->

</div>

#### The user submits the SMS OTP

The user checks their phone and copies the OTP into the form. When the user submits the OTP, create a `VerifyAuthenticatorOptions` object that contains the OTP. Pass this object as a parameter to `IDXAuthenticationWrapper.verifyAuthenticator()`.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions =
   new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

#### Complete registration

If the SMS OTP is valid, the returned response object has an `AuthenticationStatus` of `Success`. This status signifies that no more factors (required or optional) are waiting to be enrolled and verified.

The user is now registered with no more factors to be verified. Store the returned tokens in a session and redirect the user to the app's default signed-in page. Call `AuthenticationResponse.getTokenResponse()` to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

### The user skips the phone authenticator

If the user skips phone enrollment, call `IDXAuthenticationWrapper.skipAuthenticatorEnrollment()`. This skips the authenticator enrollment and eliminates the need to verify the factor:

```java
if ("skip".equals(action)) {
   logger.info("Skipping {} authenticator", authenticatorType);
   authenticationResponse = idxAuthenticationWrapper.skipAuthenticatorEnrollment(proceedContext);
   return responseHandler.handleKnownTransitions(authenticationResponse, session);
}
```

If the returned response object has an `AuthenticationStatus` of `SUCCESS`, the user is now registered with no more factors to be verified. Redirect the user to the app's default signed-in page. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.
