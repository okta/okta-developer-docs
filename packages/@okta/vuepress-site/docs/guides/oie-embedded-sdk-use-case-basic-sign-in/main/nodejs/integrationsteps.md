### 1: Your app displays the sign-in page

   Build a sign-in page that captures both the user's username and password.

   <div class="half wireframe-border">

   ![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

   <!--

   Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
   -->

   </div>

### 2: The user submits their username and password

   When the user submits their `username` and `password`, pass them as parameters to [`OktaAuth.idx.authenticate()`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate).

   ```javascript
   const authClient = getAuthClient(req);
   const transaction = await authClient.idx.authenticate({ username, password });
   ```

### 3: Your app handles an authentication response

   Use `authenticate()` to get a `transaction` object containing the current sign-in flow status. Handle the `IdxStatus` value returned accordingly:

   #### Success status

   When the user correctly inputs their password, `IdxStatus` equals `IdxStatus.SUCCESS`. Call `tokenManager.setTokens()` to save the tokens retrieved from the response for future requests, then redirect the user back to the homepage. The user is now signed in.

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

   Handle other `IdxStatus` cases as follows:

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
