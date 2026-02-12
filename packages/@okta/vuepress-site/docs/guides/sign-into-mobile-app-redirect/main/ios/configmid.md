To configure your app, the Swift Client SDK provides the following options (in order of complexity):

* [Use the Okta.plist file](#use-the-oktaplist-file)
* [Use one or more configuration files](#use-one-or-more-configuration-files)
* [Use a pre-configured OAuth2Client or a pre-configured context](#use-a-pre-configured-oauth2client-or-a-pre-configured-context)

#### Find your config values

You need one or more of your config values to set up these configurations.

If you don't have these values handy, you can find them in the Admin Console. Go to **Applications** > **Applications** and find the app integration that you created earlier:

* **Sign-in redirect URI**: Go to the **General** tab in the **Login** section.
* **Sign-out redirect URI**: Go to the **General** tab in the **Login** section.
* **Client ID**: To to the **General** tab in the **Client Credentials** section.
* **Issuer**: Go to **Security** > **API**, then the **Issuer URI** field for the authorization server.

#### Use the Okta.plist file

The app uses information from the Okta integration that you created earlier to communicate with the API:

* Redirect URI
* Post logout redirect URI
* Client ID
* Issuer

The SDK loads the configuration values from a configuration file (`Okta.plist`) if it exists in your main bundle. You can also specify the values in the code using `BrowserSignin(issuer:clientId:scopes:redirectUri:logoutRedirectUri:additionalParameters:)`.

Create the Okta configuration file and add the keys and values for your app integration:

1. Create a property list file in your project named Okta. See [Okta.plist](https://github.com/okta/okta-mobile-swift/blob/5c710b0c982af6beec143cab2385d9755ed0d308/Samples/Shared/Okta.plist).
1. Add the following `String` keys and their associated values to the dictionary:

   | Key | Value |
   | --- | ----- |
   | `clientId` | The client ID from the app integration that you created, such as `0ux3rutxocxFX9xyz3t9` |
   | `issuer_url` | The domain of your registered Okta org followed by `/oauth2/default`, such as `https://integrator-1234567.okta.com/oauth2/default` |
   | `logoutRedirectUri` | The sign-out redirect URI from the app integration that you created, such as `com.okta.integrator-1234567:/` |
   | `redirectUri` | The sign-in redirect URI from the app integration that you created, such as `com.okta.integrator-1234567:/callback` |
   | `scopes` | A string with the value `openid profile offline_access` |
   | Other | Any additional keys are passed to the `additionalParameters` argument of the initializer. |

Once you create the `Okta.plist` file, your app can use the default initializer:

```swift
@IBAction func signIn(_ sender: Any) {
    let auth = try BrowserSignin()
    auth.signIn(from: view.window) { result in
        // Handle the response
    }
}
```

Alternatively, the [shared](https://okta.github.io/okta-mobile-swift/development/documentation/browsersignin/browsersignin/shared/) property does this for you:

```swift
@IBAction func signIn(_ sender: Any) {
    BrowserSignin.shared.signIn(from: view.window) { result in
        // Handle the response
    }
}
```

#### Use one or more configuration files

Similar to the use of the `Okta.plist` file, these options allow you to choose the one or ones you want to use. For example, you could switch between production and sandbox environments.

Here are the configuration options:

* [Use a custom property list](#use-a-custom-property-list)
* [Assign values at runtime](#assign-values-at-runtime)
* [Provide singleton access](#provide-singleton-access)
* [Supply a custom URL session](#supply-a-custom-url-session)

##### Use a custom property list

There may be circumstances where your app connects to multiple client configurations, particularly during development. In this case, you create a custom property list file that follows the same keys described in [Use the Okta.plist file](#use-the-oktaplist-file). Then, construct your authentication session using the [init(plist:)](https://okta.github.io/okta-mobile-swift/development/documentation/browsersignin/browsersignin/init(plist:)) initializer.

```swift
@IBAction func signIn(_ sender: Any) {
    guard let fileURL = Bundle.main.url(
        forResource: "Client",
        withExtension: "plist")
    else {
        return
    }


    let auth = try BrowserSignin(plist: fileURL)
    auth.signIn(from: view.window) { result in
        // Handle the response
    }
}
```

##### Assign values at runtime

Another approach can be to use an initializer that passes those configuration values at runtime, as opposed to constructing a static property list. <!-- The initializer accepts all the same -->

> **Note:** The following example doesn't need the `try` keyword when initializing the session. The previous property list-based approaches could fail when reading the file.

```swift
@IBAction func signIn(_ sender: Any) {
    let auth = BrowserSignin(
        issuer: URL(string: "https://my-app.okta.com")!,
        clientId: "my-client-id",
        scopes: "openid offline_access profile",
        redirectUri: URL(string: "com.my.app:/callback")!)


    auth.signIn(from: view.window) { result in
        // Handle the response
    }
}
```

##### Provide singleton access

The [shared](https://okta.github.io/okta-mobile-swift/development/documentation/browsersignin/browsersignin/shared) singleton provides convenient access to your client’s authentication instance. By default this value uses the `Okta.plist` file to configure the client, if one is available.

If your app constructs a [BrowserSignin](https://okta.github.io/okta-mobile-swift/development/documentation/browsersignin/browsersignin) client using a custom property list, or another initializer, the `shared` properties retain the values.

For example:

```swift
func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool
{
    let _ = BrowserSignin(issuer: issuerUrl,
                              clientId: "my-client-id",
                              scopes: "openid offline_access profile",
                              redirectUri: redirectUri)
    return true
}

// In another part of your application
@IBAction func signIn(_ sender: Any) {
    BrowserSignin.shared?.signIn(from: view.window) { result in
        // Handle the response
    }
}
```

##### Supply a custom URLSession

If you need to have control over the `URLSession` instance that is used when authenticating a user, you can construct an `OAuth2Auth AuthorizationCodeFlow.Configuration` object and supply the custom session to the initializer.

```swift
import OAuth2Auth

let config = AuthorizationCodeFlow.Configuration(
    issuer: issuer,
    clientId: clientId,
    scopes: scopes,
    redirectUri: redirectUri)
let auth = BrowserSignin(configuration: config,
                             session: myURLSession)
```

#### Use a pre-configured OAuth2Client or a pre-configured context

If your app interacts with other OAuth2 API endpoints, and you want to use the same client instance for your browser-based sign-in, you can construct your own `AuthorizationCodeFlow` instance to supply it to the initializer.

You could have a use case where a user is signing in and the app closes suddenly. If you have an authorization code of a flow context from a previous authentication session, you can resume authenticating from that point. That is, the flow can receive the context and resume.

```swift
import OAuth2Auth

let flow = AuthorizationCodeFlow(clientConfig,
                                 client: oauth2Client)
let auth = BrowserSignin(flow: flow,
                          context: flowContext)
auth.signIn(from: view.window) { result in
    // Handle the response
}
```
