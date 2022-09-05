### 1: Add the forgot password link to the sign-in page

The first step is to create a forgot password link on the sign-in page that redirects the user to a reset password page.

<div class="half wireframe-border">

![Sign-in form with a 'Forgot your password?' link](/img/oie-embedded-sdk/wireframes/pwd-optional-sign-up-link-sign-in-page-g2r2.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 2

-->

### 2: Create the reset password page

Create a page that accepts the user's email address and contains a button to start the reset password flow.

<div class="half wireframe-border">

![Reset password form with an email field](/img/oie-embedded-sdk/wireframes/reset-password-form-enter-email-g2r3.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 3

-->

### 3: Make a call to the RecoverPasswordAsync method

After the user starts the reset password flow, your app needs to call the
`RecoverPasswordAsync()` method and pass in the email address captured from the reset password form.
The method returns a response with an `AwaitingAuthenticatorSelection` status. This status indicates that there is an email factor in the `Authenticators` property that needs to be verified before resetting the password.

```csharp
var recoverPasswordOptions = new RecoverPasswordOptions
{
   Username = model.UserName,
};
var authnResponse = await idxAuthClient.RecoverPasswordAsync(recoverPasswordOptions);

if (authnResponse.AuthenticationStatus == AuthenticationStatus.AwaitingAuthenticatorSelection)
{
   Session["idxContext"] = authnResponse.IdxContext;
   Session["UserName"] = model.UserName;
   TempData["authenticators"] = authnResponse.Authenticators;
   return RedirectToAction("SelectRecoveryAuthenticator", "Account");
}
```

After the `AwaitingAuthenticatorSelection` response status is returned, redirect the user to an authenticators page that displays the authenticator required to initiate authentication verification. In this case, the email factor is the configured authenticator that appears.

### 4: Create the reset password authenticators page

Create a page to show the authenticators that are returned from the `RecoverPasswordAsync()` method. Provide the user with an option to select the authenticator for the verification process. For this use case, only the email authenticator is returned.

<div class="half wireframe-border">

![Recovery factor list to use (only email for this use case)](/img/oie-embedded-sdk/wireframes/choose-authenticator-email-form-g2r4.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 4

-->

### 5: Make a call to the SelectRecoveryAuthenticatorAsync method

After the user selects the email authenticator, the next step is to call the `SelectRecoveryAuthenticatorAsync()` method with the email `Authenticator Id`.
If this method returns an `AwaitingAuthenticatorVerification` status, then Okta has sent the verification code to the user's email address and is now waiting for code verification.

```csharp
var applyAuthenticatorResponse = await _idxClient.SelectRecoveryAuthenticatorAsync(
           new SelectAuthenticatorOptions { AuthenticatorId = model.AuthenticatorId },
           (IIdxContext)Session["IdxContext"]);

Session["IdxContext"] = applyAuthenticatorResponse.IdxContext;
 Session["isPasswordSelected"] = false;

if (applyAuthenticatorResponse.AuthenticationStatus == AuthenticationStatus.AwaitingAuthenticatorVerification)
{
   return RedirectToAction("VerifyAuthenticator", "Manage");
}
```

### 6: Create the code verification page

Redirect the user to a code verification page when your app receives the `AwaitingAuthenticatorVerification` status after it calls the `SelectRecoveryAuthenticatorAsync()` method.

<div class="half wireframe-border">

![Email verification code input form](/img/oie-embedded-sdk/wireframes/enter-verification-code-form-g2r5.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 5

-->

Create a code verification page with a code input field and a button or link to submit the code to Okta for verification.

### 7: Make a call to the VerifyAuthenticatorAsync method

After the user submits their email verification code, call the `VerifyAuthenticatorAsync()` method with the submitted code to verify the email authenticator.

```csharp
var authnResponse = await _idxClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions,
        (IIdxContext)Session["idxContext"]);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse.AuthenticationStatus)
{
   case AuthenticationStatus.AwaitingPasswordReset:
        return RedirectToAction("ChangePassword", "Manage");

...
```

If the `VerifyAuthenticatorAsync()` call is successful, then the `AwaitingPasswordReset` status is returned. This status indicates that the user can now change their password. At this point, redirect the user to the change password page.

### 8: Create the change password page

Create a change password page that allows the user to enter their new password and initiate the password change.

<div class="half wireframe-border">

![Password reset new password form](/img/oie-embedded-sdk/wireframes/reset-password-form-choose-new-password-g2r6.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 6

-->

### 9: Make a call to the ChangePasswordAsync method

The final step is to make a call to the `ChangePasswordAsync()` method to change the user's password. Encapsulate the new password into `changePasswordOptions` and pass it as an argument to the `ChangePasswordAsync()` method.

```csharp
var authnResponse = await idxAuthClient.ChangePasswordAsync(changePasswordOptions,
       (IIdxContext)Session["idxContext"]).ConfigureAwait(false);
Session["idxContext"] = authnResponse.IdxContext;

switch (authnResponse.AuthenticationStatus)
  {
       case AuthenticationStatus.Success:
            ClaimsIdentity identity = await
            AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration,
            authnResponse.TokenInfo);
            _authenticationManager.SignIn(new AuthenticationProperties(), identity);
            return RedirectToAction("Index", "Home");
...
```

If the call to `ChangePasswordAsync()` returns an `AuthenticationStatus.Success` status, then the change password flow completed successfully and the user can be redirected to the default page.
