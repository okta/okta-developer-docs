### Exchange ID-JAG for access token

After receiving the ID-JAG, the agent sends a `POST` request to the MCP server's authorization server's `/token` endpoint to exchange the ID-JAG for an access token.

#### Example: MCP server protected with Okta custom authorization server

```bash
curl -i -X POST \
  'https://{yourOktaDomain}/oauth2/{authServerId}/v1/token' \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
  -d "assertion={idJagToken}" \
  -d "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  -d "client_assertion={agentJWT}"
```

#### Example: MCP server protected with external authorization server

```bash
curl -i -X POST \
  'https://{externalAsUrl}/token' \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
  -d "assertion={idJagToken}" \
  -d "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  -d "client_assertion={agentJWT}"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer`. |
| `assertion` | The ID-JAG that's received in the [Exchange subject token for resource token](#exchange-subject-token-for-resource-token) response. |
| `client_assertion_type` | The type of assertion. The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT that's used for client authentication. You must sign the JWT using the key that you created when you registered the AI agent. |
| `client_id` | For the client/secret authentication method, provide the client ID of the requesting AI agent. |
| `client_secret` | For the client/secret authentication method, provide the client secret of the requesting AI agent. |

#### Response

The response contains the access token that the AI agent uses to access the MCP server.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "{accessToken}",
  "scope": "{mcpServerScopes}"
}
```

The following access token claims example is for an Okta custom authorization server:

```JSON
{
  "iss": "https://{yourOktaDomain}/oauth2/{authServerId}",
  "sub": "0oa9jh6hizeR7uMag0g7",
  "aud": "{mcpResourceUrl}",
  "iat": 1780596935,
  "exp": 1780600535,
  "scope": "{mcpServerScopes}"
}
```

The following access token claims example is for an external authorization server:

```JSON
{
  "iss": "https://auth.externalAS.com",
  "sub": "71202063d860c738...", // The resolved user ID on the external resource
  "aud": "https://mcpserver1.example.com",
  "client_id": "2DfZWqYWDpwha5vPnebOYCoxxxxxxxxx",
  "iat": 1780596935,
  "exp": 1780600535,
  "scope": "ext.example.read"
}
```
