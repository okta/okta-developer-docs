### 1: Register new users

The self-registration flow begins when the user clicks the **Sign up** link on your app's sign-in page. Create a **Sign up** link that directs the user to a Create Account form, similar to the following wireframe.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-password-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36729&t=wzNwSZkdctajVush-1 sign-in-form-username-password-sign-up-forgot-your-password-links
 -->

</div>

You need to create a form to capture the user's new account details.

<div class="half wireframe-border">

![A sign-up form with fields for first name, last name, and email address, and a create account button](/img/wireframes/sign-up-form-first-last-name-email.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36911&t=2h5Mmz3COBLhqVzv-1  sign-up-form-first-last-name-email
 -->

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

After receiving the `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of authenticators, you need to provide the user with a form to select the authenticator to enroll. In the following wireframe, there is only one password authenticator to enroll.

<div class="half wireframe-border">

![A choose your authenticator form with only a password authenticator option and a next button](/img/wireframes/choose-authenticator-form-password-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36946&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-password-only
 -->

</div>

### 4: The user selects the authenticator to enroll

Pass the user-selected authenticator (in this case, the password authenticator) to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator)
```

This request returns an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION`. You need to build a form for the user to enter their password in this authenticator verification step.

<div class="half wireframe-border">

![A set password form with two fields to enter and to confirm a password and a submit button](/img/wireframes/set-password-form-new-password-fields.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36973&t=2h5Mmz3COBLhqVzv-1 set-password-form-new-password-fields
 -->

</div>

### 5: Verify the authenticator and display additional authenticators

After the user enters their new password, call the `IDXAuthenticationWrapper.verifyAuthenticator()` method with the user's password.

```kotlin
val verifyAuthenticatorOptions = VerifyAuthenticatorOptions(newPassword)
val authenticationResponse = idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

The request returns an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` and an `Authenticators` list that contains the email and phone factors.

<div class="half wireframe-border">

![A choose your authenticator form with email and phone authenticator options and a next button](/img/wireframes/choose-authenticator-form-email-phone.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37020&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-email-phone
 -->

</div>

### 6: The user selects the email authenticator

In this use case, the user selects the **Email** authenticator as the authenticator to verify. Pass this user-selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator)
```

If this request is successful, a code is sent to the user's email and `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` is returned. You need to build a form to capture the code for this verification step.

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

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

<div class="half wireframe-border">

![A choose your authenticator form with only a phone authenticator option, and next and skip buttons](/img/wireframes/choose-authenticator-form-phone-only-with-skip.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37043&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-phone-only-with-skip
 -->

</div>

### 8: Handle the phone authenticator options

#### Option 1: The user skips the phone authenticator

If the user skips the phone authenticator enrollment, make a call to the `IDXAuthenticationWrapper.skipAuthenticatorEnrollment()` method. This method skips the authenticator enrollment.

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

You need to build a form to capture the user's SMS verification code.

<div class="half wireframe-border">

![A form with a field for a verification code, a note to find the code in a SMS, and a submit button](/img/wireframes/enter-verification-code-form-with-sms-message.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37154&t=vr9MuCR8C4rCt3hC-1 enter-verification-code-form-with-sms-message
 -->

</div>

##### 2. The user enters their phone number and selects either the SMS or the Voice Verify method

This step assumes that your org is enabled with the voice feature.

You need to build a form to capture the user's phone number as well as a subsequent form for the user to select their phone verification method (either SMS or voice).

<div class="half wireframe-border">

![A form with a field for a phone number, formatting advice and a next button](/img/wireframes/enter-phone-number-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37078&t=2h5Mmz3COBLhqVzv-1 enter-phone-number-form
 -->

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

<div class="half wireframe-border">

![A choose your phone verification method form with SMS and Voice options and a next button](/img/wireframes/choose-phone-verification-method-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37129&t=vr9MuCR8C4rCt3hC-1 choose-phone-verification-method-form
 -->

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
