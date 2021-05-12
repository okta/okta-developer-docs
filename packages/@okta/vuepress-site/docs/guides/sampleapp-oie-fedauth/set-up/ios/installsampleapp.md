1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-ios.git`
2. Navigate to the `OktaBrowserSignIn` directory and edit the <StackSelector snippet="configfile" noSelector inline /> file with the information that you copied in previous steps:

```
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>scopes</key>
        <string>openid profile offline_access</string>
        <key>redirectUri</key>
        <string>{signinredirectUri}</string>
        <key>clientId</key>
        <string>{clientID}</string>
        <key>issuer</key>
        <string>{issuer}</string>
        <key>logoutRedirectUri</key>
         <string>{signoutRedirectUri}</string>
    </dict>
    </plist>
```

3. To redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, open `Info.plist` in your application bundle and add `com.okta.example` as a URL Scheme.

    > **Note:** Make sure that this value is consistent with the redirect URI that you added to the `Okta.plist` file. For example, if your redirect URI is `com.okta.example:/callback`, then the URL Scheme that you add should be `com.okta.example`.

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.