### 1: Source the Sign-In Widget to your sign-in page

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, replacing `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

### 2: Add JavaScript to initialize and load the Widget

Load the Widget on the sign-in page, similar to the following snippet:

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

The `WidgetConfig` uses values defined in the `config.js` file and is referenced in the `login.js` file:

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
        otp,
        interactionHandle,
        codeChallenge,
        codeChallengeMethod,
      };
```

The Okta Sign-In Widget renders in the sign-in page when the `router.get('/login', (req, res, next) =>` call is triggered.

```JavaScript
        res.render('login', {
        siwVersion: '${widgetVersion}',
        widgetConfig: JSON.stringify(widgetConfig),
      });
```

### 3: Run your app

The final step is to run your app. If the Widget and your Okta org are properly configured, then the Okta Sign-In Widget appears in your sign-in page:

<div class="half">

![Screenshot of basic Okta Sign-In Widget](/img/siw/okta-sign-in-javascript.png)

</div>

>**Note:** The **Forgot password?** and **Sign Up** links are configurable elements in your
Okta org and may not show on the page.
