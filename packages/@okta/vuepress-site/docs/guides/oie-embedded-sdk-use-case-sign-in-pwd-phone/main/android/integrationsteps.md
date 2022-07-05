### 1: The user initiates the sign-in flow

Build a sign-in form for your app that captures both the username and password.

<div class="half">

![Displays the Java SDK sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-java.png)

</div>

Begin the authentication process by calling the Java SDK's `IDXAuthenticationWrapper.begin()` method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```kotlin
val beginResponse = idxAuthenticationWrapper.begin()
val proceedContext = beginResponse.proceedContext
```

### 2: The user enters their credentials

After the user enters their credentials, call `IDXAuthenticationWrapper.authenticate()` with the credential values.

```kotlin
val authenticationResponse =
     idxAuthenticationWrapper.authenticate(AuthenticationOptions(username, password), proceedContext)
```

If the password is validated, the `IDXAuthenticationWrapper.authenticate()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with the following properties:

* `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` &mdash; This status indicates that there are required authenticators that need to be enrolled.

* `Authenticators` &mdash; List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) to be enrolled (in this case, there is only the phone authenticator). <br>
    Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

> **Note:** If the user already has the phone authenticator enrolled, then `AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` is returned (instead of `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION`), and the user doesn't have to enroll the phone authenticator with a phone number, bypassing steps [3](#_3-the-user-selects-the-phone-authenticator), [4](#_4-the-user-enters-their-phone-number), and [4 (voice feature alternative)](#_4-voice-feature-alternative-the-user-enters-the-phone-number-and-selects-the-phone-factor-method).

After receiving the `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of authenticators to be enrolled, provide the user with a form to select the authenticator to enroll. In the following example, phone is the only authenticator:

<div class="half">

![Displays the enroll phone authenticator selection form for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-phone-enroll-phone-java.png)

</div>

> **Tip:** Build a generic authenticator selection form to handle single or multiple authenticators returned from the SDK.

### 3: The user selects the phone authenticator

In this use case, the user selects **Phone** as the authenticator to enroll. Pass this selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator)
```

The response from this request is an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_DATA`. This status indicates that the user needs to provide additional authenticator information. In the case of the phone authenticator, the user needs to specify a phone number.

You need to build a form to capture the user's phone number in your app. For example:

<div class="half">

![Displays the Java SDK's phone number input form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-in-pwd-phone-numberscreen-java.png)

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

If your org is enabled with the voice feature, you need to add an additional form to select the voice or the SMS factor as the phone verification method. See [Step 4 (voice feature alternative)](#_4-voice-feature-alternative-the-user-enters-the-phone-number-and-selects-the-phone-factor-method) for details.

### 4: The user enters their phone number

This step assumes that the voice feature isn't enabled in your org. The phone verification code is sent through SMS automatically.

When the user submits their phone number, capture this information and pass it to the `IDXAuthenticationWrapper.verifyAuthenticator()` method. In the following code example, the user's phone number is encapsulated in the `verifyAuthenticatorOptions` object:

```kotlin
val authenticationResponse =
    idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

The Java SDK sends the phone authenticator data to Okta. Okta processes the request and sends an SMS code to the specified phone number. After the SMS code is sent, Okta sends a response to the SDK, which returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your client app. This status indicates that the user needs to provide the verification code for the phone authenticator.

You need to build a form to capture the user's SMS verification code. For example:

<div class="half">

![Displays the verification code input form for the Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-in-pwd-phone-verify-email-code-java.png)

</div>

### 4 (voice feature alternative): The user enters the phone number and selects the phone factor method

This step assumes that your org is enabled with the voice feature.

You need to build a form to capture the user's phone number as well as a subsequent form for the user to select their phone verification method (either SMS or voice).

<div class="half">

![Displays the Java SDK's enroll phone number authenticator form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num-java.png)

</div>

<div class="half">

![Displays the Java SDK's phone factor (SMS or voice) form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-mode-java.png)

</div>

After the user enters their phone number and selects a method to receive the verification code, capture this information and send it to the `IDXAuthenticationWrapper.submitPhoneAuthenticator()` method. For example:

```kotlin
val authenticationResponse =
   idxAuthenticationWrapper.submitPhoneAuthenticator(proceedContext, phone, factor)
```

The Java SDK sends the phone authenticator data to Okta. Okta processes the request and sends a code to the specified phone number. After the code is sent, Okta sends a response to the SDK, which returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your client app. This status indicates that the user needs to provide the verification code for the phone authenticator.

> **Note:** If the user selects **Voice** as the phone verification method, Okta sends an automated voice message with the verification code to the specified phone.

You need to build a form to capture the user's verification code.

### 5: The user enters the verification code

The user receives the code on their phone and submits it in the verification code form. Send this code to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```kotlin
val verifyAuthenticatorOptions = VerifyAuthenticatorOptions(code)
val authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

If the request to verify the code is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS`, and the user is successfully signed in. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.
