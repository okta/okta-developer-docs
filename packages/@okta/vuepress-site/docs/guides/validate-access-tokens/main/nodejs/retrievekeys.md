Your app should already have the JSON Web Keys (JWK) cached. If not, retrieve the JSON Web Keys (JWK) from your [Okta custom authorization server](/docs/guides/customize-authz-server/). Your authorization server's metadata endpoint contains the `jwks_uri`, which you can use to get the JWK.

> **Note:** See [Retrieve Authorization Server Metadata](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/getWellKnownOAuthConfigurationCustomAS) and [Best practices](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/#best-practices).
