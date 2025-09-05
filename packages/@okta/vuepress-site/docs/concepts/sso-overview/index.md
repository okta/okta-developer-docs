---
title: Single sign-on overview
meta:
  - name: description
    content: A high-level overview of SSO.
---

# What is single sign-on (SSO)?

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

## SSO, Single Logout (SLO), and Universal Login

With SSO in Okta, a user authenticates once with Okta (the IdP) and can seamlessly access multiple apps, using federation protocols like SAML, OIDC, or WS-Fed. [​Single Logout (SLO)](/docs/guides/single-logout/saml2/main/) extends this by allowing a sign-out action from one app to propagate back to the IdP and, in turn, notify other connected apps to terminate their sessions. However, as SLO relies on each app’s protocol support, the sign-out experience can be inconsistent.

Universal Logout addresses these inconsistencies by creating a more reliable, central sign-out process. When a user signs out, it clears their main Okta session and revokes their tokens. This sign-out command is then sent to all connected apps, irrespective of the app's protocol. This ensures that user sessions are terminated completely and consistently across all integrations.

## SSO integrations in the Okta Integration Network (OIN)

The Okta Integration Network (OIN) is a catalog of pre-built integrations with thousands of apps. You can easily integrate Okta SSO to apps with a guided experience that still supports the most secure configuration options. To learn how to integrate Okta SSO with your apps, see [Overview of Single Sign-On in the OIN](https://developer.okta.com/docs/guides/oin-sso-overview/).

