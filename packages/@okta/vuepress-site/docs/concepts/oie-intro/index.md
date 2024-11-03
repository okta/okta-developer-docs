---
title: Okta Identity Engine overview
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

## What is the Okta Identity Engine?

Okta Identity Engine is an authentication pipeline that gives you flexibility in your auth implementation. All new [Okta orgs](/docs/concepts/okta-organizations/) have access to Identity Engine features, including:

* TBD
* TBD

> **Note**: If you're an admin, or are looking for Identity Engine product docs, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## Authentication deployment models

Choose an authentication deployment model based on the implementation requirements of your client app.

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. We recommend the redirect model in most cases since it's both secure and fast to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. Hosting the Sign-In Widget yourself provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a custom embedded authentication experience. Custom embedded sign-in is the most complex and leaves you with the most responsibility, but offers the most control.

For details about the differences between the deployment models, see [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/). For deployment model implementation details, see [Sign users in](/docs/guides/sign-in-overview/).

## Identity Engine features

TBD 

### App context in email templates

Identity Engine makes the app context available when a user enters an authentication flow. Find context variables in our email templates. These variables allow customers to dynamically customize email style and content based on the app that triggers an email notification.

See [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context).

### App intent links

App intent links are protocol-specific endpoints that you can use to initiate a sign-in flow to an app. Both Identity Provider and Service Provider initiated flows are supported.

Example app intent link for a SAML application:
`http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`

Each app intent link location hosts the Okta Sign-In Widget for the app that the user is attempting to access. Identity Engine evaluates the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. Your app intent links share a common rate limit bucket/group.

### Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that organizations use to model security outcomes for an app. Authentication policies are shareable across applications. You can configure your apps to change their authentication methods without making code changes. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected.

* [Policies (high-level concept)](/docs/concepts/policies/)

* [Authentication policies product docs](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

### CAPTCHA

CAPTCHA is a strategy to mitigate spam and attacks by bots by verifying that a user is human. Identity Engine integrates with CAPTCHA services for registration, sign-in, and account recovery.

Okta supports the following CAPTCHA services:

- [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
- [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)

>**Note:** Using any other CAPTCHA service could lead to lockout. Contact [Okta support](https://support.okta.com) if lockout occurs.

You can use either hCAPTCHA or reCAPTCHA with the redirect or embedded authentication deployment models. See [Okta deployment models](/docs/concepts/redirect-vs-embedded/).

If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA works out of the box. If you use any other [Okta SDK](/code/), you need to implement CAPTCHA. For Okta API CAPTCHA details, see [CAPTCHAs](/docs/api/openapi/okta-management/management/tag/CAPTCHA/).

### Interaction Code grant type for embedded authentication

The [Interaction Code grant type](/docs/concepts/interaction-code/) is an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard. Apps using an embedded Okta Sign-In Widget and/or SDK can manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).

## SDKs and sample apps

Okta provides SDKs to integrate Identity Engine features into your app for a custom embedded sign-in flow. For an overview of the different deployment models, see [Authentication deployment models](#authentication-deployment-models).

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Classic Engine customers

If you created your [Okta orgs](/docs/concepts/okta-organizations/) before March 1, 2022, you're probably using Classic Engine. You can [check which Engine your org is running on](https://support.okta.com/help/s/article/How-to-Determine-Which-Engine-Your-Okta-Org-is-Running-On?language=en_US).

### Upgrade from Classic Engine to Identity Engine

To upgrade your Okta org to use Identity Engine, start with the [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

If you're not ready to upgrade, we still support Classic Engine functionality, including Classic Engine org, v1 API, and SDKs.

### Classic Engine documentation

While our documentation supports Identity Engine by default, we still provide information for Classic Engine users.

* Content for Identity Engine has a blue Identity Engine banner at the top.
* Content that works for both Identity Engine and Classic Engine has no banner.
* Content for Classic Engine that won't work in Identity Engine has a note at the top with details and, if applicable, a link to equivalent Identity Engine content.
* We also keep a [Classic Engine](/docs/guides/archive-overview/) version of our guides.
