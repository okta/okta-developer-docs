### 1: Build a sign-in form

Build a sign-in form that captures both the username and password. For example:

<div class="quarter">

![Displays the simple sign-in form for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-java.png)

</div>

### 2: Authenticate the user credentials

Begin the authentication process by calling the Java SDK's `IDXAuthenticationWrapper.begin()` method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```kotlin
    val beginResponse = idxAuthenticationWrapper.begin()
    val beginProceedContext = beginResponse.proceedContext
```

After the user submits their credentials, call `IDXAuthenticationWrapper.authenticate()` with the credential values.

```kotlin
    fun signIn() {
        if (!viewModel.isValid()) return

        formAction.proceed {
            // Need to begin the transaction again, in case an error occurred.
            val beginResponse = authenticationWrapper.begin()
            handleTerminalTransitions(beginResponse)?.let { return@proceed it }


            val options = AuthenticationOptions(viewModel.username, viewModel.password)
            val response = authenticationWrapper.authenticate(options, beginResponse.proceedContext)
            handleKnownTransitions(response)
        }
    }
```

### 3: Handle the response from Okta and the SDK

The `IDXAuthenticationWrapper.authenticate()` method returns an [`AuthenticationResponse`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java) object with [`AuthenticationStatus`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java). Handle the returned `AuthenticationStatus` value accordingly:

#### Success status

If the Java SDK returns an `AuthenticationResponse` object with `AuthenticationStatus=SUCCESS`, then the user is successfully signed in. Use the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens (access, refresh, ID) for authenticated user activity.

For example:

```kotlin
    ...
    {
        fun handleTerminalTransitions(response: AuthenticationResponse): ProceedTransition? {
            if (response.tokenResponse != null) {
                return ProceedTransition.TokenTransition(response.tokenResponse)
            }
            if (response.authenticationStatus == AuthenticationStatus.SKIP_COMPLETE) {
                return ProceedTransition.TerminalTransition(response.errors ?: emptyList())
            }
            if (response.errors.isNotEmpty()) {
                return ProceedTransition.ErrorTransition(response.errors)
            }
            return null
    }
    ...
```

#### Other authentication statuses

You need to handle other returned [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) cases if there are additional factors to verify.

For example:

```kotlin
    ...
       fun handleKnownTransitions(response: AuthenticationResponse): ProceedTransition {
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
                    // This is possible when email is not required and you're authenticating without verifying email.
                    if (response.authenticators.size == 1) {
                        selectFactorForm(response, response.authenticators.first().factors, "Select Factor")
                    } else {
                        unsupportedPolicy()
                    }
                }
                else -> unsupportedPolicy()
            }
        }
    ...
```

#### Failed authentication

There is no explicit failed status from `AuthenticationStatus`. Check the response handler for an error in `AuthenticationResponse` for failed authentication and handle the flow accordingly.

For example:

```kotlin
if (response.errors.isNotEmpty()) {
    return ProceedTransition.ErrorTransition(response.errors)
}
```
