### 1: Source the Sign-In Widget in your sign-in page

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, replacing the `${widgetVersion}` property with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the Widget:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

You can find more info in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the Widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

### 2: Add JavaScript to initialize and load the Widget

Initialize the Widget in the sign-in page, similar to the following snippet:

```javascript
<script th:inline="javascript">

    var config = {};

    config.baseUrl = /*[[${oktaBaseUrl}]]*/ 'https://{yourOktaDomain}';
    config.clientId = /*[[${oktaClientId}]]*/ '{clientId}';
    config.redirectUri = /*[[${redirectUri}]]*/ '{redirectUri}';
    config.useInteractionCodeFlow = true;
    config.interactionHandle = /*[[${interactionHandle}]]*/ '{interactionHandle}';
    config.codeChallenge = /*[[${codeChallenge}]]*/ '{codeChallenge}';
    config.codeChallengeMethod = /*[[${codeChallengeMethod}]]*/ '{codeChallengeMethod}';
    config.redirect = 'always';
    config.authParams = {
        issuer: /*[[${issuerUri}]]*/ '{issuerUri}',
        pkce: true,
        state: /*[[${state}]]*/ '{state}' || false,
        nonce: /*[[${nonce}]]*/ '{nonce}',
        scopes: /*[[${scopes}]]*/ '[scopes]',
    };

    new OktaSignIn(config).showSignInAndRedirect(
        { el: '#sign-in-widget' },
        function (res) {}
    );
</script>
```

The Okta Sign-In Widget renders in the sign-in page when your app's sign-in page controller is triggered.

### 3: Run your app

The final step is to run your app. If the Widget and your Okta org are properly configured, then the Okta Sign-In Widget displays in your sign-in page:

<div class="common-image-format">

![Displays the Okta Sign-In Widget](/img/oie-embedded-sdk/oie-embedded-widget-use-case-load-screen-signin-java.png)

</div>
