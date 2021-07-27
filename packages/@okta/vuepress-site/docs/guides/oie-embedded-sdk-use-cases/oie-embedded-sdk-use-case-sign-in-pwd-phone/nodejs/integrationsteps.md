## Integration steps

### Step 1: Build a sign-in page on the client and authenticate user credentials

Build a sign-in page that captures the username and password, as shown in the following example.

<div class="common-image-format">

![Sign-in page screenshot where user enters username and password for authentication.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png)

</div>

When the user initiates the sign-in process, your app needs to create a new `OktaAuth` object and set its `username` and `password` properties to the values entered by the user. Send this object to `idx.authenticate` to start the authentication process. See [idx.Authenticate](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) for more information. This call begins the multifactor authentication flow.

If the username and password are valid, `idx.authenticate` returns a status of `Idx.Status:PENDING`. This status indicates that an additional factor needs to be verified before the user is successfully signed in. The response also includes a `nextStep` field that identifies the input parameters of the next step, in this case an authenticator of type phone:

```JavaScript
status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ name: 'authenticator', ... }]
    options // [{ name: 'phone', ... }, ...]
}
```

After this response, you need to redirect the user to an authenticator list page that displays the phone factor as an authenticator to be verified.

### Step 2: Select the phone factor in the authenticator list

In this use case, only the **phone** factor will be displayed in the list of authenticators.

When the user selects the **phone** factor, call `idx.authenticate` and pass in the authentication phone type, `{ authenticator: 'phone' }`. If the call is successful, the method returns a status of `Idx.Status:PENDING`, indicating that the SDK needs a phone number in order to send the verification code. The `nextStep` field includes the input for the phone number.

```JavaScript
status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ phone: '+#######', ... }]
}
```

The next step is to redirect the user to a page to enter in the phone number.

### Step 3: Build the phone number entry page

Build the phone number entry page that accepts the phone number and phone verification method that the user will use for enrollment.

>**Note:** The SDK requires that the phone number follows the `+#######` format, which starts with a plus (+) sign. See [Data Requirements - Phone number](/docs/guides/oie-embedded-sdk-common/nodejs/main/#phone-number).

When the user enters a phone number and a phone verification method, either SMS or voice verification, and clicks **Submit**, a call to `idx.authenticate` is made that passes in the following values:

* Authenticator (type): `{ authenticator: 'phone' }`
* Phone number: `{ phone: '+#######' }`
* Verification method: `[ method: 'SMS' }]`

If the call to `idx.authenticate` is successful, the SDK returns another status of `Idx.Status:PENDING`. When this status is returned, it indicates that Okta has sent a code to the phone number through SMS. The `nextStep` field requires the code as a verification input:

```JavaScript
status, // IdxStatus.PENDING
  nextStep: {
    inputs, // [{ name: 'verification', ... }]
}
```

### Step 4: Build or reuse the phone verification code page

Build a page that accepts the code sent to the user's phone number through SMS. Depending on your implementation, this page can be the same page that verifies the email code or a different page.

The next step is to call `idx.authenticate` passing in the verification code `{ verification: 'xxx'}`.

Then, handle the response from `idx.authenticate`. If the phone code was valid, the method returns a status of `Idx.Status:SUCCESS` with tokens. This status signifies that there are no more factors waiting to be enrolled and verified. If the steps described in [Set up your Okta org (for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases) were properly followed, the user has successfully signed in and is sent to the default sign-in home page.

#### Get user profile information (optional)

Optionally, you can obtain basic user information after a successful sign in by making a request to Okta's Open ID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/nodejs/main/#get-user-profile-information-after-sign-in) for more details.
