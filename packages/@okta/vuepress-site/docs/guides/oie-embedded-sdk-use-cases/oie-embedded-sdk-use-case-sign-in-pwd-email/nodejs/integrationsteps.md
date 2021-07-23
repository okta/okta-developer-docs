### Step 1: Build a sign-in page on the client

Build a sign-in page that captures both the user’s name and
password. An example is shown below:

<div class="common-image-format">

![Sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-on-screenshot-sign-in.png
 "Sign-in page")

</div>

### Step 2: Authenticate user credentials

When the user initiates the sign-in process, your app needs to create a new `OktaAuth` object and set its `username` and `password` properties to the values entered by the user. Send this object to the `idx.authenticate` method to start the authentication process. See [idx.Authenticate](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#idxauthenticate) for more information. This call begins the multi-factor authentication flow and returns a status of `Idx.Status:PENDING`.

### Step 3: Handle the response from the sign-in

If the username and password are valid, `idx.authenticate` should return an `Idx.Status` of `PENDING`. This status indicates that an additional factor needs to be verified before the sign in. In addition to the status, the `nextSteps` property should return the **email** factor (`type`).

The user should be redirected to an authenticator list page that displays the email factor as an authenticator to be verified.

### Step 4: Show email factor in authenticator list

The next step is to show the email factor to the user in an authenticator list page. If not already done, this page needs to be built and display the list of authenticators from the previous step. In this use case, only the **email** factor is displayed, as shown in the following sample.

<div class="common-image-format">

![Email verify](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-sign-in-pwd-email-screen-verify.png
 "Email verify")

</div>

### Step 5: Call idx.authenticate(email)

When the user selects the **email** factor, call `idx.authenticate` and pass in the authentication type '`('email')`. This call sends a verification code to the user's email.

If the call is successful, the method should return an `Idx.Status` of `PENDING`, which indicates that the SDK is ready for the verification code. The next step is to redirect the user to the email verification code page.

### Step 6: Show email verification code page

If not already done, build the email verification code page that accepts the code from the email.

<div class="common-image-format">

![Email verify](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-screen-verify-email-code.png
 "Email verify")

</div>

### Step 7: Call idx.authenticate(verificationCode)

The next step is to call `idx.authenticate(verificationCode)`. In the email verification use case, the code passed into the method will be the code found in the verification email.

### Step 8: Handle response from idx.authenticate

The next step is to handle the response from `idx.authenticate(verificationCode)`. If the email code was valid, the method should return an `Idx.Status` of `SUCCESS`. This status signifies that there are no more factors waiting to be enrolled and verified. If the steps described in [Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-multifactor-use-cases) were properly followed, the user has successfully signed in and should be sent to the default sign-in home page.

### Step 9: Get user profile information (optional)

Optionally, you can obtain basic user information after a successful sign-in by making a request to Okta's Open ID Connect authorization server. See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/nodejs/main/#get-user-profile-information-after-sign-in).
