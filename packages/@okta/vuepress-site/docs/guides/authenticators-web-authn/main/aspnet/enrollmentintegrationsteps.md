### 1: Build a sign-in page on the client

Build a sign-in page that captures the user’s name and password, as shown in the following example.

<div class="half border">

![Basic sign-in dialog](/img/authenticators/dotnet-authenticators-sign-in-form.png)

</div>

### 2: Authenticate the user credentials

After a user initiates the sign-on flow by entering their username and password and then clicks **Log In**, create an `AuthenticationOptions` object in your `LogIn` method. Then, set the object's `Username` and `Password` properties to the values set by the user. Pass this object as a parameter to the `AuthenticateAsync` method on the `IdxClient`.

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
* `AwaitingChallengeAuthenticatorSelection` that is covered in the [challenge flow section](/docs/guides/authenticators-web-authn/aspnet/main/#integrate-sdk-for-authenticator-challenge).

The names of the authenticators available for enrollment or challenge can be found in the `AuthenticationResponse` object's `Authenticators` collection. Redirect the user to a list of authenticators to select the WebAuthn authenticator for enrollment.

> **Note**: The `isChallengeFlow` session variable is set to `false` if the user needs to enroll the WebAuthn authenticator, and `true` if they have already done so.

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

Build a page to display the list of authenticators (including a WebAuthn option). For example, in the sample application, a new `SelectAuthenticatorViewModel` is populated from the `Authenticators` collection returned by the `AuthenticationResponse`.

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
        <div class="form-group">
            <div>
                <input type="submit" value="Submit" />
            </div>
        </div>
    }
</section>
```

The WebAuthn factor option is listed as **Security Key or Biometric**, as shown in the following image.

<div class="three-quarter">

![An authenticator list showing WebAuthn Authenticator available for use](/img/authenticators/dotnet-authenticators-webauthn-authenticator-list.png)

</div>

### 5: Retrieve encrypted challenge and user information

When the user selects the WebAuthn authenticator factor and clicks **Submit**, the form posts back to the `SelectAuthenticatorAsync` method. This checks whether the user is in challenge flow or enrollment flow.

When in Enrollment flow, a call is made to `idxClient.SelectEnrollAuthenticatorAsync`, using its `enrollAuthenticatorOptions` parameter to pass in the WebAuthn Authenticator factor ID.

```csharp
var enrollAuthenticatorOptions = new SelectEnrollAuthenticatorOptions
{
    AuthenticatorId = model.AuthenticatorId,
};

var enrollResponse = await _idxClient.SelectEnrollAuthenticatorAsync(
    enrollAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

If the call is successful, the returned `enrollResponse` object has an `AuthenticationStatus` of `AwaitingAuthenticatorVerification` and its `CurrentAuthenticator` property contains the encrypted challenge and the user information that the browser can use to enroll the authenticator.

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
            else if (model.IsWebAuthnSelected)
            {
                Session["currentWebAuthnAuthenticator"] = 
                   enrollResponse.CurrentAuthenticator;
                return RedirectToAction(
                    "EnrollWebAuthnAuthenticator", "Manage");
            }

            return RedirectToAction("VerifyAuthenticator", "Manage");
        }

    // other case statements

    default:
        return View("SelectAuthenticator", model);
}
```

### 6: Enroll authenticator through the browser

Build a page with the challenge and user information from the website's backend servers and then call `navigator.credentials.create` to raise the prompt to enter a security key, validate with Windows Hello, Touch ID, or other WebAuthn Authenticator. For example, in the sample application, a new `EnrollWebAuthnViewModel` is populated from the `currentAuthenticator` object returned by the `enrollResponse` in the previous step.

```csharp
var currentAuthenticator = (IAuthenticator)Session["currentWebAuthnAuthenticator"];

var viewModel = new EnrollWebAuthnViewModel
{
    DisplayName = currentAuthenticator.Name,
    UserId = currentAuthenticator.ContextualData.ActivationData.User.Id,
    Username = currentAuthenticator.ContextualData.ActivationData.User.Name,
    Challenge = currentAuthenticator.ContextualData.ActivationData.Challenge,
};
```

The `viewModel` is then consumed in the script section of a Razor page. First it's prepared to be passed to the authenticator.

```js
document.addEventListener('DOMContentLoaded', function () {
    const challenge = '@Model.Challenge';
    const userId = '@Model.UserId';
    const username = '@Model.Username';
    const displayName = '@Model.DisplayName';


    const publicKeyCredentialCreationOptions = {
        rp: {
            name: "localhost",
            id: "localhost",
        },
        challenge: strToBin(challenge),
        user: {
            id: strToBin(userId),
            name: name,
            displayName: displayName,
        },
        pubKeyCredParams: [{alg: -7, type: "public-key"}],
    };
```

Then the call to `navigator.credentials.create` calls WebAuthn APIs in the browser and passes the challenge to the authenticator for validation. The user sees the authenticator challenge dialog. In this case, the WebAuthn option is a security USB key.

<div class="three-quarter">

![A dialog generated by the browser prompting the user to set up their security key ](/img/authenticators/dotnet-authenticators-webauthn-enroll-key-setup.png)

</div>

After the authenticator validates the user, it returns an `attestationObject` that contains the information needed to validate the registration event, and a `clientDataJSON` object used to associate the new credential with the server and the browser.

```js
    navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    }).then((newCredential) => {
        const clientDataJSON = binToStr(
            newCredential.response.clientDataJSON);
        const attestationObject = binToStr(
            newCredential.response.attestationObject);

        const params = {
            "clientData": clientDataJSON,
            "attestation": attestationObject,
            "challenge": challenge,
            "userId": userId,
            "username": username,
            "displayName": displayName
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(params),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        };
```

### 7. Send verification credentials to Okta server

Send the verifying credentials back to the Okta server to finish enrolling the WebAuthn authenticator for the user. Okta decrypts the challenge using the user's public key and stores the user's credentials and public key.

```js
        fetch("@Url.Action("EnrollWebAuthnAuthenticatorAsync", "Manage")", options)
            .then(res => {
                console.log("Request successful! Response:", res);
                location.href = '@Url.Action("EnrollWebAuthnAuthenticator", "Manage",
                    new { verificationCompleted = true})';
            }).catch(function(err) {
                console.error(err);
                }
            );
    }).catch(function (err) {
        console.error(err);
    });
}, false);
```

Pass the credentials as a parameter to the `EnrollAuthenticatorAsync` method on the `IdxClient`.

```csharp
var authnResponse = await _idxClient.EnrollAuthenticatorAsync(
    new EnrollWebAuthnAuthenticatorOptions
    {
        Attestation = viewModel.Attestation,
        ClientData = viewModel.ClientData,
    }, (IIdxContext)Session["idxContext"]);

Session["WebAuthnResponse"] = authnResponse;
```

### 8: Enroll more authenticators or sign the user in

Query the `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `EnrollAuthenticatorAsync` to discover the current status of the authentication process. You need to respond to two specific authenticator statuses:

* `AwaitingAuthenticatorEnrollment`
* `Success`

A status of `AwaitingAuthenticatorEnrollment` means that there are other authenticator types (Google, Okta Verify) the user has yet to enroll. Your app should return to Step 4 and display a list of those authenticators that are still unenrolled as well as an option to skip further enrollment.

A status of `Success` (or the user choosing to skip further authenticator enrollment) means that the user has now successfully enrolled their WebAuthn authenticator and is signed into the app. Call `AuthenticationHelper.GetIdentityFromTokenResponseAsync` to retrieve the OIDC claims information about the user and pass them into your application.

```csharp
var authnResponse = (IAuthenticationResponse)Session["webAuthnResponse"];

switch (authnResponse?.AuthenticationStatus)
{
    case AuthenticationStatus.Success:
        ClaimsIdentity identity = await AuthenticationHelper.GetIdentityFromTokenResponseAsync
            (_idxClient.Configuration, authnResponse.TokenInfo);
        _authenticationManager.SignIn(identity);
        return RedirectToAction("Index", "Home");

    case AuthenticationStatus.AwaitingAuthenticatorEnrollment:
        Session["isChallengeFlow"] = false;
        Session["authenticators"] = ViewModelHelper.ConvertToAuthenticatorViewModelList
            (authnResponse.Authenticators);
        TempData["canSkip"] = authnResponse.CanSkip;
        return RedirectToAction("SelectAuthenticator", "Manage");

    default:
        return RedirectToAction("Index", "Home");
}
```
