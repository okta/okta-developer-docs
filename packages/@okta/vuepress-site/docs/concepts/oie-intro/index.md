---
title: Okta Identity Engine overview
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

## What is Okta Identity Engine?

Okta Identity Engine is an authentication pipeline that gives you control over the user auth experience for your apps. Identity Engine provides solutions for use cases like passwordless authentication, zero trust architecture, and scalable identity management.

> **Note**: If you're an admin, or are looking for Identity Engine product docs, see the Identity Engine [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## Authentication deployment models

Choose an authentication deployment model based on the implementation requirements of your client app. To learn more about the differences between the deployment models, see [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/). For deployment model implementation details, see [Sign users in](/docs/guides/sign-in-overview/).

### Okta-hosted (redirect) Sign-In Widget

Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. We recommend the redirect model in most cases because it's both secure and fast to implement.

### Embedded Sign-In Widget

Embed the Sign-In Widget into your own code base to handle the authentication on your servers. Hosting the Sign-In Widget yourself provides a balance between complexity and customization.

### Embedded SDK-driven sign-in flow

Use our SDKs to create a custom embedded authentication experience. Custom embedded sign-in is the most complex and leaves you with the most responsibility, but offers the most control.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Custom authentication with Identity Engine

TBD: Make this a more thorough list of topics. Right now, it only covers new features and what's different from Classic Engine. Options for grouping: by use case or by related features.

### Customize emails based on app context

Identity Engine makes the app context available when a user enters an authentication flow. Dynamically customize email templates based on the app that triggers an email notification. Learn more about [customizing email notifications based on app context](/docs/guides/custom-email/main/#use-app-context).

### Use protocol-specific endpoints for app sign-in

TBD: Can't find much publicly-available information about app intent links. Ask more questions to understand this feature.

App intent links are protocol-specific endpoints that you can use to initiate a sign-in flow to an app. Both Identity Provider and Service Provider initiated flows are supported.

Example app intent link for a SAML app:
`http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`

Each app intent link location hosts the Okta Sign-In Widget for the app that the user is attempting to access. Identity Engine evaluates the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. All app intent links share a common rate limit bucket/group.

### Control app access with authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that model security outcomes for an app. Use authentication policies to change an app's authentication methods without making code changes. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. Authentication policies are shareable across apps.

Learn more:

* [Policies (high-level concept)](/docs/concepts/policies/)

* [Authentication policies product docs](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

### Mitigate automated attacks with CAPTCHA

CAPTCHA is a strategy to mitigate automated attacks by bots by verifying that users are human. Identity Engine integrates with CAPTCHA services for registration, sign-in, and account recovery.

Okta supports the following CAPTCHA services:

- [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
- [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)

>**Note:** Using any other CAPTCHA service could cause account lockout. Contact [Okta support](https://support.okta.com) if lockout occurs.

You can use hCAPTCHA or reCAPTCHA with the redirect or embedded authentication deployment models. See [Okta deployment models](/docs/concepts/redirect-vs-embedded/).

If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA works out of the box. If you use any other [Okta SDK](/code/), you need to implement CAPTCHA. For Okta API CAPTCHA details, see [CAPTCHAs](/docs/api/openapi/okta-management/management/tag/CAPTCHA/).

### Manage user interactions with the authorization server

The [Interaction Code grant type](/docs/concepts/interaction-code/) is an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard. For apps that use an embedded Okta Sign-In Widget or SDK deployment model, the Interaction Code grant type allows you to directly manage user interactions with the authorization server.

## Classic Engine customers

If you created your [Okta org](/docs/concepts/okta-organizations/) before March 1, 2022, you're probably using Classic Engine. If you're not sure, [check which Engine your org is running on](https://support.okta.com/help/s/article/How-to-Determine-Which-Engine-Your-Okta-Org-is-Running-On?language=en_US).

### Upgrade from Classic Engine to Identity Engine

To upgrade your Okta org to use Identity Engine, see the [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

If you're not ready to upgrade, we still support Classic Engine functionality, including Classic Engine org, v1 API, and SDKs.

### Classic Engine documentation

Our documentation supports Identity Engine by default, but we still provide information for Classic Engine users.

* Content for Identity Engine has a blue Identity Engine banner at the top.
* Content that works for both Identity Engine and Classic Engine has no banner.
* Content for Classic Engine that won't work in Identity Engine has a note at the top with details and, if applicable, a link to equivalent Identity Engine content.
* We also keep a [Classic Engine](/docs/guides/archive-overview/) version of our guides.
