---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

Okta Identity Engine is a new authentication pipeline that provides valuable new features and a more flexible approach to your auth needs. This article provides a high-level introduction.

This page discusses the following:

* New features Identity Engine brings to the table
* The deployment models that use these features
* Changes to the documentation experience to support Identity Engine

> **Note**: If you're an admin, or are looking for product docs related to Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## Identity Engine new features

Identity Engine unlocks many new capabilities.

### App context in email templates

Identity Engine makes the app context available when a user enters an authentication flow. Find context variables in our email templates. These variables allow customers to dynamically customize email style and content based on the app that triggers an email notification.

See [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context).

### App intent links

App intent links are used to signal intent to access an app. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an app. Both Identity Provider and Service Provider initiated flows are supported.

Example app intent link for a SAML app:
`http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`

Before Identity Engine, these endpoints were accessible only with a session. Unauthenticated traffic was redirected to a centralized sign-in page (`/login/login.htm`) with a `stateToken` and a `fromUri` that represented the app that was originally attempted (the app intent link). This occurred before the request was assessed for app-level rate limiting. Upon successful authentication, a session was established and the request was processed.

The user was then redirected to the relevant app intent link through an intermediate redirect to the generic app SSO endpoint (`/app/{app}/{instanceId}/{linkName}`). The app intent link endpoint validated that the user was assigned to the app, and then enforced the app sign-on policy.

Identity Engine changes the way Okta processes these requests. It no longer forwards the browser to the centralized sign-in page (`/login/login.htm`). Instead, the app intent links location hosts the widget/sign-in experience for the app that the user is attempting to access, unless there’s an IdP routing rule in place.

Then, Identity Engine evaluates the global session policy, app sign-in policy, and all other policies relevant to the sign-in experience. Each app intent link is responsible for hosting the sign-in experience on Identity Engine. Because of this, they share a common app intent link rate limit bucket/group similar to what exists for the centralized sign-in page on Classic Engine.

### App sign-in policies

App sign-in policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that allow organizations to model security outcomes for an app. These policies are shareable across apps. For example, you can automatically step up authentication to a strong non-phishable factor when an elevated risk is detected. Also, Identity Engine allows you to create flexible apps that can change their authentication methods without having to alter a line of code.

* [Configure a global session policy and app sign-in policies](/docs/guides/configure-signon-policy/)

* [App sign-in policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Policies (high-level concept)](/docs/concepts/policies/)

### CAPTCHA

CAPTCHA is a well-known strategy for mitigating attacks by bots. Identity Engine offers integrations with market-leading CAPTCHA services for registration, sign-in, and account recovery.

Okta only supports the following CAPTCHA services:

- [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
- [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)

>**Note:** Using any other CAPTCHA type could lead to a lockout. Contact [Okta Support](https://support.okta.com) if a lockout occurs.

You can use either hCAPTCHA or reCAPTCHA with the redirect or embedded authentication deployment models. See [Okta deployment models](/docs/concepts/redirect-vs-embedded/).

If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA works out of the box. If you use any other [Okta SDK](https://developer.okta.com/code/), you need to implement CAPTCHA. See [CAPTCHAs](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CAPTCHA/).

### Interaction Code grant type for embedded authentication

To enable a more customized user authentication experience, Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).

## Authentication deployment models

You can divide the Identity Engine deployment model for user authentication into three approaches:

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach as it's the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed (self-hosted) the Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization. You don't need to build the page to challenge for authentication or recovery.
* **Embedded SDK sign-in flow**: Use the Okta embedded SDK (self-host) to create a custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control of the user presentation.
* **Embedded API sign-in flow**: Use direct authentication APIs to embed (self-host) an authentication. This option uses a limited set of APIs to challenge end users for authentication without creating a session for single sign-on.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for implementation details.

## Passwordless authentication

You can implement passwordless authentication flows using methods such as [Okta FastPass](https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/fp/fp-main.htm) and [Email Magic Link](/docs/guides/email-magic-links-overview/main/). This allows users to authenticate without a password and provides a frictionless user experience.

## Device Authorization Grant flow

The Device Authorization feature is an OAuth 2.0 grant type. It allows users to sign in to input-constrained devices, such as smart TVs, digital picture frames, printers, and devices with no browser. See [Configure Device Authorization Grant Flow](/docs/guides/device-authorization-grant/main/).

## Universal Logout

Universal Logout lets you terminate user sessions and their tokens for supported apps when Identity Threat Protection identifies a change in risk. You can also [build Universal Logout for your app](/docs/guides/oin-universal-logout-overview/). A Universal Logout endpoint simplifies the process of signing users out of all of their active sessions for apps built on the Okta Customer Identity platform.

## Improved Terraform support
You can manage your Okta org using Terraform, including groups, policies, and apps. Terraform can manage more configuration resources using standard operating procedures. It uses resource descriptions to examine the current state of your org, and then creates a plan with the appropriate changes. You can check the plan, modify your description as needed, and run the plan. For more information, see [Automate org management with Terraform](/docs/guides/automate-org-management-with-terraform/)

## SDKs and sample apps

Okta has a host of SDKs available for integrating new Identity Engine features into your apps using [Okta deployment models](#authentication-deployment-models). There are also sample apps to show them in action.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic Engine documentation approach

In our documentation, Okta is moving towards supporting Identity Engine by default, while still providing information for Classic Engine users.

* Pages and page sections covering features that only work in Identity Engine have a blue Identity Engine banner at the top.
* Content that works in both Identity Engine and Classic Engine have no banner. Any slight differences are covered in the page text.
* Content written for Classic Engine that doesn't work in Identity Engine has a note at the top that explains what the issue is. And, if appropriate, the note explains where Identity Engine users can go to find support.
* For guides that were extensively updated to support Identity Engine, Okta keeps a [Classic Engine](/docs/guides/archive-overview/) version available if needed.

> **Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## Access and upgrade to Identity Engine

On March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs, so that all new customers can take advantage of the new features.

If you're a Classic Engine customer who wants to upgrade their apps to use Identity Engine, go to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/) to review the level of effort based on your current configuration and telemetry use.

For Classic Engine customers who aren’t ready to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.
