---
title: Migrate Okta for AI Agents APIs from V1 to V2
excerpt: Learn how to move your calls from the V1 Okta for AI Agents APIs to the V2 APIs before V1 reaches end of life.
layout: Guides
---

Learn how the Okta for AI Agents V2 APIs differ from the V1 APIs, and what to change in your API calls.

<!-- TODO: Re-check the spec-derived V2 examples against the final specs before release. Most V2 examples come from the okta-oas3 specs on master (specs/monolith/secures-ai/spec/v2). Verified against live calls in the test org on 2026-11-17 and 2026-11-24: AI agent registration, Agent Gateway registration, client authentication settings (the DCR success path is not verified), token request settings, connections to the Okta MCP Server and a custom authorization server, potential connections, the MCP server OAuth client and JWKs routes, and the API server tenantId link and PATCH. TODO: Recheck every V2 API reference link before the PR (owner: Susan). On 2026-11-24 all 17 links with the v2 suffix returned 404. The same tag names without the suffix returned 200 for 10 tags, but curl can't show whether those pages are V1 or V2. Seven tags returned 404 either way: agentgatewayserverresource, externalauthorizationserver, resourceserveroperations, resourceservertokenrequestsettings, agentgatewayregistration, mcpservercredentials, and resourceconnections. The guide has no See also section (Susan, 2026-11-24). -->

---

#### Learning outcomes

- Understand which Okta for AI Agents APIs have a V2 version.
- Identify the changes that affect your API calls.
- Update your request and response handling for V2.

#### What you need

- An Okta org that has Okta for AI Agents enabled
- Existing integrations, scripts, or agents that call the V1 Okta for AI Agents APIs

---

## Overview

Okta for AI Agents has V2 versions of its APIs. The V2 endpoints use the `/api/v2` path prefix instead of `/api/v1`.

> **Note:** Okta is deprecating the V1 APIs and plans to end support for them on April 30, 2027.

Until then, both versions work side by side. The V1 reference pages remain available, and Okta marks them as deprecated.

### Who needs to migrate

You need to migrate if you call the Okta for AI Agents APIs directly. For example, you call them from Postman, scripts, your own apps, or AI agents.

If you only use the Admin Console, you don't need to do anything. The Admin Console calls the V2 APIs for you.

### Why migrate

V2 offers these benefits:

- **Fewer round trips:** Most write operations return the result instead of `202 Accepted`. You no longer poll an operation after you create, update, delete, activate, or deactivate an object. Your client tracks less state, and the Operations APIs have fewer operation types.
- **Simpler responses:** V2 drops `_links` from individual objects, and lists return plain URL strings. Use the `links` query parameter to request only the links that you need. Page through lists with the `Link` response header.
- **One model for connections:** One Resource Connections collection replaces the separate connection APIs for agents, Model Context Protocol (MCP) servers, and Agent Gateways. Reverse lookups and potential connections use `search`.
- **Cleaner requests:** V2 removes deprecated properties, such as `appId`. Use the Delegation Links API instead. V2 groups related request properties together, and you link authorization servers by `orn`. Filtering and sorting providers are part of the base API.
- **Asynchronous only where needed:** Long-running work, such as provider import and staging or MCP server discovery, stays asynchronous. Everything else returns immediately.

### Changes that affect most APIs

Many V2 APIs share the same changes:

- **Links:** V2 responses don't include `_links` on individual objects. Lists include `_links` only for pagination. Where V2 returns `_links`, the values are plain URL strings instead of objects with an `href`. Some APIs add a `links` query parameter that selects which links the response includes.
- **Agent Gateways:** V2 renames virtual MCP servers to Agent Gateways. The paths change from `/virtual-mcp-servers` to `/agent-gateways`. See [Virtual MCP Server Registrations](#virtual-mcp-server-registrations-agent-gateways) and [Virtual MCP Servers](#virtual-mcp-servers-agent-gateways).
- **Synchronous writes:** Write operations that were asynchronous in V1 are synchronous in V2. Calls that returned `202 Accepted` now return `200`, `201`, or `204`. You no longer poll an operation to get the result.

## V1 to V2 summary by API

Use this table to find the API that you call. Select the link in the last column for the details of the change. The table groups the APIs by the task that you do, and the sections that follow use the same order.

| V1 API | V2 availability | Summary of changes | Details |
| --- | --- | --- | --- |
| **Agents and Agent Gateways** | | | |
| AI Agent Registration | Available | Writes are synchronous. `appId`, `externalId`, and `platform` removed. Link format changed, and a `links` parameter selects the links returned. | [AI Agent Registration](#ai-agent-registration) |
| Virtual MCP Server Registrations (Agent Gateways) | Available | Renamed to Agent Gateways, with a new path. Writes are synchronous. `_links` removed from individual objects. | [Virtual MCP Server Registrations](#virtual-mcp-server-registrations-agent-gateways) |
| Virtual MCP Servers (Resource Server) (Agent Gateways) | Available | Renamed to Agent Gateways, with a new path. `_links` removed from individual objects. Read-only: authorization server add and remove calls removed. | [Virtual MCP Servers](#virtual-mcp-servers-agent-gateways) |
| AI Agent Credentials | Available | Link format changed. `_links` returned on `GET` only when you pass the new `links` query parameter. The client secrets list returns `data`. | [AI Agent Credentials](#ai-agent-credentials) |
| Delegation Links | Available | `_links` removed from individual objects. `to.authorizationServerOrn` removed from create requests. New `ID_TOKEN` links can't be created. | [Delegation Links](#delegation-links) |
| AI Agent Providers | Available | `_links` removed. `configuration` references a client authentication settings object instead of holding OAuth credentials. Filtering and sorting are part of the base API. | [AI Agent Providers](#ai-agent-providers) |
| AI Agent Schema | Available | `_links` removed from the response. | [AI Agent Schema](#ai-agent-schema) |
| **MCP, API, and Agent-to-agent (A2A) servers** | | | |
| MCP Server Registrations | Available | Writes are synchronous, except discovery-based registration and `resourceUrl` changes. `_links` and `detectedMetadata` removed. Request properties moved under `metadata`. Authorization servers are linked by `orn`. | [MCP Server Registrations](#mcp-server-registrations) |
| MCP Server OAuth Client and Credentials | Available | The path version changes. `_links` removed from JWK responses and from the JWK list. `status` is no longer accepted when you add a key. | [MCP Server OAuth Client and Credentials](#mcp-server-oauth-client-and-credentials) |
| MCP Server Capabilities | Available | Discovery request properties moved under `credential`. `CLIENT_AUTH_SETTINGS` renamed `BROKERED_CONSENT`. `_links` removed from individual objects. Discovery is asynchronous. | [MCP Server Capabilities](#mcp-server-capabilities) |
| API Server Registration | Available | Writes are synchronous. `_links` removed. Request properties moved under `metadata`. Authorization servers are linked by `orn`. | [API Server Registration](#api-server-registration) |
| Agent-to-Agent Server Registrations | Available | `_links` removed. Authorization servers are linked by `orn`. Authorization server writes are synchronous. | [Agent-to-Agent Server Registrations](#agent-to-agent-server-registrations) |
| Client Authentication Settings | Available | `_links` removed. OAuth fields moved under `oauthClientConfiguration`. `purpose` renamed `purposes`. New `client_credentials` grant type. | [Client Authentication Settings](#client-authentication-settings) |
| Token Request Settings | Available | Same operations and bodies. Only the version in the path changes. | [Token Request Settings](#token-request-settings) |
| **Connections** | | | |
| AI Agent Connections, MCP Server Connections, and Virtual MCP Connections | Available | Consolidated into one Resource Connections collection. The actor moves into the body. `connectionType` splits into `protocolType` and `resourceType`. | [Resource Connections](#resource-connections) |
| Managed Connections and Potential Connections | Available | Consolidated into Resource Connections. Reverse lookup uses `search`. Potential connections move to `/resource-connections/api/v2`. | [Resource Connections](#resource-connections) |
| **Operations and other APIs** | | | |
| Workload Principal Operations | Available | `_links` removed from individual objects. Operation types for registration writes removed. | [Workload Principal Operations](#workload-principal-operations) |
| Resource Server Operations | Available | `_links` removed from the `resource`, and `orn` added. Fewer operation types. | [Resource Server Operations](#resource-server-operations) |
| STS Authorization | Not applicable | No V2 version. Keep using the V1 Security Token Service (STS) callback endpoint. | [STS Authorization](#sts-authorization) |

## AI Agent Registration

For the V2 calls, see the [AI Agent Registration API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentregistrationv2).

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

The V2 spec documents a `Link` response header on the list operation. It has `self` and `next` links, and `next` is present only when there is another page. Use the header or `_links.next` to page through the list.

### What to change

Make these changes:

- Stop polling an operation after you register, replace, update, delete, activate, or deactivate an agent. Read the response instead.
- Remove `appId`, `externalId`, and `platform` from your requests. Use the Delegation Links API instead of `appId`.
- Stop reading `_links.self`. Read `providers` as an array of URL strings.
- Pass the `links` query parameter to choose which links a list or retrieve response includes.
- Page through agent lists with the `Link` response header or `_links.next`.

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

After the operation completes, `GET /workload-principals/api/v1/ai-agents/wlpx8kR27j0U7HGDM1h4` returns the agent. The V1 agent includes `externalId`, `appId`, `platform`, and `_links` objects with an `href`. A new agent has a `status` of `STAGED` until you activate it:

```json
{
  "id": "wlpx8kR27j0U7HGDM1h4",
  "externalId": "7TTZGRL8PV",
  "created": "2022-04-04T15:56:05.000Z",
  "lastUpdated": "2022-05-05T18:15:44.000Z",
  "status": "STAGED",
  "source": "MANUAL",
  "appId": "0oab1234EXAMPLEID5d6",
  "platform": "OKTA",
  "profile": {
    "name": "Orchestrator Agent",
    "description": "Orchestrator Agent"
  },
  "oauthClient": {
    "clientId": "wlpx8kR27j0U7HGDM1h4"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/wlpx8kR27j0U7HGDM1h4"
    },
    "delegationLinks": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/delegation-links?filter=to.resourceOrn%20eq%20%22orn:okta:directory:00o1gjjp4jsdR3Sww4x7:workload-principals:ai-agents:wlpx8kR27j0U7HGDM1h4%22"
    },
    "providers": [
      {
        "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d"
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

The V2 response is `201 Created` with the agent. The agent has no `externalId`, `appId`, or `platform`. The `_links` values are plain URL strings, and there's no `self` link. The new agent has a `status` of `STAGED`. Call the activate operation to make it `ACTIVE`:

```json
{
  "id": "wlpx8kR27j0U7HGDM1h4",
  "created": "2022-04-04T15:56:05.000Z",
  "lastUpdated": "2022-05-05T18:15:44.000Z",
  "status": "STAGED",
  "source": "MANUAL",
  "profile": {
    "name": "Orchestrator Agent",
    "description": "Orchestrator Agent"
  },
  "oauthClient": {
    "clientId": "wlpx8kR27j0U7HGDM1h4"
  },
  "_links": {
    "delegationLinks": "https://{yourOktaDomain}/workload-principals/api/v2/delegation-links?filter=to.resourceOrn%20eq%20%22orn:okta:directory:00o1gjjp4jsdR3Sww4x7:workload-principals:ai-agents:wlpx8kR27j0U7HGDM1h4%22",
    "providers": [
      "https://{yourOktaDomain}/workload-principals/api/v2/ai-agent-providers/aip-1a2b3c4d"
    ]
  }
}
```

<!-- TODO: The V1 agent in the test org had no externalId, appId, or platform, but the V1 example shows them because the request sends appId. Check whether they appear only for agents that have an appId or only for imported agents (owner: Mymoona, or retest with an imported agent). The providers link in both examples is spec-derived, because no test agent has a provider. -->

V1 and V2 return the same agents. You can read a V2-created agent through the V1 path, and the reverse.

When you update an agent with `PATCH`, you can no longer set or remove `appId`. The V2 request to remove the description is:

```json
{
  "profile": {
    "description": null
  }
}
```

---

## Virtual MCP Server Registrations (Agent Gateways)

For the V2 calls, see the [Agent Gateway Registration API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentgatewayregistrationv2).

V2 renames virtual MCP servers to Agent Gateways. The operations are the same, but the path and the path parameter change.

| Aspect | V1 | V2 |
| --- | --- | --- |
| Path | `/workload-principals/api/v1/virtual-mcp-servers` | `/workload-principals/api/v2/agent-gateways` |
| Path parameter | `virtualMcpServerId` | `agentGatewayId` |
| Scopes | `okta.resourceServers.virtualMcpServers.read` and `.manage` | Same |
| Request bodies | `resourcePath` and `profile` | Same |
| Object properties | `id`, `orn`, `status`, `profile`, `created`, and `lastUpdated` | Same |
| `_links` on an object | `self` | Removed |
| `_links` on a list | `self` and `next` are objects with an `href` | `self` and `next` are plain URL strings, with a `Link` response header for pagination |

### Synchronous writes

In V2, the result is in the response.

| Operation | V1 response | V2 response |
| --- | --- | --- |
| Create (`POST`) | `202`, no body | `201` with the Agent Gateway |
| Update (`PATCH`) | `200` with the object | `200` with the Agent Gateway |
| Delete (`DELETE`) | `202`, no body | `204` |
| Activate | `202`, no body | `200` with the Agent Gateway |
| Deactivate | `202`, no body | `200` with the Agent Gateway |

V2 creates the Agent Gateway with a `status` of `INACTIVE`, the same as V1.

In both versions, you can delete only an inactive Agent Gateway. Deleting an active one returns `409`, so deactivate it first.

V1 and V2 share the same `resourcePath` values. If a virtual MCP server in V1 already uses a path, a V2 create with the same path returns `409`. The path is case-insensitive.

### What to change

- Replace `/workload-principals/api/v1/virtual-mcp-servers` with `/workload-principals/api/v2/agent-gateways` in your calls.
- Stop polling an operation after create, delete, activate, and deactivate. Read the response instead.
- Stop reading the `self` link from an object. Build the URL from the `id`.

### Examples

This example creates an Agent Gateway. The request is the same in V1 and V2. Send it to `POST /workload-principals/api/v1/virtual-mcp-servers` or `POST /workload-principals/api/v2/agent-gateways`:

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
    }
  }
}
```

The V2 response is `201 Created` with the Agent Gateway in the body. There are no `_links`:

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
  "lastUpdated": "2025-06-10T08:00:00Z"
}
```

A V2 call to `POST /workload-principals/api/v2/agent-gateways/wlp7lM8nO9pQ0rS1tU2v/lifecycle/activate` returns `200` with the same object and a `status` of `ACTIVE`. The V1 call returns `202` with no body.

On a list, the V2 `_links` are plain URL strings:

```json
{
  "data": [
    {
      "id": "wlp1aB2cD3eF4gH5iJ6k",
      "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:workload-principals:virtual-mcp:wlp1aB2cD3eF4gH5iJ6k",
      "status": "ACTIVE",
      "profile": {
        "displayName": "Production MCP Servers",
        "description": "Groups all production MCP servers for the engineering team"
      },
      "created": "2025-06-01T10:00:00Z",
      "lastUpdated": "2025-06-15T14:30:00Z"
    }
  ],
  "_links": {
    "self": "https://{yourOktaDomain}/workload-principals/api/v2/agent-gateways?limit=20",
    "next": "https://{yourOktaDomain}/workload-principals/api/v2/agent-gateways?after=wlp1aB2cD3eF4gH5iJ6k&limit=20"
  }
}
```

---

## Virtual MCP Servers (Agent Gateways)

For the V2 calls, see the [Agent Gateway Server API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/agentgatewayserverresource).

V2 renames virtual MCP servers to Agent Gateways. The resource server API changes the path, removes `_links`, and drops the authorization server write calls.

| Aspect | V1 | V2 |
| --- | --- | --- |
| Path | `/resource-servers/api/v1/virtual-mcp-servers` | `/resource-servers/api/v2/agent-gateways` |
| Path parameters | `virtualMcpServerId` and `capabilityId` | `agentGatewayId` and `toolId` |
| `_links` on an object | `self`, `authorization-servers`, and `tools` | Removed |
| `_links` on a list | Objects with an `href` | Plain URL strings |
| `_links.parent` on a tools list | Object with an `href` | Removed |
| Authorization server links | List, retrieve, add, and remove | List and retrieve only |

Agent Gateway calls don't take the `links` query parameter that some other V2 APIs add. Lists always return `_links`.

### Authorization servers

V1 lets you add and remove an Okta custom authorization server on a virtual MCP server. Both calls return `202` with a `Location` header to poll.

Okta now creates a custom authorization server for each Agent Gateway automatically. V2 removes the add and remove calls, and Okta doesn't currently expose them.

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

The V2 response from `GET /resource-servers/api/v2/agent-gateways/wlp1aB2cD3eF4gH5iJ6k` has no `_links`:

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
  "lastUpdated": "2025-06-15T14:30:00Z"
}
```

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

<!-- Okta auto-generates the custom authorization server for each Agent Gateway, so V2 has no add or remove calls (engineering, 2026-11-12). The optional authorizationServer property on create (EXTERNAL_AUTHORITY, SECURE_AI_EXTERNAL_IDP_GATEWAY) applies to V1 and V2, but the guide doesn't document it because it's under development. TODO: Revisit when SECURE_AI_EXTERNAL_IDP_GATEWAY goes GA (owner: Ted Zhou). -->

---

## AI Agent Credentials

For the V2 calls, see the [Agent Credentials API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentpublickeyv2).

The endpoints, operations, request bodies, scopes, and response codes are the same in V1 and V2. This applies to JSON Web Keys (JWKs), client secrets, public key mode, and the JSON Web Key Set (JWKS) URI. The `_links` format, the list response shape, and a new `links` query parameter differ.

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

---

## Delegation Links

<!-- TODO: Add the V2 API reference link for Delegation Links. Susan's list of V2 reference URLs on 2026-11-19 left it blank (owner: Susan). The spec tag is DelegationLinksV2, so the page is probably under secures-ai-workload-principals/tags/delegationlinksv2, but that is a guess. -->

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

---

## AI Agent Providers

For the V2 calls, see the [AI Agent Providers API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentprovidersv2).

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

### Filters and sort order

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

- Create a client authentication settings object for each provider that uses a client ID and client secret. Send its ID in `configuration` as `clientAuthId`, not the credentials.
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

The V2 response from `GET /workload-principals/api/v2/ai-agent-providers/aip-1a2b3c4d` has the same properties and no `_links`:

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
  }
}
```

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
      }
    }
  ],
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
    "clientAuthId": "rsc9sfdXk2Lm4PqRs0g4"
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

Both versions return `201 Created` with the provider. The V1 response has `_links.self`, and the V2 response doesn't. The V2 response returns the property as `configuration.clientAuthId`, with `platforms` set to `SALESFORCE_AGENTFORCE`. Requests that send `client_auth_id` still work.

---

## AI Agent Schema

For the V2 call, see the [AI Agent Schema API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentschemav2).

The endpoints and response codes are the same. V2 removes `_links` from the schema response. The property definitions are the same.

---

## Authorization servers for resource servers

For the V2 calls that create external authorization servers, see the [External Authorization Servers API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/externalauthorizationserver).

MCP server, API server, and A2A server registrations share the same changes to how you add authorization servers. This section describes those changes once.

In V1, you add an authorization server inline. The request includes a `type` and, for a manual server, the issuer and endpoints.

In V2, you link an existing authorization server by its `orn`. External authorization servers are a separate resource. Create them first with the External Authorization Servers API, and then link them. For an Okta custom authorization server, you only link it by `orn`.

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

---

## MCP Server Registrations

For the V2 calls, see the [MCP Server Registration API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/mcpserverregistrationv2).

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
| `orgConfigPropertyValues` | Request only | Also returned for servers registered from the Okta Integration Network (OIN) catalog |
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
- Create external authorization servers first, and then link them by `orn`.

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

The V2 response is `201 Created` with a link object. The link object embeds the `authorizationServer`, and the outer `created` and `lastUpdated` describe the link:

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

---

## MCP Server OAuth Client and Credentials

For the V2 calls, see the [MCP Server OAuth Client API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/mcpserverclientregistrationv2) and the [MCP Server Credentials API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/mcpservercredentialsv2).

An MCP server can act as an OAuth client to a downstream resource. These calls create the OAuth client identity of the MCP server. They also manage the JSON Web Keys (JWKs) that Okta uses to verify its `private_key_jwt` client assertions.

The operations and scopes are the same in V1 and V2. The path version changes, and V2 changes the JWK responses and the request to add a key.

### Operations

| Operation | Method and V2 path | Success response |
| --- | --- | --- |
| Create OAuth client | `POST /workload-principals/api/v2/mcp-servers/{mcpServerId}/oauth-client` | `201` with the OAuth client |
| Delete OAuth client | `DELETE /workload-principals/api/v2/mcp-servers/{mcpServerId}/oauth-client` | `204` |
| List JWKs | `GET /workload-principals/api/v2/mcp-servers/{mcpServerId}/credentials/jwks` | `200` |
| Add a JWK | `POST /workload-principals/api/v2/mcp-servers/{mcpServerId}/credentials/jwks` | `201` with the key |
| Retrieve a JWK | `GET /workload-principals/api/v2/mcp-servers/{mcpServerId}/credentials/jwks/{keyId}` | `200` |
| Delete a JWK | `DELETE /workload-principals/api/v2/mcp-servers/{mcpServerId}/credentials/jwks/{keyId}` | `204` |
| Activate a JWK | `POST /workload-principals/api/v2/mcp-servers/{mcpServerId}/credentials/jwks/{keyId}/lifecycle/activate` | `200` with the key |
| Deactivate a JWK | `POST /workload-principals/api/v2/mcp-servers/{mcpServerId}/credentials/jwks/{keyId}/lifecycle/deactivate` | `200` with the key |

Each V1 path is the same with `/api/v1` in place of `/api/v2`. Both versions use the `okta.resourceServers.mcpServers.read` scope to list and retrieve keys. They use the `okta.resourceServers.mcpServers.manage` scope for every other call.

### Property changes

| Item | V1 | V2 |
| --- | --- | --- |
| `status` in an add key request | Optional. `ACTIVE` or `INACTIVE`. The default is `ACTIVE`. | Not accepted. Okta always creates the key as `ACTIVE`. A request that sends `status` returns `400`. |
| `_links` on a JWK | `activate`, `deactivate`, and `delete` links, which are objects with an `href` and `hints` | Removed |
| `_links` on the list of JWKs | `self`, an object with an `href` | Removed. The response is `{ "data": [...] }`. |
| Create OAuth client response | `201`, no body | `201` with the OAuth client, including `clientId`, `orn`, `status`, `tokenEndpointAuthMethod`, `grantTypes`, and `connectionCount` |

### Error responses

The V2 reference documents these `409` and `400` responses.

| Call | V2 response |
| --- | --- |
| Create OAuth client | `409` if the MCP server already has an OAuth client |
| Delete OAuth client | `409` while the MCP server has resource connections. Okta deletes the keys along with the client. |
| Add a JWK | `400` if the MCP server already has 50 keys. `409` if a key with the same `kid` exists. |
| Delete a JWK | `409` if the key is active. Deactivate it first. |
| Deactivate a JWK | `409` if the key is the last active key and `private_key_jwt` is the client authentication method |

### What to change

Make these changes:

- Remove `status` from the request body when you add a key.
- Stop reading `_links` on keys and on the list. Build the activate, deactivate, and delete calls from the MCP server ID and the key `id`.
- Read the keys from `data` in the list response, and don't expect `_links`.
- Handle the `409` responses in your rotation and cleanup code.

Okta creates every new key as `ACTIVE`, so a replacement key is active as soon as you add it. Before you deactivate the superseded key, make sure that the replacement key is active.

### Examples

This example adds a key to an MCP server. The V1 request can include `status`:

```json
{
  "kty": "RSA",
  "alg": "RS256",
  "use": "sig",
  "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
  "e": "AQAB",
  "n": "mkC6yAJVvFwUlmM9gKjb2d......fMVjH-bUec9j2Tl40qDTktrYgYfxz9pfj",
  "status": "ACTIVE"
}
```

The V2 request is the same without `status`:

```json
{
  "kty": "RSA",
  "alg": "RS256",
  "use": "sig",
  "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
  "e": "AQAB",
  "n": "mkC6yAJVvFwUlmM9gKjb2d......fMVjH-bUec9j2Tl40qDTktrYgYfxz9pfj"
}
```

The V1 response includes `_links` for the actions that the current status allows:

```json
{
  "id": "pks2f4zrZbs8nUa7p0g4",
  "kty": "RSA",
  "alg": "RS256",
  "use": "sig",
  "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
  "e": "AQAB",
  "n": "mkC6yAJVvFwUlmM9gKjb2d......fMVjH-bUec9j2Tl40qDTktrYgYfxz9pfj",
  "status": "ACTIVE",
  "created": "2023-02-21T20:08:24.000Z",
  "lastUpdated": "2023-02-21T20:08:24.000Z",
  "_links": {
    "deactivate": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/mcp-servers/{mcpServerId}/credentials/jwks/pks2f4zrZbs8nUa7p0g4/lifecycle/deactivate",
      "hints": { "allow": ["POST"] }
    }
  }
}
```

The V2 response has the same properties and no `_links`:

```json
{
  "id": "pks2f4zrZbs8nUa7p0g4",
  "kty": "RSA",
  "alg": "RS256",
  "use": "sig",
  "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
  "e": "AQAB",
  "n": "mkC6yAJVvFwUlmM9gKjb2d......fMVjH-bUec9j2Tl40qDTktrYgYfxz9pfj",
  "status": "ACTIVE",
  "created": "2023-02-21T20:08:24.000Z",
  "lastUpdated": "2023-02-21T20:08:24.000Z"
}
```

The V2 response from `GET /workload-principals/api/v2/mcp-servers/{mcpServerId}/credentials/jwks` wraps the keys in `data`. The V1 response also has a top-level `_links` object with a `self` link.

```json
{
  "data": [
    {
      "id": "pks2f4zrZbs8nUa7p0g4",
      "kty": "RSA",
      "alg": "RS256",
      "use": "sig",
      "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
      "e": "AQAB",
      "n": "mkC6yAJVvFwUlmM9gKjb2d......fMVjH-bUec9j2Tl40qDTktrYgYfxz9pfj",
      "status": "ACTIVE",
      "created": "2023-02-21T20:08:24.000Z",
      "lastUpdated": "2023-02-21T20:08:24.000Z"
    }
  ]
}
```

The create call for the OAuth client takes no request body in either version. The V1 call returns `201` with no body. The V2 call returns `201` with the OAuth client:

```json
{
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
```

In V1, read the same identity from the `oauthClient` property of the MCP server. The delete call doesn't change, apart from the path.

<!-- TODO: Confirm the V2 MCP server OAuth client and JWKs routes ship by the Dec 4 code freeze, because the summary row says Available (owner: Susan). TODO: SECURE_AI_MCP_AS_CLIENT needs a customer-facing name (owner: Kenton or Lalitha). The V2 spec still says DELETE oauth-client returns 409 while keys remain, but Okta now deletes the keys with the client. Dylan Cooper offered to fix the V1 and V2 specs, and the guide already follows the behavior. The ai-mcp-server-token-exchange guide can switch to the V2 paths after release. -->

---

## MCP Server Capabilities

For the V2 calls, see the [MCP Server Registration API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/mcpserverregistrationv2).

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

The V2 response from `GET /resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/metadata/discovery/emd1a2b3c4d5e6f7g8h9` has no `_links`:

```json
{
  "id": "emd1a2b3c4d5e6f7g8h9",
  "mcpServerId": "ems8nUa7p0g4zrZbs2f4",
  "credential": {
    "authType": "BROKERED_CONSENT",
    "clientAuthSettingsId": "rsc2c8xwvBn4h2Ry50g7"
  },
  "status": "READY",
  "lastDiscoveredAt": "2026-01-29T12:00:00Z",
  "toolsCount": 12
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

A discovery that fails has a `status` of `ERROR` and an `errorReason` that says why. The operation that started it ends with `FAILED`. Both versions behave this way.

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

The V2 response from `GET /resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools/emt1a2b3c4d5e6f7g8h9`:

```json
{
  "id": "emt1a2b3c4d5e6f7g8h9",
  "name": "create_pull_request",
  "description": "Creates a new pull request in a GitHub repository",
  "inputSchema": {
    "type": "object",
    "required": ["repo", "title"]
  },
  "credential": {
    "authType": "BROKERED_CONSENT",
    "clientAuthSettingsId": "rsc2c8xwvBn4h2Ry50g7"
  },
  "created": "2026-01-29T12:00:00Z",
  "lastUpdated": "2026-01-29T12:00:00Z"
}
```

On a V2 list, such as `GET /resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools?search=credential.authType%20eq%20%22BROKERED_CONSENT%22&limit=20`, the `_links` are plain URL strings. There is no `_embedded.metadata.total` or `parent` link:

```json
{
  "data": [
    {
      "id": "emt1a2b3c4d5e6f7g8h9",
      "name": "create_pull_request",
      "credential": {
        "authType": "BROKERED_CONSENT",
        "clientAuthSettingsId": "rsc2c8xwvBn4h2Ry50g7"
      },
      "created": "2026-01-29T12:00:00Z",
      "lastUpdated": "2026-01-29T12:00:00Z"
    }
  ],
  "_links": {
    "self": "https://{yourOktaDomain}/resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools?search=credential.authType%20eq%20%22BROKERED_CONSENT%22&limit=20",
    "next": "https://{yourOktaDomain}/resource-servers/api/v2/mcp-servers/ems8nUa7p0g4zrZbs2f4/tools?search=credential.authType%20eq%20%22BROKERED_CONSENT%22&after=emt1a2b3c4d5e6f7g8h9&limit=20"
  }
}
```

The `search` parameter is required on the tools list in both versions. In V2, it supports `eq` on `credential.authType` (`BROKERED_CONSENT` or `IDENTITY_ASSERTION`), `credential.clientAuthSettingsId`, and `credential.tokenRequestSettingsId`. In V1, the brokered consent value is `CLIENT_AUTH_SETTINGS`. The discoveries list supports the same `search` filter, but it's optional.

<!-- TODO: Confirm the customer-facing name of SECURE_AI_GATEWAY_XAA, and whether V2 keeps CLIENT_AUTH_SETTINGS for the V1 value only (owner: Kenton or Lalitha). TODO: Discovery through an Okta custom authorization server ends FAILED in the test org with "Resource not found: pcav7ittzufGrQkHGao5 (User)". Kevin Tang said that ID is the public client app and asked for a rebuild, which failed the same way. Hypothesis sent to Kevin: all test calls use a service app token, not a signed-in admin (owner: Kevin Tang, OKTA-1311476). The guide's tokenRequestSettingsOrn instructions stand. TODO: Test discovery through an external authorization server with a jwt-bearer settings object once the test org has one with a working token endpoint (owner: Susan). -->

---

## API Server Registration

For the V2 calls, see the [API Server Registration API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/apiserverregistrationv2).

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

The changes in [Authorization servers for resource servers](#authorization-servers-for-resource-servers) apply. These changes are specific to API servers that you register for an app instance:

| Aspect | V1 | V2 |
| --- | --- | --- |
| Tenant ID | Top-level `tenantId` on the add request, the update request, and the response. It's read-only in the response. | `protocolConfigurations.identityAssertion.tenantId` on the link. You can set it when you add the link, and change it later. |
| Update request | Changes the authorization server, including `tenantId` | `PATCH` on the link changes only `protocolConfigurations`. The authorization server isn't changed. |
| API server without an app instance | | Sending `protocolConfigurations` returns `400`. |

Okta emits the tenant ID as the `aud_tenant` claim in the Identity Assertion JWT Authorization Grant (ID-JAG) token. To change it on an existing link, send a `PATCH` request to `/resource-servers/api/v2/api-servers/{apiServerId}/authorization-servers/{authorizationServerId}` with the `application/merge-patch+json` content type. Omitted properties stay the same. Set `tenantId` to `null` to clear it. A request that changes nothing returns `200` with the unchanged link.

### What to change

- Move `displayName`, `description`, `scopesSupported`, and `app` under `metadata` in create and update requests.
- Stop parsing `_links`.
- Create external authorization servers first, and then link them by `orn`.
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

For an API server that you registered for an app instance, you can add the tenant ID when you link the authorization server:

```json
{
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:external-authorization-servers:easOin1a2b3c4d5e6f7g",
  "protocolConfigurations": {
    "identityAssertion": {
      "tenantId": "tenant-123"
    }
  }
}
```

To change the tenant ID later, send a merge patch to `PATCH /resource-servers/api/v2/api-servers/{apiServerId}/authorization-servers/{authorizationServerId}`:

```json
{
  "protocolConfigurations": {
    "identityAssertion": {
      "tenantId": "tenant-456"
    }
  }
}
```

The response is `200` with the link. Only the `lastUpdated` of the link changes. The `lastUpdated` of the authorization server stays the same:

```json
{
  "authorizationServer": {
    "id": "easOin1a2b3c4d5e6f7g",
    "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:external-authorization-servers:easOin1a2b3c4d5e6f7g",
    "issuer": "https://auth.example.com",
    "status": "ACTIVE",
    "type": "MANUAL",
    "metadata": {
      "authorizationEndpoint": "https://auth.example.com/oauth/authorize",
      "tokenEndpoint": "https://auth.example.com/oauth/token"
    },
    "created": "2025-02-03T10:00:00Z",
    "lastUpdated": "2025-02-03T10:00:00Z"
  },
  "protocolConfigurations": {
    "identityAssertion": {
      "tenantId": "tenant-456"
    }
  },
  "created": "2025-02-03T10:00:00Z",
  "lastUpdated": "2025-03-05T14:02:00Z"
}
```

To clear the tenant ID, send `"tenantId": null`. The response then has `"identityAssertion": {}`.

<!-- The V2 examples for adding a link with a tenantId and changing it match live calls from 2026-11-24. The other V2 examples in this section are spec-derived. TODO: SECURE_AI_APIS_V2 and SECURE_AI_XAA_PHASE_3, which gate the app instance examples, need customer-facing names (owner: Kenton or Lalitha). -->

---

## Agent-to-Agent Server Registrations

For the V2 calls, see the [A2A Server Registration API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/a2aserverregistrationv2).

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

---

## Client Authentication Settings

For the V2 calls, see the [Client Authentication Settings API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/resourceserverclientauthsettingsv2).

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

Okta rejects a grant type that the purpose doesn't allow.

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

Send the V2 request to `POST /resource-servers/api/v2/client-auth-settings`. The OAuth fields move under `oauthClientConfiguration`, and the request adds `grantTypes` and `credentialType`:

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
  "oauthConfiguration": {
    "scopes": ["api:read", "api:write"],
    "grantTypes": ["authorization_code"]
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

This example creates client authentication settings for STS with the Okta MCP Server. The settings name the org authorization server in `authorizationServerOrn`. The client is an OIDC web app in your org. Send the V1 request to `POST /resource-servers/api/v1/client-auth-settings`:

```json
{
  "purpose": ["STS"],
  "protocol": "OAUTH2",
  "resourceOrn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:emsOk7aM9cP2p0g4zrZb",
  "authorizationServerOrn": "orn:okta:org:00o1n8sbwArJ7OQRw406:authorization_servers:org",
  "name": "Okta MCP Server brokered consent",
  "clientCredentials": {
    "clientId": "0oa1gjh63g214q0Hq0g4",
    "clientSecret": "very-secret-string-that-is-never-stored-in-plain-text"
  },
  "oauthConfiguration": {
    "scopes": ["okta.users.read"]
  }
}
```

Send the V2 request to `POST /resource-servers/api/v2/client-auth-settings`:

```json
{
  "purposes": ["STS"],
  "protocol": "OAUTH2",
  "resourceOrn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:emsOk7aM9cP2p0g4zrZb",
  "authorizationServerOrn": "orn:okta:org:00o1n8sbwArJ7OQRw406:authorization_servers:org",
  "name": "Okta MCP Server brokered consent",
  "oauthClientConfiguration": {
    "clientCredentials": {
      "credentialType": "CLIENT_SECRET",
      "clientId": "0oa1gjh63g214q0Hq0g4",
      "clientSecret": "very-secret-string-that-will-not-be-returned-in-responses"
    },
    "grantTypes": ["authorization_code"],
    "scopes": ["okta.users.read"]
  }
}
```

Both versions return `201` with the settings, in the same shape as the previous responses. Use the Okta Resource Name (ORN) of the settings in your [STS connection to the Okta MCP Server](#connect-to-the-okta-mcp-server).


<!-- TODO: The success path of DCR is unverified: what the COMPLETED operation looks like, and whether its resource is the new settings. That needs an authorization server with a working registration endpoint (owner: Susan). TODO: Test the authorizationServerConfiguration and additionalRequestParameters properties, which need an API server resource or an eligible app (owner: Susan). -->

---

## Token Request Settings

Token request settings tell Okta where to get an access token when it discovers the tools of an MCP server. They name the Okta authorization server and the scopes to request. Use them when an Okta authorization server protects the MCP server and Okta has no client registration there. If Okta holds a client registration, use [Client Authentication Settings](#client-authentication-settings) instead.

The endpoints, operations, request bodies, response bodies, scopes, and response codes are the same in V1 and V2. Only the version in the path changes: `/resource-servers/api/v1/token-request-settings` becomes `/resource-servers/api/v2/token-request-settings`. For the details, see the [Token Request Settings API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/resourceservertokenrequestsettingsv2).

An MCP server can have several settings for the same authorization server, for example with different scope sets.

### Use with MCP server discovery

When an Okta authorization server protects the MCP server, you start discovery with `credential.tokenRequestSettingsOrn` instead of the old `authorizationServerOrn` and `scopes` properties. The settings supply both values. For details, see [MCP Server Capabilities](#mcp-server-capabilities).

The discovery response returns `credential.tokenRequestSettingsId`. To list the discoveries or tools that came from one settings object, search with `credential.tokenRequestSettingsId eq "{tokenRequestSettingsId}"`.

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

This example changes the requested scopes. Send a `PATCH` request to `/resource-servers/api/v2/token-request-settings/rst1a2b3c4d5e6f7g8h9` with the `application/merge-patch+json` content type. Send the full scope set, because the new array replaces the old one:

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

<!-- TODO: SECURE_AI_GATEWAY_XAA, which gates Token Request Settings in V1 and V2, needs a customer-facing name (owner: Kenton or Lalitha). Not tested: a create with a second settings object for the same authorization server. The guide covers both versions even though no customer has V1 token request settings (Lalitha Pidaparthi, 2026-11-16). -->

---

## Resource Connections

For the V2 calls, see the [Resource Connections API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/resourceconnectionsv2).

V2 consolidates the AI Agent Connections, MCP Server Connections, Virtual MCP Connections, Managed Connections, and Potential Connections APIs into the Resource Connections API.

This is the largest change in the migration. The path, the actor, the connection type, and the request and response bodies all change.

### One collection for all actors

In V1, each actor type has its own path. The reverse lookup by resource is a separate endpoint.

| Purpose | V1 | V2 |
| --- | --- | --- |
| AI agent connections | `/workload-principals/api/v1/ai-agents/{agentId}/connections` | `/resource-connections/api/v2/connections` |
| MCP server connections | `/workload-principals/api/v1/mcp-servers/{mcpServerId}/connections` | `/resource-connections/api/v2/connections` |
| Virtual MCP server (Agent Gateway) connections | `/workload-principals/api/v1/virtual-mcp-servers/{virtualMcpServerId}/connections` | `/resource-connections/api/v2/connections` |
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
| `IDENTITY_ASSERTION_MCP_SERVER` | `IDENTITY_ASSERTION` | `MCP_SERVER` | Required. A custom or external authorization server. For the Okta MCP Server, the org authorization server. | Read-only. Okta sets it to the MCP server URL. |
| `STS_SERVICE_ACCOUNT` | `STS` | `SERVICE_ACCOUNT` | Not applicable | Optional. Defaults to `resource.orn`. |
| `STS_VAULT_SECRET` | `STS` | `VAULT_SECRET` | Not applicable | Optional. Defaults to `resource.orn`. |
| `STS_ACCESS_TOKEN` for an API server or app instance | `STS`, with `protocol.credential` | `API_SERVER` | Not applicable | Required |
| `STS_ACCESS_TOKEN` for an MCP server | `STS`, with `protocol.credential` | `MCP_SERVER` | Not applicable | Required |

Not every actor can use every connection type. This table shows which actors can use each combination of protocol and resource.

| Protocol | Resource | AI agent | MCP server | Agent Gateway |
| --- | --- | --- | --- | --- |
| `IDENTITY_ASSERTION` | None (custom authorization server) | Yes | Yes | No |
| `IDENTITY_ASSERTION` | `API_SERVER` | Yes | Yes | No |
| `IDENTITY_ASSERTION` | `A2A_SERVER` | Yes | No | No |
| `IDENTITY_ASSERTION` | `MCP_SERVER` | Yes | Yes | No |
| `STS` | `API_SERVER` | Yes | Keep only | No |
| `STS` | `MCP_SERVER` | Yes | Keep only | Yes |
| `STS` | `SERVICE_ACCOUNT` or `VAULT_SECRET` | Yes | No | No |

Agent Gateway actors can create `STS` connections to MCP servers. In the V2 connection APIs, the `actor.wlpType` value for an Agent Gateway is still `VIRTUAL_MCP_SERVER`. The table uses these values:

- **Yes:** You can create, read, update, activate, deactivate, and delete the connection.
- **Keep only:** Create and activate return `400`. STS needs a user, and the downstream call of an MCP server has none. You can still read, list, update, deactivate, and delete an existing connection.
- **No:** Every operation returns `400`.

### Connect to the Okta MCP Server

Both versions support identity assertion and STS connections to the Okta MCP Server through the org authorization server. For an identity assertion connection, the actor redeems the assertion at the org authorization server. Link the org authorization server by its ORN, `orn:okta:org:{orgId}:authorization_servers:org`.

The org authorization server has the `OKTA_ORG` type. Okta links it only to the Okta MCP Server, and Okta manages its metadata. You can't change the subject of the ID-JAG token for the Okta MCP Server. Okta rejects `clientIdAtResource` with a `400` error.

Okta links the org authorization server when you register the Okta MCP Server from its catalog entry. You can't add or remove it yourself. On the link, you can change only `protocolConfigurations.identityAssertion.enabled`.

The Okta MCP Server registers with `identityAssertion.enabled` set to `false`, so it supports STS only. Turn identity assertion on before you create an identity assertion connection. Otherwise the request fails with a `400` error. To turn it on, send a merge patch to the authorization server link.

Scopes must be among the Okta MCP Server's `scopesSupported`, or the request returns `400`.

The V1 request to `POST /workload-principals/api/v1/ai-agents/wlpkhjm0jnDp8RrUu0g4/connections`:

```json
{
  "connectionType": "IDENTITY_ASSERTION_MCP_SERVER",
  "resource": {
    "orn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:emsOk7aM9cP2p0g4zrZb"
  },
  "authorizationServer": {
    "orn": "orn:okta:org:00o1n8sbwArJ7OQRw406:authorization_servers:org"
  },
  "scopeCondition": "INCLUDE_ONLY",
  "scopes": [
    "okta.users.read"
  ]
}
```

The V2 request to `POST /resource-connections/api/v2/connections` sends the actor in the body and splits `connectionType`:

```json
{
  "actor": {
    "wlpId": "wlpkhjm0jnDp8RrUu0g4"
  },
  "authorizationServer": {
    "orn": "orn:okta:org:00o1n8sbwArJ7OQRw406:authorization_servers:org"
  },
  "protocol": {
    "protocolType": "IDENTITY_ASSERTION",
    "scopeCondition": "INCLUDE_ONLY",
    "scopes": [
      "okta.users.read"
    ]
  },
  "resource": {
    "resourceType": "MCP_SERVER",
    "orn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:emsOk7aM9cP2p0g4zrZb"
  }
}
```

An STS access token connection to the Okta MCP Server works differently. The connection has no `authorizationServer`. The client authentication settings that the connection references name the org authorization server in `authorizationServerOrn`.

Those settings describe an OIDC web app in your org that has the redirect URI `https://{yourOktaDomain}/oauth2/v1/sts/callback`.

The V1 request to `POST /workload-principals/api/v1/ai-agents/wlpkhjm0jnDp8RrUu0g4/connections` puts the client authentication settings ORN in `resource`:

```json
{
  "connectionType": "STS_ACCESS_TOKEN",
  "resource": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client-auth-settings:rsc4e0zxDp6j4Ta72i9"
  }
}
```

The V2 request to `POST /resource-connections/api/v2/connections` puts the MCP server in `resource` and the client authentication settings in `protocol.credential`. The `resourceIdentifier` is required, and its value is the MCP server's resource URL:

```json
{
  "actor": {
    "wlpId": "wlpkhjm0jnDp8RrUu0g4"
  },
  "protocol": {
    "protocolType": "STS",
    "credential": {
      "credentialType": "ACCESS_TOKEN",
      "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client-auth-settings:rsc4e0zxDp6j4Ta72i9"
    }
  },
  "resource": {
    "resourceType": "MCP_SERVER",
    "orn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:emsOk7aM9cP2p0g4zrZb"
  },
  "resourceIdentifier": "https://{yourOktaDomain}/mcp"
}
```

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
| `id` and `orn` | Present | Present and unchanged. Existing connection IDs and ORNs carry over between V1 and V2. |
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
| Create | `201`. A duplicate connection returns `400`. | `201`. A duplicate connection returns `409`. An unknown `actor.wlpId` returns `400`, not `404`. An `MCP_SERVER` actor that isn't active returns `404`. |
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
| Parameter | `filter` is required and selects one `connectionType`. | `search`. It's required and must include `actor.wlpId`, `resource.orn`, or `resource.appInstance.orn`. |
| Type | `connectionType eq "{type}"` | `protocol.protocolType` and `resource.resourceType`. Combine them with an anchor to narrow the results to one type. |
| Actor | `actorId` is optional. It only adds `clientIdAtResource` to app instance rows. | `actor.wlpId eq "{wlpId}"` runs a forward query. An unknown `wlpId` returns `400`. |
| Reverse query | Not available | `resource.orn eq "{orn}"` returns one row for each actor and protocol. Okta lists a row only when the resource is set up for that protocol. An unknown ORN returns `400`. |
| App instance | `appInstanceOrn eq "{orn}"`, for `STS_SERVICE_ACCOUNT` only | `resource.appInstance.orn eq "{orn}"`, for `API_SERVER` and `SERVICE_ACCOUNT` rows |
| STS access token type | `resourceType eq "APP_INSTANCE"`, `"MCP_SERVER"`, or `"API_SERVER"` | `resource.resourceType eq "API_SERVER"` or `"MCP_SERVER"`, with `protocol.protocolType eq "STS"`. There is no `APP_INSTANCE` type. |
| `match` | Fuzzy substring of 3 to 50 characters on the typed list | The same length rule applies to every query. On forward and app instance queries, it matches the resource name. On reverse queries, it matches the actor's display name. |
| `after`, `limit` | `limit` defaults to 20, with a maximum of 200. | Same |

In V2, the client authentication settings of an app instance come back as an `API_SERVER` row. The row has `resource.appInstance` set.

V2 requires `search`, and the expression must include `actor.wlpId`, `resource.orn`, or `resource.appInstance.orn`. Without one of them, the request returns `400`. Add `protocol.protocolType` and `resource.resourceType` to narrow the results to one type.

You can combine `resource.orn` with `resource.appInstance.orn`. Okta returns the candidates of the resource only if the resource belongs to the app instance. Otherwise, the page is empty.

V2 also returns `400` for these `search` values:

- An expression without `actor.wlpId`, `resource.orn`, or `resource.appInstance.orn`
- A property that's used more than once
- A blank or non-string value
- The `or` operator
- A `resource.appInstance.orn` value that isn't an app instance ORN
- A `resource.resourceType` that differs from the type of the `resource.orn` value
- Any use of `not` other than `not (resource pr)`
- `not (resource pr)` together with `resource.orn`, `resource.resourceType`, or `resource.appInstance.orn`

#### Query mapping

Use this table to convert a V1 `filter`. V2 requires an anchor, so most V2 examples anchor on an actor. A V1 call without `actorId` listed the candidates of one type for every actor. V2 has no equivalent, so make one call for each actor.

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

V1 rows differ by `connectionType`. V2 rows use one shape, with the same property names as the V2 create request. Every V2 row includes `actor`. Every row except a custom authorization server row also includes `resource`. A reverse query returns the forward rows of the resource, plus the actor that can connect to each one.

| Property | V1 | V2 |
| --- | --- | --- |
| Actor | Not returned. You pass `actorId` in the request. | `actor` with `wlpId`, `wlpType`, and `displayName`, on every row |
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

A row isn't a complete create request. Add these values before you call `POST /resource-connections/api/v2/connections`.

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
- Replace the potential connections `filter` with `search`. You must anchor it on `actor.wlpId`, `resource.orn`, or `resource.appInstance.orn`. Use the query mapping table to convert a V1 `filter`.
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

The V2 response returns the actor, `protocol`, and `resourceIdentifier`. The connection has no top-level `_links`. A create response includes `_links.web` on the authorization server:

```json
{
  "id": "mcn2b3c4d5e6f7g8h9i0",
  "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:connections:mcn2b3c4d5e6f7g8h9i0",
  "status": "ACTIVE",
  "actor": {
    "wlpId": "wlpkhjm0jnDp8RrUu0g4",
    "wlpType": "AI_AGENT",
    "displayName": "Sales AI Agent"
  },
  "authorizationServer": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:authorization_servers:aus5rb5mt2H3d1TJd0h7",
    "displayName": "Partner AS",
    "issuerUrl": "https://example.okta.com/oauth2/aus5rb5mt2H3d1TJd0h7",
    "_links": {
      "web": "https://{yourOktaAdminDomain}/admin/oauth2/as/aus5rb5mt2H3d1TJd0h7"
    }
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
  "data": [
    {
      "id": "mcn3c4d5e6f7g8h9i0j1",
      "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:connections:mcn3c4d5e6f7g8h9i0j1",
      "status": "ACTIVE",
      "actor": {
        "wlpId": "wlpkhjm0jnDp8RrUu0g4",
        "wlpType": "AI_AGENT",
        "displayName": "Sales AI Agent"
      },
      "protocol": {
        "protocolType": "STS"
      },
      "resource": {
        "resourceType": "VAULT_SECRET",
        "orn": "orn:okta:pam:00o1n8sbwArJ7OQRw406:secrets:d2642f68-df50-4ba8-a898-6c0f82f89d8a",
        "displayName": "DB Password",
        "description": "Production DB credentials"
      },
      "resourceIdentifier": "orn:okta:pam:00o1n8sbwArJ7OQRw406:secrets:d2642f68-df50-4ba8-a898-6c0f82f89d8a"
    }
  ],
  "_links": {
    "self": "https://example.okta.com/resource-connections/api/v2/connections?search=actor.wlpId%20eq%20%22wlpkhjm0jnDp8RrUu0g4%22&limit=2",
    "next": "https://example.okta.com/resource-connections/api/v2/connections?search=actor.wlpId%20eq%20%22wlpkhjm0jnDp8RrUu0g4%22&after=mcn3c4d5e6f7g8h9i0j1&limit=2"
  }
}
```

This example lists the potential connections of an AI agent. The V1 call requires a `connectionType` in `filter` and passes the agent as `actorId`:

```http
GET /workload-principals/api/v1/potential-connections?filter=connectionType%20eq%20%22IDENTITY_ASSERTION_A2A_SERVER%22&actorId=wlpkhjm0jnDp8RrUu0g4
```

The V2 call anchors `search` on the agent, and the type properties are optional:

```http
GET /resource-connections/api/v2/potential-connections?search=actor.wlpId%20eq%20%22wlpkhjm0jnDp8RrUu0g4%22%20and%20protocol.protocolType%20eq%20%22IDENTITY_ASSERTION%22%20and%20resource.resourceType%20eq%20%22A2A_SERVER%22
```

<!-- TODO: XAA_OKTA_MCP_SERVER, which gates connections to the Okta MCP Server, needs a customer-facing name (owner: Kenton or Lalitha). -->

<!-- TODO: Ask engineering whether the relative hrefs in V1 connection _links are intended. They have no host and no leading slash, for example workload-principals/api/v1/ai-agents/{id}/connections/{connectionId}. The guide keeps the spec's absolute URLs (owner: Susan decides who). -->

V1 managed connections and the AI agent, MCP server, and virtual MCP server connection APIs remain until April 30, 2027.

---

## Workload Principal Operations

For the V2 calls, see the [Workload Principal Operations API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/workloadprincipaloperationsv2).

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

The `virtual-mcp` types are also gone because Agent Gateway registration writes are synchronous.

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

---

## Resource Server Operations

For the V2 calls, see the [Resource Server Operations API reference](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/resourceserveroperationsv2).

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

A failed operation has a `status` of `FAILED` and an `errorDetails` object. This V2 response is from a `client-auth-settings:Create` operation for Dynamic Client Registration (DCR) settings, where registration with the authorization server failed. The `resource` is missing, because Okta didn't create the settings. V1 returns the same `errorDetails`:

```json
{
  "id": "rsovam2cYUrV2pXt3ao5",
  "type": "client-auth-settings:Create",
  "status": "FAILED",
  "created": "2026-11-17T19:01:19Z",
  "started": "2026-11-17T19:01:20Z",
  "completed": "2026-11-17T19:01:20Z",
  "errorDetails": {
    "code": "resourceserver.error.dcr.registrationFailed",
    "message": "Dynamic client registration with the authorization server failed."
  }
}
```

---

## STS Authorization

There's no V2 version of this API. Keep using the V1 STS callback endpoint.

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
12. Poll a resource server operation only after you register a `DISCOVERABLE` MCP server, change an MCP server `resourceUrl`, or start MCP server discovery.
13. Rename virtual MCP servers to Agent Gateways. Change the paths from `/virtual-mcp-servers` to `/agent-gateways` in the Workload Principals and Resource Servers APIs.
14. In MCP server discovery requests, move `type` (renamed `authType`), `clientAuthSettingsOrn`, and `tokenRequestSettingsOrn` under `credential`. Change `CLIENT_AUTH_SETTINGS` to `BROKERED_CONSENT`.
15. Call `/resource-connections/api/v2/connections` for AI agent, MCP server, and Agent Gateway connections. Send `actor.wlpId` in the body, and replace `connectionType` with `protocol.protocolType` and `resource.resourceType`.
16. In connection calls, move `scopeCondition`, `scopes`, and `clientIdAtResource` under `protocol`, and rename `resourceIndicator` to `resourceIdentifier`.
17. Replace the `filter` parameter and the managed connections call with `search`. Deactivate a connection before you delete it.
18. Stop calling the add and remove authorization server operations on virtual MCP servers (Agent Gateways). V2 doesn't include them.
19. Replace potential connections `connectionType` filters with `search` on `protocol.protocolType` and `resource.resourceType`. You must anchor on `actor.wlpId`, `resource.orn`, or `resource.appInstance.orn`.
20. Change the path for token request settings from `/resource-servers/api/v1/token-request-settings` to `/resource-servers/api/v2/token-request-settings`.
21. Change the paths for MCP server OAuth client and JWK calls from `/workload-principals/api/v1/mcp-servers/{mcpServerId}` to `/workload-principals/api/v2/mcp-servers/{mcpServerId}`. Remove `status` from add key requests, and stop reading `_links` on JWK responses.
22. For providers that use a client ID and client secret, create a client authentication settings object. Send its ID in `configuration` as `clientAuthId`. Requests that send `client_auth_id` still work. Keep sending `accessKeyId` and `secretAccessKey` directly for AWS and other API key providers.
23. Test your integration against V2 before April 30, 2027.
