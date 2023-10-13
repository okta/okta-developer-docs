### Clear the Okta session

Next you should clear the browser session and app session (stored tokens) in memory. An event fires once a user successfully logs out.

> Note: This method applies only to the browser sign-in scenario. Use a combination of `revokeToken` (optional) and `clearTokens` methods to sign out when using custom sign-in.

Browser sign-in example:

```javascript
import { signOut } from '@okta/okta-react-native';

signOut();
```

Custom sign-in example:

```javascript
import { revokeAccessToken, revokeIdToken, clearTokens } from '@okta/okta-react-native';

await revokeAccessToken(); // optional
await revokeIdToken(); // optional
clearTokens()
    .then(() => { })
    .catch(e => { });
```
