---
title: Secure a DataRobot AI agent
excerpt: Learn how to add Okta authentication to an existing DataRobot AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to add Okta authentication to an existing DataRobot AI agent built with the DataRobot Agentic Starter Application. You add a token exchange module directly to the agent's entrypoint, so the agent performs Okta's two-step token exchange internally and makes the resulting access token available to its MCP tools automatically.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the DataRobot-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what an imported AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your AI agent.
* Add the token exchange to your DataRobot AI agent's entrypoint, so the resulting access token is available to all of its MCP tools automatically.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A DataRobot instance with the [DataRobot Agentic Starter Application](https://github.com/datarobot-community/datarobot-agent-application) deployed, that you can edit and redeploy
* The DataRobot AI agent imported into Okta as an AI agent identity. See [Import your AI agent from DataRobot](#import-your-ai-agent-from-datarobot).
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. You add it once as a reusable module. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (DataRobot-specific). The DataRobot Agentic Starter Application forwards the signed-in user's `id_token` to the AI agent as an `X-DataRobot-Identity-Token` header on every chat request. Your AI agent's entrypoint performs the token exchange and attaches the resulting access token to its `authorization_context`, so every MCP tool the AI agent calls receives it automatically. See [Integrate the token exchange into your DataRobot AI agent](#integrate-the-token-exchange-into-your-datarobot-ai-agent).

<!-- TODO: Replace this text-based diagram with an image.

```text
User
  { "prompt": "...", "id_token": "<okta_id_token>" }
    |
    v
FastAPI backend (forwards X-DataRobot-Identity-Token to the agent)
    |
    v
Okta authentication (okta_xaa.py, inside the agent's entrypoint)
  Step 1: id_token  ->  ID-JAG        (Org AS:    /oauth2/v1/token)
  Step 2: ID-JAG    ->  access_token  (Custom AS: /oauth2/{custom-as-id}/v1/token)
    |
    v
authorization_context["okta_access_token"]
    |
    v
Every MCP tool the agent calls
```-->

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An web app integration that signs users in and issues the `id_token` that your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim that matches the app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`. Okta strips system scopes (`openid`, `profile`, `email`) during the ID-JAG exchange and returns an `invalid_scope` error, so you must request a custom scope instead.
* The DataRobot AI agent imported into Okta as an AI agent identity. This AI agent identity uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the AI agent. See [Import your AI agent from DataRobot](#import-your-ai-agent-from-datarobot).

  > **Note:** Okta doesn't retain the AI agent's private key. Generate the private key and store it in a secrets manager, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Import your AI agent from DataRobot

Okta can discover and import AI agents directly from a connected DataRobot instance. DataRobot authenticates these import requests with an API key rather than OAuth, so this setup is simpler than platforms that require a separate client registration.

1. Sign in to your DataRobot instance, click your profile icon, and select **API keys and tools**.
1. On the **Personal API keys** tab, click **Create new key**. Name the key something descriptive, for example `okta-ai-agent-import`, and click **Create**.
1. Copy and securely store the key, because DataRobot doesn't show it again.

   > **Note:** The API key inherits its creator's permissions. Create a dedicated service account with read-only access to Registered Models instead of using your own admin account. No write or deployment permissions are required.

<!-- TODO: Confirm the current steps and permissions required to add the DataRobot app integration to an org, since source material describes this as a private OIN app that DataRobot plans to make public. If DataRobot is already public in the OIN app catalog by the time this guide publishes, standard self-service steps (Admin Console > Applications > Browse App Catalog > search DataRobot > Add Integration) should apply without any additional provisioning step. -->

1. In the Admin Console, go to **Applications** > **Applications and Resources**, and then add the DataRobot app integration from the catalog if you haven't already.
1. On the app integration's **General** tab, click **Edit** in the **App Settings** section. Enter your DataRobot instance URL in the **DataRobot URL** field, and then click **Save**.
1. Go to **Directory** > **AI Agent Providers**, and then select your DataRobot app integration.
1. Go to the **AI Agent Import** tab, and select **Enable AI agent imports**.
1. Enter the DataRobot API key you generated. Click **Test API Credentials** to validate it, and then click **Save configuration**.

   > **Note:** Okta only imports AI agents that the API key's associated account has permission to read in DataRobot.

1. Choose your import schedule, matching criteria, and preview settings, then save the configuration again. Okta runs the import immediately, and on the schedule you chose afterward.
1. Go to the AI agents page to register the imported AI agent.
1. On the **Client registration** tab, click **Add public key**, then **Generate new key**. Copy and store the private key, since it's shown only once. Note the **Client ID**. You need it for `AGENT_CLIENT_ID` and `AGENT_KEY_ID`.
1. On the **Machine access** tab, click **Configure**. Select your custom authorization server, enter the audience/resource URL, and save. Click **Add caller**, select the AI agent, and allow your custom scope.
1. From **Actions**, select **Activate**, and then confirm.

## Collect your configuration values

Your DataRobot agent reads these values as environment variables, and the token exchange module is their only consumer. DataRobot's import credentials from the previous section are separate, admin-side values that Okta uses to discover AI agents, and your agent's runtime code doesn't use them.

<AiAgentOktaConfigValues/>

## Add Okta authentication to your AI agent

The following example `token_exchange.py` module that you create here has no dependency on DataRobot.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your DataRobot AI agent

This section is specific to DataRobot. Here you add the token exchange module to the DataRobot Agentic Starter Application's AI agent, so it runs automatically on every chat request that carries the signed-in user's identity.

### Add the DataRobot dependencies

Add these to the AI agent's `pyproject.toml`, alongside the token exchange dependencies:

```toml
"PyJWT>=2.8.0",
"cryptography>=42.0.0",
"requests>=2.31.0",
```

### Add the token exchange to your AI agent's entrypoint

In `agent/custom.py`, add the token exchange block after the existing call to `resolve_authorization_context()`, so your result merges into the authorization context instead of overwriting it.

```python
import os

from token_exchange import get_access_token, get_id_jag

_OKTA_REQUIRED_VARS = frozenset(
    {"OKTA_DOMAIN", "AGENT_CLIENT_ID", "AGENT_KEY_ID", "AGENT_PRIVATE_KEY_JWK"}
)
if _OKTA_REQUIRED_VARS.issubset(os.environ):
    _incoming = kwargs.get("headers", {}) or {}
    _id_token = _incoming.get("X-DataRobot-Identity-Token") or _incoming.get(
        "x-datarobot-identity-token"
    )
    if _id_token:
        _id_jag = get_id_jag(_id_token)
        _access_token = get_access_token(_id_jag)
        _auth_ctx = completion_create_params.get("authorization_context") or {}
        _auth_ctx["okta_access_token"] = _access_token
        completion_create_params["authorization_context"] = _auth_ctx
```

> **Note:** The DataRobot FastAPI backend already forwards `X-DataRobot-Identity-Token` to the AI agent. Without this header, the block above is a no-op, and the AI agent responds normally without an `okta_access_token` in its authorization context.

Every MCP tool that the AI agent calls during the request can now read the access token from its authorization context and use it as a bearer token on calls to Okta-protected resources.

> **Important:** The DataRobot CLI's `dr start` command runs `copier recopy`, which regenerates template files, including `custom.py`. If you run `dr start` again after adding this block, reapply it. New files that you create, such as `token_exchange.py`, aren't affected.

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Start the DataRobot stack locally, and then send a chat request that carries a test ID token to confirm the full `id_token` → ID-JAG → `access_token` round trip:

```bash
cd datarobot-agent-application
dr run dev
```

```bash
curl -N -s -X POST "http://localhost:8080/api/v1/chat" \
  --header "Content-Type: application/json" \
  --header "Accept: text/event-stream" \
  --header "X-DATAROBOT-API-KEY: <your_datarobot_api_token>" \
  --header "X-DataRobot-Identity-Token: $ID_TOKEN" \
  --data '{
    "thread_id": "test-001",
    "run_id": "run-001",
    "state": null,
    "messages": [{"id": "msg-1", "role": "user", "content": "Hello"}],
    "tools": [], "context": [], "forwarded_props": null
  }'
```

A successful request streams back a response and confirms the full round trip. To confirm that the access token specifically reached the authorization context, temporarily add a log line in `agent/agent/myagent.py` that prints the authorization context's keys, and check the AI agent's terminal output for `okta_access_token` in the list.

<!-- TODO: Replace the temporary logging technique above with a confirmed, non-debug way to verify the token reached the MCP layer, if one becomes available. -->

## Troubleshoot your integration

The following errors are specific to the DataRobot integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| `token_exchange_invalid_audience` | The AI agent used the OIDC web app's client ID instead of its own client ID | Only the AI agent's `AGENT_CLIENT_ID` can perform the token exchange. The OIDC web app client can't |
| `XAA Step 1 failed` with an HTTP `400` error | The `id_token` wasn't issued for the OIDC web app you configured in [Before you begin](#before-you-begin) | Confirm the `id_token`'s `aud` claim matches that app's client ID |
| `okta_access_token` missing from `authorization_context` | One or more of the four required environment variables aren't set on the AI agent's process | Confirm all four are present. Run `printenv \| grep -E "OKTA\|AGENT_"` in the AI agent's terminal |
| `AGENT_PRIVATE_KEY_JWK` fails to parse as JSON | The value was stored with escaped quotes, or `source .env` mangled the JSON | Store the value as raw JSON with no surrounding quotes. After sourcing `.env`, re-export it with single quotes: `export AGENT_PRIVATE_KEY_JWK='{"kty":"RSA",...}'` |
| Token exchange code disappears after running `dr start` | `dr start` runs `copier recopy`, which regenerates `custom.py` from its template | Reapply the token exchange block to `custom.py` after any `dr start` run |

The following errors come from the Okta token exchange and are covered in [Set up imported AI agent token exchange: Troubleshooting](/docs/guides/ai-agent-third-party-token-exchange/main/#troubleshooting):

* `invalid_scope: openid not allowed`
* `invalid_client: JWKSet not configured`
* `invalid_client: kid is invalid`
* `access_denied: no_matching_policy`
* `Only service apps can use client_credentials`

## Next steps

Your AI agent can now authenticate as a user and call Okta-protected resources on their behalf. To define which resources and scopes you permit the AI agent to reach, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
* [DataRobot Agentic Starter Application](https://github.com/datarobot-community/datarobot-agent-application)
