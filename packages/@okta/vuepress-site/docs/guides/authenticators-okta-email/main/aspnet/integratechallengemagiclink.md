### 1. Build a sign-in page on the client

Build a sign-in page that captures the user's name and password, as shown in the following example.

<div class="half border">

![A simple sign-in form with username and password fields](/img/authenticators/dotnet-authenticators-sign-in-form.png)

</div>

### 2. Authenticate the user credentials

After a user has initiated the sign-in process by entering the username and password and clicking **Sign In**, create an `AuthenticationOptions` object in your `SignIn` method and set its `Username` and `Password` properties to the values set by the user. Pass this object as a parameter to the `AuthenticateAsync` method on the `IdxClient` that you have instantiated.

```csharp
var _idxClient = new Okta.Idx.Sdk.IdxClient();
var authnOptions = new Okta.Idx.Sdk.AuthenticationOptions
{
  Username = model.UserName,
  Password = model.Password,
};

try
{
  var authnResponse = await _idxClient.AuthenticateAsync(authnOptions).ConfigureAwait(false);
```

### 3. Handle the response from the sign-in flow

Query the `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `AuthenticateAsync` to discover the current status of the authentication process.

```csharp
    Session["idxContext"] = authnResponse.IdxContext;
    switch (authnResponse?.AuthenticationStatus)
    {
        case AuthenticationStatus.Success:
                … your code …
        case AuthenticationStatus.PasswordExpired:
                … your code …
```

If you configured your Okta org correctly, you need to respond to two specific authenticator statuses to handle this scenario:

* `AwaitingChallengeAuthenticatorSelection` that is covered in this section
* `AwaitingAuthenticatorEnrollment` that is covered in a later section

You can find the names of the available authenticators for enrollment or challenge in the `AuthenticationResponse` object's `Authenticators` collection. You should redirect the user to an authenticator list page that displays all of the authenticators that the user has enrolled and are ready for use.

```csharp
        case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
            Session["isChallengeFlow"] = false;
            Session["authenticators"] = ViewModelHelper.ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
            return RedirectToAction("SelectAuthenticator", "Manage");
        case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
            Session["authenticators"] = ViewModelHelper.ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
            Session["isChallengeFlow"] = true;
            return RedirectToAction("SelectAuthenticator", "Manage");
        default:
            return View("Login", model);
    }
}
catch (OktaException exception)
{
    ModelState.AddModelError(string.Empty, $"Invalid login attempt: {exception.Message}");
    return View("Login", model);
}
```

### 4. Display a list of available authenticators

The next step is to show a list of all the authenticators that the user has previously enrolled. Build a page to display the list of authenticators from the previous step. For example, in the sample application, a new `SelectAuthenticatorViewModel` is populated from the `Authenticators` collection contained in the `AuthenticationResponse`.

```csharp
public ActionResult SelectAuthenticator()
{
  var authenticators = (IList<AuthenticatorViewModel>)Session["authenticators"] ?? new List<AuthenticatorViewModel>();

  var viewModel = new SelectAuthenticatorViewModel
  {
    Authenticators = authenticators,
    AuthenticatorId = authenticators.FirstOrDefault()?.AuthenticatorId,
    PasswordId = authenticators.FirstOrDefault(
        x => x.Name.ToLower() == "password")?.AuthenticatorId,
    PhoneId = authenticators.FirstOrDefault(
        x => x.Name.ToLower() == "phone")?.AuthenticatorId,
    WebAuthnId = authenticators.FirstOrDefault(
        x => x.Name.ToLower() == "security key or biometric")?.AuthenticatorId,
    TotpId = authenticators.FirstOrDefault(
        x => x.Name.ToLower() == "google authenticator")?.AuthenticatorId,
    OktaVerifyId = authenticators.FirstOrDefault(
        x => x.Name.ToLower() == "okta verify")?.AuthenticatorId,
    CanSkip = TempData["canSkip"] != null && (bool)TempData["canSkip"]
  };

  return View(viewModel);
}
```

This viewModel is then consumed in a Razor page.

```razor
<section id="selectAuthenticatorForm">
  @using (Html.BeginForm("SelectAuthenticatorAsync", "Manage",
    new { ReturnUrl = ViewBag.ReturnUrl }, FormMethod.Post,
    new { @class = "form-horizontal", role = "form" }))
  {
    @Html.AntiForgeryToken()
    <!-- Headings elided -->
    @Html.ValidationSummary(true, "", new { @class = "text-danger" })
    @Html.HiddenFor(m => m.PasswordId)
    @Html.HiddenFor(m => m.PhoneId)
    @Html.HiddenFor(m => m.WebAuthnId)
    @Html.HiddenFor(m => m.OktaVerifyId)
    @Html.HiddenFor(m => m.TotpId)
    <ul>
      @foreach (var authenticator in Model.Authenticators)
      {
        <div>
          <label>
            @Html.RadioButtonFor(m => m.AuthenticatorId, authenticator.AuthenticatorId)
            @authenticator.Name
          </label>
        </div>
      }
    </ul>
    @Html.ValidationMessageFor(m => m.AuthenticatorId, "", new { @class = "text-danger" })
    <div class="form-group">
      <div>
        <input type="submit" value="Submit" />
      </div>
    </div>
  }
</section>
```

For example, if the user has previously enrolled the email authenticator, Google Authenticator, and Okta Verify, they see the following:

<div class="half border">

![A list of enrolled authenticators for the user to choose from](/img/authenticators/dotnet-authenticators-email-challenge-auth-list.png)

</div>

### 5. Submit the email authenticator

When the user selects the Email Authenticator and clicks **Submit**, the form posts back to the `SelectAuthenticatorAsync` method, which checks whether the user is in Challenge or enrollment flow.

When in challenge flow, a call is made to `idxClient.SelectChallengeAuthenticatorAsync`, using its `selectAuthenticatorOptions` parameter to pass in the Email Authenticator ID.

```csharp
var selectAuthenticatorOptions = new SelectAuthenticatorOptions
{
    AuthenticatorId = model.AuthenticatorId,
};

selectAuthenticatorResponse = await _idxClient.SelectChallengeAuthenticatorAsync
  (selectAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

If the call is successful, Identity Engine sends an email to the user and the returned `selectAuthenticatorResponse` object has an `AuthenticationStatus` of `AwaitingAuthenticatorVerification`. This indicates that Identity Engine is waiting for the user to check their email and either click the magic link or enter the OTP.

```csharp
Session["IdxContext"] = selectAuthenticatorResponse.IdxContext;

switch (selectAuthenticatorResponse?.AuthenticationStatus)
{
   case AuthenticationStatus.AwaitingAuthenticatorVerification:
      var action = (model.IsWebAuthnSelected)
         ? "VerifyWebAuthnAuthenticator"
         : "VerifyAuthenticator";
      if (model.IsWebAuthnSelected)
      {
         Session["currentWebAuthnAuthenticator"] =
            selectAuthenticatorResponse.CurrentAuthenticatorEnrollment;
      }
      return RedirectToAction(action, "Manage");

  // other case statements

   default:
      return View("SelectAuthenticator", model);
}
```

### 6. Display OTP input page

Build a form that allows the user to enter the one-time passcode (OTP) sent to them by email. Although this use case covers the magic link scenario, displaying an OTP page allows for an OTP verification fallback in cases where the OTP may be required or simply more convenient. For example, a user checking their email from a different device must use an OTP. [Integrate different browser and device scenario](#integrate-different-browser-and-device-scenario-with-magic-links) covers the integration details for the different browser and device scenarios.

```razor
<section id="enterCodeForm">
@using (Html.BeginForm("VerifyAuthenticatorAsync", "Manage",
  new { ReturnUrl = ViewBag.ReturnUrl }, FormMethod.Post, new { role = "form" }))
{
    @Html.AntiForgeryToken()
    <h4>Verify authenticator.</h4>
    <h5>Enter the passcode to continue.</h5>
    <hr />
    @Html.ValidationSummary(true, "", new { @class = "text-danger" })
    <div>
        <div>
            <div>
                @Html.LabelFor(m => m.Code)
            </div>
            <div>
                @Html.TextBoxFor(m => m.Code, new { @id="passcodeInput" })
                @Html.ValidationMessageFor(m => m.Code, "", new { @class = "text-danger" })
            </div>
        </div>
    </div>

    <div>
        <div>
            <input type="submit" value="Submit" id="submitBtn" />
        </div>
    </div>
}
</section>
<section id="resendCodeForm">
@using (Html.BeginForm("ResendAuthenticatorAsync", "Manage",
  new { ReturnUrl = ViewBag.ReturnUrl }, FormMethod.Post,
  new { @class = "form-horizontal", role = "form" }))
  {
    @Html.AntiForgeryToken()
    <div>
      <div>
        <input type="submit" value="Resend Code" id="resendCodeBtn" />
      </div>
    </div>
  }
</section>
```

### 7. Click the email magic link

Next, the user opens their email and clicks the magic link. The following screenshot shows the magic link in the email.

<div class="three-quarter">

![Magic link in email](/img/authenticators/authenticators-email-challenge-magic-link-in-email.png)

</div>

The link points to your Okta org as in: `https://yourorg.okta.com/email/verify/0oai9ifvveyL3QZ8K696?token=ftr2eAgsg...`

When the user clicks the magic link, your org receives the request, gets the OTP and state parameters, and forwards the request with these parameters to your application. The org combines the callback URI that you defined in [Update configurations](#update-configurations) with the OTP and state parameters to produce a final callback URL for the user. For example, `https://localhost:44314/magiclink/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`

### 8. Handle the magic link redirect in your app

Create a callback handler method that checks if the user has opened the magic link in the same browser and on the same device that they used for the previous steps of the challenge flow. If this is true, take the `otp` parameter in the query string and pass it as a parameter to `IdxClient.VerifyAuthenticatorAsync()`.

> **Note**: The sample code below demonstrates a very simple check, assuming a different browser or device if the context can't be recovered from a session variable. Use a more robust check in your final application.

```csharp
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

  var authnResponse = await _idxClient.
    VerifyAuthenticatorAsync(verifyAuthenticatorOptions, idxContext);
```

If any of the following conditions are true, advise the user to return to the original tab in the browser and enter the `otp` value to proceed:

* If the user hasn't opened the magic link in the same browser.
* If the `otp` value isn't valid.
* If an `AuthenticationStatus` is returned that isn't handled by your case statement.

```csharp
return View(new MagicLinkCallbackModel {
   Message = $"Please enter the OTP '{otp}' in the original browser tab to finish the flow."
});
```

### 9. Complete challenge and sign user in

If the `otp` value is valid, the `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `VerifyAuthenticatorAsync` is `Success`. In this case, call `AuthenticationHelper.GetIdentityFromTokenResponseAsync` to retrieve the OIDC claims information about the user and pass them into your application. The user has now signed in.

```csharp
switch (authnResponse.AuthenticationStatus)
{
   // other case statements

   case AuthenticationStatus.Success:
   ClaimsIdentity identity = await AuthenticationHelper.
      GetIdentityFromTokenResponseAsync(_idxClient.Configuration, authnResponse.TokenInfo);
   _authenticationManager.SignIn(new AuthenticationProperties(), identity);
   return RedirectToAction("Index", "Home");
}
```
