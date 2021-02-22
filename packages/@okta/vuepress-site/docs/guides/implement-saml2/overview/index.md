---
title: Overview
---

Use the SAML 2.0 Assertion grant flow to request an access token when a client app wants to use an existing trust relationship without a direct user approval step at the authorization server. For example, this flow is useful when you want to fetch data from APIs that only support delegated permissions without prompting the user for credentials. It enables a client application to reuse an existing authorization by supplying a valid, signed SAML assertion to the OAuth authorization server in exchange for an OAuth access token.

To use a SAML 2.0 Assertion as an authorization grant, the client makes a request for an access token with the `urn:ietf:params:oauth:grant-type:saml2-bearer` grant type and includes the `assertion` parameter. The value of the `assertion` parameter is a single SAML 2.0 assertion that is base64 encoded.

> **Note:** See our [SAML concept page](/docs/concepts/saml/) for more information on SAML.

At a high level, the SAML 2.0 Assertion flow has the following steps:

- A request is made to access a protected resource on a resource server (not shown)
- Resource server passes the request to the OAuth Client app
- The OAuth Client app makes a SAML request to the Identity Provider
- Identity Provider responds to the OAuth Client app with a SAML 2.0 assertion
- The OAuth Client app sends the SAML 2.0 assertion in a request to the Okta Authorization Server to exchange the assertion for a token(s)
- The Okta Authorization Server verifies the assertion and responds with the access token (optionally ID token, refresh token)
- The OAuth client app forwards the access token with the resource request to the resource server
- The resource server grants access to the requested resource.

See our [OAuth 2.0 overview](/docs/concepts/oauth-openid/#saml-2-0-assertion-flow) for more information on the SAML 2.0 Assertion grant flow.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
