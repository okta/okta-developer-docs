#### 1. Start enrollment, retrieve and display authenticators

The user signs in with a username and password, and then chooses Okta Verify from a list of authenticators. This is covered in the earlier [Shared Code](#initiate-sign-in-and-return-a-list-of-authenticators) section.

#### 2 - 3. Retrieve and display QR code

When the user selects Okta Verify and clicks **Submit**, the form posts back to the `SelectAuthenticatorAsync` method. In enrollment flow, a QR code is returned and appears for the user, along with a link to select an alternative enrollment method.

The code for this is shared with Steps 2 and 3 of [Integrate Enrollment Using QR code](#integrate-enrollment-using-qr-code).

#### 4. Display a list of other enrollment channels

Build a page to display the other enrollment channels for Okta Verify. For example, in the sample application, a new `OktaVerifySelectEnrollmentChannelModel` is populated from the `oktaVerifyAuthenticator` object that is stored in the session in the previous step.

```csharp
[HttpGet]
public ActionResult SelectEnrollmentChannel()
{
   var oktaVerifyAuthenticator = (IAuthenticator)Session["oktaVerifyAuthenticator"];
   var selectEnrollmentChannelModel = new OktaVerifySelectEnrollmentChannelModel(
      oktaVerifyAuthenticator);
   return View(selectEnrollmentChannelModel);
}
```

The `OktaVerifySelectEnrollmentChannelModel` constructor retains the authenticator ID and a list of available enrollment channels that aren't the QR code.

```csharp
public OktaVerifySelectEnrollmentChannelModel(IAuthenticator authenticator)
{
    this.AuthenticatorId = authenticator.Id;
    this.ChannelTypes = authenticator.ChannelTypes.Where(x => x.Value != "qrcode").ToList();
}
```

This ViewModel is then consumed in a Razor page.

```razor
<div>
    @using (Html.BeginForm("SelectEnrollmentChannel", "OktaVerify",
      FormMethod.Post, new { role = "form" }))
    {
        @Html.AntiForgeryToken()
        @Html.HiddenFor(m => m.AuthenticatorId)
        <h4>More options</h4>
        <div>Which option do you want to try?</div>

        <div>
            <div>
                @foreach (var channel in Model.ChannelTypes)
                {
                <div>
                    <label>
                        @Html.RadioButtonFor(m => m.SelectedChannel, channel)
                        @channel
                    </label>
                </div>
                }
            </div>
        </div>
        <div>
            <div>
                <input type="submit" value="Next" />
            </div>
        </div>
        @Html.ValidationSummary("", new { @class = "text-danger" })
    }
</div>
```

The available channels are listed, as shown in the following screenshot.

<div class="common-image-format bordered-image">

![A list showing Okta Verify enrollment channels available for use](/img/authenticators/dotnet-authenticators-okta-verify-enrollment-list-of-other-enrollment-options.png "A list of the available Okta Verify enrollment channels")

</div>

#### 5. Start email enrollment on server-side

When the user selects **Email** and clicks **Next**, the form posts back to the `SelectEnrollmentChannel()` method. This retrieves the selected channel type and authenticator ID, and starts the email enrollment process on the server-side with a call to `SelectEnrollAuthenticatorAsync`.

```csharp
[HttpPost]
public async Task<ActionResult> SelectEnrollmentChannel(OktaVerifySelectEnrollmentChannelModel model)
{
    var oktaVerifyAuthenticator = (IAuthenticator)Session["oktaVerifyAuthenticator"];
    var idxContext = (IIdxContext)Session["idxContext"];
    var enrollOktaVerifyOptions = new EnrollOktaVerifyAuthenticatorOptions
    {
        Channel = model.SelectedChannel,
        AuthenticatorId = model.AuthenticatorId
    };

    await _idxClient.SelectEnrollAuthenticatorAsync(enrollOktaVerifyOptions, idxContext);
```

Send the user to a page specific to the email channel that asks them for their email address.

```csharp
    switch (model.SelectedChannel)
    {
        case "email":
            return View("EnrollWithEmail");
        case "sms":
            return View("EnrollWithPhoneNumber", new OktaVerifyEnrollWithPhoneNumberModel { CountryCode = "+1" });
    }

    ModelState.AddModelError("SelectedChannel", new ArgumentException($"Unrecognized Okta Verify channel: {model.SelectedChannel}"));
    return View(model);
}
```

#### 6. Display prompt for user's email address

Build a page that displays a prompt for the user's email address. For example, in the sample app, we have:

```razor
<div>
    @using (Html.BeginForm("EnrollWithEmail", "OktaVerify",
        FormMethod.Post, new { role = "form" }))
    {
        @Html.AntiForgeryToken()
        <h4>Set up Okta Verify via email link</h4>
        @Html.ValidationSummary("", new { @class = "text-danger" })
        <div>
            <div>
                @Html.LabelFor(m => m.Email, new { @class = "control-label" })
                @Html.EditorFor(m => m.Email, new { htmlAttributes = new { @class = "form-control" } })
            </div>
        </div>
        <div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </div>
    }
</div>
```

This prompt is rendered as shown in the following screenshot:

<div class="common-image-format bordered-image">

![A prompt for a user to enter and submit their email address to Okta Verify](/img/authenticators/dotnet-authenticators-okta-verify-enrollment-email-prompt-for-address.png "A prompt for an email address")

</div>

#### 7. Submit Email Address

When the user enters their email address and clicks **Submit**, that address is sent to Okta so it can send the user an email with an activation link for them to use. Then they are redirected to a simple page with a prompt to check their email.

```csharp
[HttpPost]
public async Task<ActionResult> EnrollWithEmail(OktaVerifyEnrollWithEmailModel emailModel)
{
    var idxContext = (IIdxContext)Session["idxContext"];
    var okaVerifyEnrollWithEmailOptions = new EnrollOktaVerifyAuthenticatorOptions
    {
        Channel = "email",
        Email = emailModel.Email,
    };

    _ = await _idxClient.EnrollAuthenticatorAsync(okaVerifyEnrollWithEmailOptions, idxContext);
    var oktaVerifyEnrollModel = new OktaVerifyEnrollPollModel()
    {
        Message = "An activation link was sent to your email, use it to complete Okta Verify enrollment."
    };

    return View("EnrollPoll", oktaVerifyEnrollModel);
}
```

#### 8. Send an email with Okta Verify activation link

After the user submits their email, Okta sends an activation link to that address.

<div class="common-image-format bordered-image">

![An email that contains the Okta Verify Push activation link](/img/authenticators/dotnet-authenticators-okta-verify-enrollment-email-text.png "An email containing the activation link")

</div>

#### 9. Prompt user to check email and start polling

Build a page that displays the prompt for the user to check their email while starting to poll Okta for completion.  In the sample application, a new `OktaVerifyEnrollPollModel` is populated in the previous step that contains a message to the user to look in their email for the next step.

This viewmodel is then consumed in a Razor page. This page contains two important sections. First, the form that contains the QR code and a dropdown list of other enrollment options.

```razor
<div>
    <h4>Set up Okta Verify</h4>
    <ol>
        <li>On your mobile device, download the Okta Verify app from the App Store (iPhone and iPad) or Google Play (Android devices).</li>
        <li>@Model.Message</li>
    </ol>
    <hr />
</div>
```

Second, the JavaScript `poll()` function that continues to poll an endpoint in the app on the server-side (in this case, `/OktaVerify/EnrollPoll`) until an indication is given that Okta Verify is enrolled successfully on the server-side.

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

The polling logic and code is common across all the flows that use it and is covered in the [Polling Okta](#polling-okta) section.

#### 10. User clicks the activation link

The user opens the email on their mobile device and taps **Activate Okta Verify Push** that sends them to Okta Verify to complete the account setup.

<div class="common-image-format bordered-image">

![A prompt for a user to install Okta Verify and activate it](/img/authenticators/dotnet-authenticators-okta-verify-enrollment-email-prompt-user-to-check-email.png "An activation prompt for Okta Verify")

</div>

#### 11. Exit polling and sign user in

After the user completes the setup and finishes enrolling their account, the next time `EnrollPoll()` is called, it returns a status of `Success` along with access and ID tokens. The page exits the polling and redirects the user to the default home page for the signed-in user.
