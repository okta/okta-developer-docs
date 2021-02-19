---
title: Overview
---

Use the SAML 2.0 Assertion grant flow to request an access token when a client app wants to use an existing trust relationship without a direct user approval step at the authorization server. For example, this flow is useful when you want to fetch data from APIs that only support delegated permissions without prompting the user for credentials. It enables a client application to reuse an existing authorization by supplying a valid, signed SAML assertion to the OAuth authorization server in exchange for an OAuth access token.

To use a SAML 2.0 Assertion as an authorization grant, the client makes a request for an access token with the `urn:ietf:params:oauth:grant-type:saml2-bearer` grant type and includes the `assertion` parameter. The value of the `assertion` parameter is a single SAML 2.0 assertion that is base64 encoded.

> **Note:** See our [SAML concept page](/docs/concepts/saml/) for more information on SAML.

At a high level, the SAML 2.0 Assertion flow has the following steps:

- On behalf of a user, your web application attempts to access a resource that is hosted on a secure server.
- The resource makes an authorization request to the SAML Identity Provider.
- The SAML Identity Provider responds with a SAML 2.0 assertion for the already-authorized user.
- The Okta client application requests an access token from the authorization server using the base64-encoded SAML 2.0 assertion as proof of identity.
- The authorization server verifies the assertion and responds with an access token.
- Your application extracts the token(s) from the HTTP response body.
- Your application can now use the token(s) to call the resource server (for example, an API) on behalf of the user.

See our [OAuth 2.0 overview](/docs/concepts/oauth-openid/#saml-2-0-assertion-flow) for more information on the SAML 2.0 Assertion grant flow.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
