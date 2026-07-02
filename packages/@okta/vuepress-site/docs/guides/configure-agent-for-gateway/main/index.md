---
title: Configure an AI agent for Agent Gateway
excerpt: Configure supported AI agents to authenticate with Okta and call tools through Agent Gateway.
---

Configure your AI agent to call tools through Okta Agent Gateway. The Gateway exposes a single Okta-secured MCP endpoint and you can point any agent that supports an external MCP endpoint at it without code changes.

> **Note**: Agent Gateway is available with the Okta for AI Agents subscription. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

- Locate your Gateway URL and OAuth client credentials.
- Configure your AI agent to authenticate with Okta and call tools through the Gateway.
- Apply the recommended enterprise security lockdown for your platform.

#### What you need

- An Okta org subscribed to Okta for AI Agents.
- An Agent Gateway that's been created and activated. See [Create an Agent Gateway](#) (link TBD).
- Your Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`
- The OAuth `client_id` assigned to your agent in Okta Universal Directory.

---

## Overview

Each Agent Gateway exposes one MCP endpoint. Point any supported agent at that URL and the Gateway handles tool aggregation, identity enforcement, credential injection, and auditing with no changes to the agent's code.

Agents authenticate using authorization code with PKCE. Okta issues a short-lived, Gateway-scoped access token. The agent presents that token on every tool call. The Gateway brokers downstream credentials at runtime inside Okta. The agent never holds them.

### Client identity methods

The agent identifies itself as an OAuth client using a pre-registered `client_id`. An admin provisions an OAuth client in the Admin Console and distributes the `client_id` to the agent.

<!-- | CIMD (Client ID Metadata Document) | The platform publishes a vendor CIMD URL, so no per-tenant client provisioning is required.  | -->

> **Note**: Okta doesn't accept Dynamic Client Registration for Agent Gateway. Platforms that attempt to use Dynamic Client Registration must fall back to a pre-registered `client_id`.

need a heading here

## Claude Code

Claude Code supports MCP server configuration through a project-level `.mcp.json` file or a global `~/.claude/mcp.json` file.

### Configure Claude Code

1. Open (or create) `.mcp.json` in your project root, or the global `~/.claude/mcp.json`.
1. Add the Gateway as an MCP server:

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
1. After authorization, Claude Code stores the token and can call tools through the Gateway.

### Enterprise lockdown (recommended)

Deploy a managed `mcp.json` file through your MDM solution (Jamf, Intune, or similar) to lock down the Gateway endpoint and prevent developers from modifying or adding MCP servers.

## Claude Enterprise and Claude.ai

Claude Enterprise and Claude.ai support MCP server configuration through the tenant admin console.

1. Sign in to your Claude.ai tenant as an admin.
1. Go to **Settings** > **Custom Connectors**.
1. Click **Add connector**.
1. Enter the Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`.
1. Select **OAuth 2.0** and enter the `client_id`. Add a client secret if your org requires confidential clients.
1. Save the connector. It becomes available to all users in the tenant.

## VS Code with GitHub Copilot

STOPPED HERE

VS Code publishes its own CIMD URL, which means no per-tenant client provisioning is required when CIMD support is available at GA.

### Configure using the Copilot enterprise MCP registry (recommended)

Use the Copilot enterprise MCP registry to enforce a list of approved MCP servers across your organization.

1. In your GitHub organization settings, go to **Copilot** > **MCP servers**.
1. Click **Add MCP server**.
1. Enter the Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`.
1. Select **OAuth** as the authentication type.
1. Save. The Gateway is now available to all Copilot users in the organization, and only registry-listed servers are permitted.

### Configure locally

1. Open VS Code settings (`Cmd+,` / `Ctrl+,`) and search for **MCP servers**.
1. Click **Edit in settings.json**.
1. Add the Gateway server:

   ```json
   {
     "github.copilot.mcpServers": {
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

---

## VS Code with Claude Code extension

The Claude Code VS Code extension uses Claude's MCP subsystem, not VS Code's native MCP policy. Configuration is identical to [Claude Code](#claude-code) above.

---

## Cursor

Cursor attempts DCR (Dynamic Client Registration) by default, which Okta doesn't support. Use a pre-configured OAuth client or static bearer token instead.

> **Note**: DCR compatibility with Cursor is under evaluation. Check with your Okta admin for the current recommended configuration path.

1. Open Cursor settings and navigate to **Tools & Integrations** > **MCP**.
1. Click **Add new MCP server**.
1. Enter the Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`.
1. Select **OAuth** as the authentication type and enter the `client_id`.

### Enterprise lockdown (recommended)

Use the Cursor cloud admin **MCP allowlist** to restrict which MCP servers are permitted across your organization. This option is available on Cursor Business and Enterprise plans.

---

## Codex (OpenAI)

Codex uses a `managed_config.toml` configuration file and supports public OAuth clients with PKCE only — no client secret is used.

1. Open (or create) `managed_config.toml` in your Codex configuration directory.
1. Add the Gateway as an MCP server:

   ```toml
   [[mcp_servers]]
   name = "{gatewayName}"
   url = "https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}"
   client_id = "{clientId}"
   ```

1. Codex initiates PKCE authorization on the first tool call.

### Enterprise lockdown (recommended)

Deploy `managed_config.toml` through MDM and configure a requirements allowlist to restrict agents to approved MCP servers.

---

## Microsoft Copilot Studio

Copilot Studio uses manually configured OAuth credentials to connect to external MCP servers.

1. In Copilot Studio, open your agent and go to **Actions**.
1. Click **Add an action** > **Call an external service (MCP)**.
1. Enter the Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`.
1. Select **OAuth 2.0** as the authentication type.
1. Enter the `client_id` and client secret from your agent's Okta app registration.
1. Save the action.

### Enterprise lockdown (recommended)

Apply **Power Platform Advanced Connector Policies** to restrict which MCP endpoints agents in your tenant are permitted to call.

---

## Agentforce (Salesforce)

Agentforce uses a pre-registered External Client App in Salesforce to authenticate with Okta using authorization code with PKCE.

1. In Salesforce Setup, search for **External Client Apps** and click **New**.
1. Enter a name for the client app, such as "Okta Agent Gateway".
1. Under **OAuth Settings**, configure the following:
   - **Callback URL**: The callback URL provided by Salesforce for this app.
   - **Selected OAuth Scopes**: Add the scopes required for your Gateway.
1. Save the External Client App and copy the **Consumer Key**. This value is your `client_id`.
1. In the Okta Admin Console, register this `client_id` as the agent's OAuth client in Universal Directory.
1. In Agentforce, configure the agent to use the External Client App and set the Gateway as the MCP endpoint.

### Enterprise lockdown (recommended)

Manage access through **Salesforce Setup** > **External Client Apps** to control which agents and users can invoke the Gateway.

---

## ServiceNow AI Agent Studio

ServiceNow supports OAuth 2.1 or a static bearer token to connect to external MCP servers.

1. In ServiceNow, go to **AI Agent Studio** > **MCP Servers**.
1. Click **New**.
1. Enter the Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`.
1. Select **OAuth 2.1** as the authentication type.
1. Enter the `client_id` and client secret from your agent's Okta app registration.
1. Click **Test connection** to verify the configuration.
1. Save.

---

## Glean

Glean supports both public (PKCE-only) and confidential (client ID and secret) OAuth clients.

1. Sign in to the Glean admin console.
1. Go to **Actions** > **MCP action pack**.
1. Click **Add MCP server**.
1. Enter the Gateway URL: `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`.
1. Select **OAuth** and enter the `client_id`. Add a client secret if your org requires confidential clients.
1. Save.

---

## Kiro

Kiro connects to MCP servers using a static bearer token injected via a request header. An admin must mint a Gateway-scoped Okta access token and distribute it through a managed configuration file.

> **Note**: Kiro doesn't perform the OAuth flow directly. Rotate the token on a schedule consistent with your org's token-lifetime policy.

1. Mint a Gateway-scoped access token for the Kiro agent using the Okta Admin API or Admin Console.
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

1. Deploy the configuration file through MDM to all Kiro instances in your organization.

---

## n8n

n8n connects to external MCP servers using its **MCP Client Tool** node, which supports OAuth 2 credentials or a static bearer token.

1. In n8n, go to **Credentials** and click **Add credential**.
1. Select **OAuth2 API** as the credential type.
1. Configure the credential:
   - **Authorization URL**: `https://{yourOktaDomain}/oauth2/{authServerId}/v1/authorize`
   - **Access Token URL**: `https://{yourOktaDomain}/oauth2/{authServerId}/v1/token`
   - **Client ID**: The `client_id` from your agent's Okta app registration.
   - **Client Secret**: The client secret (for confidential clients).
   - **Scope**: The scopes granted on the Gateway's custom authorization server.
1. Save the credential.
1. In your workflow, add an **MCP Client Tool** node.
1. Set the **Server URL** to `https://gateway.{yourOktaDomain}/mcp/servers/{gatewayName}`.
1. Select the OAuth2 credential you created.

---

## Next steps

After your agent is connected to Agent Gateway:

- Verify the connection by running a tool call and confirming the response.
- Review agent activity in the Okta System Log under **AI Agent activity** (admin events).
- To adjust which tools the agent can call, update the tool selection on the Gateway. See [Manage tool access in Agent Gateway](#) (link TBD).
- To revoke the agent's access, deactivate the agent-to-Gateway resource connection in the Okta Admin Console.
