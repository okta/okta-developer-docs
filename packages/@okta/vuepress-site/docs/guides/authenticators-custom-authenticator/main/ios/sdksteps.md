Use the Devices SDK to enable your app to verify the identity of a user by responding to notifications from a custom authenticator. To setup and configure your app:
- Add the SDK to your app
- Configure the required capabilities
- Register for notifications
- Initialize the SDK client

Next, register, or enroll the device to receive identity verification notifications for the custom authenticator. Your app needs to support user sign in and request the correct permissions, or scopes. Once the device is enrolled the app can respond to user verification notifications (challenges).

If needed, you can also unenroll the device, either locally, or both locally and on the server.

> **Note:** The iOS code snippets assume that there is a singleton class called `DeviceSDKManager` that manages interactions with the Devices SDK. The singleton contains any required state information, such as the current SDK client, the APNs token for the current launch of the app, utility functions, and more. Your app may use a different way of interacting with the parts of the Devices SDK.

### Add sign-in to your app

Add sign in using the [Okta mobile Swift SDK](https://github.com/okta/okta-mobile-swift) or the [Okta IDX SDK](https://github.com/okta/okta-idx-swift). For more information on signing users in to your app, see [Sign users in to your mobile app using the redirect model](https://developer.okta.com/docs/guides/sign-into-mobile-app-redirect/ios/main/).

Add the following strings to the space-delimited list of scopes in the `Okta.plist` file after you've configured your app to enable sign-in. These scopes request the additional permissions for the access token that are required by the Devices SDK:
- `okta.authenticators.manage.self`
- `okta.authenticators.read`
- `okta.users.read.self`

### Add Devices SDK to your app

Okta Devices SDK is available from [CocoaPods](http://cocoapods.org). Add the following lines to your Podfile to load the SDK for each target that uses the SDK replacing `MyApplicationTarget` with the name of the target:

```ruby
target 'MyApplicationTarget' do
    pod 'DeviceAuthenticator'
end
```

Configure your app to use APNs by adding the Push Notification Capability, registering your app, and retrieving your current token. You'll use the APNs token in the next step. For more information, see [Registering Your App with APNs](https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns) in Apple developer documentation.

Cache the APNs token for the duration of the session. The token is returned by the system in [`application(_:didRegisterForRemoteNotificationsWithDeviceToken:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622958-application). Don't save the token between app launches as it can change. You also must handle the case of failing to register for notifications if the system calls [`application(_:didFailToRegisterForRemoteNotificationsWithError:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622962-application).

Add an App Group Capability to your app if it doesn't already have one. You'll use the group identifier in the next step. For more information on adding and configuring an App Group, see [Configuring App Groups](https://developer.apple.com/documentation/xcode/configuring-app-groups/) in Apple developer documentation.

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

Use the name of the group you added when you added the App Group Capability when you [added the Devices SDK to your app](#_add_devices_sdk_to_your_app). The compiler conditional ensures that Device Authenticator uses the appropriate APNs environment.

### Register the device

To use the device to verify the identity of a user it must be registered, or *enrolled*, with the custom authenticator.

To enroll a device you need:
- An app that supports user sign-in and that requests the appropriate scopes. See [Add sign-in to your app](#_add_sign-in_to_your_app).
- A configured and enabled custom authenticator in your Okta org.
- The current APNs token .

There are many differnt ways that your app may start the flow for enrolling a device, such as the user setting a preference or adding an authentication method. No matter how enrollment flow is started it follows the same flow:
- Sign-in the user if they are currently signed out.
- Create the configuration for the authenticator.
- Create the enrollment details.
- Call `enroll(authenticationToken:authenticatorConfig:enrollmentParameters:)`.
- Handle the result of the call in the completion block.

Configuring enrollment requires two different tokens. One is the access token that is provided by Okta after the user signs in. The other is the APNs token that is returned after you register for push notifications.

The following function is an example of enrolling a device. It assumes that the user has already signed-in using the [Okta Swift Mobile SDK](https://github.com/okta/okta-mobile-swift):

```swift
func enrollDevice() {
    // Credential is part of the Okta Swift Mobile SDK.
    guard let userCredential = Credential.default?,
          let authenticatorClient = self.authenticatorClient?,
          let notificationSessionToken = self.notificationSessionToken?
    else {
        // One or more pieces of required infomration are missing, handle the error.
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

### Update the push notification token

A valid APNs token is required for the custom authenticator to send a notification to the device. Update any existing enrolled devices each time you recieve the APNs token as it may have changed. This is an example function that updates the tokens. Call it from [`application(_:didRegisterForRemoteNotificationsWithDeviceToken:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622958-application):

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

The function assumes that the user is signed-in using the Mobile Swift SDK. In a production app consider adding a function that signs-in the user if the cached access token either doesn't exist or is invalid.

### Unenroll the device

You may need to unenroll the device, such as the user turning off notifications using a setting. It's also possible for the device to be unenrolled by on the server by an administrator or some other method. One way to detect if the device is unenrolled on the server is that a call to either unenroll the device or to retrieve undelivered notifications results in an error of type `serverAPIError`.

The following function is an example of unenrolling the device either localy or both locally and on the server and assumes the user is signed-in:

```swift
func unenrollDevice(_ device: AuthenticatorEnrollmentProtocol, localOnly: Bool) {
    guard let userCredential = Credential.default?,
          let authenticatorClient = self.authenticatorClient?
    else {
        // There's no valid user sessions or authenticator client, handle the error.
    }

    let userToken = AuthToken.bearer(userCredential.token.accessToken)

    if localOnly {
        do {
            device.deleteFromDevice()
        } catch {
            // Handle a problem with a local unenrollment.
        }
    } else {
        authenticatorClient.delete(enrollment: device, authenticationToken: userToken)
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

### Process a custom authenticator notification

When the custom authenticator is used during a sign-in attempt, Okta creates a *push challenge*, a notification that requests the user to verify their identity. This challenge is sent to the user's enrolled devices.

You can enable APNs quick actions for notifications by providing action titles when you initialize the client. The titles are the names of the different selections that appear when a user long-presses a notification. The following code shows the additional lines for the `initOktaDeviceAuthenticator()` shown in [Initialize the client](#_initialize_the_client):

```swift
func initOktaDeviceAuthenticator() {
    do {
        let applicationConfig = ApplicationConfig(applicationName: "Your-app-name",
                                                  applicationVersion: "Your-app-version",
                                                  applicationGroupId: "com.your.group.id",
                                                  )
        applicationConfig.approveActionTitle =
        applicationConfig.denyActionTitle =
        applicationConfig.userVerificationActionTitle =
        ...
```

#### Check for a challenge

When a notification arrives the first step is to check if it's a Devices SDK challenge. Call the appropriate Devices SDK function to create a `PushChallengeProtocol` from the notification. If the result is an object, continue processing the challenge. If it's `nil` then the notification is not part of the Devices SDK.

Call `parsePushNotificationResponse(_:allowedClockSkewInSeconds:)` if you added quick action titles, otherwise call `parsePushNotification(_:allowedClockSkewInSeconds:)` to create the push challenge. `allowedClockSkewInSeconds` is optional. The following code shows handling a notification that's sent when the app isn't active:

```swift
func userNotificationCenter(_ center: UNUserNotificationCenter,
                            willPresentNotification notification: UNNotification,
                            withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
    // Check if it's a Devices SDK notification.
    if let pushChallenge = try? authenticatorClient.parsePushNotification(response) {
        // Handle the Devices SDK notification.
    } else {
        // Handle you're own notifications, if any.
    }

    completionHandler()
}
```

#### Handle a challenge

The push challenge includes the steps, or *remediations*, required to validate the user identity. Your app handles these steps sequentially and updates the SDK with the results. Your app must handle two different types of types of steps:
- **Consent:** Confirm that the user is attempting to sign in.
- **Message:** An informational message, such as the user cancelling verification or a key being corrupt or missing.

There's also a step for confirming a user's identity with biometrics which is handled by the SDK.

The consent step is represented by an object of type `RemediationStepUserConsent` and the message step by `RemediationStepMessage`. The following code is an example of handling the different cases:

```swift
func resolvePushChallenge(_ challenge: PushChallengeProtocol) {
    // Handle each remediation step in order.
    challenge.resolve { remediationStep in
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
    }
}
```

Your app must implement a UI for the user to respond to a user consent notification even if you provide titles for the quick actions. For example, a user may only tap the notification to go directly to your app instead of a selecting an action. However you determine the user's choice, the last step is to enable the Devices SDK to inform the server by calling `provide(_)`:

```
func handleUserConsent(_ consentStep: RemediationStepUserConsent,
                         challenge: PushChallengeProtocol) {
    var response: UserConsentResponse = .none

    // Check for a quick response if you provide titles for Quick Actions.
    if challenge.userResponse != .userNotResponded {
        response = (challenge.userResponse == .userApproved) ? .approved : .denied
    } else {
        // Present a UI and continue handle the choice.
    }
    consentStep.provide(response)
}
```

#### Load undelivered challenges

Undelivered notifications are queued by the server for delivery at a later time. When your app launches or comes into the foreground, check for undelivered notifications and process them as appropriate. The following is an example function to retrieve Devices SDK notifications that you can call from [`applicationDidBecomeActive(_:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622956-applicationdidbecomeactive):

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
