---
title: Prepare your integration
---

As an app developer, you want to give your users the ability to sign in directly to your Okta integration. Your application needs to support federated Single Sign-On. In this scenario, your application relies on Okta to serve as an external Identity Provider.

Okta supports two protocols for handling federated Single Sign-On:

* [Open ID Connect (OIDC)](https://openid.net/connect/)
* [Security Assertion Markup Language (SAML)](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language).

Your choice of protocol depends mainly on your use case, but OIDC is generally recommended for new integrations.

### OIDC

* Provides an identity layer on top of the OAuth 2.0 protocol.
* Verifies end-user identity and obtains profile information.
* Newer protocol with widespread usage.
* Lightweight and REST-based.
* Ideal for mobile and cloud applications.
* Combine with [OAuth 2.0](https://oauth.net/2/) protocol for use cases like machine-to-machine or device authentication.
* Some newer applications only support Single Sign-On using OIDC, although there is usually a workaround for federating through a remote identity provider using SAML and OIDC.
* User consent is an available feature of the underlying OAuth 2.0 layer. OIDC can request permission to share user profile details, so it satisfies many privacy regulations like GDPR.

### SAML

* Widely used federation protocol for SSO in Web applications.
* Many SaaS providers support SAML integration to give SSO access to end users.
* The SAML specification doesn’t have user consent flow, although it can be built into the flow.
* SAML is larger in size because XML messages are transmitted back and forth.

After you have decided which protocol is the right one for your needs, you will need to gather some information for your OIDC or SAML implementation.

<StackSelector snippet="prep" />

<NextSectionLink/>
