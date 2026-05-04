---
title: Set up AI agent token exchange
excerpt: Learn how to configure token exchange for AI agents to securely access protected resources using ID-JAG, secrets, or service accounts.
layout: Guides
---
<ApiLifecycle access="ie" />

Learn how to configure token exchange for AI agents so that you can securely request and use credentials (ID-JAG, secrets, service accounts, or third-party access tokens) to access protected resources on behalf of authenticated users.

---

#### Learning outcomes

- Understand how to set up the token exchange flow for an AI Agent.

#### What you need

- An Okta org that's subscribed to Okta for AI Agents.
- An Okta user account with the super admin role.
- A registered AI agent in your Okta org. See [Add and register AI agents](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register).
- A **Resource connection** that's configured for the AI agent, defining which resources it's allowed to access. See [AI agent resource connections](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure).
- An OIDC web app that's configured to authenticate users and obtain an ID token.

---

## Overview

You've [registered an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register). You've also created resource connections that define the AI agent's access to your org's resources. Now, the agent must obtain the actual tokens or credentials to perform tasks.

You can [connect an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) to the following resource types:

- Authorization server: Grants the AI agent access to resources that are protected by an Okta custom authorization server. This resource type is supported by [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access) (XAA), which uses ID-JAG (Identity Assertion JWT).

- Secret: Uses a static credential for a downstream resource that has been vaulted in Okta Privileged Access.

- Service account: Uses a static credential for an app that's specified in Universal Directory. This resource is vaulted in Okta Privileged Access.

- Resource server: Uses a third party access token issued by the third-party authorization server and brokered by Okta. This resource type requires user consent before an AI agent can act on behalf of the user.

Ater the resource type is configured and the AI agent has the token or credentials, it can then perform tasks on the connected app.

## Token Exchange flow

The following diagram describes the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select the resource type that you want from the **Instructions for** dropdown list on the right.<br>

<StackSnippet snippet="token-exchange-flow" />

## Flow specifics

  > **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select the resource type you want from the **Instructions for** dropdown list on the right.<br>

### Authorization Code with PKCE request

To initiate the token exchange flow, the client must first obtain an ID token from the org authorization server.

  > **Note**: You must use the org authorization server and not the custom authorization server for this step.

Use the Authorization Code with PKCE flow to obtain an authorization code for the client. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/).

### Exchange token ID for resource token

  > **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type.
  If you want to change the resource type on this page, select the resource type you want from the **Instructions for** dropdown list on the right.<br>

<StackSnippet snippet="exchange-token-id-request" />

#### Response

The response contains the requested resource token.

<StackSnippet snippet="exchange-token-id-response" />

## Revoke tokens

<StackSnippet snippet="revoke" />
