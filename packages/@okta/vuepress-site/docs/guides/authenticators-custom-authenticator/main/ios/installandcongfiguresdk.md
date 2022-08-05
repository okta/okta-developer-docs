1. [Add the SDK to your app](#add-devices-sdk-to-your-app): Add the Swift Okta Devices SDK dependency to your project.
2. [Initialize the client](#initialize-the-client): Create the SDK object to work with your Okta authenticator configuration.
3. [Register the device](#register-the-device): Enroll a device and optional biometrics with an account by registering the device for use with the custom authenticator, unenroll the device, and update the APNs token for any enrollments.
4. [Respond to a custom authenticator notification](#process-a-custom-authenticator-notification): Resolve a delivered challenge from the custom authenticator or retrieve an undelivered challenge. Refresh the APNs device registration token.
