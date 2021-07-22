## Integration steps

### Step 1: Build a sign-in page on the client

Build a sign-in page that captures the user's name and password, as shown in the following example.

<div class="common-image-format">

![Sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign-in page")

</div>

### Step 2: Authenticate user credentials

When the user initiates the sign-in process, your app needs to create a new `OktaAuth` object and set its `username` and `password` properties to the values entered by the user. Send this object to the `idx.authenticate` method to start the authentication process. See [idx.Authenticate](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) for more information. This call begins the multi-factor authentication flow and returns a status of `Idx.Status:PENDING`.

### Step 3: Handle the response from the sign-in

If the username and password are valid, `idx.authenticate` should return an `Idx.Status` of `PENDING`. This status indicates that an additional factor needs to be verified before the sign in. In addition to the status, the `nextSteps` property should return the **phone** factor (`type`).

The user should be redirected to an authenticator list page that displays the phone factor as an authenticator to be verified.

### Step 4: Show the phone factor in the authenticator list

The next step is to show the phone factor in an authenticator list page. If not already done, this page needs to be built out and display the list of authenticators from the previous step. In this use case, only the **phone** factor will be displayed, as shown in the following sample screenshot.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-phone-screen-verify-phone.png
 "Verify phone")

</div>

### Step 5: Call idx.authenticate(phone)

When the user selects the **phone** factor, call `idx.authenticate` and pass in the authentication type '`('phone')`. This call sends a verification code to the user's phone through SMS.

If the call is successful, the method should return an `Idx.Status` of `PENDING`, which indicates that the SDK needs a phone number in order to send the verification code. The next step is to redirect the user to a page to enter in the phone number.

### Step 6: Build the phone number entry page

Build the phone number entry page that accepts the phone number that the user will enroll and verify.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-num.png
 "Verify phone")

</div>

> **Note:** The SDK requires that the phone number follows the `+#######` format, which starts with a plus (+) sign. See [Data Requirements - Phone number](/docs/guides/oie-embedded-sdk-common/nodejs/main/#phone-number).

### Step 7: Call idx.authenticate(phone number)

When the user enters a phone number and clicks the send code through the SMS button, a call to `idx.authenticate` is made that passes in the following values:

* Authenticator ID (type)
* Phone number

> **Note:** Only SMS is currently supported for the phone authenticator type.

The values are passed in through the `inputs` parameter. See [nextStep](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#nextstep) for more details.

### Step 8: Handle the response to EnrollAuthenticatorAsync

If the call to `idx.authenticate` is successful, it should return another status of `Idx.Status:PENDING`. When the status is returned, a code is sent to the phone number through SMS.


### Step 9: Build or reuse the phone verification code page

Build a page that accepts the code sent to your phone number through SMS. Depending on your implementation, this page can be the same page that verifies the email code or a different page.

<div class="common-image-format">

![Verify phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-phone-code.png
 "Verify phone")

</div>

### Step 10: Call idx.authenticate(verificationCode) to verify the phone code

The next step is to call `idx.authenticate(verificationCode)`. In the phone verification use case, the code passed into the method will be the code that was sent by SMS to the phone number.

### Step 11: Handle the response from VerifyAuthenticatorAsync (factor verifications completed)

The next step is to handle the response from `idx.authenticate(verificationCode)`. If the email code was valid, the method should return an `Idx.Status` of `SUCCESS`. This status signifies that there are no more factors waiting to be enrolled and verified. If the steps described in [Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases) were properly followed, the user has successfully signed in and should be sent to the default sign-in home page.

### Step 12: Get user profile information (optional)

Optionally, you can obtain basic user information after a successful sign
in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/nodejs/main/#get-user-profile-information-after-sign-in) for more details.
