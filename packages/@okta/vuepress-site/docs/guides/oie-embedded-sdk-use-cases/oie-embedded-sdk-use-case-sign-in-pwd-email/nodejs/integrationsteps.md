### Step 1: Build a sign-in page on the client and authenticate user credentials

Build a sign-in page that captures both the user’s name and password, as shown in the following example:

<div class="common-image-format">

![Sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-nodejs.png
 "Sign-in page")

</div>

When the user initiates the sign-in process, your app needs to create a new `OktaAuth` object and set its `username` and `password` properties to the values entered by the user. Send this object to the [`idx.authenticate`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) method to start the authentication process. This call begins the multi-factor authentication flow.

If the username and password are valid, `idx.authenticate` returns a status of `Idx.Status:PENDING`. This status indicates that an additional factor needs to be verified before the sign in. In addition to the status, the `nextStep` field that is included in the response identifies the input parameters of the next step, which is an authenticator of type email in this case:

```JavaScript
 status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ name: 'authenticator', ... }]
    options // [{ name: 'email', ... }, ...]
}
```

The user is redirected to an authenticator list page that displays the email factor as an authenticator to be verified.

### Step 2: Show email factor in authenticator list

The next step is to show the email factor to the user in an authenticator list page. If not already done, this page needs to be built and display the list of authenticators from the previous step. In this use case, only the **email** factor is displayed, as shown in the following sample.

<div class="common-image-format">

![Email verify](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-email-screen-verify-nodejs.png
 "Email verify")

</div>

When the user selects the **email** factor, call `idx.authenticate` and pass in the authentication email authentication type, `({ authenticator: 'email' })`. With this call, Okta sends a verification code to the user's email.

If the call is successful, the method returns a status of `Idx.Status:PENDING`, which indicates that the SDK is ready for the verification code. The `nextStep` field identifies the input parameter of the next step, which is a verification code in this case:

```JavaScript
status, // IdxStatus.PENDING
  nextStep: {
    inputs // [{ name: 'verificationCode', ... }]
}
```

The next step is to redirect the user to the email verification code page.

### Step 3: Show email verification code page

If not already done, build the email verification code page that accepts the code from the email.

<div class="common-image-format">

![Email verify](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code.png
 "Email verify")

</div>

The next step is to call `idx.authenticate` and pass in the email verification code `({ verificationCode: '1213' })` and handle the response from the call. If the email code is valid, the method returns a status of `Idx.Status:SUCCESS` and tokens. This status signifies that there are no more factors that are waiting to be enrolled and verified. If the steps in [Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases) were properly followed, the user has successfully signed in and should be sent to the default sign-in home page.

#### Get user profile information (optional)

Optionally, you can obtain basic user information after a successful sign-in by making a request to Okta's Open ID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/nodejs/main/#get-user-profile-information-after-sign-in).
