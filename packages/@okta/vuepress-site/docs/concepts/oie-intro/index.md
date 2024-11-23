---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Okta Identity Engine is a new authentication pipeline that provides flexible and advanced authentication features. Learn more about the Identity Engine, key features and how to implement it in your organization.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

Okta Identity Engine is a new authentication pipeline that enables organizations to customize Okta cloud components and satisfy unlimited identity use cases. Instead of relying on predefined behavior for identification, authorization, and enrolment, Identity Engine offers customizable building blocks to support dynamic, app-based user journeys.

## Okta Identity Engine versus Okta Classic Engine

| Aspect    | Classic Engine | Identity Engine  |
| :-------- | :------------------ | :-------------------- |
| Customization  | Limited customization for access policies and workflows   | Highly flexible with API-driven configurations and tailored policies for specific security and compliance needs |
| Developer support | Minimal tools for programmatic configuration or integration    | Strong support for developers with tools for complex policy definitions and seamless modern integrations |
| Platform approach    | Legacy platform with predefined configurations and policies    | Modern platform emphasizing flexibility, dynamic authorization, and contextual access |
| Policy enforcement | Enforces app-specific policies after session creation and redirection | Evaluates policies (for example, global session, authentication) during the initial interaction with app intent links |
| Rate limit | Centralized sign-in page assesses rate limits before app intent link validation | App intent links share a common rate limit group, integrated with policy evaluation during the request |
| Sign-in flow | Requires multiple redirects, starting from a centralized sign-in page (`/login/login.htm`) | Hosts the sign-in experience directly in app intent links, eliminating unnecessary redirections |
| User-centric design | General identity and access controls for user authentication | Context-based controls tailored to user roles, attributes, and real-time conditions |

> **Note**: From March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations) use Identity Engine by default to enable new users to access its enhanced features. 
## Identity Engine features
* App context in email templates
* App intent links
* Authentication policies
* CAPTCHA
* Interaction Code grant type for embedded authentication

> **Note**: If you are an admin or are looking for product documentation that are related to Identity Engine, see Identity Engine &mdash; [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) page.
### App context in email templates

Okta enables customizing and styling the default Okta email notifications. In addition, Identity Engine makes the app context available when a user enters an authentication flow. Use [VTL variables](/docs/guides/custom-email/main/#use-vtl-variables) for Identity Engine to customize email style and content dynamically based on the app that triggers an email notification. 

For information on adding or editing a template in one of the Okta-supported languages, see [Edit a default email template](/docs/guides/custom-email/main/#edit-a-default-email-template).

### App intent links

App intent links signal the intent to access an app and serve as protocol-specific endpoints for initiating a sign-in flow. These links support both Identity Provider and Service Provider-initiated flows.

For example, the app intent link for a SAML app is `http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`

In Classic Engine, these endpoints require an active session for access. Unauthenticated traffic redirects to a centralized sign-in page (`/login/login.htm`) with a `fromUri` parameter that represents the app intent link. This redirection happens before Classic Engine assesses the request for rate limit. After you establish a session, Classic Engine processes the request and redirects the user to the relevant app intent link through the generic app SSO endpoint (`/app/{app}/{instanceId}/{linkName}`). The endpoint validates whether the user is assigned to the app and enforces the app sign-on policy.

Identity Engine changes this flow by eliminating the centralized sign-in page (`/login/login.htm`). App intent links now directly host the widget or sign-in experience for the requested app. Identity Engine evaluates the global session policy, authentication policy, and other policies relevant to the sign-in process. Each app intent link hosts the sign-in experience and shares a common rate limit bucket or group, similar to the centralized sign-in page in Classic Engine.

### Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that enable organizations to define and enforce specific security outcomes for apps. 

Authentication policies offer the following key features:
*	Reusable across apps: A single policy can be applied to multiple apps, ensuring consistent security practices across your organization. 
* Dynamic authentication: Policies can trigger advanced security measures, such as stepping up authentication to a more robust anti-phishing factor when elevated risk is detected.
*	Code-free flexibility: With Identity Engine, authentication methods can be updated or adjusted without changing the underlying app code.

See the following documentation for an overview of policies:

* [Policies (high-level concept)](/docs/concepts/policies/)
* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)
* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

### CAPTCHA

CAPTCHA is a well-known strategy for mitigating bot attacks. To enhance organizational security, Okta supports CAPTCHA services to prevent automated sign-in attempts. Identity Engine offers integrations with market-leading CAPTCHA services for registration, sign-in, and account recovery.

Okta supports only the following two CAPTCHA services:

- [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
- [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)

>**Note:** Using any unsupported CAPTCHA type leads to a lockout. If a lockout occurs, contact [Okta support](https://support.okta.com).
You can integrate hCAPTCHA or reCAPTCHA with either of these Okta deployment models:
* [Redirect authentication](/docs/concepts/redirect-vs-embedded/#redirect-authentication)
*	[Embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication)

For more information on different deployment models, see [Authentication deployment models](#authentication-deployment-models).

CAPTCHA is enabled by default if you use [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget). However, you must implement CAPTCHA manually for any other [Okta SDK](https://developer.okta.com/code/).

For more information on CAPTCHA integration and services, see the following documentation:
*  [CAPTCHA integration](https://help.okta.com/oie/en-us/content/topics/security/security_general.htm?cshid=csh-captcha)
*  [CAPTCHAs](/docs/api/openapi/okta-management/management/tag/CAPTCHA/)

### Interaction Code grant type for embedded authentication

Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the  [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type enables apps to create a more customized user authentication experience. It uses the embedded Okta-hosted Sign-In Widget and/or SDK to manage user interactions with the authorization server directly. Unlike browser-based redirects to an authentication component (for example, the Sign-In Widget), this approach offers greater flexibility and control. 

## Authentication deployment models

Identity Engine deployment model supports the following three approaches for user authentication: 

*	Okta-hosted Sign-In Widget: Redirect to the Okta-hosted Sign-In Widget to authenticate your users and then redirect back to your app. Okta recommends this approach as it's the most secure and fastest to implement.
*	Embedded Sign-In Widget: Embed the Sign-In Widget into your app’s code base to handle the authentication on your servers. This approach provides a balance between complexity and customization.
*	Embedded SDK-driven sign-in flow: Use Okta SDKs to create a custom authentication experience. This approach is the most complex, leaving you with the most responsibility but offering the most control.

For an overview of the different Okta deployment models and implementation details, see the following documentation:

* [Okta deployment models &mdash; redirect versus embedded](/docs/concepts/redirect-vs-embedded/)
* [Sign users in](/docs/guides/sign-in-overview/)

## SDKs and sample apps

Okta offers SDKs for various languages and frameworks to integrate the Okta sign-in experience into your app, manage your users and groups, and more. With Identity Engine, Okta provides SDKs design to support new features and deployment models. See the sample apps available that demonstrate how these SDKs work. 

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identify Okta version 
See [Identify your Okta solution](/docs/guides/oie-upgrade-overview/) to determine your Okta version.

## Access and upgrade to Identity Engine
If you're a Classic Engine user who wants to upgrade the apps to use Identity Engine, see [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

For Classic Engine users who don't yet want to upgrade, your existing functionality continues to work, including your Classic Engine org, v1 API, and SDKs.

## Identity Engine versus Classic Engine documentation approach

Okta is moving towards supporting Identity Engine as the default while still continuing to provide information for Classic Engine users.

The following are the ways to identify whether a feature applies to Identity Engine or Classic Engine:

*	Documentation specific to Identity Engine features includes a blue banner at the beginning of the page to indicate compatibility.
*	Documentation covering features that work in both Identity Engine and Classic Engine does not include a banner. Any differences between the two engines are explained within the page content.
* Documentation for features exclusive to Classic Engine includes a note at the beginning of the page. The note clarifies the limitation and, if applicable, directs Identity Engine users to relevant resources.
*	For guides extensively updated to support Identity Engine, Okta retains [Classic Engine](/docs/guides/archive-overview/) version for reference.
