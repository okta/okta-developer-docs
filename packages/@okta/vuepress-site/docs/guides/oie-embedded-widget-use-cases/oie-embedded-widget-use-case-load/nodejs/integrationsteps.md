## Integration steps

### 1: Source the Sign-In Widget to your sign-in page

Add the Sign-In Widget source to your JavaScript sign-in page by referencing the Okta CDN.

```JavaScript
<!-- okta-signin-widget assets are avilable on CDN -->
<script src="https://global.oktacdn.com/okta-signin-widget/{{siwVersion}}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/{{siwVersion}}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

>**Note:** Ensure you use or reference the latest Sign-In Widget for `siwVersion`. The latest version is available on the Okta Sign-In Widget [repository](https://github.com/okta/okta-signin-widget/releases/).

### 2: Add JavaScript to initialize and load the Widget

Load the widget in the sign-in page, similar to the following snippet:

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

The `WidgetConfig` is referenced in the `login.js` file, which uses values defined in the `config.js` file:

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

The Okta Sign-In Widget renders in the sign-in page when the `router.get('/login', (req, res, next) =>` call is triggered.

```JavaScript
        res.render('login', {
        siwVersion: '{{siwVersion}}',
        widgetConfig: JSON.stringify(widgetConfig),
      });
```

### 3: Run your app

The final step is to run your app. If the Widget and your Okta org are properly configured, then the Okta Sign-In Widget appears in your sign-in page:

<div class="common-image-format">

![Displays the Widget in the sign-in page](/img/oie-embedded-sdk/oie-embedded-widget-use-case-load-screen-signin.png)

</div>

>**Note:** The Facebook, Sign Up, and Forgot password links are configurable elements in your
Okta org and may not show in screen.
