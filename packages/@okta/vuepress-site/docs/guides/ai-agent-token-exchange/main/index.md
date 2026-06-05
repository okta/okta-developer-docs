---
title: Set up AI agent token exchange
excerpt: Learn how to configure token exchange for AI agents to securely access protected resources using ID-JAG, secrets, or service accounts.
layout: Guides
---
<ApiLifecycle access="ie" />

<StackSnippet snippet="EA" />

Learn how to configure token exchange for AI agents so that you can securely request and use credentials (ID-JAG, secrets, service accounts, or third-party access tokens) to access protected resources on behalf of authenticated users<StackSnippet snippet="client" inline />.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. See your Okta account team to enable the feature.

---

#### Learning outcomes

- Understand how to set up the token exchange flow for AI agents.

#### What you need

<StackSnippet snippet="whatyouneed" />

---

## Overview

<StackSnippet snippet="overview1" />

You can [connect an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure) to the following resource types:

- Authorization server: Grants the AI agent access to resources that are protected by an Okta custom authorization server. This resource type is supported by [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access) (XAA), which uses ID-JAG (Identity Assertion JWT).

- Secret: Uses a static credential for a downstream resource that has been vaulted in Okta Privileged Access.

- Service account: Uses a static credential for an app that's specified in Universal Directory. This resource is vaulted in Okta Privileged Access.

- Resource server: Uses a third party access token issued by the third-party authorization server and brokered by Okta. This resource type requires user consent before an AI agent can act on behalf of the user.

<ApiLifecycle access="ea" />
- Connect to another AI agent: Allows one AI agent to securely invoke another AI agent as a downstream resource protected by an Okta custom authorization server. Through this A2A token exchange, A2A maintains the original service identity across both agents while each obtains specific access tokens for its next connection. This resource type is supported by [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access) (XAA), which uses ID-JAG (Identity Assertion JWT).

After the resource type is configured and the AI agent has the token or credentials, it can then perform tasks on the connected app.

----
Securing Homegrown: Fully custom AI agents to other Homegrown: Fully custom AI Agents

connect ai agents to resources

The custom authorization server checks the configured rules to confirm the connection is allowed, and grants tokens that are scoped to a specific resource and expire automatically. This step-by-step verification happens at every request, ensuring that no AI agent gets broad or permanent access to your org.

As the AI agents work together, the system builds a digital chain of delegation. This trail is stamped right into the access token, recording exactly which agent started the request, who it connected to next, and the precise order of those events. By keeping this clear, step-by-step record, you can use the System Log to easily identify errors when a process breaks, watch out for unusual activity, and make sure every automated connection is fully monitored.

delegation configuration steps: https://preview-4797--regal-biscotti-8ee5d8.netlify.app/oie/en-us/content/topics/ai-agents/ai-agent-import-register.htm - Add delegations section - I will need an alias.

To delegate the AI agent to a non-human identity, you need configure a custom authorization server. This is a one-time task - if you've already completed it, skip to step d. Otherwise, click Configure in the Non-human identity section (Early Access).
Select an Authorization server from the dropdown list.
Enter a unique Audience/resource URL to identify the resource agent. This is the URL that callers include in their token requests to validate the audience claim.
The audience URL is the identifier that callers use to request tokens from the AI agent. You can't edit this value later.

user delegate:

To allow users who are signed in to an app to delegate their identity to the AI agent, click Add caller next to User sign-on.
Select an app from the Application dropdown list. The Confirm authorization server section appears with the Okta Org Authorization Server selected by default.
Optional. If you don't want to use the default authorization server, select a custom authorization server from the Authorization server list.
Click Add caller.
Repeat these steps for each user sign-on app that you want to add.


## Token Exchange flow

The following diagram describes the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select the resource type that you want from the **Instructions for** dropdown list on the right.<br>

<StackSnippet snippet="token-exchange-flow" />

## Flow specifics

  > **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type. If you want to change the resource type on this page, select the resource type that you want from the **Instructions for** dropdown list on the right.<br>

### Authorization Code with PKCE request

To initiate the token exchange flow, the client must first obtain an ID token from the org authorization server.

  > **Note**: You must use the org authorization server and not the custom authorization server for this step.

Use the Authorization Code with PKCE flow to obtain an authorization code for the client. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/).

### Exchange ID token for resource token

  > **Note:** The instructions on this page are for the **<StackSnippet snippet="resource-type" inline/>** resource type.
  If you want to change the resource type on this page, select the resource type that you want from the **Instructions for** dropdown list on the right.<br>

<StackSnippet snippet="exchange-token-id-request" />

#### Response

The response contains the requested resource token.

<StackSnippet snippet="exchange-token-id-response" />

## Revoke tokens

<StackSnippet snippet="revoke" />
