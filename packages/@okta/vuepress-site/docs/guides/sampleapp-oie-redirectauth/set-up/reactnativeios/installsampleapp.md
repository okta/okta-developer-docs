1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-js-react-native.git`
2. From the command line, enter the `browser-sign-in` directory and install the iOS dependencies:
    `cd ios`
    `pod install`
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

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> app.
