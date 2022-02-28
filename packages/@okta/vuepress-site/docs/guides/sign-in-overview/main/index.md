---
title: Sign users in overview
excerpt: Learn about Okta's different authentication solutions.
layout: Guides
---

Okta provides authentication solutions that integrate seamlessly into your apps across a wide variety of platforms, whether you are developing an app for your employees or customers, building a portal for your partners, or creating another solution that requires a sign-in flow. Our solutions are built on top of the [OAuth 2.0 / OpenID Connect](/docs/concepts/oauth-openid/) standard, and we also support other options such as [SAML](/docs/concepts/saml/).

## Never used Okta before?

Choose your app type and get started with our quickstarts.

<Cards>
  <Card href="/docs/guides/quickstart/" headerImage="/img/app-types/icon-server.png">Server-side web app</Card>
  <Card href="/docs/guides/quickstart/" headerImage="/img/app-types/icon-spa.png">Single-page app</Card>
  <Card href="/docs/guides/quickstart/" headerImage="/img/app-types/icon-mobile-app.png">Mobile/native app</Card>
</Cards>

## Primary considerations

Every app you add authentication to has slightly different requirements, but there are some primary considerations that you need to think about regardless of which app you are dealing with.

| Authentication methods | Assurance levels | Policies | Deployment models |
| ---------------------- | ---------------- | -------- | ----------------- |
| There are many different methods that you could choose to authenticate users &mdash; ranging from a simple challenge based on something they know like a password, to something more sophisticated involving a device they own (like an SMS or call) or a personal attribute (like Biometrics). | To guarantee that the user is who they say they are, you can combine different authentication methods for higher security requirements. Furthermore, you can also require device context (such as known, on company network, managed) to increase the assurance level. | Create policies in your Okta org to govern who needs to authenticate with which methods, and in which apps. If you are using Okta Identity Engine, you are able to create flexible apps that can change their authentication methods without having to alter a line of code. See [Configure Okta Sign-On and App Sign-On Policies](/docs/guides/configure-signon-policy/main/) for basic information. Our use cases contain information on what policies are required for each. | Okta has multiple options that you can choose for authentication that provide trade-offs in terms of complexity, security, and customization. See [Choose your auth](#choose-your-auth). |

After you have an idea of the above considerations, you can integrate Okta authentication with your app(s). Typically, you create an [Okta org](/docs/concepts/okta-organizations/) and an app integration to represent your app inside Okta, inside which you configure your policies. Then, connect your app to Okta using whatever mechanism makes sense for the deployment model that you choose.

**Other considerations**: There are a number of other things that you need to consider, such as whether to use Single Sign-On, to add an external identity provider, and more. See [Next steps](#next-steps).

## Choose your auth

| &nbsp; | Okta-hosted Sign-In Widget | Embedded Sign-In Widget | Embedded SDK-driven Sign-In |
| ------ | -------------------------- | ----------------------- | ------------------------- |
| &nbsp; | Use the redirect (Okta-hosted) Sign-In Widget to authenticate your users, then redirect back to your app. This is the recommended approach &mdash; most secure and fastest to implement. | Embed the Okta Sign-In Widget into your own code base to handle the authentication on your servers. This provides a balance between complexity and customization. | Use our SDKs to create a completely custom authentication experience. This option is the most complex and leaves you with the most responsibility, but offers the most control. |
| **Effort** | <span style="width: 50%;display:block">![Low](/img/ratings/low.png)</span> | <span style="width: 50%;display:block">![Medium](/img/ratings/medium.png)</span> | <span style="width: 50%;display:block">![High](/img/ratings/high.png)</span> |
| **Maintenance** | <span style="width: 50%;display:block">![Low](/img/ratings/low.png)</span> No updates required | <span style="width: 50%;display:block">![Medium](/img/ratings/medium.png)</span> Requires updating widget packages | <span style="width: 50%;display:block">![High](/img/ratings/high.png)</span> Requires updating SDK packages and adapting to changes |
| **Security** | The most secure option. No XSS attacks, Okta takes care of it all | Responsibility shared with Okta | Security is your responsibility |
| **Customization** | Managed branding and customization options for domains, emails, sign-in page, and more. | Most substantial customization options | Full customization |
| **Learn more** | Redirect auth for [web apps](/docs/guides/sign-into-web-app-redirect/), [mobile apps](/docs/guides/sign-into-mobile-app-redirect/), and [single-page apps](/docs/guides/sign-into-spa-redirect/).<br>[Redirect auth use cases](/docs/guides/sampleapp-oie-redirectauth/android/main/)<br>[Customize the hosted widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget) | [Embedded widget fundamentals](/docs/guides/embedded-siw/)<br>[Set up our Identity Engine sample apps](/docs/guides/oie-embedded-common-org-setup/android/main/)<br>[Embedded widget use cases](/docs/guides/oie-embedded-widget-use-case-load/)<br>[Customize the embedded widget](/docs/guides/custom-widget/main/#style-the-self-hosted-sign-in-widget) | [Auth.js fundamentals](/docs/guides/auth-js/)<br>[Set up our Identity Engine sample apps](/docs/guides/oie-embedded-common-org-setup/android/main/)<br>[Embedded SDK use cases](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/)<br>[Okta SDKs reference](/code/)<br>[Authentication API](/docs/reference/api/authn/)|

For more background on the different auth models, including basic flows and help with choosing between auth models, see [Redirect authentication vs. embedded authentication](https://developer.okta.com/docs/concepts/redirect-vs-embedded/).

> **Note**: Direct calls to the Identity Engine APIs that underpin much of the Identity Engine authentication pipeline aren't supported &mdash; use the Embedded SDKs instead.

<EmbeddedBrowserWarning />

## Next steps

* [Add an external identity provider](/docs/guides/identity-providers/)
* [Configure an access policy](http://localhost:8080/docs/guides/configure-access-policy/main/)
* [Configure a Global Session Policy and authentication policies](/docs/guides/configure-signon-policy/main/)
* [Single Sign-On](/docs/guides/build-sso-integration/openidconnect/main/)