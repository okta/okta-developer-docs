---
title: Basic sign-in flow with the password factor
excerpt: Learn how to implement a password-only sign-in flow in a server-side web app by using the Okta Identity Engine SDK.
layout: Guides
---

<ApiLifecycle access="ie" />

Learn how to implement a password-only sign-in flow in a server-side web application by using the embedded Okta Identity Engine SDK. You can set up a sign-in page, authenticate user credentials, handle authentication responses, and retrieve user information after successful authentication.

> **Note**: Passwords are vulnerable to theft and phishing attacks. Enable users to use alternative authenticators by replacing password-only experiences with either a [password-optional approach](/docs/guides/pwd-optional-overview) such as [Sign in with email only](docs/guides/pwd-optional-sign-in-email) or a multifactor approach to enhance security.
<StackSnippet snippet="pwdoptionalusecase" />
---

#### Learning outcomes

* Configure your Okta org to support a password-only authentication experience.
* Integrate a password-only sign-in flow into a server-side web app.

#### What you need

* An app that uses the embedded [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js)
* Download and set up [Okta Identity Engine SDK](/docs/guides/oie-embedded-common-download-setup-app)

<StackSnippet snippet="whatyouneed" />
<br />

#### Sample code
[Node.js Okta Identity Engine sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-auth-with-sdk)
<StackSnippet snippet="samplecode" />

---

## Configuration updates

Before you begin, make sure that your app is configured to support password as authentication. For information on configuring your app for a password-only experience, see [Set up your Okta org for a password factor-only use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
<StackSnippet snippet="configureyourapp" inline />

## Summary of steps
The following diagram summarizes the steps that are involved in a password-only sign-in flow.

<StackSnippet snippet="summaryofsteps" />

## Integration steps
### 1. Display a sign-in page for the user
When a user logs in to the app, it displays a sign-in page to capture the username and password.
### 2. Authenticate the user credentials
Add the following sample code to initiate the sign-in flow by using the credentials collected from the user. Call [`idx. authenticate`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) to pass username and password for authentication.
```
const authClient = getAuthClient(req);
const transaction = await authClient.idx.authenticate({ username, password });
```
### 3. Handle the response from the sign-in flow
Call `authenticate.transaction()` to retrieve the current state of the authentication process. The return `IdxStatus` value indicates either a successful or an unsuccessful authentication.
#### Success status
If the authentication is successful, the `IdxStatus` value indicates `IdxStatus.SUCCESS`. Call `tokenManager.setTokens()` to save the tokens retrieved from the response for future requests. Redirect the user to the home page to complete the sign-in flow. The user is now signed in. The following sample code displays the `IdxStatus.SUCCESS` status.
```
  const { nextStep, tokens, status, error, } = transaction;
  // Persist states to session
  req.setFlowStates({ idx: transaction });
  switch (status) {
    case IdxStatus.SUCCESS:
      // Save tokens to storage (req.session)
      authClient.tokenManager.setTokens(tokens);
      // Redirect back to home page
      res.redirect('/');
      return;
   // Handle other statuses
}
```
#### Other authentication statuses
If the `IdxStatus` value indicates anything other than `IdxStatus.SUCCESS`, it signifies that the user failed authenticate successfully. Analyze the IdxStatus value to identify and resolve the cause. The following sample code displays other authentication statuses.
```
switch (status) {
   case IdxStatus.SUCCESS:
      // handle success
   return;
   case IdxStatus.PENDING:
      // Proceed to next step
      try {
         if (!proceed({ req, res, nextStep })) {
            next(new Error(`
            Oops! The current flow cannot support the policy configuration in your org.
            `));
         }
      } catch (err) {
         next(err);
      }
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

<StackSnippet snippet="integrationsteps" />

### 4. Optional: Get the user profile information
After successful user authentication, call `/v1/userinfo` to retrieve the user profile information from the authorization server using the tokens retrieved in the previous step. Use the following sample code to retrieve the user profile information.
```
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
<StackSnippet snippet="getuserprofile" />
