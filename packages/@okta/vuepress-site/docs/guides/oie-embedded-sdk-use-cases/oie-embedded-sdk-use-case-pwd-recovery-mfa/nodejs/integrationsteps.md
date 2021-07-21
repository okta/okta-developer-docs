## Integration steps

### Step 1: Add forgot password link to sign-in page

The first step is to create a forgot password link on the sign-in page. This link points to the "Reset your password" page.

<div class="common-image-format">

![Forgot password screenshot](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-forgot.png
 "Forgot password screenshot")

</div>

### Step 2: Create reset password page

Create a "Reset your password" page that initiates the reset password flow. The page should accept the user's email address and have a **Submit** button that starts the reset flow.

<div class="common-image-format">

![Reset password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-reset.png
 "Reset password")

</div>

### Step 3: Make call to idx.recoverPassword

After the user clicks **Submit** to start the reset flow, the next step is to call the `idx.recoverPassword` method and pass in the email address captured from the **Username** field, as seen in the SDK sample application's `recover-password.js` file. The method returns a call to the `handleTransaction` function in the `handleTransactions.js` file, which verifies the case and authenticator.

```JavaScript
router.post('/recover-password', async (req, res, next) => {
  const { username } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.recoverPassword({ username });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

After the return of the `handleTransaction` response, redirect the user to an authenticators page that displays the authenticator that the user needs to use to initiate authentication verification. In this case, the email factor is configured.

```JavaScript
// entry route
router.get('/recover-password', (req, res) => {
  req.setFlowStates({
    entry: '/recover-password',
    idxMethod: 'recoverPassword'
  });

  renderTemplate(req, res, 'recover-password', {
    action: '/recover-password'
  });
});
```

### Step 4: Create reset password authenticators page

The next step is to create a page that shows the authenticator that is returned from
the `RecoverPasswordAsync` method. For this use case, it shows the email authenticator.
The page should include the name of the authenticator and the ability to select the
authenticator to initiate the authentication verification process.

<div class="common-image-format">

![Select password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-choose-auth.png
 "Select password")

</div>
