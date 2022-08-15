### 1: The user navigates to the sign-in page

Display a **Sign up** link on your app's sign-in page that points to a sign-up page.

<div class="half border">

![Screenshot showing a sign-in page with a sign-up link.](/img/pwd-optional/pwd-optional-sign-up-link-sign-in-page.png)

</div>

### 2: The user clicks the sign up link

When the user clicks the **Sign up** link, redirect them to the sign-up page where they can sign up for a new account. During page load, call `OktaAuth.idx.register()` to start the self-service registration flow.

```javascript
  const { oktaAuth } = useOktaAuth();
  const startFlow = useCallback(async () => {
    newTransaction = await oktaAuth.idx.register();
  }, [oktaAuth, flow, setTransaction]);
```

The method returns an `IdxTransaction` object containing field metadata that's optionally used to create a registration page dynamically.

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

<div class="half border">

![A sign-up page with first name, last name, and email fields, and submit button.](/img/pwd-optional/pwd-optional-sign-up-page.png)

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

`OktaAuth.idx.proceed()` returns an `IdxTransaction` object with a `status` of `PENDING`, indicating that the user needs to verify their identity with their email.

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

The user opens the email sent by Identity Engine and copies the one-time passcode (OTP) to your app. Create a dialog to allow the user to enter and submit the OTP.

<div class="half border">

![Screenshot showing a page with a OTP input field.](/img/pwd-optional/pwd-optional-change-email-my-account-js-react-verify-email.png)

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

After the user verifies their identity using the email authenticator, `OktaAuth.idx.proceed()` returns an `IdxTransaction` object indicating that the user has the option to enroll in additional authenticators. The `IdxTransaction.nextStep.canSkip` property is set `true`, which indicates the remaining authenticators are optional.

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

Display a page that lists the remaining authenticators and allows the user to skip registering any more of them.

<div class="half border">

![A form showing a list of authenticators to enroll, and Submit, Cancel, and Skip buttons.](/img/pwd-optional/pwd-optional-sign-up-authenticators-page.png)

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
