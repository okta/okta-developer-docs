Update the key/value pairs in the `okta.properties` file found in the `okta-idx-android` project root directory.

1. Open the `okta-idx-android` project in Android Studio.
2. Locate and open the `okta.properties` file in the project root directory, which is a property file that stores the name and value for each configuration setting.
3. Add the following values and close the file when you finish:

    ```json
    issuer=https://{example.okta.com}/oauth2/default
    clientId=clientID_from_client_app
    redirectUri=com.okta.sample.android:/login
    ```
