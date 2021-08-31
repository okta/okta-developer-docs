## Integration steps

### 1: The user launches the sign-in page

Build a sign-in page for your app that captures both the username and password.

<div class="common-image-format">

![Displays the Java SDK sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-java.png)

</div>

### 2: The user enters their credentials

Begin the authentication process by calling Java SDK's [`IDXAuthenticationWrapper.begin()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L603) method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

 After the user submits their credentials, call `IDXAuthenticationWrapper.authenticate()` with the credential values.

```java
AuthenticationResponse authenticationResponse =
     idxAuthenticationWrapper.authenticate(new AuthenticationOptions(username, password.toCharArray()), proceedContext);
```

If the password is validated, the `IDXAuthenticationWrapper.authenticate()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with the following:

1. `AuthenticationStatus` = `AWAITING_AUTHENTICATOR_SELECTION` <br>
     This status indicates that there are required authenticators that need to be verified.

2. `Authenticators` = List of [authenticators](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/Authenticator.java) to be verified (in this case, there is only the email authenticator).

> **Note:** Authenticators are the factor credentials that are owned or controlled by the user. These are verified during authentication.

After receiving the `AWAITING_AUTHENTICATOR_SELECTION` status and the list of authenticators to be verified, provide the user with a form to select the authenticator to verify. In the following example, the email address is the only authenticator:

<div class="common-image-format">

![Displays the verify email authenticator selection page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-email-screen-verify-java.png)

</div>

> **Tip:** Build a generic authenticator selection form to handle single or multiple authenticators returned from the SDK.

### 3: The user selects the email authenticator

In this use case, the user selects the **Email** factor as the authenticator to verify. Pass this user-selected authenticator to the `IDXAuthenticationWrapper.selectAuthenticator()` method.

```java
authenticationResponse = idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

The Java SDK sends this selection to Okta. Okta sends a code to the user's email and the Java SDK returns `AuthenticationStatus=AWAITING_AUTHENTICATOR_VERIFICATION`. This status indicates that the authentication flow is waiting for an authenticator verification, in this case, an email verification code. You need to build a form to capture the code from the user.

<div class="common-image-format">

![Displays the email verification code input form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code-java.png)

</div>

> **Note:** The email sent to the user has a **Sign In** link that isn't yet supported. Use the provided code instead. See [Limitations: Passwordless sign-in with magic links](/docs/guides/oie-embedded-sdk-limitations/main/#passwordless-sign-in-with-magic-links).

### 4: The user submits the email verification code

The user receives the verification code in their email and submits it through the verify code form. Use [`VerifyAuthenticationOptions`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/VerifyAuthenticatorOptions.java) to capture the code and send it to the `IDXAuthenticationWrapper.verifyAuthenticator()` method:

```java
VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(code);
AuthenticationResponse authenticationResponse =
   idxAuthenticationWrapper.verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

If the request to verify the code is successful, the SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS` and the user is successfully signed in. Use the [`AuthenticationResponse.getTokenResponse()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java#L43) method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.
