---
title: Configure Agent Gateway
meta:
  - name: description
    content: Configure Agent Gateway so agents can connect and invoke tools with enforced identity and policy.
layout: Guides
---

Agent Gateway is an Okta-secured endpoint that aggregates tools from multiple remote MCP servers and enforces identity and policy on every tool call. In the Okta API, an agent gateway is represented as a virtual MCP server (vMCP). This guide walks you through the API steps to configure an agent gateway. After you finish, an MCP client, such as Claude Code or Agentforce, can connect to the gateway and invoke tools.

> **Note:** This guide covers the steps to configure Agent Gateway using the Okta API. For instructions on connecting your agent to an Agent Gateway that is already set up, see [Configure an AI agent for Agent Gateway](/docs/guides/ai-configure-agent-for-gateway/main/index.md).

---

#### Learning outcomes

* Retrieve org-level virtual MCP settings, such as limits and the gateway's base path.
* Register an agent gateway.
* Connect the agent gateway to a remote MCP server and expose specific tools.
* Activate the gateway so that agents can invoke tools.
* Delete an agent gateway.

#### What you need

* An Okta org with an active Okta for AI Agents subscription. Virtual MCP servers is a Release feature. Contact Okta Support to enable access.
* At least one [remote MCP server registered](/docs/api/secures-ai/openapi/secures-ai-resource-servers/tags/mcpserverregistration/other/registermcpserver) in Okta.
* A user for testing.
* The Super Admin role.

---

## Overview

Configuring Agent Gateway involves creating a custom authorization server and then creating the agent gateway, which Okta automatically links to it. Then, you connect the agent gateway to remote MCP servers and select which tools to expose. The following sections walk you through the API calls required to complete this configuration and activate the gateway.

## Create a custom authorization server

The custom authorization server protects the agent gateway endpoint. The gateway validates all inbound agent tokens against this custom authorization server.

Create a custom authorization server and configure an access policy rule that grants your MCP client app permission to request tokens. See [Create an authorization server](/docs/guides/customize-authz-server/main/).

> **Note:** When you create the agent gateway in the next step, Okta automatically links it to this custom authorization server. Okta supports only one custom authorization server per agent gateway.

## Retrieve agent gateway settings

Before you create an agent gateway, retrieve your org's virtual MCP settings. The response includes the `basePath` you use to construct the gateway URL, and the org-level limits that apply to virtual MCPs.

### Request

```http
  GET /workload-principals/api/v1/virtual-mcp-settings
  Authorization: Bearer {token}
```

### Response

```json
{
  "supportedConnectionTypes": [
    "STS_ACCESS_TOKEN"
  ],
  "limits": {
    "maxVirtualMCPs": 100,
    "maxCapabilitiesPerVirtualMCP": 1000,
    "maxResourceServersPerVirtualMCP": 100
  },
  "features": [],
  "basePath": "https://subdomain.gateway.okta.com"
}
```

| Field | Description |
| --- | --- |
| `basePath` | The domain you use to construct the gateway URL: `{basePath}/mcp/{resourcePath}`. |
| `limits.maxVirtualMCPs` | Maximum number of agent gateways you can create for this org. |
| `limits.maxCapabilitiesPerVirtualMCP` | Maximum number of tools you can add to a single agent gateway. |
| `limits.maxResourceServersPerVirtualMCP` | Maximum number of remote MCP server connections you can add to a single agent gateway. |
| `supportedConnectionTypes` | Connection types that Okta supports for resource connections. Currently, this is always `STS_ACCESS_TOKEN`. |

## Create the agent gateway

Creating the agent gateway registers the gateway endpoint in Okta and creates its `WorkloadPrincipal` identity. The agent gateway is created in `INACTIVE` status and isn't reachable by agents until you activate it. See [Activate the agent gateway](#activate-the-agent-gateway).

### Request

```json
POST /workload-principals/api/v1/virtual-mcp-servers
Authorization: Bearer {token}
Content-Type: application/json

{
  "resourcePath": "engineering-tools",
  "profile": {
    "displayName": "Engineering Tools",
    "description": "Aggregated MCP tools for engineering workflows"
  }
}
```

The `resourcePath` value must be unique within your org and can't change after creation. The full gateway URL combines the `basePath` from [Retrieve agent gateway settings](#retrieve-agent-gateway-settings) with this path: `https://{subdomain}.gateway.okta.com/mcp/{resourcePath}`.

### Response

```http
  202 Accepted
  Location: https://{yourOktaDomain}/workload-principals/api/v1/operations/op-4e5f6g7h
```

Poll the `Location` URL until the status is `COMPLETED` or `FAILED`. See [Poll for operation status](#poll-for-operation-status).

When the operation completes, retrieve the agent gateway to get its vMCP ID and ORN for subsequent steps:

### Request

```http
  GET /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k
  Authorization: Bearer {token}
```

### Response

```json
{
  "id": "wlp1aB2cD3eF4gH5iJ6k",
  "orn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:workload-principals:virtual-mcp:wlp1aB2cD3eF4gH5iJ6k",
  "status": "INACTIVE",
  "profile": {
    "displayName": "Engineering Tools",
    "description": "Aggregated MCP tools for engineering workflows"
  },
  "created": "2025-06-01T10:00:00Z",
  "lastUpdated": "2025-06-01T10:00:00Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k"
    },
    "resource-server": {
      "href": "https://{yourOktaDomain}/resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k"
    }
  }
}
```

## Create a delegation link

The delegation link declares that the MCP client app is authorized to delegate to this agent gateway on behalf of users. The gateway rejects token exchanges without a valid delegation link in place.

### Request

```json
POST /workload-principals/api/v1/delegation-links
Authorization: Bearer {token}
Content-Type: application/json

{
  "from": {
    "type": "OKTA_AUTHORIZATION_SERVER",
    "clientOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:oidc:0oafxqCAJWWGELFTYASJ",
    "tokenType": "ACCESS_TOKEN"
  },
  "to": {
    "resourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:workload-principals:virtual-mcp:wlp1aB2cD3eF4gH5iJ6k"
  }
}
```

The `from.clientOrn` value in this example references the MCP client app's OAuth 2.0 app ORN. If you're delegating to an AI agent that you registered through the Agent Registration API instead of a plain OAuth app, reference the agent's ORN instead (`orn:okta:directory:{orgId}:workload-principals:ai-agents:{agentId}`).

### Response

```http
201 Created
```

```json
{
  "id": "dlk1a2b3c4d5e6f7g8h9",
  "from": {
    "type": "OKTA_AUTHORIZATION_SERVER",
    "clientOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:oidc:0oafxqCAJWWGELFTYASJ",
    "tokenType": "ACCESS_TOKEN"
  },
  "to": {
    "resourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:workload-principals:virtual-mcp:wlp1aB2cD3eF4gH5iJ6k",
    "authorizationServerOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:authorization_servers:aus5rb5mt2H3d1TJd0h7"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/delegation-links/dlk1a2b3c4d5e6f7g8h9"
    }
  }
}
```

> **Note:** The `to.authorizationServerOrn` value in the response is read-only. Okta infers it automatically from the agent gateway's linked custom authorization server, so you don't need to supply it in the request.

## Create a connection to a remote MCP server

A resource connection authorizes the gateway to obtain tokens for a remote MCP server at runtime. Create one connection per remote MCP server, and then activate each connection before tool calls can succeed. Okta currently supports only `STS_ACCESS_TOKEN` connections to `MCP_SERVER` resources.

### Create the connection

#### Request

```json
POST /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections
Authorization: Bearer {token}
Content-Type: application/json

{
  "connectionType": "STS_ACCESS_TOKEN",
  "resource": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc2c8xwvBn4h2Ry50g7"
  }
}
```

The `resource.orn` value references the `ClientAuthSettings` record for the remote MCP server. Use the same `ClientAuthSettings` record that tool discovery used, because a different one can cause runtime failures. Okta infers `resourceIndicator` from that resource automatically, so you don't need to send it. To override it later, send a `PATCH` request to the connection.

#### Response

```http
201 Created
```

```json
{
  "connectionType": "STS_ACCESS_TOKEN",
  "id": "mcn9i0j1k2l3m4n5o6p7",
  "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:connections:mcn9i0j1k2l3m4n5o6p7",
  "status": "INACTIVE",
  "resourceIndicator": "https://mcp.example.com",
  "resource": {
    "resourceType": "MCP_SERVER",
    "orn": "orn:okta:directory:00o1n8sbwArJ7OQRw406:resource-servers:mcp:mcp2c8xwvBn4h2Ry50g7",
    "name": "GitHub MCP Server",
    "mcpServerId": "mcp2c8xwvBn4h2Ry50g7",
    "endpointUrl": "https://mcp.example.com",
    "clientAuthSettings": {
      "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc2c8xwvBn4h2Ry50g7",
      "name": "GitHub OAuth Config",
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/resource-servers/api/v1/client-auth-settings/rsc2c8xwvBn4h2Ry50g7"
        }
      }
    }
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections/mcn9i0j1k2l3m4n5o6p7"
    }
  }
}
```

Repeat this step for each remote MCP server that you want to connect to this gateway.

To change a connection later, send a `PATCH` request to the same connection URL. Okta supports updating only the `resourceIndicator` field.

### Activate the connection

The connection must be active for tool calls to succeed at runtime.

#### Request

```http
  POST /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections/mcn9i0j1k2l3m4n5o6p7/lifecycle/activate
  Authorization: Bearer {token}
```

#### Response

Returns `200 OK` with the updated connection object, which includes `"status": "ACTIVE"`.

## Add tools

Define which tools from each remote MCP server are exposed through the agent gateway. Agents only see the tools that you select here. Okta manages capabilities per connection, so you add or replace tools for one connection at a time. You can add tools one at a time or replace the entire set for a connection at once.

### Add a single tool

#### Request

```json
POST /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections/mcn9i0j1k2l3m4n5o6p7/capabilities
Authorization: Bearer {token}
Content-Type: application/json

{
  "sourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4:tools:emt1aB2cD3eF4gH5iJ6k",
  "alias": "get_github_issues"
}
```

The `sourceOrn` value identifies the tool on the remote MCP server. The `alias` value is optional. If you omit it, the alias defaults to the tool's name as the remote server reports it. Aliases must be unique within the agent gateway.

#### Response

```json
{
  "id": "vsc1aB2cD3eF4gH5iJ6k",
  "sourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4:tools:emt1aB2cD3eF4gH5iJ6k",
  "connectionOrn": "orn:okta:idp:00o1gjjp4jsdR3Sww4x7:connections:mcn9i0j1k2l3m4n5o6p7",
  "type": "TOOL",
  "status": "VALID",
  "profile": {
    "name": "get_issues",
    "description": "Get issues from a repository",
    "alias": "get_github_issues"
  }
}
```

The `status` field indicates whether the tool still exists on the remote server. `VALID` means the last discovery run found the tool. `INVALID` means it didn't.

### Replace all tools for a connection

To set the complete tool list for a connection in one call, use `PUT`. Okta removes any tool for that connection that you don't include in the request. Tools on other connections aren't affected.

#### Request

```json
PUT /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections/mcn9i0j1k2l3m4n5o6p7/capabilities
Authorization: Bearer {token}
Content-Type: application/json

{
  "data": [
    {
      "sourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4:tools:emt1aB2cD3eF4gH5iJ6k",
      "alias": "get_github_issues"
    },
    {
      "sourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4:tools:emt7lM8nO9pQ0rS1tU2v"
    }
  ]
}
```

> **Note:** You can specify a maximum of 100 tools per connection. Okta returns `409 Conflict` if any aliases conflict within the provided list.

#### Response

```http
  202 Accepted
  Location: https://{yourOktaDomain}/workload-principals/api/v1/operations/op-1a2b3c4d
```

This is an asynchronous operation. Poll the `Location` URL for status. See [Poll for operation status](#poll-for-operation-status).

## Activate the agent gateway

Activating the agent gateway makes it live. The gateway only serves `ACTIVE` vMCPs, so the endpoint isn't reachable by agents until you complete this step.

### Request

```http
  POST /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/lifecycle/activate
  Authorization: Bearer {token}
```

### Response

```http
  202 Accepted
  Location: https://{yourOktaDomain}/workload-principals/api/v1/operations/op-5a6b7c8d
```

Poll the `Location` URL for status. When the operation completes with `"status": "COMPLETED"`, your gateway is live and agents can connect.

## Poll for operation status

Several steps in this guide return `202 Accepted` with a `Location` header that points to an operation. Use the following request to check whether the operation completed, such as when [creating](#create-the-agent-gateway), [activating](#activate-the-agent-gateway), [deleting](#delete-the-agent-gateway) the agent gateway, or [replacing a connection's tools](#replace-all-tools-for-a-connection):

```http
  GET /workload-principals/api/v1/operations/{operationId}
  Authorization: Bearer {token}
```

The following examples show the possible responses. Possible `status` values are `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, and `FAILED`.

**In progress:**

```json
{
  "id": "op-4e5f6g7h",
  "type": "virtual-mcp:Register",
  "status": "IN_PROGRESS",
  "created": "2025-09-12T10:00:00.000Z",
  "started": "2025-09-12T10:00:01.000Z"
}
```

**Completed:**

```json
{
  "id": "op-4e5f6g7h",
  "type": "virtual-mcp:Register",
  "status": "COMPLETED",
  "created": "2025-09-12T10:00:00.000Z",
  "started": "2025-09-12T10:00:01.000Z",
  "completed": "2025-09-12T10:00:03.000Z",
  "resource": {
    "id": "wlp1aB2cD3eF4gH5iJ6k",
    "type": "virtual_mcp",
    "status": "INACTIVE",
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k"
      }
    }
  }
}
```

**Failed:**

```json
{
  "id": "op-4e5f6g7h",
  "type": "virtual-mcp:Register",
  "status": "FAILED",
  "created": "2025-09-12T10:00:00.000Z",
  "started": "2025-09-12T10:00:01.000Z",
  "completed": "2025-09-12T10:00:05.000Z",
  "errorDetails": {
    "code": "E0000001",
    "message": "custom error message."
  }
}
```

## What happens at runtime

After you complete all the preceding steps, the following sequence occurs when an agent invokes a tool:

> **Note**: See the [Okta Agent Gateway concept doc](/docs/concepts/agent-gateway/) for a flow diagram of the sequence.

1. The agent discovers the gateway's authorization server metadata from `{gatewayURL}/.well-known/oauth-protected-resource`.
1. The agent obtains an access token from the custom authorization server through authorization code + PKCE.
1. The agent presents the token to the gateway and establishes an MCP session.
1. The gateway validates the token against the linked custom authorization server and checks that the agent gateway is active.
1. On `tools/call`, the gateway initiates an OAuth Security Token Service token exchange with the Okta org authorization server.
1. Okta validates the delegation link and the resource connection.
1. If this is the user's first time calling a tool from a specific remote server, an `interaction_required` response prompts the user to consent. After consent, subsequent calls are silent.
1. The gateway obtains the downstream credential, injects it into the outbound call, and proxies the request to the remote MCP server.

Only the tools that you selected in [Add tools](#add-tools) are reachable.

## Delete the agent gateway

Deleting removes the agent gateway's registration and its `WorkloadPrincipal` identity entirely. This is irreversible.

The agent gateway must be in `INACTIVE` status before you can delete it. If it's `ACTIVE`, deactivate it first:

```http
  POST /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/lifecycle/deactivate
  Authorization: Bearer {token}
```

Deactivating returns the same `202 Accepted` and `Location` pattern as [activating](#activate-the-agent-gateway) the agent gateway. Poll until the operation completes and the agent gateway's status is `INACTIVE`.

### Request

```http
  DELETE /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k
  Authorization: Bearer {token}
```

### Response

```http
  202 Accepted
  Location: https://{yourOktaDomain}/workload-principals/api/v1/operations/op-9f8e7d6c
```

This is an asynchronous operation. Poll the `Location` URL for status. See [Poll for operation status](#poll-for-operation-status). After the operation completes, the gateway URL stops resolving, and any remaining connections and delegation links for this agent gateway are no longer usable.

## Next steps

Complete the following tasks after you activate the gateway:

* Give your developers the gateway URL and client credentials so that they can configure their agents. See [Configure an AI agent for Agent Gateway](/docs/guides/ai-configure-agent-for-gateway/main/).
* Review administrative actions in the Okta System Log.
* To revoke a specific agent's or app's access, delete its delegation link (`DELETE /workload-principals/api/v1/delegation-links/{delegationLinkId}`). This takes effect immediately for new token exchanges. Tokens already issued remain valid until they expire. To cut off access to a specific remote MCP server for everyone using the gateway, deactivate that resource connection instead.
