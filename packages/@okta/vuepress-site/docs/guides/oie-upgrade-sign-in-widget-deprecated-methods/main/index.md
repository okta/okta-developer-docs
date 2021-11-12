---
title: Deprecated JavaScript methods in the Sign-In Widget
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

This guide covers the Javascript method that is deprecated from the Sign-In Widget and describes how to use the `showSignIn()` method instead.

---

**Learning outcomes**

Understand the `showSignIn` methods that are used in the Sign-In Widget so that you can set the redirect URI based on the sign-in policies that the Administrator defines.

**What you need**

* [Okta Sign-In Widget that is updated to the latest available release](/docs/guides/oie-upgrade-sign-in-widget/main/)

**Sample code**

n/a

---

## JavaScript sign-in method changes

After you upgrade your org to Okta Identity Engine, the [setCookieAndRedirect()](https://github.com/okta/okta-signin-widget#renderel) JavaScript method is deprecated from the Sign-In Widget. In the Classic Engine, your app integration calls the `setCookieAndRedirect()` method which means that your app integration sets the redirect URI. However, in the Identity Engine, your app integration shouldn't assume whether it sets the redirect URI as part of the flow. Administrators set the sign-in policies in the [Okta Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-policies). Instead of the `setCookieAndRedirect()` method, use the `showSignIn()` method to resolve the returned promise or redirect it, based on the Administrator's policy.

> **Note:** In the Classic Engine, the `setCookieAndRedirect()` method is still available.
> **Note:** For users of [Auth.js](https://github.com/okta/okta-auth-js), the `setCookieAndRedirect()` method is also deprecated. However, as part of the upgrade, you need to use the `idx.authenticate()` method. See [Migrate from authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md#new-methods).
## About showSignIn methods

The `showSignIn` method is one of three similar methods in the Sign-In Widget:

* [showSignIn()](https://github.com/okta/okta-signin-widget#showsignin) &mdash; use this method for most use cases. On success, the Promise resolves. On error, the Promise is rejected. If the result is a redirect, the method redirects to Okta or another Identity Provider (IdP). The responses and errors are the same as those for [renderEl()](https://github.com/okta/okta-signin-widget#renderel).

* [showSignInAndRedirect()](https://github.com/okta/okta-signin-widget#showsigninandredirect) &mdash; use this method to define the flow so that it always includes a redirect URI. This is the recommended method for server-side web apps.

* [showSignInToGetTokens()](https://github.com/okta/okta-signin-widget#showsignintogettokens) &mdash; use this method to define the flow so that it never includes a redirect URI.

## Use the showSignIn() method

The following code sample shows how to use `showSignIn()` to handle a token flow:

```javascript
var signIn = new OktaSignIn({
   // Assumes there is an empty element on the page with an id of 'osw-container'
  el: '#osw-container',
  clientId: '${clientId of your OIDC app integration}',
  redirectUri: '${redirectUri configured in your OIDC app integration}',
  baseUrl: 'https://${yourOktaDomain}',
  authParams: {
    issuer: `https://${yourOktaDomain}/oauth2/default`
  }
});

oktaSignIn.showSignIn().then(response
=> {
oktaSignIn.authClient.handleLoginRedirect(res.tokens);
})
  .catch(function(error) {
    // This function causes errors from which the widget can't recover.
    // Known errors: CONFIG_ERROR, UNSUPPORTED_BROWSER_ERROR
    console.log('login error', error);
  });
```

> **Note:** For response handling, use the `handleLoginRedirect()` method. See [Auth.js API reference](https://github.com/okta/okta-auth-js#handleloginredirecttokens-originaluri).

The following shows a basic redirect callback:
```javascript
if (authClient.isLoginRedirect()) {
  const res = await authClient.token.parseFromUrl();
  authClient.tokenManager.setTokens(res.tokens);
}
```

The following shows how to handle social authentication with the embedded Widget:
```javascript
if (authClient.isLoginRedirect()) {
  if (authClient.isInteractionRequired()) {
    return showWidget(); // render the widget to continue the flow
  }
  const res = await authClient.token.parseFromUrl();
  authClient.tokenManager.setTokens(res.tokens);
}
```
