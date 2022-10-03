
The sample app is located here in the [Golang embedded Sign-In Widget sample app](https://github.com/okta/samples-golang/tree/master/identity-engine/embedded-sign-in-widget) respository.

1. Ensure that you've configured your Okta org properly by completing the steps in [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
1. Ensure that you've completed the steps in [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/go/main/).
1. Open the embedded Widget sample application directory using Visual Studio Code or
   your preferred IDE. The directory path to the sample application directory is: `samples-golang/identity-engine/embedded-sign-in-widget`.
1. Add an `okta.yaml` configuration file. See [Option 1: Create a configuration file](/docs/guides/oie-embedded-common-download-setup-app/go/main/#option-1-create-a-configuration-file) for more information on how to configure and where to place the configuration file.
1. From the command line, navigate to the Widget's sample application directory (`../samples-golang/identity-engine/embedded-sign-in-widget/`).
1. From the command line, execute the following command to install dependencies: `go get`
1. From the command line, execute the following command to start the application: `go run main.go`
1. In a web browser, navigate to `http://localhost:8000/`. The Golang embedded Widget app landing page appears.
1. Click **Login**.
1. On the sign-in page, enter the username (email) and password that you've used in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/go/main/#create-your-okta-account).
1. If you successfully sign in, you'll see a signed in screen customized with your name.

### Troubleshoot

* If the "There was an unexpected internal error. Please try again." message appears instead of the Sign-In Widget, then verify that CORS is enabled. Follow the steps in [Add a trusted origin and enable CORS](/docs/guides/oie-embedded-common-org-setup/go/main/#add-a-trusted-origin-and-enable-cors) to enable CORS.

### Start your work with the use cases

After you successfully run the sample app, the next step is to build your integration by using the sample app as your guide. See [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/go/main/) to start using the Widget and explore the available use cases.
