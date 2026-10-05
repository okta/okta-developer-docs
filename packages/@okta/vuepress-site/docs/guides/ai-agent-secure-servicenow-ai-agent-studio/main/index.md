---
title: Secure a ServiceNow AI Agent Studio agent
excerpt: Learn how to add Okta authentication to an existing ServiceNow AI Agent Studio agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to build a FastAPI wrapper that authenticates users with Okta, performs Okta's two-step token exchange internally, and then calls a ServiceNow AI Agent Studio agent through the Virtual Agent Bot Integration API. Your app owns the full flow: it verifies who the user is, exchanges their identity for a scoped access token, obtains a separate ServiceNow access token for the Bot Integration API, and passes the user's verified identity to the AI agent as context.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the ServiceNow-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what an imported AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your AI agent.
* Authenticate to ServiceNow with the OAuth 2.0 client credentials grant and call the Virtual Agent Bot Integration API.
* Pass a signed-in user's verified Okta identity to a ServiceNow AI Agent Studio conversation.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A ServiceNow instance with AI Agent Studio enabled and a published agent that you can call
* An existing ServiceNow Universal Directory app integration in your Okta org. The ServiceNow AI agent import configuration lives on this app's **AI Agent Import** tab.
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. You add it once as a reusable module. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (ServiceNow-specific). Unlike the other platforms, ServiceNow doesn't accept an Okta-issued token directly. Your wrapper authenticates to ServiceNow separately with the OAuth 2.0 client credentials grant. Then it uses the resulting ServiceNow token to call the Virtual Agent Bot Integration API and pass the user's verified Okta identity as context in the message it sends to the AI agent. See [Integrate the token exchange into your AI Agent Studio agent](#integrate-the-token-exchange-into-your-ai-agent-studio-agent).

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
Platform integration (ServiceNow: agent.py)
  Step 3: client_credentials  ->  ServiceNow access token  (SN instance: /oauth_token.do)
  Step 4: START_CONVERSATION, send message with the user's Okta identity
          (Virtual Agent Bot Integration API: /api/sn_va_as_service/bot/integration)
    |
    v
AI Agent Studio agent response
```-->

> **Note:** The Okta `access_token` from steps 1 and 2 confirms the user's identity to your wrapper. It isn't forwarded to ServiceNow. The ID-JAG and Okta access token are scoped to Okta's own authorization server as their audience, so ServiceNow rejects them if presented directly to its token endpoint. The ServiceNow token from step 3 is a separate, service-level credential that authenticates your wrapper (not the user) to the Bot Integration API. See [Troubleshoot your integration](#troubleshoot-your-integration).

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` that your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim that matches the app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* The ServiceNow AI agent imported into Okta as an AI agent identity. See [Import your AI agent from ServiceNow](#import-your-ai-agent-from-servicenow).

  > **Note:** Okta doesn't retain the AI agent's private key. Store it in a secrets manager when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Import your AI agent from ServiceNow

Okta can discover and import AI agents directly from a connected ServiceNow instance.

<!-- TODO: Confirm the exact Admin Console navigation and field labels for ServiceNow AI agent import against a live org. The source material confirms a ServiceNow UD AI agent provider is available for discovery/import, but doesn't walk through the Okta-side import screens step by step the way the Salesforce and Google Vertex source material did. -->

1. In the Admin Console, go to **Directory** > **AI Agent Providers**. Select the ServiceNow Universal Directory app integration, and then click **Import**.
1. After the import completes, click **View agents**. You're directed to the AI agents page, where you can register the imported AI agents.
1. Note the client ID. You need it for `AGENT_CLIENT_ID`.
1. In **Client Authentication**, select **Public Key / Private Key**. Generate an RSA key pair, and register the public JWK. Note the `kid`. You need it for `AGENT_KEY_ID`.
1. In **Resource connections**, link the OIDC web app you created in [Before you begin](#before-you-begin) and the custom authorization server with your custom scope.
1. Activate the AI agent.

## Set up your ServiceNow instance

Configure a separate, service-level integration in ServiceNow so that your wrapper can authenticate to the Virtual Agent Bot Integration API. This is independent of the Okta AI agent that you imported in the previous section.

### Enable the client credentials grant type

ServiceNow disables the OAuth client credentials grant by default. Create a system property to turn it on.

1. In the Filter Navigator, go to `sys_properties.list`.
1. Click **New**, and set the following:
   * **Name**: `glide.oauth.inbound.client.credential.grant_type.enabled`
   * **Type**: `true | false`
   * **Value**: `true`
1. Click **Submit**.

### Create a dedicated service user

Use a non-interactive service user rather than your own admin account.

1. Go to **User Administration** > **Users**, and click **New**.
1. Set **User ID** to a descriptive name, for example, `api_ai_agent_user`.
1. Select **Internal Integration User**. This prevents the user from signing in through the UI.
1. Save the record, and then add the following roles on the **Roles** tab:
   * `sn_aia.admin` (required to read AI Agent Studio tables)
   * `web_service_admin` (allows access to REST APIs)
   * `sn_va_as_service.integration_user` (required to call the Virtual Agent Bot Integration API)

### Create the Application Registry

1. Go to **System OAuth** > **Application Registry**, and click **New**.
1. Select **Create an OAuth API endpoint for external clients**.
1. Set **Name** to a descriptive name, for example, `ai_agents_poc`.

   > **Note:** If **Default Grant Type** or **OAuth Application User** aren't visible on the form, click the **Additional Actions** menu, select **Configure** > **Form Layout**, and move both fields from **Available** to **Selected**.

1. Set **Default Grant Type** to **Client Credentials**.
1. Set **OAuth Application User** to the service user you created in the previous section.
1. Click **Update**, and then note the **Client ID** and **Client Secret**. You need them for `SN_CLIENT_ID` and `SN_CLIENT_SECRET`.

### Collect your configuration values

Your FastAPI app reads these values as environment variables. The token exchange module uses the first group. The second group is specific to ServiceNow.

<AiAgentOktaConfigValues/>

**ServiceNow values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `SN_INSTANCE_URL` | Your ServiceNow instance hostname, for example `example.service-now.com` | The URL bar when you're signed in to your ServiceNow instance |
| `SN_CLIENT_ID` | The Application Registry's client ID | **System OAuth** > **Application Registry** > your registry |
| `SN_CLIENT_SECRET` | The Application Registry's client secret | **System OAuth** > **Application Registry** > your registry |

<!-- TODO: Confirm whether the Virtual Agent Bot Integration API requires an additional environment variable to target a specific published AI Agent Studio agent (for example, a bot or skill ID). The sample START_CONVERSATION payload in the source material doesn't include such a field, which may mean the instance's default Virtual Agent bot routes the message to the correct AI Agent Studio skill automatically based on topic/NLU matching, rather than your wrapper addressing a specific agent ID directly. Verify this against a live instance before publishing. -->

## Add Okta authentication to your AI agent

The following example `token_exchange.py` module that you create here has no dependency on ServiceNow.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your AI Agent Studio agent

This section is specific to ServiceNow. Here you authenticate to ServiceNow, call the Virtual Agent Bot Integration API, and wire the result into your FastAPI app alongside the token exchange from the previous section.

### Add the FastAPI and ServiceNow dependencies

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
okta-servicenow-agent/
├── main_servicenow.py # FastAPI entry point: token exchange + ServiceNow call
├── token_exchange.py  # Okta token exchange module
├── requirements.txt
├── Dockerfile
├── .env               # Secrets (gitignored)
└── .env.example       # Template
```

### Create your environment file

Create a `.env` file with both the Okta values and the ServiceNow values that you collected in [Collect your configuration values](#collect-your-configuration-values).

### Get a ServiceNow access token

Authenticate to ServiceNow with the OAuth 2.0 client credentials grant. This token authenticates your wrapper to the Virtual Agent Bot Integration API. It's a separate, service-level credential, not the user's Okta access token.

```python
import os
import httpx

SN_INSTANCE_URL = os.environ["SN_INSTANCE_URL"]
SN_CLIENT_ID = os.environ["SN_CLIENT_ID"]
SN_CLIENT_SECRET = os.environ["SN_CLIENT_SECRET"]


def get_servicenow_token() -> str:
    resp = httpx.post(
        f"https://{SN_INSTANCE_URL}/oauth_token.do",
        data={
            "grant_type": "client_credentials",
            "client_id": SN_CLIENT_ID,
            "client_secret": SN_CLIENT_SECRET,
        },
    )
    resp.raise_for_status()
    return resp.json()["access_token"]
```

> **Important:** Don't present the Okta-issued `id_token`, ID-JAG, or `access_token` to this endpoint instead of your service credentials. ServiceNow validates the `aud` claim of any JWT bearer assertion against its own token endpoint. Okta's tokens carry Okta's authorization server as their audience, so ServiceNow rejects them with a `401 Unauthorized` error. See [Troubleshoot your integration](#troubleshoot-your-integration).

### Call the Virtual Agent Bot Integration API

The Bot Integration API starts a conversation and sends the user's prompt as a message.

```python
import uuid

SN_INSTANCE_URL = os.environ["SN_INSTANCE_URL"]


def ask_servicenow_agent(prompt: str, user_claims: dict) -> str:
    sn_token = get_servicenow_token()
    sn_headers = {
        "Authorization": f"Bearer {sn_token}",
        "Content-Type": "application/json",
    }

    resp = httpx.post(
        f"https://{SN_INSTANCE_URL}/api/sn_va_as_service/bot/integration",
        headers=sn_headers,
        json={
            "action": "START_CONVERSATION",
            "requestId": str(uuid.uuid4()),
            "clientSessionId": str(uuid.uuid4()),
            "userId": user_claims.get("email"),
            "message": {
                "text": prompt,
                "typed": True,
            },
            "silent": False,
        },
    )
    resp.raise_for_status()
    return resp.json()
```

<!-- TODO: Confirm the exact response shape against a live instance. The source material confirms the API supports a synchronous response for immediate AI agent outputs, as well as asynchronous webhook callbacks for multi-step AI agent actions, but doesn't confirm the JSON field names for either path. Confirm the exact field(s) that carry the AI agent's reply text in the synchronous response body, and document the SEND_MESSAGE follow-up call (using the conversation ID returned from START_CONVERSATION) for multi-turn exchanges. Also confirm whether/how to surface the user's verified Okta identity (name, email) as message context, since the sample payload only has a top-level userId field and a plain-text message field, unlike the Salesforce and Vertex platforms, which accept a free-form context string. -->

> **Note:** The `userId` field identifies the requesting user to ServiceNow's conversational session, separate from the `SN_CLIENT_ID`/`SN_CLIENT_SECRET` service credential that authenticates your wrapper. Use a stable identifier for the signed-in user, such as their email address from `id_token` claims.

## Wire it into the FastAPI entry point

In your app's entry point, call the two token exchange functions in order, decode the user's identity claims from the `id_token`, and then call the ServiceNow AI agent. The following example `main_servicenow.py` imports the reusable token exchange module and adds only the ServiceNow-specific wiring:

```python
import jwt
from fastapi import FastAPI
from pydantic import BaseModel

from token_exchange import get_id_jag, get_access_token
# ask_servicenow_agent from the previous step

app = FastAPI()


class InvokeRequest(BaseModel):
    id_token: str
    prompt: str


@app.post("/invoke")
def invoke(request: InvokeRequest) -> dict:
    # Okta authentication
    id_jag = get_id_jag(request.id_token)
    access_token = get_access_token(id_jag)

    # The org authorization server already verified the id_token in Step 1.
    # Decoding it here only reads display claims to identify the user to
    # ServiceNow. It isn't used to make an authorization decision.
    user_claims = jwt.decode(request.id_token, options={"verify_signature": False})

    # Platform integration (ServiceNow)
    answer = ask_servicenow_agent(request.prompt, user_claims)

    return {
        "ok": True,
        "answer": answer,
        "user": user_claims.get("email"),
        "access_token_prefix": access_token[:10],
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Run the entry point locally, passing a test ID token to confirm the full `id_token` → ID-JAG → `access_token` → ServiceNow round trip:

```bash
python3 main_servicenow.py
```

<!-- TODO: Replace with a confirmed curl invocation and a real sample response once the Bot Integration API's response shape is verified against a live instance (see TODOs above). -->

## Troubleshoot your integration

<!-- TODO: The source material didn't include a confirmed table of ServiceNow-specific errors, root causes, and fixes for the Bot Integration API itself (unlike the AWS Bedrock and Salesforce Agentforce guides' tables). Add one here once available. Likely candidates based on the setup flow: a service user missing one of the required roles, the client credentials grant type property left disabled, and a 403 from the integration user lacking the sn_va_as_service.integration_user role. -->

| Error | Root cause | Fix |
| --- | --- | --- |
| `401 Unauthorized` from `/oauth_token.do` when presenting an ID-JAG or Okta `access_token` as the `assertion` | ServiceNow validates the JWT's `aud` claim against its own token endpoint. Okta's tokens carry Okta's authorization server as their audience, not ServiceNow's | Don't use the ID-JAG or Okta `access_token` as a JWT bearer assertion against ServiceNow. Authenticate separately with the OAuth 2.0 client credentials grant, using `SN_CLIENT_ID` and `SN_CLIENT_SECRET` |
| Client credentials token request fails even with correct credentials | The `glide.oauth.inbound.client.credential.grant_type.enabled` system property is missing or set to `false` | Set the property to `true` in `sys_properties.list` |

[Set up imported AI agent token exchange: Troubleshooting](/docs/guides/ai-agent-third-party-token-exchange/main/#troubleshooting) covers the following errors from the Okta token exchange:

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
<!-- TODO: Add a link to ServiceNow's own Virtual Agent Bot Integration API and AI Agent Studio platform documentation once the correct public URLs are confirmed (the ones found during drafting redirected to a generic landing page). -->
