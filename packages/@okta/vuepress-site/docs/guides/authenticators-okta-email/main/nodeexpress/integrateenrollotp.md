### 1. Initiate the sign-in flow

First, the user initiates the sign-in with username and password flow by making a call to `OktaAuth.idx.authenticate()`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({ username,password});
```

### 2. Show option to enroll email

If email enrollment is enabled for your org's application, and the user hasn't yet enrolled in email, `OktaAuth.idx.authenticate()` returns `IdxTransaction` with a status of `PENDING` and `nextStep.name` equal to `select-authenticator-enroll`. The `nextStep.options` array includes an item with a `value` property of `okta_email`.

```json
{
  status: "PENDING",
  nextStep: {
    name: "select-authenticator-enroll",
    options: [
      {
        label: "Email",
        value: "okta_email",
      },
    ],
  },
}
```

Use this response to display a page of available authenticators, including Email.

<div class="half border">

![Screenshot of authenticator list](/img/authenticators/authenticators-email-enroll-auth-list.png)

</div>


### 3. Submit the Email Authenticator

When the user selects the Email Authenticator from the list, call `OktaAuth.idx.proceed()` and pass in `okta_email`.

```javascript
    const authClient = getAuthClient(req);
    const transaction = await authClient.idx.proceed({ authenticator });
```

### 4. Send the email to user's email address

Calling `OktaAuth.idx.proceed()` in the previous step sends an email to the user's email address. The email, which contains a placeholder for the OTP, is based on the **Email Factor Verification** template.

### 5. Display an OTP input page

The `OktaAuth.idx.proceed()` returns a `IdxTransaction` response with a `status` of `PENDING`, `nextStep.name` equal to `enroll-authenticator`, and `availableSteps[n].authenticator.key` set to `okta_email`.

```json
{
  status: "PENDING",
  nextStep: {
    name: "enroll-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
        type: "string",
        required: true,
      },
    ],
    type: "email",
  },
  availableSteps: [
    {
      name: "enroll-authenticator",
      type: "email",
      authenticator: {
        key: "okta_email",
      },
    },
  ],
}
```

Using this response, display a page to input the OTP.

<div class="half border">

![Screenshot of enroll OTP](/img/authenticators/authenticators-email-enroll-enter-code.png)

</div>

### 6. Open email and copy OTP

Next, the user opens the email and copies the OTP. The following screenshot shows the OTP in an email generated from the **Email Factor Verification** template.

<div class="full">

![Screenshot of OTP in enrollment page](/img/authenticators/authenticators-email-enroll-otp.png)

</div>

### 7. Submit the OTP

When the user submits the OTP in your app, call `OktaAuth.idx.proceed()` and pass in the OTP.

```javascript
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
```

### 8. Complete a successful sign-in flow

If your configuration is set up with only the Email Authenticator, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. Your app redirects the user to the default home page for the signed-in user.


```json
{
  status: "SUCCESS",
  tokens: {
    accessToken: {
      accessToken: "eyJraWQiOiJTajV3...",
      },
      expiresAt: 1646673230,
    },
    idToken: {
      idToken: "eyJraWQiOiJTajV3cUUwO...",
      expiresAt: 1646673230,
    },
  }
}
```
