> **Note:** [Run the embedded Widget sample app](/docs/guides/oie-embedded-common-run-samples/go/main/#run-the-embedded-widget-sample-app) and explore the available [embedded Widget use cases](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/) to get familiar with the Identity Engine and Sign-In Widget flow.

Begin to integrate the Sign-In Widget into your own embedded app by following these steps:

1. [Install the Golang SDK](#_1-install-the-golang-sdk), similar to the SDK embedded app.
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/).
1. [Source the Sign-In Widget from the Okta CDN](#source-the-sign-in-widget-from-the-okta-cdn).
1. [Configure and initialize the Sign-In Widget](#configure-and-initialize-the-sign-in-widget).

#### Source the Sign-In Widget from the Okta CDN

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN. In the following sample, the `${siwVersion}` parameter is the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the Sign-In Widget.

```html
<script src="https://global.oktacdn.com/okta-signin-widget/${siwVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${siwVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

#### Configure and initialize the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app. In addition, you must set the `useInteractionCodeFlow` option to `true` to enable Identity Engine features in the embedded Sign-In Widget.

Initialize the Sign-In Widget with `OktaSignIn()` and the required Widget configurations (`config`). Call `showSignInAndRedirect()` to render the Widget on the sign-in page.

```javascript
<div id="okta-signin-widget-container"></div>
<script type="text/javascript">
  var config = {};
  config.baseUrl = "{{ .BaseUrl }}";
  config.clientId = "{{ .ClientId }}";
  config.redirectUri = "http://localhost:8000/login/callback";
  config.interactionHandle = "{{ .InteractionHandle }}";
  config.useInteractionCodeFlow = "true";
  config.codeChallenge = "{{ .Pkce.CodeChallenge }}";
  config.codeChallengeMethod = "{{ .Pkce.CodeChallengeMethod }}";
  config.state = "{{ .State }}" || false,
  config.debug = true,
  config.authParams = {
    issuer: "{{ .Issuer }}",
    scopes: ['openid', 'profile', 'email'],
  };
  const signIn = new OktaSignIn({
    el: '#okta-signin-widget-container',
    ...config
  });
  signIn.showSignInAndRedirect()
    .catch(err => {
      console.log('Error happen in showSignInAndRedirect: ', err);
    });
</script>
```

See [Load the Widget](/docs/guides/oie-embedded-widget-use-case-load/go/main) for further details on integrating the Sign-In Widget into your app.
