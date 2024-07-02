The SDK loads the configuration values from a configuration file named `Okta.plist` if it exists in your main bundle. You may also specify the values in code using `WebAuthentication(issuer:clientId:scopes:redirectUri:logoutRedirectUri:additionalParameters:)`.

Create the Okta configuration file and add the keys and values for your application integration:

1. Create a new property list file in your project named Okta.
1. Add the following `String` keys and their associated values to the dictionary:

   | Key | Value |
   | --- | ----- |
   | `clientId` | The client ID from the app integration that you created, such as `0ux3rutxocxFX9xyz3t9` |
   | `issuer` | The domain of your registered Okta org followed by `/oauth2/default`, such as `https://dev-1234567.okta.com/oauth2/default` |
   | `logoutRedirectUri` | The sign-out redirect URI from the app integration that you created, such as `com.okta.dev-1234567:/` |
   | `redirectUri` | The sign-in redirect URI from the app integration that you created, such as `com.okta.dev-1234567:/callback` |
   | `scopes` | A string with the value `openid profile offline_access` |
   [[.table-word-break]]
