#### 1. Start challenge flow, retrieve and display a list of authenticators

The user signs in with a username and password, and then chooses Okta Verify from a list of authenticators. This is covered in the earlier [Shared Code](#initiate-sign-in-and-return-a-list-of-authenticators) section.

#### 2. Retrieve a list of challenge methods

When the user selects the **Okta Verify** factor and clicks **Submit**, the form posts back to the `SelectAuthenticatorAsync` method. This checks whether the user is in Challenge or enrollment flow.

When in challenge flow, a call is made to `idxClient.SelectChallengeAuthenticatorAsync`, using its `selectAuthenticatorOptions` parameter to pass in the Okta Verify factor ID.

```csharp
var selectAuthenticatorOptions = new SelectOktaVerifyAuthenticatorOptions
{
    AuthenticatorId = model.AuthenticatorId,
};

selectAuthenticatorResponse = await _idxClient.SelectChallengeAuthenticatorAsync(
   selectAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

If the call is successful, the returned `selectAuthenticatorResponse` object has a `CurrentAuthenticator` property that contains a list of the different methods for the user to authenticate themselves with. This needs to be passed to a page for display.

```csharp
var viewModel = new OktaVerifySelectAuthenticatorMethodModel
{
    AuthenticatorId = model.AuthenticatorId,
    MethodTypes = selectAuthenticatorResponse.CurrentAuthenticator.MethodTypes,
};

Session[nameof(OktaVerifySelectAuthenticatorMethodModel)] = viewModel;
return RedirectToAction("SelectAuthenticatorMethod", "OktaVerify");
```

#### 3. Display the list of challenge methods

Build a page to display the challenge methods for Okta Verify. For example, in the sample application, the `OktaVerifySelectAuthenticatorMethodModel` object stored in session in the previous step is retrieved. This contains the list of challenge methods.

```csharp
public ActionResult SelectAuthenticatorMethod()
{
   var model = (OktaVerifySelectAuthenticatorMethodModel)
      Session[nameof(OktaVerifySelectAuthenticatorMethodModel)];
   return View(model);
}
```

This is consumed in a Razor page.

```razor
<div>
    <h3>Verify it's you with a security method</h3>
    <div>Select from the following options</div>
    @Html.ValidationSummary(true, "", new { @class = "text-danger" })
    @using (Html.BeginForm("SelectAuthenticatorMethodAsync", "OktaVerify",
       FormMethod.Post, new { role = "form" }))
    {
        @Html.AntiForgeryToken()
        @Html.HiddenFor(m => m.AuthenticatorId)
        <div>
            @foreach (var methodType in Model.MethodTypes)
            {
                <div>
                    <label>
                        @Html.RadioButtonFor(m => m.MethodType, methodType)
                        @methodType
                    </label>
                </div>
            }
        </div>

        <div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </div>
    }
</div>
```

The available challenge methods are listed, as shown in the following screenshot.

<div class="common-image-format bordered-image">

![A list showing Okta Verify challenge methods available for use](/img/authenticators/dotnet-authenticators-okta-verify-challenge-list-of-challenge-methods.png "A list of available Okta Verify challenge methods")

</div>

#### 4. Initiate authentication on server-side

When the user selects the challenge method type and clicks **Submit**, the form posts back to the `SelectAuthenticatorMethodAsync()` method. This retrieves the selected method type and authenticator ID, and starts the challenge process on the server-side with a call to `SelectChallengeAuthenticatorAsync`.

```csharp
[HttpPost]
public async Task<ActionResult> SelectAuthenticatorMethodAsync(OktaVerifySelectAuthenticatorMethodModel model)
{
    var selectAuthenticatorOptions = new SelectOktaVerifyAuthenticatorOptions
    {
        AuthenticatorMethodType = model.MethodType,
        AuthenticatorId = model.AuthenticatorId,
    };

    try
    {
        var authnResponse = await _idxClient.SelectChallengeAuthenticatorAsync(selectAuthenticatorOptions,
            (IIdxContext)Session["IdxContext"]);
```

All being equal, the server should return a status of `AwaitingAuthenticatorVerification` indicating that it's waiting for the user to interact with Okta Verify. If this is true, send the user to the page specific to that challenge method.

```csharp
        if (authnResponse.AuthenticationStatus == AuthenticationStatus.AwaitingAuthenticatorVerification)
        {
            switch (model.MethodType)
            {
                case "totp":
                    return View("EnterCode");
                case "push":
                    return View("PushSent",
                        new OktaVerifySelectAuthenticatorMethodModel());
            }
        }
    }
    catch (Exception e)
    {
        ModelState.AddModelError("MethodType", e);
        return View("SelectAuthenticatorMethod", model);
    }

    return View(new OktaVerifySelectAuthenticatorMethodModel());
}
```

In this use case, the user is redirected to `\OktaVerify\PushSent`.

#### 5. Prompt user to open Okta Verify and start polling

Build a page to prompt the user to open Okta Verify and complete the push challenge. In the sample application, a new `OktaVerifySelectAuthenticatorMethodModel` is created and consumed in a Razor page (`PushSent.cshtml`). This page contains two sections:

First, the prompt to the user and a way to go back and choose an alternate challenge method if they can't complete the push challenge or have arrived here in error.

```razor
<div>
    <div>
        <h3>Push Sent</h3>
        @Html.ActionLink("Verify with something else", "SelectAuthenticatorMethod")
    </div>
</div>
```

This page is shown in the following screenshot.

<div class="common-image-format bordered-image">

![A page telling the user the push prompt has been sent to their Okta Verify app](/img/authenticators/dotnet-authenticators-okta-verify-challenge-push-sent.png "Notification that the push prompt is available in Okta Verify")

</div>

Second, the JavaScript `poll()` function that continues to poll an endpoint in the app on the server-side (in this case, `/OktaVerify/ChallengePoll`) until an indication is given that the user is authenticated successfully on the server-side.

```razor
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

The polling logic and code is common across all the flows that use it and is covered in the [Polling Okta](#polling-okta) section.

#### 6. User clicks "Yes It's Me"

The user opens Okta Verify on their device and clicks **Yes it's me** to complete the challenge and finish authenticating themselves.

#### 7. Exit Polling and complete challenge

The next time `ChallengePoll()` is called, it returns a status of `Success` along with access and ID tokens. The page exits the polling and redirects the user to the default home page for the signed-in user.
