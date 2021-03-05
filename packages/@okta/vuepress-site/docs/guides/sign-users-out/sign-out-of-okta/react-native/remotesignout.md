### Clear the Okta session


Next you should clear the browser session and app session (stored tokens) in memory. An event will fire once a user successfully logs out.

> Note: This method apply for browser-sign-in scenario only. Use a combination of revokeToken (optional) and clearTokens methods to signOut when use custom-sign-in.

browser-sign-in example:

```javascript
import { signOut } from '@okta/okta-react-native';

signOut();
```

custom-sign-in example:

```javascript
import { revokeAccessToken, revokeIdToken, clearTokens } from '@okta/okta-react-native';

await revokeAccessToken(); // optional
await revokeIdToken(); // optional
clearTokens()
    .then(() => { })
    .catch(e => { });
```
