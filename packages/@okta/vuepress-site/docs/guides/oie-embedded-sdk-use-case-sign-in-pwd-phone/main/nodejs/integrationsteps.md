### 1: Build a sign-in page on the client and authenticate the user credentials

Build a sign-in page that captures the username and password, as shown in the following example.

<div class="half border">

![Displays the sign-in page where the user enters their username and password for authentication.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in-nodejs.png)

</div>

When the user initiates the sign-in process, your app needs to create a new `OktaAuth` object and set its `username` and `password` properties to the values entered by the user. Send this object to `idx.authenticate` to start the authentication process. See [idx.Authenticate](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) for more information. This call begins the multifactor authentication flow.

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

In this use case, only the **Phone** factor appears in the list of authenticators, as shown in the following example page:

<div class="half border">

![Displays a Select Authenticator page that includes a phone option and a Select button.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-phone-screen-verify-nodejs.png)

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

<div class="half border">

![Displays a Verify using phone authenticator page that includes an SMS option and a Next button.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-phone-screen-verify-phone-method-nodejs.png)

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

<div class="half border">

![Displays a Challenge Authenticator page that includes a field for the code and a Verifiy button.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-in-pwd-phone-verify-phone-code-nodejs.png)

</div>

The next step is to call `idx.authenticate` passing in the verification code `{ verification: '123'}`.

Then, handle the response from `idx.authenticate`. If the phone code was valid, the method returns a status of `Idx.Status:SUCCESS` with tokens. This status signifies that there are no more factors that are waiting to be enrolled and verified. If the steps described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-multifactor-use-case) were properly followed, the user is successfully signed in and is sent to the default sign-in home page.

### 5 (Optional): Get the user profile information

Optionally, you can obtain basic user information after a successful sign in by making a request to Okta's Open ID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/#get-the-user-profile-information) for more details.
