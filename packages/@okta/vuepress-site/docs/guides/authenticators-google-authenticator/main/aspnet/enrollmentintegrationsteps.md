### 1: Build a sign-in page on the client

Build a sign-in page that captures the user's name and password, as shown in the following example.

<div class="half border">

![Basic sign-in dialog](/img/authenticators/dotnet-authenticators-sign-in-form.png)

</div>

### 2: Authenticate the user credentials

After a user initiates the sign-in flow by entering their username and password and then clicking **Sign In**, create an `AuthenticationOptions` object in your `LogIn` method. Then, set the object's `Username` and `Password` properties to the values set by the user. Pass this object as a parameter to the `AuthenticateAsync` method on the `IdxClient`.

```csharp
var authnOptions = new AuthenticationOptions
{
   Username = model.UserName,
   Password = model.Password,
};

try
{
   var authnResponse = await _idxClient.AuthenticateAsync(authnOptions).ConfigureAwait(false);
```

### 3: Handle the response from the sign-in flow

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

If you configured your Okta org correctly, you need to respond to two specific authenticator statuses to handle this scenario in addition to `Success` and `PasswordExpired`:

* `AwaitingAuthenticatorEnrollment` that is covered in this section
* `AwaitingChallengeAuthenticatorSelection` that is covered in [the challenge flow section](#integrate-sdk-for-authenticator-challenge).

The names of the authenticators available for enrollment or challenge can be found in the `AuthenticationResponse` object's `Authenticators` collection. Redirect the user to a list of authenticators to select the Google Authenticator for enrollment.

> **Note:** The `isChallengeFlow` session variable is set to `false` if the user needs to enroll Google Authenticator first, and `true` if they have already done so.

```csharp
      case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
         Session["isChallengeFlow"] = false;
         Session["authenticators"] = 
            ViewModelHelper.ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
         return RedirectToAction("SelectAuthenticator", "Manage");
      case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
         Session["authenticators"] = 
            ViewModelHelper.ConvertToAuthenticatorViewModelList(authnResponse.Authenticators);
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

### 4: Display a list of possible authenticator factors

Build a page to display the list of authenticators (including Google Authenticator). For example, in the sample application, a new `SelectAuthenticatorViewModel` is populated from the `Authenticators` collection returned by the `AuthenticationResponse` in the previous step.

```csharp
public ActionResult SelectAuthenticator()
{
   var authenticators =
      (IList<AuthenticatorViewModel>)Session["authenticators"] ??
      new List<AuthenticatorViewModel>();

   var viewModel = new SelectAuthenticatorViewModel
   {
      Authenticators = authenticators,
      AuthenticatorId = authenticators.
         FirstOrDefault()?.AuthenticatorId,
      PasswordId = authenticators.
         FirstOrDefault(x => x.Name.ToLower() == "password")?.AuthenticatorId,
      PhoneId = authenticators.
         FirstOrDefault(x => x.Name.ToLower() == "phone")?.AuthenticatorId,
      WebAuthnId = authenticators.
         FirstOrDefault(x => x.Name.ToLower() == "security key or biometric")?.AuthenticatorId,
      TotpId = authenticators.
         FirstOrDefault(x => x.Name.ToLower() == "google authenticator")?.AuthenticatorId,
      OktaVerifyId = authenticators.
         FirstOrDefault(x => x.Name.ToLower() == "okta verify")?.AuthenticatorId,
      CanSkip = TempData["canSkip"] != null && (bool)TempData["canSkip"]
   };

   return View(viewModel);
}
```

The `viewModel` parameter is then consumed in a Razor page.

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
                  @Html.RadioButtonFor(m => m.AuthenticatorId,
                     authenticator.AuthenticatorId)
                  @authenticator.Name
               </label>
            </div>
         }
      </ul>
      @Html.ValidationMessageFor(m => m.AuthenticatorId, 
         "", new { @class = "text-danger" })
      <div>
         <div>
            <input type="submit" value="Submit" />
         </div>
      </div>
   }
</section>
```

In this use case, only Google Authenticator appears, as shown in the following screenshot.

<div class="half border">

![An authenticator list showing Google Authenticator available for use](/img/authenticators/dotnet-authenticators-google-authenticator-list.png)

</div>

### 5: Retrieve shared secret and QR Code

When the user selects the Google Authenticator factor and clicks **Submit**, the form posts back to the `SelectAuthenticatorAsync` method. This checks whether the user is in challenge flow or enrollment flow.

When in Enrollment flow, a call is made to `idxClient.SelectEnrollAuthenticatorAsync`, using its `enrollAuthenticatorOptions` parameter to pass in the Google Authenticator factor ID.

```csharp
var enrollAuthenticatorOptions = new SelectEnrollAuthenticatorOptions
{
   AuthenticatorId = model.AuthenticatorId,
};

var enrollResponse = await _idxClient.SelectEnrollAuthenticatorAsync(
    enrollAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

If the call is successful, the returned `enrollResponse` object has an `AuthenticationStatus` of `AwaitingAuthenticatorVerification` and its `CurrentAuthenticator` property contains the QR code and shared secret string that the user can use to setup their copy of the Google Authenticator app. This needs to be passed to a page to display that information.

```csharp
Session["IdxContext"] = enrollResponse.IdxContext;
Session["isPasswordSelected"] = model.IsPasswordSelected;

switch (enrollResponse?.AuthenticationStatus)
{
   case AuthenticationStatus.AwaitingAuthenticatorVerification:
      {
         if (model.IsPasswordSelected)
         {
            return RedirectToAction("ChangePassword", "Manage");
         }
         else if (model.IsTotpSelected)
         {
            Session["currentWebAuthnAuthenticator"] = 
               enrollResponse.CurrentAuthenticator;
            return RedirectToAction(
               "EnrollGoogleAuthenticator", "Manage");
         }

         return RedirectToAction("VerifyAuthenticator", "Manage");
      }

  // other case statements

   default:
      return View("SelectAuthenticator", model);
}

```

### 6: Display shared secret and QR code

Build a page to display the shared secret and QR code. For example, in the sample application, a new `EnrollGoogleAuthenticatorViewModel` is populated from the `CurrentAuthenticator` object returned by the `enrollResponse` object in the previous step.

```csharp
public ActionResult EnrollGoogleAuthenticator()
{
   var currentAuthenticator = (IAuthenticator)Session["currentWebAuthnAuthenticator"];
   var model = new EnrollGoogleAuthenticatorViewModel
   {
      QrCodeHref = currentAuthenticator.ContextualData.QrCode.Href,
      SharedSecret = currentAuthenticator.ContextualData.SharedSecret,
   };

   return View(model);
}
```

This ViewModel is then consumed in a Razor page

```razor
<div>
   @using (Html.BeginForm("EnrollGoogleAuthenticatorAsync", "Manage",
      FormMethod.Post, new { role = "form" }))
   {
      @Html.AntiForgeryToken()
      <h4>Set up Google Authenticator</h4>

      <hr />
      <div>
         <img id="qrCodeImg" src = @Model.QrCodeHref />
      </div >
      <div>
         <div>
            @Html.LabelFor(m => m.SharedSecret)
         </div>
         <div>
            @Html.EditorFor(m => m.SharedSecret)
         </div>
      </div>
      <div>
         <input type="submit" value="Next" />
      </div>
   }
</div>
```

The user sees the following

<div class="half border">

![A page showing a QR code and a shared secret to enroll a mobile device running Google Authenticator](/img/authenticators/dotnet-authenticators-google-enroll-page.png)

</div>

### 7: Copy shared secret to Google Authenticator

After the shared secret appears, the user installs the Google Authenticator app on their mobile device if it's not already installed. Next, they add the secret code to the Google Authenticator app by either taking a photo of the QR code or manually entering the secret string. Once added, Google Authenticator displays the time-based one-time passcode (TOTP) for the newly added account.

<div class="half">

![A time-based one-time passcode being shown in Google Authenticator](/img/authenticators/authenticators-google-one-time-password.png)

</div>

### 8: Display challenge page

Build a form that allows the user to enter the TOTP they have received from their Authenticator app. This should appear once the user clicks on the **Next** button underneath the QR code and sample secret.

```razor
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
         <input type="submit" value="Submit"  id="submitBtn" />
      </div>
   </div>
}
```

The user sees the following:

<div class="half border">

![A form for the user to enter their one-time passcode](/img/authenticators/dotnet-authenticators-google-challenge-flow-page.png)

</div>

### 9: Process the one-time passcode

Once a user has entered the TOTP and clicked **Submit**, create a `VerifyAuthenticatorOptions` object and set its `Code` property to the password entered by the user. Pass this object as a parameter to the `IdxClient.VerifyAuthenticatorAsync` method.

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

Query the `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `VerifyAuthenticatorAsync` to discover the current status of the authentication process. You need to respond to two specific authenticator statuses:

* `AwaitingPasswordReset`
* `Success`

On success, call `AuthenticationHelper.GetIdentityFromTokenResponseAsync` to retrieve the OIDC claims information about the user and pass them into your application. The user has now logged in.

```csharp
   Session["idxContext"] = authnResponse.IdxContext;

   switch (authnResponse.AuthenticationStatus)
   {
      case AuthenticationStatus.AwaitingPasswordReset:
         return RedirectToAction("ChangePassword", "Manage");

      case AuthenticationStatus.Success:
         ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(
             _idxClient.Configuration, authnResponse.TokenInfo);
         _authenticationManager.SignIn(new AuthenticationProperties(), identity);
         return RedirectToAction("Index", "Home");
   }

   return View(view, model);
}
catch (OktaException exception)
{
   ModelState.AddModelError(string.Empty, exception.Message);
   return View(view, model);
}
```
