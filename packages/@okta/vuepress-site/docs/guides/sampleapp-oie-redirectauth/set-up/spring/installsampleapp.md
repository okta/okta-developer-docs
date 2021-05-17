1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-java-spring.git`
2. From the command line, enter the `okta-hosted-login` directory and run the following `mvn` commands to start the application using the information that you copied in previous steps:

    `mvn -Dokta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default` \
    `-Dokta.oauth2.clientId={clientId}` \
    `-Dokta.oauth2.clientSecret={clientSecret}` \
    `-Dokta.oauth2.postLogoutRedirectUri={absoluteLogoutRedirectUri}`

    > **Note:** This example is only for testing. Don't put client secrets on the command line in production environments. Instead, we recommend that you store them as environment variables.

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
