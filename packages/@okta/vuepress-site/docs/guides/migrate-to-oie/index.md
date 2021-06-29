---
title: Upgrade to Identity engine
meta:
  - name: description
    content: Our guide shows how to upgrade your organization and clients to Identity engine
layout: Guides
---

<ApiLifecycle access="ie" /><br>

> **Limited GA:** Okta Identity Engine is under Limited General Availability (LGA) and currently available only to a selected audience.

## Enable Identity engine for your organization

To upgrade to Identity engine, contact your account manager. If you do not have an account manager, email <oie@okta.com> for more information.

## Enable interaction code grant

After the Identity engine feature is enabled for your org, it should become active for Okta-hosted sign-in flows that don't involve an OAuth application. Enabling the `interaction_code` grant type allows OAuth applications to use Identity engine.

### Enable interaction code grant on an authorization server

1. In the Admin Console, go to **Security** > **API** > **Authorization Servers**.
2. Select an authorization server and click the edit icon.
3. Click the **Access Policies** tab.
4. Edit the **Default Policy Rule**.
5. In the **IF Grant type is** section, click the **Interaction Code** check box.

### Enable interaction code grant on an application

1. In the Admin Console, go to **Applications** > **Applications**.
2. Click an application in the list.
3. Click the **General** tab on the application detail.
4. Click edit on the **General Settings** panel.
5. In the **Allowed grant types** section, click the **Interaction Code** check box.

## Web clients

### Okta-hosted sign-in page (default)

For most authentication flows that involve redirecting to Okta, there should be no other changes needed. After the feature is enabled, Identity engine will be used automatically, by default.

### Customized sign-in page / custom domain

For most users of the [custom domain](/docs/guides/custom-url-domain/overview/) feature, there are no other changes needed. The default template detects and uses Identity engine automatically.

However, if you have [modified the template](/docs/guides/style-the-widget/style-okta-hosted/) in certain ways (such as to perform redirects or set cookies), these modifications may not be compatible with Identity engine. In particular, these methods and objects won't work with Identity engine:

- `setCookieAndRedirect`
- `sessionToken`

In the default template, the `success` callback from `renderEl` is being handled by `OktaUtil.completeLogin`. This method correctly handles the authentication flow, and we recommend using it.

For reference, here is the default template:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />

    <title>{{pageTitle}}</title>
    {{{SignInWidgetResources}}}
</head>
<body>
    <div class="login-bg-image" style="background-image: {{bgImageUrl}}"></div>
    <div id="okta-login-container"></div>

    <!--
        "OktaUtil" defines a global OktaUtil object
        that contains methods used to complete the Okta login flow.
     -->
    {{{OktaUtil}}}

    <script type="text/javascript">
        // "config" object contains default widget configuration
        // with any custom overrides defined in your admin settings.
        var config = OktaUtil.getSignInWidgetConfig();

        // Render the Okta Sign-In Widget
        var oktaSignIn = new OktaSignIn(config);
        oktaSignIn.renderEl({ el: '#okta-login-container' },
            OktaUtil.completeLogin,
            function(error) {
                // Logs errors that occur when configuring the widget.
                // Remove or replace this with your own custom error handler.
                console.log(error.message, error);
            }
        );
    </script>
</body>
</html>
```

### Embedded Sign-In Widget

> **Note:** "Embedded" means the Sign-In Widget is included directly in your application through npm module or script tag. The `@okta/okta-signin-widget` version 5.2.0 or above is needed to enable the interaction code flow.

Set the option `useInteractionCodeFlow` to `true` on the object passed to the Sign-In Widget constructor. This enables Identity engine for the Widget. Both the authorization server and the application must have the [interaction code](#enable-interaction-code-grant) grant type enabled.

> **Note:** Your code may break if it is calling the `renderEl` method and expects `sessionToken` or `session.setCookieAndRedirect` on the response object. Instead of `renderEl`, we recommend calling the `showSignInToGetTokens` method. This method receives and returns tokens without any browser redirect.

```javascript
var signIn = new OktaSignIn(
  {
    baseUrl: 'https://{yourOktaDomain}',
    clientId: '{{clientId of your OIDC app}}'
    redirectUri: '{{redirectUri configured in OIDC app}}'
    useInteractionCodeFlow: true
    authParams: {
      issuer: 'https://{yourOktaDomain}/oauth2/default'
    }
    // other options...
  }
);

signIn.showSignInToGetTokens({
  // Assumes there is an empty element on the page with an id of 'osw-container'
  el: '#osw-container'
}).then(function(tokens) {
  // Store tokens
  signIn.authClient.tokenManager.setTokens(tokens);
  // Remove widget
  signIn.remove();
  // Can now render in an authenticated state
}).catch(function(error) {
  // Handle error
})
```

### Direct authentication

Javascript clients that do not wish to use the Sign-in Widget can use the [okta-idx-js](https://github.com/okta/okta-idx-js) and [okta-auth-js](https://github.com/okta/okta-auth-js) SDKs to authenticate using the interaction code flow.

```javascript
// Get PKCE params
const params = await oktaAuth.token.prepareTokenParams();
const { codeVerifier, codeChallenge, codeChallengeMethod } = params;

// API version is required
const version = '1.0.0';

// Start IDX
const idxState = await idx.start({
  issuer,
  clientId,
  redirectUri,
  version,
  // ... other params for IDX
  // PKCE code challenge is needed for call to /interact
  codeChallenge,
  codeChallengeMethod,
});

// based on the previous idxState.neededToProceed gather the needed data fields
// The needed fields will depend on the policy choices for your org and app
// How you build a UI and gather these fields is up to your application and is not shown here

// As an example, the `identify` step might need `identifier` and `rememberMe` fields
// Once you have those fields, send them to get the next set of remediation options

idxState = await idxState.proceed('identify', {
  identifier,
  rememberMe,
});

// If your policies allow for a simple username -> password flow, this might be the next step
// Again, building the UI and gathering the data will depend on the consumer application and is not shown here

idxState = await idxState.proceed('challenge-authenticator', {
  credentials: {
    passcode,
  },
});

// When idx reaches success state, use the interactionCode to obtain tokens
if (idxState.hasInteractionCode()) {
  const interactionCode = idxState.interactionCode;
  const { tokens } = await oktaAuth.token.exchangeCodeForTokens({
    codeVerifier,
    interactionCode
  });

  // Do something with tokens
  const { idToken, accessToken } = tokens;
}
```
