---
title: AI Agent Token Exchange
excerpt: This guide explains how to set up the token requests required for an AI Agent to access protected resources using ID-JAG, secret or service account.
layout: Guides
---

This guide explains how to set up the token requests required for an AI Agent to access protected resources using ID-JAG, secret, or service account.

---

#### Learning outcomes

Understand the purpose of the OAuth 2.0 token exchange request for an AI Agent.
Understand how to set up the token exchange flow for an AI Agent.
#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* An Okta user account with the super admin role.
* [AI Agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register.htm) registered in your Okta org.
* Managed Connections is configured for the AI agent, defining which resources it’s allowed to access. See [Secure an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure.htm).
* An OIDC client app (for example, a web) is configured to authenticate users and obtain an ID token.


---

## Overview

After you [register an AI Agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register.htm) and define its access using **Managed Connections**, the agent must obtain the actual tokens or credentials to perform tasks.

You can [connect an AI agent](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure.htm) to the following resource types:

* Authorization server: Grants the AI agent access to resources that are protected by an Okta custom authorization server. This resource type is supported by [Cross App Access](https://help.okta.com/okta_help.htm?type=oie&id=apps-cross-app-access.htm) (XAA), which uses ID-JAG (Identity Assertion JWT).

* Secret: Uses a static credential for a downstream resource that has been vaulted in Okta Privileged Access.

* Service account: Uses a static credential for an app that's specified in the Universal Directory. This resource is vaulted in Okta Privileged Access.

## Token Exchange flow

<div class="full">

  ![Flow diagram that displays the communication between the client, resources, and the authorization server](/img/auth/ai-agent-token-exchange.png)

</div>

> **Note:** This flow assumes that user authentication and authorization are complete and the authorization server issued an access token and ID token.

1. The user authenticates with the Okta org authorization server using a web app. The server returns an ID token to the client.

1. The client (here, AI agent) sends the ID token to the Okta org authorization server, requesting an exchange for the resource token (ID-JAG, vaulted secret, or service account). The server validates the request against Managed Connections and returns the requested ID-JAG, vaulted secret, or service account.

1. If the requested token was an ID-JAG, the client sends the ID-JAG to the resource authorization server/custom authorization server to exchange it for a usable access token.

1. The client uses the access token to request access to the resource at the resource authorization server.


## Flow specifics

### Authorization Code with PKCE request

To initiate the token exchange flow, the client must first obtain an ID token from the Okta org authorization server.

< **Note**: You must use the Okta org authorization server and not the Okta custom authorization server for this step.

Use the Authorization Code with PKCE flow to obtain an authorization code for the client. See [Implement authorization by grant type](/docs/guides/implement-grant-type/authcodepkce/main/).

### Exchange token ID for resource token

In this step, tAI agent sends a POST request to the Okta org authorization server's `/token` endpoint to exchange the ID token for the resource token (ID-JAG, vaulted secret, or service account).

<StackSnippet snippet="exchange-token-id-request" />

##### Response

The response contains the requested resource token.

<StackSnippet snippet="exchange-token-id-response" />








[def]: /img/auth/ai-agent-token-exchange.png