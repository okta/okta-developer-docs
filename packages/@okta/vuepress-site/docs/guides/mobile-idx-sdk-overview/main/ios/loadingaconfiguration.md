Initialize a configuration by passing the appropriate values to `IDXClient.Configuration(issuer:clientId:clientSecret:scopes:redirectUri:)`. This example shows loading the values from a property file in your project.

First, create a property list file, such as `Okta.plist`. Next, add key-value pairs with the configuration settings for your Application Integration. For example, in the following text version of a `plist`, substitute your issuer URL for `{yourIssuerUrl}`, the client ID of your Application Integration for `{yourAppClientId}`, and a URI that launches your app. Set the scopes based on the access required by your app.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>issuer</key>
    <string>{yourIssuerUrl}</string>
    <key>clientId</key>
    <string>{yourAppClientId}</string>
    <key>redirectUri</key>
    <string>com.sample.:/callback</string>
    <key>scopes</key>
    <string>openid email profile offline_access</string>
</dict>
</plist>
```

Next, add code to create an `IDXClient.Configuration` instance from the property list file. This example uses a decoder to read the values into an `OktaPlistContent` structure.

```swift
import OktaIdx

...

// A struct that represents the configuration in a plist.
struct OktaPlistContent: Codable {
    var scopes: String
    var redirectUri: String
    var clientId: String
    var clientSecret: String
    var issuer: String

    var scopeArray: [String] {
        get {
            scopes.components(separatedBy: " ")
        }
    }
}

// Read the contents of the plist and return a configuration.
func loadConfiguration() -> IDXClient.Configuration? {
    let decoder = PropertyListDecoder()

    guard let data = try? Data.init(contentsOf: plistURL),
          let configuration = try? decoder.decode(OktaPlistContent.self, from: data)
    else { return nil }

    // NOTE: The client secret isn't used on mobile.
    return IDXClient.Configuration(issuer: configuration.issuer,
                                   clientId: configuration.clientId,
                                   clientSecret: nil,
                                   scopes: configuration.scopeArray,
                                   redirectUri: configuration.redirectUri)
}

```
