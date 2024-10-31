> **Note:** The Okta Java SDK embedded Sign-In Widget sample app uses the Spring Boot framework. See [Spring Boot Getting Started](https://spring.io/guides/gs/spring-boot/).

1. Ensure that you've [Set up your Okta org for a password factor only use case](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

1. Obtain app-specific configuration values (such as `{clientId}`, `{clientSecret}`, `{yourOktaDomain}`) from the [app integration](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application) you've created in Okta.

1. From your command shell, locate the source files for the embedded Sign-In Widget sample apps in the cloned Java SDK project: `...\okta-idx-java\samples\embedded-sign-in-widget`.

1. Set the app-specific environment variables:

   ```bash
   export OKTA_OAUTH2_ISSUER=https://{yourOktaDomain}/oauth2/default
   export OKTA_OAUTH2_CLIENTID={clientId}
   export OKTA_OAUTH2_CLIENTSECRET={clientSecret}
   export OKTA_IDX_SCOPES="openid profile offline_access"
   export OKTA_OAUTH2_REDIRECTURI=http://localhost:8080
   ```

1. Execute `mvn` from the `...\okta-idx-java\samples\embedded-sign-in-widget\` root directory, and then go to the sample app's home page on your browser: `http://localhost:8080`. The Embedded Sign-In Widget + Spring Boot Example page appears.

1. Click **Next**, and then enter the **Username** and **Password** for the user that you used to [create your Okta account](/docs/guides/oie-embedded-common-org-setup/java/main/#create-your-okta-account).

1. Click **Sign in**. After you've successfully signed in, the app redirects you to the Embedded Sign-In Widget + Spring Boot Example home page. You can view your user profile by selecting **My Profile** in the upper-left corner of the page.

1. Click **Logout** in the upper-right corner when you finish.

### Start your work with the use cases

The next step is to build your integration using the sample app. See [Load the widget](/docs/guides/oie-embedded-widget-use-case-load/java/main/) to start using the widget and explore the available use cases.
