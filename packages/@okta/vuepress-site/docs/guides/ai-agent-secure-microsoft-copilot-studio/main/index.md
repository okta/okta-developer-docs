---
title: Secure a Microsoft Copilot Studio AI agent
excerpt: Learn how to add Okta authentication to an existing Microsoft Copilot Studio AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to build a FastAPI app that authenticates users with Okta, performs Okta's two-step token exchange, and then calls a Microsoft Copilot Studio AI agent through the Bot Framework Direct Line API. Your app owns the full flow: it verifies who the user is, exchanges that identity for a scoped access token, and passes the verified identity to the AI agent. Finally, you learn how to deploy this containerized wrapper to Azure Container Apps.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Copilot Studio-specific code and the configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what an imported AI agent must do to authenticate as a signed-in user with Okta.
* Create a standalone Copilot Studio AI agent and get its Direct Line secret.
* Add a token exchange module to your AI agent.
* Build a FastAPI wrapper that performs the Okta token exchange and calls the Copilot Studio AI agent with the resulting identity.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A Microsoft Copilot Studio license and access to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com)
* A standalone Copilot Studio AI agent, published. See [Create a standalone Copilot Studio AI agent](#create-a-standalone-copilot-studio-ai-agent).
* An AI agent identity registered in your Okta org. See [Register your AI agent in Okta](#register-your-ai-agent-in-okta).
* The [Azure CLI](https://learn.microsoft.com/cli/azure/) (`az`), installed and authenticated (`az login`)
* Azure permissions: Resource Group Contributor access (for `az acr create` and `az containerapp create`) and Container Registry Repository Writer permissions
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. You add it once as a reusable module. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (Copilot Studio-specific). A Copilot Studio standalone AI agent is called through the Direct Line API, which is session-based, not a single synchronous call. Your FastAPI app starts a conversation, sends the user's message with the Okta identity in `channelData`, and polls for the AI agent's response. See [Create the FastAPI entry point](#create-the-fastapi-entry-point).

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
Platform integration (FastAPI app on Azure Container Apps: main.py)
  ask_copilot(prompt, user_claims) -> Direct Line API
    |
    v
Copilot Studio standalone AI agent
  message includes the verified user's name and email in channelData
```-->

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An app integration that signs users in and issues the `id_token` your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* Your imported AI agent that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the web app, set the custom authorization server, include your custom scope, and activate the AI agent.

  > **Note:** Okta doesn't retain the AI agent's private key. Okta shows it only once, so store it in a secrets manager, like Azure Key Vault, when Okta generates it.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Register your AI agent in Okta

Okta imports AI agents from Microsoft 365 through the Microsoft Office 365 app integration. The import only finds Microsoft 365 declarative AI agents. It doesn't find standalone Copilot Studio AI agents, which are the kind that Direct Line can call. For a standalone AI agent, register an AI agent identity in Okta manually.

1. In the Admin Console, go to **Directory** > **AI Agents**.
1. Click **Register AI agent**, and then select **Register manually**.
1. On the **Profile** tab, enter a name and a description. Under **Identifier**, set **Platform** and **External ID** to identify the Copilot Studio AI agent.
1. Link the web app that signs users in. Select **Create a new OIDC app linked to this AI agent**, or select an existing app. This link is permanent. To change it, delete the AI agent and create it again.
1. On the **Client registration** tab, next to **Public/private key**, click **Configure** > **Add public key** > **Generate new key**. Copy the private key and store it securely, because Okta shows it only once. Copy the AI agent's **Client ID**.
1. On the **Resource connections** tab, click **Add resource connection**. For **Resource type**, select **Authorization server**, select your custom authorization server, and then set the scopes to **Only allow** with your custom scope, such as `xaa:read`.
1. Click **Actions** > **Activate**.

<span style="color: #c0392b;">**TODO (Engineering):** Confirm whether standalone Copilot Studio AI agents can be imported in any way. The source material says the Microsoft import lists only Microsoft 365 declarative AI agents through Microsoft Graph. Also confirm the exact steps and labels for manual registration against the current Admin Console, and whether to link to the Okta Help Center "Add AI agents manually" page instead of repeating the procedure.</span>

<span style="color: #c0392b;">**TODO (Engineering):** If you want to import Microsoft 365 declarative AI agents instead, add the import procedure here. The source material describes an Azure Entra ID app registration with the CopilotPackages.Read.All Application permission and admin consent, then entering the client ID, tenant ID, and client secret value on the Microsoft Office 365 app's AI agent import tab.</span>

### Collect your configuration values

Your FastAPI app reads these values as environment variables. The token exchange module uses the first group. The second group is specific to Copilot Studio.

<AiAgentOktaConfigValues/>

**Copilot Studio values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `COPILOT_DIRECT_LINE_SECRET` | The Direct Line secret key for your published standalone AI agent | **Copilot Studio** > your AI agent > **Channels** > **Custom website** > **Secret key** |

<span style="color: #c0392b;">**TODO (Engineering):** Confirm the Direct Line base URL (DIRECT_LINE_URL in the sample code). The source code uses a DIRECT_LINE_URL constant, but the source material doesn't give its value or say whether to read it from an environment variable. Confirm the regional endpoint for your tenant.</span>

## Add Okta authentication to your AI agent

The following example `token_exchange.py` module has no dependency on Copilot Studio or the Direct Line API.

<AiAgentTokenExchangeModule/>

## Set up Copilot Studio

### Create a standalone Copilot Studio AI agent

Copilot Studio has two kinds of AI agents, and only one of them works with this guide.

| Type | Appears in the Okta Microsoft import | Direct Line access | Use |
| --- | --- | --- | --- |
| Microsoft 365 Copilot AI agent (declarative) | Yes | No | Teams and Microsoft 365 only |
| Standalone AI agent | No | Yes | Programmatic API calls |

You must create a standalone AI agent for Direct Line access.

1. Go to [Microsoft Copilot Studio](https://copilotstudio.microsoft.com).
1. Click **Create** > **New agent**. Don't select the option to extend Microsoft 365 Copilot.
1. Configure the instructions, knowledge, and topics that your AI agent needs.
1. Click **Publish**.

### Get the Direct Line secret

1. In Copilot Studio, open your published AI agent and go to **Channels** > **Custom website**.
1. Copy the **Secret key**. It's the value for `COPILOT_DIRECT_LINE_SECRET`.

> **Note:** The **Custom website** channel appears only for standalone AI agents after you publish them. If you see only the **Teams** and **Microsoft 365 Copilot** channels, you created a Microsoft 365 declarative AI agent. Create a new standalone AI agent instead.

### Create an Azure Container Registry (ACR)

```bash
az acr create \
  --name <registry-name> \
  --resource-group <resource-group> \
  --sku Standard
```

> **Important:** Use the standard SKU. The basic SKU can cause `416` or `503` errors during image pushes. Use `az acr build` (cloud build) rather than a local `docker push`. Local pushes are more likely to fail.

### Create a Container Apps environment and container app

```bash
az containerapp env create \
  --name <env-name> \
  --resource-group <resource-group> \
  --location eastus

az containerapp create \
  --name <app-name> \
  --resource-group <resource-group> \
  --environment <env-name> \
  --ingress external \
  --target-port 8000
```

> **Note:** The FastAPI app runs on port 8000. Set `--target-port 8000` at creation time. If the container app defaults to port 80, the app returns the default Azure page.

## Configure your app

Set up the project structure, install the FastAPI dependencies, and create a Dockerfile for the containerized app.

### Project structure

```text
okta-copilot-agent/
├── main.py           # FastAPI entry point: token exchange + Direct Line call
├── token_exchange.py # Okta token exchange module
├── requirements.txt
├── Dockerfile
├── .env              # Secrets (gitignored)
└── .env.example      # Template
```

### Add the FastAPI dependencies

Add these to the same `requirements.txt`, alongside the token exchange dependencies (`PyJWT[crypto]` and `requests`):

```text
fastapi>=0.110.0
uvicorn>=0.29.0
python-dotenv>=1.0.0
```

<span style="color: #c0392b;">**TODO (Engineering):** Confirm the dependency list. The source material doesn't include a requirements.txt for the Copilot Studio wrapper. The sample code reuses the requests and PyJWT packages that the token exchange module already installs.</span>

Install the complete set of dependencies:

```bash
pip install -r requirements.txt
```

### Create a Dockerfile

Create a `Dockerfile` at the root of your project:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "main.py"]
```

> **Note:** Don't copy your `.env` file into the image. Add a `.dockerignore` file that contains `.env`, so that secrets never end up baked into the container. Azure Container Apps sets these as real environment variables at deploy time (see [Deploy with environment variables](#deploy-with-environment-variables)).

### Create your environment file

Create a `.env` file with both the Okta values and the Copilot Studio value that you collected in [Collect your configuration values](#collect-your-configuration-values).

## Create the FastAPI entry point

In your app's entry point, call the two token exchange functions in order, decode the user's identity claims from the `id_token`, and then call the Copilot Studio AI agent with the verified user identity. The call has three parts. The app starts a Direct Line conversation, sends the user's message with the Okta identity in `channelData`, and polls the conversation until the AI agent responds.

The following example `main.py` imports the reusable token exchange module and adds the Direct Line call and the FastAPI-specific wiring:

```python
import os
import time

import jwt
import requests
from fastapi import FastAPI
from pydantic import BaseModel

from token_exchange import get_id_jag, get_access_token

COPILOT_DIRECT_LINE_SECRET = os.environ["COPILOT_DIRECT_LINE_SECRET"]
DIRECT_LINE_URL = "https://directline.botframework.com/v3/directline"

app = FastAPI()


def ask_copilot(prompt: str, user_claims: dict) -> str:
    dl_headers = {"Authorization": f"Bearer {COPILOT_DIRECT_LINE_SECRET}"}

    # 1. Start the conversation
    conv = requests.post(
        f"{DIRECT_LINE_URL}/conversations", headers=dl_headers, timeout=10
    ).json()
    conv_id = conv["conversationId"]
    conv_headers = {"Authorization": f"Bearer {conv['token']}"}

    # 2. Send the message with the Okta identity in channelData
    requests.post(
        f"{DIRECT_LINE_URL}/conversations/{conv_id}/activities",
        headers=conv_headers,
        timeout=10,
        json={
            "type": "message",
            "from": {"id": user_claims.get("sub"), "name": user_claims.get("name")},
            "text": prompt,
            "channelData": {
                "okta": {
                    "email": user_claims.get("email"),
                    "sub": user_claims.get("sub"),
                }
            },
        },
    )

    # 3. Poll for the AI agent's response (up to 15 seconds)
    watermark = None
    for _ in range(15):
        time.sleep(1)
        data = requests.get(
            f"{DIRECT_LINE_URL}/conversations/{conv_id}/activities",
            headers=conv_headers,
            params={"watermark": watermark} if watermark else {},
            timeout=10,
        ).json()
        watermark = data.get("watermark")
        for activity in data.get("activities", []):
            if (
                activity.get("type") == "message"
                and activity.get("from", {}).get("role") == "bot"
            ):
                return activity.get("text", "No text in response")

    return "Timeout: no response from the Copilot Studio AI agent"


class InvokeRequest(BaseModel):
    id_token: str
    prompt: str


@app.post("/invoke")
def invoke(request: InvokeRequest) -> dict:
    # Okta authentication
    id_jag = get_id_jag(request.id_token)
    access_token = get_access_token(id_jag)

    # The org authorization server already verified the id_token in Step 1.
    # Decoding it here only reads display claims to pass to the AI agent.
    # It isn't used to make an authorization decision.
    user_claims = jwt.decode(request.id_token, options={"verify_signature": False})

    # Platform integration (Copilot Studio)
    answer = ask_copilot(request.prompt, user_claims)

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

<span style="color: #c0392b;">**TODO (Engineering):** Confirm the Direct Line base URL (https://directline.botframework.com/v3/directline) and that the standalone Copilot Studio channel uses it. The source material lists the three Direct Line calls (POST /v3/directline/conversations, POST /conversations/{id}/activities, GET /conversations/{id}/activities) but not the host.</span>

> **Note:** The `access_token` is available in your app after step 2 of the token exchange. You can pass it to downstream Okta-protected APIs. In this pattern, your app obtains it but doesn't forward it to the Copilot Studio AI agent. The AI agent receives only the user's name, email, and subject in the message.

## Deploy to Azure Container Apps

Package your FastAPI app into a container image, grant Azure Container Apps access to pull it, and deploy it with the environment variables you collected in [Collect your configuration values](#collect-your-configuration-values).

### Build the image in ACR

```bash
cd /path/to/okta-copilot-agent
az acr build --registry <registry-name> --image okta-agent-copilot:latest .
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
  --image <registry-name>.azurecr.io/okta-agent-copilot:latest \
  --set-env-vars \
    OKTA_DOMAIN="example.okta.com" \
    OKTA_CUSTOM_AS_ID="default" \
    OKTA_SCOPE="xaa:read" \
    AGENT_CLIENT_ID="<wlp...>" \
    AGENT_KEY_ID="<kid>" \
    AGENT_PRIVATE_KEY_JWK='<private key json>' \
    COPILOT_DIRECT_LINE_SECRET="<secret from Copilot Studio>"
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

Call the deployed container app's `/invoke` endpoint, passing the test ID token to confirm the full `id_token` → ID-JAG → `access_token` round trip:

```bash
curl -s -X POST "https://<your-container-app-url>/invoke" \
  --header "Content-Type: application/json" \
  --data "{\"id_token\": \"$ID_TOKEN\", \"prompt\": \"Who am I?\"}"
```

A successful response appears as follows and confirms the full round trip:

```json
{
  "ok": true,
  "answer": "You are Jessie Smith, and your verified email address is jessie.smith@example.com. You're signed in with Okta, and I recognize you as a verified user in this session. How can I help you today?",
  "user": "jessie.smith@example.com",
  "access_token_prefix": "eyJraWQiOi..."
}
```

## Troubleshoot your integration

The following errors are specific to the Copilot Studio integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| The AI agent doesn't appear in the Okta Microsoft import list | Okta imports only Microsoft 365 declarative AI agents. Standalone Copilot Studio AI agents aren't importable. | Register the AI agent manually in Okta. See [Register your AI agent in Okta](#register-your-ai-agent-in-okta). |
| No Direct Line secret is visible | You created a Microsoft 365 Copilot (declarative) AI agent, not a standalone one. | Create a new AI agent without the option to extend Microsoft 365 Copilot. |
| **Channels** shows only **Teams** and **Microsoft 365 Copilot** | Same as the previous row. The AI agent is declarative. | Create a standalone AI agent. |
| Direct Line returns no activities | The app polled before the AI agent had time to respond. | Poll with a one-second delay, for up to 15 retries. |
| ACR push `416` / `503` errors | Basic SKU ACR with stale upload sessions | Upgrade ACR to standard SKU. Use `az acr build` instead of a local `docker push`. |
| Container app not pulling image | The container app has no registry credentials configured. | Run `az containerapp registry set` before updating the image. |
| App returns the default Azure page | Target port defaults to 80. The FastAPI app runs on 8000. | Run `az containerapp ingress update --target-port 8000`. |

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
* [Microsoft Copilot Studio documentation](https://learn.microsoft.com/microsoft-copilot-studio/)
* [Azure Container Apps documentation](https://learn.microsoft.com/azure/container-apps/)
