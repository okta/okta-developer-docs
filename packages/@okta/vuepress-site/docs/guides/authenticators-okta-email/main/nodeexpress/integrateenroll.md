### 1. Initiate sign in

First, the user initiates the sign-in with username and optionally password by making a call to `OktaAuth.idx.authenticate()`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({ username,password});
```

### 2. Show option to enroll email

If email enrollment is enabled for you org's application and the user has not yet enrolled in email, `OktaAuth.idx.authenticate()` returns `IdxTransaction` with a status of `PENDING` and `nextStep.name` equal to `select-authenticator-enroll`. The `nextStep.options` array includes an item with a `value` property of `okta_email`.

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

Use this response to a display a page of available authenticators, including email.

<div class="common-image-format">

![Screenshot of authenticator list](/img/authenticators/authenticators-email-enroll-auth-list.png)

</div>


### 3. Submit the email authenticator

When the user selects the email authenticator from the list, call `OktaAuth.idx.proceed()` passing in `okta_email`.

```javascript
    const authClient = getAuthClient(req);
    const transaction = await authClient.idx.proceed({ authenticator });
```

### 4. Display OTP input page

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

Using this response display a page to input the OTP.

<div class="common-image-format">

![Screenshot of enroll OTP](/img/authenticators/authenticators-email-enroll-enter-code.png)

</div>

### 4. Open email and copy OTP

Next, the user opens the email sent by Okta and copies the OTP. The following screenshot shows the OTP in an email generated from the **Email Factor Verification** template.

<div class="common-image-format">

![Screenshot of OTP in enrollment page](/img/authenticators/authenticators-email-enroll-otp.png)

</div>

### 5. Submit OTP

When the user submits the OTP in your app, call `OktaAuth.idx.proceed()` passing in the OTP.

```javascript
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
```

### 5: Complete successful sign-in

If your configuration is setup with only the email authenticator, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. Your app redirects the user to the default home page for the signed in user.


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
