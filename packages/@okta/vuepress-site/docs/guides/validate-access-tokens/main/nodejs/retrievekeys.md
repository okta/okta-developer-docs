Your app should already have the JSON Web Keys (JWK) cached. If not, retrieve the JSON Web Keys (JWK) from your [Okta custom authorization server](/docs/guides/customize-authz-server/). Your authorization server's metadata endpoint contains the `jwks_uri`, which you can use to get the JWK.

> **Note:** See [Retrieve Authorization Server Metadata](/docs/reference/api/oidc/#well-knownoauth-authorization-server) and [Best practices](/docs/reference/api/oidc/#best-practices).
