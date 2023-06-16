### 1 - 4. Start enrollment flow and display list of authenticators

The Enrollment flow follows the same first four steps as the [Challenge flow](#integrate-email-challenge-with-magic-links): 

* [Build a sign-in page on the client](#_1-build-a-sign-in-page-on-the-client)
* [Authenticate the user credentials](#_2-authenticate-the-user-credentials)
* [Handle the response from the sign-in flow](#_3-handle-the-response-from-the-sign-in-flow)
* [Display a list of possible authenticator factors](#_4-display-a-list-of-available-authenticators)

### 5. Check authenticator status and send email to the user

When the user selects the Email Authenticator and clicks **Submit**, the form posts back to the `SelectAuthenticatorAsync` method. This checks whether the user is in Challenge or enrollment flow. When in enrollment flow, a call is made to `idxClient.SelectEnrollAuthenticatorAsync`, using its `enrollAuthenticatorOptions` parameter to pass in the Email Authenticator ID.

```csharp
var enrollAuthenticatorOptions = new SelectEnrollAuthenticatorOptions
{
  AuthenticatorId = model.AuthenticatorId,
};

var enrollResponse = await _idxClient.SelectEnrollAuthenticatorAsync(
    enrollAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

If the call is successful, Okta sends an enrollment email to the user that contains the OTP. The server returns a status of `AwaitingAuthenticatorVerification` to indicate it is waiting for the user to check their email and either click the magic link in it or enter the OTP.

```csharp
switch (enrollResponse?.AuthenticationStatus)
{
  case AuthenticationStatus.AwaitingAuthenticatorVerification:
    {
      // Actions for other authenticator types elided

      return RedirectToAction("VerifyAuthenticator", "Manage");
    }

  // other statuses elided

  default:
    return View("SelectAuthenticator", model);
}
```

### 6. Display OTP input page

Build a form that allows the user to enter the One-Time Passcode (OTP) sent to them by email. This is exactly the same as Step 8 in the challenge flow instructions.

### 7. Open email and copy OTP

Next, the user opens the email and copies the OTP. The following screenshot shows the OTP in an email generated from the **Email Factor Verification** template.

<div class="three-quarter">

![Screenshot of OTP in enrollment page](/img/authenticators/authenticators-email-enroll-otp.png)

</div>

### 8. Process the OTP

Create a `VerifyAuthenticatorOptions` object and set its `Code` property to the OTP entered by the user. Pass this object as a parameter to the `IdxClient.VerifyAuthenticatorAsync` method.

```csharp
var verifyAuthenticatorOptions = new VerifyAuthenticatorOptions
{
   Code = code,
};

try
{
  var authnResponse = await _idxClient.VerifyAuthenticatorAsync(
    verifyAuthenticatorOptions, (IIdxContext)Session["idxContext"]);
```

Query the `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `VerifyAuthenticatorAsync` to discover the current status of the authentication process. You should expect one of the following:

* `Success` : All authenticators are enrolled and the user has signed in successfully.
* `AwaitingPasswordReset` : The user needs to change their password.
* `AwaitingAuthenticatorEnrollment` : The user has successfully enrolled the Email Authenticator and must now enroll other authenticators.

```csharp
switch (authnResponse.AuthenticationStatus)
{
  case AuthenticationStatus.AwaitingPasswordReset:
    return RedirectToAction("ChangePassword", "Manage");

  case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
    Session["authenticators"] = ViewModelHelper.
      ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
    TempData["canSkip"] = authnResponse.CanSkip;
    Session["isChallengeFlow"] = false;
    return RedirectToAction("SelectAuthenticator", "Manage");

  case AuthenticationStatus.Success:
    ClaimsIdentity identity = await AuthenticationHelper.
      GetIdentityFromTokenResponseAsync(_idxClient.Configuration, authnResponse.TokenInfo);
    _authenticationManager.SignIn(new AuthenticationProperties(), identity);
    return RedirectToAction("Index", "Home");
}

return View(view, model);
```

If the returned status is `Success`, call `AuthenticationHelper.GetIdentityFromTokenResponseAsync` to retrieve the OIDC claims information about the user and pass them into your application. The user has now signed in.
