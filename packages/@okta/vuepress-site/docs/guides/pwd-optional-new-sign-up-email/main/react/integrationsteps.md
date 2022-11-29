### 1: The user navigates to the sign-in page

When the user navigates to your app's sign-in page, display a link on your app's sign-in page that points to a sign-up page.

<div class="half wireframe-border">

![A sign-in form with a field for the username, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-only-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3401%3A37178&t=vr9MuCR8C4rCt3hC-1 sign-in-form-username-only-sign-up-forgot-your-password-links
 -->

</div>

### 2: The user clicks the sign-up link

When the user clicks **Sign up**, redirect them to the page where they can sign up for a new account. During page load, call `OktaAuth.idx.register()` to start the self-service registration flow.

```javascript
  const { oktaAuth } = useOktaAuth();
  const startFlow = useCallback(async () => {
    newTransaction = await oktaAuth.idx.register();
  }, [oktaAuth, flow, setTransaction]);
```

The method returns an `IdxTransaction` object that contains field metadata that you can use to create a registration page dynamically.

```json
{
   "status":"PENDING",
   "nextStep":{
      "name":"enroll-profile",
      "inputs":[
         {
            "name":"firstName",
            "type":"string",
            "label":"First name",
            "required":true,
            "minLength":1,
            "maxLength":50
         }
         ...
      ]
   },
}
```

Display &mdash; either statically or dynamically using `IdxTransaction` &mdash; input fields for the user's first name, last name, and email.

<div class="half wireframe-border">

![A sign-up form with fields for first name, last name, and email address, and a create account button](/img/wireframes/sign-up-form-first-last-name-email.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36911&t=2h5Mmz3COBLhqVzv-1  sign-up-form-first-last-name-email
 -->

</div>

### 3: The user submits their new account details

When the user submits their account details, create an object with `firstName`, `lastName`, and `email` properties and assign them the values entered by the user.

> **Note**: The `email` property represents the account's username and primary email address.

```javascript
const inputValues = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@email.com",
 };
```

Send this new object to `OktaAuth.idx.proceed()`.

```javascript
setProcessing(true);
const newTransaction = await oktaAuth.idx.proceed(inputValues);
setTransaction(newTransaction);
```

>**Note**: You can also start the registration flow in a single step by passing the account details in `OktaAuth.idx.register()`. See [`idx.register`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxregister) in the GitHub docs or [Node Express's](/docs/guides/pwd-optional-new-sign-up-email/nodeexpress/main/#_3-the-user-submits-their-new-account-details) version of this guide to learn more.

### 4. Identity Engine requests new email verification

Identity Engine sends the user an email that contains a one-time password (OTP) they can use to verify their identity.`OktaAuth.idx.proceed()` returns an `IdxTransaction` object with a `status` of `PENDING`, indicating that the user needs to verify their identity with their email.

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

Build the logic that handles this response and sends the user to a dialog where they enter the OTP.

### 5. The user verifies their identity with the new email

The user opens the email sent by Identity Engine. Create a dialog in your app where the user can submit the OTP from the email back to Identity Engine.

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

Call `OktaAuth.idx.proceed()` passing in the new object.

```javascript
    const newTransaction = await oktaAuth.idx.proceed(inputValues);
    setTransaction(newTransaction);
    setInputValues({});
    setProcessing(false);
```

### 6. Your app displays the remaining optional authenticators

After the user verifies their identity using the email authenticator, `OktaAuth.idx.proceed()` returns an `IdxTransaction` object indicating that the user has the option to enroll in additional authenticators. The `IdxTransaction.nextStep.canSkip` property is set to `true`, which indicates the remaining authenticators are optional.

```json
{
  status: "PENDING",
  nextStep: {
    name: "select-authenticator-enroll",
    options: [
      {
        label: "Google Authenticator",
        value: "google_otp"
      },
      {
        label: "Okta Verify",
        value: "okta_verify",
      },
    ],
    canSkip: true,
  },
}
```

Display a page that lists the remaining authenticators and allows the user to skip registering any more.

<div class="half wireframe-border">

![A choose your authenticator form with google and Okta verify options and next, skip, and cancel buttons](/img/wireframes/choose-authenticator-form-google-okta-verify-with-skip-and-cancel.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3401%3A37205&t=vr9MuCR8C4rCt3hC-1 choose-authenticator-form-google-okta-verify-with-skip-and-cancel
 -->

</div>

>**Note:** In other use cases where there are additional required authenticators, `IdxTransaction.nextStep.canSkip` equals `false` and the **Skip** button should be omitted.

### 7. The user skips the remaining optional authenticators

When the user clicks the **Skip** button, call `OktaAuth.idx.proceed()` passing in an object with a `skip` property equal to `true`.

```javascript
const newTransaction = await oktaAuth.idx.proceed({ skip: true });
setTransaction(newTransaction);
```

`OktaAuth.idx.proceed()` returns `IdxTransaction.status` equal to `SUCCESS` along with access and ID tokens, which indicates a successful new user sign-up flow.

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

Store these tokens for future requests and redirect the user to the default page after a successful sign-up attempt.
