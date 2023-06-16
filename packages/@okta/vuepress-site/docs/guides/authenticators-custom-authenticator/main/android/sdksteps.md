Use the Devices SDK to add custom push verification functionality to your Android app.

> **Note:** The following sample code assumes that suspend functions are called from a coroutine. See [Kotlin coroutines](https://kotlinlang.org/docs/coroutines-overview.html).

The following image shows how data flows through the Devices SDK:

<div class="full border">

![Custom authenticator flow chart](/img/authenticators/authenticators-custom-authenticator-data-flow.png)

</div>

### Install the dependency

Add the Okta Devices SDK dependency to your `build.gradle` file:

```kotlin
implementation("com.okta.devices:devices-push:$okta.sdk.version")
```

The latest release version is `$okta.sdk.version`. See [Release status](https://github.com/okta/okta-devices-kotlin/releases) for the latest Okta Devices SDK version.

### Initialize the client

Create the SDK object to work with your Okta authenticator configuration. Use the `PushAuthenticatorBuilder` to create an authenticator with your application configuration:

If the end user doesn't provide a passphrase, the Devices SDK data isn't encrypted. Secure the passphrase:

```kotlin
val authenticator: PushAuthenticator = PushAuthenticatorBuilder.create(
    ApplicationConfig(context, appName = "MyApp", appVersion = BuildConfig.VERSION_NAME)
) {
    passphrase = "SecretPassphrase".toByteArray() // Secret must be stored securely
}.getOrThrow()
```

### Enroll the device

Before enrolling the device, ensure that you have the following:

* An OIDC Web Authentication client. See [Create an OAuth 2.0 app integration](#create-an-oidc-web-authentication-client).
* A custom authenticator. See [Add a custom authenticator](#add-a-custom-authenticator).
* A registration token from Firebase. See [Set up notification services](#set-up-notification-services).

To start enrolling the user:

```kotlin
val authConfig = DeviceAuthenticatorConfig(URL(orgUrl), "oidcClientId")
val result = authenticator.enroll(AuthToken.Bearer("accessToken"), authConfig, EnrollmentParameters.Push(FcmToken("registrationToken"), enableUserVerification = false))
if (result.isSuccess) {
    val pushEnrollment: PushEnrollment = result.getOrThrow()
}
```

Alternatively, you can enroll the device by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/createAppAuthenticatorEnrollment).

#### Retrieve enrollments

To retrieve information about existing enrollments, use `allEnrollments()`. You can use this to display attributes for a list of accounts or find a specific account to update or delete it. Retrieve all previously enrolled `PushEnrollment`:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()
```

#### Update the registration token

Whenever the FCM SDK sends your application a new token with `FirebaseMessagingService.onNewToken`, you can update existing enrollments with the new token by doing the following:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user
enrollments.find { it.user().name == "myUser" }?.let { pushEnrollment ->
    pushEnrollment.updateRegistrationToken(AuthToken.Bearer("accessToken"), FcmToken("newToken"))
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

Alternatively, you can update the registration token by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/updateAppAuthenticatorEnrollment).

#### Update user verification

User verification checks that a user is the one claimed. You can do this by asking the user for biometrics. You can enable or disable user verification by doing the following:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user
enrollments.find { it.user().name == "myUser" }?.let { pushEnrollment ->
    pushEnrollment.setUserVerification(AuthToken.Bearer("accessToken"), true)
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

Alternatively, you can update user verification by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/updateAppAuthenticatorEnrollment).

#### Delete enrollment

Use the delete function to delete an enrollment from both the server and the device:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user and delete it
enrollments.find { it.user().name == "myUser" }?.let { pushEnrollment ->
    authenticator.delete(AuthToken.Bearer("accessToken"), pushEnrollment)
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

Alternatively, you can delete an enrollment by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/deleteAppAuthenticatorEnrollment).

#### Delete enrollment from the device

The `deleteFromDevice` function doesn’t call the server, so it doesn’t require authorization. As a result, the function only deletes the enrollment from the device.

> **Note:** Use `deleteFromDevice` with caution as the user can’t meet factor requirements for sign-in attempts after deletion. The server is unaware the authenticator no longer exists.

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user
enrollments.find { it.user().name == "myUser" }?.let { pushEnrollment ->
    pushEnrollment.deleteFromDevice()
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

### Respond to a challenge

When a user attempts to sign in to the enrolled account through an app or a web browser, Okta creates a push challenge. Your push provider sends the push challenge to enrolled devices.

<!-- It may not always be delivered. Add content about it here. -->

#### Resolve delivered challenges

After you receive a challenge, your app should resolve them to proceed with the sign-in flow. The SDK may request remediation steps to resolve the challenge:

* `UserConsent`: Asks the user to approve or deny the challenge.
* `UserVerification`: Notifies the app that it requires a biometric verification to proceed.

See the [Devices SDK sample app](https://github.com/okta/okta-devices-kotlin/tree/master/push-sample-app) for complete details about resolving a push challenge.

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
        is UserVerificationError -> println("Biometric failure")
    }
}.getOrElse { // handle error
}
```

Alternatively, you can respond to a challenge by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/verifyAppAuthenticatorPushNotificationChallenge).

#### Retrieve undelivered challenges

Sometimes FCM fails to deliver a notification to the user.<!-- See Maurice for extra explanatory text --> Add code to check for pending challenges:

```kotlin
val enrollments: List<PushEnrollment> = authenticator.allEnrollments().getOrThrow()

// Find the enrollment associated with the current user
enrollments.find { it.user().name == "myUser" }?.let { pushEnrollment ->
    pushEnrollment.retrievePushChallenges(AuthToken.Bearer("accessToken"))
        .onSuccess { println("success") }
        .onFailure { println("failure") }
}
```

Alternatively, you can retrieve undelivered challenges by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/listAppAuthenticatorPendingPushNotificationChallenges).

### Access token management

The SDK communicates with an Okta server using the HTTPS protocol and requires an access token for user authentication and authorization. For authentication flows and access token requests, use the latest version of the [Okta Kotlin Mobile SDK](https://github.com/okta/okta-mobile-kotlin). To enroll a push authenticator, the user needs to have an access token that contains the `okta.myAccount.appAuthenticator.manage` scope. You can also use this scope for the following operations:

* Enroll and unenroll user verification keys
* Update device tokens for push authenticator enrollment
* Request pending push challenges
* Enable and disable CIBA capability for push authenticator enrollment
* Delete push authenticator enrollment
  > **Note:** Applications that use sensitive data shouldn't store or cache access tokens or refresh access tokens that contain the `okta.myAccount.appAuthenticator.manage` scope. Instead, reauthenticate the user and get a new access token.

  The following is a list of operations that are considered high risk and require reauthentication:
  * Enroll push authenticator
  * Enable or disable user verification for push authenticator enrollment
  * Delete push authenticator enrollment

### Maintenance token configuration and usage

Other operations are low risk and may not require interactive authentication. For that reason, the Okta Devices SDK provides the silent user reauthentication method, `retrieveMaintenanceToken`. This method retrieves a maintenance access token for reauthentication that allows an application to silently perform the following operations:

* Request pending push challenges
* Enable and disable CIBA capability for the push authenticator enrollment
* Update device tokens for push authenticator enrollment

To successfully obtain the maintenance token, you must first configure your Okta OIDC application to support the JWT Bearer grant type:

* You can use the Apps API's [update application](/docs/reference/api/apps/#update-application) operation (`PUT /apps/${appId}`) to modify the `settings.oauthClient.grant_types` property array to include the JWT Bearer grant type, `urn:ietf:params:oauth:grant-type:jwt-bearer`.

* Alternatively, when you use the Admin Console to add or update the OIDC application in a custom authenticator, the application automatically updates with the JWT Bearer grant type. See [Add a custom authenticator](#add-a-custom-authenticator).

##### Apps API usage sample

Explore the [Configure and Use JWT Bearer Grant](https://god.gw.postman.com/run-collection/26510466-46beb74b-4755-4cf0-9847-845ccac1ccbd?action=collection%2Ffork&collection-url=entityId%3D26510466-46beb74b-4755-4cf0-9847-845ccac1ccbd%26entityType%3Dcollection%26workspaceId%3Daf55a245-1ac6-42d1-8af4-11e21e791e4e) Postman Collection for API examples of how to do the following:
* Get your OIDC app object properties.
* Update your OIDC app to include the `urn:ietf:params:oauth:grant-type:jwt-bearer` grant type.
* Obtain a token with your OIDC app client ID.

Fork this collection and add `url`, `apiKey`, `appId`, and `yourClientId` environment variables to run the example endpoints. The `PUT` method is a full property-replace operation, so you need to specify all required OIDC app properties, including any previous grant types. See [Create an API token](/docs/guides/create-an-api-token/main/) to obtain an `apiKey` from your org for testing purposes.

##### Kotlin maintenance token usage example

```kotlin
suspend fun retrievePushChallenges() {
    val readScope = listOf("okta.myAccount.appAuthenticator.maintenance.read")
    val enrollments = pushAuthenticator.allEnrollments().getOrThrow()
    enrollments.forEach { enrollment ->
        enrollment.retrieveMaintenanceToken(readScope).onSuccess {authToken ->
            enrollment.retrievePushChallenges(authToken).onSuccess { challenges ->
                println("Challenges retrieve: $challenges")
            }.onFailure {error ->
                println(error.localizedMessage)
            }
        }.onFailure { error ->
            println(error.localizedMessage)
        }
    }
}
```
