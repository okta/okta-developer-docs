
The sample app is in the [Go embedded Sign-In Widget sample app](https://github.com/okta/samples-golang/tree/master/identity-engine/embedded-sign-in-widget) repository.

Before you start, ensure you properly [configured your Okta org](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-a-password-factor-only-use-case) and completed the steps in the [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/go/main/) section.

1. Open the embedded sample app directory of the Sign-In Widget using Visual Studio Code or your preferred IDE. The directory path to the sample application directory is: `samples-golang/identity-engine/embedded-sign-in-widget`.
1. Add an `okta.yaml` configuration file. See [Option 1: Create a configuration file](/docs/guides/oie-embedded-common-download-setup-app/go/main/#option-1-create-a-configuration-file) for more information on how to configure and where to place the configuration file.
1. From the command line, go to the sample application directory (`../samples-golang/identity-engine/embedded-sign-in-widget/`).
1. From the command line, execute the following command to install dependencies: `go get`
1. From the command line, execute the following command to start the application: `go run main.go`
1. In a web browser, go to `http://localhost:8000/`. The landing page for the Go embedded app appears.
1. Click **Login**.
1. On the sign-in page, enter the username (email) and password that you used in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/go/main/#create-your-okta-account). If you succeeded, you see a signed in page customized with your name.

### Troubleshoot

If the "There was an unexpected internal error. Please try again." message appears instead of the Sign-In Widget, then you should verify that CORS is enabled. Follow the steps in [Add a trusted origin and enable CORS](/docs/guides/oie-embedded-common-org-setup/go/main/#add-a-trusted-origin-and-enable-cors) to enable CORS.

### Start your work with the use cases

After successfully running the sample app, you can build your integration by using this sample as your guide. See [Load the widget](/docs/guides/oie-embedded-widget-use-case-load/go/main/) to start using the Sign-In widget. You can also explore the available use cases.
