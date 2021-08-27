## Steps to test the sample app

1. If not already done, set up your Okta org by completing these steps: [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-password-factor-only-use-cases).
1. If not already done, [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/go/main/).
1. Open the embedded SDK sample application directory using Visual Studio Code or
   your preferred IDE. The directory path to the sample application directory is: `samples-golang/identity-engine/embedded-auth-with-sdk`.
1. Add an `okta.yaml` configuration file. See [Option 1: YAML configuration file](/docs/guides/oie-embedded-common-download-setup-app/go/main/#option-1-configuration-file) for more information on how to configure and where to place the configuration file.
1. Open a terminal and go to the SDK's sample application directory (`samples-golang/identity-engine/embedded-auth-with-sdk`).
1. Run the following command: `go run main.go`
1. In a web browser, navigate to `http://localhost:8000/`. The homepage should look like the following:

   <div class="common-image-format">

    ![The home page of the Golang SDK sample application](/img/oie-embedded-sdk/oie-embedded-sdk-golang-sample-app-home-page.png)

   </div>

1. Click **Sign In**.
1. On the sign-in page enter the username (email) and password that you used in
[Create your Okta account](/docs/guides/oie-embedded-common-org-setup/go/main/#create-your-okta-account).
1. If sign-in was successful, the following screen will load and display the user profile
information:

   <div class="common-image-format">

   ![The default user page that shows the user profile information](/img/oie-embedded-sdk/oie-embedded-SDK-golang-sample-app-user-default-page.png)

   </div>
