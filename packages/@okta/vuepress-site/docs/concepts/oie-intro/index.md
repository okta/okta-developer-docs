---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

Okta Identity Engine is a new authentication pipeline that provides valuable new features and a more flexible approach to your authentication needs. This article provides a high-level introduction and covers the following topics:

* Features that Identity Engine brings to the table
* Deployment models that use these features
* Additional support including SDKs, documentation changes, and upgrade details

> **Note**: If you are an administrator, or looking for product documentation related to Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## Identity Engine features

Identity Engine introduces the following capabilities:

* Using app intent links to access apps
* Ability to use the app context in email templates
* Elevated authentication policies
* Interaction Code grant type for embedded authentication
* Support for CAPTCHA services

### App intent links

App intent links are used to initiate a request to access an app. These links are protocol-specific endpoints that you can use to start a sign-in flow to an app. Both Identity Provider- and Service Provider-initiated flows are supported.

Before Identity Engine, these endpoints were accessible only using a session. Unauthenticated traffic was redirected to a centralized sign-in page (`/login/login.htm`) with a `fromUri` parameter that represented the app that was being accessed (the app intent link). This occurred before the request was assessed for rate limiting. A session was established and the request was processed.

The user was then redirected to the relevant app intent link through an intermediate redirect to the generic app SSO endpoint (`/app/{app}/{instanceId}/{linkName}`). The app intent link endpoint validated that the user was assigned to the app, and then enforced the app's sign-on policy.

Identity Engine changes the way Okta processes these requests. It no longer forwards requests to the centralized sign-in page (`/login/login.htm`). Instead, the app intent links location hosts the widget/sign-in experience for the app that the user is attempting to access.

Then, Identity Engine evaluates the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. Each app intent link is responsible for hosting the sign-in experience in Identity Engine. Because of this, they share a common rate limit group for app intent links, similar to what exists for the centralized sign-in page in Classic Engine.

Here is an example of an app intent link for a SAML application:
`http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`

### App context in email templates

The app context becomes accessible when a user starts an authentication flow, which includes a set of email templates. These templates use variables that enable customers to dynamically customize email styles and content based on the app initiating the notification.

See [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context).

### Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that allow organizations to model security outcomes for an app. These policies are shareable across applications. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. Also, Identity Engine allows you to create flexible apps that can change their authentication methods without having to alter a single line of code. For more details, see the following articles:

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Policies (high-level concept)](/docs/concepts/policies/)

### Interaction Code grant type for embedded authentication

To enable a more customized user authentication experience, Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).

### CAPTCHA

CAPTCHA is a well-known strategy for mitigating attacks by bots. Identity Engine offers integrations with market-leading CAPTCHA services for registration, sign-in, and account recovery.

Okta only supports the following CAPTCHA services:

- [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
- [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)

>**Note:** Using any other CAPTCHA type could lead to a lockout. Contact [Okta support](https://support.okta.com) if a lockout occurs.

You can use either hCAPTCHA or reCAPTCHA with the redirect or embedded authentication deployment models. See [Okta deployment models](/docs/concepts/redirect-vs-embedded/).

If you use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), CAPTCHA works out of the box. If you use any other [Okta SDK](https://developer.okta.com/code/), you need to implement CAPTCHA. See [CAPTCHAs](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CAPTCHA/).

## Authentication deployment models

You can divide the Identity Engine deployment model for user authentication into three approaches:

* **Okta-hosted Sign-In Widget**: Use the Okta-hosted Sign-In Widget to redirect and authenticate your users, then redirect back to your app. This is the recommended approach, being the most secure and fastest option.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for implementation details.

## Additional support

Additional support for Identity Engine is available, including integration SDKs and a summary of documentation changes between Identity Engine and Classic Engine, along with upgrade details.

### SDKs and sample apps

Okta provides SDKs available for integrating new Identity Engine features into your apps using [Okta deployment models](#authentication-deployment-models). There are also sample apps to show them in action.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

### Identity Engine versus Classic Engine documentation approach

In our documentation, Okta is moving towards supporting Identity Engine by default, while still providing information for Classic Engine users. Here is the summary of key updates in the documentation:

* Pages and page sections covering features that only work in Identity Engine have a blue Identity Engine banner at the top.
* Content that works in both Identity Engine and Classic Engine have no banner. Any slight differences are covered in the page text.
* Content written for Classic Engine that does not work in Identity Engine has a note at the top explaining what the issue is, and, if applicable, guiding Identity Engine users where to find additional support.
* For guides that were extensively updated to support Identity Engine, Okta keeps a [Classic Engine](/docs/guides/archive-overview/) version available if needed.

> **Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

### Access and upgrade to Identity Engine

On March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs, so that all new customers can take advantage of the new features.

If you are a Classic Engine customer who wants to upgrade their apps to use Identity Engine, go to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

For Classic Engine customers who are not yet ready to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.
