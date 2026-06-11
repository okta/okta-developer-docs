---
title: Set up AI agent-to-agent token exchange
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
- [Custom scopes](/docs/guides/customize-authz-server/main/#create-scopes) defined in your Okta custom authorization server for each resource app where you're requesting access. These scopes specify what permissions the token exchange grants in the final access token. You select these scopes when you [connect AI agents to resource connections](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-app-connection).
- Two registered AI agents in your Okta org. See [Add and register AI agents](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register).
- A **Resource connection** that's configured for the AI agents, defining which resources they're allowed to access. See [Connect AI agents to resources](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-app-connection).
- A delegation link that's configured for each AI agent, defining the users, apps, and other AI agents that can authorize the AI agent to act on their behalf. See the **Add delegations** section of the [Add AI agents manually](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually) page.

---

## Overview

You've [registered an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register), including adding the [delegations](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually) that you require. Delegations are the users, apps, and other AI agents that can authorize an AI agent to act on their behalf. See [Agent-to-agent connections](https://help.okta.com/okta_help.htm?type=oie&id=agent-to-agent).

You've also created [resource connections](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) that define the AI agent's access to your org's resources. Now, the agent must obtain the actual tokens or credentials to perform tasks.

You can [connect an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-app-connection) to the following resource types:

- **Authorization server**: Grants the AI agent access to resources that are protected by an Okta custom authorization server. This resource type is supported by [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access) (XAA), which uses ID-JAG (Identity Assertion JWT).

- **Secret**: Uses a static credential for a downstream resource that has been vaulted in Okta Privileged Access.

- **Service account**: Uses a static credential for an app that's specified in Universal Directory. This resource is vaulted in Okta Privileged Access.

- **Resource server**: Uses a third party access token issued by the third-party authorization server and brokered by Okta. This resource type requires user consent before an AI agent can act on behalf of the user.

- **Agent-to-agent**: Allows one AI agent to securely invoke another AI agent as a downstream resource protected by an Okta custom authorization server. Through token exchange, the original service identity is maintained across both agents while each obtains specific access tokens for its next connection. This resource type is supported by Cross App Access (XAA), which uses ID-JAG (Identity Assertion JWT).

Ater the resource type is configured and the AI agent has the token or credentials, it can then perform tasks on the connected app.

## Token Exchange flow

The following diagram describes the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select that type from the **Instructions for** dropdown list on the right.

<StackSnippet snippet="token-exchange-flow" />

## Flow specifics

> **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select that type from the **Instructions for** dropdown list on the right.

### Initial authentication

To initiate the token exchange flow, the client must first authenticate with the appropriate Okta authorization server and obtain a subject token (either an ID token or an access token) that satisfies a delegation link for the AI agent.

#### ID token

To obtain a subject token for a user, the client sends a request to the Okta org or custom authorization server to obtain an ID token. Use the Authorization Code with PKCE grant type to obtain an authorization code for the client. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/).

#### Response

The response contains the access and ID token and the `openid` scope.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraW...OYqhUp6g",
  "scope": "openid",
  "id_token": "eyJ...vc_JaEQCw"
}
```

#### Access token

To obtain a subject token for itself, the client sends a request to an Okta custom authorization server to obtain an access token. Use the Client Credentials grant type to obtain the subject token. See [Implement authorization by grant type](/docs/guides/implement-grant-type/clientcreds/main/).

The request includes the `resource` parameter. The parameter value is the resource URL that's configured on the agent that this client is invoking. For example `resource: https://agent1.{yourOktaDomain}`.

#### Response

The token returned in the response contains the `aud` parameter. The parameter value is the resource URL (`https://agent1.{yourOktaDomain}`) for AI agent 1. This is the agent that initiates the request and calls another agent.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaUdBenlwemJVIiwiYWxnIjoi...",
  "scope": "chat.read+chat.history"
}
```

### Exchange token for resource token

> **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select that type from the **Instructions for** dropdown list on the right.<br>

<StackSnippet snippet="exchange-token-for-idjag1" />

#### Response

<StackSnippet snippet="exchange-token-id-response" />

<StackSnippet snippet="exchange-idjag-for-token" />

<StackSnippet snippet="exchange-token-for-idjag2" />

<StackSnippet snippet="exchange-idjag-for-token2" />

## Revoke tokens

<StackSnippet snippet="revoke" />
