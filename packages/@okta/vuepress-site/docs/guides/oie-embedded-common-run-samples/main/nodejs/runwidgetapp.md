The sample app is located here: `okta-auth-js/samples/generated/express-embedded-sign-in-widget`

1. If you haven't already done so, [set up your Okta org](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
1. If you haven't already done so, [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/).
1. Locate the sample app in the following directory:
`okta-auth-js/samples/generated/express-embedded-sign-in-widget` and ensure the module dependencies are installed. See [Install module dependencies](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#install-module-dependencies).
1. Open the embedded Widget sample application directory using Visual Studio Code or your preferred IDE.
1. Add a `testenv` configuration file. See [Option 1: Create a configuration file](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#option-1-create-a-configuration-file) for further information.
1. From the terminal, navigate to the `express-embedded-sign-in-widget` sample directory and run the application: `npm run start`. This process sets the environment variables and starts the web server. Check the console to see that the environment variables are set.
1. Open a browser window and navigate to the app's home page at `http://localhost:8080`. After the app loads, click the **Sign In** button located on the home screen.
1. On the sign-in page, enter the username (email) and password you used in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#create-your-okta-account).
1. If you've successfully signed in, the app redirects you to the user profile page that displays basic user profile and security token information.

### Troubleshoot

* If the widget doesn't load, verify that you have properly set up your local configurations. Follow the steps in [Set the configuration values](/docs/guides/oie-embedded-common-download-setup-app/nodejs/main/#set-the-configuration-values).

* If the "There was an unexpected internal error. Please try again." message appears instead of the Sign-In Widget, then verify that CORS is enabled. Follow the steps in [Add a trusted origin and enable CORS](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#add-a-trusted-origin-and-enable-cors) to enable CORS.

### Start your work with the use cases

After you successfully run the sample app, the next step is to build your integration by using the sample app as your guide. See [Load the widget](/docs/guides/oie-embedded-widget-use-case-load/nodejs/main/) to start using the widget and explore the available use cases.
