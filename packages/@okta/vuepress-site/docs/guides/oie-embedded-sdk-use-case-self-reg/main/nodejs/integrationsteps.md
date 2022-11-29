> **Note:** These steps describe integrating the Okta email OTP flow into your app. To learn more about Okta email including how to integrate Okta email using magic links, see the [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/).

### 1: Create a sign-up link for new users

The self-registration flow begins when the user clicks the **Sign Up** link (or **Register** from the SDK sample application home page). On the sign-in page, create a **Sign Up** link that links to the create account page that you create in the next step, similar to the following wireframe.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a sign-in button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-password-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36729&t=wzNwSZkdctajVush-1 sign-in-form-username-password-sign-up-forgot-your-password-links
 -->

</div>

### 2: Enter information in the create account page

The next step is to enter basic information (for example, email, first name, and last name). Create a page that accepts this information.

<div class="half wireframe-border">

![A sign-up form with fields for first name, last name, and email address, and a create account button](/img/wireframes/ sign-up-form-first-last-name-email.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36911&t=2h5Mmz3COBLhqVzv-1  sign-up-form-first-last-name-email
 -->

</div>

When the user clicks **Register**, pass the user profile data that is captured from the Create account page into the `idx.register` method, as shown in `register.js` of the SDK sample application:

```JavaScript
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
If the org's application is properly configured with multiple factors, `idx.register` returns a response with `Idx.Status:PENDING` and a `nextStep` field requiring an authenticator key that needs to be verified. If you completed the steps properly in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-multifactor-use-case), the authenticator is **password** (`Authenticator: AuthenticatorKey.OKTA_PASSWORD`). The next steps, as shown in the SDK sample application, are handled by `handleTransaction.js` for the subsequent flows.

```JavaScript
// registration
    case 'enroll-profile':
      redirect({ req, res, path: '/register' });
      return true;
// authenticator enrollment
    case 'select-authenticator-enroll':
      redirect({ req, res, path: '/select-authenticator' });
      return true;
    case 'enroll-authenticator':
      redirect({ req, res, path: `/enroll-authenticator/${type}` });
      return true;
    case 'authenticator-enrollment-data':
      redirect({ req, res, path: `/enroll-authenticator/${type}/enrollment-data` });
      return true;
```

### 3: The user enters the password authenticator and the password

Create a page that displays an authenticator enrollment selection, in this case for password only.

<div class="half wireframe-border">

![A choose your authenticator form with only a password authenticator option and a next button](/img/wireframes/choose-authenticator-form-password-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36946&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-password-only
 -->

</div>

After the user enters the password authenticator value, and `idx.register` is called with this value, the response returns a status of `Idx.Status:PENDING` and a `nextStep` field that requires the user to enter a password value. The user is directed to a page to set up a password value, similar to the following wireframe (see the SDK sample application route to `/enroll-authenticator`).

<div class="half wireframe-border">

![A set password form with two fields to enter and to confirm a password and a submit button](/img/wireframes/set-password-form-new-password-fields.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36973&t=2h5Mmz3COBLhqVzv-1 set-password-form-new-password-fields
 -->

</div>

### 4: The user submits their password

After the user submits a password, call `idx.register` and pass in this value for the user. The response returns a status of `Idx.Status:PENDING` and a `nextStep` field that requires inputs for additional authenticators. The user is directed to a page to select authenticators, as shown in the following wireframe (also see the SDK sample application route to `/select-authenticator`).

See [`idx.register`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxregister) for more details on the self-registration flow.

<div class="half wireframe-border">

![A choose your authenticator form with email and phone authenticator options and a next button](/img/wireframes/choose-authenticator-form-email-phone.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37020&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-email-phone
 -->

</div>

### 5: The user selects the email authenticator

In this use case, the user selects the **Email** as the authenticator to verify. Pass this user-selected authenticator key (`Authenticator: AuthenticatorKey.OKTA_EMAIL)`) to `idx.register`.

 If the call is successful, the method returns a status of `Idx.Status:PENDING` and a `nextStep` field that requires verification, which indicates that the SDK is ready for the email verification code. The next step is to redirect the user to the email verification code page, similar to the following wireframe (see also the SDK sample application route to `/enroll-authenticator`).

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

### 6: The user submits the email verification code

The next step is to call `idx.register`, again passing in the verification code. In the email verification use case, the code passed into the method is the code found in the verification email.

Based on the configuration described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-multifactor-use-case), the app in this use case is set up to require one possession factor (either email or phone). After the email authenticator is verified, the phone authenticator becomes optional. In this step, the `nextStep` field can include `canSkip` for the phone authenticator. You can build a **Skip** button in your form to allow the user to skip the optional phone authenticator.

<div class="half wireframe-border">

![A choose your authenticator form with only a phone authenticator option, and next and skip buttons](/img/wireframes/choose-authenticator-form-phone-only-with-skip-option.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37043&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-phone-only-with-skip-option
 -->

</div>

If the user decides to skip the optional factor, they are considered signed in since they have already verified the required factors. See [Option 1: Skip phone factor](#option-1-the-user-skips-the-phone-authenticator) for the skip authenticator flow. If the user decides to select the optional factor, see [Option 2: User selects phone authenticator](#option-2-the-user-selects-the-phone-authenticator) for the optional phone authenticator flow.

### 7: Handle the phone options

In this use case, the end user can choose to skip the phone authenticator or add the phone authenticator.

#### Option 1: The user skips the phone authenticator

If the user decides to skip the phone authenticator enrollment, make a call to `idx.register` passing in the value `{skip: true}`. This method skips the authenticator enrollment, as shown in `Authenticator.js` from the SDK sample application.

```JavaScript
router.post('/select-authenticator/skip', async (req, res, next) => {
  const { idxMethod } = req.getFlowStates();
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx[idxMethod]({ skip: true });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

If the request to skip the optional authenticator is successful, the SDK returns `Idx.SUCCESS` and tokens. The user is successfully signed in.

#### Option 2: The user selects the phone authenticator

After the user selects the phone authenticator value, and `idx.register` is called with this authenticator key (`Authenticator: AuthenticatorKey.PHONE_NUMBER`), the response returns a status of `Idx.Status:PENDING` and a `nextStep` field that requires phone registration data, which includes the phone number and verification method (SMS or voice). The user is directed to a page to enroll the phone data.

<div class="half wireframe-border">

![A form with a field for a phone number, formatting advice and a next button](/img/wireframes/enter-phone-number-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37078&t=2h5Mmz3COBLhqVzv-1 enter-phone-number-form
 -->

</div>

#### The user selects SMS as the verify method and enters their phone number

The user can select SMS or voice verification to receive the phone verification code. Capture this information and send it to`idx.register`. In this use case, use SMS. The user then enters the phone number where the SMS code is sent.

> **Note:** The SDK requires that the phone number be in the following format: `+##########`, including the beginning plus (+) sign, for example, `+5551234567`.

The SDK sends the phone authenticator data to Okta, processes the request, and sends an SMS code to the specified phone number. After the SMS code is sent, Okta sends a response to the SDK, which returns `Idx.Status:PENDING` and the `nextStep` field requiring verification. This status indicates that the user needs to provide the verification code for the phone authenticator:

<div class="half wireframe-border">

![A form with a field for a verification code, a note to find the code in a SMS and a submit button](/img/wireframes/enter-verification-code-form-with-sms-message.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37154&t=vr9MuCR8C4rCt3hC-1 enter-verification-code-form-with-sms-message
 -->

</div>

#### The user submits the SMS verification code

The user receives the verification code as an SMS message on their phone and submits it in the verify code form. Send this code to `idx.register`.

If the request to verify the code is successful, the SDK returns a status of `Idx.Status:SUCCESS` and saves tokens to storage, as shown on `handleTransaction.js` of the SDK sample application.

```JavaScript
case IdxStatus.SUCCESS:
      // Save tokens to storage (req.session)
      authClient.tokenManager.setTokens(tokens);
      // Redirect back to home page
      res.redirect('/');
      return;
```

The user is signed in and sent to the default sign-in page.
