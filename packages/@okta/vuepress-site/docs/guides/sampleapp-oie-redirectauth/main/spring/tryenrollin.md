1. From the command line inside the `okta-hosted-login` directory, run the following `mvn` commands to start the application. Use the information that you copied in previous steps.

    `mvn -Dokta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default` \
    `-Dokta.oauth2.clientId={clientId}` \
    `-Dokta.oauth2.clientSecret={clientSecret}` \
    `-Dokta.oauth2.postLogoutRedirectUri={absoluteLogoutRedirectUri}`

2. Open `localhost:8080` in an incognito/private window and then click **Login** on the landing page.
