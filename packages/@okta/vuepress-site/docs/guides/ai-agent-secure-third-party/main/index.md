---
title: Secure third-party AI agents
excerpt: Understand what's required to secure any third-party or imported AI agent with Okta, and how the pieces fit together.
layout: Guides
---
<ApiLifecycle access="ie" />

Okta secures third-party and imported AI agents with delegated user identity. When a user signs in with Okta, the agent exchanges that user's identity for a short-lived, scoped access token, and then uses it to call protected resources on the user's behalf.

This page is a platform-agnostic overview of that integration. It explains the two parts every integration needs, and points you to the concrete implementation steps for your platform.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

Securing any agent breaks into two parts:

* **Okta authentication (platform-agnostic).** The agent performs a two-step token exchange — it turns the user's `id_token` into an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server, then turns the ID-JAG into a scoped `access_token` at a custom authorization server. This logic is identical for every agent, so you implement it once as a reusable module.

* **Platform integration (platform-specific).** The agent calls the token exchange and then attaches the resulting access token to the calls it makes, for example, as a session attribute, or as a request header. Exactly how depends on the platform.

<!-- TODO: Replace this text-based diagram with an image.

```text
User
  signs in with Okta -> receives id_token
    |
    v
Okta authentication (platform-agnostic)
  Step 1: id_token  ->  ID-JAG        (Org AS:    /oauth2/v1/token)
  Step 2: ID-JAG    ->  access_token  (Custom AS: /oauth2/{custom-as-id}/v1/token)
    |
    v
Platform integration (platform-specific)
  attach access_token to the agent's downstream calls
    |
    v
Okta-protected resource (API, MCP server, or another agent)
  Authorization: Bearer <access_token>
```-->

For the underlying concepts and the token exchange API details, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## What every integration needs

Regardless of platform, securing a third-party or imported AI agent requires the same two pieces of work:

1. **Okta configuration.** Set up an OIDC web app, a custom authorization server and scope, an AI Agent identity, and an access policy rule that permits the exchange. This work is identical for every platform. See [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).
1. **Agent code.** Add the two-step token exchange to your agent (the same reusable logic on every platform), then attach the resulting access token to the agent's downstream calls (specific to your platform's SDK).

## Platform guides

Use the guide for your agent's platform to implement the token exchange and platform integration end to end:

* [Secure an Amazon Bedrock AgentCore agent](/docs/guides/ai-agent-secure-amazon-bedrock/)
* [Secure AWS Bedrock Classic Agents with Okta](/docs/guides/ai-agent-secure-aws-bedrock/)
* [Secure Azure AI Foundry agents with Okta](/docs/guides/ai-agent-secure-azure/)

If your platform isn't listed, use these guides as a reference for the pattern: configure the same Okta objects, reuse the same token exchange module, then attach the access token using your platform's own tools.

## Next steps

After your agent can authenticate as a user and call protected resources, define which resources and scopes it's permitted to reach. See [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
* [Secure an Amazon Bedrock AgentCore agent](/docs/guides/ai-agent-secure-amazon-bedrock/)
* [Secure AWS Bedrock Classic Agents with Okta](/docs/guides/ai-agent-secure-aws-bedrock/)
* [Secure Azure AI Foundry agents with Okta](/docs/guides/ai-agent-secure-azure/)
