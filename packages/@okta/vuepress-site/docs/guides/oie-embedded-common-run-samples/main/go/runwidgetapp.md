
The sample app is the Golang embedded Sign-In Widget sample app (archived).

1. Configure your Okta org by completing the steps in [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
1. [Download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/go/main/).
1. Open the embedded widget project using Visual Studio Code or
   your preferred IDE. The directory path to the sample app directory is: `samples-golang/identity-engine/embedded-sign-in-widget`.
1. Add an `okta.yaml` configuration file. See [Option 1: Create a configuration file](/docs/guides/oie-embedded-common-download-setup-app/go/main/#option-1-create-a-configuration-file) for more information on how to configure and where to place the configuration file.
1. From the command line:
   1. Go to the project directory (`/samples-golang/identity-engine/embedded-sign-in-widget/`).
   1. Call `go get` to install dependencies.
   1. Call `go run main.go` to start the app.
1. In a web browser, go to `http://localhost:8000/`. The app's landing page appears.
1. Click **Login**.
1. On the sign-in page, enter the username (email) and password that you've used in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/go/main/#create-your-okta-account).
1. If you successfully sign in, you see a signed in page customized with your name.

### Troubleshoot

* If the "There was an unexpected internal error. Please try again." message appears instead of the Sign-In Widget, then verify that CORS is enabled. Follow the steps in [Add a trusted origin and enable CORS](/docs/guides/oie-embedded-common-org-setup/go/main/#add-a-trusted-origin-and-enable-cors) to enable CORS.

### Start your work with the use cases

After you successfully run the sample app, the next step is to build your integration by using the sample app as your guide. See [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/go/main/) to start using the Widget and explore the available use cases.
