---
title: Migrate Okta for AI Agents APIs from V1 to V2
excerpt: Learn how to move your calls from the V1 Okta for AI Agents APIs to the V2 APIs before V1 reaches end of life.
layout: Guides
---

Learn how the Okta for AI Agents V2 APIs differ from the V1 APIs, and what to change in your API calls.

<!-- TODO: Verify the V2 examples before release. The V2 request and response examples in this guide come from the okta-oas3 specs on master (specs/monolith/secures-ai/spec/v2), not from calls to a live V2 API. V2 is behind SECURE_AI_APIS_V2 and the specs are still changing. Re-check each V2 example against the final specs, or against real calls, once V2 is testable. Sections with spec-derived V2 examples: Delegation Links, Workload Principal Operations, AI Agent Credentials (client secrets), AI Agent Registration, Client Authentication Settings. Known unconfirmed V2 details are marked with their own TODOs: the /api/v1/ paths in V2 agent links, and the DCR create Location header. -->

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

<!-- TODO: Confirm each row with engineering. Rows marked "Not yet available" are still in design or development. -->

| V1 API | V2 availability | Summary of changes | Details |
| --- | --- | --- | --- |
| Delegation Links | Available | `_links` removed from individual objects. `to.authorizationServerOrn` removed from create requests. New `ID_TOKEN` links can't be created. | [Delegation Links](#delegation-links) |
| STS Authorization | Not applicable | No V2 version. Keep using the V1 STS callback endpoint. | [STS Authorization](#sts-authorization) |
| Workload Principal Operations | Available | `_links` removed from individual objects. Operation types for registration writes removed. | [Workload Principal Operations](#workload-principal-operations) |
| Resource Server Operations | Available | `_links` removed from the `resource`, and `orn` added. Fewer operation types. | [Resource Server Operations](#resource-server-operations) |
| AI Agent Credentials | Available | Link format changed. `_links` returned on `GET` only when you pass the new `links` query parameter. The client secrets list returns `data`. | [AI Agent Credentials](#ai-agent-credentials) |
| AI Agent Registration | Available | Writes are synchronous. `appId`, `externalId`, and `platform` removed. Link format changed. | [AI Agent Registration](#ai-agent-registration) |
| Virtual MCP Server Registrations | Available | Writes are synchronous. `_links` removed from individual objects. | [Virtual MCP Server Registrations](#virtual-mcp-server-registrations) |
| Agent-to-Agent Server Registrations | Available | `_links` removed. Authorization servers are linked by `orn`. Authorization server writes are synchronous. | [Agent-to-Agent Server Registrations](#agent-to-agent-server-registrations) |
| API Server Registration | Available | Writes are synchronous. `_links` removed. Request properties moved under `metadata`. Authorization servers are linked by `orn`. | [API Server Registration](#api-server-registration) |
| MCP Server Registrations | Available | Writes are synchronous, except discovery-based registration and `resourceUrl` changes. `_links` and `detectedMetadata` removed. Request properties moved under `metadata`. Authorization servers are linked by `orn`. | [MCP Server Registrations](#mcp-server-registrations) |
| MCP Server Capabilities | Available | `_links` removed from individual objects. Discovery is asynchronous. | [MCP Server Capabilities](#mcp-server-capabilities) |
| Virtual MCP Servers (Resource Server) | Available | Writes are synchronous. `_links` possibly removed from individual objects. | [Virtual MCP Servers](#virtual-mcp-servers) |
| Client Authentication Settings | Available | `_links` removed. OAuth fields moved under `oauthClientConfiguration`. `purpose` renamed `purposes`. New `client_credentials` grant type. | [Client Authentication Settings](#client-authentication-settings) |
| AI Agent Providers | Available | `_links` removed. `clientAuthSettingsId` replaces direct OAuth credentials. Filtering and sorting added. | [AI Agent Providers](#ai-agent-providers) |
| AI Agent Schema | Available | `_links` removed from the response. | [AI Agent Schema](#ai-agent-schema) |
| AI Agent Connections and Virtual MCP Connections | Not yet available | Consolidated into Resource Connections. | [Resource Connections](#resource-connections) |
| Potential Connections | Not yet available | Consolidated into Resource Connections. | [Resource Connections](#resource-connections) |

## Delegation Links

The endpoints, operations, query parameters, scopes, and response codes are the same in V1 and V2. The request and response bodies and the `_links` format differ.

Delegation Links was already synchronous in V1, so you don't poll for results in either version.

### Property changes

| Property | V1 | V2 |
| --- | --- | --- |
| `to.authorizationServerOrn` in create requests | Accepted. For `ID_TOKEN` links, Okta uses the org authorization server if you omit it. Ignored for `ACCESS_TOKEN` links. | Removed. Okta determines the authorization server. |
| `to.authorizationServerOrn` in responses | Read-only. Always present for `ACCESS_TOKEN` links. For `ID_TOKEN` links, present only if you set a custom authorization server. | Read-only. Identifies the custom authorization server that protects the target resource. |
| `from.tokenType` of `ID_TOKEN` | Deprecated. You can still create these links. | Deprecated. Returned for existing links only. You can't create new links with this token type. |

### Link changes

V1 returns `_links.self` on each delegation link as an object with an `href`. V2 doesn't return `_links` on a single delegation link.

On lists, V1 `_links.self` and `_links.next` are objects with an `href`. In V2, they are plain URL strings.

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

The V2 response doesn't include `_links`:

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
  }
}
```

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

In V2, `_links.self` is a plain URL string:

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
    "self": "https://{yourOktaDomain}/workload-principals/api/v2/delegation-links"
  }
}
```

<!-- TODO: Confirm with engineering whether the V2 reference docs will describe ID_TOKEN links as deprecated or removed. -->

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

<!-- TODO: Confirm with the Registry team that the virtual-mcp types are also removed in V2 because those writes are synchronous. The Confluence page infers this but doesn't state it. -->

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

In V2, the list `_links` are plain URL strings:

```json
{
  "data": [
    {
      "id": "op-6g7h8i9j",
      "type": "ai-agent:BulkStaging",
      "status": "IN_PROGRESS",
      "created": "2025-09-11T18:52:48.000Z",
      "started": "2025-09-11T18:52:48.000Z"
    }
  ],
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

This V2 response from `GET /resource-servers/api/v2/operations/op-1a2b3c4d` has an `orn` and no `_links` in the `resource`:

```json
{
  "id": "op-1a2b3c4d",
  "type": "resource-server:Register",
  "status": "COMPLETED",
  "created": "2025-01-29T10:00:00.000Z",
  "started": "2025-01-29T10:00:01.000Z",
  "completed": "2025-01-29T10:00:05.000Z",
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

<!-- TODO: Confirm the feature gate with engineering. The Confluence page (1176240645) says V2 is gated by SECURE_AI_ALTERNATIVE_TOKEN_ENDPOINT_AUTH_METHODS instead of SECURE_AI_XAA, but the okta-oas3 master V2 spec (agentCredentialsPublicKeys-v2.yaml) uses SECURE_AI_XAA. The guide follows the spec. -->

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

With `links=ALL`, each credential includes `activate`, `deactivate`, and `delete` links as plain URL strings:

```json
{
  "data": [
    {
      "id": "ocs2f4zrZbs8nUa7p0g4",
      "status": "INACTIVE",
      "client_secret": "DRUFXGF9XbLn......a3x3POBiIxDreBCdZuFs5B",
      "secret_hash": "yk4SVx4sUWVJVbHt6M-UPA",
      "created": "2023-02-21T20:08:24.000Z",
      "lastUpdated": "2023-02-21T20:08:24.000Z",
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

<!-- Source: Delegation Links, Client Auth Settings & Agent Credentials V1 vs V2 API (Confluence eng page 1176240645, version 6). -->

## AI Agent Registration

The endpoints and operations are the same in V1 and V2. The request and response bodies and the response codes differ.

### Synchronous writes

In V1, write operations return `202 Accepted` with no body. You follow the `Location` header and poll the Workload Principal Operations API for the result.

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
  "created": "2022-04-04T15:56:05.000Z",
  "lastUpdated": "2022-05-05T18:15:44.000Z",
  "status": "ACTIVE",
  "profile": {
    "name": "Orchestrator Agent",
    "description": "Orchestrator Agent"
  },
  "_links": {
    "providers": [
      "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d"
    ]
  }
}
```

<!-- TODO: The okta-oas3 V2 agent response examples (registration-v2.yaml) use /api/v1/ paths in the provider, resourceServer, and delegationLinks links. Confirm with engineering whether V2 responses return /api/v2/ links, and update the example if so. -->

When you update an agent with `PATCH`, you can no longer set or remove `appId`. The V2 request to remove the description is:

```json
{
  "profile": {
    "description": null
  }
}
```

## Virtual MCP Server Registrations

V2 makes these changes:

- Removes `_links` from individual objects.
- Makes write operations synchronous. Calls that returned `202` now return `200`, `201`, or `204`.

<!-- TODO: Add V1 and V2 examples. -->

## Agent-to-Agent Server Registrations

The endpoints and operations are the same in V1 and V2. Only the version in the path changes: `/resource-servers/api/v1/a2a-servers` becomes `/resource-servers/api/v2/a2a-servers`. This API lists and retrieves A2A servers and manages their authorization servers.

V2 makes these changes:

- Removes `_links` from the A2A server. The V1 `self`, `ai-agent`, and `authorization-servers` links are gone.
- Returns `_links` on lists as plain URL strings, with no `parent` link, and documents a `Link` header for pagination.
- Changes the add authorization server request from `{ "type": "OKTA", "orn": "..." }` to `{ "orn": "..." }`.
- Returns authorization servers as link objects. The embedded authorization server gains `type` and `created` and loses `_links`.

| Operation | V1 response | V2 response |
| --- | --- | --- |
| Add authorization server | `202`, no body | `201` with the link. Adds `409`. |
| Remove authorization server | `202`, no body | `204` |

The changes in [Authorization servers for resource servers](#authorization-servers-for-resource-servers) apply.

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

The V2 A2A server has no `_links`:

```json
{
  "a2aServerId": "wlpx9jQ16k9V8IFEL0g3",
  "orn": "orn:okta:directory:00o5rb5mt2H3d1TJd0h7:resource-servers:a2a:wlpx9jQ16k9V8IFEL0g3",
  "resourceUrl": "https://demo-agent.example.com",
  "created": "2025-01-27T08:00:00Z",
  "lastUpdated": "2025-01-29T10:00:00Z"
}
```

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
| `_links` | `self` and `authorization-servers` | Removed |
| `_embedded.counts` | Optional | Always returned |

On a list, V2 returns `_links` as plain URL strings and adds a `Link` response header for pagination.

### Authorization server changes

The changes in [Authorization servers for resource servers](#authorization-servers-for-resource-servers) apply. In V1, the add request has `type`, `issuer`, endpoints, `grantTypesSupported`, `tokenEndpointAuthMethod`, and `tenantId`. In V2, the add request is only the `orn` of an existing external authorization server. The response is a link object that includes a read-only `tenantId`.

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

The V2 response is `201 Created` with the server. The response has no `_links`:

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
  "_embedded": {
    "counts": {
      "authorizationServers": 2,
      "clientAuthSettings": 5
    }
  }
}
```

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

In V1, almost every write returns `202 Accepted` with no body. You follow the `Location` header and poll the Resource Server Operations API for the result.

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

### Link changes

V2 removes `_links` from individual MCP servers. The V1 `self` and `authorization-servers` links are gone. On a list, V2 returns `_links` as plain URL strings and adds a `Link` response header for pagination.

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

The V2 response is `201 Created` with the server. The response has no `_links` and includes `_embedded.counts`:

```json
{
  "id": "emsMa1nU2aL3p0g4zrZb",
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:emsMa1nU2aL3p0g4zrZb",
  "resourceUrl": "https://mcp.example.com",
  "status": "ACTIVE",
  "authorizationServerCount": 0,
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

V2 removes `_links` from individual objects. The discovery operation is asynchronous.

<!-- TODO: Add V1 and V2 examples. -->

## Virtual MCP Servers

V2 makes write operations synchronous and might remove `_links` from individual objects.

<!-- TODO: Add V1 and V2 examples. -->

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
| `additionalRequestParameters` | Not available. | New. `oauthClientConfiguration.additionalRequestParameters` holds custom key-value parameters for the authorize and token requests. Only for API server and MCP server resources. |
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
| `additionalRequestParameters` | Not available. | Updatable. Set it to `null` to remove all parameters. |
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

<!-- TODO: Confirm the V2 DCR create response with engineering. The Confluence page (1176240645) says "no Location Header", but the okta-oas3 V2 spec (client-auth-settings.yaml) documents a required Location header that points to /resource-servers/api/v2/operations/{id}. The guide follows the spec. -->

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

<!-- Source: Delegation Links, Client Auth Settings & Agent Credentials V1 vs V2 API (Confluence eng page 1176240645, version 6). -->

## AI Agent Providers

V2 makes these changes:

- Removes `_links` from individual objects.
- Supports `clientAuthSettingsId` as a parameter. V2 no longer accepts OAuth credentials directly for certain app and agent import providers.
- Makes list filtering and sorting part of the base API. Use the `search`, `sourceInstanceName`, `orderBy`, and `sortOrder` parameters.
- Removes `externalId` from the `search` filter and adds `id`.

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

This V2 response has the same attributes and no `_links`:

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
  ]
}
```

<!-- TODO: Add V1 and V2 examples, including the supported `search` fields and operators, and confirm the Link header behavior with engineering. -->

## AI Agent Schema

The endpoints and response codes are the same. V2 removes `_links` from the schema response. The property definitions are the same.

## Resource Connections

<!-- TODO: Add changes when engineering confirms them. -->

V2 consolidates the AI Agent Connections, Virtual MCP Connections, and Potential Connections APIs into the Resource Connections API.

## Migration checklist

1. Change the path prefix in your calls from `/api/v1` to `/api/v2`.
2. Stop polling operations for write calls that are synchronous in V2.
3. Remove references to `appId`, `externalId`, and `platform` on AI agents.
4. Update code that reads `_links`.
5. Update code that branches on operation `type` values.
6. Stop sending `to.authorizationServerOrn` and stop creating `ID_TOKEN` links in Delegation Links calls.
7. Rename `purpose` to `purposes` and move the OAuth fields under `oauthClientConfiguration` in client authentication settings calls.
8. Read the client secrets list from `data` and pass `links=ALL` on credential `GET` operations if you use the action links.
9. Move `displayName`, `description`, `scopesSupported`, and `app` under `metadata` in MCP server and API server create and update requests. Read `detectedMetadata` values from `metadata`.
10. Create external authorization servers with the External Authorization Servers API, then link them to resource servers by `orn`. Move `subjectMappingExpression` and endpoint changes to that API.
11. For MCP servers, replace `protocolConfigured` and `tenantId` with `protocolConfigurations`.
12. Poll a resource server operation only after you register a `DISCOVERABLE` MCP server or change an MCP server `resourceUrl`.
13. Test your integration against V2 before the V1 cutoff date.

## See also

<!-- TODO: Add links to the V2 API reference and the V1 deprecation announcement. -->
