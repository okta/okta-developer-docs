## Steps to test the sample app

<<<<<<< HEAD
1. If not already done, set up your Okta org by completing these steps: [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
=======
1. If not already done, set up your Okta org by completing these steps: [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
>>>>>>> 9c5aeda3289e2cb6ba7230a94a5cb13e55b33603
1. If not already done,
   [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/).
1. Locate the sample apps solution file in the following path:
`...\okta-auth.js\samples\generated\express-embedded-auth-with-sdk` and ensure the module dependencies are installed. See [Install the module dependencies](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#install-the-module-dependencies).
1. Open `express-embedded-auth-with-sdk` using Visual Studio or the editor of your choice.
1. Add a `testenv` configuration file. See [Option 1: Create a configuration file](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#option-1-create-a-configuration-file) for further information.
1. From the terminal, navigate to the `express-embedded-sign-in-widget` sample directory and run the application: `npm run start`. This process sets the environment variables and starts the web server. Check the console to see that the environment variables are set.
1. Open a browser window and navigate to the app's home page. The URL should be:
   `http://localhost:8080`. After the app loads, click the **Sign In** button located on the home screen.
1. On the Sign in page enter the username (email) and password you used in
   [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-your-okta-account).
   A screenshot of the sign-in form is shown below:

   <div class="common-image-format">

    ![Sample app sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-sample-app-signin.png)

   </div>

1. Click **Sign In**. If successful, the app should redirect you to the user profile page that displays basic user profile and security token information.

   <div class="common-image-format">

    ![Example user profile page](/img/oie-embedded-sdk/Embedded-SIW-profile-page-nodejs.png)

   </div>

## Troubleshooting

* If the Widget does not load or hangs, check to make sure you have properly set up your local
   configurations. Follow the steps in [Configuration Settings](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#where-to-place-the-configurations).

* If the Widget does not load and instead displays the following error:
   “There was an unexpected internal error. Please try again.”,
   make sure CORS is enabled. Follow the steps in
<<<<<<< HEAD
   [Add a trusted origin and enable CORS](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#step-3-add-a-trusted-origin-and-enable-cors) to make sure CORS is enabled.
=======
   [Add a trusted origin and enable CORS](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#add-a-trusted-origin-and-enable-cors)
   to make sure CORS is enabled.
>>>>>>> 9c5aeda3289e2cb6ba7230a94a5cb13e55b33603
