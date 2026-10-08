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
- An AI agent or client that has a delegation link to the MCP server. The link authorizes the client to delegate to the MCP server. See [Create a delegation link](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/delegationlinks/other/createdelegationlink). The client passes an access token to the MCP server.
- ??User access or machine access configured for the AI agent, defining the users, apps, and other AI agents that can authorize it to act on their behalf. See the [**User access**](https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/#user-access) or [**Machine access**](https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/#machine-access) sections of the [Set up AI agent token exchange](https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/) guide.??

---

## Overview

An MCP server typically handles inbound requests from AI agents. Sometimes the MCP server must also call a downstream resource, such as another MCP server, to complete a request. In that case, the MCP server acts as an OAuth client.

The MCP server never passes on the access token that it receives. That token was issued for the MCP server, not for the downstream resource. Passing it on would let the downstream resource treat the MCP server's token as its own. It would also let a caller use the MCP server to reach resources that the caller can't access. This is known as a confused deputy problem.

Instead, the MCP server exchanges the token for a separate token. The authorization server that protects the downstream resource issues that token.

This guide covers a downstream MCP server that's protected by an Okta custom authorization server. Okta supports this through [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access), which uses the Identity Assertion JWT (ID-JAG).

An MCP server can get an ID-JAG for both user and machine subjects. The exchange of the ID-JAG for a downstream access token currently requires a user subject. See [Exchange ID-JAG for access token](#exchange-id-jag-for-access-token).

> **Note**: An MCP server can also hold other connection types, such as `IDENTITY_ASSERTION_CUSTOM_AS` for any resource that a custom authorization server protects, or `STS_ACCESS_TOKEN` for a third-party resource.

## Set up the MCP server as an OAuth client

Before an MCP server can exchange tokens, you must enable it as an OAuth client, add a public key, and create a resource connection. Use the [MCP Servers API](/docs/api/openapi/secures-ai/secures-ai-workload-principals/) to complete these steps.

> **Note**: The requests in this section use an OAuth 2.0 access token. The token needs the `okta.resourceServers.mcpServers.manage` scope to make changes and the `okta.resourceServers.mcpServers.read` scope to read. See [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/) to get an access token with these scopes. To use a signed-in admin instead, see [Implement OAuth for Okta](/docs/guides/implement-oauth-for-okta/main/).

### Enable the OAuth client

Enabling an MCP server as an OAuth client is an explicit step. Okta doesn't enable it when you register the MCP server, add a connection, or add a key.

Send a `POST` request to create the OAuth client. This request has no body.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/workload-principals/api/v1/mcp-servers/{mcpServerId}/oauth-client' \
    --header "Accept: application/json" \
    --header "Authorization: Bearer {accessToken}"
```

This single request creates and activates the OAuth client. You don't need a separate activation call.

The response is `201 Created` with an empty body. An MCP server has only one OAuth client, so the request returns `409` if one exists.

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

> **Note:** Okta doesn't allow you to deactivate the last active key. The request returns a `409 Conflict` error with the `DEACTIVATE_NOT_ALLOWED` error. Activate the new key before you deactivate the old one.

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

The response is `201 Created` and includes the new connection:

```JSON
{
  "id": "mcn8nUa7p0g4zrZbs2f4",
  "orn": "orn:okta:idp:00o1gjjp4jsdR3Sww4x7:connections:mcn8nUa7p0g4zrZbs2f4",
  "connectionType": "IDENTITY_ASSERTION_MCP_SERVER",
  "status": "ACTIVE",
  "resource": {
    "name": "{downstreamMcpServerName}",
    "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:{downstreamMcpServerId}",
    "_links": {
      "self": {
        "href": "/resource-servers/api/v1/mcp-servers/{downstreamMcpServerId}"
      }
    }
  },
  "resourceIndicator": "https://{downstreamMcpServerUrl}/mcp",
  "authorizationServer": {
    "name": "{authServerName}",
    "issuerUrl": "https://{yourOktaDomain}/oauth2/{authServerId}",
    "orn": "orn:okta:idp:00o1gjjp4jsdR3Sww4x7:authorization_servers:{authServerId}",
    "_links": {
      "self": {
        "href": "/api/v1/authorizationServers/{authServerId}"
      }
    }
  },
  "scopeCondition": "INCLUDE_ONLY",
  "scopes": [
    "tools:read",
    "tools:execute"
  ],
  "_links": {
    "self": {
      "href": "/workload-principals/api/v1/mcp-servers/{mcpServerId}/connections/mcn8nUa7p0g4zrZbs2f4"
    }
  }
}
```

| Property | Description and value |
| --- | --- |
| `id` | The ID of the connection. Use it to identify the connection in later requests, such as a `DELETE` request. |
| `orn` | The ORN of the connection |
| `status` | The status of the connection. New connections are `ACTIVE`. |
| `resource.name` | The name of the downstream MCP server |
| `resourceIndicator` | The URL of the downstream MCP server. Okta sets this value from the downstream MCP server's resource URL. |
| `authorizationServer.name` | The name of the custom authorization server |
| `authorizationServer.issuerUrl` | The issuer URL of the custom authorization server |

The response also returns the values that you sent in the request.

> **Note**: You can't change the `connectionType` or the downstream resource after you create the connection. To point a connection at a different resource, delete it, and create another one.

The MCP server needs one connection for each downstream resource. Each token exchange returns a token for one resource.

### Delete the OAuth client

To delete the OAuth client, remove its resources in this order:

1. Delete its connections. For each connection, send a `DELETE` request to `/workload-principals/api/v1/mcp-servers/{mcpServerId}/connections/{connectionId}`.
1. Deactivate its keys. Send a `POST` request to `/workload-principals/api/v1/mcp-servers/{mcpServerId}/credentials/jwks/{keyId}/lifecycle/deactivate`.
1. Delete its keys. Deactivate a key before you delete it. Send a `DELETE` request to `/workload-principals/api/v1/mcp-servers/{mcpServerId}/credentials/jwks/{keyId}`.
1. Delete the OAuth client. Send a `DELETE` request to `/workload-principals/api/v1/mcp-servers/{mcpServerId}/oauth-client`. The response is `204 No Content`.

The request to delete the OAuth client returns `409` if any connections or keys remain.

## Token exchange flow

After you set up the MCP server as an OAuth client, it can exchange the token that it receives for a downstream resource token.

### Flow steps

The following steps show how an AI agent calls an MCP server and how the MCP server gets a downstream token.

<div class="full wireframe-border">

  <!-- TODO: Add a single sequence diagram covering the inbound request and the token exchange (steps 1-8). Request from design team. -->

</div>

<!--
See http://www.plantuml.com/plantuml/uml/
@startuml
title MCP server token exchange

participant "AI agent or client" as Agent
participant "Okta org\nauthorization server" as Org
participant "Custom\nauthorization server" as CustomUp
participant "MCP server" as MCP
participant "Downstream custom\nauthorization server" as CustomDown
participant "Downstream\nresource" as Down

== Initial authentication (steps 1-2) ==
alt User access
  Agent -> Org : 1a. POST /oauth2/v1/token\ngrant_type = token-exchange\nsubject_token = user's token (ID token or session token)\nrequested_token_type = id-jag\nresource = MCP server resource URL
  note right of Org : The agent authenticates through XAA,\nnot with private_key_jwt
  Org - -> Agent : ID-JAG
  Agent -> CustomUp : 1b. POST /oauth2/{authServerId}/v1/token\ngrant_type = jwt-bearer\nassertion = ID-JAG\nresource = MCP server resource URL
else Machine access
  Agent -> CustomUp : 1. POST /oauth2/{authServerId}/v1/token\ngrant_type = client_credentials\nresource = MCP server resource URL
end
note right of CustomUp : Checks that a delegation link\nauthorizes delegation to the MCP server
CustomUp - -> Agent : 2. Access token T1\n(aud = MCP server resource URL,\nsubject = user or machine)

== Call the MCP server (step 3) ==
Agent -> MCP : 3. Call MCP server with T1 (Bearer)
note right of MCP : T1 is never forwarded downstream

== Exchange for an ID-JAG (steps 4-5) ==
MCP -> Org : 4. POST /oauth2/v1/token\ngrant_type = token-exchange\nsubject_token = T1\nrequested_token_type = id-jag\nresource = downstream resource URL\naudience = downstream custom AS issuer (optional)\nclient_id = MCP server client ID\nclient_assertion (private_key_jwt)
Org -> Org : Validate against the MCP server's\nresource connection and delegation link
Org - -> MCP : 5. ID-JAG T2\n(original subject preserved,\nMCP server added to act chain if T1 has one)

== Exchange for a downstream access token (steps 6-7) ==
MCP -> CustomDown : 6. POST /oauth2/{authServerId}/v1/token\ngrant_type = jwt-bearer\nassertion = T2\nresource = downstream resource URL\nclient_id = MCP server client ID\nclient_assertion (private_key_jwt)
CustomDown - -> MCP : 7. Access token T3\n(aud = downstream resource URL)

== Call the downstream resource (step 8) ==
MCP -> Down : 8. Request with T3 (Bearer)
@enduml
-->

<!-- Confirmed by Gil, 2026-10-06: in the user-access exchange at the org authorization server, the agent's subject_token is the user's session token or an ID token from the user's authentication (XAA). The MCP server's subject_token is the T1 access token. -->
<!-- Only the MCP server's token exchange at the org authorization server uses private_key_jwt (confirmed by Gil, 2026-10-06). -->

1. An AI agent or client requests an access token for the MCP server from the MCP server's custom authorization server. The `resource` parameter is the MCP server's resource URL. A delegation link must authorize the caller to delegate to the MCP server.

   > **Note**: With user access, the agent first exchanges the user's token for an ID-JAG at the org authorization server. It then sends the ID-JAG to the custom authorization server. With machine access, the agent sends a client credentials request instead. See [Initial authentication](#initial-authentication).

1. The custom authorization server responds with an access token (T1) with the MCP server's resource URL as the `aud` value. T1 keeps the original subject, which is either a user or a machine.

1. The AI agent then calls the MCP server and passes the access token (T1).

   > **Note**: The MCP server doesn't forward T1 to the downstream resource. It always requests a separate token that's issued for the downstream resource.

1. The MCP server sends the `subject_token` (T1) to the `/token` endpoint at org authorization server and requests an exchange for an ID-JAG token (`urn:ietf:params:oauth:token-type:id-jag`). The MCP server authenticates as an OAuth client using the `private_key_jwt`.
1. The server performs validation based on the [Resource Connections](#create-a-resource-connection) configuration and returns the requested ID-JAG (T2).
1. Because the requested credential was an ID-JAG, the MCP server sends the ID-JAG (T2) to the custom authorization server that protects the downstream resource.
1. The server performs validation and returns an access token (T3).

   > **Note**: This step requires a user subject. If the subject is a machine, the custom authorization server rejects the request. See [Exchange ID-JAG for access token](#exchange-id-jag-for-access-token).

1. The MCP server uses the access token (T3) to request access to the downstream resource.

The original subject stays the same across all tokens, whether it's a user or a machine. If T1 carries an `act` claim, each exchange appends the next actor to it. See [Delegation chain and the act claim](#delegation-chain-and-the-act-claim).

## Flow specifics

The flow has two parts. First, the AI agent or client gets a subject token for the MCP server. Then the MCP server exchanges that token for a downstream token.

### Initial authentication

To start the flow, the AI agent or client must first authenticate with an Okta authorization server and obtain a subject token (T1). T1 is an access token that targets the MCP server's resource URL.

Okta issues T1 only if a delegation link exists. A delegation link is a record in Okta that authorizes a specific client to delegate to a specific resource. Here, the client is the AI agent or client, and the resource is the MCP server. Okta also checks the link again during token exchange. Without it, Okta rejects the exchange. See [Create a delegation link](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/delegationlinks/other/createdelegationlink) for details.

The subject of T1 can be a user or a machine. The path depends on whether the AI agent is configured for user access or machine access.

#### User access

Use this path when a user is in the loop. It's the more common scenario.

1. The AI agent authenticates the user and exchanges the user's token for an ID-JAG at the org authorization server's `/token` endpoint. See the **User access** steps in the [Token exchange flow](/docs/guides/ai-agent-token-exchange/authserver/main/#token-exchange-flow).
1. The AI agent sends the ID-JAG to the `/token` endpoint of the MCP server's custom authorization server. Use the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`).

Both requests include the `resource` parameter. Its value is the resource URL that's configured on the MCP server. For example, `resource=https://mcp-server.example.com`.

#### Machine access

Use this path when no user is in the loop, such as a service app. See the **Machine access** steps in the [Token exchange flow](/docs/guides/ai-agent-token-exchange/authserver/main/#token-exchange-flow).

The AI agent or client sends a request to the custom authorization server's `/token` endpoint. Use the Client Credentials grant type. See [Implement authorization by grant type](/docs/guides/implement-grant-type/clientcreds/main/).

The request includes the `resource` parameter. Its value is the resource URL that's configured on the MCP server. For example, `resource=https://mcp-server.example.com`.

The following request uses `private_key_jwt` to authenticate the client:

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/oauth2/{authServerId}/v1/token' \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=client_credentials" \
    --data-urlencode "scope=tools:read" \
    --data-urlencode "resource=https://mcp-server.example.com" \
    --data-urlencode "client_id={clientId}" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5…[jwt]"
```

#### Response

The token in the response has an `aud` claim. The claim value is the MCP server's resource URL. The AI agent or client passes this token (T1) to the MCP server.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaUdBenlwemJVIiwiYWxnIjoi...",
  "scope": "tools:read"
}
```

### Delegation chain and the act claim

The `act` claim records the actors in a delegation chain. Whether the tokens in this flow carry an `act` claim depends on T1.

- **T1 has no `act` claim.** This is the case for machine access, where a client such as a service app calls the MCP server directly. No actor exists upstream, so the chain starts empty. The ID-JAG has no `act` claim. The MCP server appears only in the `client_id` claim.
- **T1 has an `act` claim.** This is the case when a delegated hop exists upstream, such as a user who authorizes an AI agent that calls the MCP server. T1 identifies the AI agent as the actor. Okta preserves that chain and adds the MCP server as the immediate actor.

In both cases, the original subject stays the same across all tokens.

### Exchange subject token for resource token

In this step, the MCP server receives the access token (T1) from the AI agent. It then sends a `POST` request to the Okta org authorization server's `/token` endpoint to exchange T1 for an ID-JAG resource token (T2). The exchange establishes the MCP server as the immediate actor in the delegation chain and keeps the original subject.

The MCP server authenticates with `private_key_jwt`. It signs the client assertion with an active key from its credentials.

> **Note**: See [Client authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth#client-authentication-methods) for more details on each type of authentication method.

In the following request, the `scope` value lists scopes that are defined on the downstream custom authorization server. They aren't the MCP server's own scopes.

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
    --data-urlencode "scope=tools:read tools:execute" \
    --data-urlencode "client_id={mcpServerClientId}" \
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
| `scope` | A list of scopes that the MCP server requests at the downstream custom authorization server. These aren't the MCP server's own scopes. They define the permissions for the final access token. |
| `client_id` | The MCP server's OAuth client ID. This is the `clientId` value in the `oauthClient` property of the MCP server. See [Get the client ID](#get-the-client-id). |
| `client_assertion_type` | The type of assertion for client authentication. The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| `client_assertion` | A signed JWT used for client authentication. Sign the JWT using an active key from the MCP server's credentials. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |

#### Response

The response contains an ID-JAG token (T2). The ID-JAG keeps the subject of T1. The MCP server's client ID is the `client_id` claim.

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

The claims depend on whether T1 already carries an `act` claim. T1 carries an `act` claim only when a delegated-access hop exists upstream, such as a user who calls an AI agent that calls the MCP server.

With machine access, a client such as a service app calls the MCP server directly. T1 has no `act` claim, so the ID-JAG has no `act` or `sub_profile` claim either. The ID-JAG contains the following claims:

```JSON
{
   "jti": "IDAAG.w73fqwY45m30VjjrCnu6EydnAVKteQEXK-QbrdktKsk",
   "iss": "https://{yourOktaDomain}",
   "aud": "https://{yourOktaDomain}/oauth2/{authServerId}",
   "iat": 1780596934,
   "exp": 1780597234,
   "sub": "{serviceAppClientId}",
   "resource": "https://downstream-mcp.example.com",
   "client_id": "{mcpServerClientId}",
   "scope": "tools:read tools:execute"
}
```

| Claim | Description |
| --- | --- |
| `sub` | The subject of T1. For machine access, this is the client ID of the app that called the MCP server. |
| `client_id` | The OAuth client ID of the MCP server that performed the exchange |
| `resource` | The resource URL of the downstream resource |
| `aud` | The issuer URL of the custom authorization server that protects the downstream resource |

If T1 already has an `act` claim, Okta preserves the chain and adds the MCP server as the immediate actor. In this case, the ID-JAG contains the following claims:

<!-- TODO: Replace the placeholder claims below with values from a real delegated exchange (user > AI agent > MCP server). Confirm sub_profile for an MCP server actor and the act nesting. -->

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

The delegation chain has a maximum depth of 5 actors. If the `act` chain exceeds this limit, Okta rejects the exchange and returns the `invalid_subject_token_act_claim_depth` OAuth error.

### Exchange ID-JAG for access token

After receiving the ID-JAG, the MCP server sends a `POST` request to the custom authorization server's `/token` endpoint. This request exchanges the ID-JAG (T2) for an access token (T3) that the MCP server uses to call the downstream resource.

> **Note**: This exchange currently requires a user subject. The JWT bearer grant on the custom authorization server resolves the `sub` claim of the ID-JAG against its users. A machine subject, such as a service app's client ID, isn't a user. The server rejects the request with the `invalid_grant` error. Machine access works through the ID-JAG exchange in the previous section.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/oauth2/{authServerId}/v1/token' \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
    --data-urlencode "assertion=eyJraWQiOiJuc3MwV3UyblE4...[jwt-id-jag]" \
    --data-urlencode "resource=https://downstream-mcp.example.com" \
    --data-urlencode "client_id={mcpServerClientId}" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5...[jwt]"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| `assertion` | The ID-JAG that's received in the **Exchange subject token for resource token** response. |
| `resource` | The resource URL of the downstream resource. Use the same value as in the ID-JAG exchange. |
| `client_id` | The MCP server's OAuth client ID. Use the same value as in the ID-JAG exchange. |
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

The claims in the access token depend on whether T1 carried an `act` claim. The following example is for a delegated exchange, where T1 had an `act` claim:

<!-- TODO: Replace the placeholder claims below with values from a real delegated exchange. Machine subjects don't reach T3 today (Gil, 2026-10-08), so there is no machine access example. -->

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

The MCP server uses the access token (T3) to request access to the downstream resource. If the tokens carry an `act` claim, the downstream resource can verify the complete delegation chain from it.

> **Note**: One token exchange returns a token for one audience. To reach several downstream resources, create a resource connection for each one and run a separate exchange for each.

## Revoke tokens

The access token issued by the custom authorization server is a standard Okta access token. Regular access tokens from Okta can be revoked. For details, see [Revoke Tokens](/docs/guides/revoke-tokens/main/) and [User sign out (local app)](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/-/main/).
