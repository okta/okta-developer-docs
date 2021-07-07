## Steps to test the sample app

1. If not already done, set up your Okta org by completing these steps: [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).
1. If not already done,
   [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/).
1. Locate the sample apps solution file in the following path:
`...\okta-idx-java\samples\embedded-auth-with-sdk`
1. Add an `okta.yaml` configuration file. See [Option 1: YAML configuration file](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/#option-1-configuration-file) for more information on how to configure and where to place the configuration file.
1. Type `mvn install`. The default web browser
   should open and navigate to the app's home page. The URL should be:
   `https://localhost:8080`.
   After the app loads, click **Sign In** located on the app's home page.
1. On the Sign In page enter the username (email) and password that you used in
   [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#create-your-okta-account).
   The following is a screenshot of the sign-in form:

   <div class="common-image-format">

    ![Sample app sign in](/img/oie-embedded-sdk/oie-embedded-sdk-sample-app-signin.png
   "Sample app sign in")

   </div>

1. Click **Sign In**. If successful, the app should redirect you to the user profile page that displays basic user profile and security token information.

   <div class="common-image-format">

    ![User profile page](/img/oie-embedded-sdk/oie-embedded-sdk-sample-app-user-profile-page.png
   "User profile page")

   </div>
