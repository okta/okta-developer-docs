### 1: Add the forgot password link to the sign-in page

The first step is to create a forgot password link on the sign-in page that redirect the user to a reset password page.

<div class="common-image-format">

![Displays a sample forgot password page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-forgot.png)

</div>

### 2: Create the reset password page

Create a reset password page that initiates the reset password flow. The page should accept the user's email address and have a button that starts the reset flow.

<div class="common-image-format">

![Displays a sample reset password page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-reset.png)

</div>

### 3: Make a call to the RecoverPasswordAsync method

After the user starts the reset flow, your app needs to call the
`RecoverPasswordAsync()` method and pass in the email address captured from reset password form.
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

After the `AwaitingAuthenticatorSelection` response status is returned, redirect the user to an authenticators page that displays the authenticator required to initiate authentication verification. In this case, the email factor is the configured authenticator displayed.

### 4: Create the reset password authenticators page

The next step is to create a page that shows the authenticator that is returned from
the `RecoverPasswordAsync()` method. For this use case, it shows the email authenticator.
The page should include the name of the authenticator and the ability to select the
authenticator to initiate the authentication verification process.

<div class="common-image-format">

![Displays an example Select password page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-choose-auth.png)

</div>

### 5: Make a call to the SelectRecoveryAuthenticatorAsync method

After the user selects the email authenticator, the next step is to call
the `SelectRecoveryAuthenticatorAsync` method with the email `Authentication id`.
The method should return an `AwaitingAuthenticatorVerification` status. This status indicates that the Okta platform has emailed the verification code to the user's email address and it's now awaiting verification.

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

After the call to `SelectRecoveryAuthenticatorAsync` has responded with
`AwaitingAuthenticatorVerification`, the user should be redirected to a
code verification page.

<div class="common-image-format">

![Displays an example select password page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-all-verify-email-code.png)

</div>

The page should display a field to enter a code and a button/link to send
the code to Okta for the email verification.

### 7: Make a call to the VerifyAuthenticatorAsync method

After the user checks their email for the code and enters the code into the field,
they should click **Verify** to initiate the verification of the email.
Call `VerifyAuthenticatorAsync` with the email verification code to verify the email
address.

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

If the `VerifyAuthenticatorAsync` call is successful, it should return
`AwaitingPasswordReset`. This status indicates that the user can now change their
password. At this point, the user should be redirected to the change password page.

### 8: Create the change password page

Create a change password page that allows the user to enter the
new password and initiate the change password.

<div class="common-image-format">

![Displays an example change password page](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-link.png)

</div>

### 9: Make a call to the ChangePasswordAsync method

The final step is to make a call to `ChangePasswordAsync` to change the
user's password. Pass `ChangePasswordOptions` into the method call with
the `NewPassword` property set to the new password.

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

If the response's `AuthenticationStatus` returns `Success`, the change password flow has
completed successfully and you can redirect the user to the default page.
