### 1. Start the password recovery flow

Add a link that allows the user to submit their username to begin the password recovery flow. The following wireframe shows a **Forgot your password?** link.

<div class="half wireframe-border">

![Sign-in form with a 'Forgot your password?' link](/img/oie-embedded-sdk/wireframes/pwd-optional-sign-up-link-sign-in-page-g2r2.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 2

-->

### 2. Show the password recovery page

Next, build a password recovery page that allows the user to enter their account's username or email. Include a **Next** button that submits this username to the SDK when selected.

<div class="half wireframe-border">

![Reset password form with an email field](/img/oie-embedded-sdk/wireframes/reset-password-form-enter-email-g2r3.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 3

-->

### 3. Submit username

When the user enters their username and clicks **Next**, call `OktaAuth.idx.recoverPassword()`, passing in the username as a parameter.

```javascript
try {
  const transaction = await authClient.idx.recoverPassword({ username });
  handleTransaction({ req, res, next, authClient, transaction });
} catch (error) {
  next(error);
}
```

### 4. Display a list of available authenticators

The next step is to display a list of available authenticators using the response from `OktaAuth.idx.recoverPassword()`. The method returns an `IdxTransaction` object indicating:

* The sign-in `status` is in the `PENDING` state.
* The next step is to choose an authenticator, that is, `nextStep.name` = `select-authenticator-authenticate`.
* The email authenticator is an available option in the `options` array.

```javascript
{
  status: "PENDING",
  nextStep: {
    name: "select-authenticator-authenticate",
    inputs: [
      {
        name: "authenticator",
        type: "string",
        options: [
          {
            label: "Email",
            value: "okta_email",
          }
        ],
      },
    ],
  },
}
```

Using this response, display a list of authenticators to the user. In this case we are only showing the Email authenticator.

<div class="half wireframe-border">

![Recovery factor list to use (only email for this use case)](/img/oie-embedded-sdk/wireframes/choose-authenticator-email-form-g2r4.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 4

-->

> **Note**: If email is not included in the list of available authenticators, check you've configured your org as described in [Configuration updates](#configuration-updates).

### 5. Verify identity with the email authenticator

Next, the user verifies their identity with the email authenticator challenge. The email authenticator supports OTP and magic links, and you can integrate both methods into your application. Learn more about integrating the email authenticator challenge by visiting the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#integrate-email-challenge-with-magic-links).

### 6. Display password reset page

After the user verifies their identity using the email authenticator, `OktaAuth.idx.proceed()` returns an `IdxTransaction` indicating:

* The sign-in `status` is in the `PENDING` state.
* The next step is to reset the user's password, that is, `nextStep.name` = `reset-authenticator`.

```javascript
{
  status: "PENDING",
  nextStep: {
    name: "reset-authenticator",
    inputs: [
      {
        name: "password",
        label: "New password",
        secret: true,
        type: "string",
        required: true,
      },
    ],
  },
}
```

Create a password reset page that allows the user to enter their new password.

<div class="half wireframe-border">

![Password reset new password form](/img/oie-embedded-sdk/wireframes/reset-password-form-choose-new-password-g2r6.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 6

-->

### 7. Submit the new password

When the user submits their new password, check that the password and confirm password fields match, and pass it to `OktaAuth.idx.recoverPassword()`.

```javascript
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

>**Note:** Review the complete use of `idx.recoverPassword` in the [Okta Auth JS SDK](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxrecoverpassword).

If successful, the call to `OktaAuth.idx.recoverPassword()` returns a `status` of `SUCCESS` and the response will include ID and access tokens. The password reset is now complete and you can redirect the user to the default home page.
