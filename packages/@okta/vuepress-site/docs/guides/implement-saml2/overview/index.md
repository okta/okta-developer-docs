---
title: Overview
---

Use the SAML 2.0 Assertion grant flow to request an access token when a client app wants to use an existing trust relationship without a direct user approval step at the authorization server. For example, this flow is useful when you want to fetch data from APIs that only support delegated permissions without prompting the user for credentials. It enables a client application to reuse an existing authorization by supplying a valid, signed SAML assertion to the OAuth Authorization Server in exchange for an OAuth access token.

To use a SAML 2.0 Assertion as an authorization grant, the client uses an access token request with the `urn:ietf:params:oauth:grant-type:saml2-bearer` grant type and the value of the `assertion` parameter is a single SAML 2.0 assertion that is base64url encoded.

> **Note:** See our [SAML concept page](/docs/concepts/saml/) for more information on SAML.

At a high level, the SAML 2.0 Assertion flow has the following steps:

- On behalf of a user, your web application attempts to access a resource server hosted on a secure server.
- The client application obtains a SAML 2.0 assertion from the SAML Identity Provider.
- The client application requests an access token from the authorization server using the Base64-encoded SAML 2.0 assertion as proof of identity.
- The authorization server verifies the assertion and passes back an access token.
- Your application extracts the token(s) from the HTTP response body.
- Your application can now use the token(s) to call the resource server (for example, an API) on behalf of the user.

See our [OAuth 2.0 overview](/docs/concepts/oauth-openid/#saml2-flow) for more information on the SAML 2.0 Assertion flow.

## Support

If you need help or have an issue, post a question in our [Developer Forum](https://devforum.okta.com).

<NextSectionLink/>
