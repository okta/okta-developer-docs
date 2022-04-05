> **Note:** These steps describe integrating the Okta email OTP flow into your app. To learn more about Okta email including how to integrate Okta email using magic links, see the [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/).

### 1: Add the forgot password link to the sign-in page

The first step is to create a forgot your password link on the sign-in page, as in the following example. This link points to a **Recover password** page (`/recover-password)`.

<div class="common-image-format">

![Displays the sign-in page with a 'Forgot password?' link that the user can click to reset their password.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-nodejs.png)

</div>

Create a **Recover password** page that initiates the reset password flow. This page accepts the user's email address and has a **Next** button that starts the reset flow.

<div class="common-image-format">

![Displays the Reset Password page that has a field to input your password.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-reset-nodejs.png)

</div>

After the user clicks **Next** to start the reset flow, the next step is to call `idx.recoverPassword` and pass in the email address captured from the form. This starts the password recovery flow and returns a status of `Idx.Status:PENDING` and a `nextStep` field with inputs for an authenticator type.

The call is shown in the `recover-password.js` file of the SDK sample application.

```JavaScript
router.post('/recover-password', async (req, res, next) => {
  const { username } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.recoverPassword({ username });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

The `handleTransaction.js` page routes the user to a select authenticators page (`/select-authenticator` in this example) that the user needs to use to select an authentication type. In this case, the email factor is configured.

```JavaScript
// authenticator authenticate
    case 'select-authenticator-authenticate':
      redirect({
        req, res, path: '/select-authenticator'
      });
      return true;
```

>**Note:** Review the complete use of `idx.recoverPassword` in the [Okta Auth JS SDK](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxrecoverpassword).

### 2: Create the reset password authenticators page

The next step is to create a page that shows the authenticator key returned from the `handleTransaction()` method. For this use case, the email authenticator is returned (`authenticator: AuthenticatorKey.OKTA_EMAIL`). The page includes the name of the returned authenticator and the ability to select the authenticator to initiate the authentication verification process.

<div class="common-image-format">

![Displays the Select authenticator page that has a field to select email.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-select-auth-nodejs.png)

</div>

### 3: The user selects the email authenticator factor

After the user selects the email authenticator, the next step is to call `idx.recoverPassword` with the authenticator type, as shown in the `authenticator.js` file of the SDK sample application. The method returns a status of `Idx.Status:PENDING`. This status indicates that the Okta platform has emailed the verification code to the user's email address and is now awaiting verification. The response also includes a `nextStep` field that requires an email verification code input parameter.

```JavaScript
router.post('/select-authenticator', async (req, res, next) => {
  const { idxMethod } = req.getFlowStates();
  const { authenticator } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx[idxMethod]({ authenticator });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

### 4: Create the code verification page and reset the password

After the call to `idx.recoverPassword` has responded with a status of `Idx.Status:PENDING`, the user is redirected to a code verification page. The page must display a field to enter a code and a button or link to send the code to Okta for the email verification.

<div class="common-image-format">

![Displays the Challenge email authenticator page that has a field to input your email verification code.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-challenge-nodejs.png)

</div>

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

If the `idx.recoverPassword` call is successful, it returns a status of `Idx.Status:PENDING` and the `nextStep` field indicates an input of a password value parameter. This status indicates that the user can now change their password. At this point, the user is redirected to a change password page.

Create a reset password page that allows the user to enter the new password, confirm it, and initiate the update.

<div class="common-image-format">

![Displays the Reset Password page that has a field to input your password and a field to confirm the password value.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-set-password-nodejs.png)

</div>

### 5: Add the new password

The final step is to make a call to `idx.recoverPassword`, passing in the value of the user input password, as shown in the `recover-password.js` file of the SDK sample application. This call resets the user's password.

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
