---
title: Before you begin
---
This guide shows you how to use Okta as the user store for your web application and sign users in.

If you are building a single-page (browser) app, see [Sign users in to your single-page application](/docs/guides/sign-into-spa/) instead. Or, if you are building a server that returns API responses (but not HTML), see [Protect your API endpoints](/docs/guides/protect-your-api/).

This guide assumes that you:

* Have an Okta Developer Edition organization. Don't have one? [Create one for free](https://developer.okta.com/signup).
* Know the basics of building Web applications.
* Have a project or application that you want to add authentication to.
* Are building a web app that's rendered by a server.

If you don't have an existing app, or are new to building apps, start with this documentation:

<StackSelector snippet="create-app"/>

## Refresh tokens and web apps

With browser-based apps, the risk of the refresh token being compromised is high when a persistent refresh token is used. This threat is greatly reduced by rotating refresh tokens. [Refresh token rotation](/docs/guides/refresh-tokens/refresh-token-rotation) helps a public client to securely rotate refresh tokens after each use. A new refresh token is returned each time the client makes a request to exchange a refresh token for a new access token. Refresh token rotation works with SPAs, native apps, and web apps in Okta.

See the [OAuth 2.0 for Browser-Based Apps specification](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-05#page-10) for the latest spec information on using refresh tokens with browser-based apps.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
