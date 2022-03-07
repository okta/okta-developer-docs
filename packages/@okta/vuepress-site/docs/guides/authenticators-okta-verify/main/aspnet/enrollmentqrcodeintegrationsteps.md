#### 1. Initiate sign-in and return a list of authenticators

The user signs in with a username and password, and then chooses Okta Verify from a list of authenticators. This is covered in the earlier [Shared Code](#initiate-sign-in-and-return-a-list-of-authenticators) section.

#### 2. Request QR Code

When the user selects Okta Verify and clicks **Submit**, the form posts back to the `SelectAuthenticatorAsync` method. This checks whether the user is in Challenge Flow or Enrollment Flow. When in Enrollment flow, a call is made to `idxClient.SelectEnrollAuthenticatorAsync`, using its `enrollAuthenticatorOptions` parameter to pass in the Okta Verify factor ID.

```csharp
var enrollAuthenticatorOptions = new SelectEnrollAuthenticatorOptions
{
   AuthenticatorId = model.AuthenticatorId,
};

var enrollResponse = await _idxClient.SelectEnrollAuthenticatorAsync(
    enrollAuthenticatorOptions, (IIdxContext)Session["IdxContext"]);
```

If the call is successful, the returned `enrollResponse` object has an `AuthenticationStatus` of `AwaitingAuthenticatorVerification` and its `CurrentAuthenticator` property contains the QR code that the user can use to setup their copy of Okta Verify. This needs to be passed to a page to display that information.

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
         else if(model.IsOktaVerifySelected)
         {
            Session["oktaVerifyAuthenticator"] = enrollResponse.CurrentAuthenticator;
            return RedirectToAction("Enroll", "OktaVerify");
         }

         return RedirectToAction("VerifyAuthenticator", "Manage");
      }

  // other case statements

   default:
      return View("SelectAuthenticator", model);
}
```

#### 3: Display QR Code and start polling

Build a page to display the QR code for Okta Verify. For example, in the sample application, a new `OktaVerifyEnrollPollModel` is populated from the `CurrentAuthenticator` object returned by the `enrollResponse` object in the previous step.

```csharp
public ActionResult Enroll()
{
   var oktaVerifyAuthenticator = (IAuthenticator)Session["oktaVerifyAuthenticator"];
   return View("EnrollWithQrCode", new OktaVerifyEnrollPollModel(
      oktaVerifyAuthenticator.ContextualData.QrCode.Href));
}
```

The `OktaVerifyEnrollPollModel` constructor includes some values for the polling the page will perform.

```csharp
public OktaVerifyEnrollPollModel(
   string qrCode, string pollEndpoint = "/OktaVerify/EnrollPoll")
   {
      this.QrCode = qrCode;
      this.PollEndpoint = pollEndpoint;
      this.RefreshInterval = 4000;
      this.Message = "When prompted, tap Scan a QR code, then scan the QR code below:";
}
```

This ViewModel is then consumed in a Razor page. This page contains two important sections. First, the form containing the QR code and drop-down of other enrollment options.

```razor
<div>
   <img src=@Model.QrCode />
</div>
<div>
   <div>
      @Html.ActionLink("Can't scan?", "SelectEnrollmentChannel")
   </div>
</div>
```

The instructions and QR code appear, as shown in the following screenshot

<div class="common-image-format">

![A QR code is displayed to be used within Okta Verify to complete enrollment](/img/authenticators/dotnet-authenticators-okta-verify-enrollment-scan-qr-code.png)

</div>

> Note the link to select an enrollment channel other than the QR code above ("Can't scan?"). The code for this and enrolling Okta Verify using other channels is covered [here](#Integrate-enrollment-using-other-channels).

Second, the JavaScript `poll()` function that will continue to poll an endpoint in the app on the server-side (in this case, `/OktaVerify/EnrollPoll`) until an indication is given that Okta Verify has been enrolled successfully on the server-side.

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

The polling logic and code is common across all the flows that use it and is covered [here](#Polling-okta)

#### 4: Open Okta Verify

Next, the user installs Okta Verify (if not already installed on their device) and opens the app. To learn how to install and use the Okta Verify app, go to the [Okta Help Center](https://help.okta.com/en/prod/Content/Topics/Mobile/okta-verify-overview.htm).

#### 5: Scan QR Code

After the user opens Okta Verify, they verify the account in the app by scanning the QR code on the screen using the device's camera.

#### 6: Exit Polling

Once the user has scanned the QR code and finished enrolling their account, the next time `EnrollPoll()` is called, it returns a status of `Success` along with access and ID tokens. The page exits the polling and redirects the user to the default home page for the signed-in user.
