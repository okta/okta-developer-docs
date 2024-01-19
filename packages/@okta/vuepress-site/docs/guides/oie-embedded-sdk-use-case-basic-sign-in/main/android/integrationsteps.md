### The user launches the sign-in page

Build a sign-in page that captures both the user's name and their password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

Begin the authentication process by calling `IDXAuthenticationWrapper.begin()` and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```kotlin
val beginResponse = idxAuthenticationWrapper.begin()
val beginProceedContext = beginResponse.proceedContext
```

### The user submits their username and password

When the user submits their username and password, create an `AuthenticationOptions` object and assign its `Username` and `Password` properties to the values entered by the user. Pass this object as a parameter to `IDXAuthenticationWrapper.authenticate()`.

```java
fun signIn() {
   if (!viewModel.isValid()) return

   formAction.proceed {
      // Need to begin the transaction again, in case an error occurred.
      val beginResponse = authenticationWrapper.begin()
      handleTerminalTransitions(beginResponse)?.let { return@proceed it }

      val options = AuthenticationOptions(
         viewModel.username, viewModel.password)
      val response = authenticationWrapper.authenticate(
         options, beginResponse.proceedContext)
      handleKnownTransitions(response)
   }
}
```

### Your app handles an authentication success response

`IDXAuthenticationWrapper.authenticate()` returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with an [`AuthenticationStatus`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) property indicating the current state of the sign-in flow. Handle the returned `AuthenticationStatus` value accordingly:

#### Success status

If the Java SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS`, then the user is successfully signed in. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

```kotlin
fun handleTerminalTransitions(response: AuthenticationResponse)
: ProceedTransition? {
   if (response.tokenResponse != null) {
      return ProceedTransition.TokenTransition(response.tokenResponse)
   }
   if (response.authenticationStatus == AuthenticationStatus.SKIP_COMPLETE) {
      return ProceedTransition.TerminalTransition(
         response.errors ?: emptyList())
   }
   if (response.errors.isNotEmpty()) {
      return ProceedTransition.ErrorTransition(response.errors)
   }
   return null
}
```

#### Other authentication statuses

Handle other returned [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) cases if there are other factors to verify. For example:

```kotlin
fun handleKnownTransitions(
   response: AuthenticationResponse): ProceedTransition {
   handleTerminalTransitions(response)?.let { return it }

   return when (response.authenticationStatus) {
         AuthenticationStatus.AWAITING_PASSWORD_RESET -> {
            registerPasswordForm(response, "Reset my Password")
         }
         AuthenticationStatus.PASSWORD_EXPIRED -> {
            registerPasswordForm(response, "Password Expired")
         }
         AuthenticationStatus.AWAITING_AUTHENTICATOR_SELECTION -> {
            selectAuthenticatorForm(response, "Select Authenticator")
         }
         AuthenticationStatus.AWAITING_AUTHENTICATOR_VERIFICATION -> {
            verifyForm(response)
         }
         AuthenticationStatus.AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION -> {
            selectAuthenticatorForm(response, "Enroll Authenticator")
         }
         AuthenticationStatus.AWAITING_AUTHENTICATOR_VERIFICATION_DATA -> {
            // This is possible when email is not required and
            // you're authenticating without verifying email.
            if (response.authenticators.size == 1) {
               selectFactorForm(
                  response,
                  response.authenticators.first().factors,
                  "Select Factor")
            } else {
               unsupportedPolicy()
            }
         }
         else -> unsupportedPolicy()
   }
}
```

#### Failed authentication

There's no explicit failed status from `AuthenticationStatus`. Check the response handler for an error in `AuthenticationResponse` for failed authentication and handle the flow accordingly. For example:

```kotlin
if (response.errors.isNotEmpty()) {
    return ProceedTransition.ErrorTransition(response.errors)
}
```
