Since several steps in the enrollment and challenge flows are nearly identical, it's recommended to componentize the logic to reduce duplicate code and increase reusability. Specifically, the common areas include:

* [Initiating sign-in and returning a list of authenticators to the user](#initiate-sign-in-and-return-a-list-of-authenticators)
* [Polling Okta](#polling-okta)

A description and step-by-step integration for each of these common steps follow.

### Initiate sign-in flow and return a list of authenticators

All four flows start with the same steps that enable a user to sign in with a username and password, and then choose Okta Verify from a list of authenticators. The following diagram shows this common flow:

<div class="common-image-format">

![Sequence diagram showing the shared sign-in initiation flow for Okta Verify challenge and enrollment](/img/authenticators/dotnet-authenticators-okta-verify-shared-code-initiate-signin.png "All steps in the shared sign-in flow")

</div>

#### 1: Authenticate the user credentials

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

#### 2: Handle the response from the sign-in flow

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

* `AwaitingAuthenticatorEnrollment` indicates that the user is in enrollment flow
* `AwaitingChallengeAuthenticatorSelection` indicates that the user is in challenge flow

You can find the names of the authenticators available for enrollment or challenge in the `AuthenticationResponse` object's `Authenticators` collection. Redirect the user to a list of authenticators to select Okta Verify for enrollment.

> **Note**: The `isChallengeFlow` session variable is set to `false` if the user needs to enroll an authenticator first, and `true` if they have already done so.

```csharp
      case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
         Session["isChallengeFlow"] = false;
         Session["authenticators"] = 
          ViewModelHelper.ConvertToAuthenticatorViewModelList( authnResponse.Authenticators);
         return RedirectToAction("SelectAuthenticator", "Manage");
      case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
         Session["authenticators"] = 
            ViewModelHelper.ConvertToAuthenticatorViewModelList( authnResponse.Authenticators);
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

#### 3: Display a list of possible authenticator factors

Build a page to display the list of authenticators (including Okta Verify). For example, in the sample application, a new `SelectAuthenticatorViewModel` is populated from the `Authenticators` collection returned by the `AuthenticationResponse` in the previous step.

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

The available authenticators are listed along with Okta Verify, as shown in the following screenshot.

<div class="common-image-format bordered-image">

![An authenticator list showing Okta Verify available for use](/img/authenticators/dotnet-authenticators-okta-verify-enrollment-list-of-authenticators.png "A list of available authenticators for enrollment")

</div>

At this point, the next steps differ depending on whether you are working with an enrollment flow or a challenge flow. Go to the specific flows (enroll with [QR Code](#integrate-enrollment-using-qr-code) or enroll with [other channels](#integrate-enrollment-using-other-channels)) to understand how.

### Polling Okta

Polling is used during enrollment using a  [QR Code](#integrate-enrollment-using-qr-code), enrollment using [other channels](#integrate-enrollment-using-other-channels), and challenge using [push notification flows](#integrate-challenge-using-push-notification-option) to determine when the user completes the verification action in Okta Verify.

The user steps out of your app during these flows to complete actions within Okta Verify. While your app waits for the user, it should poll the SDK to determine when they finish with Okta Verify. The following diagram shows this common flow:

<div class="common-image-format">

![A sequence diagram showing the steps in the shared polling loop](/img/authenticators/dotnet-authenticators-okta-verify-shared-code-polling.png "All steps in the shared polling loop")

</div>

#### 1. Start polling on the client side

The page that shows the user either enrollment information or a challenge to authenticate themselves is the prompt for them to use the Okta Verify app. The app independently tells the Okta server that the challenge or enrollment flow succeeded or failed and while the user interacts with Okta Verify, the page in the user's browser needs to poll the Okta server for a status update.

To do this, add a JavaScript polling function to the page. This should continue to poll an endpoint in your app on the server-side until an indication is given that the flow has succeeded or failed in some way.

```js
<script>
    function poll() {
        fetch('@Model.PollEndpoint')
            .then(response => response.json())
            .then(data => {
                if (data.ContinuePolling) {
                    setTimeout(poll, data.Refresh);
                } else {
                    window.location.href = data.Next;
                }
            });
    }

    setTimeout(poll, @Model.RefreshInterval);
</script>
```

It's recommended you define one endpoint for enrollment flows and another for challenge flows. In the sample app, you can find these endpoints at `/OktaVerify/EnrollPoll` and `/OktaVerify/ChallengePoll`.

#### 2. Poll the Okta Server for current state of flow

When an endpoint receives a poll request from the JavaScript function, it sends a query to the Okta server for information. In enrollment flow, the endpoint should call the `PollAuthenticatorEnrollmentStatusAsync()` method on the `idxClient` object. In challenge flow, it should call `PollAuthenticatorPushStatusAsync()`.

```csharp
public async Task<ActionResult> EnrollPoll()
{
    var idxContext = (IIdxContext)Session["idxContext"];
    var pollResponse = await _idxClient.PollAuthenticatorEnrollmentStatusAsync(idxContext);
```

The response contains two key pieces of information:

* **Refresh** : The period in milliseconds before the endpoint is polled again
* **ContinuePolling** : Whether the user has finished their side of the process in Okta Verify and thus polling should continue or end

If `ContinuePolling` is true, it returns `true` and the refresh value to the browser.

```csharp
    TempData["canSkip"] = pollResponse.CanSkip;

    var pollViewModel = new OktaVerifyPollResponseModel
    {
        Refresh = pollResponse.Refresh ?? 4000,
        ContinuePolling = pollResponse.ContinuePolling,
        Next = "/Account/Login",
    };
```

If `ContinuePolling` is false, you can query the response's `AuthenticationStatus` property for the final state of the enrollment flow. You should expect one of the following statuses

* **Success** : The user is signed in successfully.
* **PasswordExpired** : The user needs to change their password.
* **AwaitingAuthenticatorEnrollment** : The user successfully enrolled Okta Verify, but there are other authenticators that the user could enroll.
* **AwaitingChallengeAuthenticatorSelection** : The user has successfully enrolled Okta Verify and all other authenticators. The user now needs to select an authenticator to sign in with.

```csharp
    if (!pollResponse.ContinuePolling)
    {
        switch (pollResponse?.AuthenticationStatus)
        {
            case AuthenticationStatus.Success:
                ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, pollResponse.TokenInfo);
                _authenticationManager.SignIn(new AuthenticationProperties(), identity);
                pollViewModel.Next = "/Home/Index";
                break;
            case AuthenticationStatus.PasswordExpired:
                pollViewModel.Next = "/Manage/ChangePassword";
                break;
            case AuthenticationStatus.AwaitingChallengeAuthenticatorSelection:
                Session["authenticators"] = ViewModelHelper.ConvertToAuthenticatorViewModelList(pollResponse.Authenticators);
                Session["isChallengeFlow"] = true;
                pollViewModel.Next = "/Manage/SelectAuthenticator";
                break;
            case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
                Session["isChallengeFlow"] = false;
                Session["authenticators"] = ViewModelHelper.ConvertToAuthenticatorViewModelList(pollResponse.Authenticators);
                pollViewModel.Next = "/Manage/SelectAuthenticator";
                break;
            default:
                pollViewModel.Next = "/Account/Login";
                break;
        }
    }
```

If you're in challenge flow, the only reason `ContinuePolling` is `false` is because the user has signed in successfully.

```csharp
public async Task<ActionResult> ChallengePoll()
{
    var pollResponse = await _idxClient.PollAuthenticatorPushStatusAsync((IIdxContext)Session["idxContext"]);
    var pollViewModel = new OktaVerifyPollResponseModel
    {
        Refresh = pollResponse.Refresh ?? 4000,
        ContinuePolling = pollResponse.ContinuePolling,
        Next = "/Home/Index"
    };

    if (!pollResponse.ContinuePolling)
    {
        ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync(_idxClient.Configuration, pollResponse.TokenInfo);
        _authenticationManager.SignIn(new AuthenticationProperties(), identity);
    }
```

#### 3. Return flow state to client

Regardless of whether you're in enrollment flow or in challenge flow, the endpoint needs to return, in a JSON object, the `Refresh` and `ContinuePolling` values and the page to redirect to if polling has ended as a JSON object.

```csharp
    return Json(pollViewModel, JsonRequestBehavior.AllowGet);
}
```

This common code is shared by all the flows documented below that use the polling mechanism.
