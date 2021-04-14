---
title: Okta + AppAuth Auth SDK
language: iOS
icon: code-ios
excerpt: Integrate Okta with an iOS native application using OktaAuth.
---

This guide will walk you through integrating authentication and authorization into a Swift iOS native application with Okta.

## Prerequisites
If you do not already have a **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

### Add an OpenID Connect Client
* Log into the Okta Developer Dashboard, and **Create New App**
* Choose **Native app** as the platform, then populate your new OpenID Connect application with values similar to:

| Setting              | Value                                               |
| -------------------  | --------------------------------------------------- |
| Application Name     | OpenId Connect App *(must be unique)*               |
| Login redirect URIs  | com.okta.example:/callback                          |
| Logout redirect URIs | com.okta.example:/logout                            |

> *As with any Okta application, make sure you assign Users or Groups to the OpenID Connect Client. Otherwise, no one can use it.*

## Installation
The simplest way to add authentication into an iOS app is using the library [Okta AppAuth](http://cocoapods.org/pods/OktaAuth), available through [CocoaPods](http://cocoapods.org). To install it, simply add the following line to your Podfile:

```ruby
pod 'OktaAuth', '~> 0.1'
```

## Configuration
Create a new `Okta.plist` file in your application's bundle with the following fields:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>issuer</key>
	<string>https://${yourOktaDomain}/oauth2/{authServerId}</string>
	<key>clientId</key>
	<string>{clientIdValue}</string>
	<key>redirectUri</key>
	<string>{redirectUrlValue}</string>
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

> Important: Most native applications send access tokens to access APIs. If you're building an API that will need to accept access tokens, [create an authorization server](/docs/guides/customize-authz-server/).

### Update the Private-use URI Scheme
In order to redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, open `Info.plist` in your application bundle and set a **URL Scheme** to the scheme of the login redirect URI.

For example, if your **Login Redirect URI** is `com.okta.example:/callback`, the **URL Scheme** will be `com.okta.example`.

## Adding Authentication
Users can sign in to your iOS application a number of different ways.
The easiest, and most secure way is to use the **default login page**. This page renders the [Okta Sign-In Widget](/code/javascript/okta_sign-in_widget/), equipped to handle User Lifecycle operations, MFA, and more.

First, update your `AppDelegate` to include the following function to allow the redirect to occur:
```swift
// AppDelegate.swift
import OktaAuth

func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
    return OktaAuth.resume(url: url, options: options)
}
```

Then, you can start the authorization flow by simply calling `login`:
```swift
OktaAuth
    .login()
    .start(self) {
        response, error in

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
    .start(self) {
        response, error in

        if error != nil { print(error!) }

        // Success
        if let tokenResponse = response {
            OktaAuth.tokens.set(value: tokenResponse.accessToken!, forKey: "accessToken")
            OktaAuth.tokens.set(value: tokenResponse.idToken!, forKey: "idToken")
            OktaAuth.tokens.set(value: tokenResponse.refreshToken!, forKey: "refreshToken")
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

### Validating the Token
Before using an `access_token` or `id_token`, ensure the tokens are valid by calling the `introspect` method:

```swift
OktaAuth
    .introspect()
    .validate(token: currentToken) {
        response, error in

        if error != nil { print("Error: \(error!)") }

        if let isValid = response {
            if !isValid {
                // Token is not valid, prompt the user to login
            }
        }
    }
```

### Fetch User Claims
Now that the `access_token` has been stored and validated, use it to retrieve more information about the user:
```swift
OktaAuth.userinfo() {
    response, error in

    if error != nil { print("Error: \(error!)") }

    if let userinfo = response {
        // userinfo["name"]
        // userinfo["email"]
    }
}
```

## Conclusion
You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/).

## Support
Have a question or see a bug? Post your question on [Okta Developer Forum](https://devforum.okta.com/).
