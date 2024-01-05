## About the Implicit grant

The Implicit flow is extremely challenging to implement securely. As a result, Okta recommends that you use the [Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/) instead. Use the Implicit flow only for SPAs that can't support PKCE.

To select the appropriate flow to use for your application, see [OAuth 2.0 and OpenID Connect overview](/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow)'s decision flowchart.

The Implicit flow is intended for applications where the confidentiality of the client secret can't be guaranteed. In this flow, the client doesn't make a request to the `/token` endpoint. Instead, it receives the access token directly from the `/authorize` endpoint. The client must be able to interact with the resource owner's user agent and to receive incoming requests (through redirection) from the authorization server.
