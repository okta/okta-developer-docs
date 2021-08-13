The sample app is located here: `samples-golang/identity-engine/embedded-sign-in-widget`

## Steps to test the sample app

1. If not already done, set up your Okta org by completing the steps at [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-password-factor-only-use-cases).
1. If not already done, [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/go/main/).
1. Open the embedded widget sample application directory using Visual Studio Code or
   your preferred IDE. The directory path to the sample application directory is: `samples-golang/identity-engine/embedded-sign-in-widget`.
1. Add an `okta.yaml` configuration file. See [Option 1: YAML configuration file](/docs/guides/oie-embedded-common-download-setup-app/go/main/#option-1-configuration-file) for more information on how to configure and where to place the configuration file.
1. Open a terminal and go to the Widget's sample application directory (`samples-golang/identity-engine/embedded-sign-in-widget`).
1. Run the following command to install dependencies: `go get`
1. Run the following command to start the application: `go run main.go`
1. In a web browser, navigate to `http://localhost:8000/`. The homepage should look like the following:

   <div class="common-image-format">

    ![The home page of the Golang widget sample application](/img/oie-embedded-sdk/oie-embedded-widget-golang-sample-app-home-page.png)

   </div>

1. Click **Login**.
1. On the log-in page enter the username (email) and password that you used in
[Create your Okta account](/docs/guides/oie-embedded-common-org-setup/go/main/#create-your-okta-account).
1. If the sign-in was successful, the following screen will load and display the user name and
   **Logout** link:

   <div class="common-image-format">

    ![The default user page showing the user profile information](/img/oie-embedded-sdk/oie-embedded-widget-golang-sample-app-user-default-page.png)

   </div>

## Troubleshooting

* If the widget doesn't load in the page and instead displays "There was an unexpected internal error. Please try again.", make sure CORS is enabled. Follow the steps in [Add a trusted origin and enable CORS](/docs/guides/oie-embedded-common-org-setup/go/main/#step-3-add-a-trusted-origin-and-enable-cors) to enable CORS.
