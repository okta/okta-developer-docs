## Integration steps

### Step 1: Register new users

The self-registration flow begins when the user clicks the **Register** link on your app's sign-in page. You need to create a form for the **Register** link to capture new account parameters.

For example, the user to enters their first name, last name, and email in the following Create Account page:

<div class="common-image-format">

![Displays Create Account page for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-create-java.png)

</div>

### Step 2: User enters profile data

Begin the authentication process by calling the [`IDXAuthenticationWrapper.begin`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L603) method.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
```

After the authentication transaction begins, you need to get the `ProceedContext` and call `IDXAuthenticationWrapper.fetchSignUpFormValues`:

```java
ProceedContext beginProceedContext = beginResponse.getProceedContext();
AuthenticationResponse newUserRegistrationResponse = idxAuthenticationWrapper.fetchSignUpFormValues(beginProceedContext);
```

Enroll the user with basic profile information captured from the Create Account page by calling the `register` method.

```java
UserProfile userProfile = new UserProfile();
userProfile.addAttribute("lastName", lastname);
userProfile.addAttribute("firstName", firstname);
userProfile.addAttribute("email", email);

ProceedContext proceedContext = newUserRegistrationResponse.getProceedContext();

AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.register(proceedContext, userProfile);
```

### Step 3: Display enrollment factors

If you configured your org and app with instructions from [Set up your Okta org for multifactor use cases](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-multifactor-use-cases), your app is configured with **Password** authentication, and additional **Email** or **Phone** factors. Authenticators are the factor credentials, owned or controlled by the user that can be verified during authentication.

This step contains the request to enroll a password authenticator for the user.

After the initial register request, `IDXAuthenticationWrapper` returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with the following:

1. [`AuthenticationStatus`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) = `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` <br>
   This status indicates that there are required authenticators that needs to be verified.

2. [`Authenticators`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) = List of authenticators (in this case, there is only the password authenticator). <br>

   ```java
   List<Authenticator> authenticators = (List<Authenticator>) session.getAttribute("authenticators");
   ```

After receiving `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of authenticators, provide the user with a form to verify the required authenticators. You need to build a generic authenticator enrollment form to handle single or multiple authenticators returned from the SDK.

<div class="common-image-format">

![Enroll password form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-password-java.png "Enroll password authenticator form for Java SDK")

</div>

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

### Step 4: Enroll required authenticator

Pass the user-selected authenticator (in this case, the password authenticator) to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `selectAuthenticator` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

This request returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with  [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) = `AWAITING_AUTHENTICATOR_VERIFICATION`. You need to build a form for the user to enter their password in this authenticator verification step.

<div class="common-image-format">

![Confirm password for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-confirm-password-java.png "Verify password authenticator data sample form for Java SDK")

</div>

### Step 5: Verify authenticator and display additional factors

After the user enters their new password, call [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `verifyAuthenticator` method with the new password.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(newPassword);
AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

The response from this request is an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` and an `Authenticators` list containing email and phone factors. Reuse the authentication enrollment form from [Step 3: Display enrollment factors](#step-3-display-enrollment-factors) to display the list of factors to the user.

<div class="common-image-format">

![Authenticator list for Java](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-auth-list-email-phone-java.png "Authenticator List for Java SDK")

</div>

### Step 6: User selects email authenticator

In this use case, the user selects the **Email** factor as the authenticator to verify. Pass this user-selected authenticator to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `selectAuthenticator` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

If this request is successful, a code is sent to the user's email and `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` is returned.

You need to build a form to capture the the verification code.

<div class="common-image-format">

![Authenticator email verify for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code-java.png "Verify code sample form - email authenticator verify option for Java SDK")

</div>

> **Note:** The email sent to the user has a **Verify Email Address** link that isn't yet supported. There are two recommended options to mitigate this limitation. See [Email verify email link does not work](/docs/guides/oie-embedded-sdk-limitations/main/#email-link-to-verify-email-address-not-working) for details.

### Step 7: User submits email verification code

The user receives the verification code in their email and submits it in the verify code form. Use [VerifyAuthenticationOptions](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/VerifyAuthenticatorOptions.java) to capture the code and send it to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `verifyAuthenticator` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to verify the code is successful, the SDK returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` and an `Authenticators` list containing the phone factor. Reuse the authentication enrollment form from [Step 3: Display enrollment factors](#step-3-display-enrollment-factors) to display the list of factors to the user.

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

Based on the configuration described in [Set up your Okta org for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-multifactor-use-cases), the app in this use case is set up to require one possession factor (either email or phone). After the email factor is verified, the phone factor becomes optional. In this step, the `isSkipAuthenticatorPresent` function returns `TRUE` for the phone authenticator. You can build a **Skip** button in your form to allow the user to skip the optional phone factor. If the user decides to skip the optional factor, they are authenticated since they have already verified the required factors. See [Step 8b, Option 2: Skip phone factor](#step-8b-option-2-skip-phone-factor) for details.

<div class="common-image-format">

![Enroll phone form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-auth-list-phone-java.png
 "Enroll phone authenticator form for Java SDK")

</div>

### Step 8, Option 1: User selects phone authenticator

In this use case option, the user selects the optional **Phone** factor as the authenticator to verify. Pass this selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

The response from this request is an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_DATA`. This status indicates that the user needs to provide additional authenticator information. In the case of the phone authenticator, the user needs to specify a phone number, and whether they want to use SMS or voice as the verification method.

### Step 9, Option 1: User enters phone number and selects phone verify method

You need to build a form to capture the user's phone number as well as a subsequent form for the user to select their phone verification method (either SMS or voice).

<div class="common-image-format">

![Enroll phone number for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num-java.png
 "Displays the enroll phone number authenticator form for Java SDK")

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

<div class="common-image-format">

![Enroll phone method](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-mode-java.png
 "Displays the enroll phone method (SMS or voice) form for Java SDK")

</div>

When the user enters their phone number and selects SMS to receive the verification code, capture this information and send it to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `submitPhoneAuthenticator` method.

For example, the following code snippet passes the `phone` and `mode` variables to `idxAuthenticationWrapper.submitPhoneAuthenticator`:

```java
ProceedContext proceedContext = Util.getProceedContextFromSession(session);

AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.submitPhoneAuthenticator(proceedContext,
         phone, getFactorFromMethod(session, mode));
```

The Java SDK sends the phone authenticator data to Okta. Otka processes the request and sends an SMS code to the specified phone number. After the SMS code is sent, Okta sends a response to the SDK, which returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION`. This status indicates that the user needs to provide the verification code for the phone authenticator.

You need to build a form to capture the user's SMS verification code. You can reuse the verification code form similar to [Step 6: User selects email authenticator](#step-6-user-selects-email-authenticator).

### Step 10, Option 1: User submits SMS verification code

The user receives the verification code as an SMS on their phone and submits it in the verify code form. Send the code to [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java)'s `verifyAuthenticator` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to verify the code is successful, the SDK returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in.

Use the `AuthenticationResponse.getTokenResponse` method to retrieve a token to access user profile data before redirecting the user to the default signed-in page. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/java/main/#get-user-profile-information-after-sign-in) for details.

### Step 8b, Option 2: Skip phone factor

If the user decides to skip the phone factor enrollment, make a request to  `IDXAuthenticationWrapper.skipAuthenticatorEnrollment`. This method skips the authenticator enrollment.

```java
if ("skip".equals(action)) {
   logger.info("Skipping {} authenticator", authenticatorType);
   authenticationResponse = idxAuthenticationWrapper.skipAuthenticatorEnrollment(proceedContext);
   return responseHandler.handleKnownTransitions(authenticationResponse, session);
}
```

> **Note:** Ensure that the `isSkipAuthenticatorPresent` is checked for the authenticator before `skipAuthenticatorEnrollment` is called.

If the request to skip the optional enrollment is successful, the SDK returns an [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in.

Use the `AuthenticationResponse.getTokenResponse` method to retrieve a token to access user profile data before redirecting the user to the default signed-in page. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/java/main/#get-user-profile-information-after-sign-in) for details.
