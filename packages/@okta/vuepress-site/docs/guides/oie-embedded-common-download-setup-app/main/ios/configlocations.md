### Sample app

There are two main ways to store configuration settings in the sample app.
You can either update the key-value pairs in the [`Okta.plist` file](#okta-plist)
or update the fields on the [configuration page](#configuration-page).

#### Okta.plist

`Okta.plist` is a property file that stores the name and value for
each configuration setting. The file is located here:
`okta-idx-swift/Samples/EmbeddedAuthWithSDKs/EmbeddedAuth/Okta.plist`.

#### Configuration page

As alternative to the property file, the settings can be set on the configuration page.

<div class="common-image-format">

![Displays the Configuration setup page in the Swift sample app](/img/oie-embedded-sdk/oie-embedded-sdk-widget-swift-configs.png)

</div>

Access the screen from the **Configure** link on the startup page.

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

For more details about different configuration options, see the SDK's
[readme](https://github.com/okta/okta-idx-swift#readme).
