---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

Okta Identity Engine is a new authentication pipeline that offers enhanced features and a more flexible approach to your authentication needs.

This overview covers the following topics:

* New features of Identity Engine
* Supported deployment models
* Documentation changes to support Identity Engine

> **Note**: For admin, or those who are looking for product documentation related to Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## New features of Identity Engine

Identity Engine introduces new capabilities, including the following:

* **App context in email templates**

  You can now access the app context during an authentication flow. Context variables in the email templates allow you to dynamically customize the email style and content based on the app that triggers the notification.

  For more information, see [Customize email notifications](https://developer.okta.com/docs/guides/custom-email/main/#use-app-context).

* **App intent links**

  App intent links are protocol-specific endpoints that initiate a sign-in flow for an app. Both Identity Provider and Service Provider initiated flows are supported.

  Example for an app intent link for a SAML application:
  `http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`

  Before Identity Engine, endpoints were accessible only with an active session, and unauthenticated users were redirected to a centralized sign-in page (`/login/login.htm`).

  With Identity Engine, each app intent link now directly hosts the sign-in experience, eliminating the need for a redirect to the centralized sign-in page. As a result, app intent links share a common rate limit bucket or group similar to the centralized sign-in page used in Classic Engine.

* **Authentication policies**

  Authentication policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that allow organizations to model security outcomes for an app. These policies can be shared across applications.   For example:
  * An organization can automatically step up authentication to a strong, non-phishable factor when elevated risk is detected.
  * Identity Engine allows you to create flexible apps that can change their authentication methods without modifying the code.

  For more information, see:

  * [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy)

  * [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

  * [Policies (high-level concept)](/docs/concepts/policies/)

* **CAPTCHA**

  CAPTCHA is a widely used strategy to mitigate bot attacks. Identity Engine integrates with leading CAPTCHA services for registration, sign-in, and account recovery.

  Okta supports the following CAPTCHA services:

  * [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
  * [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)


  >**Note:** Using any other CAPTCHA services may result in lockout. If this occurs, contact [Okta support](https://support.okta.com).

  You can either use hCAPTCHA or reCAPTCHA with the redirect or embedded authentication deployment models. See [Okta deployment models](/docs/concepts/redirect-vs-embedded/).

  If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA is ready to use. If you use any other [Okta SDK](https://developer.okta.com/code/), you need to implement CAPTCHA. See [CAPTCHAs](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CAPTCHA/).

* **Interaction Code grant type for embedded authentication**

  To offer a more customized user authentication experience, Okta introduces, the [Interaction Code grant type](/docs/concepts/interaction-code/), an extension of the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard. This grant type allows apps using an embedded Okta Sign-In Widget or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component, such as the Sign-In Widget.

## Authentication deployment models

The Identity Engine deployment model provides three approaches for user authentication:

* **Okta-hosted (redirect) Sign-In Widget**: This approach uses the Okta-hosted Sign-In Widget to authenticate users, then redirect back to your app. It is the recommended approach because it is more secure and easy to implement.
* **Embedded Sign-In Widget**: In this approach, the Sign-In Widget is embedded in your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: This approach uses Okta SDKs to create a custom authentication experience. It is the most complex option, but offers the most control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for implementation details.

## SDKs and sample apps

Okta offers a host of SDKs available for integrating new Identity Engine features into your apps using [Okta deployment models](#authentication-deployment-models). Additionally, sample apps are available to show how these features work in action.

* Browse our [SDKs and samples](https://developer.okta.com/code/)
* Set up and explore our [Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic Engine documentation approach

Okta is now transitioning to support Identity Engine by default, while still providing information for Classic Engine customer.
* Pages and sections covering Identity Engine features include a blue Identity Engine banner at the top.
* Content applicable to both Identity Engine and Classic Engine do not have a banner. Any slight differences are covered in the page text.
* Content written for Classic Engine has a note at the top explaining what doesn't work in Identity Engine and directs the Identity Engine customers to the appropriate resources.
* Guides are extensively updated to support Identity Engine, however a [Classic Engine](/docs/guides/archive-overview/) version is available if needed.

> **Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## Access and upgrade to Identity Engine

As of March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs, offering all new customers with access to the new features.

Classic Engine customers who want to upgrade their apps to Identity Engine, see [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/). For those who do not want to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.
