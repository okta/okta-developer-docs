# Basic sign-in flow using the password factor


> **Note:** In proxy model architectures, where a server-side application using the Embedded SDK is used as a proxy between client applications and Okta servers, a request context for the client applications is required. Security enforcement is expected to be based on the client request context’s IP address and user agent. However, since these values are currently being derived from the server application rather than the client, this enforcement is not available. As a result, network zones or behaviors that drive their conditions based on these request context values (geolocation, IP Address, or user agent) will not work until we can find a solution to the issue.

This guide covers a basic user sign-in request, which is the simplest of all use cases and is the first use case that you should try after you install the SDK. The flow diagram and steps describe how to build a simple sign-in form and how to authenticate the credentials.

> **Note:** To learn about a sign-in use case where the password is optional, see the Sign in with email only guide.

---

**Learning outcomes**

Understand how to implement basic sign-in using Okta Identity Engine.

**What you need**

* An app that uses the embedded Okta Identity Engine SDK
* [Okta org already configured for a password-only use case](https://developer.okta.com/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case)
* [Identity Engine SDK set up for your own app](https://developer.okta.com/docs/guides/oie-embedded-common-download-setup-app/)

**Sample code**

[Node.js Identity Engine sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-auth-with-sdk)

---

## Configuration updates

The basic user sign-in use case requires the password factor.


![Password factor only indicator](https://developer.okta.com/img/oie-embedded-sdk/factor-password-only.png)

Before you build a basic sign-in flow, ensure that your org is configured for the password factor by completing the steps in [Set up your Okta org for a password factor only use case](https://developer.okta.com/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).

## Summary of steps

This use case explains how to build a simple UI to capture the username and password and authenticate the credentials with Okta by using the SDK.

![Summary of steps](https://developer.okta.com/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-seq-nodejs.png)

## Integration steps

### 1: Build a sign-in page on the client 

Build a sign-in page that captures both the username and password, similar to the following wireframe.


![sign-in page](https://developer.okta.com/img/wireframes/sign-in-form-username-password.png)

### 2: Authenticate the user credentials

When the user initiates the sign-in process, your app needs to:

* Create a new `OktaAuth` object, which is `authClient` in the SDK sample app's `login.js` file
* Set its `username` and password properties to the values entered by the user
* Send this object to [`idx.authenticate()`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) to authenticate the user

```
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

### 3: Handle the response from the user sign-in flow

The application handles the response from the authentication call through the `handleTransaction()` function, as shown in the SDK sample application's `handleTransaction.js` file. The `transaction` parameter is the `IdxStatus` value that is passed in through the response from Okta.

```
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
For a successful sign-in response, the `IdxStatus` field indicates a success `IdxStatus.SUCCESS`, retrieves the token from the response, and processes the authenticated user in the app. The SDK sample application saves the tokens to storage in the `handleTransaction.js` file and redirects the user back to the home page.

```
case IdxStatus.SUCCESS:
      // Save tokens to storage (req.session)
      authClient.tokenManager.setTokens(tokens);
      // Redirect back to home page
      res.redirect('/');
      return;

...
```

#### Other authentication statuses
You need to handle other returned `IdxStatus` cases if the user didn't sign in successfully. For example, in the SDK application's `handleTransactions.js` file:

```
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

### 4 (Optional): Get the user profile information
Optionally, you can obtain basic user information after the user is authenticated by making a request to the Okta OpenID Connect authorization server (see the next section).

## Get the user profile information
Depending on your requirements and what information you want to retrieve after the user successfully signs in, you can obtain basic user information by making a request to the authorization server.

After obtaining the appropriate tokens, make a request to the `/v1/userinfo` endpoint, as shown in the SDK sample application by calling the following function in the `userContext.js` file:

```
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
See [`/v1/userinfo` endpoint](https://developer.okta.com/docs/reference/api/oidc/#userinfo) for more response details.
