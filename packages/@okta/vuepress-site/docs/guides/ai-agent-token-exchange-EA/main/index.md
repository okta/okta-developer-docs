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

- **Agent-to-agent (A2A)**: Allows one AI agent to securely invoke another AI agent as a downstream resource protected by an Okta custom authorization server. Through this A2A token exchange, A2A maintains the original service identity across both agents while each obtains specific access tokens for its next connection. This resource type is supported by Cross App Access (XAA), which uses ID-JAG (Identity Assertion JWT).

Ater the resource type is configured and the AI agent has the token or credentials, it can then perform tasks on the connected app.

## Token Exchange flow

The following diagram describes the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select that type from the **Instructions for** dropdown list on the right.

<StackSnippet snippet="token-exchange-flow" />

## Flow specifics

> **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select that type from the **Instructions for** dropdown list on the right.

### Initial authentication

To initiate the token exchange flow, the client must first authenticate with the appropriate Okta authorization server and obtain a subject token (either an ID token or an access token) that satisfies a delegation link for the AI agent.

#### ID token

To obtain a subject token for a user, the client sends a request to the Okta org or custom authorization server to obtain an ID token for the user. Use the Authorization Code with PKCE grant type flow to obtain an authorization code for the client. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/).

#### Access token

To obtain a subject token for itself, the client sends a request to an Okta custom authorization server to obtain an access token. Use the Client Credentials grant type flow to obtain the subject token. See [Implement authorization by grant type](/docs/guides/implement-grant-type/clientcreds/main/).

The access token request includes the `resource` parameter. The parameter value is the resource URL that's configured on the agent that this client is invoking. For example `resource: https://agent1.example.com`.

The `subject_token` returned in the response contains the `aud` parameter. The parameter value is the resource URL (`https://agent1.example.com`) for AI agent 1. This is the agent that initiates the request and calls another agent.

### Exchange token for resource token

> **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select the resource type you want from the **Instructions for** dropdown list on the right.<br>

In this step, after Agent 1 receives the access or ID token (T1) from the client, Agent 1 sends a `POST` request to the Okta org authorization server's `/token` endpoint. This request is to exchange the `subject_token` for an ID-JAG resource token (T2). This exchange establishes Agent 1 as the immediate actor in the delegation chain while maintaining the original service client as the subject.

> **Note**: This request example uses the access token subject token type.

```bash
  curl --location --request POST \
    --url 'https://{yourOktaDomain}/oauth2/v1/token' \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "subject_token=eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0bl...." \
    --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:access_token" \
    --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:id-jag" \
    --data-urlencode "audience=https://{yourOktaDomain}/oauth2/{authServerId}" \
    --data-urlencode "resource=https://agent2.{yourOktaDomain}" \
    --data-urlencode "scope=chat.read+chat.history" \
    --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
    --data-urlencode "client_assertion=eyJhbGciOiJSUzI1NiIsInR5…[jwt]"
```

| Parameter | Description and value |
| --- | --- |
| `grant_type` | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `subject_token` | A valid ID or access token that satisfies a delegation link for the AI agent |
| `subject_token_type` | The type of subject token. The value is either `urn:ietf:params:oauth:token-type:id_token` or `urn:ietf:params:oauth:token-type:access_token`. |
| `requested_token_type` | The type of token being requested. The value must be `urn:ietf:params:oauth:token-type:id-jag`. |
| `audience` | The issuer URL of the resource app's authorization server |
| `resource` | The resource URL of the agent that receives and validates the incoming request |
| `scope`    | A list of scopes at the resource app being requested. This defines the permissions for the final access token. |
| `client_assertion_type` | The type of assertioin. The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer` |
| `client_assertion` | A signed JWT used for client authentication. You must sign the JWT using the key created during the AI agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |

#### Response

<StackSnippet snippet="exchange-token-id-response" />

### Exchange ID-JAG for access token

<StackSnippet snippet="exchange-idjag-for-token" />

### Agent 2 exchanges token for ID-JAG

<StackSnippet snippet="exchange-token-for-idjag" />

### Agent 2 exchanges ID-JAG for token

<StackSnippet snippet="exchange-idjag-for-token2" />

## Revoke tokens

<StackSnippet snippet="revoke" />
