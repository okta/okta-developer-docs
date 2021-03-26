From the Okta CLI, complete the following steps to create a web app with OpenID Connect (OIDC) sign-in:

1. Enter the following command to create your app:
```
okta apps create
```
2. Enter your app name.
```
Application name [testuser]: 
```
3. Choose **Web** (the default) for the **Type of Application**.
```
(The Okta CLI only supports a subset of application types and properties):
> 1: Web
> 2: Single Page App
> 3: Native App (mobile)
> 4: Service (Machine-to-Machine)
Enter your choice [Web]:
```
> **Note:** **Web** is typically used for applications using tokens in server-side code. For applications using tokens in Angular, React, Vue, or other browser-side code, choose **Single Page App**.

4. Choose **Other** (the default) for your secondary **Type of Application** selection.

```
Type of Application
> 1: Okta Spring Boot Starter
> 2: Spring Boot
> 3: JHipster
> 4: Quarkus
> 5: Other
Enter your choice [Other]:
```
> **Note:** When you choose **Other**, the Okta CLI writes your credentials to the `.okta.env` file. For all the other web options (Spring Boot, JHipster, etc.), the Okta CLI sends the credentials directly to the application-specific file. For example, credentials are sent to `src/main/resources/application.properties` file for Spring Boot applications.

4. Enter the **Redirect URI(s)**. If you are using one of the sample apps, you can enter `http://localhost:8080/login/callback`.

```
Redirect URI
Common defaults:
 JHipster - http://localhost:8080/login/oauth2/code/oidc
 Quarkus OIDC - http://localhost:8080/callback
 Spring Security - http://localhost:8080/login/oauth2/code/okta
Enter your Redirect URI(s) [http://localhost:8080/callback]: http://localhost:8080/login/callback
Enter your Post Logout Redirect URI(s) [http://localhost:8080/]:
```
When the Okta CLI finishes adding your app, the issuer ID, client ID, and client secret credentials are written to the appropriate configuration file.
```
Configuring a new OIDC Application, almost done:
Created OIDC application, client-id: 0oad95td4fs8kyPQc5d6

Okta application configuration has been written to: /Users/<currentUser>/.okta.env
```

The Okta CLI sends the following variables to the app-specific configuration file:
- `OKTA_OAUTH2_ISSUER`&mdash;the authorization server URI that will perform authentication
- `OKTA_OAUTH2_CLIENT_ID`&mdash;the public identifier for the client that is required for all OAuth flows
- `OKTA_OAUTH2_CLIENT_SECRET`&mdash;the secret key used by the client to exchange an authorization code for a token