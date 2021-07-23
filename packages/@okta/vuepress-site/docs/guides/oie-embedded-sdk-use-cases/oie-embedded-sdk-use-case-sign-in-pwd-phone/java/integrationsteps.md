## Integration steps

### Step 1: User launches sign-in page

Build a sign-in page for your app that captures both the username and password.

<div class="common-image-format">

![Displays the Java SDK sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-java.png)

</div>

Begin the authentication process by calling Java SDK's [`IDXAuthenticationWrapper.begin()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L603) method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

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

1. `AuthenticationStatus` = `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` <br>
     This status indicates that there are required authenticators that need to be enrolled.

2. `Authenticators` = List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) to be enrolled (in this case, there is only the phone authenticator). <br>
    Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

> **Note:** If the user already has the phone authenticator enrolled, then `AuthenticationStatus` = `AWAITING_AUTHENTICATOR_SELECTION` is returned (instead of `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION`) and the user does not have to enroll the phone authenticator with a phone number, bypassing steps [3](#step-3-user-selects-phone-authenticator) and [4](#step-4-user-enters-phone-number).

After receiving the `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` status and the list of authenticators to be enrolled, provide the user with a form to select the authenticator to enroll. In the following example, phone is the only authenticator:

<div class="common-image-format">

![Displays the enroll phone authenticator selection page for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-phone-enroll-phone-java.png)

</div>

> **Tip:** Build a generic authenticator selection form to handle single or multiple authenticators returned from the SDK.

### Step 3: User selects phone authenticator

In this use case, the user selects **Phone** as the authenticator to enroll. Pass this user-selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

The response from this request is an `AuthenticationResponse` object with `AuthenticationStatus=AWAITING_AUTHENTICATOR_ENROLLMENT_DATA`. This status indicates that the user needs to provide additional authenticator information. In the case of the phone authenticator, the user needs to specify a phone number.

> **Note:** Only SMS is currently supported for the phone authenticator method factor. In the future, if your org supports the voice factor, you will need to add a voice or an SMS factor selection form for your app. Then both the phone authenticator and the SMS factor needs to be passed to the [`IDXAuthenticationWrapper.submitPhoneAuthenticator()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L398) method.

### Step 4: User enters phone number

You need to build a form to capture the user's phone number in your app. For example:

<div class="common-image-format">

![Displays the Java SDK's phone number input form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-in-pwd-phone-numberscreen-java.png)

</div>

> **Note:** The Java SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

When the user submits their phone number, capture this information and pass it to the [`IDXAuthenticationWrapper.verifyAuthenticator()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L368) method. In the following example, the phone number is saved in the `code` variable:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

The Java SDK sends the phone authenticator data to Okta. Otka processes the request and sends an SMS code to the specified phone number. After the SMS code is sent, Okta sends a response to the SDK, which returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your app. This status indicates that the user needs to provide the verification code for the phone authenticator.

You need to build a form to capture the user's SMS verification code. For example:

<div class="common-image-format">

![Displays the verification code input form for the Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-in-pwd-phone-verify-email-code-java.png)

</div>

### Step 5: User enters SMS code

The user receives the verification code as an SMS on their phone and submits it in the verify code form. Send this code to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to verify the code is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in. Use the [`AuthenticationResponse.getTokenResponse()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java#L43) method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.
