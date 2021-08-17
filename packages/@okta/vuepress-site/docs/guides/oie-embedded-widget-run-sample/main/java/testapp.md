> **Note:** The Okta Java SDK embedded Sign-In Widget sample app uses the Spring Boot framework. See [Spring Boot Getting Started](https://spring.io/guides/gs/spring-boot/) for more information on Spring.

## Steps to test the sample app

1. Ensure that you've [set up your Okta org for one password factor only use cases](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

1. Obtain app-specific configuration values (such as `${clientId}`, `${clientSecret}`, `${yourOktaDomain}`) from the [app integration](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application) you've created in Okta.

1. From your command shell, locate the embedded Sign-in Widget sample apps source files from the cloned Java SDK project: `...\okta-idx-java\samples\embedded-sign-in-widget`.

1. Set the app-specific environment variables:

   ```bash
   export OKTA_OAUTH2_ISSUER=https://{yourOktaDomain}/oauth2/default
   export OKTA_OAUTH2_CLIENTID={clientId}
   export OKTA_OAUTH2_CLIENTSECRET={clientSecret}
   export OKTA_IDX_SCOPES="openid profile offline_access"
   export OKTA_OAUTH2_REDIRECTURI=http://localhost:8080
   ```

1. Execute `mvn` from the `...\okta-idx-java\samples\embedded-sign-in-widget\` sample app root directory.

1. Navigate to the sample app's home page on your browser: `http://localhost:8080`. <br>The Embedded Sign-In Widget + Spring Boot Example page appears.

1. Click **Next**. The Sign-In Widget appears.
1. Enter the **Username** and **Password** for the user that you used to [create your Okta account](/docs/guides/oie-embedded-common-org-setup/java/main/#create-your-okta-account).

1. Click **Sign in**. <br>After you've successfully signed in, the app redirects you to the Embedded Sign-In Widget + Spring Boot Example home page.

1. Click **My Profile** in the upper-left corner of the page to view your basic user profile information.

1. Click **Logout** in the upper-right corner of the page to sign out of the sample app.
