---
title: Secure third-party AI agents
excerpt: Learn how to secure third-party and imported AI agents with Okta
layout: Guides
---
<ApiLifecycle access="ie" />

Okta's AI Agents feature secures third-party and imported AI agents with delegated user identity. When a user signs in with Okta, your agent exchanges that user's identity for a short-lived, scoped access token, and then uses it to call protected resources on the user's behalf.

This guide is the platform-agnostic overview of that integration. It explains what you do from an Okta perspective and, at a high level, what an agent developer does in code. The specifics of wiring the access token into a running agent depend on your agent platform, and you implement them using your platform's own tools and documentation.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. See your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand the two parts of securing an AI agent: Okta authentication (the same for every platform) and platform integration (specific to your agent's runtime).
* Know what to configure in Okta to enable the token exchange.
* Add the platform-agnostic token exchange module to your agent.
* Know where the platform-specific work begins and which guide to follow.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A third-party AI agent that you can edit and deploy
* [Python](https://www.python.org/) 3.10 or later for the token exchange module

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

Securing any agent breaks into two parts:

* **Okta authentication (platform-agnostic).** The agent performs a two-step token exchange — it turns the user's `id_token` into an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server, then turns the ID-JAG into a scoped `access_token` at a custom authorization server. This logic is identical for every agent, so you add it once as a reusable module.

* **Platform integration (platform-specific).** Your agent calls the token exchange and then attaches the resulting access token to the calls it makes — as a session attribute, a request header, or whatever the platform expects. This part differs per platform, so you implement it using your agent platform's own tools and documentation.

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
```

For the underlying concepts and the token exchange API details, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## How securing an agent works

At a high level, securing any third-party or imported AI agent involves three stages:

1. **Configure Okta.** Set up the Okta objects that make the token exchange possible. See [Configure Okta](#configure-okta).
1. **Add Okta authentication to your agent.** Drop the reusable token exchange module into your agent's code. See [Add Okta authentication to your agent](#add-okta-authentication-to-your-agent).
1. **Integrate with your platform.** Call the token exchange and attach the access token to your agent's downstream calls. The specifics depend on your platform. See [Integrate with your platform](#integrate-with-your-platform).

## Configure Okta

This is the work you do from an Okta perspective. It's the same regardless of platform. Configure the following objects, then collect their identifiers for your agent's environment. For step-by-step instructions, see [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* **An OIDC web app integration** that signs users in and issues the `id_token` your agent exchanges. The `id_token`'s `aud` claim must equal this app's client ID.
* **A custom authorization server** with a **custom scope** (such as `xaa:read`) that the agent requests.

  > **Note:** System scopes (`openid`, `profile`, `email`) are stripped during the ID-JAG exchange and cause an `invalid_scope` error. Request only a non-system custom scope.

* **An AI Agent identity in Okta** — the machine identity whose key signs the token exchange requests. For a third-party agent that runs on a cloud provider, you import the agent into Okta; you can also register one manually for testing. Register its public key, link the OIDC web app, set the custom authorization server, and activate it.
* **An access policy rule** on the custom authorization server that enables the JWT Bearer grant type, allows the AI Agent identity as a client, and includes the audience, the custom scope, and a user or group condition.

When you finish, you have the values your agent reads as environment variables: `OKTA_DOMAIN`, `OKTA_CUSTOM_AS_ID`, `OKTA_SCOPE`, `AGENT_CLIENT_ID`, `AGENT_KEY_ID`, and `AGENT_PRIVATE_KEY_JWK`.

## Add Okta authentication to your agent

This is the platform-agnostic half of the agent code. The following example `token_exchange.py` module has no dependency on any agent platform. You can add it once and reuse it unchanged in any Python agent.

<AiAgentTokenExchangeModule/>

## Integrate with your platform

This is the platform-specific half. Regardless of platform, your agent code does two things:

1. **Obtain the access token.** Call `get_id_jag()` and then `get_access_token()` from the module above, passing the user's `id_token`.
1. **Attach the access token to the agent's downstream calls.** How you pass the token depends on the platform. For example, as a session attribute on an agent invocation, or as an `Authorization: Bearer` header on an outbound request. An action or tool the agent runs then uses that token to call the Okta-protected resource.

The exact entry point, SDK calls, and configuration differ per platform. Implement this step using your agent platform's own tools and documentation.

## Next steps

After your agent can authenticate as a user and call protected resources, define which resources and scopes it's allowed to reach. See [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
