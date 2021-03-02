---
title: Overview
---

> **Note:** This is an <ApiLifecycle access="ea" /> feature. You can enable an [Early Access (Self-Service)](/docs/reference/releases-at-okta/#early-access-ea) feature for your org in the **Settings** > **Features** page inside the Admin Console.

The SAML 2.0 Assertion flow is intended for a client app that wants to use an existing trust relationship without a direct user approval step at the authorization server. It enables a client application to obtain an authorization from a valid, signed SAML assertion from the SAML Identity Provider. The client app can then exchange it for an OAuth access token from the OAuth authorization server. For example, this flow is useful when you want to fetch data from APIs that only support delegated permissions without prompting the user for credentials.

To use a SAML 2.0 Assertion as an authorization grant, the client makes a SAML request to the Identity Provider and the Identity Provider sends the SAML 2.0 Assertion back in the response. The client then makes a request for an access token with the `urn:ietf:params:oauth:grant-type:saml2-bearer` grant type and includes the `assertion` parameter. The value of the `assertion` parameter is the SAML 2.0 assertion that is Base64 encoded. You can send only one SAML assertion in that request.

> **Note:** See our [SAML concept page](/docs/concepts/saml/) for more information on SAML.

At a high level, the SAML 2.0 Assertion flow has the following steps:

- The client app makes a SAML request to the Identity Provider
- Identity Provider responds to the client app with a SAML 2.0 assertion
- The client app sends the Base64-encoded SAML 2.0 assertion in a request to the Okta Authorization Server to exchange the assertion for a token(s)
- The Okta Authorization Server verifies the assertion and responds with the access token (optionally ID token, refresh token)
- The client app makes a request with the access token to the resource server

See our [OAuth 2.0 overview](/docs/concepts/oauth-openid/#saml-2-0-assertion-flow) for more information on the SAML 2.0 Assertion grant flow.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
