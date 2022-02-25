---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---

Okta Identity Engine is Okta's new authentication pipeline, which provides valuable new features and a more flexible approach to your auth needs. This article provides a high-level introduction.

Below we explain what new features Identity Engine brings to the table, talk about the deployment models we have to make use of these features, and show how our documentation experience is changing to support it.

> **Note**: If you are an admin, or are looking for product docs related to Identity Engine, see our [Identity Engine Get started page](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-get-started.htm?cshid=ext-get-started-oie) over on the Okta Help Center.

## Identity Engine new features

Identity Engine unlocks many new capabilities.

### App-level policies

App-level policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that allow organizations to model security outcomes for an app — these policies are shareable across applications. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. In addition, Identity Engine allows you to create flexible apps that can change their authentication methods without having to alter a line of code.

* [Configure a Global Session Policy and authentication policies](/docs/guides/configure-signon-policy/)
* [App sign-on policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)
* [Policies (high-level concept)](/docs/concepts/policies/)

### Interaction code grant type for embedded authentication

To enable a more customized user authentication experience, Okta has introduced an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Okta Sign-In Widget).

### CAPTCHA

CAPTCHA is a well-known strategy for mitigating attacks by bots. Identity Engine offers registration, sign-in, and account recovery integration of the two market-leading CAPTCHA services &mdash; [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These are usable via Okta-hosted and embedded Sign-In Widgets, but not SDKs.

### App context in email templates

Identity Engine makes the app context available when a user enters an authentication flow. Context variables are available in our email templates, allowing customers to dynamically customize email style and content based on the app that an email notification is triggered from.

[Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context)

## Authentication deployment models

The Identity Engine user authentication deployment model can be divided into three approaches — redirect and embedded authentication. 

* Okta-hosted (redirect) Sign-In Widget &mdash; Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach — most secure and fastest to implement.
* Embedded Sign-In Widget &mdash; Embed the Okta Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* Embedded SDK-driven Sign-In &mdash; Use our SDKs to create a completely custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

See [Redirect authentication vs. embedded authentication](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](#) (WILL EVENTUALLY BE /docs/guides/sign-in-overview/) for practical implementation details.

## SDKs and sample apps

We have a whole host of SDKs available for integrating new OIE features into your apps using the deployment models described above, and sample apps to show them in action.

* [Browse our SDKs and samples](https://developer.okta.com/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic documentation approach

In our documentation we have started to move over to supporting Identity Engine by default, while still providing information for Classic engine users.

* Pages and page sections covering features that only work in Identity Engine will have a blue "Identity Engine" banner at the top.
* Content that works in Identity Engine and Classic will have no banner. Any slight differences will be covered in the page text.
* Content written for Classic that won't work in Identity Engine will have a note at the top, explaining what the issue is, and, if appropriate, where Identity Engine users can go to find support.
* For guides that have been extensively updated to support Identity Engine, we'll keep the classic version in our [Classic archive](ADD LINK), so it is still accessible if needed.

> **Note**: See [Identify your Okta solution](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-verify-version.html) to determine your Okta version.

## Accessing and upgrading to Identity Engine

From March 1 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) will be Identity Engine orgs, so all new customers can take advantage of the new features.

If you are a Classic customer who wants to upgrade their apps to use Identity Engine, bear in mind that

* the existing Okta-hosted Sign-In Widget works as is after upgrading your org.
* you should upgrade your embedded Sign-In Widget or SDK as you would normally do with other updates.

For help with upgrading, contact your account manager. If you don't have an account manager, contact [oie@okta.com](mailto:oie@okta.com) for more information.

For Classic customers who don't yet want to upgrade, your existing functionality will continue to work for now, including your Classic org, v1 API, and SDKs.