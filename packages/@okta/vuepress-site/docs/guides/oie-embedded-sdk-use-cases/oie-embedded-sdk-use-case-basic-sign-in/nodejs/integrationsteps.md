## Integration steps

### Step 1: Build a sign-in page on the client

Build a sign-in page that captures both the username and password.

For example:

<div class="common-image-format">

![Sign in screenshot](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign in screenshot")

### Step 2: Authenticate user credentials

When the user initiates the sign-in process, your app needs to create an `authClient` object as shown in the sample app `login.js` file, and set its `username` and `password` properties to the values entered by the user. Send this object to the `authClient.idx.authenticate` function to authenticate the user. See [idx.Authenticate](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) for more information.

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

### Step 3: Handle the response from the sign in

The application handles the response from the authentication call using the `authClient.idx.handleInteractionCodeRedirect` function as shown in the SDK sample application `login.js` file. See [idx.handleInteractionCodeRedirect](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxhandleinteractioncoderedirect) for more information.

```JavaScript
router.get('/login/callback', async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  const authClient = getAuthClient(req);
  try {
    // Exchange code for tokens
    await authClient.idx.handleInteractionCodeRedirect(url);
    // Redirect back to home page
    res.redirect('/');
  } catch (err) {
    if (authClient.isInteractionRequiredError(err) === true) {
      const error = new Error(
        'Multifactor Authentication and Social Identity Providers are not currently supported, Authentication failed.'
      );
      next(error);
      return;
    }

    next(err);
  }
});
```

#### Success status

For a successful sign-in response, the `IdxStatus` field indicates a success `IdxStatus.SUCCESS` and retrieves the token and processes the authenticated user in the app. The SDK sample application
saves the tokens to storage in the `handleTransaction.js` file and redirect back to the home page.

```JavaScript
case IdxStatus.SUCCESS:
      // Save tokens to storage (req.session)
      authClient.tokenManager.setTokens(tokens);
      // Redirect back to home page
      res.redirect('/');
      return;
```

#### Other status

You need to handle other returned `IdxStatus` cases if the user didn't sign in successfully. For example, in the SDK application's `handleTransactions.js` file:

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
};
```

### Step 4: Get user profile information-optional

Optionally, you can obtain basic user information after the user is authenticated by making a request to Okta's Open ID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/java/main/#getuserprofileinfo).
