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
| Resource Server Operations | Not yet available | <!-- TODO: Confirm changes. --> | [Resource Server Operations](#resource-server-operations) |
| AI Agent Credentials | Available | Link format changed. `_links` returned on `GET` only when you pass the new `links` query parameter. The client secrets list returns `data`. | [AI Agent Credentials](#ai-agent-credentials) |
| AI Agent Registration | Available | Writes are synchronous. `appId`, `externalId`, and `platform` removed. Link format changed. | [AI Agent Registration](#ai-agent-registration) |
| Virtual MCP Server Registrations | Available | Writes are synchronous. `_links` removed from individual objects. | [Virtual MCP Server Registrations](#virtual-mcp-server-registrations) |
| Agent-to-Agent Server Registrations | Not yet available | Writes become synchronous. `_links` possibly removed from individual objects. | [Agent-to-Agent Server Registrations](#agent-to-agent-server-registrations) |
| API Server Registration | Not yet available | Writes become synchronous. `_links` possibly removed from individual objects. | [API Server Registration](#api-server-registration) |
| MCP Server Registrations | Not yet available | Writes become synchronous, or conditionally asynchronous. `_links` possibly removed from individual objects. | [MCP Server Registrations](#mcp-server-registrations) |
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

<!-- TODO: Add changes when engineering confirms them. -->

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

<!-- TODO: Update when the V2 design is final. -->

V2 is planned to make write operations synchronous and might remove `_links` from individual objects.

## API Server Registration

<!-- TODO: Update when the V2 design is final. -->

V2 is planned to make write operations synchronous and might remove `_links` from individual objects.

## MCP Server Registrations

<!-- TODO: Update when the V2 design is final. -->

V2 is planned to make write operations synchronous, except where an operation must stay asynchronous. For example, registering an MCP server that uses dynamic client registration might remain asynchronous. V2 might also remove `_links` from individual objects.

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

V2 provides the provider attributes for a provider name with `GET /api/v2/ai-agents/provider-attributes/{providerName}`.

<!-- TODO: Confirm with the Registry team what the V1 path for provider attributes was and whether it moved. The Confluence page gives only the V2 path. Then add a V1 to V2 comparison. -->

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
9. Test your integration against V2 before the V1 cutoff date.

## See also

<!-- TODO: Add links to the V2 API reference and the V1 deprecation announcement. -->
