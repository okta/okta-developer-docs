## Install dependency

```bash
npm install @okta/okta-react-native
```

## Configure the SDK

Call the `createConfig` function to create a configured client when the app is initialized. You can put it in `index.js` or `App.js`. Resolves to `true` if it successfully configures a client.

**Note:** `requireHardwareBackedKeyStore` is a configurable setting only on Android devices. If you're testing on Android emulators, set this field to `false`.

```javascript
import { createConfig } from '@okta/okta-react-native';

createConfig({
    clientId: '{clientId}',
    redirectUri: '{redirectUri}',
    endSessionRedirectUri: '{endSessionRedirectUri}',
    discoveryUri: 'https://{yourOktaDomain}',
    scopes: ['openid', 'profile', 'offline_access'],
    requireHardwareBackedKeyStore: false
});
```
