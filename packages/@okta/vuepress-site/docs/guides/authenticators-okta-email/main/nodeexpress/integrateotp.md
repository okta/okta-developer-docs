### 1. Initiate sign-in and email verification

First, the user initiates the sign-in with username and optionally password. If enrolled in Okta email, `OktaAuth.idx.authenticate()` returns `IdxTransaction` with a `status` of `PENDING` and `nextStep.name` of `challenge-authenticator`. Use this response to display a page that accepts the OTP.

<div class="common-image-format">

![Screenshot of different device or browser error](/img/authenticators/authenticators-email-challenge-auth.png)

</div>

### 2. Open email and copy OTP



<div class="common-image-format">

![Screenshot of OTP in challenge and enrollment pages](/img/authenticators/authenticators-email-otp-in-email.png)

</div>

### 2. Enter and submit OTP

```javascript
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
  handleTransaction({ req, res, next, authClient, transaction });
```

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

### 3. Complete sign in
