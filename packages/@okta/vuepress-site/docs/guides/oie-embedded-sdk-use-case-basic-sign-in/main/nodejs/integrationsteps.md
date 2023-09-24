### 1: Authenticate the user credentials

When the user initiates the sign-in process, your app needs to:

* Create a new `OktaAuth` object, which is `authClient` in the SDK sample app's `login.js` file
* Set the `username` and `password` properties to the values entered by the user
* Send `OktaAuth` object to [`idx.authenticate()`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) to authenticate the user.

```JavaScript
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

### 2: Handle the response from the user sign-in flow

The application handles the response from the authentication call through the `handleTransaction()` function, as shown in the SDK sample application's `handleTransaction.js` file. The `transaction` parameter is the `IdxStatus` value that is passed in through the response from Okta.

```JavaScript
module.exports = function handleTransaction({
  req,
  res,
  next,
  authClient,
  transaction,
}) {
  const {
    nextStep,
    tokens,
    status,
    error,
  } = transaction;

...
```

#### Success status

The `IdxStatus` field indicates a success `IdxStatus.SUCCESS`, retrieves the token from the response, and processes the authenticated user in the app. The SDK sample application saves the tokens to storage in the `handleTransaction.js` file and redirects the user back to the home page.

```JavaScript
case IdxStatus.SUCCESS:
  // Save tokens to storage (req.session)
  authClient.tokenManager.setTokens(tokens);
  // Redirect back to home page
  res.redirect('/');
  return;

...

```

#### Other authentication statuses

If the user sign in didn't result in a success stats, then you need to handle the returned `IdxStatus` cases. For example, in the SDK application's `handleTransactions.js` file:

```JavaScript
switch (status) {
  case IdxStatus.PENDING:
    // Proceed to next step
    try {
      if (!proceed({ req, res, nextStep })) {
        next(new Error(`
          The current flow cannot support the policy configuration in your org.
        `));
      }
    } catch (err) {
      next(err);
    }
    return;
  case IdxStatus.SUCCESS:
    // Save tokens to storage (req.session)
    authClient.tokenManager.setTokens(tokens);
    // Redirect back to home page
    res.redirect('/');
    return;
  case IdxStatus.FAILURE:
    authClient.transactionManager.clear();
    next(error);
    return;
  case IdxStatus.TERMINAL:
    redirect({ req, res, path: '/terminal' });
    return;
  case IdxStatus.CANCELED:
    res.redirect('/');
    return;
}

```

### 3 (Optional): List the user profile information

You can get the user information after the user is authenticated by making a request to the Okta OpenID Connect authorization server.

Make a request to the `/v1/userinfo` endpoint by calling the following function in the `userContext.js` file:

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

 For more detail about the response, refer to [`/v1/userinfo` endpoint](/docs/reference/api/oidc/#userinfo)
