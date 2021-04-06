---
title: Before you begin
---
This guide shows you how to use Okta as the user store for your single-page application and sign users in.

If you are building a web application rendered by a server, see [Sign users in to your web application](/docs/guides/sign-into-web-app/) instead.

This guide assumes that you:

* Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Know the basics of building JavaScript applications.
* Have a project or application that you want to add authentication to.

If you don't have an existing app, or are new to building apps, start with this documentation:

<StackSelector snippet="create-app"/>

## Refresh tokens and SPAs

Using long-lived refresh tokens with SPAs has long been considered insecure because there is no way to safely store a persistent refresh token in a browser and assure access by only the intended app. This makes the SPA susceptible to token theft. Additionally, it is usually undesirable to redirect the user to a sign-in page during normal navigation. To avoid this disruptive redirection, the `/authorize` endpoint allows the use of a request parameter called `prompt`. If the value of the `prompt` parameter is `none`, this guarantees that the user won't be prompted to sign in, regardless of whether they have an active session. Instead, your application either silently obtains the requested tokens or an OAuth error response occurs. Until now, the `prompt` parameter was the only way for a SPA to maintain user sessions without prompting the user to sign in multiple times.

The introduction of browser privacy controls such as Intelligent Tracking Prevention (ITP) and Enhanced Tracking Prevention (ETP) affect how browsers handle third-party cookies. These browser privacy controls prevent the use of an Okta session cookie to silently renew user sessions, which forces the user to reauthenticate and takes away the seamless user experience. [Refresh token rotation](/docs/guides/refresh-tokens/overview/) provides a solution for SPAs to maintain user sessions in an ITP browser world. Since refresh tokens are independent of any cookies, you don't have to rely on an Okta session cookie to renew access and ID tokens.

> **Note:** You can still use the Okta session cookie and silently renew the tokens as long as the application and Okta are in the same domain.

See the [OAuth 2.0 for Browser-Based Apps specification](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-05#page-10) for the latest spec information on using refresh tokens with browser-based apps.

## Support

If you need help or have an issue, post a question on the [Okta Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
