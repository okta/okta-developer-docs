### Step 1: Create a sign-up link for new users

The self-registration flow begins when the user clicks a **Sign up** link. On the sign-in page, create a **Sign up** link that links to the create account page you create in the next step,  as shown in the following example.


<div class="common-image-format">

![Displays a sign-up link screenshot that directs to a sign-up page. ](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-sign-up.png)

</div>

> **Note:** The **Sign up** link appears under the **Continue** button.

### Step 2: Enter information in the create account page

The next step is to enter basic information (for example, email, first, and last name). Create a page that accepts this information. The following shows an example of a create account page.

When the user clicks **Register**, pass the user profile data captured from the Create account page into the `idx.register` method, as shown in the `register.js` page of the SDK sample application:

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

If the org's application is properly configured with multiple factors, `idx.register` returns a response with `Idx.Status:PENDING` and a `nextStep` field requiring an authenticator that needs to be verified. If you completed the steps properly in [Set up your Okta org (for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multi-factor-use-cases), the authenticator is the **password** factor. The next steps, as shown in the SDK sample application, are handled by the `handleTransaction.js` page for the subsequent flows.

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

### Step 3: User enters password authenticator and password

After the user enters the password authenticator value, and `idx.register` is called with this value, the response returns a status of `Idx.Status:PENDING` and a `nextStep` field requiring a password value. The user is directed to a page to enroll a password value, as shown in the SDK sample application route to `/enroll-or-reset-password-authenticator`.

### Step 4: User submits password

After the user submits a password, call `idx.register` passing in this value for the user. The response returns a status of `Idx.Status:PENDING` and a `nextStep` field requiring inputs for additional authenticators. The user is directed to a page to select authenticators, as shown in the SDK sample application route to `/select-authenticator`.

See [idx.register](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxregister) for more details on the self-registration flow.

### Step 5: User selects email authenticator

In this use case, the user selects the **Email** factor as the authenticator to verify. Pass this user-selected authenticator to `idx.authenticate`.

 If the call is successful, the method returns a status of `Idx.Status:PENDING` and a `nextStep` field requiring verification, which indicates that the SDK is ready for the email verification code. The next step is to redirect the user to the email verification code page, as shown in the SDK sample application route to `/authenticator`.

### Step 6: User submits email verification code

The next step is to call `idx.authenticate` again passing in the verification code. In the email verification use case, the code passed into the method is the code found in the verification email.

Based on the configuration described in [Set up your Okta org for multifactor use cases](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-multifactor-use-cases), the app in this use case is set up to require one possession factor (either email or phone). After the email factor is verified, the phone factor becomes optional. In this step, the `nextStep` field can include `canSkip` for the phone authenticator. You can build a **Skip** button in your form to allow the user to skip the optional phone factor.

If the user decides to skip the optional factor, they are considered signed in since they have already verified the required factors. See [Step 8, Option 1: Skip phone factor](#step-8-option-1-skip-phone-factor) for the skip authenticator flow. If the user decides to select the optional factor, see [Step 8, Option 2: User selects phone authenticator](#step-8-option-2-user-selects-phone-authenticator) for the optional phone authenticator flow.

### Step 7, Option 1: Skip phone factor

If the user decides to skip the phone factor enrollment, make a call to `idx.register` passing in the value `skip=true`. This method skips the authenticator enrollment, as shown on the `Authenticator.js` page from the SDK sample application.

```JavaScript
router.post('/select-authenticator/skip', async (req, res, next) => {
  const { idxMethod } = req.getFlowStates();
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx[idxMethod]({ skip: true });
  handleTransaction({ req, res, next, authClient, transaction });
});
```

If the request to skip the optional authenticator is successful, the SDK returns `Idx.SUCCESS` and tokens. The user is successfully signed in.

### Step 7, Option 2: User selects phone authenticator

After the user selects the phone authenticator value, and `idx.register` is called with this value, the response returns a status of `Idx.Status:PENDING` and a `nextStep` field requiring phone registration data, including phone number and verification method: SMS or voice. The user is directed to a page to enroll phone data, as shown in the SDK sample application route to `/phone-enrollment-data`.

### Step 8, Option 2: User enters phone number and selects SMS verify method

When the user enters their phone number and selects SMS to receive the verification code, capture this information and send it to`idx.authenticate`.

The Auth JS SDK sends the phone authenticator data to Okta. Otka processes the request and sends an SMS code to the specified phone number. After the SMS code is sent, Okta sends a response to the SDK, which returns `Idx.Status:PENDING` and the `nextStep` field requiring verification. This status indicates that the user needs to provide the verification code for the phone authenticator, as shown in the SDK sample application route to `/authenticator`.

> **Note:** The Auth JS SDK requires the following phone number format: `{+}{country-code}{area-code}{number}`. For example, `+15556667777`.

### Step 9, Option 2: User submits SMS verification code

The user receives the verification code as an SMS on their phone and submits it in the verify code form. Send this code to `idx.authenticate`.

If the request to verify the code is successful, the SDK returns a status of `Idx.Status:SUCCESS` and saves tokens to storage, as shown on the `handleTransaction.js` page of the SDK sample application.

```JavaScript
case IdxStatus.SUCCESS:
      // Save tokens to storage (req.session)
      authClient.tokenManager.setTokens(tokens);
      // Redirect back to home page
      res.redirect('/');
      return;
```

The user is signed-in and sent to the default sign-in page.
