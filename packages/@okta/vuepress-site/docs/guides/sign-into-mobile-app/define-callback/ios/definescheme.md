Open `Info.plist` in your application bundle and define a **URL Scheme** for your app, like `com.okta.example`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.okta.example</string>
    </array>
  </dict>
</array>
```
