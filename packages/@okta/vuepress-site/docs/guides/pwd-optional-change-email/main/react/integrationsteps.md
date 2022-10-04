### 1. The user signs in to your app

The user signs in to your app before they can change their primary email address. During the sign-in flow create an `OktaAuth` object, which is required to authenticate the user and later change their email.

```javascript
const oktaAuth = (() => {
  return new OktaAuth(oidcConfig);
})();
```

 To learn more about initializing this object and how to integrate the user sign in, see [Example Client](https://github.com/okta/okta-auth-js#example-client) in Okta Auth Javascript SDK's readme.

### 2. The user starts the change primary email flow

The user starts the change primary email flow by clicking an **Edit** link next to the primary email address field. Add an **Edit** link that gives the user an entry point to change their email.

<div class="half border">

![Screenshot showing an edit link next to the primary email address.](/img/pwd-optional/pwd-optional-react-change-primary-email-edit-email.png)

<!-- Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=2606%3A2463  pwd-optional-react-change-primary-email-edit-email -->

</div>

### 3. The user submits a new primary email

When the user clicks on the **Edit** link, display a dialog for the user to submit their new email address.

<div class="half border">

![Screenshot showing a page with a new primary email input field and continue button.](/img/pwd-optional/pwd-optional-react-change-primary-email-submit-email.png)

<!-- Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=2584%3A2577  pwd-optional-react-change-primary-email-submit-email -->

</div>

When the user clicks **Continue** and submits their new email address, create an object of type [`AddEmailPayload`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#addemailpayload) and set

* `profile.email` to the new primary email.
* `role` to `PRIMARY` which identifies the email as the primary email address.
* `sendEmail` to `true` which sends an email challenge to the newly added email. The default is `true`.

```javascript
const addEmailPayload = {
    "profile":{
       "email":"john.doe.new@example.com"
    },
    "sendEmail":true,
    "role":"PRIMARY"
 };
```

Call [`addEmail()`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#addemail) and pass in the new `AddEmailPayload` object.

```javascript
import {
  addEmail
} from '@okta/okta-auth-js/myaccount';

const handleAddEmail = async (role, email) => {
  return addEmail(oktaAuth, {
    addEmailPayload
  });
};
```

>**Note**: If you want to send the email challenge in a separate step, set`sendEmail`=`false` and call [`sendEmailChallenge()`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#sendemailchallenge) after [`addEmail()`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#addemail).

### 4. Identity Engine requests new email verification

[`addEmail()`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#addemail) returns an [`EmailTransaction`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/classes/EmailTransaction.md) object. The object has a `status` of `UNVERIFIED` that indicates that the user needs to verify their identity with the new email.

```json
{
   "id":"2e355d8376d4a12bb45ed54ebf8dd4d5",
   "status":"UNVERIFIED",
   "profile":{
      "email":"john.doe.new@example.com"
   },
   "roles":[
      "PRIMARY"
   ],
}
```

Build the logic that handles this response and sends the user to a dialog where they enter the OTP.

### 5. The user verifies their identity with the new email

The user opens the email sent by Identity Engine and copies the one-time passcode (OTP) to your app. Create a dialog to allow the user to enter and submit the OTP.

<div class="half border">

![Screenshot showing a page with an OTP input field and continue button.](/img/pwd-optional/pwd-optional-react-change-primary-email-verify-email.png)

<!-- Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=2584%3A2605  pwd-optional-react-change-primary-email-verify-email -->

</div>

When the user submits the OTP, create an object of type [`VerificationPayload`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/modules.md#VerificationPayload) and set `verificationCode` to the OTP entered by the user.

```json
const verificationPayload = {
    "verificationCode":"197277"
 };
```

Call [`verify()`](https://github.com/okta/okta-auth-js/blob/master/docs/myaccount/classes/EmailTransaction.md#verify) on the `EmailTransaction` returned from the previous step and pass in the new `VerificationPayload` object. Wrap the method call in a `try...catch` statement to catch invalid OTPs and other API exceptions raised from `EmailTransaction.verify()`.

```javascript
...
try {
  if (transaction.status === 'UNVERIFIED') {
    if (transaction.verify) {
      await transaction.verify(verificationPayload);
    }
  }
} catch (err) {
  if (err.errorSummary === 'insufficient_authentication_context') {
    onFinish();
    startReAuthentication(err);
  } else {
    setError(err);
  }
}
...
```

### 6. Your app handles a successful identity verification

When the OTP is valid and the email change completes successfully, `EmailTransaction.verify()` returns no data and completes without exception. Your app should close the change email dialog, refresh the main page, and display the new primary email and any other profile information.
