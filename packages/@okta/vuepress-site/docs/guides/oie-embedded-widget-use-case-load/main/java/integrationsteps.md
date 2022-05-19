### 1: Source the Sign-In Widget in your sign-in page

Add the Sign-In Widget source to your JavaScript sign-in page by referencing the Okta content delivery network (CDN):

```javascript
<script src="https://global.oktacdn.com/okta-signin-widget/5.8.2/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/5.8.2/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

> **Note:** The previous snippet example uses Sign-In Widget, version `5.8.2`. Use the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the Sign-In Widget in your app.

### 2: Add JavaScript to initialize and load the Widget

Initialize the Widget in the sign-in page, similar to the following snippet:

```javascript
<script th:inline="javascript">

    var config = {};

    config.baseUrl = /*[[${oktaBaseUrl}]]*/ 'https://{yourOktaDomain}';
    config.clientId = /*[[${yourAppClientId}]]*/ '{yourAppClientId}';
    config.redirectUri = /*[[${yourSignInRedirectId}]]*/ '{yourSignInRedirectId}';
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
