---
title: Secure a Databricks AI agent
excerpt: Learn how to add Okta authentication to an existing Databricks AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide explains how to secure a Databricks AI agent by adding Okta identity verification to a Databricks app that runs the MLflow `AgentServer`. It assumes that you have a functional Databricks app that serves an AI agent and that you can modify its code. The app reads the signed-in user's Okta `id_token` from a request header, performs Okta's two-step token exchange, and then calls downstream resources on the user's behalf.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Databricks-specific code and configuration that consumes it.

<span style="color: #c0392b;">**TODO:** Databricks hosts AI agents across several product areas and surfaces (Agent Bricks, Genie Agents, and deployed custom agents). Confirm with the PM and engineering how the guide names the surface that this integration targets. This draft treats "Databricks AI agent" as an AI agent served by a Databricks app, and treats Agent Bricks as the import surface if you use import.</span>

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what a registered AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your Databricks AI agent.
* Read the Okta `id_token` from a request header in an MLflow `AgentServer` app and call a downstream resource with the resulting access token.
* Store the AI agent's private key as a Databricks secret and deploy the app.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A Databricks workspace with Databricks Apps enabled, and permission to create apps and secret scopes
* An existing Databricks app that serves an AI agent through the MLflow `AgentServer`. The [Databricks agent app templates](https://github.com/databricks/app-templates) are a good starting point.
* A Databricks AI agent identity registered in Okta. See [Register your AI agent in Okta](#register-your-ai-agent-in-okta).
* The [Databricks CLI](https://docs.databricks.com/aws/en/dev-tools/cli/), authenticated to your workspace
* [Python](https://www.python.org/) 3.10 or later, [Node.js](https://nodejs.org/) 20, and [uv](https://docs.astral.sh/uv/)

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an identity assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. You add it once as a reusable module. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (Databricks-specific). The Databricks app receives two tokens on each request. The Databricks OAuth token authenticates the caller to the app, and the Okta `id_token` arrives in its own header. Your handler reads the `id_token` header, calls the token exchange, and makes the access token available to the AI agent's tools. See [Integrate the token exchange into your Databricks app](#integrate-the-token-exchange-into-your-databricks-app).

<span style="color: #c0392b;">**TODO:** Replace this text-based diagram with an image.</span>

```text
User
  signs in with Okta -> receives id_token
    |
    v
Caller sends both tokens to the Databricks app (POST /responses)
  Authorization: Bearer <databricks_oauth_token>
  X-Okta-Identity-Token: <okta_id_token>
    |
    v
Okta authentication (token_exchange.py)
  Step 1: id_token  ->  ID-JAG        (Org AS:    /oauth2/v1/token)
  Step 2: ID-JAG    ->  access_token  (Custom AS: /oauth2/{custom-as-id}/v1/token)
    |
    v
Platform integration (Databricks app: agent.py)
  invoke handler stores the access token for the request
    |
    v
Okta-protected resource (API or MCP server)
  Authorization: Bearer <access_token>
```

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

### Token types

Two tokens travel on the same request. Don't confuse them.

| Token | Header | Issued by | Used for |
| --- | --- | --- | --- |
| Databricks OAuth token | `Authorization: Bearer` | Databricks | Authenticates the caller to the app. Personal access tokens (PATs) don't work. |
| Okta `id_token` | `X-Okta-Identity-Token` | Okta | The input to the token exchange |

Databricks also injects an `x-forwarded-access-token` header. Databricks issues that token, not Okta, so you can't use it for the token exchange.

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` that your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* A Databricks AI agent identity registered in Okta that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the AI agent. See [Register your AI agent in Okta](#register-your-ai-agent-in-okta).

  > **Note:** Okta doesn't retain the AI agent's private key. Store it in a Databricks secret when you generate it, because Okta shows it only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Register your AI agent in Okta

<span style="color: #c0392b;">**TODO:** This draft registers the AI agent manually, as in the engineering proof of concept (OKTA-1291961). Pending confirmation from engineering on whether manual registration is a supported path for Databricks and when the Databricks import provider becomes available to customers (OKTA-1284118). The import procedure is preserved at the end of this section. If import becomes the primary path, restore it and move this procedure to an alternative.</span>

Register an AI agent identity in Okta for your Databricks app. The identity has its own client ID and key pair, and your app uses them to perform the token exchange.

1. In the Admin Console, go to **Directory** > **AI Agents**, click **Register AI agent**, and then select **Register manually**.
1. On the **Profile** page, enter a **Name** and **Description**, for example, `databricks-xaa-poc`. Under **Identifier**, enter the **Platform** (the builder platform, **Databricks**) and the **External ID** (a unique ID for the AI agent from Databricks, such as the app name). Click **Next**.
1. On the **User access** page, link the OIDC web app that signs users in. Either create a new OIDC app linked to this AI agent, or select your existing OIDC app. You can also complete this step later on the **User access** tab.

   > **Important:** This action permanently links the AI agent to the app. To change the link, delete the AI agent and recreate it. Each app links to one AI agent, and each AI agent links to one app.

1. Click the **Client registration** tab, and then click **Configure** next to **Public/private key**.
1. Click **Add public key**, and then click **Generate new key**.
1. Click **Copy to clipboard** and store the private key in a secrets manager. Okta shows the private key only once. Click **Done**.
1. Copy the **Client ID**. It starts with `wlp`. Click **Activate**, and then click **Enable**.
1. Click the **Resource connections** tab, and then click **Add resource connection**.
1. For **Resource type**, select **Authorization server**, and then select your custom authorization server.
1. Under **Scopes**, select **Only allow**, and enter your custom scope, for example, `xaa:read`. Click **Add**.
1. Click **Actions** > **Activate**, and then click **Confirm**.

> **Note:** If you create the OIDC app from the AI agent's **User access** page, the app shares the AI agent's client ID. In that case, the OIDC client ID and `AGENT_CLIENT_ID` are the same `wlp` value. If you select an existing OIDC app, the two values differ, and the `id_token` `aud` claim holds the OIDC app's client ID.

<span style="color: #c0392b;">**TODO:** Confirm the exact Admin Console labels and step order for manual registration against the current UI, and confirm that Databricks appears as a Platform option without the import provider enabled. The steps above come from the engineering proof of concept notes, not from a published Okta Help Center article.</span>

<span style="color: #c0392b;">**TODO:** Import procedure, preserved for now. Restore as the primary or an alternative path once engineering confirms the way forward.</span>

<div style="color: #c0392b;">

Importing a Databricks AI agent works differently than registering an AI agent directly with its own key pair. Okta connects to your Databricks account through an OAuth app connection, discovers the AI agents in your workspaces, and imports them. You configure this on the Databricks app integration in your org.

Important: The Databricks import is an Early Access feature that depends on Databricks beta APIs. Those APIs may change or be removed.

Open question: Confirm whether the Databricks app integration is available by default in customer orgs and whether any extra enablement is needed before the Databricks provider appears in the Admin Console. Engineering notes say "databricks" isn't in the default list of import-eligible app names (OKTA-1284118). In one test org, there was no Databricks app in the OIN or in Directory > AI Agent Providers.

You need the Databricks account admin role in Databricks and the super admin or AI agent admin role in Okta.

Create an app connection in Databricks:

1. Sign in to the Databricks account console, for example, accounts.cloud.databricks.com.
1. Go to Settings > App connections, and then click Add connection.
1. In Application Name, enter a recognizable name, for example, Okta AI Agent Import.
1. In Redirect URLs, enter your Okta org URL followed by /oauth2/v1/sts/callback, for example, https://{yourOktaDomain}/oauth2/v1/sts/callback.
1. Under Access scopes, keep the default scopes and add provisioning, workspace, supervisor-agents, knowledge-assistants, and genie.
   Open question: Engineering notes say the import also needs the offline_access scope to receive a refresh token. Without it, the import works for about one hour and then fails with NO_REFRESH_TOKEN / E0000009. The Okta Help Center article doesn't list this scope. Confirm with engineering whether to add it to this list.
1. Optional. Set Single-use Refresh Tokens, Access token TTL (in minutes), and Refresh token TTL (in minutes).
1. Click Add. Copy the Client ID and Client Secret from the dialog and store them in a secrets manager. You can't retrieve the secret after you close the dialog.

Configure the import in Okta:

1. In the Admin Console, go to Applications > Applications and Resources. (The general imports article says Directory > AI Agent Providers. Confirm the current path.)
1. Open your Databricks app integration, and then click the AI Agent Import tab.
1. Select Enable AI agent imports.
1. Under Configuration, enter the following values:
   * Client ID and Client Secret: The values from your Databricks app connection
   * Account Console URL: https://accounts.cloud.databricks.com (AWS), https://accounts.gcp.databricks.com (Google Cloud), or https://accounts.azuredatabricks.net (Azure)
   * Account ID: Your Databricks account ID. To find it, click your profile icon in the top-right corner of the Databricks account console.
   * Platform: Agent Bricks or Genie Agents. Each app instance imports one platform.
   * Workspace IDs: Optional. Limits the import to specific workspaces.
1. Click Test API Credentials, and then sign in with your Databricks credentials when prompted.
1. Click Save configuration, and then run the import.

For the optional owner, schedule, matching, and preview settings, see https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-imports-enable.htm

Note: Importing an AI agent creates a new AI agent identity in Okta with its own client ID and key pair. If you also registered an AI agent manually for testing, you now have two unrelated AI agent identities. Make sure that AGENT_CLIENT_ID in your app points at the one you intend to use.

</div>

## Collect your configuration values

Your Databricks app code reads these values as environment variables. The token exchange module consumes the first group. The second group is specific to Databricks.

<AiAgentOktaConfigValues/>

**Databricks values (used by the platform integration):**

| Item | Description | Where to find it |
| --- | --- | --- |
| Workspace URL | The URL of the workspace that hosts your app, for example, `https://dbc-1234abcd-5678.cloud.databricks.com` | Databricks workspace browser address bar |
| App name | The name of your Databricks app. To appear in the workspace **Agents** list, the name must start with `agent-`. | **Databricks workspace** > **Compute** > **Apps** |
| Secret scope and key | The scope and key that store the AI agent's private JWK, for example, `okta-xaa` and `agent-private-key-jwk` | You create these in [Store the private key as a secret](#store-the-private-key-as-a-secret) |

## Add Okta authentication to your AI agent

The `token_exchange.py` module that you create here has no dependency on Databricks.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your Databricks app

This section is specific to Databricks. Here you call `get_id_jag` and `get_access_token` from your app's invoke handler, and make the resulting access token available to the AI agent's tools.

### Choose the integration point

Run the token exchange in a Databricks app that serves your AI agent through the MLflow `AgentServer`. The handler owns the exchange, and it runs on every request that carries the `id_token` header.

Databricks apps are the right runtime for this integration. The `AgentServer` stores every inbound request header before it calls your handler, so your code can read a header that you define. A Model Serving endpoint doesn't expose HTTP headers to the model, so the `id_token` must travel in the request body. MLflow traces and inference tables capture the request body, which exposes the `id_token`. Genie, Knowledge Assistant, and Supervisor Agent are managed surfaces with no custom code hook, so you can't add the token exchange to them directly.

<span style="color: #c0392b;">**TODO:** Confirm with the PM whether the guide covers the Model Serving fallback (passing the id_token in custom_inputs) or only the Databricks app path. This draft covers only the app path.</span>

### Add the Databricks dependencies

Add the token exchange dependencies to your app's `pyproject.toml`, alongside the existing dependencies:

```toml
dependencies = [
    # ... existing dependencies
    "PyJWT>=2.8.0",
    "cryptography>=42.0.0",
    "requests>=2.31.0",
]
```

### Resolve the access token for each request

Save the `token_exchange.py` module in your app's `agent_server` folder, and then create `agent_server/okta_context.py` next to it. This file reads the `id_token` header, runs the two exchange steps, and stores the access token for the current request so that your tools can read it.

```python
import logging
from contextvars import ContextVar

from mlflow.genai.agent_server import get_request_headers

from agent_server.token_exchange import get_id_jag, get_access_token

logger = logging.getLogger(__name__)

# Starlette lowercases request headers, so read the lowercase name.
OKTA_ID_TOKEN_HEADER = "x-okta-identity-token"

_okta_access_token: ContextVar[str | None] = ContextVar("okta_access_token", default=None)


def get_okta_access_token() -> str | None:
    """Return the user-scoped Okta access token for this request, or None."""
    return _okta_access_token.get()


def resolve_okta_access_token() -> str | None:
    """Run the token exchange if the request carries an Okta id_token."""
    id_token = get_request_headers().get(OKTA_ID_TOKEN_HEADER)
    if not id_token:
        return None

    try:
        id_jag = get_id_jag(id_token)
        access_token = get_access_token(id_jag)
    except Exception:
        logger.exception("Okta token exchange failed")
        return None

    _okta_access_token.set(access_token)
    return access_token
```

> **Note:** Exchange the token on each request instead of caching it. The access token is valid for 24 hours while the ID-JAG is valid for only five minutes, so a cached user token in memory carries far more risk than the exchange costs. Steps 1 and 2 are also one retryable unit. If step 2 fails, repeat both steps from the `id_token`, because the ID-JAG may have expired.

<span style="color: #c0392b;">**TODO:** Engineering flagged an open security item. The app doesn't compare the id_token `sub` claim with the X-Forwarded-Email header that Databricks adds. Without that check, anyone who can reach the app can present any valid id_token and the app acts as that user. Decide with engineering whether this guide adds the check or documents it as a prerequisite before production use.</span>

### Call the token exchange from the invoke handler

In your `agent_server/agent.py`, call `resolve_okta_access_token()` at the top of each handler. The following example shows the `invoke_handler` with only the Okta-specific lines added to the template:

```python
from agent_server.okta_context import get_okta_access_token, resolve_okta_access_token


@invoke()
async def invoke_handler(request: ResponsesAgentRequest) -> ResponsesAgentResponse:
    # Okta authentication: does nothing if the request has no id_token header
    resolve_okta_access_token()

    # ... the rest of your existing handler
```

Add the same `resolve_okta_access_token()` call at the top of your `stream_handler`.

A tool then reads the access token with `get_okta_access_token()` and attaches it to the downstream call:

```python
import requests
from agents import function_tool

from agent_server.okta_context import get_okta_access_token


@function_tool
def call_protected_api() -> str:
    """Call an Okta-protected API on behalf of the signed-in user."""
    token = get_okta_access_token()
    if not token:
        return "No Okta access token for this request."
    resp = requests.get(
        "https://api.example.com/resource",  # replace with your Okta-protected API
        headers={"Authorization": f"Bearer {token}"},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.text
```

Register the tool on your AI agent, for example, `tools=[call_protected_api]`.

### Store the private key as a secret

Never put the private key JWK in `app.yaml` as a literal value. Store it in a Databricks secret scope instead:

```bash
databricks secrets create-scope okta-xaa
databricks secrets put-secret okta-xaa agent-private-key-jwk
```

Then add the secret to your app as a resource and grant the app's service principal the **Can read** permission on it.

### Configure the app

In `databricks.yml`, add the secret resource alongside your existing app resources. The resource key is what `app.yaml` references.

```yaml
resources:
  apps:
    agent_okta_xaa:
      name: 'agent-okta-xaa'
      source_code_path: ./
      config:
        command: ['uv', 'run', 'start-app']
      resources:
        - name: 'okta_private_key'
          secret:
            scope: 'okta-xaa'
            key: 'agent-private-key-jwk'
            permission: 'READ'
```

In `app.yaml`, add the Okta values to the `env` section. Use `valueFrom` for the private key so that the app reads the secret at runtime:

```yaml
env:
  # ... existing variables
  - name: OKTA_DOMAIN
    value: "example.okta.com"
  - name: OKTA_CUSTOM_AS_ID
    value: "default"
  - name: OKTA_SCOPE
    value: "xaa:read"
  - name: AGENT_CLIENT_ID
    value: "wlp9k6..."
  - name: AGENT_KEY_ID
    value: "<kid>"
  - name: AGENT_PRIVATE_KEY_JWK
    valueFrom: "okta_private_key"
```

> **Note:** In `databricks.yml`, the key for referencing a resource is `value_from`. In `app.yaml`, it's `valueFrom`. Each file keeps its own convention.

<span style="color: #c0392b;">**TODO:** Confirm that OKTA_DOMAIN takes a bare domain (no https:// prefix) in the shared token_exchange.py module, consistent with the Okta values table. The engineering sample code used a full URL with the https:// prefix.</span>

If your workspace uses an Enterprise-tier network policy, add your Okta domain to the policy's allowed destinations. Otherwise, the token exchange requests from the app fail with a connection error.

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

### Run the app locally

Databricks forwarded headers exist only inside Databricks Apps, but the token exchange reads a header that you set, so a local run exercises the whole flow.

```bash
uv run quickstart

export OKTA_DOMAIN="example.okta.com"
export OKTA_CUSTOM_AS_ID="default"
export OKTA_SCOPE="xaa:read"
export AGENT_CLIENT_ID="wlp9k6..."
export AGENT_KEY_ID="<kid>"
export AGENT_PRIVATE_KEY_JWK='{"kty":"RSA",...}'

uv run start-app
```

Send a request with your test ID token in the `X-Okta-Identity-Token` header:

```bash
curl -s -X POST "http://localhost:8000/responses" \
  -H "Content-Type: application/json" \
  -H "X-Okta-Identity-Token: $ID_TOKEN" \
  -d '{"input": [{"role": "user", "content": "Who am I?"}]}'
```

> **Note:** A complete `POST /responses` call also queries the LLM serving endpoint that your app uses. Run `databricks auth login` first so that the local app can reach it. The token exchange runs before the LLM call.

### Deploy and invoke the app

Deploy the app with the Databricks CLI:

```bash
databricks bundle validate
databricks bundle deploy
databricks bundle run agent_okta_xaa
```

Get a Databricks OAuth token. PATs don't work against an app URL.

```bash
databricks auth login --host https://<workspace-host>
DB_TOKEN=$(databricks auth token | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")
```

Invoke the deployed app with both tokens:

```bash
curl -s -X POST "https://<app-url>.databricksapps.com/responses" \
  -H "Authorization: Bearer $DB_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Okta-Identity-Token: $ID_TOKEN" \
  -d '{"input": [{"role": "user", "content": "Who am I?"}]}'
```

<span style="color: #c0392b;">**TODO:** Add a sample successful response for the deployed invoke. Engineering hasn't run the deployed invoke yet because it's blocked on Databricks credits (2026-10-07). The Okta exchange and the in-handler code path were verified locally against a live org, but the response body of a deployed app isn't confirmed.</span>

To confirm that the exchange ran, stream the app's logs and look for your own log lines for the token exchange:

```bash
databricks apps logs agent-okta-xaa --follow --source APP
```

<span style="color: #c0392b;">**TODO:** The sample code in this guide doesn't log the exchange steps. If you want a log check here, add logger.info calls to resolve_okta_access_token that print only a token prefix, never a whole token.</span>

## Troubleshoot your integration

The following errors are specific to the Databricks integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| The exchange uses `x-forwarded-access-token` as the subject token | That header holds a token that Databricks issued, not the Okta `id_token` | Pass the Okta `id_token` in your own header, `X-Okta-Identity-Token` |
| Both token requests fail with a connection error | An Enterprise-tier workspace network policy blocks your Okta domain | Add your Okta domain to the network policy, then redeploy or restart the app |
| `401` from the app URL | You used a PAT | Use a Databricks OAuth token. Run `databricks auth token` |
| `AGENT_PRIVATE_KEY_JWK` is empty at runtime | You declared the variable with `value` instead of `valueFrom`, or the app's service principal can't read the secret | Use `valueFrom` with the secret resource key, and grant the service principal **Can read** on the secret |
| The app is missing from the workspace **Agents** list | The app name doesn't start with `agent-` | Rename the app to `agent-...` |
| The token exchange never runs | The request has no `X-Okta-Identity-Token` header, or the Okta environment variables are missing | Send the header, and confirm that you set all the Okta environment variables in the app |
| The header lookup returns `None` | You looked up the header with its original capitalization | Read the lowercase name, `x-okta-identity-token` |
| The `id_token` appears in MLflow traces or inference tables | You passed the `id_token` in the request body instead of a header | Pass the `id_token` in a header |

<span style="color: #c0392b;">**TODO:** Import-specific troubleshooting row, preserved until engineering confirms the way forward. Row: "The import stops working after about one hour" / "The Databricks app connection doesn't issue a refresh token" / "Add the offline_access scope to the Databricks app connection". It comes from engineering notes and isn't in the Okta Help Center article. Confirm it before restoring.</span>

The following errors come from the Okta token exchange and are covered in [Set up imported AI agent token exchange: Troubleshooting](/docs/guides/ai-agent-third-party-token-exchange/main/#troubleshooting):

* `invalid_scope: openid not allowed`
* `invalid_client: JWKSet not configured`
* `invalid_client: kid is invalid`
* `access_denied: no_matching_policy`
* `Only service apps can use client_credentials`

## Next steps

Your AI agent can now authenticate as a user and call Okta-protected resources on their behalf. To define the resources and scopes you permit the AI agent to reach, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
* [Databricks Apps documentation](https://docs.databricks.com/aws/en/dev-tools/databricks-apps/)
