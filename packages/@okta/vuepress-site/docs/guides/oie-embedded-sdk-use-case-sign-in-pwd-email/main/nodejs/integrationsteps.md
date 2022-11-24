> **Note:** These steps describe integrating the Okta email OTP flow into your app. To learn more about Okta email including how to integrate Okta email using magic links, see the [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/).

### 1: Build a sign-in page on the client and authenticate the user credentials

Build a sign-in page that captures both the user’s name and password, as shown in the following example:

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a sign in button](/img/wireframes/sign-in-form-username-and-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-and-password
 -->

</div>

When the user initiates the sign-in process, your app needs to create a new `OktaAuth` object and set its `username` and `password` properties to the values entered by the user. Send this object to the [`idx.authenticate`](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) method to start the authentication process. This call begins the multi-factor authentication flow.

If the username and password are valid, `idx.authenticate` returns a status of `Idx.Status:PENDING`. This status indicates that an additional factor needs to be verified before the user signs in. In addition to the status, the `nextStep` field that is included in the response identifies the input parameters of the next step, which in this case is for the email authenticator key:

```JavaScript
 status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ name: 'authenticator', ... }]
    options // [{ name: 'email', ... }, ...]
}
```

The user is redirected to an authenticator list page that displays the email factor as an authenticator to be verified.

### 2: Show the email factor in the authenticator list

The next step is to show the email factor to the user in an authenticator list page. If not already done, build a page to display the list of authenticators from the previous step. In this use case, only the email factor appears, as shown in the following sample.

<div class="half wireframe-border">

![A choose your authenticator form with only an email authenticator option and a next button](/img/wireframes/choose-authenticator-email-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36772&t=wzNwSZkdctajVush-1 choose-authenticator-email-only
 -->

</div>

When the user selects the **email** factor, call `idx.authenticate` and pass in the authentication email authentication key, `({ authenticator: AuthenticatorKey.OKTA_EMAIL })`. With this call, Okta sends a verification code to the user's email.

If the call is successful, the method returns a status of `Idx.Status:PENDING`, which indicates that the SDK is ready for the verification code. The `nextStep` field identifies the input parameter of the next step, which is a verification code in this case:

```JavaScript
status, // IdxStatus.PENDING
  nextStep: {
    inputs // [{ name: 'verificationCode', ... }]
}
```

The next step is to redirect the user to the email verification code page.

### 3: Show the email verification code page

If not already done, build the email verification code page that accepts the code from the email.

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

The next step is to call `idx.authenticate` and pass in the email verification code (for example,`({ verificationCode: '1213' })`) and handle the response from the call. If the email code is valid, the method returns a status of `Idx.Status:SUCCESS` and tokens. This status signifies that there are no more factors waiting to be enrolled and verified. If the steps in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-multifactor-use-case) were properly followed, the user has successfully signed in and should be sent to the default sign-in home page.

### 4 (Optional): Get the user profile information

Optionally, you can obtain basic user information after a successful sign-in by making a request to Okta's Open ID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/#get-the-user-profile-information).
