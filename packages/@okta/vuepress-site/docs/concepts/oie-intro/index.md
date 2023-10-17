---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

Okta Identity Engine is Okta's authentication pipeline that replaces Okta Classic Engine. Identity Engine provides valuable features and a more flexible approach to your authentication needs. The following sections explain features Identity Engine brings to the table, the deployment models that make use of these features, and how our documentation experience is changing to support it.

From March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs.

If you are an admin or are looking for product documents related to Identity Engine, see the [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) in the Okta Help Center. If you are an existing Classic Engine customer, see the [Upgrade to Identity Engine](#upgrade-to-identity-engine) section.

> **Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

<!--This information seemed relevant for the start of the topic, not near the end.-->

## Identity Engine features

Identity Engine provides the following capabilities:

- [App context in email templates](#app-context-in-email-templates) makes the app context available for a user during an authentication flow.
- [App intent links](#app-intent-links) signal intent to access an application, and can be used to initiate a sign-in flow to that application.
- [Authentication policies](#authentication-policies) allow orgs to model security outcomes from an app and can be shared across applications.
- [CAPTCHA integration](#captcha-integration) is available with reCAPTCHA and hCAPTCHA.
- [Interaction code grant type for embedded authentication](#interaction-code-grant-type-for-embedded-authentication) allows apps to have a more customized user authentication experience.

### App context in email templates

Identity Engine makes the app context available when a user enters an authentication flow. Context variables are available in Okta's email templates, so you can dynamically customize email style and content, based on the app from which an email notification is triggered.

For more information, see [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context). <!--This link is no longer valid. Looking further on the Customize email notifications page, there doesn't seem to be anything about app context. Is this section being kept in for historical purposes, or should it be removed? I did find this link that mentions it, but not any other information: https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/email-enhancements.htm -->

### App intent links

App intent links are used to signal intent to access an application. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an application. Identity Engine supports both Identity Provider and Service Provider initiated flows.

Example app intent link for a SAML application:
`http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml`

Prior to Identity Engine, these endpoints were accessible only with a session. Unauthenticated traffic was redirected to a centralized sign-in page (`/login/login.htm`) with a `fromUri` that represented the app that was originally attempted (the app intent link). This occurred before the request was assessed for rate limiting. A session was established, and the request was processed. The user was then redirected to the relevant app intent link through an intermediate redirect to the generic app single-sign on endpoint (`/app/${app}/${instanceId}/${linkName}`). The app intent link endpoint validated that the user was assigned to the application, and then enforced the app sign-on policy. <!-- A diagram would be useful here. It also begs the question whether all this information is necessary.-->

Identity Engine changes the way Okta processes these requests. Identity Engine no longer forwards requests to the centralized sign-in page (`/login/login.htm`). Instead, the app intent links location hosts the widget/sign-in experience for the app that the user is attempting to access and evaluate the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. Since each app intent link is responsible for hosting the sign-in experience on Identity Engine, they share a common app intent link rate limit bucket/group, similar to what existed for the centralized sign-in page on Classic Engine.

### Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that organizations can use to model security outcomes for an app. These policies are shareable across applications. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. Additionally, you can create flexible apps that can change authentication methods without having to alter a line of code.

For more information about authentication policies, see the following guides:
* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)
* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)
* [Policies (high-level concept)](/docs/concepts/policies/)

### CAPTCHA integration

CAPTCHA is a well-known strategy for mitigating attacks by bots. Identity Engine offers registration, sign-in, and account recovery integration of the two market-leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These are usable through the Okta-hosted and embedded Sign-In Widgets, but not SDKs.

### Interaction code grant type for embedded authentication

To enable a more customized user authentication experience, Okta introduced an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Okta Sign-In Widget, SDK, or both to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).

## Authentication deployment models

Identity Engine offers the following deployment models:

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach, as it's the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use Okta's SDKs to create a completely custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for implementation details.

## SDKs and sample apps

Okta has a whole host of SDKs available for integrating Identity Engine features into your apps using the deployment models described previously and sample apps to show them in action.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic Engine documentation approach

The Okta Developer portal is moving towards supporting Identity Engine by default, while still providing information for Classic Engine users.

* Content covering features that only work in Identity Engine have a blue Identity Engine banner at the top.
* Content covering features that works in both Identity Engine and Classic Engine have no banner. Any slight differences are covered in the page text.
* Content covering only Classic Engine, which won't work in Identity Engine, has a note at the top that explains what the issue is, and, if appropriate, where Identity Engine users can go to find support.
* For guides that were extensively updated to support Identity Engine, the Classic Engine version is still accessible in the [Okta Classic Engine](/docs/guides/archive-overview/) section, if needed.

## Upgrade to Identity Engine

If you are a Classic Engine customer who wants to upgrade their apps to use Identity Engine, go to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

If you are a Classic Engine customer who doesn't yet want to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.
