---
title: Single Sign-On overview
meta:
  - name: description
    content: A high-level overview of SSO.
---

# What is Single Sign-On (SSO)?

SSO is an authentication method that allows you to sign in to multiple apps and services using a single authentication flow. For example, instead of signing in to every app, you can authenticate once with an identity provider (IdP). It provides access to all other connected service providers (SPs).

When you implement SSO, you let a central IdP handle authentication for you. SSO operates on the federated identity concept, which links a user’s identity across multiple distinct identity management systems. After the IdP trusts a user, they're automatically granted access to all connected SPs. This frees you from managing user credentials and session security, and allows you to focus on your core business, such as the respective app functionality.

<div class="three-quarter">

![Single sign-on](/img/concepts/sso.png)

</div>

## How SSO differs from a basic a sign-in flow

| Features | Basic sign-in flow | SSO |
| --- | --- | --- |
| Authentication | Users enter credentials separately for each app. | Users authenticate once and gain access to multiple apps and services. |
| Security | Higher risk of password reuse and theft | Strong security with centralized policies like MFA |
| User experience | Users receive multiple prompts to sign in to each app. Multiple credentials increase password recovery needs. | Seamless access across apps after a user signs in, providing faster access and less friction|
| Management | Decentralized management requires app-by-app authentication and relies on an admin to create accounts | Centralized identity and access management through an IdP. This enables faster user onboarding and app access. |

## How Okta supports SSO

Okta is a cloud-based identity and access management (IAM) platform that acts as the centralized IdP for your users. Okta provides SSO integrations for thousands of cloud, on-premises, and mobile apps. The platform uses standard protocols such as OIDC, SAML, and SWA to maintain these integrations.
Okta also handles user verification, multifactor authentication (MFA), and lifecycle management, providing a robust and secure foundation for your app.

A user's SSO experience with Okta can happen in a few different ways:

* Okta End-User Dashboard: When a user signs in to their Okta dashboard using a single set of credentials, the dashboard displays a list of all their assigned apps. The user can click an app tile, which automatically signs them in without a second sign-in prompt.

* User sign-in flows: When a user tries to sign in to your service using their IdP account, Okta handles the entire authentication process in the background. The user can seamlessly sign in after a quick consent and start accessing content without having to create a separate account.

* SSO-integrated app: When the user navigates directly to your app's URL and your app detects that the user isn’t authenticated, it redirects them to the Okta sign-in page. After successful authentication, Okta sends the user back to your app, which then grants them access to resources.

In these scenarios, the user only has to remember a single credential, which is managed securely by Okta.

## Choose your SSO protocol

Okta supports two protocols for handling federated SSO: OpenID Connect (OIDC) and Security Assertion Markup Language (SAML). The SSO protocol that you choose to implement your app integration with is based on your app and use case. For new app integrations, OIDC is recommended.

| &nbsp; |  <span style="width: 24px;display:inline-block">![OIDC](/img/idp-logos/oidc.png)</span> OIDC | <span style="width: 22px;display:inline-block">![SAML](/img/idp-logos/saml.png)</span> SAML  |
| ------ | :------------------- | :----------------------- |
| **Description** | [OpenID Connect](/docs/concepts/oauth-openid/#openid-connect) extends OAuth 2.0 to provide an ID token that can be used to verify a user’s identity and sign them in to a cloud-based app. It's quickly becoming the new standard for SSO. | [Security Assertion Markup Language (SAML)](/docs/concepts/saml) is a traditional enterprise protocol for SSO in web apps. Okta supports SAML 2.0. |
| **Benefits** | <ul><li>A newer protocol with widespread and growing use</li> <li>Best Okta customer configuration experience</li> <li>Ideal for mobile and cloud apps</li> </ul> | <ul><li>Many people are familiar with SAML because it's an older protocol</li> <li>Widely used federation protocol for SSO in web apps</li> <li>Many SaaS providers support SAML integration to grant SSO access to end users</li></ul>|
| **Technology** | <ul><li>An identity layer on top of the [OAuth 2.0](https://oauth.net/2/) protocol</li> <li>Verifies end user identity and obtains profile information</li> <li>Lightweight and REST-based</li></ul> |   <ul><li>XML-based messages</li> <li>The specification doesn’t have user consent, although it can be built into the flow</li> </ul> |
| **Resources** | <ul><li>[OpenID Connect Foundation](https://openid.net/connect/)</li></ul>| <ul><li>[SAML 2.0 Technical Overview](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html) </li></ul> |
| **Get started** | <ul><li>[Build an Okta SSO integration with OIDC]( /docs/guides/create-an-app-integration/openidconnect/main/)  </li></ul>| <ul><li>[Build an Okta SSO integration with SAML](/docs/guides/create-an-app-integration/saml2/main/) </li></ul> |

## SSO, Single Logout (SLO), and Universal Login

With SSO in Okta, a user authenticates once with Okta (the IdP) and can seamlessly access multiple apps, using federation protocols like SAML, OIDC, or WS-Fed. [​Single Logout (SLO)](/docs/guides/single-logout/saml2/main/) extends this by allowing a sign-out action from one app to propagate back to the IdP and, in turn, notify other connected apps to terminate their sessions. However, as SLO relies on each app’s protocol support, the sign-out experience can be inconsistent.

Universal Logout addresses these inconsistencies by creating a more reliable, central sign-out process. When a user signs out, it clears their main Okta session and revokes their tokens. This sign-out command is then sent to all connected apps, irrespective of the app's protocol. This ensures that user sessions are terminated completely and consistently across all integrations.

## SSO integrations in the Okta Integration Network (OIN)

The Okta Integration Network (OIN) is a catalog of pre-built integrations with thousands of apps. You can easily integrate Okta SSO to apps with a guided experience that still supports the most secure configuration options.

For information on SSO integrations in the Okta Integration Network (OIN), see [Publish an OIN integration](/docs/guides/submit-app-overview/).
