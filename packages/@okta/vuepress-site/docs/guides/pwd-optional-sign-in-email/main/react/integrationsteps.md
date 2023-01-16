### 1: The user navigates to the sign-in page

When the user navigates to your app's sign-in page, call `OktaAuth.idx.start()` to start the sign-in flow.

```javascript
const { oktaAuth } = useOktaAuth();
const startFlow = useCallback(async () => {
  newTransaction = await oktaAuth.idx.start();
}, [oktaAuth, flow, setTransaction]);
```

The method returns an `IdxTransaction` object that contains field metadata that you can use to create a sign-in page dynamically.

```json
{
   "status":"PENDING",
   "nextStep":{
      "name":"identify",
      "inputs":[
         {
            "name": "username",
            "label": "Username",
            "required": true
         }
         ...
      ]
   },
}
```

Display &mdash; either statically or dynamically using `IdxTransaction` &mdash; an input field for the user's username.

<div class="half wireframe-border">

![A sign-in form with a field for the username, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-only-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3401%3A37178&t=vr9MuCR8C4rCt3hC-1 sign-in-form-username-only-sign-up-forgot-your-password-links
 -->

</div>

### 2: The user submits their username

When the user submits their username, create an object with a `username` property and assign it the value entered by the user.

```javascript
const inputValues = {
  username: "johndoe@email.com",
 };
```

Call `OktaAuth.idx.proceed()` passing in this new object as a parameter.

```javascript
setProcessing(true);
const newTransaction = await oktaAuth.idx.proceed(inputValues);
setTransaction(newTransaction);
```

>**Note**: You can also start the sign-in flow in a single step by passing the username as a parameter to `OktaAuth.idx.authenticate()`. See [`idx.authenticate`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) in the GitHub docs or the [Node Express](/docs/guides/pwd-optional-sign-in-email/nodeexpress/main/#_2-the-user-submits-their-username) version of this guide to learn more.

### 3. Identity Engine requests email verification

Identity Engine sends the user an email that contains a one-time passcode (OTP) they can use to verify their identity. `OktaAuth.idx.proceed()` returns an `IdxTransaction` object with a `status` of `PENDING`, indicating that the user needs to verify their identity with their email.

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

Build the logic that handles this response and sends the user to a dialog where they enter the OTP.

### 4. The user verifies their identity with their email

The user opens the email sent by Identity Engine. Create a dialog in your app where the user can submit the OTP from the email to Identity Engine.

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

When the user submits the OTP, create an object with a `verificationCode` property set to the OTP entered by the user.

```json
const inputValues = {
    "verificationCode":"197277"
 };
```

Call `OktaAuth.idx.proceed()` passing in the new object as a parameter.

```javascript
    const newTransaction = await oktaAuth.idx.proceed(inputValues);
    setTransaction(newTransaction);
    setInputValues({});
    setProcessing(false);
```

### 5. Identity Engine verifies OTP and returns success

`OktaAuth.idx.proceed()` returns `IdxTransaction.status` equal to `SUCCESS` along with access and ID tokens, which indicates a successful user sign-in flow.

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

> **Note:** In other use cases where additional sign-in authenticators are required, the user must choose and verify all required authenticators before `IdxTransaction.status` of `SUCCESS` is returned.
