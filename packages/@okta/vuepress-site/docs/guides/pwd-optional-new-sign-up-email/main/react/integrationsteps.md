### 1: The user navigates to the sign-in page

When the user navigates to your app's sign-in page, display a link on your app's sign-in page that points to a sign-up page.

<div class="half border">

![A simple sign-in page with a sign-up link.](/img/pwd-optional/pwd-optional-sign-up-link-sign-in-page.png)

<!-- Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=1975%3A2792 pwd-optional-sign-up-link-sign-in-page -->

</div>

### 2: The user clicks the sign-up link

When the user clicks **Sign up**, redirect them to the page where they can sign up for a new account. During page load, call `OktaAuth.idx.register()` to start the self-service registration flow.

```javascript
  const { oktaAuth } = useOktaAuth();
  const startFlow = useCallback(async () => {
    newTransaction = await oktaAuth.idx.register();
  }, [oktaAuth, flow, setTransaction]);
```

The method returns an `IdxTransaction` object containing field metadata that can be used to create a registration page dynamically.

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

![A simple sign-up page with first name, last name, and email fields, and submit button.](/img/pwd-optional/pwd-optional-sign-up-page.png)

<!-- Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=1975%3A2791 pwd-optional-sign-up-page -->

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

<div class="half border">

![A form with an OTP input field and a verify button.](/img/pwd-optional/pwd-optional-react-sign-up-verify-otp.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=2842%3A4925 pwd-optional-react-sign-up-verify-otp
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

After the user verifies their identity using the email authenticator, `OktaAuth.idx.proceed()` returns an `IdxTransaction` object indicating that the user has the option to enroll in additional authenticators. The `IdxTransaction.nextStep.canSkip` property is set `true`, which indicates the remaining authenticators are optional.

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

Display a page that lists the remaining authenticators and allows the user to skip registering any more of them.

<div class="half border">

![A form showing a list of authenticators to enroll, and Submit, Cancel, and Skip buttons.](/img/pwd-optional/pwd-optional-sign-up-authenticators-page.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=1978%3A1741 pwd-optional-sign-up-authenticators-page
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
