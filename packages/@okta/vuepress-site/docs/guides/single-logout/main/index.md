---
title: Configure Single Logout
excerpt: Configure Single Logout for your apps.
layout: Guides
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="ea" />

This guide discusses how to configure Single Logout (SLO) for your apps.

---

#### Learning outcome

Understand the purpose of Single Logout (SLO) and set it up for your app.

#### What you need

* [Okta Integrator Free Plan organization](https://developer.okta.com/signup)
* Existing SAML app and OpenID Connect (OIDC) app integrations to update for SLO. See [Create SAML app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-saml) or [Create OIDC app integrations](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard-oidc) if you don’t have configured app integrations.
* The SLO feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate the SLO feature, and enable.

---

## Overview

The Single Logout (SLO) feature allows a user to sign out of an SLO participating app on their device and end their Okta session. The user is then automatically signed out of all other SLO participating apps on other devices.

Okta supports Service Provider-initiated (SP-initiated) SLO for third-party SAML 2.0 and OpenID Connect (OIDC) apps. When an end user clicks the sign-out button in your app, the app directs the browser to Okta while making an inbound logout request. This indicates to Okta that the user wants to sign out of the app. In response, Okta ends the user’s Okta session.

The multiple device SLO feature supports outbound logout requests (IdP-initiated SLO) after the SP app makes the SP-initiated inbound logout request to Okta. Okta sends outbound logout requests to any other apps participating in SLO that didn't initiate the logout. This applies only to the downstream apps where the user has previously established a session. Requests are communicated from Okta to apps using front-channel logout, which means that the browser does the communicating.

SLO is especially useful in scenarios where users share computers or use public kiosks. A user may sign in to a computer portal, and then open multiple apps. The user sign-in process for each app happens behind the scenes.

Ideally, when the user wants to sign out, they should sign out of every app to keep the next user from accessing their information. But, most users don’t do that. SLO logs the user out of everything at once.

### Single Logout diagram

<div class="three-quarter">

![Flow diagram that displays three event examples of a multiple device single logout using three apps and including three Okta sessions](/img/slo-multiple-device.png)

</div>

**Event 1**

* The user signs out of App 1 using Browser 1.
* App 1 initiates the logout (SP-initiated) by sending a front-channel inbound logout request to Okta using Browser 1. For example:

    `GET https://{yourOktaDomain}/oauth2/v1/logout?id_token_hint=<idToken>&post_logout_redirect_uri=<configuredPostLogoutRedirectUri>&state=<someState>`

* Okta ends Okta Session 1. The user can still access Apps 2 and 3 within the scope of each app session.

**Event 2**

* Okta determines that Apps 2 and 3 were also part of Okta Session 1.
* Okta initiates the outbound logout request (IdP-initiated) to the downstream apps (Apps 2 and 3) in an embedded IFrame that’s invisible to the user. For example:

    `POST https://myapp.exampleco.com/slo/logout`

    > **Note:** This URL is whatever the `logoutRequestUrl` is that you [configure in the app integration](#configure-slo).

* Okta makes a GET or POST redirection request to App 1.
* If a downstream app is a SAML app, the SAML app makes a POST or REDIRECT request to the Okta `/app/{app}/{key}/slo/saml/callback` endpoint in response to the Okta outbound logout request. The SAML logout response is included in the request body.

> **Note:** Only Okta Session 1 is terminated. Okta Sessions 2 and 3 are still active despite Apps 2 and 3 no longer having a valid session in Browsers 2 and 3. It’s up to the apps to kill the sessions for that user.

**Event 3**

Because Apps 2 and 3 have sessions for the user in other browsers, and on other devices, the apps may terminate these sessions from the server side. When the user tries to use these apps in the respective browsers, the user discovers that the apps have invalidated the user’s browser sessions.

Downstream SAML apps terminate a specific session associated with the user or terminate all sessions associated with the user. This depends on whether `sessionIndex` (SAML) is included in the IdP-initiated logout request. For OIDC apps, this depends on whether the session ID (`sid`) and issuer (`iss`) are included.

## Configure SLO

SLO supports SAML apps, and web and single-page (SPA) OIDC apps. The following steps explain how to configure your apps for SLO.

### Update your <StackSnippet snippet="apptype" inline /> app integration to use SLO

Use the following steps to update your <StackSnippet snippet="apptype" inline /> app to use SLO:

1. In the Admin Console, go to **Applications** > **Applications**.
2. Select the <StackSnippet snippet="apptype" inline /> app that you want to update to use SLO.
3. On the **General** tab, in the <StackSnippet snippet="sectionname" inline /> section, click **Edit**.

<StackSnippet snippet="configureslo" />

### Use the API to update your <StackSnippet snippet="apptype" inline /> app integration

The following example shows you how to use the API to update your <StackSnippet snippet="apptypeapi" inline /> integration for SLO. <StackSnippet snippet="apispecific" inline />

<StackSnippet snippet="participateslonote" />

1. Send a GET app request and copy the response body for use in the PUT request.

    <StackSnippet snippet="getrequest" />

2. Update the response body by editing the <StackSnippet snippet="object" inline /> object:

    <StackSnippet snippet="properties" />
    <br>

    **Example request**

    <StackSnippet snippet="body" />

3. Use the updated response body in a PUT request.

    <StackSnippet snippet="putrequest" />
    <br>

    **Example response**

    <StackSnippet snippet="response" />

## Events

After Okta initiates the outbound logout request to downstream apps, Okta includes the number of OIDC and SAML app logouts that occurred with SLO. Those numbers are found in the System Log event `user.session.end` under `DebugData`:

* `TotalOidcLogoutRequests`: Lists the total number of logout requests for OIDC apps
* `TotalSamlLogoutRequests`: Lists the total number of logout requests for SAML apps

## See also

* Okta Developer blog that explains an [inbound single logout request using Spring Boot for an OIDC app](https://developer.okta.com/blog/2020/03/27/spring-oidc-logout-options)
* Spring Boot offers a [Spring Security SAML Extension](https://docs.spring.io/spring-security-saml/docs/current/reference/htmlsingle/#configuration-logout-global) that's configured for global logout.
