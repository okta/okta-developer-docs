---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---
# Okta Identity Engine overview

<ApiLifecycle access="ie" />

Okta Identity Engine is a new authentication pipeline that drives additional flexibility and security while streamlining your user experience.

This article explores Identity Engine including:

* [New features](#new-features)
  
* [Deployment models used by Identity Engine](#deployment-models-used-by-identity-engine)
  
* [Documentation changes to support Identity Engine](#documentation-changes-to-support-identity-engine)
  
* [Upgrading to Identity Engine](#upgrading-to-identity-engine)

> **Note**: If you're an admin, or are looking for product docs related to Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/okta_help.htm?type=oie&id=ext-get-started-oie).

## New features

Identity Engine supplies a range of new features that add customization, convenience, flexibility, and security to align the auth experience with your specific use case. 

These new features are discussed below:

### Customization of email notifications

Identity Engine allows you to fully customize email notification style and content. Context variables in our email templates make it simple to see app context when entering an authentication flow. Modify these context variables to tailor email style and content to your needs.
See [Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context) for more details.

### Simplified sign-in process

App intent links are protocol-specific endpoints used to initiate an app sign-in flow.

Example of an SAML application app intent link:
`http://{yourOktaDomain}/app/mysamlapp_1/{appInstanceID}/sso/saml`

Identity Engine enhances the use of app intent links by eliminating redirects while supporting Identity Provider and Service Provider initiated flows.

#### Identity Engine sign-in process

With Identity Engine, the app intent link’s location hosts the widget/sign-in experience for the specific app.

After clicking an app intent link, Identity Engine directly evaluates all sign-in policies and processes the request. Requests are no longer forwarded to the centralized sign-in page (`/login/login.htm`). As the app intent link location hosts the sign-in experience, they share a common app intent link rate limit bucket/group similar to the centralized sign-in page (`/login/login.htm`) on Okta Classic Engine.

#### Classic Engine sign-in process

With Classic Engine, users can only access endpoints/app intent links through an authorized session. 

Classic Engine redirects unauthorized traffic to the centralized sign-in page (`/login/login.htm`) with a `fromUrl` for the app the user attempted to access. Classic Engine then assesses the request for rate limiting, establishes a session, and processes the request.

Only after these steps will Classic Engine perform an intermediate redirect to the generic app SSO endpoint (`/app/{app}/{instanceId}/{linkName}`) to direct users to the relevant app intent link. This link validates the user’s access capabilities and enforces the app sign-on policy.

### Flexible authentication policies

Authentication policies are [security policy frameworks](https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final) that enable organizations to customize security outcomes for various applications based on identified risk level. With Identity Engine, these policies allow apps to automatically change authentication methods based on risk level without manually updating code. Defined policies are also fully shareable across all of your applications.

For example, you can automatically strengthen your auth method to a non-phishable factor across multiple applications when elevated risk is detected. 

See the following resources for more information on configuring authentication policies with Identity Engine:

* [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/)

* [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)

* [Policies (high-level concept)](/docs/concepts/policies/)

### CAPTCHA integration

Identity Engine offers integration with a range of market-leading CAPTCHA services for registration, sign-in, and account recovery to minimize bot attacks.

Users can use the [Sign-In Widget SDK](https://github.com/okta/okta-signin-widget), to use CAPTCHA without additional configuration. Using other [Okta SDKs](https://developer.okta.com/code/) requires additional CAPTCHA implementation. See for more information on [CAPTCHAs](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CAPTCHA/).

Okta supports the following CAPTCHA services:

- [hCAPTCHA (invisible)](https://docs.hcaptcha.com/invisible)
  
- [reCAPTCHA v2 (invisible)](https://developers.google.com/recaptcha/docs/invisible)

>**Note:** Using any other CAPTCHA type could lead to lockout. Contact [Okta support](https://support.okta.com) if lockout occurs.

### Embedded authentication without redirects

Use the new [Interaction Code grant type](/docs/concepts/interaction-code/) extension for the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard to customize your auth experience. This grant type enables applications with an embedded Okta Sign-In Widget or SDK to directly manage user interactions with the authorization server without a redirect to a browser-based authentication component.

## Deployment models used by Identity Engine

With Identity Engine, you can use hCAPTCHA and reCAPTCHA services with the redirect or embedded authentication deployment models.

The following table explains the three distinct approaches used by Identity Engine for user authentication:

| **Deployment Model**|**Description**|
| :-------- | :------- |
| Embedded SDK-driven sign-in flow|Use our SDKs to create a custom authentication experience. This option is the most complex but offers the most control.|
| Embedded Sign-In Widget| Embed the Sign-In Widget into your code base to handle server authentication. This approach drives a balance between flexibility and complexity.|
| Okta-hosted (redirect) Sign-In Widget| Use the redirect (Okta-hosted) Sign-In Widget to authenticate users and redirect back to your app. This method is most secure and quickest to implement.|

Refer to [Okta deployment models — redirect vs. embedded](https://developer.okta.com/docs/concepts/redirect-vs-embedded/) for an overview of each deployment model and [Sign users](https://developer.okta.com/docs/guides/sign-in-overview/) for implementation details.

### Using our SDKs and sample apps

Okta offers numerous SDKs to integrate Identity Engine features into your apps using the discussed [Okta Deployment Models](#deployment-models-used-by-identity-engine). We also showcase our features through sample apps.  

See the following resources:

* [Browse our SDKs and samples](/code/)
  
* [Explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Documentation changes to support Identity Engine

Okta plans to support Identity Engine as the default platform while still supporting Classic Engine users through documentation.

Below, we have outlined the change in our documentation approach: 

* Identity Engine-specific page and page sections will contain a blue Identity Engine banner at the top.
  
* Documentation that contains information compatible with both platforms won't have a banner. The text will contain platform nuances.
  
* Content specific to Classic Engine will contain a note at the top of the page to direct Identity Engine users to support resources.
  
* Guides with extensive rewrites to support Identity Engine will have a Classic Engine version available on the site.

> **Note**: See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## Upgrading to Identity Engine

All future [Okta orgs](/docs/concepts/okta-organizations/) past March 1, 2022 are Identity Engine orgs. Existing functionality for Classic Engine users will work for now, including Classic Engine org, v1 API, and SDKs.

For Classic Engine users who want to upgrade their apps to use Identity Engine, see the [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).
