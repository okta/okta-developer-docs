---
title: Set up MCP server token exchange
excerpt: Learn how to configure an MCP server as an OAuth client so that it can get its own token to access a downstream resource.
layout: Guides
---
<ApiLifecycle access="beta" />

Learn how to configure an MCP server to act as an OAuth client. The MCP server exchanges the token that it receives from an AI agent for a separate token that's issued for a downstream resource.

---

#### Learning outcomes

- Enable an MCP server as an OAuth client.
- Add an active public key to the MCP server's credentials.
- Create a resource connection on the MCP server that defines the downstream resource it's allowed to access.
- Understand the token exchange flow that the MCP server uses to get a downstream token.

#### What you need

- An Okta org that's subscribed to Okta for AI Agents
- An Okta admin account with the super admin role
- The MCP server as an OAuth client feature enabled for your org. Contact [Okta Support](https://support.okta.com/) to enable it. To use the `IDENTITY_ASSERTION_MCP_SERVER` connection type in this guide, also ask Support to enable downstream MCP server connections.
- [Custom scopes](/docs/guides/customize-authz-server/main/#create-scopes) defined in the Okta custom authorization server that protects the downstream resource. These scopes specify what permissions the token exchange grants in the final access token.
- An MCP server registered in your Okta org. See [Add an MCP Server manually](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-mcp-server).
- An AI agent or client that's authorized to delegate to the MCP server. It passes an access token to the MCP server.

---

## Overview

An MCP server typically handles inbound requests from AI agents. Sometimes the MCP server must also call a downstream resource, such as another MCP server, to complete a request. In that case, the MCP server acts as an OAuth client.

The MCP server never passes on the access token that it receives. That token was issued for the MCP server, not for the downstream resource. Passing it on would let the downstream resource treat the MCP server's token as its own. It would also let a caller use the MCP server to reach resources that the caller can't access. This is known as a confused deputy problem.

Instead, the MCP server exchanges the token for a separate token. The authorization server that protects the downstream resource issues that token.

This guide covers a downstream MCP server that's protected by an Okta custom authorization server. Okta supports this through [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access), which uses the Identity Assertion JWT (ID-JAG).

> **Note**: An MCP server can also hold other connection types, such as `IDENTITY_ASSERTION_CUSTOM_AS` for any resource that a custom authorization server protects, or `STS_ACCESS_TOKEN` for a third-party resource.

## Set up the MCP server as an OAuth client

Before an MCP server can exchange tokens, you must enable it as an OAuth client, add a public key, and create a resource connection. Use the [MCP Servers API](/docs/api/openapi/secures-ai/secures-ai-workload-principals/) to complete these steps.

> **Note**: The requests in this section use an OAuth 2.0 access token. The token needs the `okta.resourceServers.mcpServers.manage` scope to make changes and the `okta.resourceServers.mcpServers.read` scope to read. See [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/) to get an access token with these scopes.

### Enable the OAuth client

Enabling an MCP server as an OAuth client is an explicit step. Okta doesn't enable it when you register the MCP server, add a connection, or add a key.

Send a `POST` request to create the OAuth client. This request has no body.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/workload-principals/api/v1/mcp-servers/{mcpServerId}/oauth-client' \
    --header "Accept: application/json" \
    --header "Authorization: Bearer {accessToken}"
```

The response is `201 Created`. An MCP server has only one OAuth client, so the request returns `409` if one already exists.

### Get the client ID

Retrieve the MCP server and read the `oauthClient` property. The `clientId` is the OAuth client ID that the MCP server uses in the token exchange requests.

```bash
  curl --location --request GET \
    --url 'https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/{mcpServerId}' \
    --header "Accept: application/json" \
    --header "Authorization: Bearer {accessToken}"
```

The `oauthClient` property in the response contains the following values:

```JSON
{
  "oauthClient": {
    "clientId": "wlp8nUa7p0g4zrZbs2f4",
    "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:workload-principals:mcp:wlp8nUa7p0g4zrZbs2f4",
    "status": "ACTIVE",
    "tokenEndpointAuthMethod": "private_key_jwt",
    "grantTypes": [
      "urn:ietf:params:oauth:grant-type:token-exchange",
      "urn:ietf:params:oauth:grant-type:jwt-bearer"
    ],
    "connectionCount": 0
  }
}
```

Okta sets these values, and you can't change them. The MCP server authenticates to Okta with `private_key_jwt`.

### Add a public key

The MCP server signs its client assertion with a private key. Add the matching public key to the MCP server's credentials so that Okta can verify the assertion.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/workload-principals/api/v1/mcp-servers/{mcpServerId}/credentials/jwks' \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --header "Authorization: Bearer {accessToken}" \
    --data '{
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "kid": "mcp-server-key-1",
      "n": "{modulus}",
      "e": "AQAB"
    }'
```

The request body depends on the key type. An RSA key requires `kty`, `n`, and `e`. An EC key requires `kty`, `x`, `y`, and `crv`. The `use` value is always `sig`. The `alg` and `kid` properties are optional.

The response is `201 Created` and includes the key's `id`, which identifies the key in later requests. New keys are `ACTIVE` by default. To add a key without activating it, set `status` to `INACTIVE` in the request.

If you added the key with the `INACTIVE` status, activate it. Replace `{keyId}` with the `id` of the key from the add response, not the `kid`.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/workload-principals/api/v1/mcp-servers/{mcpServerId}/credentials/jwks/{keyId}/lifecycle/activate' \
    --header "Accept: application/json" \
    --header "Authorization: Bearer {accessToken}"
```

To rotate a key, add the new key and make sure that it's active. Then deactivate the old key. Okta accepts assertions signed by any active key, so both keys work during the changeover.

### Create a resource connection

A resource connection defines the downstream resource that the MCP server can reach. Create a connection of type `IDENTITY_ASSERTION_MCP_SERVER` for a downstream MCP server that an Okta custom authorization server protects.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/workload-principals/api/v1/mcp-servers/{mcpServerId}/connections' \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --header "Authorization: Bearer {accessToken}" \
    --data '{
      "connectionType": "IDENTITY_ASSERTION_MCP_SERVER",
      "resource": {
        "orn": "orn:okta:directory:{orgId}:resource-servers:mcp:{downstreamMcpServerId}"
      },
      "authorizationServer": {
        "orn": "orn:okta:idp:{orgId}:authorization_servers:{authServerId}"
      },
      "scopeCondition": "INCLUDE_ONLY",
      "scopes": [
        "tools:read",
        "tools:execute"
      ]
    }'
```

| Property | Description and value |
| --- | --- |
| `connectionType` | The type of connection. Use `IDENTITY_ASSERTION_MCP_SERVER` for a downstream MCP server that's protected by an Okta custom authorization server. |
| `resource.orn` | The ORN of the downstream MCP server |
| `authorizationServer.orn` | The ORN of the custom authorization server that protects the downstream MCP server |
| `scopeCondition` | Controls how Okta applies the `scopes` list. `INCLUDE_ONLY` limits the connection to the listed scopes. |
| `scopes` | The scopes that the MCP server can request at the downstream resource |

> **Note**: You can't change the `connectionType` or the downstream resource after you create the connection. To point a connection at a different resource, delete it and create a new one.

The MCP server needs one connection for each downstream resource. Each token exchange returns a token for one resource.

To delete the OAuth client later, delete its connections and keys first. Otherwise the request returns `409`.

## Token exchange flow

### Flow steps

<div class="full wireframe-border">

  <!-- TODO: Add a single sequence diagram covering the inbound request and the token exchange (steps 1-4). Request from design team. -->

</div>

1. An AI agent or client obtains an access token that targets the MCP server's resource URL. The token satisfies a delegation link authorizing the caller to delegate to the MCP server.

1. The Okta org authorization server responds with an access token (T1) with the MCP server's resource URL as the `aud` value.

1. The AI agent then calls the MCP server and passes this access token (T1).

   > **Note**: The MCP server doesn't forward T1 to the downstream resource. It always requests a separate token that's issued for the downstream resource.

1. The MCP server sends the `subject_token` (T1) to the `/token` endpoint at org authorization server and requests an exchange for an ID-JAG token. The MCP server authenticates as an OAuth client using the key [that you added to its credentials](#add-a-public-key).
* subject_token: T1
* requested_token_type = id-jag
* client_assertion = eyJhbGciOiJSUzI1NiIsInR5...[jwt]
1. The server performs validation based on the [Resource Connections](#create-a-resource-connection) configuration and returns the requested ID-JAG (T2).
1. Because the requested credential was an ID-JAG, the MCP server sends the ID-JAG (T2) to the custom authorization server that protects the downstream resource.
1. The server performs validation and returns an access token (T3).
1. The MCP server uses the access token (T3) to request access to the downstream resource.

## Flow specifics

### Exchange subject token for resource token

In this step, the MCP server receives the access token (T1) from the AI agent. It then sends a `POST` request to the Okta org authorization server's `/token` endpoint to exchange T1 for an ID-JAG resource token (T2). The exchange establishes the MCP server as the immediate actor in the delegation chain and keeps the original subject.

The MCP server authenticates with `private_key_jwt`. It signs the client assertion with an active key from its credentials.

> **Note**: See [Client authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth#client-authentication-methods) for more details on each type of authentication method.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/oauth2/v1/token' \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "subject_token=eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0bl...." \
    --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:access_token" \
    --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:id-jag" \
    --data-urlencode "audience=https://{yourOktaDomain}/oauth2/{authServerId}" \
    --data-urlencode "resource=https://downstream-mcp.example.com" \
    --data-urlencode "scope=tools:read+tools:execute" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5…[jwt]"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `subject_token` | The access token (T1) that the MCP server received from the AI agent. Never use this token as the downstream token. |
| `subject_token_type` | The type of subject token. The value must be `urn:ietf:params:oauth:token-type:access_token`. |
| `requested_token_type` | The type of token being requested. The value must be `urn:ietf:params:oauth:token-type:id-jag`. |
| `audience` | The issuer URL of the custom authorization server that protects the downstream resource |
| `resource` | The resource URL of the downstream resource. This must match the resource in the MCP server's resource connection. |
| `scope` | A list of scopes at the downstream resource that's being requested. This defines the permissions for the final access token. |
| `client_assertion_type` | The type of assertion for client authentication. The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT used for client authentication. Sign the JWT using an active key from the MCP server's credentials. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |

<!-- TODO: Confirm whether client_id is required in the request body alongside client_assertion, and that the value is the MCP server's OAuth client ID (wlp...). -->

#### Response

The response contains an ID-JAG token (T2). The `act` claim identifies the MCP server as the immediate actor, and the delegated chain identifies the callers before it.

``` http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "token_type": "N_A",
  "expires_in": 300,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWV...",
  "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag"
}
```

The ID-JAG contains the following claims:

<!-- TODO: Replace the placeholder claims below with values from a real exchange. Confirm sub_profile for an MCP server actor and the act nesting. -->

```JSON
{
   "scope": "tools:read tools:execute",
   "iss": "https://{yourOktaDomain}",
   "sub": "{subjectFromSubjectToken}",
   "aud": "https://{yourOktaDomain}/oauth2/{authServerId}",
   "iat": "1780596934",
   "exp": "1780597234",
   "jti": "IDAAG.tAO20ExqeUlh6VcpyQxTJ42fn3vDp9E3xR5Iq3Y79pY",
   "sub_profile": "service",
   "resource": "https://downstream-mcp.example.com",
   "act": {
     "sub": "{mcpServerClientId}",
     "sub_profile": "{mcpServerSubProfile}",
     "act": {
       "sub": "{aiAgentClientId}",
       "sub_profile": "ai_agent",
       "act": {
         "sub": "{initiatingClientId}",
         "sub_profile": "service"
       }
     }
   }
}
```

| Claim | Actor |
| --- | --- |
| `act.sub` | The MCP server, the immediate actor |
| `act.act.sub` | The AI agent that called the MCP server |
| `act.act.act.sub` | The original client that initiated the flow |

The delegation chain has a maximum depth. If the chain exceeds it, Okta rejects the exchange.

<!-- TODO: Confirm the default maximum depth (design doc says 5) and the error returned. -->

### Exchange ID-JAG for access token

After receiving the ID-JAG, the MCP server sends a `POST` request to the custom authorization server's `/token` endpoint. This request exchanges the ID-JAG (T2) for an access token (T3) that the MCP server uses to call the downstream resource.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/oauth2/{authServerId}/v1/token' \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
    --data-urlencode "assertion=eyJraWQiOiJuc3MwV3UyblE4...[jwt-id-jag]" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5...[jwt]"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| `assertion` | The ID-JAG that's received in the **Exchange subject token for resource token** response. |
| `client_assertion_type` | The type of assertion. The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT that's used for client authentication. Sign the JWT using an active key from the MCP server's credentials. |

#### Response

The response contains a new access token (T3) that's issued for the downstream resource.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaUdBenlwemJVIiwiYWxnIjoi...",
  "scope": "tools:read tools:execute"
}
```

The access token contains the following claims:

<!-- TODO: Replace the placeholder claims below with values from a real exchange. -->

```JSON
{
  "iss": "https://{yourOktaDomain}/oauth2/{authServerId}",
  "sub": "0oa9jh6hizeR7uMag0g7",
  "aud": "https://downstream-mcp.example.com",
  "iat": 1780596935,
  "exp": 1780600535,
  "scope": "tools:read tools:execute",
  "sub_profile": "service",
  "act": {
    "sub": "{mcpServerClientId}",
    "sub_profile": "{mcpServerSubProfile}",
    "act": {
      "sub": "{aiAgentClientId}",
      "sub_profile": "ai_agent",
      "act": {
        "sub": "{initiatingClientId}",
        "sub_profile": "service"
      }
    }
  }
}
```

The `aud` claim is the downstream resource URL. It differs from the `aud` claim in T1, which is the MCP server's own resource URL.

### Access the downstream resource

The MCP server uses the access token (T3) to request access to the downstream resource. The downstream resource can verify the complete delegation chain from the `act` claim.

> **Note**: One token exchange returns a token for one audience. To reach several downstream resources, create a resource connection for each one and run a separate exchange for each.

## Revoke tokens

The access token issued by the custom authorization server is a standard Okta access token. Regular access tokens from Okta can be revoked. For details, see [Revoke Tokens](/docs/guides/revoke-tokens/main/) and [User sign out (local app)](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/-/main/).
