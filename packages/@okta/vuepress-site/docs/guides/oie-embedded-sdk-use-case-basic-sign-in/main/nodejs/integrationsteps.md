### Your app displays the sign-in page

Build a sign-in page that captures both the user's name and their password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

### The user submits their username and password

When the user submits their `username` and `password`, pass them as parameters to [`OktaAuth.idx.authenticate()`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate).

```javascript
const authClient = getAuthClient(req);
const transaction = await authClient.idx.authenticate({ username, password });
```

### Your app handles an authentication success response

`authenticate()` returns a `transaction` object with a `status` property indicating the current state of the sign-in flow. Handle the returned `IdxStatus` value accordingly:

#### Success status

When the user correctly supplies their password, `IdxStatus` equals `IdxStatus.SUCCESS`. Call `tokenManager.setTokens()` to save the tokens retrieved from the response for future requests, and then redirect the user back to the home page. The user is now signed in.

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

#### Other authentication statuses

Handle other returned `IdxStatus` cases if the user didn't sign in successfully or there are other factors to verify. For example:

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
