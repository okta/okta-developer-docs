---
libraryName: Native iOS
---

## Okta iOS Quickstart

This guide will walk you through integrating authentication into an iOS (Swift) app with Okta by performing these steps:

1. Add an OpenID Connect Client in Okta
2. Add Okta-AppAuth to your iOS project
3. Implement Okta Sign-in
4. Handle the Login State
5. Using the AccessToken

At the end of the iOS instructions you can choose your server type to learn more about post-authentication workflows, such as verifying tokens that your iOS application can send to your server.

## Prerequisites

### Add an OpenID Connect Client
* Log into the Okta Developer Dashboard, click **Applications** then **Add Application**.
* Choose **Native app** as the platform, then populate your new OpenID Connect application with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| Application Name     | My iOS App                                          |
| Login redirect URIs  | {yourOktaScheme}:/callback                          |
| Logout redirect URIs | {yourOktaScheme}:/logout                            |

After you have created the application there are two more values you will need to gather:

| Setting       | Where to Find                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------                                                      |
| Client ID     | In the applications list, or on the "General" tab of a specific application.                                                        |
| Org URL       | <span class="is-signed-in">`https://{yourOktaDomain}` <br></span>On the home screen of the developer dashboard, in the upper right. |


These values will be used in your iOS application to setup the OpenID Connect flow with Okta.

## Add Okta-AppAuth to your iOS Project
The simplest way to add authentication into an iOS app is using the library [Okta AppAuth](http://cocoapods.org/pods/OktaAuth), available through [CocoaPods](http://cocoapods.org). To install it, simply add the following line to your Podfile:

```ruby
pod 'OktaAuth', '~> 0.1'
```

Now, install the `OktaAuth` dependency and open the compiled project:
```bash
pod install && open project.xcworkspace
```

### Configuration
Create a new `Okta.plist` file in your application's bundle with the following fields:
<DomainAdminWarning />

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>issuer</key>
  <string>https://{yourOktaDomain}/oauth2/default</string>
  <key>clientId</key>
  <string>{clientIdValue}</string>
  <key>redirectUri</key>
  <string>{yourOktaScheme}:/callback</string>
  <key>scopes</key>
  <array>
	<string>offline_access</string>
	<string>openid</string>
	<string>profile</string>
  </array>
</dict>
</plist>
```
**Note**: *To receive a **refresh_token**, you must include the `offline_access` scope.*

### Update the Private-use URI Scheme
In order to redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, open `Info.plist` in your application bundle and set a **URL Scheme** to the scheme of the login redirect URI (e.g., `{yourOktaScheme}`)

For example, if your **Login Redirect URI** is `com.okta.example:/callback`, the **URL Scheme** will be `com.okta.example`.

## Implement Okta Sign-In
Users can sign in to your iOS application a number of different ways.
The easiest, and most secure way is to use the **default login page**. This page renders the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget), equipped to handle User Lifecycle operations, MFA, and more.

Login events can be triggered by an `@IBAction`, `viewDidLoad`, or programmatically. In order to launch the event, first update your `AppDelegate` to include the following function to allow the redirect to occur:

```swift
// AppDelegate.swift
import OktaAuth

func application(_ app: UIApplication,
    open url: URL,
    options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
  return OktaAuth.resume(url: url, options: options)
}
```

Then, you can start the authorization flow by simply calling `login`:
```swift
OktaAuth
  .login()
  .start(self) { response, error in
    if error != nil { print(error!) }

    // Success
    if let tokenResponse = response {
      // tokenResponse.accessToken
      // tokenResponse.idToken
      // tokenResponse.refreshToken
    }
  }
```

## Handle the Login State
In native applications, it is common for users to have a long-lived session. It is important for the app to manage the user's session by refreshing tokens when they expire, using the `refresh_token` or re-prompting the user to login.

### Store the User's Tokens
Tokens are securly stored in the Keychain. They are easily set and retrieved with the helper methods `set` and `get`.
```swift
OktaAuth
  .login()
  .start(self) { response, error in
    if error != nil { print(error!) }

    // Success
    if let tokenResponse = response {
      OktaAuth.tokens.set(
        value: tokenResponse.accessToken!,
        forKey: "accessToken"
      )
      OktaAuth.tokens.set(
        value: tokenResponse.idToken!,
        forKey: "idToken"
      )
      OktaAuth.tokens.set(
        value: tokenResponse.refreshToken!,
        forKey: "refreshToken"
      )
    }
  }
```

When starting up the application, check for the existence of an `access_token` to see if the user has an existing session:

```swift
if let currentToken = OktaAuth.tokens.get(forKey: "accessToken") {
  // Token is valid!
} else {
  // Token does not exist, prompt the user to login.
}
```

## Using the Access Token

Your iOS application now has an access token in the Keychain that was issued by your Okta Authorization server. You can use this token to authenticate requests for resources on your server or API. As a hypothetical example, let's say that you have an API that gives us messages for our user.  You could create a `callMessagesApi` function that gets the access token from the Keychain, and use it to make an authenticated request to your server.

```swift

func callMessagesApi() {
  let url = URL(string: "http://localhost:{serverPort}/api/messages")

  // Set the authorization header
  let headers = [
    "Authorization": "Bearer \(OktaAuth.tokens.get("accessToken"))"
    ...
  ]

  var request = URLRequest(url: url!)
  request.allHTTPHeaderFields = headers

  let task = URLSession.shared.dataTask(with: request){ data, response, error in
    if error != nil { return }

    let serverResponse = response {
      // serverResponse
    }
  }
  task.resume()
}
```

In the next section you can select your server technology to see how your server can read this incoming token and validate it.
