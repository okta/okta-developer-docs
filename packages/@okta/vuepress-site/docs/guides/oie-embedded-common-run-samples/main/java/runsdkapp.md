> **Note:** The Okta Java SDK embedded authentication sample app uses the Spring Boot framework. See [Spring Boot Getting Started](https://spring.io/guides/gs/spring-boot/).

1. [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

1. Obtain app-specific configuration values (such as `${clientId}`, `${clientSecret}`, `${yourOktaDomain}`) from the app integration that you created in [Create an application](/docs/guides/oie-embedded-common-org-setup/java/main/#create-an-application).

1. From your command shell, locate the embedded authentication SDK sample app source files in the following path: `...\okta-idx-java\samples\embedded-auth-with-sdk`.

1. Set the app-specific environment variables:

   ```bash
   export OKTA_IDX_ISSUER=https://${yourOktaDomain}/oauth2/default
   export OKTA_IDX_CLIENTID=${clientId}
   export OKTA_IDX_CLIENTSECRET=${clientSecret}
   export OKTA_IDX_SCOPES="openid profile offline_access"
   export OKTA_IDX_REDIRECTURI=http://localhost:8080
   ```

1. Execute `mvn` from the `...\okta-idx-java\samples\embedded-auth-with-sdk\` sample app root directory, and then go to the sample app's home page in your browser: `http://localhost:8080`. <br>The Welcome to the Okta Samples for Java page appears with your app's configuration values.

1. Click **Login** on the welcome page, and then enter the **Username** and **Password** for the user that you created in [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/java/main/#create-your-okta-account).

1. Click **Login**. The app redirects you to a page that displays your basic user profile and security token information.

1. Click **Logout** in the upper-right corner of the page to sign out of the sample app.

### Work with the use cases

After you run the sample app, build an integration using the sample app. Explore use cases that are available with the SDK. Start with the [Sign-in flow with password](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/java/main/).
