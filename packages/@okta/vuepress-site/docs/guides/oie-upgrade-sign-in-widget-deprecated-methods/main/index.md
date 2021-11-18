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

[Code samples using showSignIn()](#code-samples-using-showsignin)

---

## JavaScript sign-in method changes

After you upgrade your org to Okta Identity Engine, the [setCookieAndRedirect()](https://github.com/okta/okta-signin-widget#renderel) JavaScript method is deprecated from the Sign-In Widget. In the Classic Engine, your app integration calls the `setCookieAndRedirect()` method which means that your app integration sets the redirect URI. However, in the Identity Engine, your app integration shouldn't assume whether it sets the redirect URI as part of the flow. Administrators set the sign-in policies in the [Okta Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-policies). Instead of the `setCookieAndRedirect()` method, use the `showSignIn()` method to resolve the returned promise or redirect it, based on the Administrator's policy.

```javascript
  el: `#osw-container`,
  clientId: `${clientId of your OIDC app integration}`,
  redirectUri: `${redirectUri configured in your OIDC app integration}`,
  baseUrl: `https://${yourOktaDomain}`,
=======
   // Assumes there is an empty element on the page with an id of 'osw-container'
  el: '#osw-container',
  clientId: '${clientId of your OIDC app integration}',
  redirectUri: '${redirectUri configured in your OIDC app integration}',
  baseUrl: 'https://${yourOktaDomain},
>>>>>>> 902d8c1a57d84a6e55bb6f40373e0fb37d61dffa
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
