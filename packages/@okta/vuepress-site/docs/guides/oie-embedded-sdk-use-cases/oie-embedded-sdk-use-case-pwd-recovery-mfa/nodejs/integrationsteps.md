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

After the user clicks **Submit** to start the reset flow, the next step is to call `idx.recoverPassword` and pass in the email address captured from the **Username** field. This starts the password recovery flow and returns a status of `Idx.Status:PENDING` and a `nextStep` field with inputs for an authenticator.

The cal is shown in the SDK sample application's `recover-password.js` file.

```JavaScript
router.post('/recover-password', async (req, res, next) => {
  const { username } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.recoverPassword({ username });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

The `handleTransaction` response, in the `handleTransaction.js` page, directs the user to a select authenticators page (`/select-authenticator` in this example) that the user needs to use to select an authentication type. In this case, the email factor is configured.

```JavaScript
// authenticator authenticate
    case 'select-authenticator-authenticate':
      redirect({
        req, res, path: '/select-authenticator'
      });
      return true;
```

>**NOTE:** Review the full use of the `idx.recoverPassword` method in the [Okta Auth JS SDK](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxrecoverpassword). Other uses are documented in the following steps.

### Step 3: Create reset password authenticators page

The next step is to create a page that shows the authenticator that is returned from the `handleTransaction` method. For this use case, it shows the email authenticator. The page should include the name of the authenticator and the ability to select the authenticator to initiate the authentication verification process.

<div class="common-image-format">

![Select password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-choose-auth.png
 "Select password")

</div>

After the user selects the email authenticator, the next step is to call `idx.recoverPassword` with the authenticator type, as shown in the `authenticator.js` file of the SDK sample application. The method returns a status of `Idx.Status:PENDING`. This status indicates that the Okta platform has emailed the verification code to the user's email address and it's now awaiting verification. The `nextStep` field, also returned, requires an input parameter of an email verification code.

```JavaScript
router.post('/select-authenticator', async (req, res, next) => {
  const { idxMethod } = req.getFlowStates();
  const { authenticator } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx[idxMethod]({ authenticator });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

### Step 4: Create code verification page

After the call to `idx.recoverPassword` has responded with a status of `Idx.Status:PENDING`, the user should be redirected to a code verification page.

<div class="common-image-format">

![Select password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-all-verify-email-code.png
 "Select password")

</div>

The page should display a field to enter a code and a button or link to send the code to Okta for the email verification.

After the user checks their email for the code and enters the value into the field, they should click **Verify** to initiate the verification. Call `idx.recoverPassword` with the verification code passed in, as shown in the `authenticator.js` page of the SDK sample application.

```JavaScript
router.post('/challenge-authenticator/email', async (req, res, next) => {
  const { idxMethod } = req.getFlowStates();
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx[idxMethod]({ verificationCode });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

If the `idx.recoverPassword` call is successful, it should return a status of `Idx.Status:PENDING` and the `nextStep` field indicates an input of a password value parameter. This status indicates that the user can now change their password. At this point, the user should be redirected to the change password page.

### Step 5: Create change password page

Create a change password page that allows the user to enter the new password and initiate the change password.

<div class="common-image-format">

![Select password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-link.png
 "Select password")

</div>

The final step is to make a call to `idx.recoverPassword`, passing in the value of the password, input by the user, as shown in the `recover-password.js` file of the SDK sample application. This call will reset the user's password.

```JavaScript
router.post('/reset-password', async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    // TODO: handle error in validation middleware
    next(new Error('Password not match'));
    return;
  }

  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.recoverPassword({ password });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

If the response to the `idx.recoverPassword` call returns `Idx.Status:SUCCESS` and tokens, the change password flow has completed successfully and you can redirect the user to the default home page.
