You can provide the configuration information in a property list file or in the initialization call.

#### Add configuration with a property list

The default `init()` function of `InteractionCodeFlow` looks for a property list called `Okta.plist`. You can specify a property list file by calling `init(plist:)`. Both of those options can result in an exception as they read from the file system. To specify the values in the call, use `init(
    issuer:clientId:scopes:redirectUri:additionalParameters:)`.

To use a property list first create a property list file, such as `Okta.plist`. Next, add key-value pairs with the configuration settings for your app integration. For example, in the following text version of a `plist`, substitute your issuer URL for `{yourIssuerUrl}`, the client ID of your app integration for `{yourClientId}`, and a URI that launches your app for `{com.your.app:callback-uri}`. Set the scopes based on the access required by your app.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>issuer</key>
    <string>{yourIssuerUrl}</string>
    <key>clientId</key>
    <string>{yourClientId}</string>
    <key>redirectUri</key>
    <string>{com.your.app:/callback-uri}</string>
    <key>scopes</key>
    <string>openid email profile offline_access</string>
</dict>
</plist>
```

Then, add code to create an `InteractionCodeFlow`, this example uses `Okta.plist`.

```swift
let flow = InteractionCodeFlow()
```

#### Add configuration in the code

The example below adds the values in the initialization call.

```swift
let flow = InteractionCodeFlow(
    issuer: "https://{yourOktaDomain}/oauth2/default",
    clientId: "{yourClientId}",
    clientSecret: nil,
    scopes: ["openid", "email", "offline_access"],
    redirectUri: "{com.your.app:/callback-uri}")
```
