Use the Devices SDK to add custom push verification functionality to your Android app.

See [Overview of the mobile Identity Engine SDK](/docs/guides/mobile-idx-sdk-overview/android/main/) for general information about mobile authentication at Okta.

> **Note:** The following sample code assumes that suspend functions are called in a coroutine scope. See [Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html) for more information.

<!-- Data flow DIAGRAM -->

### Install the dependency

Add the Okta Devices SDK dependency to your `build.gradle` file:

```kotlin
implementation("com.okta.devices:devices-push:$okta.sdk.version")
```

where `$okta.sdk.version` is the latest release version. See [Release Status]() for the latest Okta Devices SDK version.

### Initialize the client

Create the SDK object to work with your Okta authenticator configuration. Use the `PushAuthenticatorBuilder` to create an authenticator with your application configuration:

> **Note:** If a passphrase isn't provided, the Devices SDK data isn't encrypted. You must secure the passphrase.

```kotlin
val authenticator: PushAuthenticator = PushAuthenticatorBuilder.create(
    ApplicationConfig(context, appName = "MyApp", appVersion = BuildConfig.VERSION_NAME)
) {
    passphrase = "SecretPassphrase".toByteArray() // Secret must be stored securely
}.getOrThrow()
```

### Enroll the device

Before enrolling the device, ensure you have the following:

* An OIDC application. See [Create an OAuth 2.0 app integration]().
* A custom authenticator. See [Add a custom authenticator]().
* A registration token from Firebase. See [Set up notification services]().

To start enrolling the user:

```kotlin
val authConfig = DeviceAuthenticatorConfig(URL(orgUrl), "oidcClientId")
val result = authenticator.enroll(AuthToken.Bearer("accessToken"), authConfig, EnrollmentParameters.Push(FcmToken("registrationToken")), enableUserVerification = false)
if (result.isSuccess) {
    val pushEnrollment: PushEnrollment = result.value
}
```

#### Retrieve enrollments

In order to retrieve information about existing enrollments, use `allEnrollments()`. This can be used to display attributes for a list of accounts or find a specific account in order to update or delete it. Retrieve all previously enrolled `PushEnrollment`:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()
```

#### Update the registration token

Whenever the FCM SDK sends your application a new token with `FirebaseMessagingService.onNewToken`, you can update existing enrollments with the new token by doing the following:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user
enrollments.find { it.user.username == "myUser" }?.let { pushEnrollment ->
    pushEnrollment.updateRegistrationToken(AuthToken.Bearer("accessToken"), FcmToken("newToken"))
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

#### Update user verification

User verification checks that a user is the one claimed. You can do this by asking the user for biometrics. You can enable or disable user verification by doing the following:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user
enrollments.find { it.user.username == "myUser" }?.let { pushEnrollment ->
    pushEnrollment.setUserVerification(AuthToken.Bearer("accessToken"), true)
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

#### Delete enrollment

Use the delete function to delete an enrollment from both the server and the device:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user and delete it
enrollments.find { it.userInformation().username == "myUser" }?.let { pushEnrollment ->
    authenticator.delete(AuthToken.Bearer("accessToken"), pushEnrollment)
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

#### Delete enrollment from the device

The `deleteFromDevice` function doesn’t call the server, so it doesn’t require authorization. As a result, the function only deletes the enrollment from the device.

> **Note:** Use `deleteFromDevice` with caution as the user can’t meet factor requirements for sign-in attempts after deletion. The server is unaware the authenticator no longer exists.

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user
enrollments.find { it.userInformation().username == "myUser" }?.let { pushEnrollment ->
    pushEnrollment.deleteFromDevice()
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

### Respond to a challenge

When a user attempts to sign in to the enrolled account through an app or a web browser, Okta creates a push challenge. The push challenge is sent to enrolled devices through your push provider.

<!-- It may not always be delivered. Add content about it here. -->

#### Resolve delivered challenges

Once you receive a challenge, your app should resolve them in order to proceed with the login. The SDK may request remediation steps to resolve the challenge:

* `UserConsent`: Asks the user to approve or deny the challenge.
* `UserVerification`: Notifies the app that a biometric verification is required to proceed.

See the [Devices SDK sample app]() for complete details about resolving a push challenge.

```kotlin
val fcmRemoteMessage = "PushChallengeString" // fcm challenge

authenticator.parseChallenge(fcmRemoteMessage)
    .onSuccess { challenge ->
        challenge.resolve().onSuccess { remediation ->
            remediate(remediation) // call method to handle remediation
        }.onFailure { println("failure") }
    }.onFailure { println("failure") }

private fun remediate(remediation: PushRemediation) = runCatching {
    when (remediation) {
        is Completed -> println("Successfully handled. sign in success")
        is UserConsent -> println("Show a UX to accept or deny")
        is UserVerification -> println("Show a biometric prompt")
    }
}.getOrElse { updateError(it) }
```

#### Retrieve undelivered challenges

Sometimes FCM fails to deliver a notification to the user. <!-- See Maurice for extra explanatory text --> To check the server for pending challenges:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user
enrollments.find { it.user.username == "myUser" }?.let { pushEnrollment ->
    pushEnrollment.retrievePushChallenges(AuthToken.Bearer("accessToken"))
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```
