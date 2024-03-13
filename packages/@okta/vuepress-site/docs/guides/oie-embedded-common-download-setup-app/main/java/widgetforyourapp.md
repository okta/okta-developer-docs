Begin to integrate the Sign-In Widget into your own embedded app by following these steps:

1. [Set up your app with the prerequisites](#set-up-your-app-with-the-prerequisites), similar to the SDK embedded app prerequisites.
1. Ensure that you're using the [latest release of the Sign-In Widget](https://github.com/okta/okta-signin-widget/releases/).
1. The embedded Sign-In Widget with SDK sample app uses the Spring Boot framework with the Identity Engine Java SDK. [Import the packages and add the Spring Boot framework](#import-the-packages-and-add-the-spring-boot-framework) packages that you require in your sign-in controllers.
1. [Source the Sign-In Widget from the Okta CDN](#source-the-sign-in-widget-from-the-okta-cdn).
1. [Initialize the Sign-In Widget](#initialize-the-sign-in-widget).

#### Source the Sign-In Widget from the Okta CDN

Add the Sign-In Widget source to your sign-in page by referencing the Okta CDN, replacing `${widgetVersion}` with the [latest version](https://github.com/okta/okta-signin-widget/releases/) of the widget:

```html
<script src="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/js/okta-sign-in.min.js" type="text/javascript"></script>
<link href="https://global.oktacdn.com/okta-signin-widget/${widgetVersion}/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

See also [Using the Okta CDN](https://github.com/okta/okta-signin-widget#using-the-okta-cdn). The latest version of the widget is -=OKTA_REPLACE_WITH_WIDGET_VERSION=-.

#### Initialize the Sign-In Widget

When you initialize the Sign-In Widget on your sign-in page, you must configure it with all the required [configuration settings](#configuration-settings) for your app.

```html
<script th:inline="javascript">

    var config = {};

    config.baseUrl = /*[[${oktaBaseUrl}]]*/ 'https://{yourOktaDomain}';
    config.clientId = /*[[${oktaClientId}]]*/ '{clientId}';
    config.redirectUri = /*[[${redirectUri}]]*/ '{redirectUri}';
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

  const signIn = new OktaSignIn({
       el: '#sign-in-widget',
       ...config
  });

   // Search for URL Parameters to see if a user is being routed to the application to recover password
   var searchParams = new URL(window.location.href).searchParams;
   signIn.otp = searchParams.get('otp');
   signIn.state = searchParams.get('state');

   signIn.showSignInAndRedirect()
    .catch(err => {
      console.log('An error occurred in showSignInAndRedirect: ', err);
    });
</script>
```

See [Okta Sign-In Widget Guide](/code/javascript/okta_sign-in_widget/) for more details.

> **Important**: In Okta Sign-In Widget version 7+, Identity Engine is enabled by default. If you are using an earlier version than 7, you must explicitly enable Identity Engine features by setting `config.useInteractionCodeFlow = true;` in the configuration settings shown above. If you are using version 7+ and you want to use Okta Classic Engine rather than Identity Engine, specify `config.useClassicEngine = true;` in the configuration settings.

Complete integrating your embedded app with the Identity Engine Java SDK libraries. See the [Basic sign-in flow using the widget](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/java/main/) use case for a guide on how to handle the callback from the Sign-In Widget. Refer to the [Okta Java SDK Usage guide](https://github.com/okta/okta-idx-java#usage-guide) for more information on SDK usage.

Before running your app, ensure that you [set the configuration values](#set-the-configuration-values) for your app using the [Sign-In Widget environment variables](#sign-in-widget-environment-variables) or the [Sign-In Widget Java system properties](#sign-in-widget-java-properties). See [Run the embedded Widget sample app](/docs/guides/oie-embedded-common-run-samples/java/main/#run-the-embedded-widget-sample-app) for step-by-step instructions on how to run a sample app.
