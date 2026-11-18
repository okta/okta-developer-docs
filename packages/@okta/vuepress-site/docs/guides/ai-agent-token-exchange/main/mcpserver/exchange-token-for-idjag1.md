In this step, after the agent receives the access or ID token, the agent sends a `POST` request to the Okta org authorization server's `/token` endpoint. This request is to exchange the ID or access token for an ID-JAG (resource) token.

This request supports multiple client authentication methods. The example below changes, depending on how the agent was configured to authenticate its identity to Okta. See [Add client registration details](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually) on the **Add AI agents manually** page in the product documentation.

#### Example: ID-JAG exchange request with an ID token for an MCP server with an external authorization server

```bash
curl -i -X POST \
  'https://{yourOktaDomain}/oauth2/v1/token' \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  -d "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
  -d "requested_token_type=urn:ietf:params:oauth:token-type:id-jag" \
  -d "subject_token={idToken}" \
  -d "subject_token_type=urn:ietf:params:oauth:token-type:id_token" \
  -d "audience={externalAsIssuerUrl}" \
  -d "resource={mcpServerResourceUrl}" \
  -d "scope={mcpServerScopes}" \
  -d "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  -d "client_assertion={agentJWT}"

```

> **Note**: This request example uses the ID token as the subject token type and public/private key for client authentication. See [Client authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth#client-authentication-methods) for more details on each type of authentication method.

#### Example: ID-JAG exchange request with an access token for an MCP server with an Okta custom authorization server

```bash
curl -i -X POST \
  'https://{yourOktaDomain}/oauth2/v1/token' \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  -d "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
  -d "requested_token_type=urn:ietf:params:oauth:token-type:id-jag" \
  -d "subject_token={accessToken}" \
  -d "subject_token_type=urn:ietf:params:oauth:token-type:access_token" \
  -d "audience={customAsIssuerUrl}" \
  -d "resource={mcpServerResourceUrl}" \
  -d "scope={mcpServerScopes}" \
  -d "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  -d "client_assertion={agentJWT}"

```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `subject_token` | A valid ID or access token for the AI agent |
| `subject_token_type` | The type of subject token. The value is either `urn:ietf:params:oauth:token-type:id_token` or `urn:ietf:params:oauth:token-type:access_token`. |
| `requested_token_type` | The type of token being requested. The value must be `urn:ietf:params:oauth:token-type:id-jag`. |
| `audience` | The issuer URL of the MCP server's authorization server. This can be the issuer of the Okta custom authorization server or of an external authorization server. |
| `resource` | The resource URL of the specific MCP resource that you want to access. This value must be provided for the XAA flow with MCP server resources (`IDENTITY_ASSERTION_MCP_SERVER` connection type). |
| `scope`    | A list of scopes at the MCP server that's being requested. This defines the permissions for the final access token. |
| `client_assertion_type` | The type of assertion. The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT that's used for client authentication. You must sign the JWT using the key that you created when you registered the AI agent. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). Also see [Create a client assertion JWT](/docs/guides/xaa-request-token-ex/openidconnect/main/#create-a-client-assertion-jwt) to understand how to create the client assertion JWT for an AI agent. |
