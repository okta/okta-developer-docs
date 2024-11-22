---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Learn more about Okta Identity Engine — an authentication pipeline for building identity and access management processes with greater flexibility and control. Get familiar with Identity Engine features and deployment models.
---

<ApiLifecycle access="ie" />

Okta Identity Engine is an authentication pipeline that enables organizations to build identity and access management processes with greater flexibility and control. It offers customizable building blocks that can support dynamic, app-based user journeys, satisfying an unlimited number of identity use cases.

> **Note**: If you're an admin, or are looking for product docs about Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

With Identity Engine, you can use context about the user, device, app, network, and intent to evaluate policies, trigger Hooks, publish events, prompt users for action, or direct users to an external service.

## Key features

### App context in email templates

Identity Engine makes app context available when a user enters an authentication flow, enabling you to customize email notifications based on the app that triggers them. You can use context variables in email templates to dynamically adjust the email style and content, providing a more personalized user experience.

For more details, see [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context).

### App intent links

App intent links are protocol-specific endpoints that initiate a sign-in flow to an app. They signal an intent to access an app and support both Identity Provider (IdP) and Service Provider (SP) initiated flows. For a SAML application, an example app intent link looks as follows: `http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`.

With Identity Engine, Okta doesn't forward requests to the centralized sign-in page. Instead, the app intent link location serves as the host for the widget or sign-in experience of the app the user is trying to access. When a user is trying to sign in, Identity Engine evaluates the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. App intent links share a common rate limit bucket or group.

### Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that allow organizations to model security outcomes across applications. For example, you can automatically elevate authentication to a strong non-phishable factor when elevated risk is detected. With Identity Engine, you can create flexible apps that can change their authentication methods without having to edit code.

To learn more, refer to the following resources:

- [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

- [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

- [Policies (high-level concept)](/docs/concepts/policies/)

### CAPTCHA

To mitigate bot attacks, Identity Engine is integrated with leading CAPTCHA services for registration, sign-in, and account recovery. Okta supports:

- [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
- [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)

You can use either hCAPTCHA or reCAPTCHA with the redirect or embedded authentication [deployment models](/docs/concepts/redirect-vs-embedded/).

If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA works out of the box. If you use any other [Okta SDK](/code/), you need to [implement CAPTCHA](/docs/api/openapi/okta-management/management/tag/CAPTCHA/).

>**Note:** Using any other CAPTCHA type could lead to lockout. If lockout occurs, contact [Okta support](https://support.okta.com).

### Interaction Code grant type for embedded authentication

Identity engine supports [Interaction Code grant type](/docs/concepts/interaction-code/) — Okta's extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard.

To enable a more customized user authentication experience, Okta introduced an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). It allows apps that use an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, instead of relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).

## Authentication deployment models

Identity Engine supports three deployment models for user authentication:

* **Okta-hosted (redirect) Sign-In Widget** (recommended): Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This approach is the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. It provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

For an overview of the different deployment models, see [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/). For implementation details, refer to [Sign users in](/docs/guides/sign-in-overview/).

## SDKs and sample apps

Okta has SDKs available for integrating Identity Engine features into your apps using [Okta deployment models](#authentication-deployment-models). You can see them in action in sample apps.

* [Browse SDKs and samples](/code/)
* [Set up and explore Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic Engine

All new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs and can use the Identity Engine features right away.

Okta Classic Engine remains fully functional, including the Classic Engine org, v1 API, and SDKs. If you want to upgrade your apps to Identity Engine to benefit from its features, see [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

