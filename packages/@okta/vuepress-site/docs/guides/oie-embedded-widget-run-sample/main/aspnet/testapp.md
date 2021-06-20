The sample app is located here: `okta-idx-dotnet/samples/samples-aspnet/embedded-sign-in-widget`

## Steps to test the sample app

1. If not already done, setup your Okta org by completing the steps located at
   [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).
1. If not already done,
   [download and setup the sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
1. Locate the sample apps solution file in the following path:
`...\okta-idx-dotnet\samples\samples-aspnet\embedded-sign-in-widget`
1. Open `embedded-sign-in-widget.sln` using Visual Studio
1. Right click on the embedded-sign-in-widget project (which is the sample app)
   and select **Set as startup project**.
1. Add a `okta.yaml` configuration file. For more information on how to configure
   and where to place the configuration file see [Option 1: YAML configuration file](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/#option-1-configuration-file).
1. Click Visual Studio’s play button and run the solution. The default web browser
   should open and navigate to the application home page. The URL should be:
   `https://localhost:44314`,  which is the default address when using IISExpress.
   Once the app loads, click the **Sign In** button located on the home screen.
1. On the Sign in page enter the username (email) and password you used in
   [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-your-okta-account).
   A screenshot of the log in form is shown below:

   <div class="common-image-format">

    ![Sample app sign in](/img/oie-embedded-sdk/oie-embedded-widget-sample-app-signin.png
   "Sample app sign in")

   </div>

1. Click Sign in.
1. If successful, the app should redirect you to the user profile page that displays
   basic user profile and security token information.

   <div class="common-image-format">

    ![User profile page](/img/oie-embedded-sdk/oie-embedded-sdk-sample-app-user-profile-page.png
   "User profile page")

   </div>
