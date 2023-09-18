---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

Okta Identity Engine is a new authentication pipeline that provides valuable new features and a more flexible approach to your authentication needs. This document provides a high-level overview of the Identity Engine’s features. In addition, you can learn more about the deployment models and understand the documentation of Classic Engine and Identity Engine.


> **Note**: If you are an admin, and/or are looking for product documents related to Identity Engine, see our [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) over in the Okta Help Center.

## Identity Engine new features

Identity Engine unlocks many new capabilities such as App context in email templates, App intent links, Authentication policies, and CAPTCHA. 

### App context in email templates

Identity Engine makes the app context available when a user enters an authentication flow. Context variables are available in our email templates, allowing customers to dynamically customize email style and content based on the app from which the email notification is triggered.

See [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context).

### App intent links

App intent links are used to signal intent to access an application. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an application. Both Identity Provider and Service Provider-initiated flows are supported.

Example app intent link for a SAML application:
`http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml`

Prior to Identity Engine, these endpoints were accessible only with a session. Unauthenticated traffic was redirected to a centralized sign-in page (`/login/login.htm`) with a `fromUri` that represented the app that was originally attempted (the app intent link). This occurred before the request was assessed for rate limiting. A session was established and the request was processed. The user was then redirected to the relevant app intent link through an intermediate redirect to the generic app single-sign-on endpoint (`/app/${app}/${instanceId}/${linkName}`). The app intent link endpoint validated that the user was assigned to the application, and then enforced the app sign-on policy. <!---Not sure if we need to mention how things used to work in detail? how about, Prior to the Okta Identity engine, you'd need a session's request processed, and appropriate redirects were employed to validate user assignment to an app.--!>

Identity Engine changes the way Okta processes these requests. Identity Engine no longer forwards requests to the centralized sign-in page (`/login/login.htm`). The app intent links location hosts the widget/sign-in experience of the app that the user is attempting to access. The widget evaluates the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. Since each app intent link is responsible for hosting the sign-in experience on Identity Engine, they share a common app intent link rate limit bucket/group similar to what existed for the centralized sign-in page on Okta Classic Engine.

### Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that enable organizations to model security outcomes for an app. These policies are shareable across applications. For example, you can automatically step-up authentication to a strong non-phishable factor when elevated risk is detected. Additionally, with Identity Engine you can create flexible apps that change their authentication methods without having to alter a line of code.

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Policies (high-level concept)](/docs/concepts/policies/)

### CAPTCHA

CAPTCHA is a well-known strategy for mitigating attacks by bots. Identity Engine offers registration, sign-in, and account recovery integration of the two market-leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These are usable through the Okta-hosted and embedded Sign-In Widgets only.

### Interaction Code grant type for embedded authentication

To enable a more customized user authentication experience, Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component, such as the Sign-In Widget.

## Authentication deployment models

Identity Engine user authentication deployment model can be divided into three approaches:

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach as it is the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a completely custom authentication experience. This option is the most complex by giving you the most responsibility but also offers the most control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for practical implementation details.

## SDKs and sample apps

We have a whole host of SDKs available for integrating new Identity Engine features into your apps using the deployment models and sample apps to show them in action.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic Engine documentation approach
<!--I would consider removing this whole section. It is not clear how this benefits the reader. Instead, how about providing links to Identity Enginer features, links to Classic Engine features? Asking the user to figure out based on the banner adds an additional burden for the reader.--!>

In our documentation, we are moving towards supporting Identity Engine by default, while still providing information for Classic Engine users.

* Pages and page sections covering features that only work in Identity Engine have a blue Identity Engine banner at the top.
* Content that works in both Identity Engine and Classic Engine have no banner. Any slight differences are covered in the page text.
* Content written for Classic Engine, that won't work in Identity Engine, has a note at the top that explains what the issue is, and, if appropriate, where Identity Engine users can go to find support.
* For guides that were extensively updated to support Identity Engine, we keep the Classic Engine version in the [Okta Classic Engine](/docs/guides/archive-overview/) section, so it's still accessible if needed.

> **Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## Access and upgrade to Identity Engine

From March 1, 2022, all new Okta orgs will be known as Identity Engine orgs. <!--This sentence wasn't clear originally, I have made an assumption in my edit here.--!>

If you are a Classic Engine customer looking to upgrade your apps to use Identity Engine, go to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

If you are a Classic Engine customer who doesn't yet want to upgrade, your existing functionality continues to work, including your Classic Engine org, v1 API, and SDKs.
