Create a new `Okta.plist` file in your application's bundle with the following fields:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>issuer</key>
    <string>https://{yourOktaDomain}.com/oauth2/default</string>
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
> Note: `https://{yourOktaDomain}.com` is different from your admin URL. Don't include `-admin` in the value.
> Note: To receive a `refresh_token`, you must include the `offline_access` scope.

Then, to create the `OktaOidc` object you don't need to create and pass the `OktaOidcConfig` instance:

```swift
let oktaOidc = OktaOidc()
```

Alternatively, you can create a configuration object from the dictionary with the required values:

```swift
let configuration = OktaOidcConfig(with: [
    "issuer": "https://{yourOktaDomain}/oauth2/default",
    "clientId": "{clientId}",
    "redirectUri": "{redirectUri}",
    "logoutRedirectUri": "{logoutRedirectUri}",
    "scopes": "openid profile offline_access",
    // Custom parameters
    "login_hint": "username@email.com"
])
```

Then, create the `OktaOidc` object:
```swift
let oktaOidc = OktaOidc(configuration: configuration)
```
