---
title: Set up AI agent token exchange
excerpt: Learn how to configure token exchange for AI agents to securely access protected resources using ID-JAG, secrets, or service accounts.
layout: Guides
---

<ApiLifecycle access="ie" />

<ApiLifecycle access="ea" />

Learn how to configure token exchange for agent-to-agent connections so that AI agents can securely call each other as part of automated workflows. This document discusses the token exchange flows that pertain to the agent-to-agent self-service early access feature. For the generally available token exchange flows, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/authserver/main/).

---

#### Learning outcomes

- Understand how to set up the token exchange flow for AI agents.

#### What you need

- An Okta org that's subscribed to Okta for AI Agents and has the Secure AI A2A Servers feature enabled. To enable this feature, go to **Settings** > **Features**, locate the Secure AI A2A Servers feature, and enable.
- An Okta user account with the super admin role.
- Two registered AI agents in your Okta org. See [Add and register AI agents](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register).
- A **Resource connection** that's configured for the AI agents, defining which resources they're allowed to access. See [AI agent resource connections](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure).
- A delegation link that's configured for each AI agent, defining the users, apps, and other AI agents that can authorize the AI agent to act on their behalf. See the **Add delegations** section of the [Configure imported AI agents](https://preview-4797--regal-biscotti-8ee5d8.netlify.app/oie/en-us/content/topics/ai-agents/ai-agent-add-manually.htm) page.

---

## Overview

You've [registered an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register), including adding the [delegations](/oie/en-us/content/topics/ai-agents/ai-agent-import-register.htmNEEDALIAS) that you require. Delegations are the users, apps, and other AI agents that can authorize an AI agent to act on their behalf. See [Agent-to-agent connections](need alias).

You've also created resource connections that define the AI agent's access to your org's resources. Now, the agent must obtain the actual tokens or credentials to perform tasks.

You can [connect an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) to the following resource types:

- **Authorization server**: Grants the AI agent access to resources that are protected by an Okta custom authorization server. This resource type is supported by [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access) (XAA), which uses ID-JAG (Identity Assertion JWT).

- **Secret**: Uses a static credential for a downstream resource that has been vaulted in Okta Privileged Access.

- **Service account**: Uses a static credential for an app that's specified in Universal Directory. This resource is vaulted in Okta Privileged Access.

- **Resource server**: Uses a third party access token issued by the third-party authorization server and brokered by Okta. This resource type requires user consent before an AI agent can act on behalf of the user.

- **Agent-to-agent (A2A)**: Allows one AI agent to securely invoke another AI agent as a downstream resource protected by an Okta custom authorization server. Through this A2A token exchange, A2A maintains the original service identity across both agents while each obtains specific access tokens for its next connection. This resource type is supported by Cross App Access (XAA), which uses ID-JAG (Identity Assertion JWT).

Ater the resource type is configured and the AI agent has the token or credentials, it can then perform tasks on the connected app.

## Token Exchange flow

The following diagram describes the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select the resource type that you want from the **Instructions for** dropdown list on the right.<br>

<StackSnippet snippet="token-exchange-flow" />

## Flow specifics

  > **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select the resource type you want from the **Instructions for** dropdown list on the right.<br>

### Initial authentication

To initiate the token exchange flow, client must first authenticate with the appropriate Okta authorization server and obtain a subject token (either an ID token or an access token) that satisfies a delegation link for the AI agent.

#### ID token

To initiate the token exchange flow for a user, the client sends a request to the Okta org authorization server to obtain an ID token for the user. Use the Authorization Code with PKCE flow to obtain an authorization code for the client. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/).

#### Access token

To initiate the token exchange flow for a service client, the client sends a request to an Okta custom authorization server to obtain an access token. See [Implement authorization by grant type](/docs/guides/implement-grant-type/clientcreds/main/).

Either request includes the following additional parameters:

| Parameter: Value | Description |
| ----------------------- | ----------- |
| `scope`: `agent.invoke` | explanation here |
| `resource`: https://agent1.example.com | explanation here |

The token returned in the response contains the `aud` parameter, and the parameter value is the resource URL (`https://agent1.example.com`) for AI agent 1. This is the agent that initiates the request and calls another agent.

### Exchange token for resource token

> **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select the resource type you want from the **Instructions for** dropdown list on the right.<br>

<StackSnippet snippet="exchange-token-id-request" />

#### Response

The response contains the requested resource token.

<StackSnippet snippet="exchange-token-id-response" />

## Revoke tokens

<StackSnippet snippet="revoke" />
