Begin to integrate the Sign-In Widget into your own embedded app by following these steps:

1. [Set up your app with the prerequisites](#set-up-your-app-with-the-prerequisites), similar to the SDK embedded app prerequisites.
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/).
1. The embedded Sign-In Widget with SDK sample app uses the Spring Boot framework with the Identity Engine Java SDK. [Import the packages and add the Spring Boot framework](#import-the-packages-and-add-the-spring-boot-framework) packages that you require in your sign-in controllers.
1. [Source the Sign-In Widget from the Okta CDN](#source-the-sign-in-widget-from-the-okta-cdn).
1. [Initialize the Sign-In Widget](#initialize-the-sign-in-widget).

#### Source the Sign-In Widget from the Okta CDN

Add the Sign-In Widget source to your JavaScript sign-in page by referencing the Okta CDN:

```javascript
<script src="https://global.oktacdn.com/okta-signin-widget/${siwVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${siwVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

Use the [latest version (`${siwVersion}`)](https://github.com/okta/okta-signin-widget/releases/) of the Sign-In Widget in your app.

#### Initialize the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app. In addition, you must set the `useInteractionCodeFlow=true` configuration option to enable Identity Engine features in the embedded Sign-In Widget.

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

See [Okta Sign-In Widget Guide](/code/javascript/okta_sign-in_widget/) for more details.

Complete integrating your embedded app with the Identity Engine Java SDK libraries. See the [Basic sign-in flow using the Widget](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/java/main/) use case for a guide on how to handle the callback from the Sign-In Widget. Refer to the [Okta Java SDK Usage guide](https://github.com/okta/okta-idx-java#usage-guide) for more information on SDK usage.

Before running your app, ensure that you [set the configuration values](#set-the-configuration-values) for your app using the [Sign-In Widget environment variables](#sign-in-widget-environment-variables) or the [Sign-In Widget Java system properties](#sign-in-widget-java-properties). See [Run the embedded Widget sample app](/docs/guides/oie-embedded-common-run-samples/java/main/#run-the-embedded-widget-sample-app) for step-by-step instructions on how to run a sample app.
