> **Note:** [Run the embedded Widget sample app](/docs/guides/oie-embedded-common-run-samples/nodejs/main/#run-the-embedded-widget-sample-app) and explore the available [embedded Widget use cases](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/nodejs/main/) to get familiar with the Identity Engine and Sign-In Widget flow.

Begin to integrate the Sign-In Widget into your own embedded app by following these steps:

1. [Install the SDK into your project application](#_1-install-the-sdk-into-your-project-application), similar to the SDK embedded app.
1. [Install the @okta/okta-auth-js node dependency](#_2-install-the-okta-okta-auth-js-node-dependency), similar to the SDK embedded app.
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/).
1. [Source the Sign-In Widget from the Okta CDN](#source-the-sign-in-widget-from-the-okta-cdn).
1. [Initialize the Sign-In Widget](#initialize-the-sign-in-widget).

#### Source the Sign-In Widget from the Okta CDN

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, replacing the `${siwVersion}` property with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the Widget:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/${siwVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${siwVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

You can find more info in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the Widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

#### Initialize the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app. In addition, you must set the `useInteractionCodeFlow` option to `true` to enable Identity Engine features in the embedded Sign-In Widget.

In this code sample, `widgetConfig` is referenced in the `login.js` file, which uses values defined in the `config.js` file:

```JavaScript
      console.log('renderLoginWithWidget: using interaction handle: ', interactionHandle);
      const { clientId, redirectUri, issuer, scopes } = getConfig().webServer.oidc;
      const widgetConfig = {
        baseUrl: issuer.split('/oauth2')[0],
        clientId: clientId,
        redirectUri: redirectUri,
        authParams: {
          issuer: issuer,
          scopes: scopes,
        },
        useInteractionCodeFlow: true,
        state,
        interactionHandle,
        codeChallenge,
        codeChallengeMethod,
      };
```

Load the Widget in the sign-in page, similar to the following snippet:

```JavaScript
<div id="content" class="ui padded relaxed">

      {{>formMessages}}

      <div id="okta-signin-widget-container"></div>

      <script type="text/javascript">
        const widgetConfig = {{{widgetConfig}}};
        const signIn = new OktaSignIn({
          el: '#okta-signin-widget-container',
          ...widgetConfig
        });
        signIn.showSignInAndRedirect()
          .catch(err => {
            console.log('Error happen in showSignInAndRedirect: ', err);
          });
      </script>

</div>
```

See [Okta Sign-In Widget Guide](/code/javascript/okta_sign-in_widget/) for more details.
