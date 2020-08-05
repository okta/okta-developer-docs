---
title: Overview
---
As an application developer, you want to give your users the ability to sign in directly to your application using Okta for identity management. To do so, your application needs to support federated Single Sign-On (SSO). In this scenario, your application relies on Okta to serve as an external Identity Provider (IdP).

## Choosing a protocol

Okta supports two protocols for handling federated SSO:

* [OpenID Connect (OIDC)](/docs/concepts/auth-overview/#openid-connect)
* [Security Assertion Markup Language (SAML)](/docs/concepts/saml/)

Your choice of protocol depends mainly on your use case, but OIDC is generally recommended for new integrations.

### OIDC features

* An identity layer on top of the [OAuth 2.0](https://oauth.net/2/) protocol.
* Verifies end-user identity and obtains profile information.
* Lightweight and REST-based.
* Ideal for mobile and cloud applications.
* Newer protocol with widespread usage. Some newer applications only support OIDC.

### SAML features

* Widely used federation protocol for SSO in Web applications.
* Many SaaS providers support SAML integration to grant SSO access to end users.
* Specification doesn’t have user consent, although it can be built into the flow.
* Larger in size because XML messages are transmitted back and forth.

## Organizations

In a typical scenario, your application relies on Okta to act as a multi-tenant Identity Provider (IdP) for your customers' Okta organizations.

An [Okta org](/docs/concepts/okta-organizations/) acts as a container that sets hard boundaries for all users, applications, and other entities associated with a single customer, providing tenant-based isolation.

In developing your SSO app integration, the customer’s Okta org serves as the Authorization Server (OIDC) or as the IdP (SAML).

## Publishing

This guide assumes you intend to develop an app integration and make it public by publishing it in the Okta Integration Network (OIN). If you want to develop a custom app integration that is intended for private deployment within your own company, use the Okta [App Integration Wizard (AIW)](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard) to create your app integration.

<NextSectionLink/>
