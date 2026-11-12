---
title: Migrate Okta for AI Agents APIs from V1 to V2
excerpt: Learn how to move your calls from the V1 Okta for AI Agents APIs to the V2 APIs before V1 reaches end of life.
layout: Guides
---

Learn how the Okta for AI Agents V2 APIs differ from the V1 APIs, and what to change in your API calls.

<!-- TODO: Verify the V2 examples before release. The V2 request and response examples in this guide come from the okta-oas3 specs on master (specs/monolith/secures-ai/spec/v2), not from calls to a live V2 API. V2 is behind SECURE_AI_APIS_V2 and the specs are still changing. Re-check each V2 example against the final specs, or against real calls, once V2 is testable. Sections with spec-derived V2 examples: Delegation Links, Workload Principal Operations, AI Agent Credentials (client secrets), AI Agent Registration, Virtual MCP Server Registrations, MCP Server Capabilities, Virtual MCP Servers, AI Agent Providers, Resource Connections, Token Request Settings, Client Authentication Settings. Known unconfirmed V2 details are marked with their own TODOs, including the DCR create Location header. -->

---

#### Learning outcomes

- Understand which Okta for AI Agents APIs have a V2 version.
- Identify the changes that affect your API calls.
- Update your requests and response handling for V2.

#### What you need

- An Okta org that has Okta for AI Agents enabled
- An Okta org that has the V2 APIs enabled <!-- TODO: Replace with the customer-facing feature name(s). Internal flags: SECURE_AI_APIS_V2 (all V2 calls), OKTA_FOR_AI_AGENTS_ENHANCEMENTS (providers, operations), SECURE_AI_AGENTS_SCHEMA (schema, profile mappings), SECURE_AI_AGENTS_UNIFY_IDENTITY (provider priorities, staging). -->
- Existing integrations, scripts, or agents that call the V1 Okta for AI Agents APIs

---

## Overview

Okta for AI Agents has V2 versions of its APIs. The V2 endpoints use the `/api/v2` path prefix instead of `/api/v1`.

> **Note:** Okta plans to deprecate the V1 APIs and set a hard cutoff date. <!-- TODO: Add the V1 end-of-life date when it's confirmed. -->

Until the cutoff, both versions work side by side. The V1 reference pages remain available and are marked as deprecated.

### Who needs to migrate

You need to migrate if you call the Okta for AI Agents APIs directly. For example, you call them from Postman, scripts, your own applications, or AI agents.

If you only use the Admin Console, you don't need to do anything. The Admin Console calls the V2 APIs for you.

### Changes that affect most APIs

Many V2 APIs share the same changes:

- **Links:** V2 responses don't include `_links` on individual objects. `_links` are returned only on lists, for pagination. Where V2 returns `_links`, the values are plain URL strings instead of objects with an `href`.
- **Synchronous writes:** Write operations that were asynchronous in V1 are synchronous in V2. Calls that returned `202 Accepted` now return `200`, `201`, or `204`. You no longer poll an operation to get the result.

## V1 to V2 summary by API

Use this table to find the API that you call. Select the link in the last column for the details of the change.

<!-- Kamron confirmed on 2026-11-12 that the consolidated Resource Connections API will be available at V2 release, so both Resource Connections rows say "Available". -->

| V1 API | V2 availability | Summary of changes | Details |
| --- | --- | --- | --- |
| Delegation Links | Available | `_links` removed from individual objects. `to.authorizationServerOrn` removed from create requests. New `ID_TOKEN` links can't be created. | [Delegation Links](#delegation-links) |
| STS Authorization | Not applicable | No V2 version. Keep using the V1 STS callback endpoint. | [STS Authorization](#sts-authorization) |
| Workload Principal Operations | Available | `_links` removed from individual objects. Operation types for registration writes removed. | [Workload Principal Operations](#workload-principal-operations) |
| Resource Server Operations | Available | `_links` removed from the `resource`, and `orn` added. Fewer operation types. | [Resource Server Operations](#resource-server-operations) |
| AI Agent Credentials | Available | Link format changed. `_links` returned on `GET` only when you pass the new `links` query parameter. The client secrets list returns `data`. | [AI Agent Credentials](#ai-agent-credentials) |
| AI Agent Registration | Available | Writes are synchronous. `appId`, `externalId`, and `platform` removed. Link format changed. | [AI Agent Registration](#ai-agent-registration) |
| Virtual MCP Server Registrations | Available | Renamed agent gateways, with a new path. Writes are synchronous. `_links` removed from individual objects. | [Virtual MCP Server Registrations](#virtual-mcp-server-registrations) |
| Agent-to-Agent Server Registrations | Available | `_links` removed. Authorization servers are linked by `orn`. Authorization server writes are synchronous. | [Agent-to-Agent Server Registrations](#agent-to-agent-server-registrations) |
| API Server Registration | Available | Writes are synchronous. `_links` removed. Request properties moved under `metadata`. Authorization servers are linked by `orn`. | [API Server Registration](#api-server-registration) |
| MCP Server Registrations | Available | Writes are synchronous, except discovery-based registration and `resourceUrl` changes. `_links` and `detectedMetadata` removed. Request properties moved under `metadata`. Authorization servers are linked by `orn`. | [MCP Server Registrations](#mcp-server-registrations) |
| MCP Server Capabilities | Available | Discovery request properties moved under `credential`. `CLIENT_AUTH_SETTINGS` renamed `BROKERED_CONSENT`. `_links` removed from individual objects. Discovery is asynchronous. | [MCP Server Capabilities](#mcp-server-capabilities) |
| Virtual MCP Servers (Resource Server) | Available | Renamed agent gateways, with a new path. `_links` removed from individual objects. Read-only: authorization server add and remove calls removed. | [Virtual MCP Servers](#virtual-mcp-servers) |
| Client Authentication Settings | Available | `_links` removed. OAuth fields moved under `oauthClientConfiguration`. `purpose` renamed `purposes`. New `client_credentials` grant type. | [Client Authentication Settings](#client-authentication-settings) |
| Token Request Settings | Available | Same operations and bodies. Only the version in the path changes. | [Token Request Settings](#token-request-settings) |
| AI Agent Providers | Available | `_links` removed. `configuration` references a client authentication settings object instead of holding OAuth credentials. Filtering and sorting are part of the base API. | [AI Agent Providers](#ai-agent-providers) |
| AI Agent Schema | Available | `_links` removed from the response. | [AI Agent Schema](#ai-agent-schema) |
| AI Agent Connections, MCP Server Connections, and Virtual MCP Connections | Available | Consolidated into one Resource Connections collection. The actor moves into the body. `connectionType` splits into `protocolType` and `resourceType`. | [Resource Connections](#resource-connections) |
| Managed Connections and Potential Connections | Available | Consolidated into Resource Connections. Reverse lookup uses `search`. Potential connections move to `/resource-connections/api/v2`. | [Resource Connections](#resource-connections) |

## Delegation Links

The endpoints, operations, query parameters, scopes, and response codes are the same in V1 and V2. The request and response bodies and the `_links` format differ.

Delegation Links was already synchronous in V1, so you don't poll for results in either version.

### Property changes

| Property | V1 | V2 |
| --- | --- | --- |
| `to.authorizationServerOrn` in create requests | Accepted. For `ID_TOKEN` links, Okta uses the org authorization server if you omit it. Ignored for `ACCESS_TOKEN` links. | Removed. Okta determines the authorization server. |
| `to.authorizationServerOrn` in responses | Read-only. Always present for `ACCESS_TOKEN` links. For `ID_TOKEN` links, present only if you set a custom authorization server. | Read-only. Identifies the custom authorization server that protects the target resource. |
| `from.tokenType` of `ID_TOKEN` | Deprecated. You can still create these links. | Deprecated. Returned for existing links only. You can't create new links with this token type. |
| `_links` on a delegation link | `_links.self`, an object with an `href` | Removed |
| `_links` on a list | `self` and `next` are objects with an `href` | `self` and `next` are plain URL strings |

### What to change

Make these changes:

- Stop sending `to.authorizationServerOrn` in create requests.
- Stop creating `ID_TOKEN` links. Use `ACCESS_TOKEN`, or `SAML_ASSERTION` for SAML apps. Existing `ID_TOKEN` links are still returned on reads.
- Update code that reads `_links` on single delegation links or on lists.

### Examples

The create request is the same in V1 and V2. Send it to `POST /workload-principals/api/v1/delegation-links` or `POST /workload-principals/api/v2/delegation-links`:

```json
{
  "from": {
    "type": "OKTA_AUTHORIZATION_SERVER",
    "clientOrn": "orn:okta:directory:00o4p0z0f8s5rNkEJ8g6:workload-principals:ai-agents:wlp19kc5yr3UTqS8o2p8",
    "tokenType": "ACCESS_TOKEN"
  },
  "to": {
    "resourceOrn": "orn:okta:directory:00o4p0z0f8s5rNkEJ8g6:workload-principals:ai-agents:wlp25spbxqmZzyS4f0h8"
  }
}
```

The V1 response includes `_links.self` as an object with an `href`:

```json
{
  "id": "dlk1a2b3c4d5e6f7g8h9",
  "from": {
    "type": "OKTA_AUTHORIZATION_SERVER",
    "clientOrn": "orn:okta:directory:00o4p0z0f8s5rNkEJ8g6:workload-principals:ai-agents:wlp19kc5yr3UTqS8o2p8",
    "tokenType": "ACCESS_TOKEN"
  },
  "to": {
    "resourceOrn": "orn:okta:directory:00o4p0z0f8s5rNkEJ8g6:workload-principals:ai-agents:wlp25spbxqmZzyS4f0h8",
    "authorizationServerOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:authorization_servers:aus1gjh63g214q0Hq0g4"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/delegation-links/dlk1a2b3c4d5e6f7g8h9"
    }
  }
}
```

The V2 response has the same properties and no `_links`.

On a list, the V1 `_links.self` is an object with an `href`:

```json
{
  "data": [
    {
      "id": "dlk2b3c4d5e6f7g8h9i0",
      "from": {
        "type": "OKTA_AUTHORIZATION_SERVER",
        "clientOrn": "orn:okta:directory:00o4p0z0f8s5rNkEJ8g6:workload-principals:ai-agents:wlp19kc5yr3UTqS8o2p8",
        "tokenType": "ACCESS_TOKEN"
      },
      "to": {
        "resourceOrn": "orn:okta:directory:00o4p0z0f8s5rNkEJ8g6:workload-principals:ai-agents:wlp1j8yjr17pp6l8V0x8",
        "authorizationServerOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:authorization_servers:aus1gjh63g214q0Hq0g4"
      }
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/delegation-links"
    }
  }
}
```

In V2, `_links.self` is a plain URL string. The `data` items are the same:

```json
{
  "data": [ ... ],
  "_links": {
    "self": "https://{yourOktaDomain}/workload-principals/api/v2/delegation-links"
  }
}
```

<!-- The V2 delegation links spec describes ID_TOKEN as deprecated: returned for existing links only, and not usable when creating a new link. The guide matches. -->

<!-- Source: Delegation Links, Client Auth Settings & Agent Credentials V1 vs V2 API (Confluence eng page 1176240645, version 6). -->

## STS Authorization

There's no V2 version of this API. Keep using the V1 STS callback endpoint.

## Workload Principal Operations

V2 makes these changes:

- Removes `_links` from each object that the API returns. Lists still return `_links` for pagination.
- Removes operation types for registration writes, such as `ai-agent:Register`. Those writes are now synchronous, so they don't create an operation.
- Documents a `Link` header for pagination on the list operation.

Operations that remain are provider operations, such as import, staging, and changes to source priorities or profile mappings. These operations are still asynchronous.

### Operation types

The `type` property of an operation identifies the action that created it. V2 returns fewer values than V1.

| Operation type | V1 | V2 |
| --- | --- | --- |
| `ai-agent:Register` | Yes | No |
| `ai-agent:Replace` | Yes | No |
| `ai-agent:Patch` | Yes | No |
| `ai-agent:Delete` | Yes | No |
| `ai-agent:Activate` | Yes | No |
| `ai-agent:Deactivate` | Yes | No |
| `virtual-mcp:Register` | Yes | No |
| `virtual-mcp:Delete` | Yes | No |
| `virtual-mcp:Activate` | Yes | No |
| `virtual-mcp:Deactivate` | Yes | No |
| `virtual-mcp:ReplaceCapabilities` | Yes | No |
| `ai-agent:Import` | Yes | Yes |
| `ai-agent:Staging` | Yes | Yes |
| `ai-agent:BulkStaging` | Yes | Yes |
| `ai-agent:ReplaceSourcePriority` | Yes | Yes |
| `ai-agent:ReplaceProfileMapping` | Yes | Yes |

If your code filters or branches on the operation `type`, update it to handle only the V2 types. The `status` values are the same in both versions: `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, and `FAILED`.

<!-- The Registry team confirmed that V2 removes the virtual-mcp types because those writes are synchronous. Their wording was "removed virtual Mcp and V1 Registry Register, Delete, Activate, Deactivate and update". The guide reads "update" as virtual-mcp:ReplaceCapabilities. Mymoona owns this item. TODO: Confirm that reading with Mymoona. -->

The `virtual-mcp` types are also gone because agent gateway registration writes are synchronous.

### Examples

In V1, a registration write creates an operation. This V1 response from `GET /workload-principals/api/v1/operations/op-1a2b3c4d` is for a completed `ai-agent:Register` operation. The resource has a `_links.self` object with an `href`:

```json
{
  "id": "op-1a2b3c4d",
  "type": "ai-agent:Register",
  "status": "COMPLETED",
  "created": "2025-09-11T18:52:48.000Z",
  "started": "2025-09-11T18:52:48.000Z",
  "completed": "2025-09-11T18:52:49.000Z",
  "resource": {
    "id": "aiAgent_abc123def456",
    "type": "ai_agent",
    "status": "ACTIVE",
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/aiAgent_abc123def456"
      }
    }
  }
}
```

V2 doesn't create this operation, because registering an agent is synchronous. V2 operations are provider operations, such as an import. This V2 response from `GET /workload-principals/api/v2/operations/op-1a2b3c5d` is for a completed `ai-agent:Import` operation. The response body for an import operation is the same in V1 and V2:

```json
{
  "id": "op-1a2b3c5d",
  "type": "ai-agent:Import",
  "status": "COMPLETED",
  "operationMetadata": {
    "sourceName": "SALESFORCE",
    "sourceId": "0oa3omz2i9XRNSRIHBZO",
    "importProgress": {
      "scanned": 2,
      "added": 1,
      "removed": 1,
      "changed": 0,
      "unchanged": 0
    }
  },
  "created": "2025-09-11T18:52:48.000Z",
  "started": "2025-09-11T18:52:48.000Z",
  "completed": "2025-09-11T18:52:49.000Z"
}
```

On a list, the V1 `_links.self` and `_links.next` are objects with an `href`:

```json
{
  "data": [
    {
      "id": "op-0f1e2d3c",
      "type": "ai-agent:Replace",
      "status": "IN_PROGRESS",
      "created": "2025-09-10T15:00:00.000Z",
      "started": "2025-09-10T15:00:01.000Z"
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/operations"
    },
    "next": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/operations?after=op-0f1e2d3c"
    }
  }
}
```

In V2, the list `_links` are plain URL strings. The `data` items have the same properties:

```json
{
  "data": [ ... ],
  "_links": {
    "self": "https://{yourOktaDomain}/workload-principals/api/v2/operations",
    "next": "https://{yourOktaDomain}/workload-principals/api/v2/operations?after=op-6g7h8i9j"
  }
}
```

## Resource Server Operations

The list and retrieve endpoints are the same in V1 and V2. Only the version in the path changes: `/resource-servers/api/v1/operations` becomes `/resource-servers/api/v2/operations`.

V2 makes these changes:

- Returns fewer operation types. Most resource server writes are now synchronous, so they don't create an operation.
- Adds `orn` to the `resource` object and removes `_links` from it.
- Returns `_links` on lists as plain URL strings, and documents a `Link` header for pagination.
- Doesn't document a `404` response on the list operation.

### Operation types

The `type` property of an operation identifies the action that created it.

| Operation type | V1 | V2 |
| --- | --- | --- |
| `resource-server:Register` | Yes | Yes |
| `resource-server:Patch` | Yes | Yes |
| `resource-server:Discover` | Yes | Yes |
| `client-auth-settings:Create` | Yes | Yes |
| `resource-server:Delete` | Yes | No |
| `resource-server:Activate` | Yes | No |
| `resource-server:Deactivate` | Yes | No |
| `resource-server-authorization-server:Link` | Yes | No |
| `resource-server-authorization-server:Unlink` | Yes | No |
| `resource-server-authorization-server:Patch` | Yes | No |

In V2, `resource-server:Register` and `resource-server:Patch` apply only when Okta detects the metadata of an MCP server asynchronously. If your code branches on the operation `type`, update it to handle only the V2 types. The `status` values are the same in both versions.

### Examples

This V1 response from `GET /resource-servers/api/v1/operations/op-1a2b3c4d` has a `_links.self` object in the `resource`:

```json
{
  "id": "op-1a2b3c4d",
  "type": "resource-server:Register",
  "status": "COMPLETED",
  "created": "2025-01-29T10:00:00.000Z",
  "started": "2025-01-29T10:00:01.000Z",
  "completed": "2025-01-29T10:00:05.000Z",
  "resource": {
    "id": "api8nUa7p0g4zrZbs2f4",
    "type": "API_SERVER",
    "status": "ACTIVE",
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4"
      }
    }
  }
}
```

This V2 response from `GET /resource-servers/api/v2/operations/op-1a2b3c4d` has an `orn` and no `_links` in the `resource`. The other properties are the same:

```json
{
  ...
  "resource": {
    "id": "ems8nUa7p0g4zrZbs2f4",
    "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4",
    "type": "MCP_SERVER",
    "status": "ACTIVE"
  }
}
```

<!-- Source: Resource Server V1 vs V2 API (Confluence eng page 1189150741, version 5) and the okta-oas3 resource server operations specs. The V1 example in the spec shows an API_SERVER resource with an MCP server link, so the V1 example is inconsistent in the spec. Confirm with engineering. -->

## Authorization servers for resource servers

MCP server, API server, and A2A server registrations share the same changes to how you add authorization servers. This section describes those changes once.

In V1, you add an authorization server inline. The request includes a `type` and, for a manual server, the issuer and endpoints.

In V2, you link an existing authorization server by its `orn`. External authorization servers are a separate resource. Create them first with the External Authorization Servers API, then link them. For an Okta custom authorization server, you only link it by `orn`.

| Area | V1 | V2 |
| --- | --- | --- |
| Add request | Inline properties and a `type` of `MANUAL`, `OKTA`, or `OIN` | `orn` of an existing authorization server |
| Create an external authorization server | Part of the add request | `POST /authorization-servers/api/v2/external-authorization-servers`, with the `okta.authorizationServers.manage` scope |
| Response object | The authorization server, with `_links` and `lastUpdated` | A link object with `authorizationServer`, `created`, and `lastUpdated` |
| Timestamps | `lastUpdated` on the authorization server | `created` and `lastUpdated` on both the authorization server and the link |
| `subjectMappingExpression` | Set on the add and update calls for each resource server | Belongs to the authorization server and applies to every resource server that links it |
| Add response | `202` with a `Location` header | `201` with the link object |
| Remove response | `202` with a `Location` header | `204` |
| Conflicts | Not documented | `409` documented on the add call |

V2 `type` values on an authorization server are `DISCOVERABLE`, `MANUAL`, `OIN`, and `OKTA`.

To create an external authorization server in V2, send this request to `POST /authorization-servers/api/v2/external-authorization-servers`:

```json
{
  "issuer": "https://auth.example.com",
  "metadata": {
    "authorizationEndpoint": "https://auth.example.com/oauth/authorize",
    "tokenEndpoint": "https://auth.example.com/oauth/token",
    "registrationEndpoint": "https://auth.example.com/oauth/register",
    "grantTypesSupported": [
      "authorization_code",
      "refresh_token"
    ],
    "tokenEndpointAuthMethod": "client_secret_basic"
  }
}
```

The response is the external authorization server. Use its `orn` when you link it to a resource server:

```json
{
  "id": "easMa1nU2aL3p0g4zrZb",
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:external-authorization-servers:easMa1nU2aL3p0g4zrZb",
  "issuer": "https://auth.example.com",
  "status": "ACTIVE",
  "type": "MANUAL",
  "metadata": {
    "authorizationEndpoint": "https://auth.example.com/oauth/authorize",
    "tokenEndpoint": "https://auth.example.com/oauth/token",
    "registrationEndpoint": "https://auth.example.com/oauth/register",
    "grantTypesSupported": [
      "authorization_code",
      "refresh_token"
    ],
    "tokenEndpointAuthMethod": "client_secret_basic"
  },
  "created": "2025-02-01T10:00:00Z",
  "lastUpdated": "2025-02-01T10:00:00Z"
}
```

To change the endpoints or the `subjectMappingExpression` of an external authorization server, use the External Authorization Servers API. You can no longer change them through the resource server.

<!-- Source: Resource Server V1 vs V2 API (Confluence eng page 1189150741, version 5) and okta-oas3 specs/monolith/secures-ai/spec/v2/authorization-servers. The create response example is the ExternalAuthorizationServerResponseManualV2 example. Confirm with engineering that the External Authorization Servers API will be documented in the V2 reference at release. -->

## AI Agent Credentials

The endpoints, operations, request bodies, scopes, and response codes are the same in V1 and V2. This applies to JSON Web Keys (JWKs), client secrets, public key mode, and the JWKS URI. The `_links` format, the list response shape, and a new `links` query parameter differ.

Errors are still `E0000001` with the same `errorCauses` messages. For example, the 50-key limit and the message that you can't delete an active key are unchanged.

### Link changes

V1 returns `_links` on every credential response. The `activate`, `deactivate`, and `delete` links are objects with an `href` and `hints`.

V2 changes the links as follows:

- Returns the `activate`, `deactivate`, and `delete` links as plain URL strings, without `hints`.
- Doesn't return a `self` link on individual credentials.
- Adds a `links` query parameter to the four `GET` operations. Set it to `ALL`, or name one or more of `activate`, `deactivate`, and `delete`. Separate values with commas and no spaces. The values are case-sensitive.

When V2 returns item `_links` depends on the operation:

| Operation | V1 | V2 |
| --- | --- | --- |
| `GET` (list or retrieve) | Item `_links` always returned | Item `_links` returned only when you pass `links` |
| `POST` (add JWK, create secret) | Item `_links` always returned | Item `_links` always returned |
| Activate or deactivate | Item `_links` always returned | Item `_links` always returned |

### List response changes

Neither version paginates the credential lists. An agent has at most 50 JWKs and two client secrets, so every credential comes back in one response.

| List operation | V1 response | V2 response |
| --- | --- | --- |
| List JWKs | `{ data, _links }`. `_links.self` is an object with an `href`. | `{ data, _links }`. `_links.self` is a plain URL string and includes the `links` value that you sent. |
| List client secrets | A bare array of client secrets, with no `_links`. | `{ data, _links }`, the same shape as the JWK list. |

### Public key mode and JWKS URI

The public key mode and JWKS URI operations are the same in V1 and V2. They have the same fields, and neither version returns `_links`.

<!-- The wiki (Confluence page 1176240645, version 6) says V2 public key mode and JWKS URI are gated by SECURE_AI_ALTERNATIVE_TOKEN_ENDPOINT_AUTH_METHODS instead of SECURE_AI_XAA. The okta-oas3 spec changed that on 2026-10-26 (OKTA-1308840) to align V2 with V1, so both versions use SECURE_AI_XAA. The wiki is out of date on this point. -->

### What to change

Make these changes:

- Read the client secrets list from `data` instead of treating the response as an array.
- Pass `links=ALL` on `GET` operations if you use the action links. Without `links`, `GET` responses have no item `_links`.
- Update code that parses `_links` as objects with an `href` and `hints`. V2 link values are plain URL strings.

### Examples

These examples list the client secrets for an agent.

The V1 response is a bare array. Each credential includes `_links` with `href` and `hints`:

```json
[
  {
    "id": "ocs2f4zrZbs8nUa7p0g4",
    "status": "INACTIVE",
    "client_secret": "DRUFXGF9XbLn......a3x3POBiIxDreBCdZuFs5B",
    "secret_hash": "yk4SVx4sUWVJVbHt6M-UPA",
    "created": "2023-02-21T20:08:24.000Z",
    "lastUpdated": "2023-02-21T20:08:24.000Z",
    "_links": {
      "activate": {
        "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/wlpx9jQ16k9V8IFEL0g3/credentials/secrets/ocs2f4zrZbs8nUa7p0g4/lifecycle/activate",
        "hints": { "allow": ["POST"] }
      },
      "delete": {
        "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/wlpx9jQ16k9V8IFEL0g3/credentials/secrets/ocs2f4zrZbs8nUa7p0g4",
        "hints": { "allow": ["DELETE"] }
      }
    }
  }
]
```

The V2 response wraps the credentials in `data`. Without the `links` query parameter, the credentials have no `_links`:

```json
{
  "data": [
    {
      "id": "ocs2f4zrZbs8nUa7p0g4",
      "status": "INACTIVE",
      "client_secret": "DRUFXGF9XbLn......a3x3POBiIxDreBCdZuFs5B",
      "secret_hash": "yk4SVx4sUWVJVbHt6M-UPA",
      "created": "2023-02-21T20:08:24.000Z",
      "lastUpdated": "2023-02-21T20:08:24.000Z"
    }
  ],
  "_links": {
    "self": "https://{yourOktaDomain}/workload-principals/api/v2/ai-agents/{agentId}/credentials/secrets"
  }
}
```

With `links=ALL`, each credential includes `activate`, `deactivate`, and `delete` links as plain URL strings. The other properties are the same:

```json
{
  "data": [
    {
      "id": "ocs2f4zrZbs8nUa7p0g4",
      ...
      "_links": {
        "activate": "https://{yourOktaDomain}/workload-principals/api/v2/ai-agents/{agentId}/credentials/secrets/ocs2f4zrZbs8nUa7p0g4/lifecycle/activate",
        "deactivate": "https://{yourOktaDomain}/workload-principals/api/v2/ai-agents/{agentId}/credentials/secrets/ocs2f4zrZbs8nUa7p0g4/lifecycle/deactivate",
        "delete": "https://{yourOktaDomain}/workload-principals/api/v2/ai-agents/{agentId}/credentials/secrets/ocs2f4zrZbs8nUa7p0g4"
      }
    }
  ],
  "_links": {
    "self": "https://{yourOktaDomain}/workload-principals/api/v2/ai-agents/{agentId}/credentials/secrets?links=ALL"
  }
}
```

<!-- Source: Delegation Links, Client Auth Settings & Agent Credentials V1 vs V2 API (Confluence eng page 1176240645, version 6). The wiki says V2 credential links have no delete link and that the links parameter accepts only ALL, activate, and deactivate. The okta-oas3 spec added the delete link on 2026-10-29 (OKTA-1308918), so the guide follows the spec. -->

## AI Agent Registration

The endpoints and operations are the same in V1 and V2. The request and response bodies and the response codes differ.

### Synchronous writes

In V2, the result is in the response:

| Operation | V1 response | V2 response |
| --- | --- | --- |
| Register agent (`POST`) | `202`, no body | `201` with the agent |
| Replace agent (`PUT`) | `202`, no body | `200` with the agent |
| Update agent (`PATCH`) | `202`, no body | `200` with the agent |
| Delete agent (`DELETE`) | `202`, no body | `204` |
| Activate or deactivate agent | `202`, no body | `204` |

### Removed properties

V2 removes these properties from the agent response and from create, update, and patch requests:

- `appId`: Use the Delegation Links API instead.
- `externalId`
- `platform`

### Link changes

V1 `_links` are objects with an `href`. V2 `_links` are plain URL strings, and `providers` is an array of URL strings. V2 agent responses don't include `_links.self`.

V2 adds a `links` query parameter to the list and retrieve operations. Set it to `ALL`, or name `providers`, `resourceServer`, or `delegationLinks`, to choose which links the response includes.

### What to change

Make these changes:

- Stop polling an operation after you register, replace, update, delete, activate, or deactivate an agent. Read the response instead.
- Remove `appId`, `externalId`, and `platform` from your requests. Use the Delegation Links API instead of `appId`.
- Stop reading `_links.self`. Read `providers` as an array of URL strings.
- Pass the `links` query parameter to choose which links a list or retrieve response includes.

### Examples

This example registers an AI agent without an A2A server.

The V1 request to `POST /workload-principals/api/v1/ai-agents` includes `appId`:

```json
{
  "appId": "0oab1234EXAMPLEID5d6",
  "profile": {
    "name": "Orchestrator Agent",
    "description": "Orchestrator AI Agent"
  }
}
```

The V1 response is `202 Accepted` with no body. The `Location` header points to the operation to poll:

```http
HTTP/1.1 202 Accepted
Location: https://{yourOktaDomain}/workload-principals/api/v1/operations/op-1a2b3c4d
```

After the operation completes, `GET /workload-principals/api/v1/ai-agents/wlpx8kR27j0U7HGDM1h4` returns the agent. The V1 agent includes `externalId`, `appId`, `platform`, and `_links` objects with `rel`, `href`, and `method`:

```json
{
  "id": "wlpx8kR27j0U7HGDM1h4",
  "externalId": "7TTZGRL8PV",
  "created": "2022-04-04T15:56:05.000Z",
  "lastUpdated": "2022-05-05T18:15:44.000Z",
  "status": "ACTIVE",
  "appId": "0oab1234EXAMPLEID5d6",
  "platform": "OKTA",
  "profile": {
    "name": "Orchestrator Agent",
    "description": "Orchestrator Agent"
  },
  "_links": {
    "self": {
      "rel": "self",
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/wlpx8kR27j0U7HGDM1h4",
      "method": "GET"
    },
    "providers": [
      {
        "rel": "provider",
        "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d",
        "method": "GET"
      }
    ]
  }
}
```

The V2 request to `POST /workload-principals/api/v2/ai-agents` doesn't include `appId`:

```json
{
  "profile": {
    "name": "Orchestrator Agent",
    "description": "Orchestrator AI Agent"
  }
}
```

The V2 response is `201 Created` with the agent. The agent has no `externalId`, `appId`, or `platform`. The `_links` values are plain URL strings, and there's no `self` link:

```json
{
  "id": "wlpx8kR27j0U7HGDM1h4",
  ...
  "_links": {
    "providers": [
      "https://{yourOktaDomain}/workload-principals/api/v2/ai-agent-providers/aip-1a2b3c4d"
    ]
  }
}
```

<!-- The okta-oas3 V2 agent response examples now use /api/v2/ paths in the provider, resourceServer, and delegationLinks links (OKTA-1319653, 2026-11-05). The guide example matches. -->

When you update an agent with `PATCH`, you can no longer set or remove `appId`. The V2 request to remove the description is:

```json
{
  "profile": {
    "description": null
  }
}
```

## Virtual MCP Server Registrations

The V2 reference calls a virtual MCP server an agent gateway. The operations are the same, but the path and the path parameter change.

| Aspect | V1 | V2 |
| --- | --- | --- |
| Path | `/workload-principals/api/v1/virtual-mcp-servers` | `/workload-principals/api/v2/agent-gateways` |
| Path parameter | `virtualMcpServerId` | `agentGatewayId` |
| Scopes | `okta.resourceServers.virtualMcpServers.read` and `.manage` | Same |
| Request bodies | `resourcePath` and `profile` | Same |
| Object properties | `id`, `orn`, `status`, `profile`, `created`, and `lastUpdated` | Same |
| `_links` on an object | `self` and `resource-server` | Removed |
| `_links` on a list | `self` and `next` are objects with an `href` | `self` and `next` are plain URL strings, with a `Link` response header for pagination |

### Synchronous writes

In V2, the result is in the response.

| Operation | V1 response | V2 response |
| --- | --- | --- |
| Create (`POST`) | `202`, no body | `201` with the agent gateway |
| Update (`PATCH`) | `200` with the object | `200` with the agent gateway |
| Delete (`DELETE`) | `202`, no body | `204` |
| Activate | `202`, no body | `200` with the agent gateway |
| Deactivate | `202`, no body | `200` with the agent gateway |

V2 creates the agent gateway with a `status` of `INACTIVE`, the same as V1.

In both versions, you can delete only an inactive agent gateway. Deleting an active one returns `409`, so deactivate it first.

### What to change

- Replace `/workload-principals/api/v1/virtual-mcp-servers` with `/workload-principals/api/v2/agent-gateways` in your calls.
- Stop polling an operation after create, delete, activate, and deactivate. Read the response instead.
- Stop reading the `self` and `resource-server` links from an object. Build the URLs from the `id`.

### Examples

This example creates an agent gateway. The request is the same in V1 and V2. Send it to `POST /workload-principals/api/v1/virtual-mcp-servers` or `POST /workload-principals/api/v2/agent-gateways`:

```json
{
  "resourcePath": "staging",
  "profile": {
    "displayName": "Staging MCP Servers",
    "description": "Groups all staging MCP servers for testing"
  }
}
```

The V1 response is `202 Accepted` with no body, and a `Location` header that points to `/workload-principals/api/v1/operations/{operationId}`. After the operation completes, `GET /workload-principals/api/v1/virtual-mcp-servers/wlp7lM8nO9pQ0rS1tU2v` returns the virtual MCP server with `_links`:

```json
{
  "id": "wlp7lM8nO9pQ0rS1tU2v",
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:workload-principals:virtual-mcp:wlp7lM8nO9pQ0rS1tU2v",
  "status": "INACTIVE",
  "profile": {
    "displayName": "Staging MCP Servers",
    "description": "Groups all staging MCP servers for testing"
  },
  "created": "2025-06-10T08:00:00Z",
  "lastUpdated": "2025-06-10T08:00:00Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/virtual-mcp-servers/wlp7lM8nO9pQ0rS1tU2v"
    },
    "resource-server": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp7lM8nO9pQ0rS1tU2v"
    }
  }
}
```

The V2 response is `201 Created` with the agent gateway in the body. It has the same properties and no `_links`.

A V2 call to `POST /workload-principals/api/v2/agent-gateways/wlp7lM8nO9pQ0rS1tU2v/lifecycle/activate` returns `200` with the same object and a `status` of `ACTIVE`. The V1 call returns `202` with no body.

On a list, the V2 `_links` are plain URL strings:

```json
{
  "data": [ ... ],
  "_links": {
    "self": "https://{yourOktaDomain}/workload-principals/api/v2/agent-gateways?limit=20",
    "next": "https://{yourOktaDomain}/workload-principals/api/v2/agent-gateways?after=wlp1aB2cD3eF4gH5iJ6k&limit=20"
  }
}
```

<!-- Source: okta-oas3 specs/monolith/secures-ai/spec/v1/ai-agents/registration/virtual-mcp-registration.yaml and spec/v2/ai-agents/registration/agent-gateway-registration.yaml (master, e795ff64f). The V2 list example is trimmed to one item. The Agent Gateway V2 APIs Status & Deltas wiki (Confluence page 1095041886, version 4) confirms the rename to agent-gateway and that ORNs are unchanged. The V1 PATCH response is `200` in the V1 spec, but the wiki says `202`. The guide follows the spec. TODO: Check the V1 PATCH status code with engineering. -->

## Agent-to-Agent Server Registrations

The endpoints and operations are the same in V1 and V2. Only the version in the path changes: `/resource-servers/api/v1/a2a-servers` becomes `/resource-servers/api/v2/a2a-servers`. This API lists and retrieves A2A servers and manages their authorization servers.

V2 makes these changes:

- Removes `_links` from the A2A server. The V1 `self`, `ai-agent`, and `authorization-servers` links are gone.
- Returns `_links` on lists as plain URL strings, with no `parent` link, and documents a `Link` header for pagination.

The changes in [Authorization servers for resource servers](#authorization-servers-for-resource-servers) apply, including the response codes and the link object. The add request changes from `{ "type": "OKTA", "orn": "..." }` to `{ "orn": "..." }`.

### What to change

Make these changes:

- Replace `/resource-servers/api/v1/a2a-servers` with `/resource-servers/api/v2/a2a-servers` in your calls.
- Send only the `orn` when you add an authorization server. Stop sending `type`.
- Stop reading the `self`, `ai-agent`, and `authorization-servers` links. Build the URLs from the `a2aServerId`.
- Read the authorization server from `authorizationServer` in each link object.

### Examples

This V1 A2A server from `GET /resource-servers/api/v1/a2a-servers/wlpx9jQ16k9V8IFEL0g3` has `_links` objects:

```json
{
  "a2aServerId": "wlpx9jQ16k9V8IFEL0g3",
  "orn": "orn:okta:directory:00o5rb5mt2H3d1TJd0h7:resource-servers:a2a:wlpx9jQ16k9V8IFEL0g3",
  "resourceUrl": "https://demo-agent.example.com",
  "created": "2025-01-27T08:00:00Z",
  "lastUpdated": "2025-01-29T10:00:00Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/a2a-servers/wlpx9jQ16k9V8IFEL0g3"
    },
    "ai-agent": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/wlpx9jQ16k9V8IFEL0g3"
    },
    "authorization-servers": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/a2a-servers/wlpx9jQ16k9V8IFEL0g3/authorization-servers"
    }
  }
}
```

The V2 A2A server has the same properties and no `_links`.

To add an Okta custom authorization server in V1, send a request with a `type` to `POST /resource-servers/api/v1/a2a-servers/{a2aServerId}/authorization-servers`:

```json
{
  "type": "OKTA",
  "orn": "orn:okta:idp:00o5rb5mt2H3d1TJd0h7:authorization_servers:aus5rb5mt2H3d1TJd0h7"
}
```

In V2, send only the `orn` to `POST /resource-servers/api/v2/a2a-servers/{a2aServerId}/authorization-servers`:

```json
{
  "orn": "orn:okta:idp:00o5rb5mt2H3d1TJd0h7:authorization_servers:aus5rb5mt2H3d1TJd0h7"
}
```

The V2 response is `201 Created` with a link object:

```json
{
  "authorizationServer": {
    "id": "aus5rb5mt2H3d1TJd0h7",
    "orn": "orn:okta:idp:00o5rb5mt2H3d1TJd0h7:authorization_servers:aus5rb5mt2H3d1TJd0h7",
    "issuer": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7",
    "status": "ACTIVE",
    "type": "OKTA",
    "metadata": {
      "authorizationEndpoint": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7/v1/authorize",
      "tokenEndpoint": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7/v1/token",
      "grantTypesSupported": [
        "authorization_code",
        "urn:ietf:params:oauth:grant-type:token-exchange"
      ]
    },
    "created": "2025-01-27T08:00:00Z",
    "lastUpdated": "2025-01-27T08:00:00Z"
  },
  "created": "2025-01-28T08:00:00Z",
  "lastUpdated": "2025-01-28T08:00:00Z"
}
```

<!-- Source: Resource Server V1 vs V2 API (Confluence eng page 1189150741, version 5) and the okta-oas3 A2A server specs. V2 examples are spec-derived, not from live calls. The Confluence page lists only list, retrieve, and authorization server operations for A2A servers, so the guide doesn't describe how A2A servers are registered. -->

## API Server Registration

The endpoints and operations are the same in V1 and V2. Only the version in the path changes: `/resource-servers/api/v1/api-servers` becomes `/resource-servers/api/v2/api-servers`.

### Synchronous writes

| Operation | V1 response | V2 response |
| --- | --- | --- |
| Register server (`POST`) | `202`, no body | `201` with the server |
| Update server (`PATCH`) | `202`, no body | `200` with the server |
| Delete server (`DELETE`) | `202`, no body | `204` |
| Activate or deactivate server | `202`, no body | `200` with the server |
| Add authorization server | `202`, no body | `201` with the link |
| Remove authorization server | `202`, no body | `204` |

V2 documents `409` on register, update, and add authorization server. Unlike MCP servers, no API server call stays asynchronous.

### Property changes

| Property | V1 | V2 |
| --- | --- | --- |
| `displayName`, `description` in requests | Top-level properties | Under `metadata` |
| `scopesSupported`, `app` in requests | Top-level properties | Under `metadata` |
| `registrationType` | `MANUAL`. `OIN` requires a feature flag and `app.orn`. | `MANUAL` and `OIN`. `OIN` requires `metadata.app.orn`. |
| `resourceUrl` | Not marked read-only | Read-only. You can't change it after registration. |
| `_links` | `self` and `authorization-servers` | Removed on objects. On a list, plain URL strings and a `Link` response header for pagination. |
| `_embedded.counts` | Optional | Always returned |

### Authorization server changes

The changes in [Authorization servers for resource servers](#authorization-servers-for-resource-servers) apply. The V2 link object also includes a read-only `tenantId`.

### What to change

- Move `displayName`, `description`, `scopesSupported`, and `app` under `metadata` in create and update requests.
- Stop parsing `_links`.
- Create external authorization servers first, then link them by `orn`.
- Stop polling operations for API server writes.

### Examples

The V1 request to `POST /resource-servers/api/v1/api-servers` has top-level `displayName` and `description`:

```json
{
  "resourceUrl": "https://api.example.com",
  "displayName": "Example API",
  "description": "Example API server"
}
```

The V1 response is `202 Accepted` with no body, and a `Location` header to poll. The V1 server has `_links` objects:

```json
{
  "id": "api8nUa7p0g4zrZbs2f4",
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:api:api8nUa7p0g4zrZbs2f4",
  "resourceUrl": "https://api.example.com",
  "status": "ACTIVE",
  "metadata": {
    "displayName": "Example API",
    "description": "Example API server"
  },
  "created": "2025-01-29T10:00:00Z",
  "lastUpdated": "2025-01-29T10:00:00Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/api-servers/api8nUa7p0g4zrZbs2f4"
    },
    "authorization-servers": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/api-servers/api8nUa7p0g4zrZbs2f4/authorization-servers"
    }
  },
  "_embedded": {
    "counts": {
      "authorizationServers": 2,
      "clientAuthSettings": 5
    }
  }
}
```

The V2 request to `POST /resource-servers/api/v2/api-servers` puts `displayName` and `description` under `metadata`:

```json
{
  "resourceUrl": "https://api.example.com",
  "metadata": {
    "displayName": "Example API",
    "description": "Example API server"
  }
}
```

The V2 response is `201 Created` with the server. It has the same properties and no `_links`.

To add an authorization server in V1, you send the issuer and endpoints to `POST /resource-servers/api/v1/api-servers/{apiServerId}/authorization-servers`:

```json
{
  "type": "MANUAL",
  "issuer": "https://auth.example.com",
  "authorizationEndpoint": "https://auth.example.com/oauth/authorize",
  "tokenEndpoint": "https://auth.example.com/oauth/token",
  "grantTypesSupported": [
    "authorization_code",
    "refresh_token"
  ]
}
```

In V2, you link the external authorization server that you created. The request to `POST /resource-servers/api/v2/api-servers/{apiServerId}/authorization-servers` is:

```json
{
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:external-authorization-servers:easMa1nU2aL3p0g4zrZb"
}
```

The V2 response is `201 Created` with a link object:

```json
{
  "authorizationServer": {
    "id": "easMa1nU2aL3p0g4zrZb",
    "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:external-authorization-servers:easMa1nU2aL3p0g4zrZb",
    "issuer": "https://auth.example.com",
    "status": "ACTIVE",
    "type": "MANUAL",
    "metadata": {
      "authorizationEndpoint": "https://auth.example.com/oauth/authorize",
      "tokenEndpoint": "https://auth.example.com/oauth/token",
      "registrationEndpoint": "https://auth.example.com/oauth/register",
      "grantTypesSupported": [
        "authorization_code",
        "refresh_token"
      ]
    },
    "created": "2025-02-01T10:00:00Z",
    "lastUpdated": "2025-02-01T10:00:00Z"
  },
  "created": "2025-03-04T09:12:00Z",
  "lastUpdated": "2025-03-04T09:12:00Z"
}
```

<!-- Source: Resource Server V1 vs V2 API (Confluence eng page 1189150741, version 5) and the okta-oas3 API server specs. V2 examples are spec-derived, not from live calls. The V2 link request body ({ orn }) comes from the Confluence page and the LinkResourceServerAuthorizationServerRequestV2 schema, because the spec has no named request example. -->

## MCP Server Registrations

The endpoints and operations are the same in V1 and V2. Only the version in the path changes: `/resource-servers/api/v1/mcp-servers` becomes `/resource-servers/api/v2/mcp-servers`. The request and response bodies, the response codes, and how you add authorization servers differ.

### Synchronous writes

In V2, the result is in the response. Only two calls stay asynchronous.

| Operation | V1 response | V2 response |
| --- | --- | --- |
| Register server (`POST`), `MANUAL` or `OIN` | `202`, no body | `201` with the server |
| Register server (`POST`), `DISCOVERABLE` | `202`, no body | `202` with a `Location` header to poll |
| Update server (`PATCH`) | `202`, or `204` for an empty body | `200` with the server |
| Update server (`PATCH`) that changes `resourceUrl` | `202`, no body | `202` with a `Location` header to poll |
| Delete server (`DELETE`) | `202`, no body | `204` |
| Activate or deactivate server | `202`, no body | `200` with the server |
| Add authorization server | `202`, no body | `201` with the link |
| Update authorization server | `202`, no body | `200` with the link |
| Remove authorization server | `202`, no body | `204` |

The two asynchronous calls remain because Okta detects the metadata of the server after the call. The `Location` header in V2 points to `/resource-servers/api/v2/operations/{operationId}`.

V2 documents `409` on register and update, for a duplicate `resourceUrl` or `displayName`. V2 also documents `409` on add authorization server, and on update authorization server when an active managed connection uses the protocol.

### Property changes

| Property | V1 | V2 |
| --- | --- | --- |
| `displayName`, `description` in requests | Top-level properties | Under `metadata`. `metadata.displayName` is required for standard registration. |
| `scopesSupported` in requests | Not accepted | `metadata.scopesSupported`, for `MANUAL` registrations only |
| `detectedMetadata` | Separate object with `lastRefreshedAt`, `resourceName`, and `scopesSupported` | Removed. Those properties are read-only properties of `metadata`. |
| `_embedded` | Returned only when you pass `expand=stats` | Always returned, with `counts.authorizationServers` and `counts.clientAuthSettings` |
| `expand` query parameter | Supported on list and retrieve | Removed |
| `orgConfigPropertyValues` | Request only | Also returned for servers registered from the OIN catalog |
| List `search` on the resource name | `detectedMetadata.resourceName` | `metadata.resourceName` |
| `_links` | `self` and `authorization-servers` | Removed on objects. On a list, plain URL strings and a `Link` response header for pagination. |

### Authorization server changes

The changes in [Authorization servers for resource servers](#authorization-servers-for-resource-servers) apply. These changes are specific to MCP servers:

| Aspect | V1 | V2 |
| --- | --- | --- |
| Enabled protocols | `protocolConfigured` array with `STS` and `IDENTITY_ASSERTION` | `protocolConfigurations` object with `sts.enabled` and `identityAssertion.enabled` |
| Tenant ID | Top-level `tenantId` | `protocolConfigurations.identityAssertion.tenantId`, for external authorization servers only |
| Update request | Changes the authorization server: endpoints, grant types, `tokenEndpointAuthMethod`, `protocolConfigured`, `subjectMappingExpression`, and `tenantId` | Changes the link only: `protocolConfigurations` |

### What to change

- Move `displayName` and `description` under `metadata` in create and update requests.
- Read `resourceName`, `lastRefreshedAt`, and `scopesSupported` from `metadata` instead of `detectedMetadata`.
- Stop passing `expand`. Read `_embedded.counts`.
- Poll an operation only after you register a `DISCOVERABLE` server or change a `resourceUrl`.
- Create external authorization servers first, then link them by `orn`.

### Examples

This example registers an MCP server manually.

The V1 request to `POST /resource-servers/api/v1/mcp-servers` has top-level `displayName` and `description`:

```json
{
  "registrationType": "MANUAL",
  "resourceUrl": "https://mcp.example.com",
  "displayName": "Manually registered MCP Server",
  "description": "MCP server registered with manually supplied metadata"
}
```

The V1 response is `202 Accepted` with no body, and a `Location` header to poll. The V1 server returned by `GET /resource-servers/api/v1/mcp-servers/emsMa1nU2aL3p0g4zrZb` has `_links` objects:

```json
{
  "id": "emsMa1nU2aL3p0g4zrZb",
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:emsMa1nU2aL3p0g4zrZb",
  "resourceUrl": "https://mcp.example.com",
  "status": "ACTIVE",
  "authorizationServerCount": 1,
  "metadata": {
    "displayName": "Manually registered MCP Server",
    "description": "MCP server registered with manually supplied metadata",
    "scopesSupported": [
      "mcp.read",
      "mcp.write"
    ]
  },
  "created": "2025-02-01T10:00:00Z",
  "lastUpdated": "2025-02-01T10:00:00Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/emsMa1nU2aL3p0g4zrZb"
    },
    "authorization-servers": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/emsMa1nU2aL3p0g4zrZb/authorization-servers"
    }
  }
}
```

The V2 request to `POST /resource-servers/api/v2/mcp-servers` puts `displayName`, `description`, and `scopesSupported` under `metadata`:

```json
{
  "registrationType": "MANUAL",
  "resourceUrl": "https://mcp.example.com",
  "metadata": {
    "displayName": "Manually registered MCP Server",
    "description": "MCP server registered with manually supplied metadata",
    "scopesSupported": [
      "mcp.read",
      "mcp.write"
    ]
  }
}
```

The V2 response is `201 Created` with the server. The response has no `_links` and includes `_embedded.counts`. The other properties are the same:

```json
{
  "id": "emsMa1nU2aL3p0g4zrZb",
  ...
  "_embedded": {
    "counts": {
      "authorizationServers": 0,
      "clientAuthSettings": 0
    }
  }
}
```

For a server that Okta detected metadata for, V1 returns `detectedMetadata`. V2 folds those properties into `metadata`. This V1 response has a `detectedMetadata` object:

```json
{
  "id": "ems8nUa7p0g4zrZbs2f4",
  "resourceUrl": "https://api.example.com/mcp",
  "status": "ACTIVE",
  "metadata": {
    "displayName": "Example MCP Server",
    "description": "Example Model Context Protocol Server"
  },
  "detectedMetadata": {
    "lastRefreshedAt": "2025-01-29T10:00:00Z",
    "resourceName": "Example MCP",
    "scopesSupported": [
      "mcp.read",
      "mcp.write"
    ]
  }
}
```

The V2 response has the same values in `metadata`:

```json
{
  "id": "ems8nUa7p0g4zrZbs2f4",
  "resourceUrl": "https://api.example.com/mcp",
  "status": "ACTIVE",
  "metadata": {
    "displayName": "Example MCP Server",
    "description": "Example Model Context Protocol Server",
    "lastRefreshedAt": "2025-01-29T10:00:00Z",
    "resourceName": "Example MCP",
    "scopesSupported": [
      "mcp.read",
      "mcp.write"
    ]
  }
}
```

The next examples add an authorization server to an MCP server. In V1, you add a manual authorization server inline with a request to `POST /resource-servers/api/v1/mcp-servers/{mcpServerId}/authorization-servers`:

```json
{
  "type": "MANUAL",
  "issuer": "https://auth.example.com",
  "authorizationEndpoint": "https://auth.example.com/oauth/authorize",
  "tokenEndpoint": "https://auth.example.com/oauth/token",
  "registrationEndpoint": "https://auth.example.com/oauth/register",
  "grantTypesSupported": [
    "authorization_code",
    "refresh_token"
  ]
}
```

In V2, create the external authorization server first, as shown in [Authorization servers for resource servers](#authorization-servers-for-resource-servers). Then link it with a request to `POST /resource-servers/api/v2/mcp-servers/{mcpServerId}/authorization-servers`. This request also enables cross-app access with a tenant. V1 used `protocolConfigured` and `tenantId` for this:

```json
{
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:external-authorization-servers:easMa1nU2aL3p0g4zrZb",
  "protocolConfigurations": {
    "sts": {
      "enabled": false
    },
    "identityAssertion": {
      "enabled": true,
      "tenantId": "T024BE7LD"
    }
  }
}
```

The V2 response is `201 Created` with a link object. The `authorizationServer` is embedded, and the outer `created` and `lastUpdated` describe the link:

```json
{
  "authorizationServer": {
    "id": "easMa1nU2aL3p0g4zrZb",
    "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:external-authorization-servers:easMa1nU2aL3p0g4zrZb",
    "issuer": "https://slack.com",
    "status": "ACTIVE",
    "type": "MANUAL",
    "metadata": {
      "authorizationEndpoint": "https://slack.com/oauth/v2/authorize",
      "tokenEndpoint": "https://slack.com/api/oauth.v2.access",
      "grantTypesSupported": [
        "authorization_code",
        "refresh_token"
      ],
      "protocolSupported": [
        "STS",
        "IDENTITY_ASSERTION"
      ]
    },
    "subjectMappingExpression": "user.email",
    "created": "2025-02-01T10:00:00Z",
    "lastUpdated": "2025-02-01T10:00:00Z"
  },
  "protocolConfigurations": {
    "sts": {
      "enabled": false
    },
    "identityAssertion": {
      "enabled": true,
      "tenantId": "T024BE7LD"
    }
  },
  "created": "2025-03-04T09:12:00Z",
  "lastUpdated": "2025-03-04T09:12:00Z"
}
```

To update the link in V2, send a merge patch to `PATCH /resource-servers/api/v2/mcp-servers/{mcpServerId}/authorization-servers/{authorizationServerId}`. This request enables the STS protocol and changes the tenant. The omitted `identityAssertion.enabled` property is unchanged:

```json
{
  "protocolConfigurations": {
    "sts": {
      "enabled": true
    },
    "identityAssertion": {
      "tenantId": "T0ABCDEF1"
    }
  }
}
```

<!-- Source: Resource Server V1 vs V2 API (Confluence eng page 1189150741, version 5) and the okta-oas3 MCP server specs under specs/monolith/secures-ai/spec/v1 and v2/resource-servers/mcp-servers. V2 examples are spec-derived, not from live calls. The detectedMetadata comparison uses the "Active MCP server" examples from the V1 and V2 specs, trimmed to the properties that differ (orn, authorizationServerCount, created, lastUpdated, _links, and _embedded are omitted). Confirm with engineering that protocolConfigurations is gated by SECURE_AI_MCP_SERVERS_XAA_FOR_EXTERNAL_AS and whether the V2 reference docs will describe that gate. -->

## MCP Server Capabilities

The endpoints and response codes are the same in V1 and V2. Only the version in the path changes: `/resource-servers/api/v1/mcp-servers/{mcpServerId}/metadata/discover` becomes `/resource-servers/api/v2/mcp-servers/{mcpServerId}/metadata/discover`. The same applies to the `metadata/discovery` and `tools` endpoints.

The request body for starting discovery changes, and V2 removes `_links` from individual objects.

### Asynchronous discovery

Starting discovery stays asynchronous in V2. The call returns `202 Accepted` with a `Location` header, and you poll the Resource Server Operations API for the result. In V2, the `Location` header points to `/resource-servers/api/v2/operations/{operationId}`.

### Consent required

The `409` consent-required response is the same in V1 and V2. The `reason` is `CONSENT_REQUIRED`, and the interaction URL is in `errorCauses[0].errorSummary`. Your existing consent handling works unchanged.

### Request changes

| Property | V1 | V2 |
| --- | --- | --- |
| Authentication type | `type` | `credential.authType` |
| `clientAuthSettingsOrn` | Top-level | `credential.clientAuthSettingsOrn` |
| `tokenRequestSettingsOrn` | Top-level | `credential.tokenRequestSettingsOrn` |

The `authType` value for brokered consent changes. V1 uses `CLIENT_AUTH_SETTINGS`, and V2 uses `BROKERED_CONSENT`. The `IDENTITY_ASSERTION` value is the same.

For an `IDENTITY_ASSERTION` request, send either `clientAuthSettingsOrn` or `tokenRequestSettingsOrn`, not both. Use `clientAuthSettingsOrn` when an external authorization server protects the MCP server and Okta holds a client registration there. Use `tokenRequestSettingsOrn` when an Okta authorization server protects it. See [Token Request Settings](#token-request-settings). The settings supply the authorization server and the scopes, so the request no longer takes `authorizationServerOrn` or `scopes`.

### Response changes

| Property | V1 | V2 |
| --- | --- | --- |
| `_links` on a discovery | `self`, `mcpServer`, `clientAuthSettings`, and `tools` | Removed |
| `_links` on a tool | `self` and `parent` | Removed |
| `credential.authType` | `CLIENT_AUTH_SETTINGS` or `IDENTITY_ASSERTION` | `BROKERED_CONSENT` or `IDENTITY_ASSERTION` |
| `_links` on a list | Objects with an `href` | Plain URL strings |
| `_links.parent` on a tools list | Object with an `href` | Removed |
| `Link` response header on the tools list | Not returned | Returned for pagination. The discoveries list returns it in both versions. |
| `_embedded.metadata.total` on the tools list | Total number of tools that match the `search` filter | Removed |

### What to change

- Move `type`, `clientAuthSettingsOrn`, and `tokenRequestSettingsOrn` under `credential` in discovery requests. Rename `type` to `authType`, and change the value `CLIENT_AUTH_SETTINGS` to `BROKERED_CONSENT`.
- Stop reading `_links` on individual discoveries and tools. Build the URLs from the `id` values.
- Stop reading `_embedded.metadata.total` and `_links.parent` from the tools list. Page through the list with `_links.next` or the `Link` header.
- Change `search` filters on `credential.authType` from `CLIENT_AUTH_SETTINGS` to `BROKERED_CONSENT`.
- Poll the V2 operation URL from the `Location` header.

### Examples

This example starts discovery with a client authentication settings object.

The V1 request to `POST /resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4/metadata/discover` has a flat body:

```json
{
  "type": "CLIENT_AUTH_SETTINGS",
  "clientAuthSettingsOrn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc2c8xwvBn4h2Ry50g7"
}
```

The V2 request to `POST /resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/metadata/discover` nests the credential:

```json
{
  "credential": {
    "authType": "BROKERED_CONSENT",
    "clientAuthSettingsOrn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc2c8xwvBn4h2Ry50g7"
  }
}
```

Both versions return `202 Accepted` with no body. The `Location` header is `https://{yourOktaDomain}/resource-servers/api/v1/operations/op-1a2b3c4d` in V1 and `https://{yourOktaDomain}/resource-servers/api/v2/operations/op-1a2b3c4d` in V2.

This example starts discovery with cross-app access (XAA) through an external authorization server.

The V1 request body:

```json
{
  "type": "IDENTITY_ASSERTION",
  "clientAuthSettingsOrn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc2c8xwvBn4h2Ry50g7"
}
```

The V2 request body:

```json
{
  "credential": {
    "authType": "IDENTITY_ASSERTION",
    "clientAuthSettingsOrn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc2c8xwvBn4h2Ry50g7"
  }
}
```

For an Okta authorization server, replace `clientAuthSettingsOrn` with `tokenRequestSettingsOrn` in the same position in both versions. The token request settings supply the authorization server and the scopes.

This example retrieves a discovery. The V1 response from `GET /resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4/metadata/discovery/emd1a2b3c4d5e6f7g8h9` has `_links`:

```json
{
  "id": "emd1a2b3c4d5e6f7g8h9",
  "mcpServerId": "ems8nUa7p0g4zrZbs2f4",
  "credential": {
    "authType": "CLIENT_AUTH_SETTINGS",
    "clientAuthSettingsId": "rsc2c8xwvBn4h2Ry50g7"
  },
  "status": "READY",
  "lastDiscoveredAt": "2025-01-29T12:00:00Z",
  "toolsCount": 12,
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4/metadata/discovery/emd1a2b3c4d5e6f7g8h9"
    },
    "mcpServer": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4"
    },
    "clientAuthSettings": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/client-auth-settings/rsc2c8xwvBn4h2Ry50g7"
    },
    "tools": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools?search=credential.clientAuthSettingsId%20eq%20%22rsc2c8xwvBn4h2Ry50g7%22"
    }
  }
}
```

The V2 response from `GET /resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/metadata/discovery/emd1a2b3c4d5e6f7g8h9` has no `_links`. The `authType` is `BROKERED_CONSENT`, and the other properties are the same:

```json
{
  "id": "emd1a2b3c4d5e6f7g8h9",
  ...
  "credential": {
    "authType": "BROKERED_CONSENT",
    "clientAuthSettingsId": "rsc2c8xwvBn4h2Ry50g7"
  },
  ...
}
```

For an `IDENTITY_ASSERTION` discovery through an Okta authorization server, the V2 `credential` returns `tokenRequestSettingsId` instead of `clientAuthSettingsId`:

```json
{
  "id": "emd9h8g7f6e5d4c3b2a1",
  "mcpServerId": "ems8nUa7p0g4zrZbs2f4",
  "credential": {
    "authType": "IDENTITY_ASSERTION",
    "tokenRequestSettingsId": "rst1a2b3c4d5e6f7g8h9"
  },
  "status": "READY",
  "lastDiscoveredAt": "2026-01-29T12:00:00Z",
  "toolsCount": 8
}
```

This example retrieves a tool. The V1 tool has `_links`. The V2 tool doesn't.

The V1 response from `GET /resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools/emt1a2b3c4d5e6f7g8h9`, with the `inputSchema` shortened:

```json
{
  "id": "emt1a2b3c4d5e6f7g8h9",
  "name": "create_pull_request",
  "description": "Creates a new pull request in a GitHub repository",
  "inputSchema": {
    "type": "object",
    "required": ["repo", "title"]
  },
  "created": "2025-01-29T12:00:00Z",
  "lastUpdated": "2025-01-29T12:00:00Z",
  "credential": {
    "authType": "CLIENT_AUTH_SETTINGS",
    "clientAuthSettingsId": "rsc2c8xwvBn4h2Ry50g7"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools/emt1a2b3c4d5e6f7g8h9"
    },
    "parent": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/mcp-servers/ems8nUa7p0g4zrZbs2f4"
    }
  }
}
```

The V2 response from `GET /resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools/emt1a2b3c4d5e6f7g8h9` has the same properties and no `_links`. The `credential.authType` is `BROKERED_CONSENT`.

On a V2 list, such as `GET /resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools?search=credential.authType%20eq%20%22BROKERED_CONSENT%22&limit=20`, the `_links` are plain URL strings. There is no `_embedded.metadata.total` or `parent` link:

```json
{
  "data": [ ... ],
  "_links": {
    "self": "https://{yourOktaDomain}/resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools?search=credential.authType%20eq%20%22BROKERED_CONSENT%22&limit=20",
    "next": "https://{yourOktaDomain}/resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools?search=credential.authType%20eq%20%22BROKERED_CONSENT%22&after=emt1a2b3c4d5e6f7g8h9&limit=20"
  }
}
```

The `search` parameter is required on the tools list in both versions. In V2, it supports `eq` on `credential.authType` (`BROKERED_CONSENT` or `IDENTITY_ASSERTION`), `credential.clientAuthSettingsId`, and `credential.tokenRequestSettingsId`. In V1, the brokered consent value is `CLIENT_AUTH_SETTINGS`. The discoveries list supports the same `search` filter, but it's optional.

<!-- Source: okta-oas3 specs/monolith/secures-ai/spec/v1/resource-servers/mcp-servers/mcp-server-capabilities.yaml and spec/v2/resource-servers/mcp-servers/mcp-server-capabilities.yaml (master, e795ff64f). Tool list and discovery examples are trimmed. V2 list envelopes drop _embedded.metadata.total. The Agent Gateway wiki (Confluence page 1095041886) says V2 adds credential.scopes and keeps a parent link on tools lists. Both are out of date: okta-oas3 master 81cf28712 (2026-11-09) removed credential.scopes, and OKTA-1319552 removed _links.parent. The BROKERED_CONSENT value, tokenRequestSettingsOrn, and the removal of authorizationServerOrn and scopes from discovery requests come from the SECURE_AI_GATEWAY_XAA changes in master. TODO: Confirm the customer-facing name of SECURE_AI_GATEWAY_XAA, and whether V2 keeps CLIENT_AUTH_SETTINGS for the V1 value only. The V1 example dates (2025) and V2 example dates (2026) come straight from the specs. -->

## Virtual MCP Servers

The V2 reference calls a virtual MCP server an agent gateway. The resource server API changes the path, removes `_links`, and drops the authorization server write calls.

| Aspect | V1 | V2 |
| --- | --- | --- |
| Path | `/resource-servers/api/v1/virtual-mcp-servers` | `/resource-servers/api/v2/agent-gateways` |
| Path parameters | `virtualMcpServerId` and `capabilityId` | `agentGatewayId` and `toolId` |
| `_links` on an object | `self`, `authorization-servers`, and `tools` | Removed |
| `_links` on a list | Objects with an `href` | Plain URL strings |
| `_links.parent` on a tools list | Object with an `href` | Removed |
| Authorization server links | List, retrieve, add, and remove | List and retrieve only |

Agent gateway calls don't take the `links` query parameter that some other V2 APIs add. Lists always return `_links`.

### Authorization servers

V1 lets you add and remove an Okta custom authorization server on a virtual MCP server. Both calls return `202` with a `Location` header to poll.

Okta now creates a custom authorization server for each agent gateway automatically, so V2 removes the add and remove calls, and Okta doesn't currently expose them.

The changes in [Authorization servers for resource servers](#authorization-servers-for-resource-servers) apply to the responses. In V2, each item is a link object with `authorizationServer`, `created`, and `lastUpdated`. The V1 item is the authorization server itself, with `_links`.

### What to change

- Replace `/resource-servers/api/v1/virtual-mcp-servers` with `/resource-servers/api/v2/agent-gateways` in your calls.
- Stop reading `self`, `authorization-servers`, and `tools` links from an object. Build the URLs from the `id`.
- Read the authorization server from `authorizationServer` in each link object.
- Stop calling the add and remove authorization server operations. V2 doesn't include them.

### Examples

This example retrieves a virtual MCP server. The V1 response from `GET /resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k` has `_links`:

```json
{
  "id": "wlp1aB2cD3eF4gH5iJ6k",
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:virtual-mcp:wlp1aB2cD3eF4gH5iJ6k",
  "resourcePath": "production",
  "resourceUrl": "https://{yourOktaSubdomain}.gateway.okta.com/mcp/production",
  "status": "ACTIVE",
  "profile": {
    "displayName": "Production MCP Servers",
    "description": "Groups all production MCP servers for the engineering team"
  },
  "created": "2025-06-01T10:00:00Z",
  "lastUpdated": "2025-06-15T14:30:00Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k"
    },
    "authorization-servers": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/authorization-servers"
    },
    "tools": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/tools"
    }
  }
}
```

The V2 response from `GET /resource-servers/api/v2/agent-gateways/wlp1aB2cD3eF4gH5iJ6k` has the same properties and no `_links`.

The `expand` query parameter works the same way on the list call in both versions. Pass `connectedResources`, `attachedAgents`, or both. The summaries appear under `_embedded`, and the single-object `GET` doesn't return them.

This example lists the tools of a virtual MCP server. The V1 response from `GET /resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/tools?limit=20` returns `_links` as objects:

```json
{
  "data": [
    {
      "id": "vsc1aB2cD3eF4gH5iJ6k",
      "sourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4:tools:emt1aB2cD3eF4gH5iJ6k",
      "connectionOrn": "orn:okta:idp:00o1gjjp4jsdR3Sww4x7:connections:mcn1aB2cD3eF4gH5iJ6k",
      "status": "VALID",
      "profile": {
        "name": "get_issues",
        "description": "Get issues from a repository",
        "alias": "get_jira_issues"
      }
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/tools?limit=20"
    },
    "next": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/tools?after=vsc1aB2cD3eF4gH5iJ6k&limit=20"
    },
    "parent": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k"
    }
  }
}
```

The V2 response from `GET /resource-servers/api/v2/agent-gateways/wlp1aB2cD3eF4gH5iJ6k/tools?limit=20` returns the same `data` and plain URL strings in `_links`, without the `parent` link:

```json
{
  "data": [ ... ],
  "_links": {
    "self": "https://{yourOktaDomain}/resource-servers/api/v2/agent-gateways/wlp1aB2cD3eF4gH5iJ6k/tools?limit=20",
    "next": "https://{yourOktaDomain}/resource-servers/api/v2/agent-gateways/wlp1aB2cD3eF4gH5iJ6k/tools?after=vsc1aB2cD3eF4gH5iJ6k&limit=20"
  }
}
```

The tool object is the same in both versions. Pass `expand=inputSchema` to embed the input schema under `_embedded`.

This example retrieves an authorization server link. The V1 response from `GET /resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/authorization-servers/aus5rb5mt2H3d1TJd0h7` is the authorization server:

```json
{
  "id": "aus5rb5mt2H3d1TJd0h7",
  "orn": "orn:okta:idp:00o5rb5mt2H3d1TJd0h7:authorization_servers:aus5rb5mt2H3d1TJd0h7",
  "issuer": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7",
  "status": "ACTIVE",
  "metadata": {
    "authorizationEndpoint": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7/v1/authorize",
    "tokenEndpoint": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7/v1/token",
    "grantTypesSupported": [
      "authorization_code",
      "urn:ietf:params:oauth:grant-type:token-exchange"
    ]
  },
  "lastUpdated": "2025-01-27T08:00:00Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/authorization-servers/aus5rb5mt2H3d1TJd0h7"
    }
  }
}
```

The V2 response from `GET /resource-servers/api/v2/agent-gateways/wlp1aB2cD3eF4gH5iJ6k/authorization-servers/aus5rb5mt2H3d1TJd0h7` is a link object:

```json
{
  "authorizationServer": {
    "id": "aus5rb5mt2H3d1TJd0h7",
    "orn": "orn:okta:idp:00o5rb5mt2H3d1TJd0h7:authorization_servers:aus5rb5mt2H3d1TJd0h7",
    "issuer": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7",
    "status": "ACTIVE",
    "type": "OKTA",
    "metadata": {
      "authorizationEndpoint": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7/v1/authorize",
      "tokenEndpoint": "https://{yourOktaDomain}/oauth2/aus5rb5mt2H3d1TJd0h7/v1/token",
      "grantTypesSupported": [
        "authorization_code",
        "urn:ietf:params:oauth:grant-type:token-exchange"
      ]
    },
    "created": "2025-01-27T08:00:00Z",
    "lastUpdated": "2025-01-27T08:00:00Z"
  },
  "created": "2025-01-28T08:00:00Z",
  "lastUpdated": "2025-01-28T08:00:00Z"
}
```

<!-- Source: okta-oas3 specs/monolith/secures-ai/spec/v1/resource-servers/virtual-mcp-servers/virtual-mcp-servers.yaml and spec/v2/resource-servers/agent-gateways/agent-gateway.yaml (master, e795ff64f). Examples are trimmed to one item. The wiki (Confluence page 1095041886) confirms that V2 drops the add and remove authorization server calls on purpose, and that individual tools have no _links. Engineering answered how a customer links an authorization server in V2 (2026-11-12): they don't. Okta auto-generates a custom authorization server for each gateway. The V1 add and remove APIs were already disabled (ccs secure.ai.virtual.mcp.auto.create.authorization.server.enabled), V2 behaves the same, and Okta doesn't want to expose them now. The optional authorizationServer property on create (EXTERNAL_AUTHORITY, SECURE_AI_EXTERNAL_IDP_GATEWAY) applies to V1 and V2. When it's set, Okta uses that server instead of the generated one. It's under development and is expected to reach GA after V2 GA, so the guide doesn't document it. Ted owns this item. TODO: Revisit with Ted when SECURE_AI_EXTERNAL_IDP_GATEWAY goes GA. -->

## Client Authentication Settings

The endpoints, operations, and scopes are the same in V1 and V2. V2 restructures the payload so that all OAuth client fields are under one `oauthClientConfiguration` object.

### Property changes

| Property | V1 | V2 |
| --- | --- | --- |
| `purpose` | Array with one item: `STS`, `AGENT_IMPORT`, or `XAA`. | Renamed `purposes`. Same values. |
| `registrationMethod` | Top-level property. `STATIC` is the default. The other value is `DCR`. | Moved to `oauthClientConfiguration.registrationMethod`. |
| `clientCredentials` | Top-level object with `clientId` and `clientSecret`. `clientSecret` is write-only. | Moved to `oauthClientConfiguration.clientCredentials`. Adds a required `credentialType` of `CLIENT_SECRET`. Create requests need `credentialType`, `clientId`, and `clientSecret`. |
| `scopes` | `oauthConfiguration.scopes` | `oauthClientConfiguration.scopes` |
| `grantTypes` | `oauthConfiguration.grantTypes`. Optional. Defaults to `authorization_code`. | `oauthClientConfiguration.grantTypes`. Required whenever `oauthClientConfiguration` is present. Adds `client_credentials` to the allowed values. |
| `additionalRequestParameters` | Not available. | New. `oauthClientConfiguration.additionalRequestParameters` holds custom key-value parameters. `authorize` takes parameters for `authorization_code`. `token` takes parameters for `authorization_code`, `refresh_token`, `client_credentials`, and `urn:ietf:params:oauth:grant-type:jwt-bearer`. Only for API server and MCP server resources. |
| `authorizationServerConfiguration` | Not available. | New. Overrides the `authorizeEndpoint` and `tokenEndpoint` URLs. Only for eligible app resources, such as Workday and Databricks. Okta rejects it for any other resource. |
| `_links` on individual objects | Required. `_links.self` is an object with an `href`. | Removed. |

The `name`, `protocol`, `resourceOrn`, and `authorizationServerOrn` properties are the same in both versions. The `id`, `created`, and `lastUpdated` properties are still read-only.

### Valid grant types by purpose

Okta rejects a grant type that isn't allowed for the purpose.

| Purpose | V1 | V2 |
| --- | --- | --- |
| `STS` | `authorization_code` | `authorization_code` |
| `AGENT_IMPORT` | `authorization_code` | `authorization_code` or `client_credentials` |
| `XAA` | `urn:ietf:params:oauth:grant-type:jwt-bearer` | `urn:ietf:params:oauth:grant-type:jwt-bearer` |

V2 also validates the new properties:

- `additionalRequestParameters` can only use keys for the configured grant type, and the values can only contain valid characters.
- The `authorizationServerConfiguration` endpoints must be absolute HTTP or HTTPS URLs.

### Update request changes

| Property | V1 | V2 |
| --- | --- | --- |
| Client secret rotation | `clientCredentials.clientSecret` | `oauthClientConfiguration.clientCredentials.clientSecret`. You can also send `credentialType`, which must remain `CLIENT_SECRET`. |
| Scopes | `oauthConfiguration.scopes`. Set `oauthConfiguration` to `null` to remove it. | `oauthClientConfiguration.scopes`. Set `oauthClientConfiguration` to `null` to remove it. |
| `additionalRequestParameters` | Not available. | Updatable. Set it to `null` to remove all parameters. Set `authorize` or `token` to `null` to clear only that part. Parts that you omit stay unchanged. |
| `authorizationServerConfiguration` | Not available. | Updatable. Set it to `null` to remove it. |

In both versions, you can update `name` but can't clear it after you set it. You can't change `purpose` (V1) or `purposes` (V2), `protocol`, `registrationMethod`, `grantTypes`, or `resourceOrn` after you create the settings.

### Response changes

| Operation | V1 response | V2 response |
| --- | --- | --- |
| List | `{ data, _links }`. `_links` is optional. `self` and `next` are objects with an `href`. | `{ data, _links }`. `_links` is required. `self` and `next` are plain URL strings. |
| Create with `STATIC` registration | `201` with the settings | `201` with the settings |
| Create with `DCR` registration | `202` with no body. The `Location` header points to the operation to poll. | `202` with no body. The `Location` header points to the V2 operation to poll. |
| Retrieve | `200` with the settings | `200` with the settings |
| Update | `200` with the settings | `200` with the settings |
| Delete | `204` | `204` |

### What to change

Make these changes:

- Rename `purpose` to `purposes` in request bodies and in the `search` filter. Combine `resourceOrn` and `purposes` with `and`.
- Move `registrationMethod`, `clientCredentials`, `scopes`, and `grantTypes` under `oauthClientConfiguration`.
- Always send `grantTypes` in create requests. For `STATIC` registration, also send `credentialType` set to `CLIENT_SECRET`.
- Stop reading `_links` on individual settings objects. Read list `_links` as plain URL strings.
- If you create `DCR` settings, poll the V2 operation URL in the `Location` header instead of the V1 URL.

<!-- Engineering confirmed on 2026-11-12 that the okta-oas3 V2 spec (client-auth-settings.yaml) is correct and the Confluence page (1176240645) is wrong. A V2 create with a DCR registrationMethod returns a Location header that points to /resource-servers/api/v2/operations/{id}. The guide follows the spec. Kenton owns updating the Confluence page. -->

### Examples

This example creates client authentication settings for an MCP server resource. Send the V1 request to `POST /resource-servers/api/v1/client-auth-settings`:

```json
{
  "purpose": ["STS"],
  "protocol": "OAUTH2",
  "resourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4",
  "authorizationServerOrn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:external-authorization-servers:eas1gjh63g214q0Hq0g4",
  "name": "My Server Connection",
  "clientCredentials": {
    "clientId": "0oa1gjh63g214q0Hq0g4",
    "clientSecret": "very-secret-string-that-is-never-stored-in-plain-text"
  },
  "oauthConfiguration": {
    "scopes": ["api:read", "api:write"]
  }
}
```

Send the V2 request to `POST /resource-servers/api/v2/client-auth-settings`. The OAuth fields are under `oauthClientConfiguration`, and `grantTypes` and `credentialType` are included:

```json
{
  "purposes": ["STS"],
  "protocol": "OAUTH2",
  "resourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4",
  "authorizationServerOrn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:external-authorization-servers:eas1gjh63g214q0Hq0g4",
  "name": "My Server Connection",
  "oauthClientConfiguration": {
    "clientCredentials": {
      "credentialType": "CLIENT_SECRET",
      "clientId": "0oa1gjh63g214q0Hq0g4",
      "clientSecret": "very-secret-string-that-will-not-be-returned-in-responses"
    },
    "grantTypes": ["authorization_code"],
    "scopes": ["api:read", "api:write"]
  }
}
```

The V1 response:

```json
{
  "id": "con1a2b3c4d5e6f7g8h9",
  "purpose": ["STS"],
  "protocol": "OAUTH2",
  "resourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4",
  "authorizationServerOrn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:external-authorization-servers:eas1gjh63g214q0Hq0g4",
  "name": "My Server Connection",
  "registrationMethod": "STATIC",
  "clientCredentials": {
    "clientId": "0oa1gjh63g214q0Hq0g4"
  },
  "created": "2024-01-29T10:30:00.000Z",
  "lastUpdated": "2024-01-29T10:35:00.000Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/client-auth-settings/con1a2b3c4d5e6f7g8h9"
    }
  }
}
```

The V2 response:

```json
{
  "id": "con1a2b3c4d5e6f7g8h9",
  "purposes": ["STS"],
  "protocol": "OAUTH2",
  "resourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4",
  "authorizationServerOrn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:external-authorization-servers:eas1gjh63g214q0Hq0g4",
  "name": "My Server Connection",
  "oauthClientConfiguration": {
    "registrationMethod": "STATIC",
    "clientCredentials": {
      "credentialType": "CLIENT_SECRET",
      "clientId": "0oa1gjh63g214q0Hq0g4"
    },
    "grantTypes": ["authorization_code"],
    "scopes": ["api:read", "api:write"]
  },
  "created": "2024-01-29T10:30:00.000Z",
  "lastUpdated": "2024-01-29T10:35:00.000Z"
}
```

<!-- Source: Delegation Links, Client Auth Settings & Agent Credentials V1 vs V2 API (Confluence eng page 1176240645, version 6). The PATCH behavior for clearing authorize or token parameters comes from okta-oas3 OKTA-1311524 (2026-11-02), which is newer than the wiki. -->

## Token Request Settings

Token request settings tell Okta where to get an access token when it discovers the tools of an MCP server. They name the Okta authorization server and the scopes to request. Use them when an Okta authorization server protects the MCP server and Okta has no client registration there. If Okta holds a client registration, use [Client Authentication Settings](#client-authentication-settings) instead.

The endpoints, operations, request bodies, response bodies, scopes, and response codes are the same in V1 and V2. Only the version in the path changes: `/resource-servers/api/v1/token-request-settings` becomes `/resource-servers/api/v2/token-request-settings`.

### Operations

| Operation | Method and V2 path | Success response |
| --- | --- | --- |
| List | `GET /resource-servers/api/v2/token-request-settings` | `200` |
| Create | `POST /resource-servers/api/v2/token-request-settings` | `201` with the settings |
| Retrieve | `GET /resource-servers/api/v2/token-request-settings/{tokenRequestSettingsId}` | `200` |
| Update | `PATCH /resource-servers/api/v2/token-request-settings/{tokenRequestSettingsId}` | `200` with the settings |
| Delete | `DELETE /resource-servers/api/v2/token-request-settings/{tokenRequestSettingsId}` | `204` |

Both versions accept either the `okta.resourceServers.mcpServers.read` and `.manage` scopes or the `okta.resourceServers.read` and `.manage` scopes.

### Properties

The properties are the same in V1 and V2.

| Property | Description |
| --- | --- |
| `name` | A name for the settings. Required on create. You can update it, but you can't clear it after you set it. |
| `resourceOrn` | The ORN of the MCP server that the settings apply to. Required on create. You can't change it. |
| `authorizationServerOrn` | The ORN of the Okta authorization server that Okta requests the access token from. Required on create. You can't change it. |
| `scopes` | The scopes that Okta requests. They determine which tools the access token can list. Required on create, with at least one scope. You can update them. |
| `purposes` | An array with one item: `TOOL_DISCOVERY_OKTA_AS`. You can't change it. |
| `id`, `created`, `lastUpdated` | Read-only |

An MCP server can have several settings for the same authorization server, for example with different scope sets.

### Use with MCP server discovery

When an Okta authorization server protects the MCP server, you start discovery with `credential.tokenRequestSettingsOrn` instead of the old `authorizationServerOrn` and `scopes` properties. The settings supply both values. For details, see [MCP Server Capabilities](#mcp-server-capabilities).

The discovery response returns `credential.tokenRequestSettingsId`. To list the discoveries or tools that came from one settings object, search with `credential.tokenRequestSettingsId eq "{tokenRequestSettingsId}"`.

### List search

In both versions, `search` supports `eq` on `resourceOrn` and `authorizationServerOrn`. Combine them with `and`. Percent-encode the value.

In both versions, a list returns `_links` with `self` and `next` as plain URL strings, and an individual object has no `_links`.

### What to change

- Replace `/resource-servers/api/v1/token-request-settings` with `/resource-servers/api/v2/token-request-settings` in your calls.

### Examples

This example creates token request settings. The request body is the same in V1 and V2. Send it to `POST /resource-servers/api/v1/token-request-settings` or `POST /resource-servers/api/v2/token-request-settings`:

```json
{
  "name": "Contacts read-only discovery",
  "resourceOrn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4",
  "authorizationServerOrn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus1gjh63g214q0Hq0g4",
  "scopes": [
    "read:contacts",
    "read:accounts"
  ]
}
```

Both versions return `201 Created` with the same body:

```json
{
  "id": "rst1a2b3c4d5e6f7g8h9",
  "name": "Contacts read-only discovery",
  "resourceOrn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4",
  "authorizationServerOrn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus1gjh63g214q0Hq0g4",
  "scopes": [
    "read:contacts",
    "read:accounts"
  ],
  "purposes": [
    "TOOL_DISCOVERY_OKTA_AS"
  ],
  "created": "2024-01-29T10:30:00.000Z",
  "lastUpdated": "2024-01-29T10:30:00.000Z"
}
```

This example changes the requested scopes. Send a `PATCH` request to `/resource-servers/api/v2/token-request-settings/rst1a2b3c4d5e6f7g8h9`. Send the full scope set, because the new array replaces the old one:

```json
{
  "scopes": [
    "read:contacts",
    "read:accounts",
    "read:documents"
  ]
}
```

This example lists the settings for one MCP server. The V2 call:

```http
GET /resource-servers/api/v2/token-request-settings?search=resourceOrn%20eq%20%22orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4%22&limit=20
```

<!-- Source: okta-oas3 specs/monolith/secures-ai/spec/v1/resource-servers/token-request-settings and spec/v2/resource-servers/token-request-settings (master 81cf28712, 2026-11-09, added by OKTA-1311475). The V1 and V2 specs differ only in the path, operation IDs, and the SECURE_AI_APIS_V2 flag. The PATCH example is the spec example, and the statement that the new scope array replaces the old one follows from JSON Merge Patch on an array. TODO: Both versions are at the PRODUCT_DEV lifecycle behind SECURE_AI_GATEWAY_XAA, so confirm with engineering whether any customer calls V1 today and whether this section belongs in a migration guide. The same flag needs a customer-facing name. TODO: Confirm the name cannot be cleared; the spec description is cut off after "cannot be cleared or set to nu". -->

## AI Agent Providers

V2 makes these changes:

- Removes `_links` from individual objects.
- References a client authentication settings object by ID in `configuration`. V2 no longer accepts OAuth credentials directly for providers that use a client ID and client secret. Providers that use an API key, such as AWS with `accessKeyId` and `secretAccessKey`, still pass those credentials directly.
- Makes list filtering and sorting part of the base API. Use the `search`, `sourceInstanceName`, `orderBy`, and `sortOrder` parameters.
- Adds `id` to the `search` filter. `externalId` stays supported.

Response codes are the same in V1 and V2. Provider writes that were asynchronous in V1 are still asynchronous in V2.

### Provider attributes

The endpoint for retrieving the attributes of a provider is the same in V1 and V2. Only the version in the path changes:

- V1: `GET /workload-principals/api/v1/ai-agents/provider-attributes/{providerName}`
- V2: `GET /workload-principals/api/v2/ai-agents/provider-attributes/{providerName}`

The response codes and the `data` array of attributes are the same. V2 removes `_links` from the response.

This V1 response includes `_links.self`:

```json
{
  "data": [
    {
      "name": "source.Id",
      "type": "string"
    },
    {
      "name": "source.Description",
      "type": "string"
    },
    {
      "name": "source.MasterLabel",
      "type": "string"
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/provider-attributes/salesforce"
    }
  }
}
```

The V2 response has the same `data` array and no `_links`.

### Filtering and sorting

The list call, `GET /workload-principals/api/v2/ai-agent-providers`, takes these query parameters.

| Parameter | V1 | V2 |
| --- | --- | --- |
| `search` | `eq` on `sourceOrn`, `sourceId`, `sourceName`, `sourceType`, `externalId`, and `status` | `eq` on `id`, `sourceOrn`, `sourceId`, `sourceName`, `sourceType`, `externalId`, and `status`. Also `pr` and `not ({propertyName} pr)` on `schedule`. |
| `sourceInstanceName` | Available only when the enhancements are enabled | Matches providers whose app instance name contains the value |
| `orderBy` | Available only when the enhancements are enabled | `createdDate`, `lastUpdate`, `lastImportedDate`, or `nextImportDate`. The default is descending creation date. |
| `sortOrder` | Available only when the enhancements are enabled | `asc` or `desc`. The default is `desc`. |

The `search` value needs URL encoding. For example, this V2 call lists active Salesforce providers, newest import first:

```http
GET /workload-principals/api/v2/ai-agent-providers?search=sourceName%20eq%20%22salesforce%22%20and%20status%20eq%20%22ACTIVE%22&orderBy=lastImportedDate&sortOrder=desc&limit=20
```

Both versions return a `Link` response header with `self` and `next` links. `next` is present only when there is another page.

### What to change

Make these changes:

- Create a client authentication settings object for each provider that uses a client ID and client secret. Send its ID in `configuration`, not the credentials.
- Keep sending `accessKeyId` and `secretAccessKey` directly for providers that use an API key, such as AWS.
- Stop reading `_links` on individual providers.
- Keep polling the operation after provider writes, because they're still asynchronous.

### Examples

This example retrieves a provider. The V1 response from `GET /workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d` has `_links`:

```json
{
  "id": "aip-1a2b3c4d",
  "sourceOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:salesforce:0oafxqCAJWWGELFTYASJ",
  "sourceId": "0oafxqCAJWWGELFTYASJ",
  "sourceName": "salesforce",
  "sourceType": "apps",
  "status": "ACTIVE",
  "integrationDate": "2024-01-01T12:00:00Z",
  "lastImportDate": "2024-06-01T12:00:00Z",
  "owners": {
    "userOrns": [
      "orn:okta:directory:00o11edPwGqbUrsDm0g4:users:00u10sfroCwbHQO4a0g4",
      "orn:okta:directory:00o11edPwGqbUrsDm0g4:users:00u10sfroCwbHQO4a0g5"
    ]
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d"
    }
  }
}
```

The V2 response from `GET /workload-principals/api/v2/ai-agent-providers/aip-1a2b3c4d` has the same properties and no `_links`.

This example lists providers. In V1, the `_links` on the list and on each provider are objects with an `href`:

```json
{
  "data": [
    {
      "id": "aip-1a2b3c4d",
      "sourceOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:salesforce:0oafxqCAJWWGELFTYASJ",
      "sourceId": "0oafxqCAJWWGELFTYASJ",
      "sourceName": "salesforce",
      "sourceType": "apps",
      "status": "ACTIVE",
      "integrationDate": "2024-01-01T12:00:00Z",
      "lastImportDate": "2024-06-01T12:00:00Z",
      "owners": {
        "userOrns": [
          "orn:okta:directory:00o11edPwGqbUrsDm0g4:users:00u10sfroCwbHQO4a0g4"
        ]
      },
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d"
        }
      }
    }
  ],
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers"
    }
  }
}
```

In V2, the providers have no `_links`, and the list `_links` are plain URL strings:

```json
{
  "data": [ ... ],
  "_links": {
    "self": "https://{yourOktaDomain}/workload-principals/api/v2/ai-agent-providers"
  }
}
```

This example creates a provider. The V1 request to `POST /workload-principals/api/v1/ai-agent-providers` for a Salesforce source passes the OAuth credentials in `configuration`:

```json
{
  "sourceOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:salesforce:0oafxqCAJWWGELFTYASJ",
  "configuration": {
    "clientId": "clientId",
    "clientSecret": "clientSecret"
  },
  "owners": {
    "userOrns": [
      "orn:okta:directory:00o11edPwGqbUrsDm0g4:users:00u10sfroCwbHQO4a0g4"
    ]
  }
}
```

The V2 request to `POST /workload-principals/api/v2/ai-agent-providers` for the same Salesforce source references a client authentication settings object by ID instead of passing the credentials. The `schedule` is part of the base API in V2:

```json
{
  "sourceOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:salesforce:0oafxqCAJWWGELFTYASJ",
  "configuration": {
    "client_auth_id": "rsc9sfdXk2Lm4PqRs0g4"
  },
  "schedule": {
    "cron": "0 0 9 ? * MON",
    "timezone": "America/Los_Angeles"
  },
  "owners": {
    "userOrns": [
      "orn:okta:directory:00o11edPwGqbUrsDm0g4:users:00u10sfroCwbHQO4a0g4"
    ]
  }
}
```

Both versions return `201 Created` with the provider. The V1 response has `_links.self`, and the V2 response doesn't. The V2 response returns the property as `configuration.clientAuthId`, with `platforms` set to `SALESFORCE_AGENTFORCE`.

<!-- Source: okta-oas3 specs/monolith/secures-ai/spec/v1/ai-agents/ai-agent-providers/ai-agent-providers.yaml and spec/v2/ai-agents/ai-agent-providers/ai-agent-providers-v2.yaml (master, e795ff64f). Provider IDs and source values are adapted so the V1 and V2 examples match, and the lists are trimmed to one item. The V1 and V2 create examples both use Salesforce, from okta-oas3 master 81cf28712 (2026-11-09), which added provider-specific V2 examples. TODO: Confirm the name of the client authentication settings property in configuration. The V2 spec uses `clientAuthId` for UiPath and in responses, and `client_auth_id` in the Gemini Enterprise request examples. The V2 request examples for every provider use `client_auth_id`, and the responses use `clientAuthId`. The Configuration schema is open-ended, so the spec doesn't document the name. Engineering answered on 2026-11-12. Today the request takes `client_auth_id` and the response returns `clientAuthId`. Engineering will check whether the request can also accept `clientAuthId`. Mymoona owns this item and the provider answers below. TODO: Follow up with Mymoona, and update the V2 request example if the name changes. Providers that use a client ID and client secret go through client authentication settings. AWS and any other provider that uses an API key still pass credentials directly. Engineering also confirmed that `externalId` search is supported in V2, which corrects the spec-based inference. -->

## AI Agent Schema

The endpoints and response codes are the same. V2 removes `_links` from the schema response. The property definitions are the same.

## Resource Connections

V2 consolidates the AI Agent Connections, MCP Server Connections, Virtual MCP Connections, Managed Connections, and Potential Connections APIs into the Resource Connections API.

This is the largest change in the migration. The path, the actor, the connection type, and the request and response bodies all change.

### One collection for all actors

In V1, each actor type has its own path. The reverse lookup by resource is a separate endpoint.

| Purpose | V1 | V2 |
| --- | --- | --- |
| AI agent connections | `/workload-principals/api/v1/ai-agents/{agentId}/connections` | `/resource-connections/api/v2/connections` |
| MCP server connections | `/workload-principals/api/v1/mcp-servers/{mcpServerId}/connections` | `/resource-connections/api/v2/connections` |
| Virtual MCP server connections | `/workload-principals/api/v1/virtual-mcp-servers/{virtualMcpServerId}/connections` | `/resource-connections/api/v2/connections` |
| Reverse lookup by resource | `/workload-principals/api/v1/managed-connections` | `/resource-connections/api/v2/connections` with `search` |
| Potential connections | `/workload-principals/api/v1/potential-connections` | `/resource-connections/api/v2/potential-connections` |

V2 is one org-wide collection. The actor moves from the path into the request body as `actor.wlpId`. To list the connections of one actor, filter with `search=actor.wlpId eq "{wlpId}"`.

The operations are the same: list, create, retrieve, update, delete, activate, and deactivate. In V2, the paths are `/connections/{connectionId}`, with `/lifecycle/activate` and `/lifecycle/deactivate` for the lifecycle calls.

### Connection types

V1 combines how the actor gets a token and what it connects to in one `connectionType` value. V2 splits it into two properties:

- `protocol.protocolType` is `IDENTITY_ASSERTION` or `STS`.
- `resource.resourceType` is `API_SERVER`, `A2A_SERVER`, `MCP_SERVER`, `SERVICE_ACCOUNT`, or `VAULT_SECRET`.

Use this table to convert a V1 `connectionType`.

| V1 `connectionType` | V2 `protocolType` | V2 `resourceType` | V2 `authorizationServer` | V2 `resourceIdentifier` |
| --- | --- | --- | --- | --- |
| `IDENTITY_ASSERTION_CUSTOM_AS` | `IDENTITY_ASSERTION` | None. Omit `resource`. | Required. An Okta custom authorization server. | Read-only. Okta sets it to the default audience of the authorization server. |
| `IDENTITY_ASSERTION_APP_INSTANCE` | `IDENTITY_ASSERTION` | `API_SERVER` | Required. An external authorization server of the API server. | Required |
| `IDENTITY_ASSERTION_A2A_SERVER` | `IDENTITY_ASSERTION` | `A2A_SERVER` | Required. An Okta custom authorization server. | Read-only. Okta sets it to the A2A server URL. |
| `IDENTITY_ASSERTION_MCP_SERVER` | `IDENTITY_ASSERTION` | `MCP_SERVER` | Required. A custom or external authorization server. | Read-only. Okta sets it to the MCP server URL. |
| `STS_SERVICE_ACCOUNT` | `STS` | `SERVICE_ACCOUNT` | Not applicable | Optional. Defaults to `resource.orn`. |
| `STS_VAULT_SECRET` | `STS` | `VAULT_SECRET` | Not applicable | Optional. Defaults to `resource.orn`. |
| `STS_ACCESS_TOKEN` for an API server or app instance | `STS`, with `protocol.credential` | `API_SERVER` | Not applicable | Required |
| `STS_ACCESS_TOKEN` for an MCP server | `STS`, with `protocol.credential` | `MCP_SERVER` | Not applicable | Required |

Not every actor can use every connection type. This table shows which actors can use each combination of protocol and resource.

| Protocol | Resource | AI agent | MCP server | Virtual MCP server |
| --- | --- | --- | --- | --- |
| `IDENTITY_ASSERTION` | None (custom authorization server) | Yes | Yes | No |
| `IDENTITY_ASSERTION` | `API_SERVER` | Yes | Yes | No |
| `IDENTITY_ASSERTION` | `A2A_SERVER` | Yes | No | No |
| `IDENTITY_ASSERTION` | `MCP_SERVER` | Yes | Yes | No |
| `STS` | `API_SERVER` | Yes | Keep only | No |
| `STS` | `MCP_SERVER` | Yes | Keep only | Yes |
| `STS` | `SERVICE_ACCOUNT` or `VAULT_SECRET` | Yes | No | No |

Virtual MCP server actors can create `STS` connections to MCP servers. The table uses these values:

- **Yes:** You can create, read, update, activate, deactivate, and delete the connection.
- **Keep only:** Create and activate return `400`. STS needs a user, and the downstream call of an MCP server has none. You can still read, list, update, deactivate, and delete an existing connection.
- **No:** Every operation returns `400`.

### Request changes

| Aspect | V1 | V2 |
| --- | --- | --- |
| Actor | Path parameter | `actor.wlpId` in the body. `actor.wlpType` and `actor.displayName` are read-only. |
| Type | `connectionType` | `protocol.protocolType` and `resource.resourceType` |
| Resource reference | Differs by type: `appInstance.orn`, `secret.orn`, `app.orn` with `serviceAccount.orn`, or `resource.orn` | Always `resource.orn` with `resource.resourceType`. Omit `resource` for a custom authorization server. |
| Target of an app instance connection | `appInstance.orn` is the app instance | `resource.orn` is the API server. Okta returns the owning app as `resource.appInstance`. |
| Authorization server for an app instance connection | Not sent. Okta resolved it from the app instance. | `authorizationServer.orn` is required. |
| App of a service account connection | `app.orn` is required | Removed. Okta derives `resource.appInstance` from the service account. |
| STS access token | `resource.orn` is the client authentication settings | `resource.orn` is the API server or MCP server. `protocol.credential` holds the client authentication settings. |
| `clientIdAtResource` | Top level | `protocol.clientIdAtResource`. You can't update it. |
| `scopeCondition` and `scopes` | Top level | `protocol.scopeCondition` and `protocol.scopes`. Both are required for every `IDENTITY_ASSERTION` create. |
| `resourceIndicator` | Optional on create for most types | Renamed `resourceIdentifier`. Required, optional, or read-only, depending on the type. |
| Unknown properties | Not restricted | Not allowed on the connection, resource, and protocol objects |

For an `STS` access token connection, `protocol.credential` is an object with `credentialType` set to `ACCESS_TOKEN` and the `orn` of the client authentication settings.

### Response changes

| Property | V1 | V2 |
| --- | --- | --- |
| `actor` | Not in the body | `actor` with `wlpId`, `wlpType`, and `displayName` |
| `authorizationServer` | `orn`, `name`, `issuerUrl`, `logo`, and `_links` | `orn`, `displayName`, and `issuerUrl`. `name` is renamed `displayName`. `logo` and `_links` are removed. |
| App instance | `appInstance.orn` or `app` with `orn`, `name`, `logo`, and `_links` | `resource.appInstance` with `orn`, `displayName`, and `logo`. Read-only, on `API_SERVER` and `SERVICE_ACCOUNT` resources. |
| Vaulted secret | `secret` with `orn`, `name`, `description`, `path`, and `_links` | `resource` with `resourceType`, `orn`, `displayName`, `description`, and `location`. `name` becomes `displayName`, and `path` becomes `location`. |
| Service account | `serviceAccount` with `orn`, `name`, and `_links` | `resource` with `resourceType`, `orn`, `displayName`, and `appInstance` |
| A2A or MCP server | `resource` with `orn` and `name` | `resource` with `resourceType`, `orn`, `displayName`, and `location` |
| STS access token resource | `resource` with IDs such as `apiServerId`, `mcpServerId`, and `appInstanceId`, plus `clientAuthSettings` | `resource` with `resourceType`, `orn`, `displayName`, and `location`. `protocol.credential` holds the client authentication settings. The raw IDs are removed. |
| `resourceIndicator` | Present | Renamed `resourceIdentifier` |
| `_links` | `_links.self` on every connection and on the objects it references | Removed. The new `links` query parameter returns `_links.web` on the nested objects. On a list, plain URL strings and a `Link` response header for pagination. |

V2 adds a `links` query parameter to the list and retrieve calls. Set it to `ALL` or `web` to get `_links.web` on `resource`, `resource.appInstance`, and `authorizationServer`. The value is the absolute URL of the object's page in the Admin Console or in Okta Privileged Access. Without `links`, the nested objects have no `_links`. Create, update, activate, and deactivate responses always include all links. Potential connections don't return links. A2A servers, API servers, and external authorization servers have no `web` link.

### Update changes

An update still uses JSON Merge Patch on `PATCH /connections/{connectionId}`. The changes are:

- `resourceIndicator` is now `resourceIdentifier`. It's read-only for custom authorization server, A2A server, and MCP server identity assertion connections, so sending it returns `400`.
- `scopeCondition` and `scopes` move under `protocol`. Send them together. V2 doesn't accept `null` for them, and returns `400` for `STS` connections.
- A `null` for `resourceIdentifier` resets it to `resource.orn` for `SERVICE_ACCOUNT` and `VAULT_SECRET` connections. For `API_SERVER` connections, and for `MCP_SERVER` connections that use `STS`, `null` returns `400`.
- `issuerUrl` is read-only. In V1, you could update it on identity assertion connections.
- You can't change `actor`, `resource`, `protocol.protocolType`, or `protocol.clientIdAtResource`.

### Response codes

| Operation | V1 | V2 |
| --- | --- | --- |
| Create | `201` | `201`. An unknown `actor.wlpId` returns `400`, not `404`. An `MCP_SERVER` actor that isn't active returns `404`. |
| Retrieve, update | `200` | `200` |
| Delete | `204` | `204`. Only an `INACTIVE` connection can be deleted. An `ACTIVE` connection returns `409`. |
| Activate, deactivate | `200` | `200`. Activate follows the create rules for the actor. An unsupported combination returns `400`, and an inactive `MCP_SERVER` actor returns `404`. |

### Scopes

V2 accepts any one of the `okta.aiAgents.*`, `okta.resourceServers.mcpServers.*`, or `okta.resourceServers.virtualMcpServers.*` scope families on every operation. Use `.read` for `GET` calls and `.manage` for writes. You can keep the scopes that your integration uses today.

### List search

| Aspect | V1 | V2 |
| --- | --- | --- |
| Parameter | `filter`, on the AI agent list only | `search` |
| Results | The connections of one actor | All connections in the org. Narrow with `actor.wlpId`. |
| Properties | `connectionType`, `status`, `resourceIndicator`, `authorizationServer.orn`, and `resource.orn` for A2A and MCP servers | `actor.wlpId`, `resource.orn`, `resource.appInstance.orn`, `authorizationServer.orn`, `resourceIdentifier`, `resource.resourceType`, `protocol.protocolType`, `status`, and `resource` |
| Operators | `eq` and `and` | `eq` and `and`. `pr` on `resource` only, and `not` only as `not (resource pr)`. |

The V2 `search` value can't use `or`. It also rejects repeated terms and blank values. Percent-encode the value.

To find custom authorization server connections, V1 filters with `connectionType eq "IDENTITY_ASSERTION_CUSTOM_AS"`. V2 uses `protocol.protocolType eq "IDENTITY_ASSERTION" and not (resource pr)`.

### Reverse lookup

In V1, `GET /workload-principals/api/v1/managed-connections?filter=resourceOrn eq "{orn}"` lists the connections to a resource. In V2, use the list call with `search=resource.orn eq "{orn}"`. An unknown resource ORN returns an empty page.

V1 lets you pass several resource ORNs in one call by joining them with `OR`. V2 doesn't support `or` in `search`, so make one call for each resource ORN.

### Potential connections

The potential connections call moves from `/workload-principals/api/v1/potential-connections` to `/resource-connections/api/v2/potential-connections`. The scopes are the same as for the other V2 connection calls.

V1 answers one question: which targets of one `connectionType` exist. V2 answers three questions:

- Forward: which resources can an actor connect to?
- Reverse: which actors can connect to a resource?
- App instance: which API servers and service accounts of an app instance can actors connect to?

#### Query changes

| Aspect | V1 | V2 |
| --- | --- | --- |
| Parameter | `filter` is required and selects one `connectionType`. | `search`. It's optional. |
| Type | `connectionType eq "{type}"` | `protocol.protocolType` and `resource.resourceType`. Use them alone to list the candidates of one type, or with an anchor to narrow the results. |
| Actor | `actorId` is optional. It only adds `clientIdAtResource` to app instance rows. | `actor.wlpId eq "{wlpId}"` runs a forward query. An unknown `wlpId` returns `400`. |
| Reverse query | Not available | `resource.orn eq "{orn}"` returns one row for each actor and protocol. Okta lists a row only when the resource is set up for that protocol. An unknown ORN returns `400`. |
| App instance | `appInstanceOrn eq "{orn}"`, for `STS_SERVICE_ACCOUNT` only | `resource.appInstance.orn eq "{orn}"`, for `API_SERVER` and `SERVICE_ACCOUNT` rows |
| STS access token type | `resourceType eq "APP_INSTANCE"`, `"MCP_SERVER"`, or `"API_SERVER"` | `resource.resourceType eq "API_SERVER"` or `"MCP_SERVER"`, with `protocol.protocolType eq "STS"`. There is no `APP_INSTANCE` type. |
| `match` | Fuzzy substring of 3 to 50 characters on the typed list | The same length rule applies to every query. It takes effect on forward and app instance queries. On a reverse query, Okta ignores a valid `match`. |
| `after`, `limit` | `limit` defaults to 20, with a maximum of 200. | Same |

In V2, the client authentication settings of an app instance come back as an `API_SERVER` row. The row has `resource.appInstance` set.

If you omit `search`, V2 returns all candidates in the org. A `search` that has only `protocol.protocolType` and `resource.resourceType` is also valid. To narrow the results to one actor, resource, or app instance, anchor `search` on `actor.wlpId`, `resource.orn`, or `resource.appInstance.orn`.

V2 also returns `400` for these `search` values:

- A property that's used more than once
- A blank or non-string value
- The `or` operator
- `resource.appInstance.orn` together with `resource.orn`, or a value that isn't an app instance ORN
- A `resource.resourceType` that differs from the type of the `resource.orn` value
- Any use of `not` other than `not (resource pr)`

#### Query mapping

Use this table to convert a V1 `filter`. The V2 examples anchor on an actor. To list the candidates for every actor, as a V1 call without `actorId` does, drop the `actor.wlpId` term and keep the type terms.

| V1 `filter` | V2 `search` |
| --- | --- |
| `connectionType eq "IDENTITY_ASSERTION_CUSTOM_AS"` | `actor.wlpId eq "{id}" and protocol.protocolType eq "IDENTITY_ASSERTION" and not (resource pr)` |
| `connectionType eq "IDENTITY_ASSERTION_APP_INSTANCE"`, with `actorId={id}` | `actor.wlpId eq "{id}" and protocol.protocolType eq "IDENTITY_ASSERTION" and resource.resourceType eq "API_SERVER"` |
| `connectionType eq "IDENTITY_ASSERTION_A2A_SERVER"` | `actor.wlpId eq "{id}" and protocol.protocolType eq "IDENTITY_ASSERTION" and resource.resourceType eq "A2A_SERVER"` |
| `connectionType eq "IDENTITY_ASSERTION_MCP_SERVER"` | `actor.wlpId eq "{id}" and protocol.protocolType eq "IDENTITY_ASSERTION" and resource.resourceType eq "MCP_SERVER"` |
| `connectionType eq "STS_SERVICE_ACCOUNT" and appInstanceOrn eq "{app}"` | `resource.appInstance.orn eq "{app}" and protocol.protocolType eq "STS" and resource.resourceType eq "SERVICE_ACCOUNT"` |
| `connectionType eq "STS_VAULT_SECRET"` | `actor.wlpId eq "{id}" and protocol.protocolType eq "STS" and resource.resourceType eq "VAULT_SECRET"` |
| `connectionType eq "STS_ACCESS_TOKEN" and resourceType eq "API_SERVER"` | `actor.wlpId eq "{id}" and protocol.protocolType eq "STS" and resource.resourceType eq "API_SERVER"` |
| `connectionType eq "STS_ACCESS_TOKEN" and resourceType eq "MCP_SERVER"` | `actor.wlpId eq "{id}" and protocol.protocolType eq "STS" and resource.resourceType eq "MCP_SERVER"` |
| `connectionType eq "STS_ACCESS_TOKEN" and resourceType eq "APP_INSTANCE"` | `resource.appInstance.orn eq "{app}" and protocol.protocolType eq "STS" and resource.resourceType eq "API_SERVER"`. You can anchor on `actor.wlpId` instead. |
| Not available | `resource.orn eq "{orn}"`, which lists the actors that can connect to the resource |

#### Row changes

V1 rows differ by `connectionType`. V2 rows use one shape, with the same property names as the V2 create request. The parts of a row depend on the query:

- Forward queries return `resource` but not `actor`.
- Reverse queries return `actor` but not `resource`.
- App instance queries return `resource`. They also return `actor`, unless the query has `actor.wlpId`.
- Custom authorization server rows have no `resource`.

| Property | V1 | V2 |
| --- | --- | --- |
| Type | `connectionType` | `protocol.protocolType` and `resource.resourceType` |
| Resource | Differs by type: `authorizationServer`, `appInstance`, `resource` with `orn` and `name`, `secret`, `app` with `serviceAccount`, or a `resource` with `resourceType` | `resource`, with the same schema as a connection. Omitted on custom authorization server rows. |
| `authorizationServer` | `orn`, `name`, `issuerUrl`, `logo`, and `_links` | `orn`, `displayName`, and `issuerUrl` |
| `clientIdAtResource` | Top level, on app instance rows only. Returned only when you pass `actorId`. | `protocol.clientIdAtResource`, on `IDENTITY_ASSERTION` rows for an `API_SERVER` |
| Declared scopes | `scopes`, on app instance rows only | `scopesSupported`, which is read-only. For an `API_SERVER`, these are the scopes on the API server. For an `MCP_SERVER`, they come from the catalog, or else from the protected resource metadata. |
| STS credential | `resource.clientAuthSettings` with `orn`, `name`, `oauthConfiguration.scopes`, and `_links` | `protocol.credential` with `credentialType`, `orn`, `displayName`, and `scopes` |
| Resource identifier | `resourceIndicator` | Renamed `resourceIdentifier` |
| Raw IDs | `appInstanceId`, `apiServerId`, and `mcpServerId`, on STS access token rows | Removed. Use ORNs. |
| `_links` | `_links.self` and `_links.web` on referenced objects | Removed from rows |

#### Create a connection from a row

A row isn't a complete create request. Add the `actor.wlpId` you queried by, or the `resource` for a reverse query. Then add these values before you call `POST /resource-connections/api/v2/connections`.

| Row | Add before you create the connection |
| --- | --- |
| Any `IDENTITY_ASSERTION` row | `protocol.scopeCondition` and `protocol.scopes`. Take the scopes from `scopesSupported`. |
| `IDENTITY_ASSERTION` row for an `API_SERVER` | `resourceIdentifier`, the audience of the API server, if the row has none. Check the value when the row includes one. |
| STS access token row for an app instance | `resourceIdentifier`. The row has none. |
| Custom authorization server row | Nothing. Don't send `resourceIdentifier`. It's read-only for a custom authorization server, and create returns `400` if you send it. |

Remove the read-only properties of the row, such as `displayName`, `appInstance`, `location`, `issuerUrl`, `credential.displayName`, `credential.scopes`, and `scopesSupported`. Create ignores or rejects them.

### What to change

- Call `/resource-connections/api/v2/connections` for every actor type. Send `actor.wlpId` in the body.
- Replace `connectionType` with `protocol.protocolType` and `resource.resourceType`. Use the conversion table.
- Reference resources by `resource.orn`. For an app instance connection, send the API server ORN and the external authorization server ORN.
- Move `scopeCondition`, `scopes`, and `clientIdAtResource` under `protocol`.
- For an STS access token, send the client authentication settings ORN in `protocol.credential.orn`.
- Rename `resourceIndicator` to `resourceIdentifier`. Don't send it for custom authorization server, A2A server, or MCP server identity assertion connections.
- Replace `filter` and the managed connections call with `search`. Make one call for each resource ORN instead of joining them with `OR`.
- Replace the potential connections `filter` with `search`. Anchor it on `actor.wlpId`, `resource.orn`, or `resource.appInstance.orn` to narrow the results. Use the query mapping table to convert a V1 `filter`.
- Read the scopes that a resource declares from `scopesSupported`. Check `resourceIdentifier` when you create a connection from an API server row, and add it if the row has none.
- Deactivate a connection before you delete it.
- Stop reading `_links.self` on connections, and read `authorizationServer.displayName` instead of `name`. Pass `links=web` if you need the Admin Console URL of a nested object.

### Examples

This example creates an identity assertion connection to a custom authorization server for an AI agent.

The V1 request to `POST /workload-principals/api/v1/ai-agents/wlpkhjm0jnDp8RrUu0g4/connections`:

```json
{
  "connectionType": "IDENTITY_ASSERTION_CUSTOM_AS",
  "authorizationServer": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus5rb5mt2H3d1TJd0h7"
  },
  "scopeCondition": "INCLUDE_ONLY",
  "scopes": [
    "repo.read",
    "repo.write"
  ]
}
```

The V2 request to `POST /resource-connections/api/v2/connections` moves the agent into the body. There's no `resource`, because the target is the authorization server:

```json
{
  "actor": {
    "wlpId": "wlpkhjm0jnDp8RrUu0g4"
  },
  "authorizationServer": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus5rb5mt2H3d1TJd0h7"
  },
  "protocol": {
    "protocolType": "IDENTITY_ASSERTION",
    "scopeCondition": "INCLUDE_ONLY",
    "scopes": [
      "repo.read",
      "repo.write"
    ]
  }
}
```

Both calls return `201 Created`. The V1 response has `connectionType`, `resourceIndicator`, and `_links`:

```json
{
  "connectionType": "IDENTITY_ASSERTION_CUSTOM_AS",
  "id": "mcn2b3c4d5e6f7g8h9i0",
  "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:connections:mcn2b3c4d5e6f7g8h9i0",
  "status": "ACTIVE",
  "resourceIndicator": "https://api.example.com/orders",
  "authorizationServer": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus5rb5mt2H3d1TJd0h7",
    "name": "Partner AS",
    "issuerUrl": "https://example.okta.com/oauth2/aus5rb5mt2H3d1TJd0h7",
    "_links": {
      "self": {
        "href": "https://example.okta.com/api/v1/authorizationServers/aus5rb5mt2H3d1TJd0h7"
      }
    }
  },
  "scopeCondition": "INCLUDE_ONLY",
  "scopes": [
    "repo.read",
    "repo.write"
  ],
  "_links": {
    "self": {
      "href": "https://example.okta.com/workload-principals/api/v1/ai-agents/wlpkhjm0jnDp8RrUu0g4/connections/mcn2b3c4d5e6f7g8h9i0"
    }
  }
}
```

The V2 response returns the actor, `protocol`, and `resourceIdentifier`, and has no `_links`:

```json
{
  "id": "rcn2b3c4d5e6f7g8h9i0",
  "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:connections:rcn2b3c4d5e6f7g8h9i0",
  "status": "ACTIVE",
  "actor": {
    "wlpId": "wlpkhjm0jnDp8RrUu0g4",
    "wlpType": "AI_AGENT",
    "displayName": "Sales AI Agent"
  },
  "authorizationServer": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus5rb5mt2H3d1TJd0h7",
    "displayName": "Partner AS",
    "issuerUrl": "https://example.okta.com/oauth2/aus5rb5mt2H3d1TJd0h7"
  },
  "protocol": {
    "protocolType": "IDENTITY_ASSERTION",
    "scopeCondition": "INCLUDE_ONLY",
    "scopes": [
      "repo.read",
      "repo.write"
    ]
  },
  "resourceIdentifier": "https://api.example.com/orders"
}
```

This example creates an identity assertion connection to an A2A server.

The V1 request body:

```json
{
  "connectionType": "IDENTITY_ASSERTION_A2A_SERVER",
  "resource": {
    "orn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:a2a:wlpkhjm0jnDp8RrUu0g4"
  },
  "authorizationServer": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus5rb5mt2H3d1TJd0h7"
  },
  "scopeCondition": "INCLUDE_ONLY",
  "scopes": [
    "a2a.invoke"
  ]
}
```

The V2 request body adds the actor and `resourceType`, and moves the scopes under `protocol`:

```json
{
  "actor": {
    "wlpId": "wlpkhjm0jnDp8RrUu0g4"
  },
  "authorizationServer": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus5rb5mt2H3d1TJd0h7"
  },
  "protocol": {
    "protocolType": "IDENTITY_ASSERTION",
    "scopeCondition": "INCLUDE_ONLY",
    "scopes": [
      "a2a.invoke"
    ]
  },
  "resource": {
    "resourceType": "A2A_SERVER",
    "orn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:a2a:wlpkhjm0jnDp8RrUu0g4"
  }
}
```

This example creates an STS access token connection to an API server. In V1, `resource.orn` is the client authentication settings. The V1 request body:

```json
{
  "connectionType": "STS_ACCESS_TOKEN",
  "resource": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc1gjh63g214q0Hq0g4"
  }
}
```

In V2, `resource.orn` is the API server, and the client authentication settings move to `protocol.credential`. You also send the `resourceIdentifier`:

```json
{
  "actor": {
    "wlpId": "wlpkhjm0jnDp8RrUu0g4"
  },
  "protocol": {
    "protocolType": "STS",
    "credential": {
      "credentialType": "ACCESS_TOKEN",
      "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc1gjh63g214q0Hq0g4"
    }
  },
  "resource": {
    "resourceType": "API_SERVER",
    "orn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:api:api8nUa7p0g4zrZbs2f4"
  },
  "resourceIdentifier": "https://api.example.com/mcp"
}
```

This example creates an STS vaulted secret connection. In V1, `secret.orn` identifies the secret. The V1 request body:

```json
{
  "connectionType": "STS_VAULT_SECRET",
  "secret": {
    "orn": "orn:okta:pam:00o1n8sbwArJ7OQRw406:secrets:d2642f68-df50-4ba8-a898-6c0f82f89d8a"
  }
}
```

The V2 request body uses `resource`:

```json
{
  "actor": {
    "wlpId": "wlpkhjm0jnDp8RrUu0g4"
  },
  "protocol": {
    "protocolType": "STS"
  },
  "resource": {
    "resourceType": "VAULT_SECRET",
    "orn": "orn:okta:pam:00o1n8sbwArJ7OQRw406:secrets:d2642f68-df50-4ba8-a898-6c0f82f89d8a"
  }
}
```

The V2 response returns `resource.displayName` and `resource.description`, and sets `resourceIdentifier` to the secret ORN by default. V1 returned `secret.name`, `secret.path`, and `secret.description` with `_links`.

This example lists the connections of an AI agent, filtered to active A2A server identity assertion connections.

The V1 call filters on `connectionType`:

```http
GET /workload-principals/api/v1/ai-agents/wlpkhjm0jnDp8RrUu0g4/connections?filter=connectionType%20eq%20%22IDENTITY_ASSERTION_A2A_SERVER%22%20and%20status%20eq%20%22ACTIVE%22
```

The V2 call filters on the actor and the two type properties. Add `status eq "ACTIVE"` the same way:

```http
GET /resource-connections/api/v2/connections?search=actor.wlpId%20eq%20%22wlpkhjm0jnDp8RrUu0g4%22%20and%20protocol.protocolType%20eq%20%22IDENTITY_ASSERTION%22%20and%20resource.resourceType%20eq%20%22A2A_SERVER%22
```

This example finds every connection to one MCP server. In V1, you use the managed connections call:

```http
GET /workload-principals/api/v1/managed-connections?filter=resourceOrn%20eq%20%22orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:mcp2c8xwvBn4h2Ry50g7%22
```

In V2, you use the list call:

```http
GET /resource-connections/api/v2/connections?search=resource.orn%20eq%20%22orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:mcp2c8xwvBn4h2Ry50g7%22
```

A V2 list returns `_links` as plain URL strings:

```json
{
  "data": [ ... ],
  "_links": {
    "self": "https://example.okta.com/resource-connections/api/v2/connections?search=actor.wlpId%20eq%20%22wlpkhjm0jnDp8RrUu0g4%22&limit=2",
    "next": "https://example.okta.com/resource-connections/api/v2/connections?search=actor.wlpId%20eq%20%22wlpkhjm0jnDp8RrUu0g4%22&after=rcn3c4d5e6f7g8h9i0j1&limit=2"
  }
}
```

This example lists the potential connections of an AI agent. The V1 call requires a `connectionType` in `filter` and passes the agent as `actorId`:

```http
GET /workload-principals/api/v1/potential-connections?filter=connectionType%20eq%20%22IDENTITY_ASSERTION_A2A_SERVER%22&actorId=wlpkhjm0jnDp8RrUu0g4
```

The V2 call passes the agent in `search`, and the type properties are optional:

```http
GET /resource-connections/api/v2/potential-connections?search=actor.wlpId%20eq%20%22wlpkhjm0jnDp8RrUu0g4%22%20and%20protocol.protocolType%20eq%20%22IDENTITY_ASSERTION%22%20and%20resource.resourceType%20eq%20%22A2A_SERVER%22
```

<!-- Source: Resource Connections V1 vs V2 API (Confluence eng page 1189020584, version 12) and okta-oas3 specs/monolith/secures-ai/spec/v1/ai-agents/connections and spec/v2/resource-connections (master, e795ff64f). The V1 and V2 examples are adapted so each pair matches: the connection IDs, authorization server names, and scopes come from different spec examples. The V2 list example is trimmed to one item. Kamron confirmed availability at V2 release on 2026-11-12. The V2 connections spec is gated by SECURE_AI_APIS_V2 only, the same as the other V2 APIs. TODO: Confirm whether connection IDs and ORNs keep their value and prefix between V1 and V2. The V1 examples use `mcn` IDs and the V2 examples use `rcn` IDs. The actor matrix in "Connection types" comes from Susan reading the wiki table, which uses images in its cells. The virtual MCP server supports only STS with MCP_SERVER, which matches the wiki text (gap G4). TODO: Confirm the Okta MCP Server connection. The V2 spec shows an org authorization server (`orn:okta:org:{orgId}:authorization_servers:org`) for MCP_SERVER under XAA_OKTA_MCP_SERVER, but the wiki says create rejects it today (gap G3). The guide omits it. TODO: Confirm the V2 scope fix. The wiki says the spec lists only okta.aiAgents.* and a fix is in progress (G35). The guide describes the intended behavior. TODO: Confirm that scopes-only updates are rejected. The wiki says scopeCondition and scopes must be sent together, although the spec example implies otherwise (G33). The guide says to send them together. The V1 managed connections example comes from spec/v1/managed-connections/managed-connections.yaml, which confirms `resourceOrn` and shows `OR` across several resource ORNs. The Potential connections subsection comes from Potential Connections V1 vs V2 API (Confluence eng page 1189445644, version 9) and okta-oas3 master 81cf28712 (2026-11-09). The wiki and the spec disagreed on potential connections in four places. Kamron answered on 2026-11-12 that the spec is the most up to date and that Kamron will sync the wiki with it. The guide follows the spec (okta-oas3 7047b6e6d, 2026-11-10). (1) Omitting search returns all candidates, and a type-only search is valid. The guide previously followed the wiki and said these returned 400. (2) Forward rows omit actor and reverse rows omit resource. OKTA-1316107 (in progress) was deciding whether reverse rows carry the authorization server and credential. The spec still says reverse rows include actor but not resource, so the guide follows that. TODO: Check OKTA-1316107 before release. OKTA-1316106 (resolved 2026-11-06) added actor to app instance rows. (3) The spec example shows resourceIdentifier on an IDENTITY_ASSERTION row for an API_SERVER, so the guide no longer says it is never populated. (4) The spec says match applies to forward queries and not to reverse queries, so the guide describes the ignore as documented behavior. OKTA-1316068 (triaged) is still open. -->

V1 managed connections and the AI agent, MCP server, and virtual MCP server connection APIs remain until the V1 cutoff.

## Migration checklist

Each API section ends its changes with a "What to change" list. This checklist covers only the changes that apply across APIs, or that aren't in one of those lists.

1. Change the path prefix in your calls from `/api/v1` to `/api/v2`.
2. Stop polling operations for write calls that are synchronous in V2.
3. Remove references to `appId`, `externalId`, and `platform` on AI agents.
4. Update code that reads `_links`.
5. Update code that branches on operation `type` values.
6. Move `subjectMappingExpression` and endpoint changes for external authorization servers to the External Authorization Servers API.
7. For MCP servers, replace `protocolConfigured` and `tenantId` with `protocolConfigurations`.
8. Test your integration against V2 before the V1 cutoff date.

## See also

<!-- TODO: Add links to the V2 API reference and the V1 deprecation announcement. -->
