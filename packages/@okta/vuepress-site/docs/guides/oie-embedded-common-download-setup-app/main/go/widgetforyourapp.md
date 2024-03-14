> **Note:** [Run the embedded widget sample app](/docs/guides/oie-embedded-common-run-samples/go/main/#run-the-embedded-widget-sample-app) and explore the available [embedded widget use cases](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/) to get familiar with the Identity Engine and Sign-In Widget flow.

Begin to integrate the Sign-In Widget into your own embedded app by following these steps:

1. [Install the Golang SDK](#_1-install-the-golang-sdk), similar to the SDK embedded app.
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/).
1. [Source the Sign-In Widget from the Okta CDN](#source-the-sign-in-widget-from-the-okta-cdn).
1. [Configure and initialize the Sign-In Widget](#configure-and-initialize-the-sign-in-widget).

#### Source the Sign-In Widget from the Okta CDN

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, replacing `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

#### Configure and initialize the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app.

Initialize the Sign-In Widget with `OktaSignIn()` and the required Widget configurations (`config`). Call `showSignInAndRedirect()` to render the widget on the sign-in page.

```html
<div id="okta-signin-widget-container"></div>
<script type="text/javascript">
  var config = {};
  config.baseUrl = "{{ .BaseUrl }}";
  config.clientId = "{{ .ClientId }}";
  config.redirectUri = "http://localhost:8000/login/callback";
  config.interactionHandle = "{{ .InteractionHandle }}";
  config.codeChallenge = "{{ .Pkce.CodeChallenge }}";
  config.codeChallengeMethod = "{{ .Pkce.CodeChallengeMethod }}";
  config.debug = true;
  config.authParams = {
    issuer: "{{ .Issuer }}",
    scopes: ['openid', 'profile', 'email'],
  };
  const signIn = new OktaSignIn({
       el: '#okta-signin-widget-container',
       ...config
  });

   // Search for URL Parameters to see if a user is being routed to the application to recover password
   var searchParams = new URL(window.location.href).searchParams;
   signIn.otp = searchParams.get('otp');
   signIn.state = searchParams.get('state');

   signIn.showSignInAndRedirect()
    .catch(err => {
      console.log('Error happen in showSignInAndRedirect: ', err);
    });
</script>
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you’re using an earlier version than 7, you must explicitly enable Identity Engine features by setting `config.useInteractionCodeFlow = true;` in the configuration settings shown in the previous example. If you’re using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `config.useClassicEngine = true;` in the configuration settings.

See [Load the widget](/docs/guides/oie-embedded-widget-use-case-load/go/main) for further details on integrating the Sign-In Widget into your app.
