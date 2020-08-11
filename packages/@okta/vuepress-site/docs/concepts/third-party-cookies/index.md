---
title: Cross-Site Cookie Blocking
---

# Cross-Site Cookie Blocking

Cross-site cookie blocking is a privacy-protection feature that is being added to web browsers like Safari and Firefox. It can disrupt certain customer-hosted flows in Okta.

## Description of the problem

Beginning from version 13.1, Safari [blocks third-party cookies by default](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/), disrupting Okta functionality in certain flows. Firefox is in the process of rolling out a similar change. This issue will not affect your organization if you use the Okta-hosted sign-in page. Only customers who host their own sign-in functionality can be affected.

When customer-hosted code makes a call to Okta that relies on an [Okta Session Cookie](/docs/guides/session-cookie/) being included in the HTTP request by the user’s browser, Safari blocks the cookie from reaching Okta because the user is on the customer domain and the cookie is being sent to Okta, a different domain.

The specific functionality that is affected is session management, as well as token renewal in the OAuth 2.0 implicit flow.

### Session management in customer-built applications

If you host your own sign-in page, and use a self-hosted instance of the Okta Sign-In Widget to sign users in, or rely on JavaScript running in the user’s browser to make calls to Okta to handle session management, functionality can be broken by Safari’s blocking of third-party cookies.

Okta session cookies that accompany XHR calls to Okta API endpoints like `/sessions/me` and `/user/me`	 are blocked by Safari because they are sent to a different domain than the one the user is on. Okta session cookies never get through to Okta, and Okta cannot complete the request.

The result is that Okta returns 403 forbidden errors to the user or repeatedly directs them back to the sign-in page.

Specifically, this problem affects [certain methods](https://github.com/okta/okta-auth-js#third-party-cookies) of the Okta Auth JavaScript SDK. The [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#okta-sign-in-widget) uses the affected Okta Auth JavaScript SDK methods internally. Any customer-developed code that directly makes XHR calls to the Okta [Sessions API](/docs/reference/api/sessions/) is also affected. 

### Token renewal in customer-built SPAs that use the OAuth 2.0 implicit flow

If your code uses the OAuth 2.0 implicit flow to handle token renewal (which typically occurs in the context of a SPA that uses the [implicit flow](/docs/guides/implement-implicit/)), Safari can block Okta session cookies from being sent, so that token renewal is never successfully completed.

The result is that ID tokens and access tokens expire without being renewed, and users are prompted to sign in more frequently, with the frequency determined by the token expiry time.

## Workaround: Custom URL Domain

You can implement a workaround by using the [custom URL domain](/docs/guides/custom-url-domain/) feature.

By making your Okta org effectively part of the same domain as your application server from a browser’s perspective, Custom URL Domain moves Okta session cookies to a first-party context. Calls to Okta become calls within the same site, and Safari third-party cookie blocking is no longer triggered.

For example, if your original Okta org is `companyname.okta.com`, and your app server is `app.companyname.com`, you would use the custom URL domain feature to give your Okta org a new URL like `auth.companyname.com`. This puts your app and your Okta org within the same site. It is okay for them to have different subdomains (in this example, `your-app` and `auth`); it is the domain that needs to be the same (in the example, `companyname.com`), in order for them to be considered as being on the same site.

After setting up Custom URL Domain, your need to update your configuration of the Okta Sign-In Widget and the the Okta Auth JavaScript SDK, if you use them, so that they use your new custom domain as the base URL of your org. If your code makes any XHR calls directly to Okta endpoints, you need to update the URLs of those calls.

 - For information on updating the configuration of the Okta Sign-In Widget, see <https://github.com/okta/okta-signin-widget#basic-config-options>

 - For information on updating the configuration of the Okta Auth JavaScript SDK, see <https://github.com/okta/okta-auth-js/blob/master/README.md>.

 - For XHR calls in your own code, the base URL of the endpoint needs to change. For example, a call to `https://example.okta.com/api/v1/sessions/me` would change to `https://subdomain.yourdomain.com/api/v1/sessions/me` (assuming your Custom URL domain is `subdomain.yourdomain.com`).

 
