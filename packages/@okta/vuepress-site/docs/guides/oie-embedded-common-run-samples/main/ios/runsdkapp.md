
1. If you haven't already done so, [set up your Okta org](/docs/guides/oie-embedded-common-org-setup/ios/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
1. If you haven't already done so, [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/ios/main/).
1. Using Xcode, locate and open the `okta-idx.xcworkspace` file in the following path: `okta-idx-swift/`.
1. Optionally, open the `Okta.plist` file and configure it with the settings from your org. See [Okta.plist](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#okta-plist) for more information.
1. Click **Run** to launch the application in the iOS simulator.
1. If you didn't didn't configure the `Okta.plist` file, you can add your org settings to the Configuration
   page by tapping the **Configure** link on the start-up screen. See [Configuration page](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#configuration-page) for more information.
1. Tap the **Sign In** button to start the authentication flow.

### Work with the use cases

After you successfully run the sample app, you can build your own integration by using the sample app as your guide. Explore use cases that are available with the SDK, starting with the [Basic sign-in flow example with the password factor](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/ios/main/) use case.
