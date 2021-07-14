### Sample app

There are two main ways to store configuration settings in the sample app.
Setting these values can be accomplished by either setting key-value pairs
in the [`Okta.plist` file](#okta-plist) or entering the values through
the [Configuration screen](#configuration-screen).

The sample app sends these values during SDK initialization through the use
of the `IDXClient` `Configuration` class which is discussed in the
[SDK section](#sdk).

#### Okta.plist

`Okta.plist` is a property file that stores the name and value for
each configuration setting. The file is located here:
`okta-idx-swift/Samples/EmbeddedAuthWithSDKs/EmbeddedAuth/Okta.plist`.

#### Configuration screen

As alternative to the property file, the settings can be set in the configuration
screen.

<div class="common-image-format">

![Configuration setup](/img/oie-embedded-sdk/oie-embedded-sdk-widget-swift-configs.png
 "Configuration setup screen in the Swift sample app")

</div>

The screen is accessed from the configure link on the startup screen.

### SDK

The SDK is initialized with the configuration settings by creating
`IDXClient` `Configuration` and passing in the configuration values.

Example

```swift
let configuration = IDXClient.Configuration(
    issuer: "https:///<#oktaDomain#>/oauth2/default", // e.g. https://foo.okta.com/oauth2/default, https://foo.okta.com/oauth2/ausar5vgt5TSDsfcJ0h7
    clientId: "<#clientId#>",
    clientSecret: nil, // Optional, only required for confidential clients.
    scopes: ["openid", "email", "offline_access", "<#otherScopes#>"],
    redirectUri: "<#redirectUri#>") // Must match the redirect uri in client app settings/console
```

For more details about configuring and the available methods see the SDK's
[readme](https://github.com/okta/okta-idx-swift#readme).
