Rather than hardcoding configuration values, use a property list file:

1. Right-click your project's root folder.
1. Select **New File From Template**.
1. Choose **Property List** and click **Next**.
1. Name the property file **Okta.plist**.
1. Click **Create**.
1. Right-click **Okta.plist**, select **Open As** > **Source Code**, and paste the following xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>scopes</key>
    <string>openid profile offline_access</string>
    <key>redirectUri</key>
    <string>com.okta.{yourOktaDomain}:/callback</string>
    <key>clientId</key>
    <string>{yourClientID}</string>
    <key>issuer</key>
    <string>https://{yourOktaDomain}/oauth2/default</string>
    <key>logoutRedirectUri</key>
    <string>com.okta.{yourOktaDomain}:/</string>
</dict>
</plist>
```

1. Replace `{yourOktaDomain}` and `{yourClientID}` with the actual values from the app that you created.
