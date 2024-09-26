### Initiate password recovery

The user starts the password recovery flow by completing these steps:

1. Click the **Forgot Password?** on the sign-in page.
2. Enter their **Email or Username** in the dialog, and then click **Next**.
3. Choose **Email** as the authenticator that they want to use for password recovery and click **Submit**.

Okta then tells the user to either click the link in the email or enter the code to continue. Okta sends an email to their email address matching the Forgot Password template that was altered earlier.

<div class="three-quarter">

![Example of email sent to user](/img/advanced-use-cases/custom-pwd-recovery-custom-email.png)

</div>

The email's **Reset Password** link includes the `otp` and `request.relayState` variables sent back as query parameters to the application. For instance, the URL in the email template,  `http://localhost:8080/magic-link/callback?otp={oneTimePassword}&state={request.relayState}`, might be rendered as `http://localhost:8080/magic-link/callback?otp=726009&state=1b34371af02dd31d2bc4c48a3607cd32` in the email sent to the user.

### Handle the otp and state parameters

Create a callback handler method that takes the `otp` and `state` parameters in the query string and passes them as session parameters to a page that contains the Sign-In Widget.

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

After clicking the link, it's possible that the `otp` and `state` values aren't valid or the user is in a different browser. In that scenario, advise the user to return to the original tab in the browser where they requested a password reset. Then, the user must enter the `otp` value to proceed.

```csharp
    return View(new MagicLinkCallbackModel { Message = $"Please enter the OTP '{otp}' in the original browser tab to finish the flow." });
}
```

### Set up and render Widget with OTP and state

Consume the session `state` and `otp` values in a Razor page that contains the Sign-In Widget. In the code, use the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the Widget: -=OKTA_REPLACE_WITH_WIDGET_VERSION=-

```razor
@model SignInWidgetConfiguration

@section head
{
    <script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
    <link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet" />
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

### Display password reset page

After the Widget is loaded, it checks whether the state and OTP are valid with Okta. Assuming they are, either the following reset page appears, or a prompt appears for the user to enter the OTP code. After the user enters the OTP code, the reset page appears. The user continues the password recovery flow described in the [User password recovery guide](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/aspnet/main/).

<div class="half border">

![Screenshot of password reset page](/img/advanced-use-cases/dotnet-custom-pwd-recovery-custom-siw-reset-pwd-page.png)

</div>
