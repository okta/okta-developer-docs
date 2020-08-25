---
title: Cross-Site Cookie Blocking
---

# Cross-Site Cookie Blocking

Cross-site cookie blocking is a privacy-protection feature that is being added to web browsers like Safari and Firefox. It's likely to become common across most browsers in the future. It can disrupt certain customer-hosted flows in Okta.

## Description of the problem

Beginning from version 13.1, Safari [blocks third-party cookies by default](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/), disrupting Okta functionality in certain flows. Firefox and other browsers are in the process of rolling out a similar change.

This issue will not affect your organization if you use the Okta-hosted sign-in page and your app does not call the Sessions API from the browser. Customers who host their own sign-in functionality are affected.

When customer-hosted code makes a call to Okta that relies on an [Okta Session Cookie](/docs/guides/session-cookie/) being included in the HTTP request, the browser blocks the cookie from reaching Okta because the user is on the customer domain and the cookie is being sent to Okta, a different domain.

The specific functionality that is affected is session management, as well as token renewal in the OAuth 2.0 implicit flow and PKCE flow.

### Session management in customer-built applications

If you host your own sign-in page, and use a self-hosted instance of the Okta Sign-In Widget to sign users in, or rely on JavaScript running in the user’s browser to make calls to Okta to handle session management, functionality can be broken by the browser’s blocking of third-party cookies.

Okta session cookies that accompany XHR calls to Okta API endpoints like `/sessions/me` and `/user/me` are blocked by the browser because they are sent to a different domain than the one the user is on. Okta session cookies never get through to Okta, and Okta cannot complete the request.

The result is that Okta returns 403 Forbidden errors to the user or that your application repeatedly directs users back to the sign-in page.

Specifically, this problem affects [certain methods](https://github.com/okta/okta-auth-js#third-party-cookies) of the Okta Auth JavaScript SDK. The [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#okta-sign-in-widget) uses the affected Okta Auth JavaScript SDK methods internally. Any customer-developed code that directly makes XHR calls to the Okta [Sessions API](/docs/reference/api/sessions/) is also affected. 

### Token renewal in customer-built SPAs that use the OAuth 2.0 implicit flow or PKCE flow

If your code uses the OAuth 2.0 implicit flow or PKCE flow to handle token renewal (which typically occurs in the context of a SPA that uses the [implicit flow](/docs/guides/implement-implicit/) or [PKCE flow](/docs/guides/implement-auth-code-pkce/)), the user's browser can block Okta session cookies from being sent, so that token renewal is never successfully completed.

The result is that ID tokens and access tokens expire without being renewed, and users are prompted to sign in more frequently, with the frequency determined by the token expiry time.

## Workaround: Custom URL Domain

You can implement a workaround by using the [custom URL domain](/docs/guides/custom-url-domain/) feature.

By making your Okta org effectively part of the same domain as your application server from a browser’s perspective, use of custom URL domain moves Okta session cookies to a first-party context. Calls to Okta become calls within the same site, and browser third-party cookie blocking is no longer triggered.

For example, if your original Okta org is `companyname.okta.com`, and your app server is `app.companyname.com`, you would use the custom URL domain feature to give your Okta org a new URL like `login.companyname.com`. This puts your app and your Okta org within the same site.

It's okay for the Okta org and the app server to have different subdomains (in the above example, `app` and `login`). Only the effective Top-Level Domain plus the one label immediately to its left (eTLD+1) need to be the same (in the example, `companyname.com`).

After setting up custom URL domain, your need to update your configuration of the Okta Sign-In Widget and of any Okta SDKs, so that they use your new custom domain as the base URL of your org.

If your code makes any XHR calls directly to Okta endpoints, you need to update the URLs of those calls.

The following sections show examples of these changes. The examples assume your original Okta Org URL is `companyname.okta.com` and your custom URL domain is `login.companyname.com`.

### Sign-In Widget

For information on updating the configuration of the Okta Sign-In Widget, see [Sign-In Widget - Basic config options](https://github.com/okta/okta-signin-widget#basic-config-options).

Example change:

```diff
 var signIn = new OktaSignIn({
-  baseUrl: 'https://companyname.okta.com'
+  baseUrl: 'https://login.companyname.com'
 });
```

### Okta Auth JavaScript SDK

For information on updating the configuration of the Okta Auth JavaScript SDK, see the [Okta Auth JavaScript SDK - Configuration reference](https://github.com/okta/okta-auth-js/blob/master/README.md#configuration-reference).

Example change:

```diff
 var authClient = new OktaAuth({
-  issuer: 'https://companyname.okta.com/oauth2/default'
+  issuer: 'https://login.companyname.com/oauth2/default'
 });
```

### Okta React SDK 

For information on updating the configuration of the Okta React SDK, see the [Okta React SDK - Configuration options](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react#configuration-options).

Example change:

```diff
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';

class App extends Component {
   render() {
     return (
       <Router>
-        <Security issuer='https://companyname.okta.com/oauth2/default'
+        <Security issuer='https://login.companyname.com/oauth2/default'
                   clientId='{clientId}'
                   redirectUri={window.location.origin + '/implicit/callback'} >
           <Route path='/' exact={true} component={Home}/>
          <SecureRoute path='/protected' component={Protected}/>
          <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
      </Router>
    );
  }
}

```

###  Okta Angular SDK

For information on updating the configuration of the Okta Angular SDK, see the [Okta Angular SDK - Usage](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular#usage).

Example change:

```diff
import {
  OKTA_CONFIG,
  OktaAuthModule
 } from '@okta/okta-angular';
 
 const oktaConfig = {
-  issuer: 'https://companyname.okta.com/oauth2/default',
+  issuer: 'https://login.companyname.com/oauth2/default',
   clientId: '{clientId}',
   redirectUri: 'http:/app.companyname.com/implicit/callback',
   pkce: true
};

@NgModule({
  imports: [
    ...
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
})
export class MyAppModule { }
```

### Okta Vue SDK

For information on updating the configuration of the Okta Vue SDK, see the [Okta Vue SDK - Configuration](https://github.com/okta/okta-vue#configuration).

```diff
 import Auth from '@okta/okta-vue'
 
 Vue.use(Auth, {
-  issuer: 'https://companyname.okta.com/oauth2/default',
+  issuer: 'https://login.companyname.com/oauth2/default',
   clientId: '{clientId}',
   redirectUri: 'http://app.companyname.com/implicit/callback',
   scopes: ['openid', 'profile', 'email'],
```

### XHR Calls in your own code

For XHR calls in your own code, the base URL of the endpoint needs to change. For example, a call to `https:/companyname.okta.com/api/v1/sessions/me` would change to `https://login.companyname.com/api/v1/sessions/me`.

