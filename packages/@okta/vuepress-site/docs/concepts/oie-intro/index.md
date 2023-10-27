---
title: Okta Identity Engine new features
meta:
  - name: description
    content: Learn more about the new features of Okta Identity Engine.
---
# Okta Identity Engine new features

<ApiLifecycle access="ie" />

Okta Identity Engine provides next-generation authentication services. Identity Engine uses the latest technology to implement custom flows and a flexible authentication environment.

> **Note**: If you are an admin, or are looking for product documentation related to Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie) in the Okta Help Center.

The following information is a summary of new features, deployment models, SDK and sample applications, and changes made to the documentation:
* [Features](#features)
* [Deployment models](#deployment-models)
* [SDKs and sample applications](#sdks-and-sample-applications)
* [Documentation support](#documnentation-support)
* [Upgrade to Identity Engine](#upgrade-to-identity-engine)


 ## Features
* [Application context in email templates](#application-context-in-email-templates)
* [App intent links](#app-intent-links)
* [Authentication policies](#authentication-policies)
* [CAPTCHA](#captcha)
* [Interaction code grant type](#interaction-code-grant-type)

 ### Application context in email templates

Identity Engine makes the application context available when a user enters an authentication flow. Context variables are available in Okta email templates to enable  dynamically customized email style and content based on the application that an email notification is triggered from.

See [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context).

### App intent links

App intent links signal intent to access an application. These links are protocol-specific endpoints used to initiate an application authentication flow. Identity Provider and Service Provider-initiated flows are supported.

> #### Example
> > The following example is of an app intent link for a SAML application. 
> > > `http://${yourOktaDomain}/app/mysamlapp_1/${appInstanceID}/sso/saml`

When using Okta Classic Engine, these endpoints are accessible with a session only. Unauthenticated traffic is redirected to a centralized sign-in page, such as`/login/login.htm`, with a `fromUri` representing the application that is originally attempted by the app intent link. The redirect happens before the request is assessed for rate limiting, a session is established, and the request is processed. Next, the user is redirected to the relevant app intent link through an intermediate redirect to the generic application SSO endpoint, for example, `/app/${app}/${instanceId}/${linkName}`. The app intent link endpoint validates the user is assigned to the application and enforces the application sign-in policy.

Identity Engine changes the way Okta processes these requests by no longer forwarding requests to the centralized sign-in page. Instead, the app intent link location hosts the Sign-In Widget for the application that the user is attempting to access and policies relevant to the sign-in experience. Because each app intent link is responsible for hosting the sign-in experience on Identity Engine, they share a common app intent link rate limit group similar to the centralized sign-in page on Classic Engine.

## Authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that enable you to model security outcomes across multiple applications. For example, if you detect an elevated phishing risk, you can automatically intensify authentication or create flexible applications to change authentication methods without editing code.

Refer to the following resources:

> * [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

> * [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

> * [Policies (high-level concept)](/docs/concepts/policies/)

### CAPTCHA

CAPTCHA is a commmon strategy to mitigate attacks by bots. Identity Engine offers registration, sign-in, and account recovery integration for two market-leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These are usable through the Okta-hosted and embedded Sign-In Widget, but not SDKs.

### Interaction code grant type

To enable a more customized user authentication experience, Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). The grant type enables an embedded Sign-In Widget and SDK to directly manage user interactions with the authorization server. You no longer need to rely on a browser-based redirect to an authentication component, such as Sign-In Widget.

## Deployment models

There are three Identity Engine user authentication deployment models: 

> * **Okta Sign-In Widget**: Use this redirect model to authenticate your users and redirect them back to your application. This model is hosted by Okta and provides the most secure and fastest implementation.
> * **Embedded Sign-In Widget**: Use this embedded model to authenticate your users through your own code base and servers. This model provides a balance between complexity and customization.
> * **Embedded SDK-driven sign-in flow**: Use this embedded method to create a custom authentication experience through SDKs. This option is the most complex and leaves you with the most responsibility, however, offers the most control.

See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in overview](/docs/guides/sign-in-overview/) for practical implementation details.

## SDKs and sample applications

In addition to the deployment models, Okta provides several SDKs to integrate the new Identity Engine features into your applications.  
Refer to the following articles and samples to get started:
> * [Browse our SDKs and samples](/code/)
> * [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Documentation support

The following information provides an update about the documentation approach for Identity Engine and Classic Engine. Okta is moving towards supporting Identity Engine as the lead product, however, Classic Engine documenation is still available. 

> * Pages and page sections covering features that only work in Identity Engine have a blue Identity Engine banner at the top.
> * Content that works in both Identity Engine and Classic Engine has no banner. Any slight differences are covered in the page text.
> * If there is content that is specific to Classic Engine and does not apply to Identity Engine, a note displays at the top of the page. The note describes the content and, if appropriate, where Identity Engine users can go to find support.
> * For guides that are extensively updated to support Identity Engine, a Classic Engine version is available in [Okta Classic Engine](/docs/guides/archive-overview/).

> >**Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## Upgrade to Identity Engine

As of March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs and new features are available to all new customers.

If you are using Classic Engine and want to upgrade your applications to use Identity Engine, go to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

If you do not want to upgrade, existing functionality continues to work, including your Classic Engine org, v1 API, and SDKs.
