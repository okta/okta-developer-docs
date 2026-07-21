---
title: Configure an AI agent for Agent Gateway
excerpt: Configure supported AI agents to authenticate with Okta and call tools through Agent Gateway.
layout: Guides
---

<ApiLifecycle access="research" />

Configure your AI agent to call tools through Okta Agent Gateway. Agent Gateway exposes a single Okta-secured MCP endpoint, and you can point any agent that supports an external MCP endpoint at it without code changes.

> **Note**: Agent Gateway is available with the Okta for AI Agents subscription. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

- Locate your Agent Gateway URL and OAuth 2.0 client credentials.
- Configure your AI agent to authenticate with Okta and call tools through the Agent Gateway.
- Apply the recommended enforcement policy for your platform.

#### What you need

- An Okta org with the Secure AI Virtual MCP Servers feature enabled and an active Okta for AI Agents subscription. See your Okta account team to enable the Secure AI Virtual MCP Servers feature.
- An Agent Gateway that's been created and activated. See [Configure an Agent Gateway using the APIs](/docs/guides/??).
- Your Agent Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`
- The OAuth `client_id` assigned to your agent in Okta Universal Directory.

---

## Overview

Okta Agent Gateway is an identity-native proxy that sits between AI agents and the enterprise tools that they call. It aggregates tools from multiple upstream MCP servers behind a single Okta-secured endpoint. It enforces identity and policy on every tool call. This produces a unified audit trail that extends the Okta identity fabric to agents that the enterprise doesn't build or control.

Each Agent Gateway exposes one MCP endpoint. Point any supported agent at that URL. The Agent Gateway handles tool aggregation, identity enforcement, credential injection, and auditing, with no changes to the agent's code.

> **Note**: See the [Okta Agent Gateway](/docs/concepts/agent-gateway/) concept doc for more detailed information and a diagram of the Agent Gateway authorization flow.

### What your admin provides

Before you configure your agent, an Okta admin creates the Agent Gateway. The admin also connects upstream MCP servers and selects which tools are available. Your job is to then point your agent at the Agent Gateway URL and complete authentication.

Before you start, get the following from your Okta admin:

| What | Details |
| ---- | ------- |
| Agent Gateway URL | Format: `https://{subdomain}.gateway.okta.com/mcp/{path}` |
| Client ID | The OAuth client ID registered for your agent in Okta. Not needed if your agent platform supports CIMD. Your agent vendor publishes one automatically. |
| Client secret | Only required by some platforms. Not needed for public clients using PKCE only. |
| Auth and token URLs | The Okta custom authorization server endpoints protecting the Agent Gateway. Some platforms require these explicitly, and others discover them automatically. |
| Scopes | The OAuth scopes your agent is authorized to request. |

### Authentication

Agents authenticate themselves to the Agent Gateway as an OAuth client, identified either by a pre-registered `client_id` or a [Client ID Metadata Document (CIMD)](#client-id-metadata-document-cimd). Most agents obtain a short-lived, Agent Gateway-scoped access token using the [Authorization Code with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/) grant type.

Some platforms instead use a long-lived static bearer token that an admin mints and distributes directly. Either way, the agent presents its token to the Agent Gateway on every tool call. The Agent Gateway never holds the tokens. It brokers downstream credentials at runtime inside Okta instead.

## How it works

When your agent connects to the Agent Gateway for the first time, the following sequence occurs:

1. Your agent discovers the Agent Gateway's authorization server metadata from `{gatewayURL}/.well-known/oauth-protected-resource`.
1. Your agent obtains an Okta access token using the Authorization Code with PKCE grant type, authenticating as you or as a service identity.
1. Your agent presents the token to the Agent Gateway on each tool call.
1. The first time a tool from a specific upstream MCP server is called, you may be prompted to consent to that upstream. After you consent once, subsequent calls to that upstream are silent.
1. The Agent Gateway handles credential injection to upstream MCP servers. Your agent never holds or sees upstream credentials.

> **Note**: See the [Okta Agent Gateway concept doc](/docs/concepts/agent-gateway/) for a flow diagram of the sequence.

## Client identity methods

Your agent identifies itself to the Agent Gateway as an OAuth client using one of the following methods.

### Client ID

The AI agent identifies itself as an OAuth client using a pre-registered `client_id`. An admin provisions an OAuth client in the Admin Console and distributes the `client_id` to the agent.

### Client ID Metadata Document (CIMD)

The platform publishes a vendor CIMD URL, so no per-tenant client provisioning is required. (need to link to CIMD docs??)

> **Note**: Okta doesn't accept Dynamic Client Registration for Agent Gateway. Platforms that attempt to use Dynamic Client Registration must fall back to a pre-registered `client_id`.

## Configure your AI agent platform

Agent Gateway supports two broad authentication patterns:

- **Interactive OAuth 2.0**: (Authorization Code with PKCE) Your agent redirects you to Okta to sign in and grant consent. Most platforms use this pattern. See the examples for [Claude Code](#claude-code) (config-file based, public client) and [Claude Enterprise and Claude.ai](#claude-enterprise-and-claudeai) (admin-console based, confidential client).
- **Static bearer tokens**: An admin mints a long-lived, Agent Gateway-scoped token and distributes it to the agent directly, with no interactive OAuth flow. See the [Kiro](#kiro) example.

Claude Code, Claude Enterprise and Claude.ai, and Kiro are covered in detail next because together they walk through every configuration surface that Agent Gateway supports: a config file, an admin console, and a static token. Other platforms follow these same two patterns through their own MCP configuration surface.

For your specific platform's configuration location and auth method, see [Other supported platforms](#other-supported-platforms).

---

### Claude Code

Claude Code supports MCP server configuration through a project-level `.mcp.json` file or a global `~/.claude/mcp.json` file.

#### Configure Claude Code

1. Open (or create) `.mcp.json` in your project root or the global `~/.claude/mcp.json`.
1. Add the Agent Gateway as an MCP server:

   ```json
   {
     "mcpServers": {
       "{gatewayName}": {
         "url": "https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}",
         "auth": {
           "type": "oauth",
           "clientId": "{clientId}"
         }
       }
     }
   }
   ```

1. Start Claude Code. On the first tool call, Claude Code opens the Okta sign-in page for you to sign in and grant consent.
1. After authorization, Claude Code stores the token and can call tools through the Agent Gateway.

> **Note**: The Claude Code VS Code extension uses the same MCP configuration as Claude Code. It uses Claude's MCP subsystem, not VS Code's native MCP policy.

#### Recommended enforcement

Deploy a managed `mcp.json` file through your MDM solution (Jamf, Intune, or similar) to lock down the Agent Gateway endpoint and prevent developers from modifying or adding MCP servers.

---

### Claude Enterprise and Claude.ai

Claude Enterprise and Claude.ai support MCP server configuration through the tenant admin console.

1. Sign in to your Claude.ai tenant as an admin.
1. Go to **Settings** > **Custom Connectors**.
1. Click **Add connector**.
1. Enter the Agent Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`.
1. Select **OAuth 2.0** and enter the `client_id`. Add a client secret if your org requires confidential clients.
1. Save the connector. It becomes available to all users in the tenant.

---

### Kiro

Kiro connects to MCP servers using a static bearer token injected through a request header. An admin must mint an Agent Gateway-scoped Okta access token and distribute it through a managed configuration file.

> **Note**: Kiro doesn't perform the OAuth flow directly. Rotate the token on a schedule consistent with your org's token-lifetime policy.

1. Mint an Agent Gateway-scoped access token for the Kiro agent using the Okta Admin API or Admin Console.
1. Create an MCP configuration file:

   ```json
   {
     "mcpServers": {
       "{gatewayName}": {
         "url": "https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}",
         "headers": {
           "Authorization": "Bearer {token}"
         }
       }
     }
   }
   ```

1. Deploy the configuration file through MDM to all Kiro instances in your org.

---

### Other supported platforms

The following platforms use the same OAuth 2.0/2.1 patterns described earlier, through their own MCP configuration surface. Enter your Agent Gateway URL and `client_id` (and client secret, if required) wherever each platform manages MCP servers or connectors.

| Platform | MCP configuration location | Auth method | Notes |
| --- | --- | --- | --- |
| VS Code with GitHub Copilot | Copilot enterprise MCP registry (GitHub org settings > **Copilot** > **MCP servers**) or local VS Code `settings.json` | OAuth 2.0, `client_id` | Publishes its own CIMD URL, so per-tenant provisioning isn't required after CIMD support reaches GA. Use the enterprise registry to restrict approved servers org-wide (recommended enforcement). |
| Cursor | Cursor settings > **Tools & Integrations** > **MCP** | OAuth 2.0, `client_id` | Attempts Dynamic Client Registration by default, which Okta doesn't support. Use a pre-configured `client_id` or static bearer token instead. Recommended enforcement: Cursor Business/Enterprise **MCP allowlist**. |
| Codex (OpenAI) | `managed_config.toml` | OAuth 2.0 with PKCE, public client (no secret) | Recommended enforcement: deploy the config through MDM with a requirements allowlist restricting approved servers. |
| Microsoft Copilot Studio | Agent **Actions** > **Add an action** > **Call an external service (MCP)** | OAuth 2.0, `client_id` + client secret | Recommended enforcement: Power Platform Advanced Connector Policies. |
| Agentforce (Salesforce) | Salesforce **External Client Apps** | OAuth 2.0 with PKCE, through a pre-registered External Client App | Create the External Client App first, then register its Consumer Key as the `client_id` in Okta Universal Directory. Recommended enforcement: manage access through **External Client Apps**. |
| ServiceNow AI Agent Studio | **AI Agent Studio** > **MCP Servers** | OAuth 2.1, `client_id` + client secret (or static bearer token) | |
| Glean | Glean admin console > **Actions** > **MCP action pack** | OAuth 2.0, `client_id` (add a client secret for confidential clients) | |
| n8n | **MCP Client Tool** node, using an OAuth2 API credential | OAuth 2.0, `client_id` + client secret | Requires manually entering your org's authorization and token URLs (`https://{yourOktaDomain}/oauth2/{authServerId}/v1/authorize` and `.../token`), rather than just the Agent Gateway URL. |

## Next steps

After your agent is connected to Agent Gateway:

- Verify the connection by running a tool call and confirming the response.
- Review agent activity in the Okta System Log under **AI Agent activity** (admin events).
- To adjust which tools the agent can call, update the tool selection on the Agent Gateway. See [Manage tool access in Agent Gateway](link to API doc??).
- To revoke the agent's access, deactivate the agent-to-agent gateway resource connection in the Okta Admin Console.

## Related topics

- [Okta Agent Gateway](link to concept doc??)
- [Configure Agent Gateway using the Okta APIs](link to ??)
