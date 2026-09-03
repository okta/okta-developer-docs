---
title: Sign users in overview
excerpt: Learn about Okta's different authentication solutions.
layout: Guides
---

Okta provides authentication solutions that integrate seamlessly into your apps across a wide variety of platforms. You can develop an app for your employees or customers, build a portal for your partners, or create another solution that requires a sign-in flow. Our solutions are built on top of the [OAuth 2.0 / OpenID Connect](/docs/concepts/oauth-openid/) standard, and Okta also supports other options such as [SAML](/docs/concepts/saml/).

## Never used Okta before?

Choose your app type and get started with signing users in.

<Cards>
  <Card href="/docs/guides/quickstart/main/#server-side-web-app" headerImage="/img/app-types/icon-server.png">Server-side web app</Card>
  <Card href="/docs/guides/quickstart/main/#front-end-web-app" headerImage="/img/app-types/icon-spa.png">Front-end web app</Card>
  <Card href="/docs/guides/quickstart/main/#mobile-native-app" headerImage="/img/app-types/icon-mobile-app.png">Mobile/native app</Card>
</Cards>

## Already on Identity Engine and modernizing an existing flow?

If you've already upgraded to Okta Identity Engine, and you're updating an existing Classic Engine authentication implementation:

<!-- * Modernize your sign-in and SSO flows with Okta Identity Engine (link to journey): A step-by-step journey for teams replacing Classic Engine auth patterns with Identity Engine-supported deployment models. -->
[Choose your Identity Engine authentication modernization approach](/docs/guides/oie-choose-signin-deploy/main/): A ranked decision guide for choosing between redirect, embedded widget, embedded SDK, and direct authentication.
<!-- * Manage the identifier-first sign-in transition (New - see link for details): Plan for the visible UX changes when moving an existing app to Identity Engine. -->


## Primary considerations

Each app that you add authentication to has slightly different requirements. But there are some primary considerations that you need to think about regardless of which app you’re dealing with.

| Authentication methods | Assurance levels | Policies | Deployment models |
| ---------------------- | ---------------- | -------- | ----------------- |
| There are many different methods that you can choose to authenticate users, ranging from a simple challenge based on something they know like a password. Or use something more sophisticated involving a device that they own (like an SMS or call) or a personal attribute (like biometrics). | To guarantee that the user is who they say they are, you can combine different authentication methods for higher security requirements. | Create policies in your Okta org to govern who needs to authenticate with which methods, and in which apps. If you’re using Okta Identity Engine, you can create flexible apps where you can change their authentication methods without having to alter any code. See [Configure a global session policy and app sign-in policies](/docs/guides/configure-signon-policy/main/) for basic information. Our use cases contain information on what policies are required for each. | Okta has multiple authentication solutions that provide trade-offs in terms of implementation complexity, maintenance, security, and degrees of customization. See [Choose your auth](#choose-your-auth). |

After reviewing the primary considerations, you can integrate Okta authentication with your app. Typically, you create an [Okta org](/docs/concepts/okta-organizations/) and an app integration to represent your app inside Okta, inside which you configure your policies. Then, connect your app to Okta using whatever mechanism makes sense for the deployment model that you choose.

**Other considerations**: There are several other things that you need to consider, such as whether to use Single Sign-On, to add an external identity provider, and more. See [Next steps](#next-steps).

## Choose your auth

| &nbsp; | Okta-hosted Sign-In Widget | Embedded Sign-In Widget (Gen 2) | Embedded SDK-driven sign-in flow| Direct authentication |
| ------ | -------------------------- | ----------------------- | ------------------------- | ------------------------- |
| &nbsp; | Use a standards-based federation flow (SAML, OIDC, or OAuth) to delegate the entire sign-in experience to Okta. Okta hosts, maintains, and evolves the sign-in experience for you. This is the recommended approach because it's the most secure, easiest to maintain, and inherits new authenticator support automatically. | Embed the Okta Sign-In Widget (Gen2) into your own code base to host the authentication client on your servers. The third-generation (Gen3) widget is delivered as the Okta-hosted sign-in flow that's supported for self-hosted embedding. Embedding provides a balance between complexity and customization. | Use our SDKs to create a custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control. | Use direct authentication for native, server-side, or machine-to-machine flows where a browser flow isn't possible. |
| **Effort** | <img src="/img/ratings/low.png" alt="Low" style="width: 100px; max-width: 100px;"> | <img src="/img/ratings/medium.png" alt="Medium" style="width: 100px; max-width: 100px;"> | <img src="/img/ratings/high.png" alt="High" style="width: 100px; max-width: 100px;"> | <img src="/img/ratings/medium.png" alt="Medium" style="width: 100px; max-width: 100px;"> to <img src="/img/ratings/high.png" alt="High" style="width: 100px; max-width: 100px;"> |
| **Maintenance** | <img src="/img/ratings/low.png" alt="Low" style="width: 100px; max-width: 100px;"><br> No updates required | <img src="/img/ratings/medium.png" alt="Medium" style="width: 100px; max-width: 100px;"><br> Requires updating widget packages | <img src="/img/ratings/high.png" alt="High" style="width: 100px; max-width: 100px;"><br> Requires updating SDK packages and adapting to changes | <img src="/img/ratings/medium.png" alt="Medium" style="width: 100px; max-width: 100px;"> |
| **Security** | The most secure option. No XSS attacks, Okta takes care of it all | Responsibility shared with Okta | Security is your responsibility | Security is your responsibility |
| **Customization** | Substantial managed customization options for domains, emails, sign-in page CSS, and brand-aligned page customization, all without taking on the maintenance and security burden of self-hosting. | Most substantial customization options | Full customization | Full UX, no UI |
| **Authenticator evolution** | Inherited from Okta automatically (passkeys, WebAuthn, YubiKey, future authenticators) | Tied to your widget version. Requires upgrades | Tied to SDK version. Varies by platform. Some authenticators (notably passkeys) are limited or platform-dependent | Tied to API version. Limited UI aﬀordances for modern authenticators |
| **Learn more** | <ul><li>Redirect auth for [web apps](/docs/guides/sign-into-web-app-redirect/), [mobile apps](/docs/guides/sign-into-mobile-app-redirect/), and [single-page apps](/docs/guides/sign-into-spa-redirect/)</li><li>[Redirect auth use cases](/docs/guides/sampleapp-oie-redirectauth/android/main/)</li><li>[Customize the hosted widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)</li></ul> | <ul><li>[Embedded widget fundamentals](/docs/guides/embedded-siw/)</li><li>[Sample app setup](/docs/guides/set-up-org/)</li><li>[Embedded widget use cases](/docs/guides/oie-embedded-widget-use-case-load/)</li><li>[Customize the embedded widget](/docs/guides/custom-widget/main/#style-the-self-hosted-sign-in-widget)</li></ul> | <ul><li>[Auth JS fundamentals](/docs/guides/auth-js/)</li><li>[Sample app setup](/docs/guides/oie-embedded-common-org-setup/android/main/)</li><li>[Embedded SDK use cases](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/)</li><li>[Okta SDKs reference](/code/)</li></ul>| [Configure Direct Authentication](/docs/guides/configure-direct-auth-grants/main/) |

For more background on the different deployment models, including basic flows and help with choosing between models, see [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/).

> **Note**: Direct calls to the Identity Engine APIs that underpin much of the Identity Engine authentication pipeline aren't supported &mdash; use the embedded SDKs instead.

<EmbeddedBrowserWarning />

## Upgrade from Okta Classic Engine to Okta Identity Engine

If you’re a Classic Engine customer who wants to upgrade their apps to use Identity Engine for authentication, go to [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/).

Before you start, [identify your Okta authentication integrations and customizations](/docs/guides/oie-upgrade-identify-integrations/) to inventory every sign-in, SDK, API, and automation point that needs testing.

After you upgrade, [audit your Classic API dependencies](/docs/guides/oie-upgrade-audit-classic-api-dependencies/) to find any Classic patterns that remain and map each one to a supported Identity Engine path.
<!-- After you upgrade, see [Replace Classic Engine auth flows with Identity Engine]() to replace Classic Engine auth patterns with Identity Engine-supported flows. -->

## Next steps

* [Add an external identity provider](/docs/guides/identity-providers/)
* [Configure an access policy](/docs/guides/configure-access-policy/main/)
* [Configure a global session policy and app sign-in policies](/docs/guides/configure-signon-policy/main/)
