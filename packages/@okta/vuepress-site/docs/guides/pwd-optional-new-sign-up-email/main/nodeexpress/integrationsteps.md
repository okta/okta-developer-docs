### 1: Add sign up link on sign-in page

Add a **Sign up** link on your app's sign-in page. When the user clicks this link, they are redirected to a sign-up page where they can sign up for a new account.

<div class="common-image-format bordered-image">

![Screenshot showing a sign in page with a sign up link.](/img/pwd-optional/pwd-optional-sign-up-link-sign-in-page.png)

</div>

### 2: Create and display sign up page

Create a sign up page that captures the user's first name, last name and email.

<div class="common-image-format bordered-image">

![Screenshot showing a sign up page with first name, last name, and email fields.](/img/pwd-optional/pwd-optional-sign-up-page.png)

</div>

### 3: Submit new user account details

When the user submits their account details, create an object with `firstName`, `lastName`, and `email` properties and assign them the values entered by the user. Note that the `email` property represents the account's username and primary email address.

```json
{
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@email.com",
}
```

Send this new object to `OktaAuth.idx.register()`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.register(req.body);
  handleTransaction({ req, res, next, authClient, transaction });
```

### 4. Verify identity with the email authenticator

`OktaAuth.idx.register()` returns an `IdxTransaction` object indicating that the user needs to verify their identity with the email authenticator challenge.

```json
{
  status: "PENDING",
  nextStep: {
    name: "enroll-authenticator",
    type: "email",
    authenticator: {
      type: "email",
      key: "okta_email",
      displayName: "Email",
    },
  },
}
```

The email authenticator supports OTP and magic links, and you can integrate both methods into your application. Learn more about integrating the email authenticator challenge by visiting the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#integrate-email-challenge-with-magic-links).

### 5. Display remaining optional authenticators

After the user verifies their identity using the email authenticator, `OktaAuth.idx.proceed()` returns an `IdxTransaction` object indicating that the user can enroll in additional optional authenticators including the password authenticator. The `IdxTransaction.nextStep.canSkip` property set to `true` identifies these authenticators as optional

```json
{
  status: "PENDING",
  nextStep: {
    name: "select-authenticator-enroll",
    options: [
      {
        label: "Okta Verify",
        value: "okta_verify",
      },
      {
        label: "Password",
        value: "okta_password",
      },
    ],
    canSkip: true,
  },
}
```

Create and display a page that lists the remaining optional authenticators and allow the user to skip registering any additional authenticators.

<div class="common-image-format bordered-image">

![Screenshot showing a page to skip the remaining optional authenticators.](/img/pwd-optional/pwd-optional-sign-up-authenticators-page.png)

</div>

### 6. Skip remaining optional authenticators and complete sign up

When the user opts to skip registering anymore authenticators, call `OktaAuth.idx.proceed()` passing in an object with a `skip` property equal to `true`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ skip: true });
  handleTransaction({ req, res, next, authClient, transaction });
```

`OktaAuth.idx.proceed()` should return  `IdxTransaction.status` of `SUCCESS` along with access and Id tokens which indicates a successful new user sign up.

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
