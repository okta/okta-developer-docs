---
title: Sign users in with Okta
excerpt: Learn about Okta's different authentication solutions.
layout: Guides
---

Okta provides authentication solutions that integrate seamlessly into your apps across a wide variety of platforms, whether you are developing an app for your employees or customers, building a portal for your partners, or exposing a set of APIs for others to access your data. Our solutions are built on top of the [OAuth 2.0 / OpenID Connect](/docs/concepts/oauth-openid/) standard, and we also support other options such as SAML.

## Never used Okta before?

Choose your app type and get started with our quickstarts.

<Cards>
  <Card href="/docs/guides/quickstart/" headerImage="/img/app-types/icon-server.png">Server-side web app</Card>
  <Card href="/docs/guides/quickstart/" headerImage="/img/app-types/icon-spa.png">Single-page app</Card>
  <Card href="/docs/guides/quickstart/" headerImage="/img/app-types/icon-mobile-app.svg">Mobile/native app</Card>
  <Card href="/docs/guides/quickstart/" headerImage="/img/app-types/icon-api.svg">Back-end API</Card>
</Cards>

## Primary considerations

Every app you add authentication to will have slightly different requirements, but there are some primary considerations that you’ll need to think about regardless of which app you are dealing with.

| Factors and assurance levels | Policies | Authentication models | Integrating Okta with your app |
| ---------------------------- | -------- | --------------------- | ------------------------------ |
| There are many different factors that you could choose to authenticate users, with different assurance levels (how effective the factors are at guaranteeing user identity) — from simple passwords to more sophisticated means such as biometrics. | Next, create policies in your Okta org to govern who needs to authenticate with which factors, and in which apps. If you are using Identity Engine you are able to create flexible apps that can change their authentication methods without having to alter a line of code. See [Configure a Global Session Policy and authentication policies](/docs/guides/configure-signon-policy/main/) for basic information. Our use cases (see [Choose your auth](#choose-your-auth)) contain information on what policies are required for each. | Okta has multiple options that you can choose for authentication, which provide trade-offs in terms of complexity, security, and customization. See [Choose your auth](#choose-your-auth). | Integrate Okta authentication with your app(s). Typically you create an [Okta org](/docs/concepts/okta-organizations/) and an app integration to represent your app inside Okta, inside which you configure your policies. Then, connect your app to Okta using whatever mechanism makes sense for the auth model you choose. |

**Other considerations**: There are a number of other things you need to consider, such as whether to use Single Sign-On, whether to add an external identity provider, and more. See [Next steps](#next-steps).

## Choose your auth

> **Note**: For more background on the different auth models, including basic flows and help with choosing between auth models, see [Redirect authentication vs. embedded authentication](https://developer.okta.com/docs/concepts/redirect-vs-embedded/).