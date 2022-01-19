### 1: The user selects the forgot password link

The password recovery flow begins when the user clicks the **Forgot your password?** link on your app's sign-in page.

<div class="common-image-format">

![Displays the Sign-in form for Java SDK with a 'Forgot your password?' link](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-forgot-java.png)

</div>

You need to create a form to capture the user's email for password recovery, such as the following reset my password form:

<div class="common-image-format">

![Displays the reset password form for Java SDK with an email field](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-reset-java.png)

</div>

### 2: The user enters their email

Begin the authentication process by calling the Java SDK's `IDXAuthenticationWrapper.begin()` method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

After the user submits their email, call the `IDXAuthenticationWrapper.recoverPassword()` method with the user's email as the `username` argument.

```java
 AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.recoverPassword(username, proceedContext);
```

If the email is for a valid and active user in the Okta directory, the `IDXAuthenticationWrapper.recoverPassword()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with the following properties:

* `AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` &mdash; This status indicates that there are required authenticators that need to be verified.

* `Authenticators` &mdash; List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) to be verified (in this case, there is only the email authenticator). <br>
    Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

After receiving the `AWAITING_AUTHENTICATOR_SELECTION` status and the list of authenticators to be verified, provide the user with a form to select the authenticator to verify. In other words, provide the user with a list of recovery factors to use. In this use case, email is the only recovery factor available:

<div class="common-image-format">

![Displays the recovery factor list to use (only email for this use case)](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-choose-auth-java.png)

</div>

### 3: The user selects the email authenticator

The user selects **Email** as the authenticator to recover their password. Pass the selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method:

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

This Java SDK method sends the email authenticator selection to Okta. Okta sends a code to the user's email and the Java SDK returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your client app. This status indicates that the authentication flow is waiting for an authenticator verification, in this case, an email verification code. You need to build a form to capture the code from the user.

<div class="common-image-format">

![Displays the email verification code input form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-verify-code-java.png)

</div>

> **Note:** The email sent to the user has a **Reset Password** link that isn't yet supported. Use the provided code instead. See [SDK limitations and workarounds: Passwordless sign-in with magic links](/docs/guides/oie-embedded-sdk-limitations/main/#passwordless-sign-in-with-magic-links).

### 4: The user submits the email verification code

The user receives the verification code in their email and submits it through the **Verify Code** form. Use [`VerifyAuthenticationOptions`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/VerifyAuthenticatorOptions.java) to capture the code and send it to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to verify the code is successful, the Java SDK returns an `AuthenticationResponse` object with the `AuthenticationStatus=AWAITING_PASSWORD_RESET` property. This status indicates that the recovery flow is waiting for an updated password for the user. You need to build a form for the user to enter their new password:

<div class="common-image-format">

![Displays the Java SDK form to reset password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-reset-password-java.png)

</div>

### 5: The user enters the new password

After the user enters their new password, call the `IDXAuthenticationWrapper.verifyAuthenticator()` method with the user's new password value.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(newPassword);
AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to update the password is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in with an updated password. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.
