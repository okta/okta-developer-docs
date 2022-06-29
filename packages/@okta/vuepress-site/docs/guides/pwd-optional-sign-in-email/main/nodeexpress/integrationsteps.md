### 1: Create and display sign-in page

Create a sign-in page that captures the user's username.

<div class="half border">

![Screenshot showing a sign-in page with a username field and a Next button.](/img/pwd-optional/pwd-optional-sign-in-page.png)

</div>

### 2: Submit username

When the user submits their username, call `OktaAuth.idx.authenticate()` passing in the username.

```javascript
  const { username } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({ username });
```

### 3. Verify identity with the email authenticator

`OktaAuth.idx.authenticate()` returns an `IdxTransaction` object indicating that the user needs to verify their identity with the email authenticator challenge.

```json
{
  status: "PENDING",
  nextStep: {
    name: "challenge-authenticator",
    type: "email",
    authenticator: {
      type: "email",
      key: "okta_email",
      displayName: "Email",
    },
  },
}
```

The email authenticator supports OTP and magic links, and you can integrate both methods into your application. For more information about integrating the email authenticator challenge, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#integrate-email-challenge-with-magic-links).

### 4. Complete sign-in flow

When the user completes the email authenticator verification, `OktaAuth.idx` should return  `IdxTransaction.status` of `SUCCESS` along with access and ID tokens, which indicates a successful sign-in.

```json
{
  status: "SUCCESS",
  tokens: {
    accessToken: {
      accessToken: "eyJraWQiOiJLSWdvVHlt...",
      expiresAt: 1656106249,
      tokenType: "Bearer",
    },
    idToken: {
      idToken: "eyJraWQiOiJLSWdvVHltSGlL...",
      expiresAt: 1656106249,
    },
  },
}
```
