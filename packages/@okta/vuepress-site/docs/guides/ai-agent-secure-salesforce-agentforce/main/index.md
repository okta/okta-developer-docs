---
title: Secure a Salesforce Agentforce agent
excerpt: Learn how to add Okta authentication to an existing Salesforce Agentforce agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to build a FastAPI wrapper that authenticates users with Okta, performs Okta's two-step token exchange internally, and then calls a Salesforce Agentforce agent through the Agent API. Your app owns the full flow: it verifies who the user is, exchanges that identity for a scoped access token, obtains a separate Salesforce access token for the Agentforce Agent API, and passes the user's verified identity to the agent as context. Finally, you deploy this containerized wrapper to Azure Container Apps.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Salesforce Agentforce-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what a third-party AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your agent.
* Authenticate to Salesforce with the OAuth 2.0 client credentials grant and call the Agentforce Agent API.
* Pass a signed-in user's verified Okta identity to an Agentforce agent session.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A Salesforce org with Agentforce enabled and an active Agentforce Service Agent (`ExternalCopilot` type) that you can call
* An Azure subscription with access to Azure Container Apps
* The [Azure CLI](https://learn.microsoft.com/cli/azure/) (`az`), installed and authenticated (`az login`)
* Docker or access to the Azure Container Registry for building images
* Your agent imported into Okta as an AI Agent identity
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any agent. You add it once as a reusable module. See [Add Okta authentication to your agent](#add-okta-authentication-to-your-agent).

* Platform integration (Salesforce Agentforce-specific). Unlike the other third-party platforms, Agentforce doesn't accept an Okta access token directly. Your wrapper authenticates to Salesforce separately with the OAuth 2.0 client credentials grant, then uses the resulting Salesforce token to start an Agentforce session and pass the user's verified Okta identity (name and email) as context in the message it sends to the agent. See [Integrate the token exchange into your Agentforce agent](#integrate-the-token-exchange-into-your-agentforce-agent).

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
Platform integration (Salesforce Agentforce: agent.py)
  Step 3: client_credentials  ->  Salesforce access token  (SF token endpoint)
  Step 4: Start session, send message with the user's Okta identity, end session
          (Agentforce Agent API: api.salesforce.com)
    |
    v
Agentforce agent response
```-->

> **Note:** The Okta `access_token` from steps 1 and 2 confirms the user's identity to your wrapper. It isn't forwarded to Salesforce. The Salesforce token from step 3 is a separate, service-level credential that authenticates your wrapper (not the user) to the Agentforce Agent API.

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` your agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`. Okta strips system scopes (`openid`, `profile`, `email`) during the ID-JAG exchange and can cause an `invalid_scope` error, so you must request a custom scope instead.
* Your Agentforce agent imported into Okta as an AI Agent identity. This AI Agent identity uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the agent. See [Import your agent from Salesforce](#import-your-agent-from-salesforce).

  > **Note:** Okta doesn't retain the agent's private key. Generate the private key and store it in a secrets manager, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT Bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI Agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Import your agent from Salesforce

Unlike a manually registered AI Agent identity, Okta can discover and import agents directly from a connected Salesforce org.

1. In the Admin Console, go to **Directory** > **AI Agents**, and then click **Import Agent**.
1. Connect your Salesforce instance. Okta discovers the Agentforce agents available in that org.
1. Select the Agentforce agent to import. Okta automatically creates an AI Agent identity with a client ID that has a `wlp` prefix.
1. Note the client ID. You need it for `AGENT_CLIENT_ID`.
1. Under **Client Authentication**, select **Public Key / Private Key**. Generate an RSA key pair, and register the public JWK. Note the `kid`. You need it for `AGENT_KEY_ID`.
1. Under **Connected Resources**, link the OIDC web app you created in [Before you begin](#before-you-begin) and the custom authorization server with the `xaa:read` scope.
1. Activate the agent.

## Set up your Salesforce org

Configure a separate, service-level integration in Salesforce so that your wrapper can authenticate to the Agentforce Agent API. This is independent of the Okta AI Agent identity that you imported in the previous section.

### Create an external Client app

1. In Salesforce Setup, go to **App Manager**, and then click **New Connected App** (or go to **External Client Apps** and click **New**).
1. Enable OAuth settings.
1. Note the **Consumer Key** and **Consumer Secret**. You need them for `SF_CLIENT_ID` and `SF_CLIENT_SECRET`.

### Configure OAuth settings and scopes

1. Set the grant type to **Client Credentials**.
1. Under **Selected OAuth Scopes**, select only the following scopes:
   * `api` (Manage user data through APIs)
   * `chatbot_api` (Access chatbot services)
   * `sfap_api` (Access the Salesforce API Platform)

   > **Important:** Adding more OAuth scopes than these three, combined with issuing JWT-based access tokens, can cause an `invalid_request: too many scopes requested` error. See [Troubleshoot your integration](#troubleshoot-your-integration).

1. Enable **Issue JSON Web Token (JWT)-based access tokens for named users**.
1. Set **IP Relaxation** to **Relax IP restrictions**.

### Enable the client credentials flow

1. On the Connected App, go to **Manage** > **Edit Policies**.
1. Enable **Client Credentials Flow**.
1. Set **Run As** to a user with at least API access. The client credentials grant runs every Agent API call as this user, so that its permissions and login IP restrictions apply to every request. See [Troubleshoot your integration](#troubleshoot-your-integration).

### Confirm your Agentforce agent

1. In Salesforce Setup, go to **Agents**, and then create or select an agent.
1. Confirm the agent's type is `ExternalCopilot` (an **Agentforce Service Agent**).

   > **Important:** The Agent API only works with `ExternalCopilot` type agents. It doesn't support `InternalCopilot` type agents (Employee Agents) or agents of type **Agentforce (Default)**.

1. Publish the agent so that it has an active bot version.
1. Note the agent ID. It starts with `0Xx`. You need it for `SF_AGENT_ID`.

### Turn on Einstein

1. In Salesforce Setup, go to **Einstein Setup**, and enable Einstein.
1. Enable Einstein Generative AI, if it's available for your org.

### Collect your configuration values

Your FastAPI app reads these values as environment variables. The token exchange module uses the first group. The second group is specific to Salesforce Agentforce.

<AiAgentOktaConfigValues/>

**Salesforce Agentforce values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `SF_MY_DOMAIN` | Your Salesforce My Domain hostname, for example `example.my.salesforce.com` | **Salesforce Setup** > **My Domain** |
| `SF_CLIENT_ID` | The External Client App's Consumer Key | **Salesforce Setup** > **App Manager** > your connected app > **Manage Consumer Details** |
| `SF_CLIENT_SECRET` | The External Client App's Consumer Secret | **Salesforce Setup** > **App Manager** > your connected app > **Manage Consumer Details** |
| `SF_AGENT_ID` | The Agentforce agent to invoke (starts with `0Xx`) | **Salesforce Setup** > **Agents** |

## Add Okta authentication to your agent

The following example `token_exchange.py` module that you create here has no dependency on Salesforce or Agentforce.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your Agentforce agent

This section is specific to Salesforce Agentforce. Here you authenticate to Salesforce, call the Agentforce Agent API, and wire the result into your FastAPI app alongside the token exchange from the previous section.

### Add the FastAPI and Salesforce dependencies

Add these to the same `requirements.txt`, alongside the token exchange dependencies:

```text
fastapi>=0.110.0
uvicorn>=0.29.0
httpx>=0.27.0
python-dotenv>=1.0.0
```

Install the complete set of dependencies:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Project structure

```text
okta-agentforce-agent/
├── main_agentforce.py # FastAPI entry point: token exchange + Agentforce call
├── token_exchange.py  # Okta token exchange module
├── requirements.txt
├── Dockerfile
├── .env                # Secrets (gitignored)
└── .env.example         # Template
```

### Create your environment file

Create a `.env` file with both the Okta values and the Salesforce values that you collected in [Collect your configuration values](#collect-your-configuration-values).

### Get a Salesforce access token

Authenticate to Salesforce with the OAuth 2.0 client credentials grant. This token authenticates your wrapper to the Agentforce Agent API. It's a separate, service-level credential, not the user's Okta access token.

```python
import os
import httpx

SF_MY_DOMAIN = os.environ["SF_MY_DOMAIN"]
SF_CLIENT_ID = os.environ["SF_CLIENT_ID"]
SF_CLIENT_SECRET = os.environ["SF_CLIENT_SECRET"]


def get_salesforce_token() -> str:
    resp = httpx.post(
        f"https://{SF_MY_DOMAIN}/services/oauth2/token",
        data={
            "grant_type": "client_credentials",
            "client_id": SF_CLIENT_ID,
            "client_secret": SF_CLIENT_SECRET,
        },
    )
    resp.raise_for_status()
    return resp.json()["access_token"]
```

> **Note:** The returned token has the `sfap_api`, `chatbot_api`, and `api` scopes. If you enabled more OAuth scopes than that on the Connected App, this call can fail. See [Troubleshoot your integration](#troubleshoot-your-integration).

### Call the Agentforce Agent API

The Agentforce Agent API is synchronous: start a session, send a message, read the response, and end the session.

> **Important:** The Agent API's base URL is always `https://api.salesforce.com`, not your Salesforce instance URL. Your instance URL only appears in the session request's `instanceConfig.endpoint` field.

```python
import uuid

SF_AGENT_ID = os.environ["SF_AGENT_ID"]


def ask_agentforce(prompt: str, user_claims: dict) -> str:
    sf_token = get_salesforce_token()
    sf_headers = {
        "Authorization": f"Bearer {sf_token}",
        "Content-Type": "application/json",
    }

    # Start session. instanceConfig.endpoint is required.
    session_resp = httpx.post(
        f"https://api.salesforce.com/einstein/ai-agent/v1/agents/{SF_AGENT_ID}/sessions",
        headers=sf_headers,
        json={
            "externalSessionKey": str(uuid.uuid4()),
            "bypassUser": True,
            "instanceConfig": {"endpoint": f"https://{SF_MY_DOMAIN}"},
        },
    )
    session_resp.raise_for_status()
    session_id = session_resp.json()["sessionId"]

    try:
        # Send the prompt with the user's verified Okta identity as context.
        message_resp = httpx.post(
            f"https://api.salesforce.com/einstein/ai-agent/v1/sessions/{session_id}/messages",
            headers=sf_headers,
            json={
                "message": {
                    "sequenceId": 1,
                    "type": "Text",
                    "text": f"The user is {user_claims.get('name')} ({user_claims.get('email')}). {prompt}",
                },
            },
        )
        message_resp.raise_for_status()

        for msg in message_resp.json().get("messages", []):
            if msg.get("type") == "Inform":
                return msg.get("message", "")
        return ""
    finally:
        # Always end the session, even if reading the response failed.
        httpx.delete(
            f"https://api.salesforce.com/einstein/ai-agent/v1/sessions/{session_id}",
            headers=sf_headers,
        )
```

> **Note:** If the agent has nothing configured for the topic of your prompt, it responds with something like "Sorry, I can't assist with that." Configure the agent's topics in **Salesforce Setup** > **Agents**, or ask it something within its configured scope.

## Wire it into the FastAPI entry point

In your app's entry point, call the two token exchange functions in order, decode the user's identity claims from the `id_token`, and then call Agentforce. The following example `main_agentforce.py` imports the reusable token exchange module and adds only the Salesforce-specific wiring:

```python
import jwt
from fastapi import FastAPI
from pydantic import BaseModel

from token_exchange import get_id_jag, get_access_token
# get_salesforce_token, ask_agentforce from the previous steps

app = FastAPI()


class InvokeRequest(BaseModel):
    id_token: str
    prompt: str


@app.get("/health")
def health() -> dict:
    return {"ok": True}


@app.post("/invoke")
def invoke(request: InvokeRequest) -> dict:
    # Okta authentication
    id_jag = get_id_jag(request.id_token)
    access_token = get_access_token(id_jag)

    # The id_token was already verified by the org authorization server in
    # Step 1. Decoding it here only reads display claims to pass to Agentforce.
    # It isn't used to make an authorization decision.
    user_claims = jwt.decode(request.id_token, options={"verify_signature": False})

    # Platform integration (Salesforce Agentforce)
    answer = ask_agentforce(request.prompt, user_claims)

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

## Deploy to Azure Container Apps

### Build the image in ACR

```bash
cd /path/to/okta-agentforce-agent
az acr build --registry <registry-name> --image okta-agent-agentforce:latest .
```

### Grant the container app access to ACR

```bash
az containerapp registry set \
  --name <app-name> \
  --resource-group <resource-group> \
  --server <registry-name>.azurecr.io \
  --username <registry-name> \
  --password <acr-password>
```

### Deploy with environment variables

```bash
az containerapp update \
  --name <app-name> \
  --resource-group <resource-group> \
  --image <registry-name>.azurecr.io/okta-agent-agentforce:latest \
  --set-env-vars \
    OKTA_DOMAIN="https://example.okta.com" \
    OKTA_CUSTOM_AS_ID="default" \
    OKTA_SCOPE="xaa:read" \
    AGENT_CLIENT_ID="<wlp...>" \
    AGENT_KEY_ID="<kid>" \
    AGENT_PRIVATE_KEY_JWK='<private key json>' \
    SF_MY_DOMAIN="example.my.salesforce.com" \
    SF_AGENT_ID="0Xx..." \
    SF_CLIENT_ID="<consumer-key>" \
    SF_CLIENT_SECRET="<consumer-secret>"
```

### Verify the target port

If the container app returns the default Azure page, the target port defaults to 80. Update it:

```bash
az containerapp ingress update \
  --name <app-name> \
  --resource-group <resource-group> \
  --target-port 8000
```

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Call the `/invoke` endpoint on your deployed container app, passing the test ID token to verify the end-to-end integration.:

```bash
curl -s -X POST "https://<your-container-app-url>/invoke" \
  --header "Content-Type: application/json" \
  --data "{\"id_token\": \"$ID_TOKEN\", \"prompt\": \"Hello, what can you help me with?\"}"
```

A successful response appears as follows and confirms the full round trip:

```json
{
  "ok": true,
  "answer": "Hi there! Could you let me know what you need help with? I'll do my best to assist!",
  "user": "jessie.smith@example.com",
  "access_token_prefix": "eyJraWQiOiI1ZXpPR0dSZzFf..."
}
```

## Troubleshoot your integration

The following errors are specific to the Salesforce Agentforce integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| `invalid_grant: no client credentials user enabled` | The Connected App has no **Run As** users configured for the client credentials flow | Go to the Connected App's **Manage** > **Edit Policies** > **Client Credentials Flow**, and assign a **Run As** user |
| `invalid_grant: ip restricted` | The **Run As** user's profile has login IP ranges that block the caller's IP | Add the caller's IP to the profile's login IP ranges, remove the login IP ranges, or use a **Run As** user on a profile without IP restrictions |
| `invalid_request: too many scopes requested` | The Connected App has **Issue JWT-based access tokens** enabled along with too many OAuth scopes | Reduce the Connected App's OAuth scopes to only `api`, `chatbot_api`, and `sfap_api` |
| Agent API returns `URL No Longer Exists` (HTML 404 page) | The request used the Salesforce instance URL (`*.my.salesforce.com`) as the Agent API base | Use `https://api.salesforce.com/einstein/ai-agent/v1/...` as the base URL instead |
| `BadRequestException: Empty force-config endpoint` | The session request body is missing `instanceConfig.endpoint` | Include `{"instanceConfig": {"endpoint": "https://your-instance.my.salesforce.com"}}` in the session `POST` body |
| Agent API returns `404` for the agent | The agent is `InternalCopilot` type (an Employee Agent) | Use an `ExternalCopilot` type agent (an Agentforce Service Agent). Employee Agents aren't supported |
| Agent responds "Sorry, I can't assist with that" | The agent's topics don't cover the question asked | Configure the agent's topics in **Salesforce Setup** > **Agents**, or ask it something within its configured scope |

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
* [Salesforce Agentforce Agent API documentation](https://developer.salesforce.com/docs/einstein/genai/guide/agent-api.html)
