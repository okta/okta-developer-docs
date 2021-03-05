Clear the user's tokens by calling:

```javascript
import { clearTokens } from '@okta/okta-react-native';

clearTokens()
    .then(() => { })
    .catch(e => { });
```

#### Revoke tokens (optional)

Calling `clearTokens()` discards tokens from the local device storage, but they are technically still active until they expire. An optional step is to revoke the tokens so they can't be used, even by accident. You can revoke tokens using the following requests:

```javascript
await revokeAccessToken();
```

This revokes the access token to make it inactive. Resolves `true` if access token has been successfully revoked.

```javascript
await revokeIdToken();
```

This revoke the ID token to make it inactive. Resolves `true` if ID token has been successfully revoked.

```javascript
await revokeRefreshToken();
```

Revoke the refresh token to make it inactive. Resolves true if refresh token has been successfully revoked.

Tokens need to be revoked in separate requests.
