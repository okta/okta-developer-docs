## Integration steps

### Step 1: User clicks forgot password link

The password recovery flow begins when the user clicks the **Forgot your password?** link on your app's sign-in page. Create a **Forgot your password?** link that directs the user to a reset password form, such as the following example:

<div class="common-image-format">

![Displays the Sign-in form for Java SDK with a 'Forgot your password?' link](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-forgot-java.png)

</div>

You need to create a form to capture the user's email for password recovery, such as the following reset password example:

<div class="common-image-format">

![Displays the reset password form for Java SDK with an email field](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-reset-java.png)

</div>

Begin the authentication process by calling Java SDK's [`IDXAuthenticationWrapper.begin()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L603) method and getting a new [`ProceedContext`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/ProceedContext.java) object.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();
```

### Step 2: User enters email

After the user submits their email, call the [`IDXAuthenticationWrapper.recoverPassword()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java#L177) method, passing in the user's email.

```java
 AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.recoverPassword(username, proceedContext);
```

---

## Integration steps


Upon the return of the `AwaitingAuthenticatorSelection` response status, redirect the user to an authenticators page that displays the authenticator that the user needs to use to initiate authentication verification. In this case, the email factor is configured.

### Step 4: Create reset password authenticators page

The next step is to create a page that shows the authenticator that is returned from
the `RecoverPasswordAsync` method. For this use case, it shows the email authenticator.
The page should include the name of the authenticator and the ability to select the
authenticator to initiate the authentication verification process.

<div class="common-image-format">

![Select password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-pwd-recovery-screenshot-choose-auth.png
 "Select password")

</div>

### Step 5: Make call to SelectRecoveryAuthenticatorAsync

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

### Step 6: Create code verification page

After the call to `SelectRecoveryAuthenticatorAsync` has responded with
`AwaitingAuthenticatorVerification`, the user should be redirected to a
code verification page.

<div class="common-image-format">

![Select password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-all-verify-email-code.png
 "Select password")

</div>

The page should display a field to enter a code and a button/link to send
the code to Okta for the email verification.

### Step 7: Make call to VerifyAuthenticatorAsync

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

### Step 8: Create change password page

Create a change password page that allows the user to enter the
new password and initiate the change password.

<div class="common-image-format">

![Select password](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-link.png
 "Select password")

</div>

### Step 9: Make call to ChangePasswordAsync

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
