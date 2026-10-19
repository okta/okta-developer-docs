---
title: Migrate Okta for AI Agents APIs from V1 to V2
excerpt: Learn how to move your calls from the V1 Okta for AI Agents APIs to the V2 APIs before V1 reaches end of life.
layout: Guides
---

Learn how the Okta for AI Agents V2 APIs differ from the V1 APIs, and what to change in your API calls.

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

- **Links:** V2 responses don't include `_links` on individual objects. `_links` are returned only on lists, for pagination.
- **Synchronous writes:** Write operations that were asynchronous in V1 are synchronous in V2. Calls that returned `202 Accepted` now return `200`, `201`, or `204`. You no longer poll an operation to get the result.

## V1 to V2 summary by API

Use this table to find the API that you call. Select the link in the last column for the details of the change.

<!-- TODO: Confirm each row with engineering. Rows marked "Not yet available" are still in design or development. -->

| V1 API | V2 availability | Summary of changes | Details |
| --- | --- | --- | --- |
| Delegation Links | Available | `_links` removed from individual objects. | [Delegation Links](#delegation-links) |
| STS Authorization | Not applicable | No V2 version. Keep using the V1 STS callback endpoint. | [STS Authorization](#sts-authorization) |
| Workload Principal Operations | Available | `_links` removed from individual objects. Operation types for registration writes removed. | [Workload Principal Operations](#workload-principal-operations) |
| Resource Server Operations | Not yet available | <!-- TODO: Confirm changes. --> | [Resource Server Operations](#resource-server-operations) |
| AI Agent Credentials | Not yet available | `_links` removed from individual objects. | [AI Agent Credentials](#ai-agent-credentials) |
| AI Agent Registration | Available | Writes are synchronous. `appId`, `externalId`, and `platform` removed. Link format changed. | [AI Agent Registration](#ai-agent-registration) |
| Virtual MCP Server Registrations | Available | Writes are synchronous. `_links` removed from individual objects. | [Virtual MCP Server Registrations](#virtual-mcp-server-registrations) |
| Agent-to-Agent Server Registrations | Not yet available | Writes become synchronous. `_links` possibly removed from individual objects. | [Agent-to-Agent Server Registrations](#agent-to-agent-server-registrations) |
| API Server Registration | Not yet available | Writes become synchronous. `_links` possibly removed from individual objects. | [API Server Registration](#api-server-registration) |
| MCP Server Registrations | Not yet available | Writes become synchronous, or conditionally asynchronous. `_links` possibly removed from individual objects. | [MCP Server Registrations](#mcp-server-registrations) |
| MCP Server Capabilities | Available | `_links` removed from individual objects. Discovery is asynchronous. | [MCP Server Capabilities](#mcp-server-capabilities) |
| Virtual MCP Servers (Resource Server) | Available | Writes are synchronous. `_links` possibly removed from individual objects. | [Virtual MCP Servers](#virtual-mcp-servers) |
| Client Authentication Settings | Not yet available | `_links` removed. New configuration object, `grantTypes` support, and `credentialType` enum. | [Client Authentication Settings](#client-authentication-settings) |
| AI Agent Providers | Available | `_links` removed. `clientAuthSettingsId` replaces direct OAuth credentials. Filtering and sorting added. | [AI Agent Providers](#ai-agent-providers) |
| AI Agent Schema | Available | `_links` removed from the response. | [AI Agent Schema](#ai-agent-schema) |
| AI Agent Connections and Virtual MCP Connections | Not yet available | Consolidated into Resource Connections. | [Resource Connections](#resource-connections) |
| Potential Connections | Not yet available | Consolidated into Resource Connections. | [Resource Connections](#resource-connections) |

## Delegation Links

<!-- TODO: Add V1 and V2 examples. -->

V2 removes `_links` from each object that the API returns. Lists still return `_links` for pagination.

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

<!-- TODO: Add V1 and V2 request and response examples. -->

## Resource Server Operations

<!-- TODO: Add changes when engineering confirms them. -->

## AI Agent Credentials

<!-- TODO: Add changes when this API is available in V2. -->

V2 removes `_links` from individual objects.

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

<!-- TODO: Add V1 and V2 request and response examples. -->

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

<!-- TODO: Update when the V2 design is final. -->

V2 is planned to make these changes:

- Remove `_links` from individual objects.
- Add a configuration object that accepts additional fields.
- Add explicit support for `grantTypes`.
- Add a `credentialType` enum when more credential types are supported, such as private key, certificate, or none.

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
6. Test your integration against V2 before the V1 cutoff date.

## See also

<!-- TODO: Add links to the V2 API reference and the V1 deprecation announcement. -->
