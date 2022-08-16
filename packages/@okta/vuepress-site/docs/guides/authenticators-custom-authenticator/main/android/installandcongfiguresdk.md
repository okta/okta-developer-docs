1. [Install the dependency](#install-the-dependency): Add the Okta Devices SDK dependency to your `build.gradle` file.
2. [Initialize the client](#initialize-the-client): Create the SDK object to work with your Okta authenticator configuration.
3. [Enroll the device](#enroll-the-device): Register a device and optional biometrics with an account for use with the custom authenticator.
4. [Respond to a challenge](#respond-to-a-challenge): Resolve a delivered challenge from the custom authenticator or retrieve an undelivered challenge. Refresh the FCM device registration token, remediate changed biometrics, and deregister the account on the device.
