### Your app displays the sign-in page

The user launches the app and sees the sign-in page. Build a sign-in page to capture the user's login credentials.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/images/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

### Capture the user's login credentials

Pass the user's `username` and `password` as parameters to [`OktaAuth.idx.authenticate()`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) to begin the authentication process.

```javascript
const authClient = getAuthClient(req);
const transaction = await authClient.idx.authenticate({ username, password });
```

### Processing returned `IdxStatus` values

`authenticate()` returns a `transaction` object with a `status` property to indicate the sign-in flow status. Handle the returned `IdxStatus` values accordingly:

#### Processing a successful login

When the user submits their correct password, `IdxStatus` equals `IdxStatus.SUCCESS`. Call `tokenManager.setTokens()` to save the retrieved tokens for future requests and redirect the user back to the home page. The user is now signed in.

The below code demonstrates how to handle a successful sign-in flow:

```js
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

#### Handling other `IdxStatus` values

The app must handle other `IdxStatus` values in cases where user sign-in is unsuccessful or requires additional validation.
 
See the process flow for each returned `IdxStatus` value captured in the `case` statements:

```js
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
