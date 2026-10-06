---
title: Secure a Workday AI agent
excerpt: Learn how to add Okta authentication to an existing Workday AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to add Okta authentication to an AI agent registered in Workday's Agent System of Record (ASOR). Workday ASOR is Workday's registry of AI agents built on or connected to the Workday platform. Once Okta imports an AI agent from ASOR, you add a token exchange module so the AI agent can perform Okta's two-step token exchange and act on behalf of the signed-in user.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. The platform-specific integration code for Workday ASOR agents isn't yet available. See [Integrate the token exchange into your Workday AI agent](#integrate-the-token-exchange-into-your-workday-ai-agent).

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what an imported AI agent must do to authenticate as a signed-in user with Okta.
* Import an AI agent from Workday ASOR into Okta.
* Add a token exchange module to your AI agent.
* Verify your Okta configuration and obtain a test ID token to confirm the token exchange succeeds.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A Workday tenant with Agent System of Record enabled and at least one registered AI agent that you can import
* Security Administrator access in Workday, to register an API client
* The Workday AI agent imported into Okta as an AI agent identity. See [Import your AI agent from Workday](#import-your-ai-agent-from-workday).
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. You add it once as a reusable module. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (Workday-specific). Every platform integration calls the token exchange and then attaches the resulting access token to the agent's downstream calls, but the specific integration point for Workday ASOR agents, such as which part of the agent's runtime performs this exchange, isn't yet documented. See [Integrate the token exchange into your Workday AI agent](#integrate-the-token-exchange-into-your-workday-ai-agent).

*****

**TODO:** Replace this text-based diagram with an image once the platform integration point is confirmed.

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
Platform integration (Workday ASOR agent: integration point TBD)
    |
    v
Downstream resource (Okta-protected API or MCP server)
  Authorization: Bearer <access_token>
```

*****

> **Note:** Importing an AI agent from Workday ASOR is a separate mechanism from the token exchange. Okta pulls the agent's inventory from Workday on a schedule or on demand, and registers each agent as an AI agent identity. This doesn't configure the agent for the token exchange. You still complete the configuration steps in [Before you begin](#before-you-begin) regardless of whether the AI agent was imported or registered manually.

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` that your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim that matches the app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`. Okta strips system scopes (`openid`, `profile`, `email`) during the ID-JAG exchange and returns an `invalid_scope` error, so you must request a custom scope instead.
* The Workday AI agent imported into Okta as an AI agent identity. This AI agent identity uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the AI agent. See [Import your AI agent from Workday](#import-your-ai-agent-from-workday).

  > **Note:** Okta doesn't retain the AI agent's private key. Generate the private key and store it in a secrets manager, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Register an API client in Workday

Workday uses the OAuth 2.0 Authorization Code grant for AI agent import, not an API key. Register an API client in Workday before you configure the import in Okta.

1. Sign in to your Workday tenant as a Security Administrator.
1. Confirm that the **System** and **Agent System of Record** functional areas are enabled. Use the **Maintain Functional Areas** task.
1. Confirm that your security group has **Get** and **Put** access to the **Manage: Agents**, **Setup: Agents**, and **Agent Management Hub** security policies (functional area **Agent System of Record**). Run the **Activate Pending Security Policy Changes** task to apply any changes.
1. Run the **Register API Client** task, and then set the following:
   * **Client Name**: a descriptive name, for example `Okta AI Agent Provider`
   * **Client Grant Type**: **Authorization Code Grant**
   * **Access Token Type**: **Bearer**
   * **Redirection URI**: `{yourOktaDomain}/oauth2/v1/sts/callback`
   * **Non-Expiring Refresh Tokens**: selected
   * **Scope (Functional Areas)**: **System** and **Agent System of Record**
1. Click **OK**. Copy and securely store the **Client ID**, **Client Secret**, and **Token Endpoint**.

   > **Important:** Workday shows the client secret only once. If you navigate away before copying it, you must generate a new one.

### Import your AI agent from Workday

Okta can discover and import AI agents directly from a connected Workday tenant.

1. In the Admin Console, go to **Applications** > **Applications and Resources**, click **Browse App Catalog**, and then add the Workday app integration if you haven't already.
1. On the app integration's **General** tab, click **Edit**. Set the **Site URL** field to your Workday login URL, for example `https://impl.workday.com/{yourTenant}/login.flex`, and then click **Save**.

   > **Note:** Workday's authorization endpoint and token endpoint run on different hosts. Okta uses the site URL to reach the authorization host during setup.

1. Go to **Directory** > **AI Agent Providers**, and then select your Workday app integration.
1. Go to the **AI Agent Import** tab, and select **Enable AI agent imports**.
1. Enter the Client ID, Client Secret, and Token Endpoint that you collected in [Register an API client in Workday](#register-an-api-client-in-workday). Click **Test API Credentials** to validate them, and then click **Save configuration**.

   > **Note:** If this is the first time you're connecting this Workday tenant, Okta might return an interaction URI. Open that URI, sign in to Workday in the same browser, and complete the consent screen before validation can succeed.

   ***** **TODO:** Confirm whether Okta surfaces an interaction URI for Workday the same way it does for Google Vertex, or whether Workday's OAuth consent happens entirely within the AI Agent Import tab's Test API Credentials step. Source material describes an interactive consent step as part of the underlying OAuth Authorization Code flow, but doesn't confirm how it surfaces in this specific tab. Also unconfirmed: whether the admin must sign in to Workday in the same browser before this step, which source material notes as a Workday-specific quirk (Workday's authorize endpoint doesn't redirect unauthenticated users to a login page). *****

1. Choose your import schedule, matching criteria, and preview settings, then save the configuration again. Okta runs the import immediately, and on the schedule you chose afterward.
1. Go to the AI agents page to register the imported AI agent.
1. On the **Client registration** tab, click **Add public key**, then **Generate new key**. Copy and store the private key, since it's shown only once. Note the **Client ID**. You need it for `AGENT_CLIENT_ID` and `AGENT_KEY_ID`.
1. On the **Machine access** tab, click **Configure**. Select your custom authorization server, enter the audience/resource URL, and save. Click **Add caller**, select the AI agent, and allow your custom scope.
1. From **Actions**, select **Activate**, and then confirm.

## Collect your configuration values

<AiAgentOktaConfigValues/>

*****

**TODO:** Add a Workday-specific configuration values table once the platform integration point is confirmed. The values above are everything the shared token exchange module needs. Workday ASOR doesn't yet have a documented agent runtime or SDK, so there are no confirmed platform-specific environment variables to list.

*****

## Add Okta authentication to your AI agent

The following example `token_exchange.py` module that you create here has no dependency on Workday.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your Workday AI agent

*****

**TODO:** This section is incomplete. Workday ASOR's agent runtime and the specific point where an agent would call the token exchange module aren't yet documented. Source material confirms the import mechanism (above) and the generic two-step token exchange (shared across all platforms), but doesn't confirm how a Workday ASOR agent is built, hosted, or extended to add this exchange, nor how the resulting access token would be attached to the agent's downstream calls. Revisit this section once that integration point is confirmed, following the pattern used in the Amazon Bedrock AgentCore, Salesforce Agentforce, or DataRobot guides as a model.

*****

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

*****

**TODO:** This section is incomplete, since it depends on the platform integration point in the previous section. Once that's confirmed, add a worked example that calls the integrated AI agent with a test ID token and shows a successful response, following the pattern used in the other platform guides.

*****

## Troubleshoot your integration

The following errors are specific to the Workday import:

| Error | Root cause | Fix |
| --- | --- | --- |
| Import credentials fail validation | The Workday API client's scope doesn't include both **System** and **Agent System of Record** | In Workday, edit the API client's functional area scope to include both |
| Okta can't reach the Workday authorization host during setup | The app integration's **Site URL** field is missing or incorrect | Set **Site URL** to your Workday login URL on the app integration's **General** tab |

The following errors come from the Okta token exchange and are covered in [Set up imported AI agent token exchange: Troubleshooting](/docs/guides/ai-agent-third-party-token-exchange/main/#troubleshooting):

* `invalid_scope: openid not allowed`
* `invalid_client: JWKSet not configured`
* `invalid_client: kid is invalid`
* `access_denied: no_matching_policy`
* `Only service apps can use client_credentials`

## Next steps

Once imported, your AI agent can authenticate as a user and call Okta-protected resources on their behalf, after you complete the platform integration in [Integrate the token exchange into your Workday AI agent](#integrate-the-token-exchange-into-your-workday-ai-agent). To define which resources and scopes you permit the AI agent to reach, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
