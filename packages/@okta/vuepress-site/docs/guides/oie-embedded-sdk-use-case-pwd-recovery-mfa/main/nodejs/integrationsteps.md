### 1. Select the password recovery link

First, the user selects a password recovery link located on the sign-in page. Add a link that points to the password recovery page. An example link named **Forgot password?** is shown in the following screenshot.

<div class="common-image-format">

![Screenshot showing a page displaying the sign-in page with a 'Forgot password?' link where users can click to reset their password.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-nodejs.png)

</div>

### 2. Show the password recovery page

Next, show the password recovery page to the user. Create a page that accepts the account's username and includes a **Next** button that starts the recovery flow.

<div class="common-image-format">

![Screenshot showing a page displaying the reset password page that has a field to input your password.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-reset-nodejs.png)

</div>

### 3. Submit username

The user enters their username on the password recovery page and selects **Next** to start the recovery process.  At this time, call `OktaAuth.idx.recoverPassword()`, passing in the username.

```javascript
try {
  const transaction = await authClient.idx.recoverPassword({ username });
  handleTransaction({ req, res, next, authClient, transaction });
} catch (error) {
  next(error);
}
```

### 4. Display a list of available authenticators

`OktaAuth.idx.recoverPassword()` returns a response indicating that the next step is to select an authenticator. Specifically, `IdxTransaction` returns a `status` of `PENDING`, `nextStep.name` equal to `select-authenticator-authenticate`, and a `option` item with a `value` of `okta_email` in the `nextstep.inputs[n].options` array.

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
          },
          {
            label: "Phone",
            value: "phone_number",
          },
        ],
      },
    ],
  },
}
```

Using this response, display a list of authenticators to the user. If you've configured your org as described in [Configuration updates](#configuration-updates), email is included in the list of available authenticators.

<div class="common-image-format">

![Screenshot of a page displaying a list of authenticators including the email authenticator](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-select-auth-nodejs.png)

</div>

### 5. Verify identity with the email authenticator

Next, the user selects and verifies their identity with the email authenticator challenge. The email authenticator supports OTP and magic links, and you can integrate both methods into your application. Learn more about integrating the email authenticator challenge by visiting the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#integrate-email-challenge-with-magic-links).

### 6. Display password reset page

After the user verifies their email, `OktaAuth.idx.proceed()` returns a response indicating that user is allowed to reset their password. Specifically, `IdxTransaction` returns a `status` of `PENDING` and `nextStep.name` equal to `reset-authenticator`.

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

Using this response, create a password reset page that allows the user to enter their new password.

<div class="common-image-format">

![Screenshot of a page allowing the user to enter their new password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-set-password-nodejs.png)

</div>

### 7. Submit the new password

Next, the user enters and submits their new password. Send the new password to `OktaAuth.idx.recoverPassword()`.


```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.recoverPassword({ password });
  handleTransaction({ req, res, next, authClient, transaction });
```

>**Note:** Review the complete use of `idx.recoverPassword` in the [Okta Auth JS SDK](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxrecoverpassword).

If the call to `OktaAuth.idx.recoverPassword()` is successful, `IdxTransaction` returns a `status` of `SUCCESS` along with Id and access tokens. The password reset is now complete and you can redirect the user to the default home page.
