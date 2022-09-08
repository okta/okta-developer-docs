### 1: The user selects the forgot password link

The password recovery flow begins when the user clicks the **Forgot your password?** link on your app's sign-in page.

<div class="half wireframe-border">

![Sign-in form with a 'Forgot your password?' link](/img/oie-embedded-sdk/wireframes/pwd-optional-sign-up-link-sign-in-page-g2r2.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 2

-->

You need to create a form to capture the user's email for password recovery, similar to the following wireframe.

<div class="half wireframe-border">

![Reset password form with an email field](/img/oie-embedded-sdk/wireframes/reset-password-form-enter-email-g2r3.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 3

-->

Begin the authentication process by calling the Java SDK's `IDXAuthenticationWrapper.begin()` method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```kotlin
val beginResponse = idxAuthenticationWrapper.begin()
val proceedContext = beginResponse.proceedContext
```

### 2: The user enters their email

After the user enters their email, call the `IDXAuthenticationWrapper.recoverPassword()` method with the user's email as the `username` argument.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.recoverPassword(username, proceedContext)
```

If the email is for a valid and active user in the Okta directory, then the `IDXAuthenticationWrapper.recoverPassword()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with the following properties:

* `AuthenticationStatus=AWAITING_AUTHENTICATOR_SELECTION` &mdash; This status indicates that there are required authenticators that need to be verified.

* `Authenticators` &mdash; List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) to be verified (in this use case, there is only the email authenticator). <br>
    Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

After receiving the `AWAITING_AUTHENTICATOR_SELECTION` status and the list of authenticators to be verified, provide the user with a form to select the authenticator to verify. In other words, provide the user with a list of recovery factors to use. In this use case, email is the only recovery factor available.

<div class="half wireframe-border">

![Recovery factor list to use (only email for this use case)](/img/oie-embedded-sdk/wireframes/choose-authenticator-email-form-g2r4.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 4

-->

### 3: The user selects the email authenticator

The user selects **Email** as the authenticator to recover their password. Pass the selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method:

```kotlin
val authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator)
```

This Java SDK method sends the email authenticator selection to Okta. Okta sends a code to the user's email and the Java SDK returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your client app. This status indicates that the authentication flow is waiting for an authenticator verification, in this case, an email verification code. You need to build a form to capture the code from the user.

<div class="half wireframe-border">

![Email verification code input form](/img/oie-embedded-sdk/wireframes/enter-verification-code-form-g2r5.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 5

-->

> **Note:** The email sent to the user has a **Reset Password** link that isn't yet supported. Use the provided code instead. See [SDK limitations and workarounds: Passwordless sign-in with magic links](/docs/guides/oie-embedded-sdk-limitations/main/#passwordless-sign-in-with-magic-links).

### 4: The user submits the email verification code

The user receives the verification code in their email and submits it through a verify code form. Use [`VerifyAuthenticationOptions`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/VerifyAuthenticatorOptions.java) to capture the code and send it to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```kotlin
val verifyAuthenticatorOptions = VerifyAuthenticatorOptions(code)
val authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

If the request to verify the code is successful, the Java SDK returns an `AuthenticationResponse` object with the `AuthenticationStatus=AWAITING_PASSWORD_RESET` property. This status indicates that the recovery flow is waiting for an updated password for the user. You need to build a form for the user to enter their new password.

<div class="half wireframe-border">

![Password reset new password form](/img/oie-embedded-sdk/wireframes/reset-password-form-choose-new-password-g2r6.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 6

-->

### 5: The user enters the new password

After the user enters their new password, call the `IDXAuthenticationWrapper.verifyAuthenticator()` method with the user's new password value.

```kotlin
val verifyAuthenticatorOptions = VerifyAuthenticatorOptions(newPassword)
val authenticationResponse = idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

If the request to update the password is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in with an updated password. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.
