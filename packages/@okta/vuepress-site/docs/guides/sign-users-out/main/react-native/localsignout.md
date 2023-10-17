Clear the user's tokens by calling:

```javascript
import { clearTokens } from '@okta/okta-react-native';

clearTokens()
    .then(() => { })
    .catch(e => { });
```

#### Revoke tokens (optional)

Calling `clearTokens()` discards tokens from the local device storage, but they’re technically still active until they expire. An optional step is to revoke the tokens so they can't be used, even by accident. You can revoke tokens using the following requests:

```javascript
await revokeAccessToken();
```

This revokes the access token to make it inactive. Resolves `true` if the access token has been successfully revoked.

```javascript
await revokeIdToken();
```

This revokes the ID token to make it inactive. Resolves `true` if the ID token has been successfully revoked.

```javascript
await revokeRefreshToken();
```

This revokes the refresh token to make it inactive. Resolves `true` if the refresh token has been successfully revoked.

Access, ID, and refresh tokens must be revoked in separate requests.
