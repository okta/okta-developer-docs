### 1: Initiate password recovery

The first step is to initiate the password recovery flow and choose email as the authenticator. After the user submits the email as an authenticator, Okta verifies that an account exists for the user using the information that they entered in step 2 above. If the account exists, Okta then sends a recovery email that matches the Forgot Password template that was altered earlier to the associated email address.

The email's **Reset Password** link includes the `otp` and `request.relayState` variables sent back as query parameters to the application. For instance, the URL in the email template, `http://localhost:8080/magic-link/callback?otp={oneTimePassword}&state={request.relayState}`, might be rendered as `http://localhost:8080/magic-link/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32` in the email sent to the user.

These initial steps are described in detail in the [User password recovery guide](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/nodejs/main/).

### 2: Click the email magic link

The next step is to open the Okta email and click its reset password link.

<div class="three-quarter">

![Example of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png "Password recovery email")

</div>

Add a route to accept the link's URL in your app. Include logic to parse the `otp` and `state` parameters out of the URL string.

```javascript
router.get('/login/callback', async (req, res, next) => {
  const { protocol, originalUrl } = req;
  const parsedUrl = new URL(protocol + '://' + req.get('host') + originalUrl);
  const { search, href } = parsedUrl;
  const authClient = getAuthClient(req);
  ...
```

### 3: Check if otp and state parameters are included in URL

Check to see if `otp` and `state` exists in the query parameter by calling `OktaAuth.idx.isEmailVerifyCallback()` and passing in the query parameter string. An example query string: `?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`

```javascript
if (authClient.idx.isEmailVerifyCallback(search)) {
  ...
}
```

### 4: Submit the otp and state parameters

If the parameters exist, submit and verify them by calling `OktaAuth.idx.handleEmailVerifyCallback()` and passing in the query string used in the previous step.

```javascript
const transaction = await authClient.idx.handleEmailVerifyCallback(search);
handleTransaction({ req, res, next, authClient, transaction });
```

### 5: Handle next step response

If the `otp` and `state` are valid, `OktaAuth.idx.handleEmailVerifyCallback()` returns an `IdxTransaction` object indicating that the next step is for the user to reset their password.  Specifically, `status` equals `PENDING` and `nextStep.name` is set to `reset-authenticator`.

```json
{
  status: "PENDING",
  nextStep: {
    name: "reset-authenticator",
    inputs: [
      {
        name: "password",
        label: "New password",
        secret: true,
        ...
      },
    ],
    type: "password",
    authenticator: {
      type: "password",
      ...
    },
  }
}

```

### 6: Display password reset page and continue the password recovery flow

Based on the `IdxTransaction` response, display the password reset page and continue the password recovery flow described in the [User password recovery guide](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/nodejs/main/).

<div class="half border">

![Screenshot of password reset page](/img/advanced-use-cases/custom-pwd-recovery-custom-sdk-reset-pwd-page.png)

</div>
