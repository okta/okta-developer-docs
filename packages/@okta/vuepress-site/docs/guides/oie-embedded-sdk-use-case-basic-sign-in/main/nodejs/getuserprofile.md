## Get the user profile information

After the user signs in, request basic user information from the authorization server using the tokens that were returned in the previous step.

```javascript
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
