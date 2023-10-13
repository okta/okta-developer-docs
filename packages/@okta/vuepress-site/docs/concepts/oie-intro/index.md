---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

> **Important**: On March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Okta Identiy Engine orgs. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

Okta Identity Engine (OIE) is Okta's new authentication pipeline, replacing Okta's Classic Engine. OIE provides valuable new features and more flexibility to your auth needs. 

> **Note**: If you are an admin or are looking for product docs related to OIE, see the [Get started](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) page in the Okta Help Center.


## Identity Engine new features

OIE provides many new capabilities to enhance the authentication experience.

### App context in email templates

OIE provides the app context when a user enters an authentication flow, allowing for the use of app context variables. The context variables `${app.id}`, `${app.name}`, and `${app.label}` are available in our email templates, allowing you to dynamically customize email style and content based on the app where the email is triggered.

See [Customize email notifications > Use VTL variables](/docs/guides/custom-email/main/#use-vtl-variables).

### App intent links

App intent links are protocol-specific endpoints that you can use to initiate a sign-in flow to an application. Both Identity Provider and Service Provider initiated flows are supported.

Example app intent link for a SAML application:
`http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml`

Prior to OIE, these endpoints were accessible only with a session. Unauthenticated traffic was redirected to a centralized sign-in page (`/login/login.htm`) with a `fromUri` that represented the app that was originally attempted (the app intent link). This occurred before the request was assessed for rate limiting. A session was established and the request was processed. The user was then redirected to the relevant app intent link through an intermediate redirect to the generic app single-sign on endpoint (`/app/${app}/${instanceId}/${linkName}`). The app intent link endpoint validated that the user was assigned to the application, and then enforced the app sign-in policy.

OIE does not forward requests to the centralized sign-in page (`/login/login.htm`). Instead, the app intent links location hosts the widget/sign-in experience for the app that the user is attempting to access and evaluates the global session policy, authentication policy, and all other policies relevant to the sign-on experience. Since each app intent link is responsible for hosting the sign-in experience on OIE, they share a common app intent link rate limit bucket/group similar to what existed for the centralized sign-in page on Classic Engine.

### Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that allow organizations to model security outcomes for an app. These policies are shareable across applications. For example, you can automatically set up authentication to a strong, non-phishable factor when elevated risk is detected. Additionally, OIE allows you to create flexible apps that can change their authentication methods without having to alter any code.

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Policies (high-level concept)](/docs/concepts/policies/)

### CAPTCHA

OIE offers registration, sign-in, and account recovery integration with the two market-leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These are available through the Okta-hosted and embedded Sign-In Widgets, but not SDKs.

### Interaction code grant type for embedded authentication

To enable a more customized user authentication experience, OIE uses an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).

## Authentication deployment models

You can divide the OIE user authentication deployment model into three approaches:

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach as it's the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a completely custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for practical implementation details.

## SDKs and sample apps

We have many SDKs and samples available for integrating new OIE features into your apps using the deployment models described above. 
* [Browse SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic Engine documentation approach

In our documentation, we provide documentation for both OIE and Classic Engine users.

* Pages and page sections covering features that only work in OIE have a blue Identity Engine banner at the top.
* Content that works in both OIE and Classic Engine have no banner. Any slight differences are covered in the page text.
* Content written for Classic Engine, that won't work in Identity Engine, has a note at the top that explains what the issue is, and, if appropriate, where Identity Engine users can go to find support.
* For guides that were extensively updated to support Identity Engine, we keep the Classic Engine version in the [Okta Classic Engine](/docs/guides/archive-overview/) section, so it's still accessible if needed.

## Access and upgrade to Identity Engine

On March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are OIE orgs.

If you are a Classic Engine customer who wants to upgrade their apps to use OIE, see [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

For Classic Engine customers who don't yet want to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.
