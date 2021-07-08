## Steps to test the embedded SDK sample app

1. Locate the embedded SDK sample app source files in the following path: `...\okta-idx-java\samples\embedded-auth-with-sdk`.

1. Obtain app-specific configuration values (such as `{clientId}`, `{clientSecret}`, `{yourOktaDomain}`) from the app integration you've created in [Create new application](/docs/guides/oie-embedded-common-org-setup/java/main/#step-4-create-new-application).

1. Execute `mvn` with your app-specific configuration as Java system properties. See [Option 4: Java system properties](/docs/guides/oie-embedded-common-download-setup-app/java/main/#option-4-java-system-properties). For example:<br>
   ```bash
   mvn -Dokta.idx.issuer=https://{yourOktaDomain}/oauth2/default \
      -Dokta.idx.clientId={clientId} \
      -Dokta.idx.clientSecret={clientSecret} \
      -Dokta.idx.scopes="openid profile offline_access" \
      -Dokta.idx.redirectUri=http://localhost:8080
   ```

1. Navigate to the sample app's home page on your browser: `http://localhost:8080`. <br>The Welcome to the Okta Samples for Java page appears with your app's configuration values.

1. Click **Login** on the welcome page.
1. Enter the **Username** and **Password** for the user that you've created in
   [Create your Okta account](/docs/guides/oie-embedded-common-org-setup/java/main/#create-your-okta-account).

1. Click **Login**. <br>If successful, the app redirects you to a page that displays basic user profile and security token information.

1. Click **Logout** in the upper-right corner of the page to sign out of the sample app.
