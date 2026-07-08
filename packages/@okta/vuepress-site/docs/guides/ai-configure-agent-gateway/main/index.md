---
title: Configure Agent Gateway
meta:
  - name: description
    content: Configure a virtual MCP server so agents can connect to Okta Agent Gateway and invoke tools with enforced identity and policy.
layout: Guides
---

Agent Gateway is an Okta-secured endpoint that aggregates tools from multiple upstream MCP servers and enforces identity and policy on every tool call. This guide walks you through the API steps to configure a virtual MCP server (vMCP). After you finish, an MCP client, such as Claude Code or Agentforce, can connect to the vMCP and invoke tools.

> **Note:** This guide covers the admin steps to configure agent gateway using the Okta API. For instructions on connecting your agent to an Agent Gateway that an admin already set up, see [Configure an AI agent for Agent Gateway](/docs/guides/ai-configure-agent-for-gateway/main/index.md). For the Admin Console steps, see [get topic name and alias from Barbara]().

---

#### Learning outcomes

* Register a virtual MCP server (vMCP) and link it to a custom authorization server.
* Connect the vMCP to an upstream MCP server and expose specific tools.
* Activate the gateway so that agents can invoke tools.

#### What you need

* An Okta org with the Secure AI Virtual MCP Servers feature enabled and an active Okta for AI Agents subscription. See your Okta account team to enable the feature.
* At least one upstream MCP server registered in Okta, with `ClientAuthSettings` configured and tools discovered. See *Register an upstream MCP server*.
* An MCP client application registered as an OAuth app in Okta (an app with a `0oa` ID). See *Register an OAuth app*.
* The users who'll use the gateway assigned to the MCP client app.
* The `SUPER_ADMIN` role.

---

## Overview

Configuring Agent Gateway involves creating a vMCP and linking it to a custom authorization server. Then you connect the vMCP to upstream MCP servers and select which tools to expose. The following sections walk you through the API calls required to complete this configuration and activate the gateway.

## Create a custom authorization server

The custom authorization server protects the vMCP endpoint. The gateway validates all inbound agent tokens against this custom authorization server.

Create a custom authorization server and configure an access policy rule that grants your MCP client app permission to request tokens. See [Create an authorization server](/docs/guides/customize-authz-server/main/).

## Create a virtual MCP server

Creating a virtual MCP server registers the gateway endpoint in Okta and creates its `WorkloadPrincipal` identity. The vMCP is created in `INACTIVE` status and isn't reachable by agents until you activate it. See [Activate the virtual MCP server](#activate-the-virtual-mcp-server).

### Request

```http
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

The `resourcePath` value must be unique within your org and can't change after creation. The full gateway URL is `https://{subdomain}.gateway.okta.com/mcp/{resourcePath}`.

### Response

```http
202 Accepted
Location: https://{yourOktaDomain}/workload-principals/api/v1/operations/op-4e5f6g7h
```

Poll the `Location` URL until the status is `COMPLETED` or `FAILED`. See [Poll for operation status](#poll-for-operation-status).

When the operation completes, retrieve your vMCP to get its ID and ORN for subsequent steps:

```http
GET /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k
Authorization: Bearer {token}
```

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

## Link the custom authorization server to the virtual MCP server

Linking the custom authorization server to the vMCP tells the gateway which issuer and JWKS to validate inbound tokens against. Okta supports only one custom authorization server per vMCP.

### Request

```http
POST /resource-servers/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/authorization-servers
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "OKTA",
  "orn": "orn:okta:idp:00o5rb5mt2H3d1TJd0h7:authorization_servers:aus5rb5mt2H3d1TJd0h7"
}
```

### Response

```http
202 Accepted
Location: https://{yourOktaDomain}/resource-servers/api/v1/operations/op-1a2b3c4d
```

This is an asynchronous operation. Poll the `Location` URL for status. See [Poll for operation status](#poll-for-operation-status).

## Create a delegation link

The delegation link declares that the MCP client app is authorized to delegate to this vMCP on behalf of users. The gateway rejects token exchanges without a valid delegation link in place.

### Request

```http
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
    "resourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:virtual-mcp:vms1aB2cD3eF4gH5iJ6k"
  }
}
```

### Response

```json
{
  "id": "dlk1a2b3c4d5e6f7g8h9",
  "from": {
    "type": "OKTA_AUTHORIZATION_SERVER",
    "clientOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:apps:oidc:0oafxqCAJWWGELFTYASJ",
    "tokenType": "ACCESS_TOKEN"
  },
  "to": {
    "resourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:virtual-mcp:vms1aB2cD3eF4gH5iJ6k",
    "authorizationServerOrn": "orn:okta:idp:00o11edPwGqbUrsDm0g4:authorization_servers:aus5rb5mt2H3d1TJd0h7"
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/delegation-links/dlk1a2b3c4d5e6f7g8h9"
    }
  }
}
```

> **Note:** The `to.authorizationServerOrn` value in the response is read-only. Okta infers it automatically from the vMCP's linked custom authorization server, so you don't need to supply it in the request.

## Create a connection to an upstream MCP server

A resource connection authorizes the gateway to obtain tokens for an upstream MCP server at runtime. Create one connection per upstream MCP server, and activate each connection before tool calls can succeed.

### Create the connection

#### Request

```http
POST /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections
Authorization: Bearer {token}
Content-Type: application/json

{
  "connectionType": "STS_ACCESS_TOKEN",
  "resource": {
    "orn": "orn:okta:idp:00o1n8sbwArJ7OQRw406:client_auth_settings:rsc2c8xwvBn4h2Ry50g7"
  },
  "resourceIndicator": "https://mcp.example.com"
}
```

The `resource.orn` value references the `ClientAuthSettings` record for the upstream MCP server. Use the same `ClientAuthSettings` record that tool discovery used, because a different one can cause runtime failures.

#### Response

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
    },
    "capabilities": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections/mcn9i0j1k2l3m4n5o6p7/capabilities"
    }
  }
}
```

> **Note:** The `_links.capabilities` URL points to the endpoint that you use in [Add capabilities](#add-capabilities) to add tools from this connection.

Repeat this step for each upstream MCP server that you want to connect to this gateway.

### Activate the connection

The connection must be active for tool calls to succeed at runtime.

#### Request

```http
POST /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections/mcn9i0j1k2l3m4n5o6p7/lifecycle/activate
Authorization: Bearer {token}
```

#### Response

Returns `200 OK` with the updated connection object, which includes `"status": "ACTIVE"`.

## Add capabilities

Capabilities define which tools from each upstream MCP server are exposed through the vMCP. Agents only see the tools that you select here. You can add tools one at a time or replace the entire set for a connection at once.

### Add a single tool

#### Request

```http
POST /workload-principals/api/v1/virtual-mcp-servers/wlp1aB2cD3eF4gH5iJ6k/connections/mcn9i0j1k2l3m4n5o6p7/capabilities
Authorization: Bearer {token}
Content-Type: application/json

{
  "sourceOrn": "orn:okta:directory:00o1gjjp4jsdR3Sww4x7:resource-servers:mcp:ems8nUa7p0g4zrZbs2f4:tools:emt1aB2cD3eF4gH5iJ6k",
  "alias": "get_github_issues"
}
```

The `sourceOrn` value identifies the tool on the upstream MCP server. The `alias` value is optional. If you omit it, the alias defaults to the tool's name as the upstream server reports it. Aliases must be unique within the vMCP.

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

The `status` field indicates whether the tool still exists on the upstream server. `VALID` means the last discovery run found the tool. `INVALID` means it didn't.

### Replace all tools for a connection

To set the complete tool list for a connection in one call, use `PUT`. Okta removes any tools that you don't include in the request.

#### Request

```http
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
Location: https://{yourOktaDomain}/resource-servers/api/v1/operations/op-1a2b3c4d
```

This is an asynchronous operation. Poll the `Location` URL for status. See [Poll for operation status](#poll-for-operation-status).

## Activate the virtual MCP server

Activating the vMCP makes it live. The gateway only serves `ACTIVE` vMCPs, so the endpoint isn't reachable by agents until you complete this step.

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

Several steps in this guide return `202 Accepted` with a `Location` header that points to an operation. Use the following requests to check whether the operation completed.

Use the following request for vMCP operations, such as [creating](#create-a-virtual-mcp-server) or [activating](#activate-the-virtual-mcp-server) the vMCP:

```http
GET /workload-principals/api/v1/operations/{operationId}
Authorization: Bearer {token}
```

Use the following request for resource server operations, such as [linking the authorization server](#link-the-custom-authorization-server-to-the-virtual-mcp-server) or [replacing a connection's tools](#replace-all-tools-for-a-connection):

```http
GET /resource-servers/api/v1/operations/{operationId}
Authorization: Bearer {token}
```

The following examples show the possible responses.

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

Possible `status` values are `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, and `FAILED`.

## What happens at runtime

After you complete all the preceding steps, the following sequence occurs when an agent invokes a tool:

1. The agent discovers the gateway's authorization server metadata from `{gatewayURL}/.well-known/oauth-protected-resource`.
1. The agent obtains an access token from the custom authorization server through authorization code + PKCE.
1. The agent presents the token to the gateway and establishes an MCP session.
1. The gateway validates the token against the linked custom authorization server and checks that the vMCP is active.
1. On `tools/call`, the gateway initiates an OAuth STS token exchange with the Okta org authorization server.
1. Okta validates the delegation link and the resource connection.
1. If this is the user's first time calling a tool from a specific upstream server, an `interaction_required` response prompts the user to consent. After consent, subsequent calls are silent.
1. The gateway obtains the downstream credential, injects it into the outbound call, and proxies the request to the upstream MCP server.

Only the tools that you selected in [Add capabilities](#add-capabilities) are reachable.

## Next steps

Complete the following tasks after you activate the gateway:

* Give your developers the gateway URL and client credentials so that they can configure their agents. See *Connect your agent to Okta Agent Gateway*.
* Review administrative actions in the Okta System Log.
* To revoke an agent's access, deactivate the resource connection between the agent and the gateway. This takes effect immediately for new tool calls; existing tokens remain valid until they expire.
