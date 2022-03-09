### 1. Initiate sign-in and email verification

Initiate sign in, display email otp screen, and send email

<div class="common-image-format">

![Screenshot of different device or browser error](/img/authenticators/authenticators-email-challenge-auth.png)

</div>

### 2. Click on email magic link

User clicks on the magic link.

<div class="common-image-format">

![Screenshot of different device or browser error](/img/authenticators/authenticators-email-magic-link-in-email.png)

</div>

Create a route to handle the call back with OTP and state

```javascript
router.get('/login/callback', async (req, res, next) => {
  const { protocol, originalUrl } = req;
  const parsedUrl = new URL(protocol + '://' + req.get('ho
});

```

### 3. Determine whether it's coming from an email

Check for OTP and ste

```javascript
    if (authClient.idx.isEmailVerifyCallback(search)) {
      // may throw an EmailVerifyCallbackError if proceed is not possible
      const transaction = await authClient.idx.handleEmailVerifyCallback(search);
      handleTransaction({ req, res, next, authClient, transaction });
      return;
    }

```

### 4 Send OTP and state to SDK to determine next steps

```javascript
 const transaction = await authClient.idx.handleEmailVerifyCallback(search);
```

### 5 If Error if different browser or device, terminate flow

The `EmailVerifyCallbackError` is thrown ..

```javascript
try {
      const transaction = await authClient.idx.handleEmailVerifyCallback(search);
      handleTransaction({ req, res, next, authClient, transaction });
      return;
  } catch (err) {
    next(err);
  }
```

<div class="common-image-format">

![Screenshot of different device or browser error](/img/authenticators/authenticators-email-magic-link-error.png)

</div>


### 6 If no error handle next steps and success

```json
{
  status: "SUCCESS",
  tokens: {
    accessToken: {
      accessToken: "eyJraWQiOiJTajV3...,
      tokenType: "Bearer",
      authorizeUrl: "https://test.okta.com/oauth2/default/v1/authorize",
      userinfoUrl: "https://test.okta.com/oauth2/default/v1/userinfo",
    },
    idToken: {
      idToken: "eyJraWQiOiJTajV3cUUw...",
    },
  },
  interactionCode: "ei2SMU9sRSo6UVtJMm92D-VdUvQ0Xz8vuUysCM2EZKQ",
}

```
