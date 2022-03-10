### 1. Initiate sign in

First, the user initiates the sign-in with username and optionally password by making a call to `OktaAuth.idx.authenticate()`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({ username,password});
```

### 2. Send email to user's email address

If the user is already enrolled in Okta email, calling `OktaAuth.idx.authenticate()` iniitates the sending of an email to the user's email address. The email is based off of the **Email Challenge** template, which contains a placeholder for the OTP.

### 3. Handle response from authenticate

`OktaAuth.idx.authenticate()` returns a response indicating the next step is to challenge the user with the email authenticator.  `IdxTransaction` returns with a `status` of `PENDING`, `nextStep.name` of `challenge-authenticator`, and `nextstep.authenticatorEnrollments[n],key` equal to `okta_email`.

```json
{
  status: "PENDING",
  nextStep: {
    name: "challenge-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
        type: "string",
      },
    ],
    type: "email",
    authenticatorEnrollments: [
      {
        profile: {
          email: "johndoe@gmail.com",
        },
        type: "email",
        key: "okta_email",
        displayName: "Email",
      },
    ],
  },
}
```

Use this response to display a page with an OTP input field.

<div class="common-image-format">

![Screenshot of OTP in challenge page](/img/authenticators/authenticators-email-challenge-auth.png)

</div>

### 4. Open email and copy OTP

Next, the user opens the email sent by Okta and copies the OTP. The following screenshot shows the OTP in an email generated from the **Email Challenge** template.

<div class="common-image-format">

![Screenshot of OTP in challenge page](/img/authenticators/authenticators-email-challenge-otp.png)

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
