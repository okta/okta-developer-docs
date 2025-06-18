### 1: Build a sign-in page on the client and authenticate the user credentials

Build a sign-in page that captures the username and password, similar to the following wireframe.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-password-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36729&t=wzNwSZkdctajVush-1 sign-in-form-username-password-sign-up-forgot-your-password-links
 -->

</div>

When the user initiates the sign-in process, your app needs to create a new `OktaAuth` object and set its `username` and `password` properties to the values entered by the user. Send this object to `idx.authenticate` to start the authentication process. See [idx.Authenticate](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate). This call begins the multifactor authentication flow.

If the username and password are valid, `idx.authenticate` returns a status of `Idx.Status:PENDING`. This status indicates that an additional factor needs to be verified before the user is successfully signed in. The response also includes a `nextStep` field that identifies the input parameters of the next step, which in this case is for a phone authenticator key:

```JavaScript
status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ name: 'authenticator', ... }]
    options // [{ name: 'phone', ... }, ...]
}
```

After this response, you need to redirect the user to an authenticator list page that displays the phone factor as an authenticator to be verified.

### 2: The user selects the phone factor from the authenticator list

In this use case, only the **Phone** factor appears in the list of authenticators, similar to the following wireframe:

<div class="half wireframe-border">

![A choose your authenticator form with only a phone authenticator option and a next button](/img/wireframes/choose-authenticator-form-phone-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36858&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-phone-only
 -->

</div>

>**Note:** For the SDK sample application, each user must set up a phone number for phone verification to see this authenticator option in the page.

When the user selects the **phone** factor, call `idx.authenticate` and pass in the authentication phone key, `{ authenticator: AuthenticatorKey.PHONE_NUMBER }`. If the call is successful, the method returns a status of `Idx.Status:PENDING`, which indicates that the SDK needs a phone verification method to send the verification code. The `nextStep` field includes the input for this method.

```JavaScript
status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ phoneFactor: 'SMS', ... }]
}
```

The next step is to redirect the user to a page to enter in the phone verification field.

### 3: Build the phone verification method entry page

Build the phone verification method entry page that accepts either SMS or voice verification that is used for authentication.

<div class="half wireframe-border">

![A choose your phone verification method form with SMS and Voice options and a next button](/img/wireframes/choose-phone-verification-method-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37129&t=vr9MuCR8C4rCt3hC-1 choose-phone-verification-method-form
 -->

</div>

When the user enters a phone verification method (either SMS or voice verification) and clicks **Next**, a call to `idx.authenticate` is made that passes in the following values:

* Authenticator key: `{ authenticator: AuthenticatorKey.PHONE_NUMBER}`
* Verification method: `{ name: 'SMS' }`

If the call to `idx.authenticate` is successful, the SDK returns another status of `Idx.Status:PENDING`. When this status is returned, it indicates that Okta has sent a code to the phone number through SMS. The `nextStep` field requires the code as a verification input:

```JavaScript
status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ name: 'verification', ... }]
}
```

### 4: Build or reuse the phone verification code page

Build a page that accepts the code sent to the user's phone number through SMS. Depending on your implementation, this page can be the same page that verifies the email code or a different page.

<div class="half wireframe-border">

![A form with a field for a verification code, a note to find the code in a SMS and a submit button](/img/wireframes/enter-verification-code-form-with-sms-message.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37154&t=vr9MuCR8C4rCt3hC-1 enter-verification-code-form-with-sms-message
 -->

</div>

The next step is to call `idx.authenticate` passing in the verification code `{ verification: '123'}`.

Then, handle the response from `idx.authenticate`. If the phone code was valid, the method returns a status of `Idx.Status:SUCCESS` with tokens. This status signifies that there are no more factors that are waiting to be enrolled and verified. If the steps described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-multifactor-use-case) were properly followed, the user is successfully signed in and is sent to the default sign-in home page.

### 5 (Optional): Get the user profile information

Optionally, you can obtain basic user information after a successful sign in by making a request to the Okta OpenID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/#get-the-user-profile-information) for more details.
