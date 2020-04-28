---
title: Overview
---
As an application developer, you want to give your users the ability to sign in directly to your application through your Okta integration. Your application needs to support federated Single Sign-On (SSO). In this scenario, your application relies on Okta to serve as an external Identity Provider.

Okta supports two protocols for handling federated SSO:

* [OpenID Connect (OIDC)](/docs/concepts/auth-overview/#openid-connect)
* [Security Assertion Markup Language (SAML)](/docs/concepts/saml/)

Your choice of protocol depends mainly on your use case, but OIDC is generally recommended for new integrations.

## OIDC

* An identity layer on top of the [OAuth 2.0](https://oauth.net/2/) protocol.
* Verifies end-user identity and obtains profile information.
* Lightweight and REST-based.
* Ideal for mobile and cloud applications.
* Newer protocol with widespread usage. Some newer applications only support OIDC.
* Using the underlying OAuth 2.0 protocol, OIDC can:
  * Adapt to specific automated use cases like machine-to-machine or device authentication.
  * Request user consent to share profile details, satisfying privacy regulations like GDPR.

## SAML

* Widely used federation protocol for SSO in Web applications.
* Many SaaS providers support SAML integration to grant SSO access to end users.
* Specification doesn’t have user consent, although it can be built into the flow.
* Larger in size because XML messages are transmitted back and forth.

<NextSectionLink/>
