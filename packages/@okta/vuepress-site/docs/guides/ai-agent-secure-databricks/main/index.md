---
title: Secure a Databricks Genie AI agent
excerpt: Learn how to add Okta authentication to an existing Databricks Genie AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to build a FastAPI wrapper that authenticates users with Okta, performs Okta's two-step token exchange internally, and then asks a Databricks Genie space a question. Your app owns the full flow: it exchanges the user's identity for a scoped access token that authorizes the call, obtains a separate Databricks access token, passes the user's verified identity to Genie in the message that it sends, and reads Genie's answer from Databricks.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Databricks-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what a registered AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your AI agent.
* Authenticate to Databricks with a service principal and start a Genie conversation.
* Pass a signed-in user's verified Okta identity to Genie and read its answer.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A Databricks workspace with serverless compute and a nonzero credit budget. Without credits, every Genie message fails. See [Troubleshoot your integration](#troubleshoot-your-integration).
* A Databricks Genie space that has tables and a SQL warehouse. See [Set up Databricks for Genie](#set-up-databricks-for-genie).
* A Databricks AI agent identity registered in Okta. See [Register your AI agent in Okta](#register-your-ai-agent-in-okta).
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an identity assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. You add it once as a reusable module. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (Databricks-specific). Genie is a managed surface. It can't read Okta tokens and has no custom code hook, so it can't run the exchange itself. Your wrapper uses the Okta access token only to authorize the call, and then authenticates to Databricks separately with a service principal. It starts a Genie conversation, passes the user's name and email from the `id_token` in the message text, and polls for Genie's answer. See [Integrate the token exchange with Genie](#integrate-the-token-exchange-with-genie).

```text
User
  { "prompt": "...", "id_token": "<okta_id_token>" }
    |
    v
Okta authentication (token_exchange.py)
  Step 1: id_token  ->  ID-JAG        (Org AS:    /oauth2/v1/token)
  Step 2: ID-JAG    ->  access_token  (Custom AS: /oauth2/{custom-as-id}/v1/token)
          The access token authorizes the call. It's never sent to Databricks.
    |
    v
Platform integration (Databricks: main_databricks.py)
  Step 3: client_credentials  ->  Databricks access token  (Workspace: /oidc/v1/token)
  Step 4: start a Genie conversation, with the user's name and email in the message text
          (Genie Conversation API: /api/2.0/genie/spaces/{space_id}/start-conversation)
  Step 5: poll the message for the answer
          (/api/2.0/genie/spaces/{space_id}/conversations/{id}/messages/{id})
    |
    v
Genie answer
```

> **Note:** The Okta `access_token` from steps 1 and 2 authorizes the call. If either step fails, your wrapper doesn't call Databricks. The token isn't forwarded to Databricks. The Databricks token from step 3 is a separate, service-level credential that authenticates your wrapper (not the user) to Databricks.

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

### Token types

Several tokens are in play. Don't confuse them.

| Token | Where it travels | Issued by | Used for |
| --- | --- | --- | --- |
| Okta `id_token` | Your app's sign-in session | Okta | The input to the token exchange, and the source of the user's name and email |
| ID-JAG | Your wrapper to Okta only | Okta org authorization server | An intermediate token that expires after 300 seconds |
| Okta `access_token` | Held by your wrapper, never forwarded | Okta custom authorization server | Proof of delegated authorization |
| Databricks OAuth token | Your wrapper to Databricks | Databricks | The identity that Genie runs as. Its permissions decide what data Genie can query. |

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` that your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* A Databricks AI agent identity registered in Okta that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the AI agent. See [Register your AI agent in Okta](#register-your-ai-agent-in-okta).

  > **Note:** Okta doesn't retain the AI agent's private key. Store it in a secrets manager when you generate it, because Okta shows it only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Register your AI agent in Okta

Register an AI agent identity in Okta for your Databricks Genie integration. The identity has its own client ID and key pair, and your wrapper uses them to perform the token exchange. You can register the AI agent manually or import it from Databricks. The following steps use manual registration. To import instead, see [Import your AI agent from Databricks](#import-your-ai-agent-from-databricks).

1. In the Admin Console, go to **Directory** > **AI Agents**, click **Register AI agent**, and then select **Register manually**.
1. On the **Profile** page, enter a **Name** and, optionally, a **Description**, for example, `databricks-xaa-poc`. Under **Identifier**, select the **Platform** and enter the **External ID**. For this guide, select **Databricks Genie Agents** as the **Platform**. For **External ID**, enter a unique ID for the AI agent from Databricks, such as the Genie space ID. Click **Next**.
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

### Import your AI agent from Databricks

Importing a Databricks AI agent works differently than registering an AI agent directly with its own key pair. Okta connects to your Databricks account through an OAuth app connection, discovers the AI agents in your workspaces, and imports them. You configure this on the Databricks app integration in your org.

> **Important:** The Databricks AI agent import is an Early Access feature that depends on Databricks beta APIs. Those APIs may change or be removed. Contact your Okta account team to enable Databricks AI Agent Import for your org, in addition to Okta for AI Agents. You can't turn it on yourself in **Settings** > **Features**. Until Okta enables it, the **AI agent import** tab doesn't appear on the Databricks app integration.

You need the Databricks account admin role in Databricks and the super admin or AI agent admin role in Okta.

Create an app connection in Databricks:

1. Sign in to the Databricks account console, for example, `accounts.cloud.databricks.com`.
1. Go to **Settings** > **App connections**, and then click **Add connection**.
1. In **Application Name**, enter a recognizable name, for example, `Okta AI Agent Import`.
1. In **Redirect URLs**, enter your Okta org URL followed by `/oauth2/v1/sts/callback`, for example, `https://{yourOktaDomain}/oauth2/v1/sts/callback`.
1. Under **Access scopes**, keep the default scopes and add `provisioning`, `workspace`, `supervisor-agents`, `knowledge-assistants`, and `genie`, each with **Read** permission. Read permission is enough, because the import only lists AI agents.
1. Optional. Set **Single-use Refresh Tokens**, **Access token TTL (in minutes)**, and **Refresh token TTL (in minutes)**.
1. Click **Add**. Copy the **Client ID** and **Client Secret** from the dialog and store them in a secrets manager. You can't retrieve the secret after you close the dialog.

> **Note:** You don't need to add `offline_access`. Databricks allows it automatically for app connections that you create in the account console, and Okta requests it so that Databricks issues a refresh token. Without a refresh token, the import works for about one hour and then fails with `NO_REFRESH_TOKEN` / `E0000009`. If you create the app connection with the Databricks API instead, include `offline_access` in its scopes.

Enable imports for the app in Okta:

1. In the Admin Console, go to **Directory** > **AI Agent Providers**, and then select your Databricks Universal Directory app integration. If you have multiple Databricks app integrations, only configure AI agent imports for one of them.
1. Go to the **AI agent import** tab, select **Configuration**, and then select **Enable AI agent import**.
1. Under **Configuration**, enter the following values:
   * **Client ID** and **Client Secret**: The values from your Databricks app connection
   * **Account console URL**: `https://accounts.cloud.databricks.com` (AWS), `https://accounts.gcp.databricks.com` (Google Cloud), or `https://accounts.azuredatabricks.net` (Azure)
   * **Account ID**: Your Databricks account ID. To find it, click your profile icon in the top-right corner of the Databricks account console.
   * **Platform**: **Genie Agents** for this guide. The other option is **Agent Bricks**. Each Databricks app instance imports exactly one of them.
   * **Workspace IDs**: Optional. Limits the import to specific workspaces.
1. Click **Test API Credentials**, and then sign in with your Databricks credentials in the pop-up. Allow pop-ups for your Okta org in your browser. In orgs with the enhanced AI agent schema feature, this button is labeled **Test and Save**. A successful test saves the credentials.
1. Choose your import schedule, matching criteria, and preview settings, and then click **Save configuration**.

   > **Note:** Saving the configuration for the first time doesn't start an import. The first import runs when you click **Import** or at the next scheduled time. After that, changing the connection settings starts an import automatically. The connection settings are the client credentials, account console URL, account ID, platform, and workspace IDs. Changing the schedule, matching, or preview settings doesn't start an import.

1. To run an import on demand, go to the **Imported AI agents** tab, and click **Import**. Before you save the configuration for the first time, only the **Configuration** tab appears. Click **Monitor imports** to see the progress. The **Imported AI agents** tab also lists the AI agents that Okta imported, including AI agents waiting in preview.

For the optional owner, schedule, matching, and preview settings, see [Enable AI agent imports](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-imports-enable.htm).

> **Note:** Importing an AI agent creates a new AI agent identity in Okta with its own client ID and key pair. If you also registered an AI agent manually for testing, you now have two unrelated AI agent identities. Make sure that `AGENT_CLIENT_ID` in your wrapper points at the one that you intend to use.

## Collect your configuration values

Your FastAPI app reads these values as environment variables. The token exchange module uses the first group. The second group is specific to Databricks.

<AiAgentOktaConfigValues/>

**Databricks values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `DB_HOST` | The full URL of your workspace, for example, `https://dbc-1234abcd-5678.cloud.databricks.com` | The Databricks workspace browser address bar |
| `DB_SP_CLIENT_ID` | The service principal's client ID | See [Create the Databricks identity that your wrapper uses](#create-the-databricks-identity-that-your-wrapper-uses) |
| `DB_SP_SECRET` | The service principal's OAuth secret | See [Create the Databricks identity that your wrapper uses](#create-the-databricks-identity-that-your-wrapper-uses) |
| `GENIE_SPACE_ID` | The ID of the Genie space that you want to call | The space URL (`/genie/rooms/<space_id>`), or `GET /api/2.0/genie/spaces` |

## Set up Databricks for Genie

### Create the Genie space

1. In the Databricks workspace, click **Genie** in the left navigation, and then click **New**.
1. Add the tables that the space uses, and select a SQL warehouse.
1. In the space's instructions, tell Genie how to use the identity text that your wrapper sends. For example: "Requests begin with the signed-in user's name and email, verified by Okta. Greet the user by name before answering." Without an instruction, Genie can ignore a greeting request and answer only data questions.
1. Copy the space ID from the space URL. You need it for `GENIE_SPACE_ID`.

> **Note:** Serverless SQL warehouses stop after 10 idle minutes. Start the warehouse before you test, because a stopped warehouse makes Genie messages fail or never finish. See [Troubleshoot your integration](#troubleshoot-your-integration).

### Create the Databricks identity that your wrapper uses

Genie runs as the identity that presents the Databricks token, so that identity's permissions decide what data Genie can query. Use a service principal with OAuth machine-to-machine (M2M) authentication for an unattended wrapper.

Create the service principal and its secret in the Databricks account console:

1. Sign in to the Databricks account console, for example, `accounts.cloud.databricks.com`.
1. Go to **Settings** > **User management** > **Service principals**, and then click **Add service principal**.
1. Enter a display name for the service principal, and then click **Add service principal**.
1. Open the service principal. On the **Principal information** tab, copy the application ID (a UUID). This is the client ID that you need for `DB_SP_CLIENT_ID`.
1. On the **Credentials & secrets** tab, under **OAuth secrets**, click **Generate secret**. Store the secret in a secrets manager. You need it for `DB_SP_SECRET`.

Add the service principal to the workspace, also in the account console:

1. Go to **Workspaces**, and then click the workspace name.
1. Open **Permissions**, and then click **Add permissions**.
1. Under **Identity**, search for the service principal's name.
1. Under **Workspace entitlements**, select **Databricks SQL access**.
1. Click **Add permissions**.

The roles on the service principal's **Roles** tab are account-level roles. They don't grant the access that the wrapper needs. Grant the remaining access from the workspace:

* **CAN USE** on the space's SQL warehouse
* **CAN RUN** (or higher) on the Genie space
* `USE CATALOG`, `USE SCHEMA`, and `SELECT` on the tables that the space uses

> **Note:** With a service principal, Genie sees the same data for every user. Databricks doesn't know who the Okta user is. For per-user data access, call Genie with that user's Databricks OAuth user-to-machine (U2M) token instead.

## Add Okta authentication to your AI agent

The `token_exchange.py` module that you create here has no dependency on Databricks.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange with Genie

This section is specific to Databricks. Here you authenticate to Databricks, start a Genie conversation, read its answer, and wire the result into your FastAPI app alongside the token exchange from the previous section.

### Add the FastAPI and Databricks dependencies

Add these to the same `requirements.txt`, alongside the token exchange dependencies:

```text
fastapi>=0.110.0
uvicorn>=0.29.0
httpx>=0.27.0
python-dotenv>=1.0.0
```

Install the complete set of dependencies:

```bash
pip install -r requirements.txt
```

### Project structure

```text
okta-databricks-agent/
├── main_databricks.py # FastAPI entry point: token exchange + Genie call
├── token_exchange.py  # Okta token exchange module
├── requirements.txt
└── .env               # Secrets (gitignored)
```

### Create your environment file

Create a `.env` file with both the Okta values and the Databricks values that you collected in [Collect your configuration values](#collect-your-configuration-values).

### Get a Databricks access token

Authenticate to Databricks with the OAuth 2.0 client credentials grant. This token authenticates your wrapper to Databricks. It's a separate, service-level credential, not the user's Okta access token.

```python
import os
import httpx

DB_HOST = os.environ["DB_HOST"]
DB_SP_CLIENT_ID = os.environ["DB_SP_CLIENT_ID"]
DB_SP_SECRET = os.environ["DB_SP_SECRET"]


def get_databricks_token() -> str:
    resp = httpx.post(
        f"{DB_HOST}/oidc/v1/token",
        auth=(DB_SP_CLIENT_ID, DB_SP_SECRET),
        data={"grant_type": "client_credentials", "scope": "all-apis"},
    )
    resp.raise_for_status()
    return resp.json()["access_token"]
```

> **Important:** Don't present the Okta-issued `id_token`, ID-JAG, or `access_token` to Databricks. Databricks can't consume Okta's tokens in this pattern. The Okta tokens authorize the call, and your wrapper uses its own Databricks credential for the call itself.

### Start a Genie conversation

The Genie Conversation API starts a conversation in a specific space. The message text carries the signed-in user's verified name and email from the `id_token`.

```python
GENIE_SPACE_ID = os.environ["GENIE_SPACE_ID"]


def start_genie_conversation(db_headers: dict, prompt: str, user_claims: dict) -> tuple[str, str]:
    """Start a Genie conversation. Return the conversation ID and the message ID."""
    content = (
        f"The signed-in user is {user_claims.get('name')} ({user_claims.get('email')}), "
        f"verified by Okta. {prompt}"
    )
    resp = httpx.post(
        f"{DB_HOST}/api/2.0/genie/spaces/{GENIE_SPACE_ID}/start-conversation",
        headers=db_headers,
        json={"content": content},
    )
    resp.raise_for_status()
    body = resp.json()
    return body["conversation_id"], body["message_id"]
```

The call is asynchronous. It returns immediately with a message that has the status `SUBMITTED`, so the answer isn't in this response:

```json
{
  "conversation_id": "01f1cdfcfe3f...",
  "message_id": "01f1cdfcfe56...",
  "message": {"status": "SUBMITTED"}
}
```

### Read the answer from Genie

Poll the message until its `status` is `COMPLETED`, `FAILED`, or `CANCELLED`. Genie's text reply is in `attachments[].text.content`. When Genie queried data, `attachments[].query` holds the SQL. A failure is in `error.error` and `error.type`.

```python
import time


def read_genie_answer(
    db_headers: dict, conversation_id: str, message_id: str, timeout: int = 600
) -> dict:
    """Poll the Genie message until it finishes, and then return its answer."""
    url = (
        f"{DB_HOST}/api/2.0/genie/spaces/{GENIE_SPACE_ID}"
        f"/conversations/{conversation_id}/messages/{message_id}"
    )
    deadline = time.monotonic() + timeout
    delay = 1
    while time.monotonic() < deadline:
        resp = httpx.get(url, headers=db_headers)
        resp.raise_for_status()
        message = resp.json()
        status = message.get("status")

        if status == "COMPLETED":
            attachments = message.get("attachments") or []
            return {
                "text": [a["text"]["content"] for a in attachments if a.get("text")],
                "queries": [a["query"]["query"] for a in attachments if a.get("query")],
            }
        if status in ("FAILED", "CANCELLED"):
            error = message.get("error") or {}
            raise RuntimeError(f"Genie {status}: {error.get('type')}: {error.get('error')}")

        time.sleep(delay)
        delay = min(delay * 2, 5)  # back off, up to 5 seconds between polls

    raise TimeoutError("Genie didn't finish in time.")


def ask_genie(prompt: str, user_claims: dict) -> dict:
    db_headers = {"Authorization": f"Bearer {get_databricks_token()}"}
    conversation_id, message_id = start_genie_conversation(db_headers, prompt, user_claims)
    return read_genie_answer(db_headers, conversation_id, message_id)
```

To ask a follow-up question, send `POST /api/2.0/genie/spaces/{space_id}/conversations/{conversation_id}/messages` with `{"content": "..."}`, and then poll the new message the same way.

## Wire it into the FastAPI entry point

In your app's entry point, call the two token exchange functions in order, decode the user's identity claims from the `id_token`, and then call Genie. The following example `main_databricks.py` imports the reusable token exchange module and adds only the Databricks-specific wiring:

```python
import jwt
from fastapi import FastAPI
from pydantic import BaseModel

from token_exchange import get_id_jag, get_access_token
# ask_genie from the previous step

app = FastAPI()


class InvokeRequest(BaseModel):
    id_token: str
    prompt: str


@app.post("/invoke")
def invoke(request: InvokeRequest) -> dict:
    # Okta authentication. If either step fails, the exception stops the request
    # before your wrapper calls Databricks.
    id_jag = get_id_jag(request.id_token)
    get_access_token(id_jag)

    # The org authorization server already validated the id_token in step 1.
    # Decoding it here only reads display claims to identify the user to
    # Genie. It isn't used to make an authorization decision.
    user_claims = jwt.decode(request.id_token, options={"verify_signature": False})

    # Platform integration (Databricks)
    answer = ask_genie(request.prompt, user_claims)

    return {
        "ok": True,
        "user": user_claims.get("email"),
        "answer": answer,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
```

> **Note:** Exchange the token on each request instead of caching it. The access token is valid for 24 hours while the ID-JAG is valid for only five minutes, so a cached user token carries far more risk than the exchange costs. Steps 1 and 2 are also one retryable unit. If step 2 fails, repeat both steps from the `id_token`, because the ID-JAG may have expired.

> **Important:** Before you use this pattern in production, add your own protection against `id_token` replay. This wrapper accepts an `id_token` in the request body. The exchange proves that the token is valid, not that it came from the caller's own sign-in session, so a stolen `id_token` can be replayed until it expires. Take the `id_token` from your wrapper's own sign-in session instead of the request body. If you keep the request body parameter, check that `aud` equals the OIDC app's client ID, `iss` is your Okta org, `exp` hasn't passed, and `nonce` matches if your wrapper started the sign-in.

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Start the SQL warehouse for your Genie space first, because it stops after 10 idle minutes:

```bash
databricks warehouses start <warehouse-id>
```

Start the entry point locally:

```bash
python3 main_databricks.py
```

In another terminal, send a request with your test ID token. This confirms the full `id_token`, ID-JAG, `access_token`, and Genie round trip:

```bash
curl -s -X POST http://localhost:8000/invoke \
  -H "Content-Type: application/json" \
  -d "{\"id_token\": \"$ID_TOKEN\", \"prompt\": \"Greet me by name in one sentence.\"}"
```

A successful response includes Genie's answer. In this example, Genie greets the user named in the Okta-verified identity text and runs no SQL, so `queries` is empty:

```json
{
  "ok": true,
  "user": "jessie.smith@example.com",
  "answer": {
    "text": ["Hi Jessie Smith."],
    "queries": []
  }
}
```

## Troubleshoot your integration

The following errors are specific to the Databricks integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| The Genie message fails with `RESOURCE_EXHAUSTED: You've reached your budget` (`BUDGET_EXCEEDED_EXCEPTION`) | The workspace has no credits, or the serverless budget is exhausted | Add credits or raise the budget. `start-conversation` still returns `SUBMITTED`, and the failure shows only when you poll |
| The message fails or never completes, but credits are available | The space's SQL warehouse is stopped. Serverless warehouses stop after 10 idle minutes | Start the warehouse with `databricks warehouses start <id>`, or `POST /api/2.0/sql/warehouses/{id}/start`, before the call |
| Okta step 2 returns `access_denied` with "Policy evaluation failed" | The custom authorization server's access policy rule no longer covers this AI agent or scope, for example, because someone edited it for another AI agent | Add or restore a rule for this AI agent with the JWT bearer grant and the scope. Keep one rule for each AI agent |
| Genie answers the data question but ignores the user's name | The space has no instruction about the identity text | Add a space instruction. See [Create the Genie space](#create-the-genie-space) |
| `403` or permission errors from Genie | The Databricks identity lacks CAN RUN on the space, CAN USE on the warehouse, or the Unity Catalog grants | Grant them to the service principal. See [Create the Databricks identity that your wrapper uses](#create-the-databricks-identity-that-your-wrapper-uses) |
| Genie sees a different user's data than the Okta user | Genie runs as the identity of the Databricks token, not the Okta user | This is expected with a service principal. For per-user data access, call Genie with that user's Databricks U2M token |
| Python client error `CERTIFICATE_VERIFY_FAILED: self-signed certificate in certificate chain` | A TLS-inspecting proxy is in the path, and Python's certificate bundle lacks its root CA | Use the operating system's trust store, for example, with the `truststore` package |
| The import stops working after about one hour | The connection was authorized before Okta requested `offline_access`, so Databricks issued no refresh token | Click **Test API Credentials** to authorize again |
| `access_denied` when you authorize the import | The app connection's scope permissions don't match what Okta requests | Set the listed scopes on the app connection, with at least **Read** permission |

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
* [Databricks Genie Conversation API](https://docs.databricks.com/aws/en/genie/conversation-api)
