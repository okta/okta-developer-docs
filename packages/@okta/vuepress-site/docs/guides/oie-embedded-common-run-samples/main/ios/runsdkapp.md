
1. If you haven't already done so, [set up your Okta org](/docs/guides/oie-embedded-common-org-setup/ios/main/#set-up-your-okta-org-for-a-password-factor-only-use-case). Then, [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/ios/main/).
1. Using XCode, locate and open the `okta-idx.xcworkspace` file in the following path: `okta-idx-swift/`.
1. Optionally, open the `Okta.plist` file and configure it with the settings from your org. See [Okta.plist](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#okta-plist).
1. Click **Run** to launch the app in the iOS simulator.
1. If you didn't configure the `Okta.plist` file, you can add your org settings to the Configuration
   page. Tap the **Configure** link on the start-up screen. See [Configuration page](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#configuration-page).
1. Tap the **Sign In** button to start the authentication flow.

### Work with the use cases

After you run the sample app, you can build your own integration using the sample app. Explore available use cases for the SDK. See the [Sign-in flow with password](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/ios/main/).
