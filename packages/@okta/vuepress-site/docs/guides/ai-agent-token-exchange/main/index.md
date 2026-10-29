---
title: Set up AI agent token exchange
excerpt: Learn how to configure token exchange for AI agents to securely access protected resources using ID-JAG, secrets, or service accounts.
layout: Guides
---
<ApiLifecycle access="ie" />

Learn how to configure token exchange for AI agents so that you can securely request and use credentials (ID-JAG, secrets, service accounts, or third-party access tokens) to access protected resources on behalf of authenticated users, and so that AI agents can securely call each other as part of automated workflows (agent-to-agent).

---

#### Learning outcomes

- Understand how to set up the token exchange flow for AI agents.

#### What you need

- An Okta org that's subscribed to Okta for AI Agents
- An Okta admin account with the super admin role
- A registered AI agent in your Okta org. See [Add and register AI agents](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register).
  > **Note**: If you're using the **Connect to another AI Agent** resource type, you need two registered AI agents.
- A **Resource connection** that's configured for each AI agent, defining which resources they're allowed to access. See [Connect AI agents to resources](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-app-connection).
  - If you're connecting to an Okta custom authorization server, define the [custom scopes](/docs/guides/customize-authz-server/main/#create-scopes) for each resource app where you're requesting access. These scopes specify what permissions the token exchange grants in the final access token.

- [User access or machine access](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually) configured for each AI agent, defining the users, apps, and other AI agents that can authorize the AI agent to act on their behalf. See the **Configure user access** or **Configure machine access** sections of the [Add AI agents manually](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually) page.

---

## Overview

You've [registered an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register), and configured the [access](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-add-manually) that you require. Configuring this access defines the users, apps, and other AI agents that can authorize an AI agent to act on their behalf. See [Agent-to-agent connections](https://help.okta.com/okta_help.htm?type=oie&id=agent-to-agent).

You've also created [resource connections](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) that define the AI agent's access to your org's resources. Now, the agent must obtain the actual tokens or credentials to perform tasks.

> **Note**: The [`connectionType`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=0/connectiontype) property in the AI Agent Connections API identifies how an AI agent obtains credentials for a resource. Okta uses this value to determine which token exchange flow to apply to the connection.

You can [connect an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-app-connection) to the following resource types with the supported connection types.

| Resource type | Connection type ([`connectionType`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=0/connectiontype))|
| ------------- | --------------- |
| **Agent Gateway** | **Brokered consent STS** ([`STS_ACCESS_TOKEN`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=3/connectiontype))<br>Grants the AI agent access to an Okta-secured endpoint that aggregates tools from multiple MCP servers. This connection uses an access token that's issued by a custom authorization server. See [Configure an Agent Gateway > What happens at runtime](/docs/guides/ai-configure-agent-gateway/main/#what-happens-at-runtime).<br><br>Select **OAuth STS** from the **Instructions for** dropdown on the right to review the brokered consent STS [token exchange flow](#token-exchange-flow). |
| **Authorization server** | **Cross App Access (Authorization server)** ([`IDENTITY_ASSERTION_CUSTOM_AS`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=0/connectiontype))<br>Grants the AI agent access to resources that are protected by an Okta custom authorization server. This resource type is supported by [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access), which uses ID-JAG (Identity Assertion JWT).<br><br>Select **Authorization server (ID-JAG)** from the **Instructions for** dropdown on the right to review the authorization server [token exchange flow](#token-exchange-flow). |
| **Secret** | **Secret** ([`STS_VAULT_SECRET`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=1/connectiontype))<br>Uses a static credential for a downstream resource that has been vaulted in Okta Privileged Access (OPA).<br><br>Select **Secret** from the **Instructions for** dropdown on the right to review the OPA vaulted secret STS [token exchange flow](#token-exchange-flow).|
| **Service account** | **Service account** ([`STS_SERVICE_ACCOUNT`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=1/connectiontype))<br> Uses a static credential for an app that's specified in Universal Directory. This resource is vaulted in Okta Privileged Access.<br><br>Select **Service account** from the **Instructions for** dropdown on the right to review the OPA service account static credentials [token exchange flow](#token-exchange-flow).|
| **Application** | Okta supports the following connections for app resources:<br><ul><li>**Cross App Access (App instance)** ([`IDENTITY_ASSERTION_APP_INSTANCE`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=5/connectiontype))<br>Uses the [Cross App Access](/docs/concepts/xaa/) token exchange flow with an app instance in the identity assertion.<br><br>Select **Authorization server (ID-JAG)** from the **Instructions for** dropdown on the right to review the XAA authorization server [token exchange flow](#token-exchange-flow).</li><li>**Brokered consent STS** ([`STS_ACCESS_TOKEN`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=3/connectiontype))<br>Uses a third-party access token that's issued by the third-party authorization server and brokered by Okta. This connection flow requires user consent before an AI agent can act on behalf of the user. <br><br>Select **OAuth STS** from the **Instructions for** dropdown on the right to review the brokered consent STS [token exchange flow](#token-exchange-flow).</li></ul> |
| **MCP server** | Okta supports the following connections for MCP server resources:<br><ul><li>**Cross App Access (MCP server)** ([`IDENTITY_ASSERTION_MCP_SERVER`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=6/connectiontype))<br>Uses the [Cross App Access](/docs/concepts/xaa/) token exchange flow with an MCP server as the resource.<br><br>Select **MCP server** from the **Instructions for** dropdown on the right to review the XAA MCP server [token exchange flow](#token-exchange-flow).</li><li>**Brokered consent STS** ([`STS_ACCESS_TOKEN`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=3/connectiontype))<br>Uses a third-party access token that's issued by the third-party authorization server and brokered by Okta. This connection flow requires user consent before an AI agent can act on behalf of the user. <br><br>Select **OAuth STS** from the **Instructions for** dropdown on the right to review the brokered consent STS [token exchange flow](#token-exchange-flow).</li></ul> |
| **Connect to another AI Agent** | **Cross App Access (Agent-to-agent)** ([`IDENTITY_ASSERTION_A2A_SERVER`](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentconnections/other/createresourceconnection#other/createresourceconnection/t=request&path=&d=4/connectiontype))<br>Allows one AI agent to securely invoke another AI agent as a downstream resource protected by an Okta custom authorization server. Through XAA token exchange, the original service identity is maintained across both agents while each obtains specific access tokens for its next connection.<br> <br>Select **Agent-to-agent** from the **Instructions for** dropdown on the right to review the AI agent-to-agent [token exchange flow](#token-exchange-flow). |

After the resource type is configured and the AI agent has the token or credentials, it can then perform tasks on the connected resource.

> **Note:** If you're integrating a third-party AI agent platform, such as AWS Bedrock or Azure AI Foundry, see [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/). This guide provides a complete setup walkthrough and a functional demo that you can test end to end.

> **Note:** This guide describes the token exchange when Okta issues the ID-JAG. If your agent holds an ID-JAG issued directly by an external IdP or by another Okta org, it presents that ID-JAG directly to your custom authorization server and doesn't use the org authorization server exchange that's described here. See [Configure XAA with an external IdP](/docs/guides/xaa-external-idp/).

## Token exchange flow

The following diagrams and steps describe the **<StackSnippet snippet="resource-type" inline/>** token exchange flow. If you want to change the token exchange flow on this page, select that flow from the **Instructions for** dropdown list on the right.

### Authenticate with Okta

<StackSnippet snippet="token-exchange-flow-init" />

### The exchange flow

<StackSnippet snippet="token-exchange-flow" />

## Flow specifics

> **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** token exchange flow. If you want to change the token exchange flow on this page, select that flow from the **Instructions for** dropdown list on the right.

### Initial authentication

To initiate token exchange, the AI agent (user access configuration) or client (machine access configuration) must first authenticate with the appropriate Okta authorization server and obtain a subject token (either an ID token or an access token). This token must satisfy the access requirements for the AI agent.

> **Note**: Okta also accepts the CIMD URL as the `client_id` in an OAuth request, just as it would a static client ID. See [Use the CIMD client ID in a token request](/docs/guides/ai-agent-cimd-registration/main/#use-the-cimd-client-id-in-a-token-request) for more detailed information.

#### ID token

To obtain a subject token (`subject_token`) for a user, the AI agent or client sends a request to the Okta org or custom authorization server to obtain an ID token. Use the Authorization Code with PKCE grant type to obtain an authorization code for the client. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/).

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

To obtain a subject token (`subject_token`) for itself, the client sends a request to an Okta custom authorization server to obtain an access token. Use the Client Credentials grant type to obtain the subject token. See [Implement authorization by grant type](/docs/guides/implement-grant-type/clientcreds/main/).

The request includes the `resource` parameter. The parameter value is the resource URL that's configured on the agent that this client is invoking. For example `resource: https://agent1.example.com`.

#### Response

The token returned in the response contains the `aud` claim. The claim value is the resource URL (`https://agent1.example.com`) for the AI agent. This is the agent that performs token exchange.

```JSON
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJraWQiOiJQLVgxeC1ITWtuSThPS0lUeE5TWVlsMHR0blJobUY4Q0xTaUdBenlwemJVIiwiYWxnIjoi...",
  "scope": "chat.read+chat.history"
}
```

### Exchange subject token for resource token

> **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** token exchange flow. If you want to change the token exchange flow on this page, select that flow from the **Instructions for** dropdown list on the right.<br>

<StackSnippet snippet="exchange-token-for-idjag1" />

<StackSnippet snippet="exchange-token-id-response" />

<StackSnippet snippet="exchange-idjag-for-token" />

<StackSnippet snippet="exchange-token-for-idjag2" />

<StackSnippet snippet="exchange-idjag-for-token2" />

## Revoke tokens

<StackSnippet snippet="revoke" />
