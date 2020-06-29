Create a configuration object in code:

```swift
let configuration = OktaOidcConfig(with: [
    "issuer": "https://${yourOktaDomain}/oauth2/default",
    "clientId": "{clientId}",
    "redirectUri": "{redirectUri}",
    "scopes": "openid profile offline_access"
])
```

Then create the `OktaOidc` object:
```swift
let oktaOidc = OktaOidc(configuration: configuration)
```

Or, create a new `Okta.plist` file in your application's bundle with the following fields:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>issuer</key>
    <string>https://${yourOktaDomain}/oauth2/default</string>
    <key>clientId</key>
    <string>{clientId}</string>
    <key>redirectUri</key>
    <string>{redirectUri}</string>
    <key>logoutRedirectUri</key>
    <string>{logoutRedirectUri}</string>
    <key>scopes</key>
    <string>openid profile offline_access</string>
</dict>
</plist>
```

Then create the `OktaOidc` object without passing any configuration:

```swift
let oktaOidc = OktaOidc()
```
