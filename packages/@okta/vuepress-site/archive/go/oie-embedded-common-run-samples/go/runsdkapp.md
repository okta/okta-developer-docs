
1. If you haven't already done so, [set up your Okta org](/docs/guides/set-up-org/#set-up-your-okta-org-for-a-password-factor-only-use-case).
1. If you haven't already done so, download and set up the sample app.
1. Open the embedded SDK sample app directory using Visual Studio Code or your preferred IDE. The directory path to the sample app is `samples-golang/identity-engine/embedded-auth-with-sdk`.
1. Add an `okta.yaml` configuration file. See Option 1: Create a configuration file for more information on how to configure and where to place the configuration file.
1. Open a terminal and go to the SDK's sample app directory (`samples-golang/identity-engine/embedded-auth-with-sdk`).
1. Run the following command: `go run main.go`
1. In a web browser, go to `http://localhost:8000/`. The home page of the Golang SDK sample app appears.
1. Click **Sign In**.
1. On the sign-in page, enter the username (email) and password that you used in [Create your Okta account](/docs/guides/set-up-org/#create-your-okta-account).
1. If you've successfully signed in, you see a signed in page displaying your user profile information.

### Work with the use cases

After you successfully run the sample app, you can build your own integration. Use the sample app as your guide. Explore use cases that are available with the SDK, starting with the Basic sign-in flow using the password factor use case.
