---
title: Okta Identity Engine overview
lang: en-US
meta:
  - name: description
    content: Find out about Okta's Identity Engine authentication flow, what developer features it unlocks, how to use it, and the differences from Okta Classic Engine.
---

Okta Identity Engine is Okta's new authentication pipeline that provides valuable new features and a more flexible approach to your auth needs. This article provides a high-level introduction. We also briefly discuss the deployment models that make use of these features and show how our documentation experience is changing to support it.

> **Note**: If you are an admin, or are looking for product docs related to Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) in the Okta Help Center.

## Identity Engine new features

Identity Engine the following new capabilities: 

* App context in email templates  
* App intent links  
* Authentication policies  
* CAPTCHA support  
* Interaction Code grant type support  

### App context in email templates

Identity Engine makes the app context available when a user enters an authentication flow. Context variables are available in our email templates, allowing customers to dynamically customize email style and content based on the app that an email notification is triggered from.

See [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context).

### App intent links

App intent links are used to signal intent to access an application. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an application. Both Identity Provider and Service Provider initiated flows are supported.

Example app intent link for a SAML application:  
`http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml`

Prior to Okta Identity Engine, these endpoints were accessible only within a session. Unauthenticated traffic was redirected to a centralized sign-in page (`/login/login.htm`) with a `fromUri` value that represented the app that was originally attempted (the app intent link). This occurred before the request was assessed for rate limiting. A session was established and the request was processed. The user was then redirected to the relevant app intent link through an intermediate redirect to the generic app sign-on endpoint (`/app/${app}/${instanceId}/${linkName}`). The app intent link endpoint validated that the user was assigned to the application, and then enforced the app sign-on policy.

Okta Identity Engine changes the way Okta processes these requests. Identity Engine no longer forwards requests to the centralized sign-in page at (`/login/login.htm`). Instead, the app intent links location hosts the widget/sign-in experience for the app that the user is attempting to access; it also evaluates the Global Session Policy, authentication policy, and all other policies relevant to the sign-in experience. Since all app intent links are responsible for hosting their sign-in experiences on Identity Engine, they share a common app intent link rate limit bucket/group similar to what existed for the centralized sign-in page on Classic Engine.

### Authentication policies

Authentication policies are security policy frameworks that allow organizations to model security outcomes for an app. These policies are shareable across applications. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. Additionally, Identity Engine allows you to create flexible apps that can change their authentication methods without having to alter a line of code. For more information, see the following:

* [Digital Identity Guidelines: Authentication and Lifecycle Management](https://csrc.nist.gov/publications/detail/sp/800-63b/final)  
* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)  
* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)  
* [About policies](/docs/concepts/policies/)

### CAPTCHA

CAPTCHA is a well-known strategy for mitigating attacks by bots. Identity Engine offers registration, sign-in, and account recovery integration of the two market-leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These are usable through the Okta-hosted and embedded Sign-In Widgets, but not through SDKs.

### Interaction code grant type for embedded authentication

To enable a more customized user authentication experience, Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Sign-In Widget).

## Authentication deployment models

You can divide the Identity Engine user authentication deployment model into three approaches:

* **Okta-hosted (redirect) Sign-In Widget**: Use the Okta-hosted (redirect) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach as it's the most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a completely custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for practical implementation details.

## SDKs and sample apps

We have a whole host of SDKs available for integrating new Identity Engine features into your apps using the deployment models described above and sample apps to show them in action.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic Engine documentation approach

In our documentation, we are moving towards supporting Identity Engine by default, while still providing information for Classic Engine users.

* Pages and page sections covering features that only work in Identity Engine have a blue Identity Engine banner at the top.
* Pages containing content that works in both Identity Engine and Classic Engine have no banner. Any slight differences are covered in the page text.
* Pages containing content written for Classic Engine that won't work in Identity Engine have an explanatory note at the top, and, if appropriate, where Identity Engine users can go to find support.
* For Classic Engine guides that were extensively updated to support Identity Engine, we keep the previous versions in the Okta Classic Engine [archive](/docs/guides/archive-overview/), so they are still accessible if needed. 

> **Note**: See [Get Started](https://help.okta.com/okta_help.htm?type=oie) to determine your Okta version.

## Access and upgrade to Identity Engine

On March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs, so that all new customers can take advantage of the new features.

If you are a Classic Engine customer who wants to upgrade your apps to use Identity Engine, go to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/). If you don't want to upgrade now, your existing functionality will continue to work, including your Classic Engine org, v1 API, and SDKs. To keep up to date on Classic Engine support, contact your Okta account team or ask us on our [forum](https://devforum.okta.com/).
