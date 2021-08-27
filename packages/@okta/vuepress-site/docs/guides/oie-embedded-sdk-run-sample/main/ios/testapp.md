## Steps to test the sample app

1. If not already done, set up your Okta org by completing these steps: [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).
1. If not already done,
   [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
1. Using Xcode, locate and open the `okta-idx.xcworkspace` file in the following path: `okta-idx-swift/`
1. Optionally, open the `Okta.plist` file and configure it with the settings from your org. See
   the [Okta.plist](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#okta-plist) section for more information.
1. Click **Run** to launch the application in the iOS simulator.
1. If you didn't didn't configure `Okta.plist`, you can add your org settings to the Configuration
   screen by tapping the **Configure** link on the startup screen. See the
   [Configuration screen](/docs/guides/oie-embedded-common-download-setup-app/ios/main/#configuration-page) section for more information.
1. Tap the **Sign In** button to start the authentication flow.
