## Integration steps

### Step 1: Source the Sign-In Widget to your sign-in page

Add the Sign-In Widget source to your JavaScript sign-in page by referencing the Okta CDN.

```javascript
<script src="https://global.oktacdn.com/okta-signin-widget/5.8.2/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/5.8.2/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

> **Note:** The previous snippet example uses Sign-In Widget, version `5.8.2`. Use the latest version of the Sign-In Widget found [here](https://github.com/okta/okta-signin-widget/releases/).

### Step 2: Add JavaScript to initialize and load the widget

Initialize the widget in the sign-in page, similar to the following snippet:

```javascript
<script th:inline="javascript">
    /*<![CDATA[*/

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
    /*]]>*/
</script>
```

The Okta Sign-In Widget renders in the sign-in page when the Spring controller `/custom-login` is triggered.

### Step 3: Run your app

The final step is to run your app. If the widget and your Okta org are correctly
configured, then the Okta Sign-In Widget displays in your sign-in page:

<div class="common-image-format">

![Widget load signin for Java](/img/oie-embedded-sdk/oie-embedded-widget-use-case-load-screen-signin-java.png
 "Widget load signin for Java")

</div>
