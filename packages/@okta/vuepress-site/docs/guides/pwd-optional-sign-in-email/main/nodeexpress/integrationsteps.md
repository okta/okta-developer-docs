### 1: Your app displays the sign-in page

Create a sign-in page that captures the user's username.

<div class="half border">

![Screenshot showing a sign-in page with a username field and a Next button.](/img/pwd-optional/pwd-optional-sign-in-page.png)

</div>

### 2: The user submits their username

When the user submits their username, call `OktaAuth.idx.authenticate()` and pass in the username.

```javascript
  const { username } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({ username });
```

### 3. The user verifies their identity with the email authenticator

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

The email authenticator supports user verification by One-Time Password (OTP) and by magic links. To learn more, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#integrate-email-challenge-with-magic-links).

### 4. Your app handles an authentication success response

When the user completes the email authenticator verification, one of `OktaAuth.idx` methods returns `IdxTransaction.status` of `SUCCESS` along with access and ID tokens, which indicates that the user successfully signed in.

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

Store these tokens for future requests and redirect the user to the default page after a successful sign-in attempt.


> **Note:** In other use cases where additional sign-in authenticators are required, the user needs to choose and verify all required authenticators before `IdxTransaction.status` of `SUCCESS` is returned.
