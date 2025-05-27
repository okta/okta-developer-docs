---
title: Configure Single Logout
excerpt: Configure Single Logout for your apps or identity providers.
layout: Guides
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="ea" />

This guide discusses how to configure the Single Logout (SLO) feature for your <StackSnippet snippet="aori" inline />.

---

#### Learning outcome

Understand the purpose of Single Logout (SLO) and set it up for your <StackSnippet snippet="aori" inline />.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Existing <StackSnippet snippet="appidp" inline /> to update for SLO. See <StackSnippet snippet="appidp" inline /> if you don’t have one configured.
* <StackSnippet snippet="feature" inline />.

---

## Overview

<StackSnippet snippet="overview" />

### <StackSnippet snippet="sloorsloidp" inline /> diagram

<div class="three-quarter">

![Flow diagram that displays three event examples of a multiple device single logout using three apps and including three Okta sessions](/img/slo-multiple-device.png)

</div>

**Event 1**

* The user signs out of App 1 using Browser 1.
* App 1 initiates the logout (SP-initiated) by sending a front-channel inbound logout request to Okta using Browser 1. For example:

    `GET https://{yourOktaDomain}/oauth2/v1/logout?id_token_hint=<idToken>&post_logout_redirect_uri=<configuredPostLogoutRedirectUri>&state=<someState>`

* Okta ends Okta session 1. The user can still access Apps 2 and 3 within the scope of each app session.

**Event 2**

* Okta determines that Apps 2 and 3 were also part of Okta session 1.
* Okta initiates the outbound logout request (IdP-initiated) to the downstream apps (Apps 2 and 3) in an embedded IFrame that’s invisible to the user. For example:

    `POST https://myapp.exampleco.com/slo/logout`

    > **Note:** This URL is whatever the `logoutRequestUrl` is that you [configure in the app integration](#configure-slo).

* Okta makes a GET or POST redirection request to App 1.
* If a downstream app is a SAML app, the SAML app makes a POST or REDIRECT request to the Okta `/app/{app}/{key}/slo/saml/callback` endpoint in response to the Okta outbound logout request. The SAML logout response is included in the request body.

> **Note:** Only Okta session 1 is terminated. Okta Sessions 2 and 3 are still active despite Apps 2 and 3 no longer having a valid session in Browsers 2 and 3. It’s up to the apps to kill the sessions for that user.

**Event 3**

Because Apps 2 and 3 have user sessions in other browsers, and on other devices, the apps may terminate these sessions from the server side. When the user tries to use these apps in the respective browsers, the user discovers that the apps have invalidated the user’s browser sessions.

Downstream SAML apps terminate a specific session associated with the user or terminate all sessions associated with the user. This depends on whether `sessionIndex` (SAML) is included in the IdP-initiated logout request. For OIDC apps, this depends on whether the session ID (`sid`) and issuer (`iss`) are included.

## Configure <StackSnippet snippet="sloorsloidp" inline />

<StackSnippet snippet="intro" />

<StackSnippet snippet="updateapporidp" />

## Events

After Okta initiates the outbound logout request to downstream apps, Okta includes the number of OIDC and SAML app logouts that occurred with SLO. Those numbers are found in the System Log event `user.session.end` under `DebugData`:

* `TotalOidcLogoutRequests`: Lists the total number of logout requests for OIDC apps
* `TotalSamlLogoutRequests`: Lists the total number of logout requests for SAML apps

## See also

* Okta developer blog that explains an [inbound single logout request using Spring Boot for an OIDC app](https://developer.okta.com/blog/2020/03/27/spring-oidc-logout-options)
* Spring Boot offers a [Spring Security SAML Extension](https://docs.spring.io/spring-security-saml/docs/current/reference/htmlsingle/#configuration-logout-global) that's configured for global logout.
