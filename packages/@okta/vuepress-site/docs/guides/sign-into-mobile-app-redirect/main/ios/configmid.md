Create the Okta configuration file and add the keys and values for your application integration:

1. Create a new property list file in your project named Okta.
1. Add the following `String` keys and their associated values to the dictionary:

   | Key | Value |
   | --- | ----- |
   | `clientId` | The client ID from the app integration that you created, such as `0ux3rutxocxFX9xyz3t9` |
   | `issuer` | The domain of your registered Okta org followed by `/oauth2/default`, such as `https://dev-1234567.okta.com/oauth2/default` |
   | `logoutRedirectUri` | The post-logout redirect URI from the app integration that you created, such as `com.okta.dev-1234567:/` |
   | `redirectUri` | The Redirect URI from the app integration that you created, such as `com.okta.dev-1234567:/callback` |
   | `scopes` | A string with the value `openid profile offline_access` |{:.table .table-word-break}

#### Configure the SDK for your Okta org

This sample app configures the SDK only once, when the view appears.

1. Import the Okta SDK and add state variables for the authorization session and state manager to `ContentView.swift`:

   ```swift
   ...
   import OktaOidc

   struct ContentView: View {
     @State private var authSession: OktaOidc? = nil
     @State private var authStateManager: OktaOidcStateManager? = nil

     ...
   ```

2. Configure the SDK by updatating the `configureSDK` function:

   ```swift
   func configureSDK () {
     guard let config = try? OktaOidcConfig.default(),
       let oktaAuth = try? OktaOidc(configuration: config) else {
         // Fatal error as the configuration isn't editable in this app.
         showError(title: "Fatal Error",
           message: "Unable to read the Okta configuration. Exit the app.")
         return
       }
     self.authSession = oktaAuth
   }
   ```

The function first creates a configuration using the plist that you created above, and then it initalizes the SDK using that configuration.