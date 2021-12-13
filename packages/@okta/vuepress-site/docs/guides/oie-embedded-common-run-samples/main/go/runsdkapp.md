
1. If you haven't already done so, [set up your Okta org](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
1. If you haven't already done so, [download and set up the sample app](/docs/guides/oie-embedded-common-download-setup-app/go/main/).
1. Open the embedded SDK sample application directory using Visual Studio Code or
   your preferred IDE. The directory path to the sample application is `samples-golang/identity-engine/embedded-auth-with-sdk`.
1. Add an `okta.yaml` configuration file. See [Option 1: Create a configuration file](/docs/guides/oie-embedded-common-download-setup-app/go/main/#option-1-create-a-configuration-file) for more information on how to configure and where to place the configuration file.
1. Open a terminal and navigate to the SDK's sample application directory (`samples-golang/identity-engine/embedded-auth-with-sdk`).
1. Run the following command: `go run main.go`
1. In a web browser, navigate to `http://localhost:8000/`. The following home page appears:

   ![The home page of the Golang SDK sample application](/img/oie-embedded-sdk/oie-embedded-sdk-golang-sample-app-home-page.png)

1. Click **Sign In**.
1. On the sign-in page, enter the username (email) and password that you used in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/go/main/#create-your-okta-account).
1. If you've successfully signed in, the following user profile information appears:

   ![The default user page that shows the user profile information](/img/oie-embedded-sdk/oie-embedded-SDK-golang-sample-app-user-default-page.png)

### Work with the use cases

After you successfully run the sample app, you can build your own integration by using the sample app as your guide. Explore use cases that are available with the SDK, starting with the [Basic sign-in flow using the password factor](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/go/main/) use case.
