You can use a copy of the sample app by cloning it:

```bash
git clone -b tutorial_sample git@github.com:okta/samples-android.git tutorial_sample
```
After you clone the sample app, under the `tutorial_sample` folder there should now be a copy of the `sign-in-kotlin` sample app folder.

1. Repeat the steps in the [Set up the first mobile app](#set-up-the-first-mobile-app) section for the second app.

2. Replace the URIs with `com.second.sample` and replace the `clientId` with the Client ID from the second app that you [created in Okta](#configure-two-openid-connect-native-apps). The `Org URL` remains the same to share the sign-on session.

3. Run the second application and attempt to sign in. If the first application's session hasn't expired, you shouldn't be prompted for sign-in credentials.
