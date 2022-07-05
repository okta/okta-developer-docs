### Sample app

There are two main ways to store configuration settings in the sample app.
You can either update the key-value pairs in the [`Okta.plist` file](#okta-plist)
or update the fields on the [configuration page](#configuration-page).

#### Okta.plist

`Okta.plist` is a property file that stores the name and value for each configuration setting. You can find this file in the following location: `okta-idx-swift/Samples/EmbeddedAuthWithSDKs/EmbeddedAuth/Okta.plist`.

#### Configuration page

An alternative method to store the configuration settings is by using the Configuration page. You can access the Configuration page from the **Configure** link on the start-up page.

<div class="half">

![Displays the Configuration setup page in the Swift sample app](/img/oie-embedded-sdk/oie-embedded-sdk-widget-swift-configs.png)

</div>

### SDK

The SDK is initialized with the configuration settings by calling the `IDXClient.Configuration()` method and passing in the configuration values.

For example:

```swift
let configuration = IDXClient.Configuration(
    issuer: "https:///<#oktaDomain#>/oauth2/default", // e.g. https://foo.okta.com/oauth2/default, https://foo.okta.com/oauth2/ausar5vgt5TSDsfcJ0h7
    clientId: "<#clientId#>",
    clientSecret: nil, // Optional, only required for confidential clients.
    scopes: ["openid", "email", "offline_access", "<#otherScopes#>"],
    redirectUri: "<#redirectUri#>") // Must match the redirect uri in client app settings/console
```

See the Swift SDK's [readme](https://github.com/okta/okta-idx-swift#readme) for more details on the different configuration options.
