## Integration steps

### Step 1: Build a sign-in page on the client

Build a sign-in page that captures both the username and password.

For example:

<div class="common-image-format">

![Sign in screenshot](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign in screenshot")

</div>

### Step 2: Authenticate user credentials

When the user initiates the sign-in process, your app needs to create an [AuthenticationOptions](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationOptions.java) object and set its `username` and `password` properties to the values entered by the user. Send this object to the
[IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java) `authenticate` method to authenticate the user.

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

### Step 3: Handle the response from the sign in

Depending on [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java)'s [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) value, you need to handle the response accordingly:

#### Success status

For a successful sign-in response (`AuthenticationStatus.Success`), use the [AuthenticationResponse](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/response/AuthenticationResponse.java)'s `getTokenResponse` method to retrieve the token and then process the authenticated user in the app.

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

#### Other status

You need to handle other returned [AuthenticationStatus](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/model/AuthenticationStatus.java) cases if the user didn't sign in successfully.

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

### Step 4: Get user profile information (optional)

Optionally, you can obtain basic user information after the user is authenticated by making a request to Okta's OpenID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/android/main/#getuserprofileinfo).
