## Set up the configuration for your embedded Widget app

Begin to integrate the Sign-In Widget into your own app by following these steps:

#### 1: Set up your app with the prerequisites

1. In your Okta Org, [create a new application integration](/docs/guides/oie-embedded-common-org-setup/java/main/#create-a-new-application) for your app.
1. Ensure that you have all the [software requirements](#software-requirements).
1. Clone the [okta-idx-java](https://github.com/okta/okta-idx-java) repository.
1. Ensure that you've set the [dependencies](#software-requirements) in your project with the latest [Identity Engine Java SDK released version](https://github.com/okta/okta-idx-java/releases).
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/). You must use Sign-In Widget version 5.8 or above for Identity Engine features.

#### 2: Sourcing the Sign-In Widget from Okta CDN

Add the Sign-In Widget source to your JavaScript sign-in page by referencing the Okta content delivery network (CDN):

```javascript
<script src="https://global.oktacdn.com/okta-signin-widget/${SIWversion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${SIWversion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

Use the [latest version (`${SIWversion`})](https://github.com/okta/okta-signin-widget/releases/) of the Sign-In Widget in your app.

#### 3. Initializing the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app. In addition, you must set the `config.useInteractionCodeFlow=true` configuration option to enable Identity Engine features in the embedded Sign-In Widget.

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

Both the embedded authentication with SDK and the embedded Sign-In Widget sample apps use the Spring Boot framework with the Identity Engine Java SDK. Import the Okta API packages as well as any Spring Boot packages you need.

To run your app, ensure that you [set up the configuration for your embedded SDK app](#set-up-the-configuration-for-your-embedded-sdk-app) with one of the available options. See [Run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/java/main/#run-the-embedded-sdk-sample-app) for step-by-step instructions on how to run a sample app.