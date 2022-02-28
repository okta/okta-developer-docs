---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Find out more about Okta's Identity Engine authentication flow, what developer features it unlocks, and how to use it.
---

Okta Identity Engine is Okta's new authentication pipeline that provides valuable new features and a more flexible approach to your auth needs. This article provides a high-level introduction.

Below we explain what new features the Identity Engine brings to the table, we discuss the deployment models that make use of these features, and show how our documentation experience is changing to support it.

> **Note**: If you are an admin, or are looking for product docs related to the Identity Engine, see the Identity Engine [Get started page](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-get-started.htm?cshid=ext-get-started-oie) over in the Okta Help Center.

## The Identity Engine new features

The Identity Engine unlocks many new capabilities.

### App-level policies

App-level policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that allow organizations to model security outcomes for an app. These policies are shareable across applications. For example, you can automatically step up authentication to a strong non-phishable factor when elevated risk is detected. Additionally, the Identity Engine allows you to create flexible apps that can change their authentication methods without having to alter a line of code.

* [Configure a Global Session Policy and authentication policies](/docs/guides/configure-signon-policy/)
* [App sign-on policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop)
* [Policies (high-level concept)](/docs/concepts/policies/)

### Interaction code grant type for embedded authentication

To enable a more customized user authentication experience, Okta introduces an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) standard called the [Interaction Code grant type](/docs/concepts/interaction-code/). This grant type allows apps using an embedded Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component (such as the Okta Sign-In Widget).

### CAPTCHA

CAPTCHA is a well-known strategy for mitigating attacks by bots. The Identity Engine offers registration, sign-in, and account recovery integration of the two market-leading CAPTCHA services &mdash; [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). These are usable through Okta-hosted and embedded Sign-In Widgets, but not SDKs.

### App context in email templates

The Identity Engine makes the app context available when a user enters an authentication flow. Context variables are available in our email templates, allowing customers to dynamically customize email style and content based on the app that an email notification is triggered from.

[Customize email notifications > Use app context](/docs/guides/custom-email/main/#use-app-context)

## Authentication deployment models

The Identity Engine user authentication deployment model can be divided into three approaches:

* **Okta-hosted (redirect) Sign-In Widget**: Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach &mdash; most secure and fastest to implement.
* **Embedded Sign-In Widget**: Embed the Okta Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization.
* **Embedded SDK-driven Sign-In**: Use our SDKs to create a completely custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

See [Redirect authentication vs. embedded authentication](/docs/concepts/redirect-vs-embedded/) for an overview of the different deployment models, and see [Sign users in](/docs/guides/sign-in-overview/) for practical implementation details.

## SDKs and sample apps

We have a whole host of SDKs available for integrating new Identity Engine features into your apps using the deployment models described above and sample apps to show them in action.

* [Browse our SDKs and samples](https://developer.okta.com/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Identity Engine versus Classic documentation approach

In our documentation we have started to move towards supporting the Identity Engine by default, while still providing information for Okta Classic Engine users.

* Pages and page sections covering features that only work in the Identity Engine have a blue Identity Engine banner at the top.
* Content that works in both the Identity Engine and the Classic Engine have no banner. Any slight differences is covered in the page text.
* Content written for the Classic Engine, that won't work in the Identity Engine, has a note at the top that explains what the issue is, and, if appropriate, where the Identity Engine users can go to find support.
* For guides that have been extensively updated to support the Identity Engine, we keep the Classic Engine version in our [Classic archive](ADD LINK), so it's still accessible if needed.

> **Note**: See [Identify your Okta solution](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-verify-version.html) to determine your Okta version.

## Access and upgrade to the Identity Engine

On March 1, 2022, all new [Okta orgs](/docs/concepts/okta-organizations/) are Identity Engine orgs, so that all new customers can take advantage of the new features.

If you are a Classic Engine customer who wants to upgrade their apps to use the Identity Engine, bear in mind that:

* The existing Okta-hosted Sign-In Widget works as is after you upgrade your org.
* You should upgrade your embedded Sign-In Widget or SDK as you would normally do with other updates.

For help with upgrading, contact your account manager. If you don't have an account manager, contact [oie@okta.com](mailto:oie@okta.com).

For the Classic Engine customers who don't yet want to upgrade, your existing functionality continues to work for now, including your Classic Engine org, v1 API, and SDKs.
