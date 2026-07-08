---
title: Okta Agent Gateway
meta:
  - name: description
    content: Learn how Okta Agent Gateway enforces identity and policy on AI agent tool calls to enterprise MCP servers.
---

# Okta Agent Gateway

> **Note:** Okta Agent Gateway is a Research Release feature.

Okta Agent Gateway is an identity-native proxy that sits between AI agents and the enterprise tools that they call. It aggregates tools from multiple upstream MCP servers behind a single Okta-secured endpoint, enforces identity and policy on every tool call, and produces a unified audit trail. This extends Okta's identity fabric to agents that the enterprise doesn't build or control.

## The problem it solves

For AI agents that an enterprise builds in-house, the agent's code can be instrumented to call Okta directly. It can request tokens, respect scopes, and log actions. Most enterprise AI agents, however, are configured rather than coded. The enterprise doesn't own the agent's code and can't add Okta calls to it.

Without something in the path of the agent's outbound requests, there's no way to enforce Okta on those agents at all. The typical workaround is giving the agent a long-lived API key or service account credential. This approach provides broad, standing access with no per-call policy enforcement, no per-user attribution, and no audit trail. It also puts the credential directly in the agent's hands, where prompt injection, log leakage, or a compromised model can turn it into an exfiltration vector.

Agent Gateway solves this by sitting in the path of every agent request to a configured resource. Agents authenticate to the gateway with an Okta-issued token. The gateway enforces policy, retrieves downstream credentials on behalf of the agent, and injects them into outbound calls. As a result, the agent never holds or sees the credentials for the tools that it uses.

## How it works

Agent Gateway follows a decoupled architecture with two layers:

* **Control plane (Okta)**: Admins configure virtual MCP servers, resource connections, tool capabilities, and authorization policy through the Admin Console or the Okta APIs. The control plane stores all configuration and serves it to the gateway at startup.
* **Data plane (gateway relay)**: An Okta-hosted relay container handles live agent traffic. It validates inbound tokens, consults the configuration loaded from the control plane, retrieves downstream credentials through OAuth STS, injects them into outbound calls, and proxies requests to upstream MCP servers.

The two layers are independently scalable. The data plane picks up configuration changes in the control plane without agent-side reconfiguration.

### Agent Gateway flow

The following diagram describes the Agent Gateway flow when an agent invokes a tool through the gateway.

<!-- Diagram placeholder: Agent Gateway flow -->

When an agent invokes a tool through the gateway, the following sequence occurs:

1. The agent requests an authorization code from the Okta custom authorization server using the authorization code flow with PKCE. The authorization server returns an authorization code to the agent.
1. The agent exchanges the authorization code and PKCE code verifier for an access token. The authorization server returns an access token scoped to the gateway.
1. The agent sends a `tools/list` or `tools/call` request to the gateway with the access token as a Bearer token. The gateway validates the token against the linked authorization server and checks that the vMCP is active.
1. The gateway sends an OAuth STS token exchange request to the Okta org authorization server, presenting the agent's access token as the subject token. The authorization server validates the delegation link, confirming that the agent's OAuth client is authorized to delegate to this vMCP. Then, it validates that the resource connection to the upstream MCP server is active.
1. (First use only) If the user has no stored refresh token for the upstream MCP server, the org authorization server returns an `interaction_required` response with a consent URL. See the Token exchange flow for OAuth STS for an example of this entire flow.
1. The agent directs the user to the consent URL, where the user authenticates and consents to the upstream MCP server. The upstream MCP server returns a refresh token, which Okta stores.
1. (First use only) The gateway retries the token exchange.
1. The org authorization server returns a downstream access token for the upstream MCP server.
1. The gateway injects the downstream access token into the outbound call and proxies the request to the upstream MCP server. The upstream MCP server returns the response to the agent.

> **Note:** At no point does the agent hold a credential for the upstream service.

## Key concepts

### Virtual MCP server

A virtual MCP server (vMCP) is the Okta-managed gateway endpoint. It aggregates tools from one or more upstream MCP servers and exposes them to agents as a single MCP endpoint at `https://{subdomain}.gateway.okta.com/mcp/{resourcePath}`. Agents discover available tools and invoke them through this URL. They don't connect to upstream MCP servers directly.

A vMCP has a lifecycle. It's created in `INACTIVE` status and must be explicitly activated before agents can connect. You can deactivate it to suspend access without deleting configurations.

### Resource connections

Resource connections are the explicit, governable links between entities in the gateway model. There are two types:

* **Agent to gateway**: Authorizes a specific agent to use a specific vMCP. Deactivating this connection immediately revokes that agent's access without affecting other agents or the gateway itself.
* **Gateway to upstream MCP server**: Authorizes the gateway to obtain an access token for that upstream MCP server through the OAuth STS token exchange. It also enables the gateway to forward tool calls to that server. The connection must be active for tool calls to succeed at runtime.

Resource connections are created and managed independently of each other and of the vMCP's own lifecycle.

### Delegation links

A delegation link declares that a specific OAuth client (the MCP client app) is authorized to delegate to a specific vMCP on behalf of users. The Okta org authorization server evaluates delegation links during the OAuth STS token exchange. Without a delegation link, the token exchange fails, and the agent can't invoke tools.

### Capabilities

Capabilities are the specific tools from upstream MCP servers that an admin selects to expose through a vMCP. Admins choose which tools to surface per connection. Upstream MCP servers often expose dozens of tools. Exposing all of them would expand the agent's context window unnecessarily and increase the attack surface. Capabilities are scoped per resource connection, with a maximum of 100 per connection. Only tool capabilities are supported.

You can give each capability an alias that overrides the upstream tool name when it's exposed through the vMCP. Aliases must be unique within a vMCP.

### Custom authorization server

Each vMCP is protected by an Okta custom authorization server. The gateway validates all inbound agent tokens against the linked custom authorization server. Only one custom authorization server per vMCP is supported. The custom authorization server also issues the access tokens that agents use to authenticate to the gateway.

### WorkloadPrincipal

When an admin registers an AI agent in Okta Universal Directory, it's created as a `WorkloadPrincipal`, a first-class managed identity in Okta that's separate from human users and traditional app service accounts. The agent's identity is tied to its `WorkloadPrincipal`, which means audit logs attribute tool calls to the agent regardless of credential rotation.

## What you can connect

Agent Gateway applies wherever you can configure an AI agent to call an external MCP endpoint:

* **Standalone SaaS agents**: Agents delivered as a configured product, for example, Glean or Sierra.
* **Local coding agents**: Agents running on developer machines, for example, Claude Code, Cursor, or Codex.
* **Agent builder platforms**: Platforms where enterprises build and deploy their own agents, for example, Agentforce, Copilot Studio, or Bedrock AgentCore.
* **Embedded agents with external tool support**: Agents embedded in products that support external MCP configuration, for example, Microsoft Copilot or Atlassian Rovo.
* **Homegrown agents**: Custom agents built in-house, after their downstream services are wrapped as MCP servers.

The exception is embedded agents in pure silo mode. These are agents that only access their host app's own data, for example, Zoom AI Companion or Workday AI. Those are governed through the host app's own admin controls and don't route external MCP traffic.

Realizing the full benefit of Agent Gateway requires the agent to support OAuth 2.1 authentication. Agents limited to static API key authentication can connect but won't support per-user attribution or CIMD-based registration.

## Limitations

| Limitation | Impact |
| --- | --- |
| Tools only | MCP resources, prompts, sampling, completion, logging, and roots aren't supported. Upstream MCPs that rely on these capabilities have reduced functionality or break silently when routed through the gateway. |
| Stateless sessions | Every tool call initiates a new session with the upstream MCP server. MCPs that require session state, such as multi-step workflows, resource subscriptions, and paginated responses, break silently. |
| Cloud-reachable upstreams only | The gateway relay makes outbound calls from Okta's cloud. Upstream MCP servers that run inside a private network, such as behind a corporate firewall or in an on-premises data center, aren't reachable because the gateway has no way to connect to infrastructure outside of Okta's hosted environment. |
| OAuth/Bearer auth only | Upstream MCP servers must accept Bearer tokens. API key authentication, mTLS, and OPA-vaulted credentials aren't supported at either discovery time or runtime. |
| No real-time token revocation | Revoked agent tokens remain valid at the gateway until they expire naturally. Effective revocation time equals the shorter of the inbound and cached downstream token lifetimes. |
| Cloud-only deployment | The gateway is hosted in the Okta Workforce domain. No on-premises, sidecar, or self-hosted deployment is supported. |
| Dynamic Client Registration (DCR) not supported | Agents that rely on DCR for OAuth client registration can't use the gateway without reconfiguration. The recommended alternative is CIMD-based registration or a pre-registered client ID. |

## Related topics

* Configure Okta Agent Gateway using the APIs
* Configure your AI agent to use Agent Gateway
* Virtual MCP Connections API
* Virtual MCP Registration API
* Virtual MCP Settings API
