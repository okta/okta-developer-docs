## Integration steps

### Step 1: User initiates sign in

Build a sign-in form for your app that captures both the username and password.

<div class="common-image-format">

![Displays the Java SDK sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-java.png)

</div>

Begin the authentication process by calling the Java SDK's [`IDXAuthenticationWrapper.begin()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L603) method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

### Step 2: User enters credentials

After the user submits their credentials, call `IDXAuthenticationWrapper.authenticate()` with the credential values.

```java
AuthenticationResponse authenticationResponse =
     idxAuthenticationWrapper.authenticate(new AuthenticationOptions(username, password.toCharArray()), proceedContext);
```

If the password is validated, the `IDXAuthenticationWrapper.authenticate()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with the following properties:

* `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` &mdash; This status indicates that there are required authenticators that need to be enrolled.

* `Authenticators` &mdash; List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) to be enrolled (in this case, there is only the phone authenticator). <br>
    Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

> **Note:** If the user already has the phone authenticator enrolled, then `AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` is returned (instead of `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION`) and the user does not have to enroll the phone authenticator with a phone number, bypassing steps [3](#step-3-user-selects-phone-authenticator), [4](#step-4-user-enters-phone-number), and [4 (voice feature alternative)](#step-4-voice-feature-alternative-user-enters-phone-number-and-phone-factor-method).

After receiving the `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of authenticators to be enrolled, provide the user with a form to select the authenticator to enroll. In the following example, phone is the only authenticator:

<div class="common-image-format">

![Displays the enroll phone authenticator selection form for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-phone-enroll-phone-java.png)

</div>

> **Tip:** Build a generic authenticator selection form to handle single or multiple authenticators returned from the SDK.

### Step 3: User selects phone authenticator

In this use case, the user selects **Phone** as the authenticator to enroll. Pass this selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

The response from this request is an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_DATA`. This status indicates that the user needs to provide additional authenticator information. In the case of the phone authenticator, the user needs to specify a phone number.


You need to build a form to capture the user's phone number in your app. For example:

<div class="common-image-format">

![Displays the Java SDK's phone number input form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-in-pwd-phone-numberscreen-java.png)

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

If your org is enabled with the voice feature, you will need to add an additional form to select voice or SMS factor as the phone verification method. See [Step 4 (voice feature alternative)](#step-4-voice-feature-alternative-user-enters-phone-number-and-phone-factor-method) for details.

### Step 4: User enters phone number

This step assumes that the voice feature isn't enabled in your org. The phone verification code is sent through SMS automatically.

When the user submits their phone number, capture this information and pass it to the [`IDXAuthenticationWrapper.verifyAuthenticator()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L368) method. In the following code example, the user phone number is encapsulated in the `verifyAuthenticatorOptions` object:

```java
AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

The Java SDK sends the phone authenticator data to Okta. Okta processes the request and sends an SMS code to the specified phone number. After the SMS code is sent, Okta sends a response to the SDK, which returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your client app. This status indicates that the user needs to provide the verification code for the phone authenticator.

You need to build a form to capture the user's SMS verification code. For example:

<div class="common-image-format">

![Displays the verification code input form for the Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-in-pwd-phone-verify-email-code-java.png)

</div>

### Step 4 (voice feature alternative): User enters phone number and phone factor method

This step assumes that your org is enabled with the voice feature.

You need to build a form to capture the user's phone number as well as a subsequent form for the user to select their phone verification method (either SMS or voice).

<div class="common-image-format">

![Displays the Java SDK's enroll phone number authenticator form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num-java.png)

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

<div class="common-image-format">

![Displays the Java SDK's phone factor (SMS or voice) form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-mode-java.png)

</div>

After the user enters their phone number and selects a method to receive the verification code, capture this information and send it to the [`IDXAuthenticationWrapper.submitPhoneAuthenticator()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L398) method. For example:

```java
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.submitPhoneAuthenticator(proceedContext,
         phone, getFactorFromMethod(session, mode));
```

The Java SDK sends the phone authenticator data to Okta. Okta processes the request and sends a code to the specified phone number. After the code is sent, Okta sends a response to the SDK, which returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your client app. This status indicates that the user needs to provide the verification code for the phone authenticator.

> **Note:** If the user selects **Voice** as the phone verification method, Okta sends an automated voice message with the verification code to the specified phone.

You need to build a form to capture the user's verification code.

### Step 5: User enters verification code

The user receives the code on their phone and submits it in the verification code form. Send this code to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to verify the code is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in. Use the [`AuthenticationResponse.getTokenResponse()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java#L43) method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.
