---
title: Secure Azure AI Foundry agents with Okta
excerpt: Learn how to secure Azure AI Foundry agents with Okta
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to build a FastAPI app that authenticates users with Okta and calls Azure OpenAI with the signed-in user's verified identity. The app performs Okta's two-step token exchange internally, and deploys to Azure Container Apps.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what a third-party AI agent must do to authenticate as a signed-in user with Okta.
* Deploy an Azure OpenAI resource and configure a model deployment.
* Build a FastAPI wrapper that performs the Okta token exchange and calls Azure OpenAI with the resulting identity.
* Deploy the app to Azure Container Apps.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* An Azure subscription with Azure OpenAI access in your region
* The [Azure CLI](https://learn.microsoft.com/cli/azure/) (`az`), installed and authenticated (`az login`)
* Docker, or access to the Azure Container Registry for building images
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any agent. You add it once as a reusable module. See [Add Okta authentication to your agent](#add-okta-authentication-to-your-agent).

* Platform integration (Azure-specific). Your FastAPI app calls the token exchange, decodes the user's identity claims from the `id_token`, and passes that identity to Azure OpenAI in the system message of a chat completion request. See [Call Azure OpenAI with user identity](#call-azure-openai-with-user-identity).

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
  ask_llm(prompt, user_claims, access_token) -> Azure OpenAI chat completion
    |
    v
Azure OpenAI
  system message includes the verified user's name and email
```

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` your agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* Your agent imported into Okta as an AI Agent identity that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the agent.

  > **Note:** Okta doesn't retain the agent's private key. Store it in a secrets manager when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI Agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Collect your configuration values

Your FastAPI app reads these values as environment variables. The token exchange module uses the first group. The second group is specific to Azure OpenAI.

**Okta values (used by the token exchange):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `OKTA_DOMAIN` | Okta org domain, for example `example.okta.com` (no `https://` prefix) | **Admin Console** > **Settings** > **Account** |
| `OKTA_CUSTOM_AS_ID` | Custom authorization server ID, for example `default` | **Security** > **API** |
| `OKTA_SCOPE` | The custom scope that the agent requests | Custom AS > **Scopes** |
| `AGENT_CLIENT_ID` | Client ID of the imported AI Agent, for example `wlp9k6...` | **Directory** > **AI Agents** > *(agent)* |
| `AGENT_KEY_ID` | `kid` of the public JWK registered on the AI agent | **Directory** > **AI Agents** > *(agent)* > **Credentials** |
| `AGENT_PRIVATE_KEY_JWK` | The agent's private JWK (single-line JSON) | Output of **Generate credentials**. Store the value in a secrets manager |

**Azure OpenAI values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `AZURE_OPENAI_KEY` | Azure OpenAI API key | **Azure Portal** > your Azure OpenAI resource > **Keys and Endpoint** |
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI resource endpoint URL | **Azure Portal** > your Azure OpenAI resource > **Keys and Endpoint** |
| `AZURE_OPENAI_DEPLOYMENT` | Model deployment name (not the model name) | **Azure OpenAI Studio** > **Deployments** |

## Add Okta authentication to your agent

The following example `token_exchange.py` module that you create here has no dependency on Azure or Azure OpenAI.

<AiAgentTokenExchangeModule/>

## Set up Azure resources

### Create an Azure OpenAI resource

1. In the Azure Portal, search for **Azure OpenAI** and create a resource.
1. Select a region that supports the model you want to use. Check Azure OpenAI model availability for your region before you continue.
1. After the resource deploys, note the endpoint URL and one of the API keys. You need both for `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_KEY`.

### Deploy a model

1. In the Azure Portal, open your Azure OpenAI resource and go to **Azure OpenAI Studio** > **Deployments**.
1. Click **Create new deployment** and select your model, for example `gpt-4o`.
1. Set a deployment name and note it exactly. It becomes `AZURE_OPENAI_DEPLOYMENT`.

> **Important:** The deployment name that you set here, not the model name, is what you pass to the API. If you get a `DeploymentNotFound` error, verify the exact name in **Azure OpenAI Studio** > **Deployments**.

### Create an Azure Container Registry

```bash
az acr create \
  --name <registry-name> \
  --resource-group <resource-group> \
  --sku Standard
```

> **Important:** Use the standard SKU. The basic SKU can cause `416` or `503` errors during image pushes. Use `az acr build` (cloud build) rather than a local Docker push. Local pushes are more likely to fail.

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

### Project structure

```text
okta-azure-agent/
├── main.py           # FastAPI entry point: token exchange + Azure OpenAI call
├── token_exchange.py # Okta token exchange module
├── requirements.txt
├── Dockerfile
├── .env              # Secrets (gitignored)
└── .env.example      # Template
```

### Add the FastAPI and Azure OpenAI dependencies

Add these to the same `requirements.txt`, alongside the token exchange dependencies:

```text
fastapi>=0.110.0
uvicorn>=0.29.0
httpx>=0.27.0
cryptography>=42.0.0
python-dotenv>=1.0.0
openai>=1.30.0
```

Install the complete set of dependencies:

```bash
pip install -r requirements.txt
```

### Create your environment file

Create a `.env` file with both the Okta values and the Azure OpenAI values you collected in [Collect your configuration values](#collect-your-configuration-values).

## Call Azure OpenAI with user identity

After the token exchange, pass the verified user identity to Azure OpenAI in the system message of a chat completion request:

```python
import os
from openai import AzureOpenAI

AZURE_OPENAI_KEY = os.environ["AZURE_OPENAI_KEY"]
AZURE_OPENAI_ENDPOINT = os.environ["AZURE_OPENAI_ENDPOINT"]
AZURE_OPENAI_DEPLOYMENT = os.environ["AZURE_OPENAI_DEPLOYMENT"]


def ask_llm(prompt: str, user_claims: dict, access_token: str) -> str:
    client = AzureOpenAI(
        api_key=AZURE_OPENAI_KEY,
        azure_endpoint=AZURE_OPENAI_ENDPOINT,
        api_version="2024-02-01",
    )

    response = client.chat.completions.create(
        model=AZURE_OPENAI_DEPLOYMENT,
        messages=[
            {
                "role": "system",
                "content": (
                    f"You are a helpful assistant. "
                    f"The authenticated user is {user_claims.get('name')} "
                    f"({user_claims.get('email')}). "
                    f"Their Okta access token is verified."
                ),
            },
            {"role": "user", "content": prompt},
        ],
    )
    return response.choices[0].message.content
```

> **Note:** The `access_token` is available in your app after step 2 of the token exchange. You can pass it to downstream Okta-protected APIs. In this pattern, your app verifies it but doesn't forward it directly to Azure OpenAI.

## Wire it into the FastAPI entry point

In your app's entry point, call the two token exchange functions in order, decode the user's identity claims from the `id_token`, and then call Azure OpenAI. The following `main.py` imports the reusable token exchange module and adds only the FastAPI-specific wiring:

```python
import jwt
from fastapi import FastAPI
from pydantic import BaseModel

from token_exchange import get_id_jag, get_access_token
# ask_llm from the previous step

app = FastAPI()


class InvokeRequest(BaseModel):
    id_token: str
    prompt: str


@app.post("/invoke")
def invoke(request: InvokeRequest) -> dict:
    # Okta authentication
    id_jag = get_id_jag(request.id_token)
    access_token = get_access_token(id_jag)

    # The id_token was already verified by the org authorization server in
    # Step 1. Decoding it here only reads display claims for the system
    # message. It isn't used to make an authorization decision.
    user_claims = jwt.decode(request.id_token, options={"verify_signature": False})

    # Platform integration (Azure OpenAI)
    answer = ask_llm(request.prompt, user_claims, access_token)

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
cd /path/to/okta-azure-agent
az acr build --registry <registry-name> --image okta-agent:latest .
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
  --image <registry-name>.azurecr.io/okta-agent:latest \
  --set-env-vars \
    OKTA_DOMAIN="example.okta.com" \
    OKTA_CUSTOM_AS_ID="default" \
    OKTA_SCOPE="xaa:read" \
    AGENT_CLIENT_ID="<wlp...>" \
    AGENT_KEY_ID="<kid>" \
    AGENT_PRIVATE_KEY_JWK='<private key json>' \
    AZURE_OPENAI_KEY="<key>" \
    AZURE_OPENAI_ENDPOINT="https://<resource-name>.openai.azure.com" \
    AZURE_OPENAI_DEPLOYMENT="<deployment-name>"
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
  "answer": "You are Jane Doe, and you're signed in with your Okta account (jane.doe@example.com). How can I help you today?",
  "user": "jane.doe@example.com",
  "access_token_prefix": "eyJraWQiOiI..."
}
```

## Troubleshoot your integration

The following errors are specific to the Azure integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| `DeploymentNotFound` | Wrong or missing Azure OpenAI deployment name | Check the exact deployment name in **Azure OpenAI Studio** > **Deployments**. Names are case-sensitive |
| ACR push `416` / `503` errors | Basic SKU ACR with stale upload sessions | Upgrade ACR to standard SKU. Use `az acr build` instead of a local `docker push` |
| Container app not pulling image | The container app has no registry credentials configured | Run `az containerapp registry set` before updating the image |
| App returns the default Azure page | Target port defaults to 80. The FastAPI app runs on 8000 | Run `az containerapp ingress update --target-port 8000` |

The following errors come from the Okta token exchange and are covered in [Set up third-party AI Agent token exchange: Troubleshooting](/docs/guides/ai-agent-third-party-token-exchange/main/#troubleshooting):

* `invalid_client: JWKSet not configured`
* `invalid_client: kid is invalid`
* `access_denied: no_matching_policy`

## Next steps

Your agent can now authenticate as a user and call Okta-protected resources on their behalf. To define which resources and scopes the agent is permitted to reach, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
* [Azure OpenAI Service documentation](https://learn.microsoft.com/azure/ai-services/openai/)
* [Azure Container Apps documentation](https://learn.microsoft.com/azure/container-apps/)
