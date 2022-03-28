Update the key/value pairs in the `okta.properties` file found in the project root directory.

1. Open the cloned project in Android Studio.
2. Locate and open the `okta.properties` file in the project root directory, which is a property file that stores the name and value for each configuration setting.
3. Add the following values and close the file when you finish:

    ```json
    issuer={yourIssuerUrl}
    clientId={yourClientId}
    redirectUri=com.okta.sample.android:/login
    ```
