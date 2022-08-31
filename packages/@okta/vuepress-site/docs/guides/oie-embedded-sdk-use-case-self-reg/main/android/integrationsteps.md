### 1: Register new users

The self-registration flow begins when the user clicks the **Sign up** link on your app's sign-in page. Create a **Sign up** link that directs the user to a create account form, such as the following example:

<div class="half">

![Displays the sign-in form for Java SDK with a 'Sign up' link](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-sign-up-java.png)

</div>

You need to create a form to capture the user's new account details, such as the following example:

<div class="half">

![Displays the Create Account form for Java SDK with first name, last name, and email fields](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-create-java.png)

</div>

Begin the authentication process by calling the Java SDK's [`IDXAuthenticationWrapper.begin()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java) method.

```kotlin
val beginResponse = idxAuthenticationWrapper.begin()
```

After the authentication transaction begins, you need to call `getProceedContext()` to get the [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object that contains the current state of the authentication flow, and pass it as a parameter in an `IDXAuthenticationWrapper.fetchSignUpFormValues()` call to dynamically build the create account form:

```kotlin
val beginProceedContext = beginResponse.getProceedContext()
val newUserRegistrationResponse = idxAuthenticationWrapper.fetchSignUpFormValues(beginProceedContext)
```

> **Note:** `IDXAuthenticationWrapper.fetchSignUpFormValues()` allows you to build the create account form dynamically from the required form values using `AuthenticationResponse#getFormValues`.

### 2: The user enters their profile data

Enroll the user with basic profile information captured from the create account form by calling the `IDXAuthenticationWrapper.register()` method.

```kotlin
val userProfile = UserProfile()
userProfile.addAttribute("lastName", lastname)
userProfile.addAttribute("firstName", firstname)
userProfile.addAttribute("email", email)

val proceedContext = newUserRegistrationResponse.getProceedContext()

val authenticationResponse = idxAuthenticationWrapper.register(proceedContext, userProfile)
```

### 3: Display the enrollment authenticators

After you've configured your org and app with instructions from [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/android/main/#set-up-your-okta-org-for-a-multifactor-use-case), your app is configured with **Password** authentication, and additional **Email** or **Phone** authenticators. Authenticators are the factor credentials, owned or controlled by the user, that can be verified during authentication.

This step contains the request to enroll a password authenticator for the user.

After the initial register request, `IDXAuthenticationWrapper.register()` returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object that contains the following properties:

1. `AuthenticationStatus` = `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` <br>
   This status indicates that there are required authenticators that need to be verified.

2. `Authenticators` = List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) (in this case, there is only the password authenticator). <br>

   ```kotlin
   val authenticators = authenticationResponse.authenticators
   ```

After receiving the `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of authenticators, you need to provide the user with a form to select the authenticator to enroll. In the following example, there is only one password authenticator to enroll:

<div class="half">

![Displays the Java SDK authenticator enrollment form with one 'Password' authenticator](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-password-java.png)

</div>

### 4: The user selects the authenticator to enroll

Pass the user-selected authenticator (in this case, the password authenticator) to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator)
```

This request returns an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION`. You need to build a form for the user to enter their password in this authenticator verification step.

<div class="half">

![Displays the Java SDK password authenticator verification form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-confirm-password-java.png)

</div>

### 5: Verify the authenticator and display additional authenticators

After the user enters their new password, call the `IDXAuthenticationWrapper.verifyAuthenticator()` method with the user's password.

```kotlin
val verifyAuthenticatorOptions = VerifyAuthenticatorOptions(newPassword)
val authenticationResponse = idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

The request returns an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` and an `Authenticators` list that contains the email and phone factors. Reuse the authenticator enrollment form from [3: Display enrollment factors](#_3-display-the-enrollment-factors) to display the list of authenticators to the user.

<div class="half">

![Displays the Java SDK Email and Phone authenticator enrollment form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-auth-list-email-phone-java.png)

</div>

### 6: The user selects the email authenticator

In this use case, the user selects the **Email** authenticator as the authenticator to verify. Pass this user-selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator)
```

If this request is successful, a code is sent to the user's email and `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` is returned. You need to build a form to capture the code for this verification step.

<div class="half">

![Displays the Java SDK's Verify Code form for the email authenticator](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code-java.png)

</div>

> **Note:** The email sent to the user has a **Verify Email Address** link that isn't yet supported. There are two recommended options to mitigate this limitation. See [The email link to verify that the email address isn't working](/docs/guides/oie-embedded-sdk-limitations/main/#the-email-link-to-verify-that-the-email-address-isn-t-working) for details.

### 7: The user submits the email verification code

The user receives the verification code in their email and submits it in the verify code form. Use [VerifyAuthenticationOptions](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/VerifyAuthenticatorOptions.java) to capture the code and send it to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```kotlin
val verifyAuthenticatorOptions = VerifyAuthenticatorOptions(code)
val authenticationResponse =
    idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

If the request to verify the code is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` property and an `Authenticators` list that contains the phone factor. Reuse the authenticator enrollment form from [3: Display enrollment factors](#_3-display-the-enrollment-authenticators) to display the list of authenticators to the user.

Based on the configuration described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/android/main/#set-up-your-okta-org-for-a-multifactor-use-case), the app in this use case is set up to require one possession factor (either email or phone). After the email factor is verified, the phone factor becomes optional. In this step, the `isSkipAuthenticatorPresent()` function returns `TRUE` for the phone authenticator. You can build a **Skip** button in your form to allow the user to skip the optional phone factor.

If the user decides to skip the optional factor, they are considered signed in since they have already verified the required factors. See [Step 8, Option 1: The user skips the phone authenticator](#option-1-the-user-skips-the-phone-authenticator) for the skip authenticator flow. If the user decides to select the optional factor, see [Step 8, Option 2: The user selects the phone authenticator](#option-2-the-user-selects-the-phone-authenticator) for the optional phone authenticator flow.

<div class="half">

![Displays the Java SDK's phone authenticator enrollment form with Skip button](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-auth-list-phone-java.png)

</div>

### 8: Handle the phone authenticator options

#### Option 1: The user skips the phone authenticator

If the user decides to skip the phone authenticator enrollment, make a call to the `IDXAuthenticationWrapper.skipAuthenticatorEnrollment()` method. This method skips the authenticator enrollment.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.skipAuthenticatorEnrollment(proceedContext)
```

> **Note:** Ensure that `isSkipAuthenticatorPresent()=TRUE` for the authenticator before calling `skipAuthenticatorEnrollment()`.

If the request to skip the optional authenticator is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

#### Option 2: The user selects the phone authenticator

In this use case option, the user selects the optional **Phone** authenticator for verification. Pass this selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator)
```

The response from this request is an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_DATA`.

This status indicates that the user needs to provide additional authenticator information. The user must then enter their phone number and the SMS verify method is sent automatically (1), or the user enters their phone number and selects either the SMS or the Voice Verify method (2).

##### 1. The user enters their phone number and the SMS verify method is sent automatically

This step assumes that the voice feature isn't enabled in your org. The phone verification code is sent through SMS automatically.

When the user submits their phone number, capture this information and pass it to the `IDXAuthenticationWrapper.verifyAuthenticator()` method. In the following code example, the user phone number is encapsulated in the `verifyAuthenticatorOptions` object:

```kotlin
val authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

The Java SDK sends the phone authenticator data to Okta. Okta processes the request and sends an SMS code to the specified phone number. After the SMS code is sent, Okta sends a response to the SDK, which returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your client app. This status indicates that the user needs to provide the verification code for the phone authenticator.

You need to build a form to capture the user's SMS verification code. For example:

<div class="half">

![Displays the verification code input form for the Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-in-pwd-phone-verify-email-code-java.png)

</div>

##### 2. The user enters their phone number and selects either the SMS or the Voice Verify method

This step assumes that your org is enabled with the voice feature.

You need to build a form to capture the user's phone number as well as a subsequent form for the user to select their phone verification method (either SMS or voice).

<div class="half">

![Displays the Java SDK's enroll phone number authenticator form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num-java.png)

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

<div class="half">

![Displays the Java SDK's phone factor (SMS or voice) form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-mode-java.png)

</div>

When the user enters their phone number and selects a method to receive the verification code, capture this information and send it to the `IDXAuthenticationWrapper.submitPhoneAuthenticator()` method.

```kotlin
val authenticationResponse =
   idxAuthenticationWrapper.submitPhoneAuthenticator(proceedContext, phone, factor)
```

The Java SDK sends the phone authenticator data to Okta. Otka processes the request and sends a code to the specified phone number. After the code is sent, Okta sends a response to the SDK that returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your app. This status indicates that the user needs to provide the verification code for the phone authenticator.

> **Note:** If the user selects **Voice** as the phone verification method, Okta sends an automated voice message with the verification code to the specified phone.

You need to build a form to capture the user's verification code.

##### The user submits the SMS verification code

The user receives the verification code as an SMS on their phone and submits it in the verify code form. Send this code to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```kotlin
val verifyAuthenticatorOptions = VerifyAuthenticatorOptions(code)
val authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

If the request to verify the code is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

#### Resend the code

Sometimes the user needs to have the code resent. To implement that functionality, use the following:

```kotlin
 val response = authenticationWrapper.resend(proceedContext)
```
