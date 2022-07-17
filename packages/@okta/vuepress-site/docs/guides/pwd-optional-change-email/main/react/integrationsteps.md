### 1. The user signs in your app

The user signs in to your app before they can change their primary email address. To learn more about integrating user sign in, see [Sign in with email only](/docs/guides/pwd-optional-sign-in-email/nodeexpress/main/).

<!-- Temporarily set to nodejs. The above react sign in guide will be completed in https://oktainc.atlassian.net/browse/OKTA-502075 -->

When the user signs in, instantiate an`OktaAuth` object which is used later to change the user's email.

```javascript
const oktaAuth = (() => {
  return new OktaAuth(oidcConfig);
})();
```

### 2. The user starts the change primary email flow

Next, the user starts the change primary email flow. Provide a way in your app for the user to start editing their email. In the following example, an **Edit** link is added next to their current primary email address.

<div class="half border">

![Screenshot showing an edit link next to the primary email address.](/img/pwd-optional/pwd-optional-change-email-my-account-js-react-edit-email.png)

</div>

### 3. The user submits a new primary email

The user enters and submits their new primary email address. Create a page or dialog that allows the user to change and submit their new email address.

<div class="half border">

![Screenshot showing a page with a new primary email input field and continue button.](/img/pwd-optional/pwd-optional-change-email-my-account-js-react-submit-email.png)

</div>

1. When the user submits their new email address, create an object of type [`AddEmailPayload`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#addemailpayload) and set

* `profile.email` to the new primary email.
* `role` to `PRIMARY` which identifies the email as the primary email address.
* `sendEmail` to `true` which sends the email challenge to the newly added email. The default is `true`.

```json
{
   "profile":{
      "email":"john.doe.new@example.com"
   },
   "sendEmail":true,
   "role":"PRIMARY"
}
```

2. Call [`addEmail`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#addemail) and pass in the new `AddEmailPayload` object.

```javascript
import {
  addEmail
} from '@okta/okta-auth-js/myaccount';

const handleAddEmail = async (role, email) => {
  return addEmail(oktaAuth, {
    payload: {
      profile: {
        email
      },
      sendEmail: true,
      role
    }
  });
};
```

### 4. Your app handles email verification response

`addEmail` returns a promise that contains an [`EmailTransaction`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/classes/EmailTransaction.md) object. The object has a `status` of `UNVERIFIED` which indicates that the user needs to verify their identity with the new email.

```json
{
   "id":"2e355d8376d4a12bb45ed54ebf8dd4d5",
   "status":"UNVERIFIED",
   "profile":{
      "email":"robnicolo+oie-2022-11a@gmail.com"
   },
   "roles":[
      "PRIMARY"
   ],
}
```

### 5. The user verifies their identity with the new email

The user opens the email sent by Identity Engine and copies the One-Time Passcode (OTP) to your app. Create a page or dialog to allow the user to enter the OTP.

<div class="half border">

![Screenshot showing a page with a new primary email input field and continue button.](/img/pwd-optional/pwd-optional-change-email-my-account-js-react-verify-email.png)

</div>

1. When the user submits the OTP, create an object of type [`VerificationPayload`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#VerificationPayload) and set `verificationCode` to the OTP entered by the user.

```json
{
   "verificationCode":"197277"
}
```

2. Call [`verify`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/classes/EmailTransaction.md#verify) from the `EmailTransaction` returned from the previous step and pass in the new `VerificationPayload` object.

```javascript
...

if (transaction.status === 'UNVERIFIED') {
  if (transaction.verify) {
    await transaction.verify({ verificationCode: value });

...
```

### 6. Your app handles a successful identity verification

`EmailTransaction.verify()` returns no data and completes without exception when the OTP is valid and the email change completes successfully. Wrap the method call in a `try...catch` statement to catch invalid OTPs and other API exceptions raised from `EmailTransaction.verify()`.

```javascript
try {

  await transaction.verify({ verificationCode: value });

} catch (err) {
  if (err.errorSummary === 'insufficient_authentication_context') {
    onFinish();
    startReAuthentication(err);
  } else {
    setError(err);
  }
}
```

> **Note:** In other use cases where additional sign-in authenticators are required, the user needs to choose and verify all required authenticators before `IdxTransaction.status` of `SUCCESS` is returned.
