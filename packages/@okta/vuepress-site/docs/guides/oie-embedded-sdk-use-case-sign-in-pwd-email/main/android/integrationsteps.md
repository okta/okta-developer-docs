### 1: The user launches the sign-in page

Build a sign-in page for your app that captures both the username and the password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

Begin the authentication process by calling Java SDK's `IDXAuthenticationWrapper.begin()` method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```kotlin
val beginResponse = idxAuthenticationWrapper.begin()
val proceedContext = beginResponse.proceedContext
```

### 2: The user submits their username and password

After the user submits their username and password, call `IDXAuthenticationWrapper.authenticate()` with the credential values.

```kotlin
val authenticationResponse =
     idxAuthenticationWrapper.authenticate(AuthenticationOptions(username, password)), proceedContext)
```

If the password is validated, the `IDXAuthenticationWrapper.authenticate()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with the following:

1. `AuthenticationStatus` = `AWAITING_AUTHENTICATOR_SELECTION` <br>
     This status indicates that there are required authenticators that need to be verified.

2. `Authenticators` = List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) to be verified (in this case, there is only the email authenticator).

> **Note:** Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

After receiving the `AWAITING_AUTHENTICATOR_SELECTION` status and the list of authenticators to be verified, provide the user with a form to select the authenticator to verify. In the following example, the email address is the only authenticator:

<div class="half wireframe-border">

![A choose your authenticator form with only an email authenticator option and a next button](/img/wireframes/choose-authenticator-form-email-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36772&t=wzNwSZkdctajVush-1 choose-authenticator-form-email-only
 -->

</div>

> **Tip:** Build a generic authenticator selection form to handle single or multiple authenticators returned from the SDK.

### 3: The user selects the email authenticator

In this use case, the user selects the **Email** factor as the authenticator to verify. Pass this user-selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```kotlin
val authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator)
```

The Java SDK sends this selection to Okta. Okta sends a code to the user's email and the Java SDK returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION`. This status indicates that the authentication flow is waiting for an authenticator verification, in this case, an email verification code. You need to build a form to capture the code from the user.

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

> **Note:** The email sent to the user has a **Sign In** link that isn't yet supported. Use the provided code instead. See [SDK limitations and workarounds: Passwordless sign-in with magic links](/docs/guides/oie-embedded-sdk-limitations/main/#passwordless-sign-in-with-magic-links).

### 4: The user submits the email verification code

The user receives the verification code in their email and submits it through the verify code form. Use [`VerifyAuthenticationOptions`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/VerifyAuthenticatorOptions.java) to capture the code and send it to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```kotlin
val verifyAuthenticatorOptions = VerifyAuthenticatorOptions(code)
val authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions)
```

If the request to verify the code is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

> **Note**: For more information, see [Overview of the mobile Identity Engine SDK](/docs/guides/mobile-idx-sdk-overview/android/main/).
