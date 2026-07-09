---
title: Okta Agent Gateway
meta:
  - name: description
    content: Learn how Okta Agent Gateway enforces identity and policy on AI agent tool calls to enterprise MCP servers.
---

<ApiLifecycle access="beta" />

# Okta Agent Gateway

Okta Agent Gateway is an identity-native proxy that sits between AI agents and the enterprise tools that they call. It aggregates tools from multiple remote MCP servers behind a single Okta-secured endpoint, enforces identity and policy on every tool call, and produces a unified audit trail. This extends the Okta identity fabric to agents that the enterprise doesn't build or control.

## The problem it solves

For AI agents that an enterprise builds in-house, the agent's code can be instrumented to call Okta directly. It can request tokens, respect scopes, and log actions. Most enterprise AI agents, however, are configured rather than coded. The enterprise doesn't own the agent's code and can't add Okta calls to it.

Without something in the path of the agent's outbound requests, there's no way to enforce Okta on those agents. The typical workaround is giving the agent a long-lived API key or service account credential.

This approach provides broad, standing access with no per-call policy enforcement, no per-user attribution, and no audit trail. It also gives the agent direct access to the credential, which prompt-injection, log leaks, or a compromised model could use to steal it.

### The solution

Agent Gateway solves this by sitting in the path of agent request to connected resources that flow through the gateway. Agents authenticate to the gateway with an Okta-issued token. The gateway enforces policy, retrieves downstream credentials on behalf of the agent, and injects them into outbound calls. As a result, the agent never holds or sees the credentials for the tools that it uses.

## How it works

Agent Gateway follows a decoupled architecture with two layers:

* **Control plane (Okta)**: Admins configure gateways (virtual MCP servers), resource connections, tool capabilities, and authorization policy through the Admin Console or the Okta APIs. The control plane stores all configuration. The gateway (data plane) fetches it and refreshes it periodically, so that configuration changes propagate without agent-side reconfiguration.
* **Data plane (gateway relay)**: An Okta-hosted relay container that handles live agent traffic. It validates inbound tokens and consults the configuration loaded from the control plane. It then retrieves downstream credentials through OAuth Security Token Service, injects them into outbound calls, and proxies requests to remote MCP servers.

The two layers are independently scalable. The data plane picks up configuration changes in the control plane without agent-side reconfiguration.

### Agent Gateway flow

The following diagram describes the Agent Gateway flow when an agent invokes a tool through the gateway.

<div class="full">

   ![Sequence diagram that displays the interactions between an agent, the Okta custom and org auth servers, agent gateway, and the remote mcp server"](/img/authorization/somefilename.png)

   <!--
      source image:
   -->

</div>

<!-- Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true

participant "Agent\n(ex: Claude Code)" as Agent
participant "Okta custom authorization server" as CAS
participant "Gateway" as GW
participant "Okta org authorization server" as OrgAS
participant "Upstream MCP Server\n(ex: GitHub)" as Upstream

== Inbound: Agent authenticates to gateway ==

Agent -> CAS: GET /oauth2/{asId}/v1/authorize\n(authorization code + PKCE)
CAS -> Agent: Authorization code
Agent -> CAS: POST /oauth2/{asId}/v1/token\n(code + code_verifier)
CAS -> Agent: Access token (scoped to gateway)
Agent -> GW: tools/list or tools/call\n(Bearer: access token)
GW -> GW: Validate token against linked custom auth server\nCheck vMCP is ACTIVE

== Outbound: Gateway obtains downstream credential ==

GW -> OrgAS: POST /oauth2/v1/token\n(OAuth STS token exchange)
OrgAS -> OrgAS: Validate delegation link\nValidate resource connection

alt First use - no stored refresh token
    OrgAS -> Agent: interaction_required + consent URL
    Agent -> Upstream: User authenticates\nand consents in browser
    Upstream -> OrgAS: Refresh token stored
    GW -> OrgAS: Retry token exchange
end

OrgAS -> GW: Downstream access token
GW -> Upstream: Tool call\n(Bearer: downstream access token)
Upstream -> Agent: Response

@enduml
-->

When an agent invokes a tool through the Agent Gateway, the following sequence occurs:

1. The agent requests an authorization code from the Okta custom authorization server using the authorization code flow with PKCE. The authorization server returns an authorization code to the agent.
1. The agent exchanges the authorization code and PKCE code verifier for an access token. The authorization server returns an access token scoped to the Agent Gateway.
1. The agent sends a `tools/list` or `tools/call` request to the Agent Gateway with the access token as a Bearer token. The gateway validates the token against the linked authorization server and checks that the [virtual MCP server (vMCP)](#key-concepts) is active.
1. The gateway sends an OAuth Security Token Service token exchange request to the Okta org authorization server. It presents the agent's access token as the subject token. The authorization server validates the delegation link, confirming that the agent's OAuth 2.0 client is authorized to delegate to this vMCP. Then, it validates that the resource connection to the remote MCP server is active.
1. (First use only) If the user has no stored refresh token for the remote MCP server, the org authorization server returns an `interaction_required` response with a consent URL. See the [Token exchange flow for OAuth Security Token Service](/docs/guides/ai-agent-token-exchange/resourceserver/main/) for an example of this entire flow.
1. The agent directs the user to the consent URL, where the user authenticates and consents to the remote MCP server. The remote MCP server returns a refresh token, which Okta stores.
1. (First use only) The gateway retries the token exchange.
1. The org authorization server returns a downstream access token for the remote MCP server.
1. The gateway injects the downstream access token into the outbound call and proxies the request to the remote MCP server. The remote MCP server returns the response to the agent.

> **Note:** At no point does the agent hold a credential for the remote service.

## Key concepts

Agent Gateway is built around a small set of concepts that govern how agents, tools, and credentials relate to each other. The following terms appear throughout the Admin Console, the APIs, and this documentation.

* **Virtual MCP server**: A virtual MCP server (vMCP) is the Okta-managed Agent Gateway endpoint. It aggregates tools from one or more remote MCP servers and exposes them to agents as a single MCP endpoint at `https://{subdomain}.gateway.okta.com/mcp/{resourcePath}`. Agents discover available tools and invoke them through this URL. They don't connect to remote MCP servers directly. A vMCP has a lifecycle. It's created in `INACTIVE` status and must be explicitly activated before agents can connect. You can deactivate it to suspend access without deleting configurations.
* **Resource connections**: [Resource connections](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) are the explicit, governable links between entities in the Agent Gateway model. The connection must be active for tool calls to succeed at runtime. Resource connections are created and managed independently of each other and of the vMCP's own lifecycle.

The link between the gateway and a remote MCP server is one example of a resource connection. It authorizes the gateway to obtain an access token for that remote MCP server through the OAuth Security Token Service token exchange. It also enables the gateway to forward tool calls to that server.

* **Delegation links**: A delegation link declares that a specific OAuth 2.0 client (the MCP client app) is authorized to delegate to a specific vMCP on behalf of users. The Okta org authorization server evaluates delegation links during the OAuth Security Token Service token exchange. Without a delegation link, the token exchange fails, and the agent can't invoke tools.

The link between an agent and the Agent Gateway** is one example of a delegation link. It authorizes a specific agent to use a specific vMCP. Deactivating this connection immediately revokes that agent's access without affecting other agents or the gateway itself.

* **Tools**: An admin selects specific tools from remote MCP servers to expose through a vMCP. Admins choose which tools to surface per connection. Upstream MCP servers often expose dozens of tools. Exposing all of them would expand the agent's context window unnecessarily and increase the attack surface. Admins choose which tools to surface per resource connection. Tool limits are enforced per vMCP and per org (both configurable), not per connection. Aliases must be unique within a vMCP.
* **Custom authorization server**: Each vMCP is protected by an Okta custom authorization server. The gateway validates all inbound agent tokens against the linked custom authorization server. Only one custom authorization server per vMCP is supported. The custom authorization server also issues the access tokens that agents use to authenticate to the gateway.
* **WorkloadPrincipal**: When an admin registers an AI agent in Okta Universal Directory, it's created as a `WorkloadPrincipal`, a first-class managed identity in Okta that's separate from human users and traditional app service accounts. The agent's identity is tied to its `WorkloadPrincipal`, which means audit logs attribute tool calls to the agent regardless of credential rotation. The vMCP itself also has a `WorkloadPrincipal`. This gives Agent Gateway a dual nature. It's a resource that agents connect to. It's also a workload principal in its own right when authenticating to remote MCP servers.

### Other related concepts

The following concepts aren't part of Agent Gateway itself, but they intersect with it and often come up in the same conversations. Understanding how they differ from Agent Gateway's model helps you choose the right approach for a given agent.

* **Cross-App Access (XAA)**: An alternative approach to agent identity that delivers Okta-issued tokens to the agent, which then calls remote services directly. XAA is better suited to agents that the enterprise builds and controls. Unlike Agent Gateway, XAA doesn't sit in the path of every request. As a result, it can't enforce tool-level policy or produce a unified audit trail across different upstreams. For third-party agents the enterprise can't instrument, Agent Gateway is the appropriate choice.

* **Okta for AI Agents**: The broader Okta product surface for securing AI agents, of which Agent Gateway is one component. Agent Gateway extends Okta for AI Agent's identity fabric specifically to agents that the enterprise doesn't build or control.

* **CIMD (Client ID Metadata Document)**: A mechanism by which an agent vendor publishes a single metadata URL that serves as the agent's OAuth 2.0 client identity across customer orgs. With CIMD, an admin doesn't need to provision an OAuth client in Okta per agent per tenant. Okta accepts the vendor's CIMD URL as the agent's identity. CIMD URLs are globally unique. You can have only one agent with a specific URL per org.

## What you can connect

Agent Gateway applies wherever you can configure an AI agent to call an external MCP endpoint:

* **Standalone SaaS agents**: Agents delivered as a configured product, for example, Glean or Sierra.
* **Local coding agents**: Agents running on developer machines, for example, Claude Code, Cursor, or Codex.
* **Agent builder platforms**: Platforms where enterprises build and deploy their own agents, for example, Agentforce, Copilot Studio, or Bedrock AgentCore.
* **Embedded agents with external tool support**: Agents embedded in products that support external MCP configuration, for example, Microsoft Copilot or Atlassian Rovo.
* **Homegrown agents**: Custom agents built in-house, after their downstream services are wrapped as MCP servers.

The exception is embedded agents in pure silo mode. These are agents that only access their host app's own data, for example, Zoom AI Companion or Workday AI. Those are governed through the host app's own admin controls and don't route external MCP traffic.

## Limitations

| Limitation | Impact |
| --- | --- |
| Tools only | MCP resources, prompts, sampling, completion, logging, and roots aren't supported. Upstream MCPs that rely on these capabilities have reduced functionality or break silently when routed through the gateway. |
| Stateless sessions | Every tool call initiates a new session with the remote MCP server. MCPs that require session state, such as multi-step workflows, resource subscriptions, and paginated responses, break silently. |
| Remote MCP Servers only | The gateway relay makes outbound calls from the Okta cloud. Upstream MCP servers that run inside a private network aren't reachable. Examples include servers behind a corporate firewall or in an on-premises data center. The gateway has no way to connect to infrastructure outside of the Okta hosted environment. |
| OAuth 2.0/Bearer auth only | Upstream MCP servers must accept OAuth 2.0 Bearer tokens, which the gateway obtains through the OAUth Security Token Service token exchange and injects into outbound calls. Upstreams that require API keys, mTLS, vaulted credentials, or custom header authentication aren't supported. |
| No real-time token revocation | Revoked agent tokens remain valid at the gateway until they expire naturally. Effective revocation time equals the shorter of the inbound and cached downstream token lifetimes. |
| Cloud-only deployment | The gateway is hosted in the Okta Workforce domain. You can't run your own copy of the gateway. |
| Dynamic Client Registration (DCR) not supported | Agents that rely on DCR for OAuth 2.0 client registration can't use the gateway without reconfiguration. The recommended alternative is CIMD-based registration or a pre-registered client ID. |
| MCP protocol only | The gateway calls remote MCP servers, not raw REST or GraphQL APIs. To connect a REST or GraphQL API, wrap it in an MCP server first, then connect the gateway to that server. |

## Related topics

* Configure Okta Agent Gateway using the APIs
* Configure your AI agent to use Agent Gateway
* Virtual MCP Connections API
* Virtual MCP Registration API
* Virtual MCP Settings API
