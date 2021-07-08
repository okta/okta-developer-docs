
## Steps to test the embedded Sign-In Widget sample app

1. Ensure that you have configured your Okta Org for password factor only. See [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

1. Locate the Sign-in Widget sample apps source files from the cloned Java SDK project:
`...\okta-idx-java\samples\embedded-sign-in-widget`

1. Obtain app-specific configuration values (such as `{clientId}`, `{clientSecret}`, `{yourOktaDomain}`) from the app integration you've created in [Create new application](/docs/guides/oie-embedded-common-org-setup/java/main/#step-4-create-new-application).

1. Execute `mvn` with your app-specific configuration as Java system properties. See [Option 4: Java system properties](/docs/guides/oie-embedded-common-download-setup-app/java/main/#option-4-java-system-properties). For example:<br>
   ```bash
   mvn -Dokta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default \
      -Dokta.oauth2.clientId={clientId} \
      -Dokta.oauth2.clientSecret={clientSecret} \
      -Dokta.idx.scopes="openid profile offline_access" \
      -Dokta.oauth2.redirectUri=http://localhost:8080/login
   ```

1. Navigate to the sample app's home page on your browser: `http://localhost:8080`. <br>The Embedded Sign In Widget + Spring Boot Example page appears.

1. Click **Next**. The Sign-In Widget appears.
1. Enter the **Username** and **Password** for the user that you've created in
   [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/java/main/#create-your-okta-account).

1. Click **Sign in**. <br>If successful, the app redirects you to the Embedded Sign In Widget + Spring Boot Example home page.

1. Click **My Profile** in the upper-left corner of the page to view the signed-in user's basic user profile information.

1. Click **Logout** in the upper-right corner of the page to sign out of the sample app.
