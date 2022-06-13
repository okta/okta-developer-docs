> **Note:** [Run the embedded Widget sample app](/docs/guides/oie-embedded-common-run-samples/aspnet/main/#run-the-embedded-widget-sample-app) and explore the available [embedded Widget use cases](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/aspnet/main/) to get familiar with the Identity Engine and Sign-In Widget flow.

Begin to integrate the Sign-In Widget into your own embedded app by following these steps:

1. [Set up your app for .Net 4.8 or greater](#_1-set-up-your-app-for-net-4-8-or-greater), similar to the SDK embedded app.
1. [Add the Okta SDK Nuget packages](#_2-add-the-okta-sdk-nuget-packages), similar to the SDK embedded app.
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/).
1. [Source the Sign-In Widget from the Okta CDN](#source-the-sign-in-widget-from-the-okta-cdn).
1. [Configure and initialize the Sign-In Widget](#configure-and-initialize-the-sign-in-widget).

#### Source the Sign-In Widget from the Okta CDN

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, replacing `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget:

```razor
@section head
{
   <script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
   <link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet" />
}
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

#### Configure and initialize the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app. In addition, you must set the `useInteractionCodeFlow` option to `true` to enable Identity Engine features in the embedded Sign-In Widget.

The following JSON sample shows you a set of Sign-In Widget configurations for initialization.

```json
{
   "interactionHandle":"${interactionHandle}",
   "version":"${widgetVersion}",
   "baseUrl":"${baseUrl}",
   "clientId":"${clientId}",
   "redirectUri":"https://localhost:44314/interactioncode/callback/",
   "authParams":{
      "issuer":"${issuerUri}",
      "scopes":[
         "openid",
         "profile",
         "offline_access"
      ]
   },
   "useInteractionCodeFlow":true,
   "state":"${state}",
   "otp":"${otp}",
   "codeChallenge":"${codechallenge}",
   "codeChallengeMethod":"S256"
}
```

Initialize the Sign-In Widget with `OktaSignIn()` and the required Widget configurations (shown as `widgetConfig` in the following sample). Call `showSignInAndRedirect()` to render the Widget on the sign-in page.

```csharp
<div id="okta-signin-widget-container"></div>
<script type="text/javascript">
    const widgetConfig = @Html.Raw(JsonConvert.SerializeObject(Model));
    console.log(widgetConfig.interactionHandle);

   var searchParams = new URL(window.location).searchParams;
   var otp = searchParams.get('otp');
   var state = searchParams.get('state');
   const signIn = new OktaSignIn({
         otp: otp,
         state: state,
        el: '#okta-signin-widget-container',
        ...widgetConfig
    });
    signIn.showSignInAndRedirect()
        .catch(err => {
            console.log('An error occurred in showSignInAndRedirect: ', err);
        });
</script>
```

See [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/aspnet/main) for further details on integrating the Sign-In Widget into your app.
