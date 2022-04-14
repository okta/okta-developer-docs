## About the SAML 2.0 Assertion grant

The SAML 2.0 Assertion flow is intended for a client app that wants to use an existing trust relationship without a direct user approval step at the authorization server. It enables a client application to obtain an authorization from a valid, signed SAML assertion from the SAML Identity Provider. The client app can then exchange it for an OAuth access token from the OAuth authorization server. For example, this flow is useful when you want to fetch data from APIs that only support delegated permissions without prompting the user for credentials.

To use a SAML 2.0 Assertion as an authorization grant, the client makes a SAML request to the Identity Provider and the Identity Provider sends the SAML 2.0 Assertion back in the response. The client then makes a request for an access token with the `urn:ietf:params:oauth:grant-type:saml2-bearer` grant type and includes the `assertion` parameter. The value of the `assertion` parameter is the SAML 2.0 assertion that is Base64-encoded. You can send only one SAML assertion in that request.

> **Note:** See our [SAML concept page](/docs/concepts/saml/) for more information on SAML.

See [OAuth 2.0 overview](/docs/concepts/oauth-openid/#saml-2-0-assertion-flow) for more information on the SAML 2.0 Assertion grant flow.
