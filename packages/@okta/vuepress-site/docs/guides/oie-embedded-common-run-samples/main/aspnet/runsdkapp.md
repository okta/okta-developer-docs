
1. If you haven't already done so, [set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-password-factor-only-use-case). Then, [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
1. Locate the solution file for the sample apps:
`...\okta-idx-dotnet\samples\samples-aspnet\embedded-auth-with-sdk`.
1. Open `embedded-auth-with-sdk.sln` using Visual Studio, right-click the `embedded-auth-with-sdk` project (the sample app), and then select **Set as startup project**.
1. Add an `okta.yaml` configuration file. See [Option 1: Create a configuration file](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/#option-1-create-a-configuration-file).
1. Click Visual Studio's play button and run the solution. The default web browser should open and go to the app's home page. The URL should be `https://localhost:44314`, which is the default address when using IISExpress.
1. After the app loads, click **Sign In** on the app's home page. Then, enter the username (email) and password that you used in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-your-okta-account).
1. Click **Sign In**. If successful, the app redirects you to the user profile page that displays basic user profile and security token information.

### Work with the use cases

After you successfully run the sample app, you can build your own integration by using the sample app as your guide. Explore use cases that are available with the SDK, starting with the [Basic sign-in flow example with the password factor](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/aspnet/main/) use case.
