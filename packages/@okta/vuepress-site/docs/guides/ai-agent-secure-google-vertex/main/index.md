---
title: Secure a Google Vertex AI agent
excerpt: Learn how to add Okta authentication to an existing Google Vertex AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

<!-- TODO: Intro paragraph. Explain the wrapper/integration pattern for this platform, following the pattern set by the AWS Bedrock AgentCore and Salesforce Agentforce guides: what the integration adds, and what it assumes the reader already has (for example, a functional Vertex AI agent/reasoning engine that you can edit and deploy). -->

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Google Vertex AI-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what a third-party AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your agent.
<!-- TODO: Add Vertex AI-specific learning outcomes, for example wiring the token exchange into a Vertex AI Agent Engine/Reasoning Engine deployment and calling a downstream resource with the resulting access token. -->
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
<!-- TODO: Add Vertex AI-specific prerequisites, for example a Google Cloud project with Vertex AI enabled and an existing agent (Agent Engine/Reasoning Engine or Agent Builder) that you can edit and deploy. -->
* The Google Vertex AI agent registered in your org.
<!-- TODO: Confirm and link the actual AI agent import/registration flow for Google Cloud, matching the pattern in the AWS Bedrock AgentCore guide's "Configure AWS Identity and Access Management for AI agent imports" link. -->
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any agent. You add it once as a reusable module. See [Add Okta authentication to your agent](#add-okta-authentication-to-your-agent).

* Platform integration (Google Vertex AI-specific). <!-- TODO: Describe how the access token gets attached to the agent's downstream calls in Vertex AI, for example as a tool/session context value. See [Integrate the token exchange into your Vertex AI agent](#integrate-the-token-exchange-into-your-vertex-ai-agent). -->

<!-- TODO: Replace this text-based diagram with an image.

```text
User
  { "prompt": "...", "id_token": "<okta_id_token>" }
    |
    v
Okta authentication (token_exchange.py)
  Step 1: id_token  ->  ID-JAG        (Org AS:    /oauth2/v1/token)
  Step 2: ID-JAG    ->  access_token  (Custom AS: /oauth2/{custom-as-id}/v1/token)
    |
    v
Platform integration (Google Vertex AI: TODO entry point)
  TODO: attach access_token to the agent's downstream call
    |
    v
Downstream resource (Okta-protected API or MCP server)
  Authorization: Bearer <access_token>
```-->

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` your agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* The Google Vertex AI agent imported into Okta as an AI Agent identity that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the agent.

  > **Note:** Okta doesn't retain the agent's private key. Store it in a secrets manager when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI Agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Collect your configuration values

Your Google Vertex AI agent code reads these values as environment variables. The first group is consumed by the token exchange module. The second group is specific to Google Vertex AI.

<AiAgentOktaConfigValues/>

<!-- TODO: Add a "Google Vertex AI values" table (used by the platform integration), for example GCP project ID, region, and agent/reasoning-engine resource identifiers. -->

## Add Okta authentication to your agent

The following example `token_exchange.py` module that you create here has no dependency on Google Cloud or Vertex AI.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your Vertex AI agent

<!-- TODO: Google Vertex AI-specific integration section(s). Follow the AgentCore/Agentforce guides' pattern: dependencies, how to call get_id_jag/get_access_token, and how the access token is attached to the downstream call. -->

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

<!-- TODO: Show how to run/invoke the Vertex AI agent locally and/or deployed, passing the test ID token to confirm the full id_token -> ID-JAG -> access_token round trip. -->

## Troubleshoot your integration

<!-- TODO: Add a table of Google Vertex AI-specific errors, root causes, and fixes, following the pattern in the AWS Bedrock AgentCore guide. -->

The following errors come from the Okta token exchange and are covered in [Set up third-party AI Agent token exchange: Troubleshooting](/docs/guides/ai-agent-third-party-token-exchange/main/#troubleshooting):

* `invalid_scope: openid not allowed`
* `invalid_client: JWKSet not configured`
* `invalid_client: kid is invalid`
* `access_denied: no_matching_policy`

## Next steps

Your agent can now authenticate as a user and call Okta-protected resources on their behalf. To define which resources and scopes the agent is permitted to reach, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
<!-- TODO: Add a link to the Google Vertex AI platform documentation. -->
