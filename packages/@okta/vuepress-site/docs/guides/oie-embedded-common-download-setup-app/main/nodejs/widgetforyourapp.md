## Set up the configuration for your embedded Widget app

### Embedded Sign-In Widget

> **Note:** "Embedded" means the Sign-In Widget is included directly in your application through npm module or script tag. The `@okta/okta-signin-widget` version 5.2.0 or above is needed to enable the interaction code flow.

Set the option `useInteractionCodeFlow` to `true` on the object passed to the Sign-In Widget constructor. This step enables the Identity Engine for the Widget. Both the Authorization Server and the application must have the [interaction code](#enable-interaction-code-grant) grant type enabled.

> **Note:** Your code may break if it is calling the `renderEl` method and expects `sessionToken` or `session.setCookieAndRedirect` on the response object. Instead of `renderEl`, we recommend calling the `showSignInToGetTokens` method. This method receives and returns tokens without any browser redirect.

```javascript
var signIn = new OktaSignIn(
  {
    baseUrl: 'https://${yourOktaDomain}',
    clientId: '{{clientId of your OIDC app}}'
    redirectUri: '{{redirectUri configured in OIDC app}}'
    useInteractionCodeFlow: true
    authParams: {
      issuer: 'https://${yourOktaDomain}/oauth2/default'
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
