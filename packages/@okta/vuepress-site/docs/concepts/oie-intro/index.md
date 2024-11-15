---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

The Okta Identity Engine is a new authentication pipeline that drives additional flexibility, security, and streamlines your user experience through a host of new features. 

This article discusses Identity Engine on a high-level through the following sections:

* New features 
* Deployment models that use these features
* Documentation enhancements to support the Identity Engine

> **Note**: If you're an admin, or are looking for product docs related to Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## New features

The Okta Identity Engine unlocks a range of new features to enhance your auth experience. These features are detailed below.

### Customization of email notifications

Identity Engine enables full customization of e-mail notification style and content. App context is readily available upon entering an authentication flow through context variables in our email templates. You can modify these context variables to tailor email style and content according to your use case.  

See [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context) for more details.

### App intent links
Identity Engine changes the way Okta processes these requests. It no longer forwards requests to the centralized sign-in page (`/login/login.htm`). Instead, the app intent links location hosts the widget/sign-in experience for the app that the user is attempting to access.

Then, Identity Engine evaluates the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. Each app intent link is responsible for hosting the sign-in experience on Identity Engine. Because of this, they share a common app intent link rate limit bucket/group similar to what exists for the centralized sign-in page on Classic Engine.

App intent links are used to signal intent to access an app. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an app. Both Identity Provider and Service Provider initiated flows are supported.

Example app intent link for a SAML application:
`http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`

Before Identity Engine, these endpoints were accessible only with a session. Unauthenticated traffic was redirected to a centralized sign-in page (`/login/login.htm`) with a `fromUri` that represented the app that was originally attempted (the app intent link). This occurred before the request was assessed for rate limiting. A session was established and the request was processed.

The user was then redirected to the relevant app intent link through an intermediate redirect to the generic app SSO endpoint (`/app/{app}/{instanceId}/{linkName}`). The app intent link endpoint validated that the user was assigned to the app, and then enforced the app sign-on policy.



### Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that allow organizations to model security outcomes for an app. These policies are shareable across applications. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. Also, Identity Engine allows you to create flexible apps that can change their authentication methods without having to alter a line of code.

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Policies (high-level concept)](/docs/concepts/policies/)

### CAPTCHA

CAPTCHA is a well-known strategy for mitigating attacks by bots. Identity Engine offers integrations with market-leading CAPTCHA services for registration, sign-in, and account recovery.

Okta only supports the following CAPTCHA services:

- [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
- [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)

>**Note:** Using any other CAPTCHA type could lead to lockout. Contact [Okta support](https://support.okta.com) if lockout occurs.

You can use either hCAPTCHA or reCAPTCHA with the redirect or embedded authentication deployment models. See [Okta deployment models](/docs/concepts/redirect-vs-embedded/).

If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA works out of the box. If you use any other [Okta SDK](https://developer.okta.com/code/), you need to implement CAPTCHA. See [CAPTCHAs](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CAPTCHA/).

### Interaction Code grant type for embedded authentication

To enable a more customized user authentication experience, Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).

## Authentication deployment models

You can divide the Identity Engine deployment model for user authentication into three approaches:

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach as it's the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for implementation details.

## SDKs and sample apps

Okta has a host of SDKs available for integrating new Identity Engine features into your apps using [Okta deployment models](#authentication-deployment-models). There are also sample apps to show them in action.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic Engine documentation approach

In our documentation, Okta is moving towards supporting Identity Engine by default, while still providing information for Classic Engine users.

* Pages and page sections covering features that only work in Identity Engine have a blue Identity Engine banner at the top.
* Content that works in both Identity Engine and Classic Engine have no banner. Any slight differences are covered in the page text.
* Content written for Classic Engine that won't work in Identity Engine has a note at the top that explains what the issue is, and, if appropriate, where Identity Engine users can go to find support.
* For guides that were extensively updated to support Identity Engine, Okta keeps a [Classic Engine](/docs/guides/archive-overview/) version available if needed.

> **Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## Access and upgrade to Identity Engine

On March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs, so that all new customers can take advantage of the new features.

If you're a Classic Engine customer who wants to upgrade their apps to use Identity Engine, go to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

For Classic Engine customers who don't yet want to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.
