---
title: OIDC and the OIN — A developer primer
excerpt: How to create OIDC app integrations to work with the Okta Integration Network
layout: Guides
---

This guide series provides a background primer for developers on how to create OpenID Connect (OIDC) applications specifically intended for publication in the Okta Integration Network (OIN).

It includes a simplified discussion of the OIDC layer, the OIDC protocol-level requirements for OIN application integrations, along with typical use cases, examples, exceptions, and best practices to help you bring your application integration to the OIN.

---

**Learning outcomes**

* Learn about the OIDC layer, and the OIDC protocol-level requirements for OIN application integrations.
* Discover typical use cases, examples, exceptions, and best practices to help you bring your application integration to the OIN.

---

## Overview

The Okta Integration Network is a collection of over 6,500 pre-built app integrations to connect and exchange secure authentication between users, devices, and applications. The app integrations are intended for customers who want a guided experience that still supports the most secure configuration options.

Application developers and ISVs can create app integrations using a free Okta [developer account](https://developer.okta.com/signup/) and any of the wide array of languages supported by Okta. If you haven’t already chosen a language for developing your app integration, check out our [docs](/docs/), [videos](https://www.youtube.com/c/OktaDev/), and [blogs](https://developer.okta.com/blog/) for ideas and guidance.

Single Sign-On (SSO) is an authentication method that enables end users to sign in to any cloud application or software system that is managed by an identity provider like Okta. After the end user has signed in to their Okta dashboard, clicking on any of the configured app integrations automatically signs the end user in to that application without requiring them to remember separate usernames and passwords.

There are two standard protocols that you can use to implement SSO in your OIN app integrations: Security Assertion Markup Language (SAML), and OpenID Connect (OIDC). Although there are plenty of materials available for [understanding](/docs/concepts/saml/) and [implementing](/docs/guides/build-sso-integration/saml2/main/) SAML with Okta, the purpose of this document is to help you understand how to implement the more modern standard of OIDC.

### OAuth 2.0 and OIDC

If you’ve previously developed applications using OAuth 2.0 or OIDC, you can skip ahead to the next section.

OAuth 2.0 and OIDC are modern protocols for handling identity and access management between systems. OAuth 2.0 provides capabilities for delegated authorization. OIDC authenticates users and securely exchanges user information. This guide focuses on understanding how OIDC works within the specific OIN context.

OAuth 2.0 provides security to API endpoints through access tokens. This enables an end user to delegate authorization for your client application in order to access API resources on a service on the user's behalf. OIDC extends the OAuth 2.0 flows to enable the client application to retrieve an identification (ID) token and additional information about the application's users. This provides authentication capabilities to the client application.

OIDC relies on a set of standardized API endpoints for verifying and sharing user identity metadata. OIDC makes use of the ID token which has a predefined set of scopes containing claims specifically intended for identity management. This ID token is communicated using a JSON web token (JWT) that has digital signatures to cryptographically sign the payload.

## Guides

This series contains the following parts:

* [OIDC and the OIN — Protocol-level requirements](/docs/guides/oin-oidc-protocols/): Background information on the protocol requirements for OIDC-based OIN applications.
* [OIDC and the OIN — Multi-tenancy](/docs/guides/oin-oidc-multi-tenancy/): multi-tenancy as it relates to Okta and OIN applications.
* [OIDC and the OIN — OIN integration best practices](/docs/guides/oin-oidc-best-practices/): OIN integration best practices, including logos and rate limits.

## Next steps

Begin your exploration by reading our [OIDC and the OIN — Protocol-level requirements](/docs/guides/oin-oidc-protocols/) guide.
