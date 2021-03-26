From the Okta CLI, complete the following steps to create a web app with OpenID Connect (OIDC) sign-in:

1. Enter the command: `okta apps create`.

2. Enter your app name.

3. Choose **Web** (the default) for the **Type of Application**.

> **Note:** **Web** is typically used for applications using tokens in server-side code. For applications using tokens in Angular, React, Vue, or other browser-side code, choose **Single Page App**.

4. Choose **Other** (the default) for the **Framework of Application** selection.

> **Note:** When you choose **Other**, the Okta CLI writes your credentials to the `.okta.env` file after app registration. For all the other web options (Spring Boot, JHipster, etc.), the Okta CLI sends the credentials directly to the application-specific file. For example, credentials are sent to the `src/main/resources/application.properties` file for Spring Boot applications.

4. Enter the **Redirect URI(s)**. If you are using one of the sample apps, you can enter `http://localhost:8080/login/callback`.

When the Okta CLI finishes adding your app, the issuer ID, client ID, and client secret credentials are written to your app-specific configuration file.
```
Configuring a new OIDC Application, almost done:
Created OIDC application, client-id: <client-ID>

Okta application configuration has been written to: <home-dir>/.okta.env
```

The Okta CLI sends the following variables to your app-specific configuration file:
- `OKTA_OAUTH2_ISSUER`&mdash;the authorization server URI that will perform authentication
- `OKTA_OAUTH2_CLIENT_ID`&mdash;the public identifier for the client that is required for all OAuth flows
- `OKTA_OAUTH2_CLIENT_SECRET`&mdash;the secret key used by the client to exchange an authorization code for a token

> **Note:** If you chose **Single Page App** as the application type, the Okta CLI displays the issuer ID and client ID in the terminal after registration; credentials are not sent to a configuration file.