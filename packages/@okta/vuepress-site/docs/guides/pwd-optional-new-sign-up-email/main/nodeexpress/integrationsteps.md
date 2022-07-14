### 1: Add sign-up link on sign-in page

Add a **Sign up** link on your app's sign-in page. When the user clicks this link, redirect them to a sign-up page where they can sign up for a new account.

<div class="half border">

![Screenshot showing a sign-in page with a sign-up link.](/img/pwd-optional/pwd-optional-sign-up-link-sign-in-page.png)

</div>

### 2: Create and display sign-up page

Create a sign-up page that captures the user's first name, last name, and email.

<div class="half border">

![A sign-up page with first name, last name, and email fields, and submit button.](/img/pwd-optional/pwd-optional-sign-up-page.png)

</div>

### 3: Submit new user account details

When the user submits their account details, create an object with `firstName`, `lastName`, and `email` properties and assign them the values entered by the user.

> **Note**: The `email` property represents the account's username and primary email address.

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

### 4. Verify the user's identity with the email authenticator

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

The email authenticator supports user verification by One-Time Password (OTP) and by magic links. To learn more, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#integrate-email-challenge-with-magic-links).

### 5. Display remaining optional authenticators

After the user verifies their identity using the email authenticator, `OktaAuth.idx.proceed()` returns an `IdxTransaction` object indicating that the user has the option to enroll in additional authenticators. The `IdxTransaction.nextStep.canSkip` property is `true` if the remaining authenticators are optional.

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

Create and display a page that lists the remaining optional authenticators and allows the user to skip registering any additional authenticators.

<div class="half border">

![A form showing a list of authenticators to enroll, and Submit, Cancel, and Skip buttons.](/img/pwd-optional/pwd-optional-sign-up-authenticators-page.png)

</div>

>**Note:** In other use cases where there are additional required authenticators, `IdxTransaction.nextStep.canSkip` equals `false` and the **Skip** button should be omitted.

### 6. Skip remaining optional authenticators and complete sign-up flow

When the user clicks the **Skip** button, call `OktaAuth.idx.proceed()` and pass in an object with a `skip` property equal to `true`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ skip: true });
  handleTransaction({ req, res, next, authClient, transaction });
```

`OktaAuth.idx.proceed()` should return an `IdxTransaction.status` of `SUCCESS` along with access and ID tokens, which indicates a successful new user sign-up flow.

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
