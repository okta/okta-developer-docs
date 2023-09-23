---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Learn about Okta Identity Engine app developer features, the authentication deployment models, as well as the SDKs and sample app available.
---


<ApiLifecycle access="ie" />

# How Identity Engine works

Okta Identity Engine is a set of features and deployment models that provide flexible way to add authentication to your app. You can use the SDKs to integrate the Identity Engine features into your app or you can test the Identity Engine features using the sample apps.

## Identity Engine app developer features

Identity Engine provides the following main developer capabilities to add authentication to your app.

|Feature| Description|
|---|---|
|[App context in email templates](/docs/guides/custom-email/main/#use-app-context)| Identity Engine makes the app context available when a user enters an authentication flow.The context variables that are available in the Okta email templates allow customers to dynamically customize the email style and content based on the app that an email notification is triggered from.|
|App intent links|App intent links are used to signal intent to access an application. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an application. Both Identity Provider and Service Provider initiated flows are supported.|
|[Authentication policies](/docs/concepts/policies/)| Authentication policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that allow organizations to model security outcomes for an app. These policies are shareable across applications. |
|[CAPTCHA](/docs/api/openapi/okta-management/management/tag/CAPTCHA/)|CAPTCHA is a challenge-response test for mitigating attacks by bots. Identity Engine offers registration, sign-in, and account recovery integration of the two market-leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/). |
|[Interaction code grant type](/docs/concepts/interaction-code/) | The Interaction Code grant type an extension to the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid) that enables a more customized user authentication experience. This grant type allows apps using an embedded Okta Sign-In Widget and/or SDK to manage user interactions with the authorization server directly, rather than relying on a browser-based redirect to an authentication component such as the Sign-In Widget.|

For a complete list of new features refer to the Okta Identity Engine [Release Notes page](docs/release-notes/2023-okta-identity-engine/).

## Deployment model

Identity Engine offers the following deployment models to meet your app's authentication needs:

* **Redirect Okta Sign-In Widget**: Use the Okta-hosted Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach because it is the most secure and the fastest way to implement Identity Engine into your app.
* **Embedded Okta Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This approach provides a balance between complexity and customization.
* **Embedded SDK-driven sign-in flow**: Use our SDKs to create a custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control.

Refer to [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for more details about of the different deployment models. If you know what the deployment model you want to use, then refer to the [Sign users in](/docs/guides/sign-in-overview/) to start implementing Identify Engine in you app.

## SDKs and sample apps

SDKs are available to help you integrate Identity Engine features into your apps using the deployment models described above. You can use the Identity Engine sample app to see the features and deployment models in action.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Okta Classic Engine

As of March 1, 2022, all new [Okta organizations (org)](/docs/concepts/okta-organizations/) are Identity Engine orgs, so that all new customers can take advantage of the new features. Refer to [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

If you are a Classic Engine customer who wants to upgrade their apps to use Identity Engine, then refer to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).
