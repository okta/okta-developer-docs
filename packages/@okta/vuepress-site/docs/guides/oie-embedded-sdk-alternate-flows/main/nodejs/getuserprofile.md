
After obtaining the appropriate tokens, make a request to the `/v1/userinfo` endpoint by calling the following function in the `userContext.js` file:

```javascript
const { getAuthClient } = require('../utils');

module.exports = async function userContext(req, res, next) {
  const authClient = getAuthClient(req);
  const { idToken, accessToken, refreshToken } = authClient.tokenManager.getTokensSync();
  if (idToken && accessToken) {
    const userinfo = await authClient.token.getUserInfo(accessToken, idToken);
    req.userContext = {
      userinfo,
      tokens: {
        idToken, accessToken, refreshToken
      }
    };
  }

  next();
};
```

See [`/v1/userinfo` endpoint](/docs/reference/api/oidc/#userinfo) for more response details.
