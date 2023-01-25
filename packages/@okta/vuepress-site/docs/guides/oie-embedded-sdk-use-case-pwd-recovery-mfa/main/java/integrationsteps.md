### 1: The user selects the forgot password link

The password recovery flow begins when the user clicks the **Forgot your password?** link on your app's sign-in page.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-password-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36729&t=wzNwSZkdctajVush-1 sign-in-form-username-password-sign-up-forgot-your-password-links
 -->

</div>

You need to create a form to capture the user's email for password recovery, similar to the following wireframe.

<div class="half wireframe-border">

![A reset password form with an email address field and a next button](/img/wireframes/reset-password-form-email-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36756&t=wzNwSZkdctajVush-1  reset-password-form-email-only
 -->

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

After receiving the `AWAITING_AUTHENTICATOR_SELECTION` status and the list of authenticators to be verified, provide the user with a form to select the authenticator to verify. In other words, provide the user with a list of recovery factors to use. In this use case, email is the only recovery factor available.

<div class="half wireframe-border">

![A choose your authenticator form with only an email authenticator option and a next button](/img/wireframes/choose-authenticator-form-email-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36772&t=wzNwSZkdctajVush-1 choose-authenticator-form-email-only
 -->

</div>

### 3: The user selects the email authenticator

The user selects **Email** as the authenticator to recover their password. Pass the selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method:

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

This Java SDK method sends the email authenticator selection to Okta. Okta sends a code to the user's email and the Java SDK returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION` to your client app. This status indicates that the authentication flow is waiting for an authenticator verification, in this case, an email verification code. You need to build a form to capture the code from the user.

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

### 4: The user submits the email verification code

The user receives the verification code in their email and submits it through the **Verify Code** form. Use [`VerifyAuthenticationOptions`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/VerifyAuthenticatorOptions.java) to capture the code and send it to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to verify the code is successful, the Java SDK returns an `AuthenticationResponse` object with the `AuthenticationStatus=AWAITING_PASSWORD_RESET` property. This status indicates that the recovery flow is waiting for an updated password for the user. You need to build a form for the user to enter their new password.

<div class="half wireframe-border">

![A reset password form with two fields to enter and to confirm a new password and a next button](/img/wireframes/reset-password-form-new-password-fields.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36886&t=2h5Mmz3COBLhqVzv-1  reset-password-form-new-password-fields
 -->

</div>

### 5: The user enters the new password

After the user enters their new password, call the `IDXAuthenticationWrapper.verifyAuthenticator()` method with the user's new password value.

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(newPassword);
AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to update the password is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in with an updated password. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.
