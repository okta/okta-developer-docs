1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-js-react-native.git`
2. From the command line, enter the `browser-sign-in` directory and run `npm install` to install the dependencies.
3. Within the `samples-react-native` directory, edit the `samples.config.js` file in the `browser-sign-in` directory with the information that you copied in previous steps:

    ```javascript
    export default {
        oidc: {
    	    clientId: `{yourAppClientId}`,
    	    redirectUri: `com.okta.example:/callback`,
    	    endSessionRedirectUri: `com.okta.example:/logoutCallback`,
    	    discoveryUri: `https://${yourOktaDomain}/oauth2/default`,
    	    scopes: ['openid', 'profile', 'offline_access'],
    	    requireHardwareBackedKeyStore: false,
  	        },
        };
    ```

    > **Note:** The `discovery_uri` is the issuer URL that you built in a previous step.

4. To redirect back to your application, you must specify a unique URI to your app. To do this, define a gradle manifest placeholder in the `build.gradle` file located in the `browser-sign-in` > `android` > `app` directory.

    ```bash
    android.defaultConfig.manifestPlaceholders = [
        "appAuthRedirectScheme": "com.okta.example"
        ]
    ```

> **Note:** Make sure that this value is consistent with the redirect URI that you added to the `samples.config.js` file. For example, if your redirect URI is `com.okta.example:/callback`, then the `appAuthRedirectScheme` should be `com.okta.example`.

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> app.
