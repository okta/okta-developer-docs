---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---

<ApiLifecycle access="ie" />

Okta Identity Engine allows organizations to customize their Okta cloud components and satisfy an unlimited number of identity use cases. Instead of relying on predefined behavior for identification, authorization, and enrollment, Identity Engine offers customizable building blocks that can support dynamic, app-based user journeys.

This topic covers the following information:
* Identity Engine new features
* Authentication deployment models
* How to upgrade to Identity Engine
* Identity Engine versus Classic Engine documentation approach

For more information related to Identity Engine and to determine your Okta version, refer to the  [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) page.

## Identity Engine new features

Identity Engine unlocks the following new capabilities.

| Feature | Description|
:-------- | :--------- |
| App context in email templates | Identity Engine makes the app context available when a user enters an authentication flow. Context variables are available in our email templates, allowing customers to dynamically customize email style and content based on the app that an email notification is triggered from.<br /><br />For more information, refer to the [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context) page. |
| App intent links | App intent links are used to signal intent to access an application. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an application. Identity Engine supports both Identity Provider and Service Provider initiated flows.<br /><br />Example app intent link for a SAML application:<br />`http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml`<br /><br />Prior to Identity Engine, these endpoints were accessible only with a session. Unauthenticated traffic was redirected to a centralized sign-in page (`/login/login.htm`) with a `fromUri` that represented the app that was originally attempted (the app intent link). This redirect occurred before the request was assessed for rate limiting. A session was established and the request was processed. The user was then redirected to the relevant app intent link through an intermediate redirect to the generic app single-sign on endpoint (`/app/${app}/${instanceId}/${linkName}`). The app intent link endpoint validated that the user was assigned to the application, and then enforced the app sign-on policy.<br /><br />Identity Engine changed the way Okta processes these requests. Identity Engine no longer forwards requests to the centralized sign-in page (`/login/login.htm`). Instead, the app intent links location hosts the widget/sign-in experience for the app that the user is attempting to access and evaluates the global session policy, authentication policy, and all other policies relevant to the sign-in experience. Since each app intent link is responsible for hosting the sign-in experience on Identity Engine, they share a common app intent link rate limit bucket/group similar to what existed for the centralized sign-in page on Classic Engine.|
| Authentication policies |Authentication policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that allow organizations to model security outcomes for an application. These policies are shareable across applications. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. Additionally, Identity Engine allows you to create flexible applications that can change their authentication methods without having to alter a line of code.<br />**Related topics**<br />* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)<br />* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)<br />* [What are policies](/docs/concepts/policies/)|
|CAPTCHA|CAPTCHA is a well-known strategy for mitigating attacks by bots. Identity Engine offers registration, sign-in, and account recovery integration of the two market-leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These are usable through the Okta-hosted and embedded Sign-In Widgets, but not Software Development Kits (SDKs).|
|Interaction code grant type for embedded authentication|To enable a more customized user authentication experience, Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows applications using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).|

## Authentication deployment models

You can divide the Identity Engine user authentication deployment model into three approaches:

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This approach is recommended as it's the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This approach provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a completely custom authentication experience. This approach is the most complex and leaves you with the most responsibility, but offers the most control.

**Related topics**
* [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/)
* [Sign users in overview](/docs/guides/sign-in-overview/)
* [SDKs and tools](/code/)
* [Download and set up the SDK, Sign-In Widget, and sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Upgrade to Identity Engine

As of March 1, 2022, all new [Okta organizations (orgs)](/docs/concepts/okta-organizations/) are Identity Engine orgs, so that all new customers can take advantage of the new features.

If you are a Classic Engine customer who wants to upgrade their apps to use Identity Engine, refer to the [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/) page.

For Classic Engine customers who don't yet want to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.


## Identity Engine versus Classic Engine documentation approach

By default, our documentation supports Identity Engine. However, we still provide information for Classic Engine users as follows:

* Pages and page sections covering features that only work in Identity Engine have a blue Identity Engine banner at the top.
* Content that works in both Identity Engine and Classic Engine have no banner. Any slight differences are covered in the page text.
* Content written for Classic Engine, that won't work in Identity Engine, has a note at the top that explains what the issue is, and, if appropriate, where Identity Engine users can go to find support.
* For guides that were extensively updated to support Identity Engine, we keep the Classic Engine version in the [Okta Classic Engine overview](/docs/guides/archive-overview/) section, so it's still accessible if needed.

> **Note**: To determine your Okta version, refer to the [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) page.

