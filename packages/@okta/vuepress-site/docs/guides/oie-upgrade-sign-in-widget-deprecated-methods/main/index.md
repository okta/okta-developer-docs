---
title: Deprecated JavaScript methods in the widget
---

<ApiLifecycle access="ie" />

This guide covers the JavaScript method that is deprecated from the Okta Sign-In Widget and describes how to use `showSignIn` (and related methods) instead.

---

#### Learning outcomes

Understand the `showSignIn` methods that are used in the widget so that you can set the redirect URI based on the sign-in policies that the administrator defines.

#### What you need

[Widget that is updated to the latest available release](/docs/guides/oie-upgrade-sign-in-widget/main/)

#### Sample code

[Code samples using showSignIn](#code-samples-using-showsignin)

---

## JavaScript sign-in method changes

After you upgrade your org to Okta Identity Engine, the [`setCookieAndRedirect`](https://github.com/okta/okta-signin-widget#renderel) JavaScript method is deprecated from the widget. In Okta Classic Engine, your app integration calls the `setCookieAndRedirect` method, which means that your app integration sets the redirect URI. However, in Identity Engine, your app integration shouldn't assume that it sets the redirect URI as part of the flow. Administrators set the sign-on policies in the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-policies). Instead of the `setCookieAndRedirect` method, use the `showSignIn` method to resolve the returned promise or redirect it, based on the administrator's policy.

> **Note:** In Classic Engine, the `setCookieAndRedirect` method is still available.

> **Note:** For users of the [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js), the `setCookieAndRedirect` method is also deprecated. However, as part of the upgrade, you need to use the `idx.authenticate` method. See the Okta Auth JavaScript SDK [migration doc](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md#new-methods).

## About showSignIn methods

There are three similar methods in the widget. `showSignIn` applies to most use cases, but you might want to use `showSignInAndRedirect` or `showSignInAndGetTokens()`. The following describes the methods and when to use them:

* [showSignIn](https://github.com/okta/okta-signin-widget#showsignin): Use this method for most use cases. On success, the Promise resolves. On error, the Promise is rejected. If the result is a redirect, the method redirects to Okta or another Identity Provider (IdP). The responses and errors are the same as those for [renderEl()](https://github.com/okta/okta-signin-widget#renderel).

* [showSignInAndRedirect](https://github.com/okta/okta-signin-widget#showsigninandredirect): Use this method to define the flow so that it always includes a redirect URI. This is the recommended method for server-side web apps.

* [showSignInToGetTokens](https://github.com/okta/okta-signin-widget#showsignintogettokens): Use this method to define the flow so that it never includes a redirect URI.

## Code samples using showSignIn

### Sample for a token flow

```javascript
var signIn = new OktaSignIn({
   // Assumes there is an empty element on the page with an ID of 'osw-container'  el: `#osw-container`,
   el: '#osw-container',
   clientId: `${clientId of your OIDC app integration}`,
   redirectUri: `${redirectUri configured in your OIDC app integration}`,
   baseUrl: `https://${yourOktaDomain}`,
   authParams: {
      issuer: `https://${yourOktaDomain}/oauth2/default`
   }
});

// Search for URL Parameters to see if a user is being routed to the app to recover password
var searchParams = new URL(window.location.href).searchParams;
oktaSignIn.otp = searchParams.get('otp');
oktaSignIn.state = searchParams.get('state');

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

> **Note:** For response handling, use the `handleLoginRedirect` method. See [Okta Auth API reference](https://github.com/okta/okta-auth-js#handleloginredirecttokens-originaluri).

### Sample for a basic redirect callback

```javascript
if (authClient.isLoginRedirect()) {
  const res = await authClient.token.parseFromUrl();
  authClient.tokenManager.setTokens(res.tokens);
}
```

### Sample for social authentication

```javascript
if (authClient.isLoginRedirect()) {
  if (authClient.isInteractionRequired()) {
    return showWidget(); // render the widget to continue the flow
  }
  const res = await authClient.token.parseFromUrl();
  authClient.tokenManager.setTokens(res.tokens);
}
```