
After obtaining an OAuth STS access token through the token exchange flow, the AI agent can revoke that token using the org authorization server's `/oauth2/v1/revoke` endpoint and the same client credentials used for token exchange.

``` http
POST /oauth2/v1/revoke HTTP/1.1
Host: example.okta.com
Content-Type: application/x-www-form-urlencoded

token=eyJhbGciOiJIUzI1NiIsI...
&token_type_hint=oauth_sts
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=eyJhbGci...
```

| Parameter | Description and value |
| --- | --- |
| token | The `access_token` value from the successful token exchange response. |
| token_type_hint | The value must be `oauth_sts`. |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| client_assertion |  A signed JWT used for client authentication. You must sign the JWT using the key created during AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |

The endpoint returns `200 OK` regardless of whether the token was valid or already expired, to prevent information leaks.

> **Important:** Revoking an OAuth STS token at the Okta `/revoke` endpoint only removes the access token from Okta's token store. Keep the following behavior in mind:
>
> - If Okta still holds a valid refresh token for the connection, the next token exchange request obtains a new access token automatically.
> - If Okta's refresh token is also expired or invalid, the next token exchange request returns an `interaction_required` response and a new user consent flow is required.
> - The access token isn't automatically revoked from the external resource authorization server. If the access token was shared or copied elsewhere, you must revoke it directly with the external provider.
