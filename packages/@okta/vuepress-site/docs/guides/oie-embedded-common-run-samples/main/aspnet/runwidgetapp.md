1. If you haven't already done so, [set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
1. If you haven't already done so, [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
1. Locate the sample apps solution file in the following path:
`...\okta-idx-dotnet\samples\samples-aspnet\embedded-sign-in-widget`.
1. In Visual Studio, open `embedded-sign-in-widget.sln`.
1. Right-click the `embedded-sign-in-widget` project (the sample app), and select **Set as startup project**.
1. Add the `okta.yaml` configuration file. See [Option 1: Create a configuration file](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/#option-1-create-a-configuration-file) for more information on how to configure
   and where to place the configuration file.
1. Click Visual Studio's play button and run the solution. The default web browser should open and navigate to the app's home page. The URL should be `https://localhost:44314`, which is the default address when using IISExpress. After the app loads, click the **Sign In** button located on the home screen.
1. On the sign-in page, enter the username (email) and password that you used in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-your-okta-account).

   ![Displays the Sign-In Widget](/img/oie-embedded-sdk/oie-embedded-widget-use-case-sign-in-screen.png)

1. Sign in to the app. After you've signed in successfully, the app redirects you to the user profile page that displays
   basic user profile and security token information.

   ![Displays an example user profile page](/img/oie-embedded-sdk/oie-embedded-sdk-sample-app-user-profile-page.png)

## Troubleshoot

* If you get a Null Reference exception when the `IDXClient` is instantiated, then ensure that you have properly set up your local configurations. To troubleshoot the error, set the local configurations in the constructor for the `IdxClient` so that you can determine if the issue originates from the SDK not being able to locate your configurations.

* If the "There was an unexpected internal error. Please try again." message is displayed instead of the Sign-In Widget, then verify that CORS is enabled. Follow the steps in [Add a trusted origin and enable CORS](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#add-a-trusted-origin-and-enable-cors) to enable CORS.
