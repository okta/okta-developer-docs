### 1: Initiate password recovery

To begin the password recovery flow, the user clicks the **Forgot Password** button on the login page. Then they select **Email** as the authenticator to be used for password recovery on the subsequent page and click **Submit**. Okta then sends an email to their email address matching the Forgot Password template that was altered earlier.

<div class="common-image-format">

![Screenshot of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png)

</div>

The Reset Password link in the email includes the `OTP` and `request.relayState` variables as query parameters back to the application. For example,

`https://localhost:44314/magiclink/callback?otp=${oneTimePassword}&state=${request.relayState}` becomes `https://localhost:44314/magiclink/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`.

### 2: Handle the otp and state parameters

Create a callback handler method that takes the `otp` and `state` parameters in the query string and passes them as parameters to the `VerifyAuthenticatorAsync` method on the `IdxClient`.

> **Note** : This implementation looks for the idx context in session, keyed either by state or by the string `idxContext`. Alternatively, you may choose to store the idx context in a database or a file.

```csharp
public async Task<ActionResult> Callback(string state, string otp, string error = null, string error_description = null)
{
    if (!string.IsNullOrEmpty(error) || !string.IsNullOrEmpty(error_description))
    {
        return View(new MagicLinkCallbackModel { Message = $"{error}: {error_description}" });
    }

    IIdxContext idxContext = Session[state] as IIdxContext;
    if (idxContext == null)
    {
        idxContext = Session["idxContext"] as IIdxContext;
    }

    if (idxContext != null)
    {
        var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
        {
            Code = otp,
        };

        var authnResponse = await _idxClient.VerifyAuthenticatorAsync(verifyAuthenticatorOptions, idxContext);
```

### 3: Handle the response from the recovery flow

If the `otp` and `state` values are valid, Okta verifies there is a password recovery in progress and returns a status of `AwaitingPasswordReset`. This indicates you can redirect the user to your password reset page.

```csharp
        switch (authnResponse.AuthenticationStatus)
        {
            case AuthenticationStatus.AwaitingPasswordReset:
                return RedirectToAction("ChangePassword", "Manage");

           // other case statements
        }
    }
```

If the `otp` and `state` values are not valid or an `AuthenticationStatus` is returned that is not handled by your case statement, you should advise the user to return to the original tab in the browser where they requested a password reset and enter the otp value there to proceed.

```csharp
    return View(new MagicLinkCallbackModel { Message = $"Please enter the OTP '{otp}' in the original browser tab to finish the flow." });
}
```

### 4: Display password reset page and continue the password recovery flow

Display the password reset page and continue the password recovery flow described in the [User password recovery guide](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/aspnet/main/).

<div class="common-image-format">

![Screenshot of password reset page](/img/advanced-use-cases/dotnet-custom-pwd-recovery-custom-sdk-reset-pwd-page.png)

</div>
