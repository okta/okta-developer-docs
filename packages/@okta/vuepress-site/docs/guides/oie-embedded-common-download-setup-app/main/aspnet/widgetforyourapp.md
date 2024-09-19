> **Note:** [Run the embedded widget sample app](/docs/guides/oie-embedded-common-run-samples/aspnet/main/#run-the-embedded-widget-sample-app) and explore the available [embedded widget use cases](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/aspnet/main/) to get familiar with the Identity Engine and Sign-In Widget flow.

Begin to integrate the Sign-In Widget into your own embedded app by following these steps:

1. [Set up your app for .Net 4.8 or greater](#_1-set-up-your-app-for-net-4-8-or-greater), similar to the SDK embedded app.
1. [Add the Okta SDK NuGet packages](#_2-add-the-okta-sdk-nuget-packages), similar to the SDK embedded app.
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/).
1. [Source the Sign-In Widget from the Okta CDN](#source-the-sign-in-widget-from-the-okta-cdn).
1. [Configure and initialize the Sign-In Widget](#configure-and-initialize-the-sign-in-widget).

#### Source the Sign-In Widget from the Okta CDN

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, using the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget: -=OKTA_REPLACE_WITH_WIDGET_VERSION=-

```razor
@section head
{
   <script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
   <link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet" />
}
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

#### Configure and initialize the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app.

The following JSON sample shows you a set of Sign-In Widget configurations for initialization.

```json
{
   "interactionHandle":"{interactionHandle}",
   "version":"{widgetVersion}",
   "baseUrl":"{baseUrl}",
   "clientId":"{clientId}",
   "redirectUri":"https://localhost:44314/interactioncode/callback/",
   "authParams":{
      "issuer":"{issuerUri}",
      "scopes":[
         "openid",
         "profile",
         "offline_access"
      ]
   },
   "state":"{state}",
   "otp":"{otp}",
   "codeChallenge":"{codechallenge}",
   "codeChallengeMethod":"S256"
}
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you’re using an earlier version than 7, you must explicitly enable Identity Engine features by setting `"useInteractionCodeFlow": true` in the configuration settings shown in the previous example. If you’re using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `"useClassicEngine": true` in the configuration settings.

Initialize the Sign-In Widget with `OktaSignIn()` and the required Widget configurations (shown as `widgetConfig` in the following sample). Call `showSignInAndRedirect()` to render the widget on the sign-in page.

```csharp
<div id="okta-signin-widget-container"></div>
<script type="text/javascript">
    const widgetConfig = @Html.Raw(JsonConvert.SerializeObject(Model));
    console.log(widgetConfig.interactionHandle);

   const signIn = new OktaSignIn({
        el: '#okta-signin-widget-container',
        ...widgetConfig
    });

   // Search for URL Parameters to see if a user is being routed to the application to recover password
   var searchParams = new URL(window.location.href).searchParams;
   signIn.otp = searchParams.get('otp');
   signIn.state = searchParams.get('state');

   signIn.showSignInAndRedirect()
        .catch(err => {
            console.log('An error occurred in showSignInAndRedirect: ', err);
        });
</script>
```

See [Load the widget](/docs/guides/oie-embedded-widget-use-case-load/aspnet/main) for further details on integrating the Sign-In Widget into your app.
