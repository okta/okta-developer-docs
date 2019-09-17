Call `createConfig` function to create a configured client on the native modules. Resolves true if successfully configures a client. Note: `requireHardwareBackedKeyStore` is a configurable setting only on Android devices. If you're testing on Android emulators, set this field to false

```javascript
await createConfig({
    clientId: "{clientId}",
    redirectUri: "{redirectUri}",
    endSessionRedirectUri: "{endSessionRedirectUri}",
    discoveryUri: "https://{yourOktaDomain}",
    scopes: ["openid", "profile", "offline_access"],
    requireHardwareBackedKeyStore: false
});
```
