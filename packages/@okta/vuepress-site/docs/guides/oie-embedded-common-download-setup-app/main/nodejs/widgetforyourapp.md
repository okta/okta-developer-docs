> **Note:** [Run the embedded Widget sample app](/docs/guides/oie-embedded-common-run-samples/nodejs/main/#run-the-embedded-widget-sample-app) and explore the available [embedded Widget use cases](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/nodejs/main/) to get familiar with the Identity Engine and Sign-In Widget flow.

Begin to integrate the Sign-In Widget into your own embedded app by following these steps:

1. [Install the SDK into your project application](#_1-install-the-sdk-into-your-project-application), similar to the SDK embedded app.
1. [Install the @okta/okta-auth-js node dependency](#_2-install-the-okta-okta-auth-js-node-dependency), similar to the SDK embedded app.
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/).
1. [Source the Sign-In Widget from the Okta CDN](#source-the-sign-in-widget-from-the-okta-cdn).
1. [Initialize the Sign-In Widget](#initialize-the-sign-in-widget).

#### Source the Sign-In Widget from the Okta CDN

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, using the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget: -=OKTA_REPLACE_WITH_WIDGET_VERSION=-

```html
<script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

#### Initialize the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app.

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
        state,
        interactionHandle,
        codeChallenge,
        codeChallengeMethod,
      };
```

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you’re using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: true` in the configuration settings, as shown previously. If you’re using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `useClassicEngine: true` in the configuration settings.

Load the widget in the sign-in page, similar to the following snippet:

```html
<div id="content" class="ui padded relaxed">

      {{>formMessages}}

      <div id="okta-signin-widget-container"></div>

      <script type="text/javascript">
        const widgetConfig = {{{widgetConfig}}};
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
            console.log('Error happen in showSignInAndRedirect: ', err);
          });
      </script>

</div>
```

See [Okta Sign-In Widget Guide](/code/javascript/okta_sign-in_widget/) for more details.
