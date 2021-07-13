## Steps to test the sample app

1. If not already done, set up your Okta org by completing these steps: [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).
1. If not already done,
   [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/).
1. Locate the sample apps solution file in the following path:
`...\okta-auth-js\samples\generated\express-embedded-auth-with-sdk`
1. Open `express-embedded-auth-with-sdk` using Visual Studio or the editor of your choice.
1. Add a `testenv` configuration file. See [Option 1: Configuration file](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#option-1-configuration-file) for further information.
1. From the terminal, navigate to the `express-embedded-auth-with-sdk` sample directory and run the application: `npm run start`. This process sets the environment variables and starts the web server. Check the console to see that the environment variables are set.
1. Add an `okta.yaml` configuration file. See [Option 1: YAML configuration file](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/#option-1-configuration-file) for more information on how to configure and where to place the configuration file.
1. Open a browser window and navigate to the app's home page. The URL should be:
   `http://localhost:8080`. After the app loads, click the **Sign In** button located on the home screen.
1. On the Sign In page enter the username (email) and password that you used in
   [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-your-okta-account).
   The following is a screenshot of the sign-in form:

   <div class="common-image-format">

    ![Sample app sign in](/img/oie-embedded-sdk/oie-embedded-sdk-sample-app-signin.png
   "Sample app sign in")

   </div>

1. Click **Sign In**. If successful, the app should redirect you to the user profile page that displays basic user profile and security token information.

   <div class="common-image-format">

   ![User profile page](/img/oie-embedded-sdk/Embedded-SIW-profile-page-nodejs.png
   "User profile page")

   </div>
