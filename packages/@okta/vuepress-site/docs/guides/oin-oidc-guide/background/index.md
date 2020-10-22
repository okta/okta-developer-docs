---
title: Background
---

The Okta Integration Network is a collection of over 6,500 pre-built app integrations to connect and exchange secure authentication between users, devices, and applications. The app integrations are intended for customers who want a ‘guided’ experience that still supports the most secure configuration options.

Application developers and ISVs can create app integrations using the free Okta developer account and any of the wide array of languages supported by Okta, connecting either directly through programmatic language APIs or by using Okta-approved SDKs. If you haven’t already chosen a language for developing your app integration, check out our [docs](https://developer.okta.com/docs/),[videos](https://www.youtube.com/c/OktaDev/) and [blogs](https://developer.okta.com/blog/) for ideas and guidance.

If you’ve previously developed applications using OAuth 2.0 or OIDC, you can skip ahead to the next section.

OAuth 2.0 and OIDC are modern protocols for handling identity and access management between systems. OAuth 2.0 controls authorization. OIDC authenticates users and securely exchanges user information after they have been authorized to access protected resources using the OAuth component.

OAuth provides security to API connections through access tokens and enables you to delegate Authentication Requests made against your application over to Okta. OIDC extends that functionality, enabling you to retrieve and store authentication information about your users and providing single sign-on (SSO) capability to your client application.

OIDC relies on a set of standardized API endpoints for verifying and sharing user identity metadata. OIDC makes use of an ID token which has a predefined set of scopes containing claims specifically intended for identity management. This ID token is communicated using a JSON web token (JWT) that has digital signatures to cryptographically sign the payload.

For more information on how the OIDC and OAuth protocols function, see the linked documents in the Reference section.

<NextSectionLink/>
