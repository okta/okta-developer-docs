### 1: Initiate password recovery

To begin the password recovery flow, the user must

1. Click the **Forgot Password?** link on the login page.
2. Enter their **Email or Username** in the textbox and click **Next**.
3. Choose **Email** as the authenticator to be used for password recovery and click **Submit**

Okta then tells the user to either click the link in the email or enter the code to continue and sends an email to their email address matching the Forgot Password template that was altered earlier.

<div class="common-image-format">

![Screenshot of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png)

</div>

The **Reset Password** link in the email includes the `OTP` and `request.relayState` variables as query parameters back to the application. For example,

`https://localhost:44314/magiclink/callback?otp=${oneTimePassword}&state=${request.relayState}` becomes `https://localhost:44314/magiclink/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32`.

### 2: Handle the otp and state parameters

Create a callback handler method that takes the `otp` and `state` parameters in the query string and passes them as session parameters to a page containing the Sign-In Widget.

```csharp
public async Task<ActionResult> Callback(string state, string otp, string error = null, string error_description = null)
{
    if (!string.IsNullOrEmpty(error) || !string.IsNullOrEmpty(error_description))
    {
        return View(new MagicLinkCallbackModel { Message = $"{error}: {error_description}" });
    }

    SignInWidgetConfiguration siwConfig = Session["siwConfig"] as SignInWidgetConfiguration;

    if (siwConfig != null)
    {
        Session["otp"] = otp;
        Session["state"] = state;
        return View("SignInWidget", siwConfig);
    }
```

If the otp and state values are not valid or the user is in a different browser after clicking the link, you should advise the user to return to the original tab in the browser where they requested a password reset and enter the otp value there to proceed.

```csharp
    return View(new MagicLinkCallbackModel { Message = $"Please enter the OTP '{otp}' in the original browser tab to finish the flow." });
}
```

### 3: Setup and render Widget with otp and State

Consume the session `state` and `otp` variables in a Razor page containing the Sign-In Widget.

```razor
@model SignInWidgetConfiguration

@section head
{
    <script src="https://global.oktacdn.com/okta-signin-widget/6.0.0/js/okta-sign-in.min.js" type="text/javascript"></script>
    <link href="https://global.oktacdn.com/okta-signin-widget/6.0.0/css/okta-sign-in.min.css" type="text/css" rel="stylesheet" />
}

<div id="okta-signin-widget-container"></div>
<script type="text/javascript">
    var widgetConfig = @Html.Raw(JsonConvert.SerializeObject(Model));

    @Html.Raw($"widgetConfig.otp = '{Session["otp"]}';widgetConfig.state = '{Session["state"]}';");

    console.log(widgetConfig.interactionHandle);

    const signIn = new OktaSignIn({
        el: '#okta-signin-widget-container',
        ...widgetConfig
    });
    signIn.showSignInAndRedirect()
        .catch(err => {
            console.log('Error happen in showSignInAndRedirect: ', err);
        });
</script>
```

### 4: Display password reset page and continue the password recovery flow

Once the widget is loaded, it checks whether the state and OTP are valid with Okta. Assuming they are, either the following reset page is displayed, or a prompt is made for the OTP code to be entered. Once the OTP code is entered, the reset page is then displayed. The user continues the password recovery flow described in the [User password recovery guide](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/aspnet/main/).

<div class="common-image-format">

![Screenshot of password reset page](/img/advanced-use-cases/dotnet-custom-pwd-recovery-custom-siw-reset-pwd-page.png)

</div>
