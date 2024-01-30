### The user clicks the sign-up link

Add a **Sign up** link to your app's sign-in page. The user clicks the **Sign up** link and the browser takes them to the Create Account page.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-password-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36729&t=wzNwSZkdctajVush-1 sign-in-form-username-password-sign-up-forgot-your-password-links
 -->

</div>

> **Note**: The account's username is also its email address.

Create a page for the user to enter their basic profile information: their email, first name, and family name. For example:

<div class="half wireframe-border">

![A sign-up form with fields for first name, family name, and email address, and a create account button](/img/wireframes/sign-up-form-first-last-name-email.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36911&t=2h5Mmz3COBLhqVzv-1  sign-up-form-first-last-name-email
 -->

</div>

### The user submits their profile data

When the user clicks **Sign Up**, create an instance of the `OktaAuth` object and then call [`idx.register()`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxregister) on the object, passing in the values entered by the user. This starts the registration flow:

```js
// web-server/routes/register.js
router.post('/register', async (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.register({
    firstName,
    lastName,
    email,
  });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

`register()` returns an anonymous response object that contains two properties.

* `status` indicates the status of the registration flow.
* `nextStep` contains information about the next required step of the flow.

A `status` of `IdxStatus.PENDING` indicates that the user hasn’t completed the flow. Query `nextStep` to determine what to do next:

```js
// web-server/utils/getNextRouteFromTransaction.js
function getNextRouteFromTransaction ({ nextStep }) {
  let nextRoute;

  const { name, authenticator } = nextStep;
  const { key } = authenticator || {};

  switch (name) {
    // registration
    case 'enroll-profile':
      nextRoute = '/register';
      break;
    // authenticator enrollment
    case 'select-authenticator-enroll':
      nextRoute = '/select-authenticator';
      break;
    case 'enroll-authenticator':
      nextRoute = `/enroll-authenticator/${key}`;
      break;
    case 'authenticator-enrollment-data':
      nextRoute = `/enroll-authenticator/${key}/enrollment-data`;
      break;

   /// other cases elided

    default:
      break;
  }
  return nextRoute;
};
```

At this point, `nextStep` contains `select-authenticator-enroll` indicating that the user must select an authentication factor to enroll to verify their identity.

### The app displays a list of required authenticators to enroll

Create a page that displays a list of required authentication factors the user can enroll to verify their identity. They must choose a factor from the list and click **Next**.

<div class="half wireframe-border">

![A choose your authenticator form with only a password authenticator option and a next button](/img/wireframes/choose-authenticator-form-password-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36946&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-password-only
 -->

</div>

This page is used several times during the registration flow. Use the `nextStep` property's `inputs` collection to build the list. If you complete the steps properly in [Configuration updates](#configuration-updates), the only required authenticator is the password factor. This is the sole factor stored in the `inputs` property.

```js
nextStep: {
    inputs: [
      { name: 'authenticator',
         options: [{ label: Password, value: AuthenticatorKey.OKTA_PASSWORD }]
      }
   ],
}
```

### The user enrolls their password

When the user selects the password authenticator and clicks **Next**, pass the selected authenticator as a parameter to `idx.proceed()`.

```js
// web-server/routes/authenticator.js
router.post('/select-authenticator', async (req, res, next) => {
  try {
    const { authenticator } = req.body;
    const authClient = getAuthClient(req);
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });
  } catch (err) {
    next(err);
  }
});
```

`proceed()` returns a response object with a `status` of `IdxStatus.PENDING` and a `nextStep` field that indicates that the user needs to enroll the authenticator (`enroll-authenticator`). In this context, the user needs to supply a new password.

Create a page that allows the user to supply a new password for verification. For example:

<div class="half wireframe-border">

![A set password form with two fields to enter and to confirm a password and a submit button](/img/wireframes/set-password-form-new-password-fields.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36973&t=2h5Mmz3COBLhqVzv-1 set-password-form-new-password-fields
 -->

</div>

When the user submits their new password, pass it as a parameter to `idx.proceed()`.

```js
// web-server/routes/authenticator.js
router.post('/enroll-authenticator/okta_password', async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const authClient = getAuthClient(req);
  if (password !== confirmPassword) {
    // TODO: handle validation in middleware
    next(new Error('Password not match'));
    return;
  }

  const transaction = await authClient.idx.proceed({ password });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

### Display a list of optional authenticators to enroll

`proceed()` returns a response object with a `status` of `IdxStatus.PENDING` and a `nextStep` field that indicates that the user still has authentication factors to enroll (`enroll-authenticator`) before registration is complete.

In this scenario, you configure the app's authentication policy to require a password and another factor. Therefore, the user must enroll at least one of either the email or phone factors. Redirect them to the list page you created earlier to choose which one.

<div class="half wireframe-border">

![A choose your authenticator form with email and phone authenticator options and a next button](/img/wireframes/choose-authenticator-form-email-phone.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37020&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-email-phone
 -->

</div>

### The user submits the email authenticator

If the user chooses and submits the email authenticator, pass the selected authenticator key as a parameter to `idx.proceed()`.

```js
const transaction = await authClient.idx.proceed({ authenticator });
```

### The app displays the OTP input page

If the call is successful, a one-time passcode (OTP) is sent to the user's email. The returned response object has a `status` of `IdxStatus.PENDING` and a `nextStep` field that indicates that Identity Engine is waiting for the user to check their email and enter the OTP.

Build a form that allows the user to enter the OTP sent to them by email.

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

### The user submits the OTP

The user opens the email and copies the OTP into the form. When the user submits their OTP, pass it as a parameter to `idx.proceed()`:

```js
// web-server/routes/authenticator.js
router.post('/enroll-authenticator/okta_email', async (req, res, next) => {
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

### The app displays a second list of optional authenticators to enroll

`proceed()` returns a response object with a `status` of `IdxStatus.PENDING` and a `nextStep` field that indicates that the user still has authentication factors to enroll (`enroll-authenticator`) before registration is complete.

Redirect the user to the list page you created earlier to choose another authentication factor. The code is the same. The page should show only the phone factor. However, since this factor is optional and the user has now enrolled two factors, `nextStep` includes the `canSkip` property set to `true` meaning that the list page should now also display a **Skip** button.

<div class="half wireframe-border">

![A choose your authenticator form with only a phone authenticator option, and next and skip buttons](/img/wireframes/choose-authenticator-form-phone-only-with-skip.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37043&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-phone-only-with-skip
 -->

</div>

The user can either enroll in or skip the phone factor. Your code should handle both scenarios as follows.

### The user enrolls the phone authenticator

#### The user submits the phone authenticator

If the user chooses and submits the email authenticator, pass the selected authenticator key as a parameter to `idx.proceed()`.

```js
const transaction = await authClient.idx.proceed({ authenticator });
```

#### The app displays a phone number input page

`proceed()` returns a response object with a `status` of `IdxStatus.PENDING` and a `nextStep` field that indicates that the user needs to supply phone registration data (`authenticator-enrollment-data`). This data includes the phone number and verification method (SMS or voice).

Build a form that allows the user to enter their phone number and a second form to select a phone verification method.

<div class="half wireframe-border">

![A form with a field for a phone number, formatting advice, and a next button](/img/wireframes/enter-phone-number-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37078&t=2h5Mmz3COBLhqVzv-1 enter-phone-number-form
 -->

</div>

> **Note:** The SDK requires the following phone number format: `+##########`. For example, `+5551234567`.

<div class="half wireframe-border">

![A choose your phone verification method form with SMS and voice options and a next button](/img/wireframes/choose-phone-verification-method-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37129&t=vr9MuCR8C4rCt3hC-1 choose-phone-verification-method-form
 -->

</div>

#### The user submits their phone information

When the user submits their phone number and verification method (in this case, use SMS), pass this information as parameters to `idx.proceed()`.

```js
router.post('/enroll-authenticator/phone_number/enrollment-data', async (req, res, next) => {
  const { phoneNumber, methodType } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({
    methodType,
    phoneNumber,
  });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

#### The app displays the SMS OTP input page

If the call is successful, your SMS provider sends a one-time passcode (OTP) in an SMS to the user's mobile phone. The returned response object has a `status` of `IdxStatus.PENDING`. This status indicates that Identity Engine is waiting for the user to check their email and enter the OTP.

Build a form that allows the user to enter the OTP sent to them by SMS. Depending on your implementation, the page can be the same page that verifies the email code.

<div class="half wireframe-border">

![A form with a field for a verification code, a note to find the code in an SMS, and a submit button](/img/wireframes/enter-verification-code-form-with-sms-message.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37154&t=vr9MuCR8C4rCt3hC-1 enter-verification-code-form-with-sms-message
 -->

</div>

#### The user submits the SMS OTP

The user checks their phone and copies the OTP into the form. When the user submits the OTP, pass this information as parameters to `idx.proceed()`.

```js
router.post('/enroll-authenticator/phone_number', async (req, res, next) => {
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ 
    verificationCode,
  });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

#### Complete registration

If the request to verify the code is successful, `proceed()` returns a response object with a `status` of `IdxStatus.SUCCESS`. This status signifies that no more factors (required or optional) are waiting to be enrolled and verified.

The user is now registered with no more factors to be verified. Call `authClient.tokenManager.setTokens()` to store the returned tokens in a session and redirect the user to the app's default signed-in page.

```js
// web-server/utils/handleTransaction.js
case IdxStatus.SUCCESS:
      // Save tokens to storage (req.session)
      authClient.tokenManager.setTokens(tokens);
      // Redirect back to home page
      res.redirect('/');
      return;
```

### The user skips the phone authenticator

If the user skips phone enrollment, call `idx.proceed()` passing in the value `{skip: true}`.

```js
router.post('/select-authenticator/skip', async (req, res, next) => {
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ skip: true });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

If the returned response object has a `status` of `IdxStatus.SUCCESS`, the user is now registered with no more factors to be verified. Call `authClient.tokenManager.setTokens()` to store the returned tokens in a session and redirect the user to the app's default signed-in page.
