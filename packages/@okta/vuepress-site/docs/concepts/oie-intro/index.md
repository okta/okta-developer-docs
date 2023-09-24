---
title: Okta Identity Engine overview
meta:
  - name: description
    content: Learn about Okta Identity Engine features, the authentication deployment models, and the tools available to.
---


<ApiLifecycle access="ie" />

# How Identity Engine works

Okta Identity Engine is a set of features that provide a flexible way to add and deploy authentication to your app. You can use the SDKs to integrate Identity Engine capabilities into your app, or you can try Identity Engine features using sample apps.

## Identity Engine main features

Identity Engine provides the following main authentication capabilities for your app.

|Feature| Description|
|---|---|
|[App context in email templates](/docs/guides/custom-email/main/#use-app-context)| Identity Engine makes the app context available when users enter an authentication flow. The context variables that are available in the Okta email templates allow customers to dynamically customize the email style and content based on the app that an email notification is triggered from.|
|[App intent links](/docs/concepts/app-intent-links/)|App intent links are used to signal intent to access an application. These links are protocol-specific endpoints that you can use to initiate a sign-in flow to an application. Both Identity Provider and Service Provider-initiated flows are supported.|
|[Authentication policies](/docs/concepts/policies/)| Authentication policies are [security policy frameworks](https://csrc.nist.gov/publications/detail/sp/800-63b/final) that allow organizations to model security outcomes for an app. These policies cna be shared across applications.|
|[CAPTCHA](/docs/api/openapi/okta-management/management/tag/CAPTCHA/)|CAPTCHA is a challenge-response test for mitigating attacks by bots. Identity Engine offers registration, sign-in, and account recovery integration of the two market-leading CAPTCHA services: [hCAPTCHA](https://www.hcaptcha.com/) and [reCAPTCHA](https://www.google.com/recaptcha/about/).|
|[Interaction code grant type](/docs/concepts/interaction-code/) |The Interaction Code grant type extends the [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid), enabling a more customized user authentication experience. This grant type allows apps using an embedded Okta Sign-In Widget or SDK to manage user interactions with the authorization server directly rather than relying on a browser-based redirect to an authentication component such as the Sign-In Widget.|

For a list of new features, refer to the Okta Identity Engine [Release Notes page](docs/release-notes/2023-okta-identity-engine/).

## Deployment model

Identity Engine provides the following deployment models to add authentication to your app:

* **Redirect model with the Okta-hosted Sign-In Widget**: Use the Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach because it is the most secure and the fastest way to implement Identity Engine into your app.
* **Embedded model with the Sign-In Widget**: Embed the Sign-In Widget into your own code base to handle the authentication on your servers. This approach provides a balance between complexity and customization.
* **Embedded model with SDK-driven sign-in flow**: Use the Identity Engine SDKs to create a custom authentication experience. This option is the most complex and but offers the most control.

Refer to [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/) for more details about of the different deployment models. If you know what the deployment model you want to use, then refer to the [Sign users in](/docs/guides/sign-in-overview/) to start implementing Identify Engine in you app.

## SDKs and sample apps

SDKs are available to help you integrate Identity Engine capabilities into your app. You can use the Identity Engine sample app to try the features and deployment models.

* [Browse our SDKs and samples](/code/)
* [Set up and explore our Identity Engine sample apps](/docs/guides/oie-embedded-common-download-setup-app/)

## Okta Classic Engine

As of March 1, 2022, new [Okta organizations (org)](/docs/concepts/okta-organizations/) are Identity Engine orgs. Refer to [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to check your Okta version.

If you're a Classic Engine customer and want to upgrade your app to use Identity Engine, then refer to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).
