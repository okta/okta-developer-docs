---
title: Deprecated JavaScript functions in the Sign-In Widget
---

<ApiLifecycle access="ie" />

## Overview

After you upgrade your org to Okta Identity Engine, the [setCookieAndRedirect()](https://github.com/okta/okta-signin-widget#renderel) JavaScript function is deprecated from the Sign-In Widget. In the Classic Engine, having your app call the `setCookieAndRedirect()` function means that your app decides on the redirect. However, in the Identity Engine, your app shouldn’t assume whether it redirects as part of the flow. Administrators set sign-on policies in the [Okta Admin Console](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/procedures/set-up-default-app-redirect.htm). Instead of `setCookieAndRedirect`, use the `showSignIn` method in the Widget to resolve the returned promise&mdash;or redirect it&mdash;based on the Administrator’s policy.

> **Note:** In the Classic Engine, the `setCookieAndRedirect()` function is still available. It is only once you upgrade to the Identity Engine that it becomes deprecated.

> **Note:** For users of [Auth.js](https://github.com/okta/okta-auth-js), the `setCookieAndRedirect` method is also deprecated. However, as part of the upgrade, you need to use the `idx.authenticate` method. See [Migrate from authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md#new-methods).

## About showSignIn methods

`showSignIn` is one of three related methods. The following describes the methods and how they relate to redirects and the Sign-In Widget:

[showSignIn](https://github.com/okta/okta-signin-widget#showsignin) &mdash; Use this method for most use cases. On success, the promise resolves. On error, the promise is rejected. If a redirect, redirects to Okta or another identity provider (IdP). The responses and errors are the same as those for [renderEl](https://github.com/okta/okta-signin-widget#renderel).

[showSignInAndRedirect](https://github.com/okta/okta-signin-widget#showsigninandredirect) &mdash; Use this method to define the flow to always include a redirect. Often the best method for server-side web apps.

[showSignInToGetTokens](https://github.com/okta/okta-signin-widget#showsignintogettokens) &mdash; Use this method to define the flow to never include a redirect.

## Use the showSignIn method

Here is a code snippet that illustrates how to use `showSignIn`:

> **Note:** For response handling, use the `handleLoginRedirect` function. See [Auth.js API reference](https://github.com/okta/okta-auth-js#handleloginredirecttokens-originaluri).

```javascript
var signIn = new OktaSignIn({
   // Assumes there is an empty element on the page with an id of ‘osw-container’
  el: ‘#osw-container’,
  clientId: '${clientId of your OIDC app}',
  redirectUri: '${redirectUri configured in OIDC app}',
  baseUrl: ‘https://${yourOktaDomain},
  authParams: {
    issuer: 'https://${yourOktaDomain}/oauth2/default'
  }
});

oktaSignIn.showSignIn().then(response
=> {
oktaSignIn.authClient.handleLoginRedirect(res.tokens);
})
  .catch(function(error) {
    // This function is invoked with errors the widget cannot recover from:
    // Known errors: CONFIG_ERROR, UNSUPPORTED_BROWSER_ERROR
    console.log('login error', error);
  });
```