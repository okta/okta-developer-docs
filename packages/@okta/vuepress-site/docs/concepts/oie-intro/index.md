---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

Okta Identity Engine provides a flexible approach to your authentication requirements. This topic describes Identity Engine features, deployment models, and documentation updates. 

For detailed Identity Engine documentation, see [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## Identity Engine new features

This section provides an overview of Identity Engine features.

### App context in email templates

Identity Engine provides app context information during user authentication flows. You can use context variables in email templates to customize emails based on the app that triggered the email notification. 

See [Use app context](/docs/guides/custom-email/main/#use-app-context).

### App intent links

App intent links are used to signal your intent to access an application. These links are protocol-specific endpoints to initiate a sign-in flow to an application. Both Identity Provider and Service Provider initiated flows are supported.

Example app intent link for a SAML application:
`http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml`

Before Identity Engine was released, these endpoints were only accessible via a session. Unauthenticated traffic was redirected to a centralized sign-in page and the `fromUri` parameter indicated the app intent link. Once a session was established, the request was processed. The user was directed back to the app intent link via an intermediate redirect to the generic app single-sign-on endpoint (`/app/${app}/${instanceId}/${linkName}`). The app intent link endpoint validated user permissions for the application and enforced the application's sign-on policy.

Identity Engine simplifed the way these requests are processed. Instead of directing requests to the centralized sign-in page, the app intent link location hosts the sign-in experience for the user and evaluates the global session policy, authentication policy, and other relevant policies. As a result, each app intent link is responsible for hosting the sign-in experience within Identity Engine. To manage and regulate these sign-in experiences, the app intent links share a common rate limit bucket, similar to the rate limiting system for the centralized sign-in page on Classic Engine.

### Authentication policies

Authentication policies are security policy frameworks that enable organizations to model security outcomes for an app. These policies can be shared across applications. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. In addition, Identity Engine allows you to create flexible apps that can change their authentication methods without having to alter any code.

* [Policies (high-level concept)](/docs/concepts/policies/)

* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

### CAPTCHA

CAPTCHA is a strategy for mitigating bot attacks. Identity Engine offers registration, sign-in, and account recovery integration for hCAPTCHA and recaptcha. These services can be used in Okta-hosted and embedded Sign-In Widgets but not in SDKs.

See [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/).

### Interaction Code grant type for embedded authentication

The Interaction Code grant type is an extension to the OAuth 2.0 and OpenID Connect standard that enables a customized user authentication experience. With this grant type, apps using the embedded Sign-In Widget or SDK can manage user interactions with the authorization server directly rather than using a browser-based redirect to an authentication component. 

See [Interaction Code grant type](/docs/concepts/interaction-code/).

## Authentication deployment models

Identity Engine user authentication offers three deployment models.

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect Sign-In Widget to authenticate your users, then redirect them to your app. This is the recommended model since it is the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your code base to manage the authentication on your servers. This model provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use SDKs to create a custom authentication experience. This is the most complex model but offers the highest level of control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the  deployment models and see [Sign users in](/docs/guides/sign-in-overview/) for implementation details.

## SDKs and sample apps

Okta offers SDKs for integrating Identity Engine features into your apps and sample apps that show these features in practice.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Documentation approach for Identity Engine and Classic Engine 

Okta documentation supports Identity Engine as the default, while also providing information for Classic Engine users.

* Pages that describe features applicable only to Identity Engine have a blue Identity Engine banner at the top.
* Content applicable to both Identity Engine and Classic Engine does not have a banner. Any differences are covered in the page text.
* Content written for Classic Engine that does not apply to Identity Engine has a note at the top describing the issue and includes links to additional documentation as needed.
* For guides that were updated to support Identity Engine, the Classic Engine version is available in the [Okta Classic Engine](/docs/guides/archive-overview/) section.

See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## Access and upgrade to Identity Engine

Okta organizations created on or after March 1, 2022 use Identity Engine. To upgrade older orgs to Identity Engine, see [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

Classic Engine functionality continues to work, including Classic Engine orgs, v1 API, and SDKs.
