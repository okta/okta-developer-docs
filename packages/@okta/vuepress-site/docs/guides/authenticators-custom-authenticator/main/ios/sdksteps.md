Use the Devices SDK to enable your app to verify the identity of a user by responding to notifications from a custom authenticator.

To set up and configure your app:

1. [Add the SDK to your app](#add-devices-sdk-to-your-app)
2. Configure the required capabilities
3. [Register for notifications](#register-the-device)
4. [Initialize the SDK client](#initialize-the-client)

Next, register the device to receive identity verification notifications for the custom authenticator. Your app needs to support a user sign-in flow and request the correct permissions or scopes. Once the end user enrolls the device, the app can respond to user verification notifications (challenges).

If needed, you can also unenroll the device, either locally, or both locally and on the server.

> **Note:** The iOS code snippets assume that there's a singleton class called `DeviceSDKManager` that manages interactions with the Devices SDK. The singleton contains any required state information, such as the current SDK client, the APNs token for the current launch of the app, utility functions, and more. Your app may use a different way to interact with the Devices SDK.

The following image shows how data flows through the Devices SDK:

<div class="full border">

![Custom authenticator flow chart](/img/authenticators/authenticators-custom-authenticator-data-flow.png)

</div>

### Enable the user to sign in

A valid user account authentication token is necessary to add a device as an authenticator. To get the token, first enable the user to sign in to their account using the [Okta mobile Swift SDK](https://github.com/okta/okta-mobile-swift) or if you're already using it, the [Okta IDX Swift SDK](https://github.com/okta/okta-idx-swift). For more information on signing users in to your app, see [Sign users in to your mobile app using the redirect model](https://developer.okta.com/docs/guides/sign-into-mobile-app-redirect/ios/main/).

Then add the extra permissions that the Devices SDK requires to the access token. Add the following strings to the space-delimited list of scopes in the `Okta.plist` file:

- `okta.myAccount.appAuthenticator.manage`
- `okta.myAccount.appAuthenticator.read`

If you’re initializing the scopes in your app's code instead of using the `Okta.plist` file, update that code using the scopes as strings.

### Add Devices SDK to your app

Install from [CocoaPods](http://cocoapods.org). Add the following lines to your Podfile to load the SDK for each target that uses the SDK replacing `MyApplicationTarget` with the name of the target:

```ruby
target 'MyApplicationTarget' do
    pod 'DeviceAuthenticator'
end
```

The source for the Okta Swift Devices SDK is in the Okta GitHub repository:
https://github.com/okta/okta-devices-swift.

There are two ways for your app to receive notifications from a custom authenticator:

- As a push notification that's delivered whether your app is closed, in the background, or in the foreground
- By requesting any queued notifications when your app is in the foreground

Although your app doesn't need to receive push notifications to use the Devices SDK, we suggest that you do this for the best user experience. To receive notifications, add the Push Notification Capability to your app. At runtime, register your app with the notification manager, and retrieve the current APNs token. Use this token in the next step.

For more information, see [Registering Your App with APNs](https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns) in Apple developer documentation. The examples in this guide assume that the end user registered the app to receive notifications.

The token is returned by the system in [`application(_:didRegisterForRemoteNotificationsWithDeviceToken:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622958-application). Use a property to store the token, though don't save the token between app launches as it can change. If there's an error registering for notifications, the system calls [`application(_:didFailToRegisterForRemoteNotificationsWithError:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622962-application). In this case, your app can still [load undelivered challenges](#load-undelivered-challenges).

Add an App Group Capability to your app if it doesn't already have one. You'll use the group identifier in the next step. See [Configuring App Groups](https://developer.apple.com/documentation/xcode/configuring-app-groups/) in Apple developer documentation.

### Initialize the client

You must initialize the SDK client when your app launches as it configures some Push Notification settings. The following function is an example of configuring and initializing the client that is called from [`application(_:didFinishLaunchingWithOptions:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622921-application). The call can go before or after the code to register for push notifications that you added earlier.

```swift
func initOktaDeviceAuthenticator() {
    do {
        let applicationConfig = ApplicationConfig(applicationName: "Your-app-name",
                                                  applicationVersion: "Your-app-version",
                                                  applicationGroupId: "com.your.group.id")

        #if DEBUG
            applicationConfig.pushSettings.apsEnvironment = .development
        #else
            applicationConfig.pushSettings.apsEnvironment = .production
        #endif

        // Set the property that holds the current Devices SDK client.
        self.authenticatorClient = try DeviceAuthenticatorBuilder(applicationConfig: applicationConfig).create()
    } catch {
        // Client not initialized, handle the error.
    }
}
```

Use the name of the group that you included when you added the App Group Capability earlier. The compiler conditional ensures that Device Authenticator uses the appropriate APNs environment.

### Register the device

To use the device to verify the identity of a user it must be registered, or *enrolled*, with the custom authenticator.

To enroll a device, you need:

- An app that enables a user to sign in to their account
- The appropriate scopes. See [Enable the user to sign in](#enable-the-user-to-sign-in).
- A configured and enabled custom authenticator in your Okta org
- The current APNs token if your app is registered for push notifications

Alternatively, you can enroll the device by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/createAppAuthenticatorEnrollment).

There are many different ways that your app may start the flow for enrolling a device, such as the user setting a preference or adding an authentication method. No matter how the enrollment flow starts, it follows the same steps:

- Sign the user in if they’re currently signed out.
- Create the configuration for the authenticator.
- Create the enrollment details.
- Call `enroll(authenticationToken:authenticatorConfig:enrollmentParameters:)`.
- Handle the result of the call in the completion block.

Configuring enrollment requires two different tokens. One is the access token that is provided by Okta after the user signs in. The other is the APNs token that is returned after you register for push notifications.

The following function is an example of enrolling a device. It assumes that the user has already signed in using the [Okta Mobile SDK for Swift](https://github.com/okta/okta-mobile-swift):

```swift
func enrollDevice() {
    // Credential is a class in the Okta Mobile SDK for Swift.
    guard let userCredential = Credential.default?,
          let authenticatorClient = self.authenticatorClient?,
          let notificationSessionToken = self.notificationSessionToken?
    else {
        // One or more pieces of required information are missing, handle the error.
    }

    // Create the authenticator configuration.
    let authenticatorConfig = AuthenticatorConfig(orgURL: userCredential.oauth2.baseURL,
                                                  oidcClientId: userCredential.oauth2.configuration.clientId)

    // Create the enrollment details.
    let enrollmentDetails = EnrollmentParameters(deviceToken: notificationSessionToken)

    let userToken = AuthToken.bearer(userCredential.token.accessToken)

    // Enroll the device.
    authenticatorClient.enroll(authenticationToken: userToken,
                               authenticatorConfig: authenticatorConfig,
                               enrollmentParameters: enrollmentDetails)
        { [weak self] result in
            switch result {
            case .success(let authenticator):
                // Handle a successfull enrollment.
            case .failure(let error):
                // Handle the error.
        }
   }
}
```

If your app isn't configured to receive push notifications or the device token isn't available yet, use a value of `DeviceToken.empty` for the `deviceToken` property of `EnrollmentParameters`.

### Update the push notification token

The APNs token that's returned to your app after it registers for push notifications may be different on each app launch. Update the token in all the accounts that use this device for authentication each time you receive one. This is an example function that updates the enrollments. Call it from [`application(_:didRegisterForRemoteNotificationsWithDeviceToken:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622958-application):

```swift
func updateEnrollments(with notificationToken: Data) {
    guard let userCredential = Credential.default?,
          let authenticatorClient = self.authenticatorClient?
    else {
        // There's no valid authenticator client. Handle the error.
    }

    let userToken = AuthToken.bearer(userCredential.token.accessToken)

    authenticatorClient.allEnrollments().forEach({ enrollment in
        getAccessToken { accessToken in
            enrollment.updateDeviceToken(data,
                                         authenticationToken: userToken)
            { error in
                // Handle success or failure.
            }
        }
    })
}
```

The function assumes a valid access token. In a production app, consider adding a function that either updates the token if it's invalid, or gets a new token using a user sign-in flow.

Alternatively, you can update the registration token by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/updateAppAuthenticatorEnrollment).

### Unenroll the device

You may need to unenroll a device from a user account. For example, your app may enable a user to turn off notifications using a setting. It's also possible to unenroll the device on the server, such as an administrator removing an account. One way to detect if the device is unenrolled on the server is that a call to either unenroll the device or to retrieve undelivered notifications results in an error of type `serverAPIError`.

The following function is an example of unenrolling the device either locally, or both locally and on the server. It assumes a valid authentication token:

```swift
func unenrollDevice(_ enrollment: AuthenticatorEnrollmentProtocol, localOnly: Bool) {
    guard let userCredential = Credential.default?,
          let authenticatorClient = self.authenticatorClient?
    else {
        // There's no valid user sessions or authenticator client, handle the error.
    }

    let userToken = AuthToken.bearer(userCredential.token.accessToken)

    if localOnly {
        do {
            enrollment.deleteFromDevice()
        } catch {
            // Handle a problem with a local unenrollment.
        }
    } else {
        authenticatorClient.delete(enrollment: enrollment, authenticationToken: userToken)
        { [weak self] error in
            if let error = error {
                // Handle the error which may be `DeviceAuthenticatorError.serverAPIError`.
            } else {
                // Handle success.
            }
        }
    }
}
```

Alternatively, you can delete an enrollment by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/deleteAppAuthenticatorEnrollment).

### Process a custom authenticator notification

When the custom authenticator is used during a sign-in attempt, Okta creates a *push challenge*, a notification that requests the user to verify their identity. This challenge is sent to the user's enrolled devices.

Specify action titles when you initialize the client to enable actionable notifications. The titles are the names of the different selections that appear when a user taps and holds a notification. The following code shows the additional lines for the `initOktaDeviceAuthenticator()` shown in [Initialize the client](#initialize-the-client):

```swift
func initOktaDeviceAuthenticator() {
    do {
        let applicationConfig = ApplicationConfig(applicationName: "Your-app-name",
                                                  applicationVersion: "Your-app-version",
                                                  applicationGroupId: "com.your.group.id",
                                                  )
        applicationConfig.approveActionTitle = "Approve"
        applicationConfig.denyActionTitle =  "Deny"
        applicationConfig.userVerificationActionTitle = "Verify in YourAppName"
        ...
```

The first two titles are the actions for the notification that requests a user to approve or deny that they're trying to sign in. The third is the action for a biometric verification. Replace `YourAppName` with the name of your app, which you can read from the `CFBundleName` key of the `Info.plist` file in your main bundle.

#### Check for a challenge

When a notification arrives the first step is to check if it's a Devices SDK challenge. Call the appropriate Devices SDK function to create a `PushChallengeProtocol` from the notification. If the result is an object, continue processing the challenge. If it's `nil` then the notification isn't part of the Devices SDK.

Use `parsePushNotificationResponse(_:allowedClockSkewInSeconds:)` when a notification arrives when your app is in the background or inactive. Use `parsePushNotification(_:allowedClockSkewInSeconds:)` when a notification arrives when your app is in the foreground. The `allowedClockSkewInSeconds` parameter is optional. The following code shows handling a notification that's sent when the app is inactive:

```swift
func userNotificationCenter(_ center: UNUserNotificationCenter,
                            willPresent notification: UNNotification,
                            withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    // Check if it's a Devices SDK notification.
    if let pushChallenge = try? authenticatorClient.parsePushNotification(notification) {
        // Handle the Devices SDK notification.
    } else {
        // Handle you're own notifications, if any.
    }

    completionHandler()
}
```

#### Handle a challenge

The push challenge includes the steps, or *remediations*, required to validate the user identity. Your app handles these steps sequentially and updates the SDK with the results. Your app must handle two different types of steps:
- **Consent:** Confirm that the user is attempting to sign in.
- **Message:** An informational message, such as the user canceling verification or a key being corrupt or missing.

There's also a step for confirming a user's identity with biometrics that is handled by the SDK.

An object of type `RemediationStepUserConsent` represents the consent step. An object of type `RemediationStepMessage` represents the message step. The following is an example of handling the different cases:

```swift
func resolvePushChallenge(_ challenge: PushChallengeProtocol) {
    // Handle each remediation step in order.
    challenge.resolve(onRemediationStep: { remediationStep in
        switch remediationStep {
            case let consentStep as RemediationStepUserConsent:
                // Handle checking for user consent.
                handleUserConsent(consentStep, challenge)
            case let messageStep as RemediationStepMessage:
                // Handle a non-fatal error that occurs during the verification.
            default:
                // Let the SDK handle the unknown step.
                remediationStep.defaultProcess()
        }
    }) { error in
            if let error = error {
            // Handle the error resolving the challenge.
            }
        }
}
```

If you enabled actionable notifications by providing action titles and the user selected an action, the Devices SDK handles the consent step. When this happens, the call to `resolve` doesn't return a consent step.

Your app must implement a UI for the user to respond to a user consent notification even if you provide titles for the notification actions. For example, a user may only tap the notification to go directly to your app instead of selecting an action. However you determine the user's choice, the last step is to enable the Devices SDK to inform the server by calling `provide(_)`:

```swift
func handleUserConsent(_ consentStep: RemediationStepUserConsent,
                         challenge: PushChallengeProtocol) {
    var response: UserConsentResponse = .none

    // Present a UI and continue to handle the choice and set a value for the response.

    // Call the SDK to send the result to the server.
    consentStep.provide(response)
}
```

Alternatively, you can respond to a challenge by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/verifyAppAuthenticatorPushNotificationChallenge).

#### Load undelivered challenges

The server queues undelivered notifications for delivery later. When your app launches or comes into the foreground, check for undelivered notifications and process them as appropriate. The following is an example function to retrieve Devices SDK notifications that you can call from [`applicationDidBecomeActive(_:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622956-applicationdidbecomeactive):

```swift
func retrievePushChallenges(accessToken: String) {
    guard let authenticatorClient = self.authenticatorClient?
    else {
        // There's no valid authenticator client. Handle the error.
    }

    let authToken = AuthToken.bearer(accessToken)

    authenticatorClient.allEnrollments().forEach { enrollment in
        enrollment.retrievePushChallenges(authenticationToken: authToken)
        { [weak self] result in
            switch result {
                case .success(let notifications):
                    // Process the notifications.
                case .failure(let error):
                    // Handle the error.
            }
        }
    }
}
```

The code assumes that each enrollment uses the same access token. Use the appropriate access token if your app handles multiple user accounts.

Alternatively, you can retrieve undelivered challenges by using the [MyAccount App Authenticators API](https://developer.okta.com/docs/api/openapi/okta-myaccount/myaccount/tag/AppAuthenticator/#tag/AppAuthenticator/operation/listAppAuthenticatorPendingPushNotificationChallenges).

## Access token management

The SDK communicates with an Okta server using the HTTPS protocol and requires an access token for user authentication and authorization. For authentication flows and access token requests, use the latest version of the [Okta Swift mobile SDK](https://github.com/okta/okta-mobile-swift). To enroll a push authenticator, the user needs to have an access token that contains the `okta.myAccount.appAuthenticator.manage` scope. You can also use this scope for the following operations:

* Enroll and unenroll user verification keys
* Update device token for push authenticator enrollment
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

##### Swift maintenance token usage example

```swift
func retrievePushChallenges() {
    let enrollments = authenticator.allEnrollments()
    enrollments.forEach { enrollment in
        enrollment.retrieveMaintenanceToken() { result in
            switch result {
            case .success(let credential):
                let authToken = AuthToken.bearer(credential.access_token)
                enrollment.retrievePushChallenges(authenticationToken: authToken) { result in
                    switch result {
                    case .success(let challenges):
                        print("Challenges retrieve: \(challenges)")
                    case .failure(let error):
                        print(error.localizedDescription)
                    }
                }
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }
}
```
