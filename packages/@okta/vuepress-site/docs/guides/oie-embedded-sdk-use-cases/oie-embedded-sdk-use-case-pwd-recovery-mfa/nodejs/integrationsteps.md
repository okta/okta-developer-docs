## Integration steps

### Step 1: Add forgot password link to sign-in page

The first step is to create a forgot password link on the sign-in page, as in the following example. This link points to the "Reset your password" page.

<div class="common-image-format">

![Forgot password screenshot where user can click link to reset password.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-forgot.png)

</div>

Create a "Reset your password" page that initiates the reset password flow. This page accepts the user's email address and has a **Submit** button that starts the reset flow.

After the user clicks **Submit** to start the reset flow, the next step is to call `idx.recoverPassword` and pass in the email address captured from the form. This starts the password recovery flow and returns a status of `Idx.Status:PENDING` and a `nextStep` field with inputs for an authenticator type.

The call is shown in `recover-password.js` file of the SDK sample application.

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

>**NOTE:** Review the full use of `idx.recoverPassword` in the [Okta Auth JS SDK](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxrecoverpassword). Other uses of `idx.recoverPassword` are documented in the following steps.

### Step 2: Create reset password authenticators page

The next step is to create a page that shows the authenticator that is returned from the `handleTransaction` method. For this use case, it shows the email authenticator. The page includes the name of the authenticator and the ability to select the authenticator to initiate the authentication verification process.

After the user selects the email authenticator, the next step is to call `idx.recoverPassword` with the authenticator type, as shown in the `authenticator.js` file of the SDK sample application. The method returns a status of `Idx.Status:PENDING`. This status indicates that the Okta platform has emailed the verification code to the user's email address and it's now awaiting verification. The response also includes a `nextStep` field that requires an email verification code input parameter.

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

After the call to `idx.recoverPassword` has responded with a status of `Idx.Status:PENDING`, the user is redirected to a code verification page. The page must display a field to enter a code and a button or link to send the code to Okta for the email verification.

After the user checks their email for the code and enters the value into the field, they click a button to initiate the verification. Call `idx.recoverPassword` with the verification code passed in, as shown in the `authenticator.js` page of the SDK sample application.

```JavaScript
router.post('/challenge-authenticator/email', async (req, res, next) => {
  const { idxMethod } = req.getFlowStates();
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx[idxMethod]({ verificationCode });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

If the `idx.recoverPassword` call is successful, it returns a status of `Idx.Status:PENDING` and the `nextStep` field indicates an input of a password value parameter. This status indicates that the user can now change their password. At this point, the user is redirected to the change password page.

### Step 5: Create change password page

Create a change password page that allows the user to enter the new password and initiate the update.

The final step is to make a call to `idx.recoverPassword`, passing in the value of the password, input by the user, as shown in the `recover-password.js` file of the SDK sample application. This call resets the user's password.

```JavaScript
router.post('/reset-password', async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    next(new Error('Password not match'));
    return;
  }

  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.recoverPassword({ password });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

If the response to the `idx.recoverPassword` call returns `Idx.Status:SUCCESS` and tokens, the change password flow completed successfully and you can redirect the user to the default home page.
