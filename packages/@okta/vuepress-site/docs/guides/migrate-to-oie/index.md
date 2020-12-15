---
title: Migrate to Okta Identity Engine
meta:
  - name: description
    content: Our guide shows how to migrate your organization and clients to OIE 
layout: Guides
---

## Enable OIE for your organization

To enable Okta Identity Engine, please reach out to your account manager. If you do not have an account manager, please reach out to oie@okta.com for more information.

## Enable `interaction code` grant

Once the Okta Identity Engine feature is enabled for your org, it should become active for Okta-hosted signin flows that do not involve an OAuth application. Enabling the `interaction_code` grant type will allow OAuth applications to use the Okta Identity Engine.

### Enable `interaction code` grant on an authorization server

1. Navigate to `Security > API > Authorization Servers` in the Admin UI
2. Select an authorization server and click the edit icon.
3. Click on `Access Policies` tab.
4. Edit `Default Policy Rule`.
5. In the section `IF Grant type is`, click the `Interaction Code` checkbox.

### Enable `interaction code` grant on an application

1. Navigate to `Applications > Applications` in the Admin UI
2. Click an application in the list
3. Click the `General` tab on the application detail
4. Click edit on the `General Settings` panel
5. In the section `Allowed grant types`, click the `Interaction Code` checkbox.

## Web clients

### Okta-hosted signin page (default)

For most authentication flows that involve redirecting to Okta, there should be no other changes needed. Once the feature is enabled, the Okta Identity Engine will be used automatically, by default.

### Customized signin page / custom domain

For most users of the [custom domain](/docs/guides/custom-url-domain/overview/) feature, there are no other changes needed. The default template will detect and use the Okta Identity Engine automatically.

However if you have [modified the template](https://developer.okta.com/docs/guides/style-the-widget/style-okta-hosted/) in certain ways, such as to perform redirects or set cookies, these modificiations may not be compatible with the Okta Identity Engine. In particular, use of these methods and objects may not work with OIE:

- setCookieAndRedirect
- sessionToken

In the default template, the `success` callback from `renderEl` is being handled by `OktaUtil.completeLogin`. This method correctly handles the authentication flow and we recommend using it.

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

### Embedded signin widget

Set the option `useInteractionCodeFlow` to `true` on the object passed to the Sign-In Widget constructor. This will enable Okta Identity Engine for the widget. Both the authorization server and the application must have the [interaction code](#enable-interaction-code-grant) grant type enabled.

> **Note:** Your code may break if it is calling the `renderEl` method and expects `sessionToken` or `session.setCookieAndRedirect` on the response object. Instead of `renderEl`, we recommend calling the `showSignInToGetTokens` method. This method receives and returns tokens without any browser redirect.

```javascript
var signIn = new OktaSignIn(
  {
    baseUrl: 'https://{yourOktaDomain}',
    clientId: '{{clientId of your OIDC app}}'
    redirectUri: '{{redirectUri configured in OIDC app}}'
    useInteractionCodeFlow: true
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

Javascript clients, whether browser-based or running in nodeJS, can use the [okta-idx-js](https://github.com/okta/okta-idx-js) and [okta-auth-js](https://github.com/okta/okta-auth-js) SDKs to authenticate using the interaction code flow.

```javascript
// Get PKCE params
const params = await oktaAuth.token.prepareTokenParams();
const { codeVerifier, codeChallenge, codeChallengeMethod } = params;

// Start IDX
const idxState = await idx.start({
  issuer,
  clientId,
  redirectUri,
  // ... other params for IDX
  // PKCE code challenge is needed for call to /interact
  codeChallenge,
  codeChallengeMethod,
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
