<!-- NOT SUPPORTED YET FOR BACKEND DESIGNS
### 1. Initiate the user sign-in flow

First, the user initiates the sign-in with username and password flow by making a call to `OktaAuth.idx.authenticate()`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({ username,password});
```

### 2. Show option to enroll email

If email enrollment is enabled for your org's application, and the user hasn't yet enrolled in email, `OktaAuth.idx.authenticate()` returns `IdxTransaction` with a status of `PENDING` and `nextStep.name` equal to `select-authenticator-enroll`. The `nextStep.options` array includes an item with a `value` property of `okta_email`.

```json
{
  status: "PENDING",
  nextStep: {
    name: "select-authenticator-enroll",
    options: [
      {
        label: "Email",
        value: "okta_email",
      },
    ],
  },
}
```

Use this response to a display a page of available authenticators, including email.

<div class="common-image-format">

![Screenshot of authenticator list](/img/authenticators/authenticators-email-enroll-auth-list.png)

</div>

### 3. Submit the email authenticator

When the user selects the email authenticator from the list, call `OktaAuth.idx.proceed()` and pass in `okta_email`.

```javascript
    const authClient = getAuthClient(req);
    const transaction = await authClient.idx.proceed({ authenticator });
```

### 4. Send email to user's email address

Calling `OktaAuth.idx.proceed()` in the previous step initiates the sending of an email to the user's email address. The email is based off of the **Email Factor Verification** template that contains a placeholder for the OTP.

### 5. Display OTP input page

The `OktaAuth.idx.proceed()` returns a `IdxTransaction` response with a `status` of `PENDING`, `nextStep.name` equal to `enroll-authenticator`, and `availableSteps[n].authenticator.key` set to `okta_email`.

```json
{
  status: "PENDING",
  nextStep: {
    name: "enroll-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
        type: "string",
        required: true,
      },
    ],
    type: "email",
  },
  availableSteps: [
    {
      name: "enroll-authenticator",
      type: "email",
      authenticator: {
        key: "okta_email",
      },
    },
  ],
}
```

Using this response displays a page to input the OTP. Although this use case covers the magic link scenario, displaying an OTP page allows for an OTP verification fallback in cases where OTP maybe be required or simply more convienent. For example, a user that checks their email from a different device than from where they are signing in to your app is required to use OTP. Different browser and device scenarios are covered in [Integrate different browser and device scenario][#integrate-different-browser-and-device-scenario].

<div class="common-image-format">

![Screenshot of enroll OTP](/img/authenticators/authenticators-email-enroll-enter-code.png)

</div>

### 6. Click on email magic link

Next, the user opens their email and clicks the magic link. The following screenshots shows the magic link in the email.

<div class="common-image-format">

![Magic link in email](/img/authenticators/authenticators-email-enroll-magic-link-in-email.png)

</div>

The link points to your Okta org as in: `https://yourorg.okta.com/email/verify/0oai9ifvveyL3QZ8K696?token=ftr2eAgsg...`

### 7. Send request to Okta

When the user clicks the magic link, the request is first routed to your Okta org that then forwards the request to your application including the `otp` and `state` parameters. The org uses the callback URI that you defined in [Update configurations](#update-configurations) to build the URL path and adds the `otp` and `state` query parameters. An example callback URL: `http://localhost:8080/login/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`

### 8: Handle redirect in your app

Create a route to handle When the magic link redirect request.

```javascript
router.get('/login/callback', async (req, res, next) => {
  const { protocol, originalUrl } = req;
  const parsedUrl = new URL(protocol + '://' + req.get('host') + originalUrl);
});

```

### 9. Validate request is from a verification email

Call `OktaAuth.idx.isEmailVerifyCallback()` and pass in the query parameter section of the URL. This method validates that the OTP and state query parameters are present. `?otp=482039&state=8bae50c6e5a973e954b4ac7cd4d1a744` is an example of the method's input parmaeter.

```javascript
    if (authClient.idx.isEmailVerifyCallback(search)) {
      //continue
    }
```

### 10. Verify the email and location of magic link click

Next call `OktaAuth.idx.handleEmailVerifyCallback()` and pass in the query paramter that contains the OTP and state (for example, `?state=8bae50c6e5a973e954b4ac7cd4d1a744&otp=482039`). This method performs the following checks:

* Ensures that the user clicked the magic link in the same browser (but different tab) as your application.
* Validates that the OTP and state parameters originate from a nonexpired verification email.

```javascript
  try {
      const transaction = await authClient.idx.handleEmailVerifyCallback(search);
      handleTransaction({ req, res, next, authClient, transaction });
  } catch (err) {
    next(err);
  }

```

### 11: Complete a successful sign-in flow

If your configuration is set up with only the email authenticator, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. Your app redirects the user to the default home page for the signed-in user.

```json
{
  status: "SUCCESS",
  tokens: {
    accessToken: {
      accessToken: "eyJraWQiOiJTajV3...",
      },
      expiresAt: 1646673230,
    },
    idToken: {
      idToken: "eyJraWQiOiJTajV3cUUwO...",
      expiresAt: 1646673230,
    },
  }
}

```
-->
