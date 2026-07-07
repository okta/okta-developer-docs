---
title: Secure an Amazon Bedrock AgentCore agent
excerpt: Learn how to add Okta authentication to an existing Amazon Bedrock AgentCore agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide explains how to add Okta authentication to an Amazon Bedrock AgentCore agent that you've already built. It assumes that you have a functional agent and can edit its code. The focus is on the Okta authentication that you add so that the agent can act on a signed-in user's behalf.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Amazon Bedrock-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. See your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what a third-party AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your agent.
* Wire the token exchange into an Amazon Bedrock AgentCore agent and call a downstream Bedrock agent with the resulting access token.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* An existing Amazon Bedrock AgentCore agent that you can edit and deploy
* The Amazon Bedrock AgentCore agent imported into Okta
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any agent. You add it once as a reusable module. See [Add Okta authentication to your agent](#add-okta-authentication-to-your-agent).

* Platform integration (Amazon Bedrock-specific). Your agent calls the token exchange and then attaches the access token to its downstream calls. For AgentCore, this means passing the token to a Bedrock agent as a session attribute. See [Integrate the token exchange into your AgentCore agent](#integrate-the-token-exchange-into-your-agentcore-agent).

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
Platform integration (Amazon Bedrock AgentCore: agent.py)
  invoke_agent(..., sessionAttributes={ "oktaAccessToken": access_token })
    |
    v
Downstream resource (Bedrock agent, MCP server, or Okta-protected API)
  Authorization: Bearer <access_token>
```

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` your agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* The Bedrock AgentCore agent imported into Okta as an AI Agent identity that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the agent.

  > **Note:** Okta doesn't retain the agent's private key. Store it in a secrets manager when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT Bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI Agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Collect your configuration values

Your Amazon Bedrock AgentCore agent code reads these values as environment variables. The first group is consumed by the token exchange module. The second group is specific to Amazon Bedrock.

**Okta values (used by the token exchange):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `OKTA_DOMAIN` | Okta org domain, for example `example.okta.com` (no `https://` prefix) | **Admin Console** > **Settings** > **Account** |
| `OKTA_CUSTOM_AS_ID` | Custom authorization server ID, for example `default` | **Security** > **API** |
| `OKTA_SCOPE` | The custom scope that the agent requests | Custom AS > **Scopes** |
| `AGENT_CLIENT_ID` | Client ID of the imported third-party AI Agent | **Directory** > **AI Agents** > *(agent)* |
| `AGENT_KEY_ID` | `kid` of the public JWK registered on the third-party AI agent | **Directory** > **AI Agents** > *(agent)* > **Credentials** |
| `AGENT_PRIVATE_KEY_JWK` | The third-party agent's private JWK (single-line JSON) | Output of **Generate credentials**. Store the value in a secrets manager |

**Amazon Bedrock values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `BEDROCK_AGENT_ID` | The downstream Bedrock agent to invoke | **AWS Console** > **Bedrock** > **Agents** |
| `BEDROCK_AGENT_ALIAS_ID` | The alias of the downstream Bedrock agent | **AWS Console** > **Bedrock** > **Agents** > **Aliases** |
| `AWS_REGION`, `AWS_DEFAULT_REGION` | The AWS region where the Bedrock agent runs | **AWS Console** |

> **Note:** Set both `AWS_REGION` and `AWS_DEFAULT_REGION`. The `botocore[crt]` credential refresher requires `AWS_DEFAULT_REGION`. Omitting this value causes a `NoRegionError`.

## Add Okta authentication to your agent

The following example `token_exchange.py` module that you create here has no dependency on Amazon Bedrock or AWS.

### Install the token exchange dependencies

The module needs only a JWT library and an HTTP client. Add these to your project's `requirements.txt`:

```text
PyJWT[crypto]>=2.8.0
requests>=2.31.0
```

### Create the token exchange module

Create a file named `token_exchange.py`. It reads the Okta values from the environment, signs the client assertion, and exposes two functions, `get_id_jag` and `get_access_token`, that your agent calls in order.

```python
"""Okta token exchange for AI agents.

Turns a signed-in user's id_token into a scoped access_token:
  id_token -> ID-JAG (org AS) -> access_token (custom AS)

Exposes get_id_jag() and get_access_token(). No platform dependencies.
"""

import json, os, time, uuid
import jwt
import requests
from jwt.algorithms import RSAAlgorithm

# --- Okta configuration (from environment) ---
OKTA_DOMAIN = os.environ["OKTA_DOMAIN"]                       # for example, example.okta.com
CUSTOM_AS_ID = os.environ.get("OKTA_CUSTOM_AS_ID", "default")
REQUESTED_SCOPE = os.environ.get("OKTA_SCOPE", "xaa:read")
AGENT_CLIENT_ID = os.environ["AGENT_CLIENT_ID"]
AGENT_KEY_ID = os.environ["AGENT_KEY_ID"]
AGENT_PRIVATE_KEY_JWK = json.loads(os.environ["AGENT_PRIVATE_KEY_JWK"])

ORG_TOKEN_URL = f"https://{OKTA_DOMAIN}/oauth2/v1/token"
CUSTOM_AS_TOKEN_URL = f"https://{OKTA_DOMAIN}/oauth2/{CUSTOM_AS_ID}/v1/token"
CUSTOM_AS_AUDIENCE = f"https://{OKTA_DOMAIN}/oauth2/{CUSTOM_AS_ID}"


def build_client_assertion(audience: str) -> str:
    """Sign a short-lived client assertion JWT for the given token endpoint."""
    private_key = RSAAlgorithm.from_jwk(json.dumps(AGENT_PRIVATE_KEY_JWK))
    now = int(time.time())
    return jwt.encode(
        {
            "iss": AGENT_CLIENT_ID,
            "sub": AGENT_CLIENT_ID,
            "aud": audience,        # must match the endpoint this assertion is sent to
            "iat": now,
            "exp": now + 300,       # valid for 5 minutes
            "jti": str(uuid.uuid4()),
        },
        private_key,
        algorithm="RS256",
        headers={"kid": AGENT_KEY_ID},
    )


def get_id_jag(id_token: str) -> str:
    """Step 1: exchange the user's id_token for an ID-JAG at the org AS."""
    r = requests.post(ORG_TOKEN_URL, data={
        "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion": build_client_assertion(ORG_TOKEN_URL),
        "subject_token": id_token,
        "subject_token_type": "urn:ietf:params:oauth:token-type:id_token",
        "requested_token_type": "urn:ietf:params:oauth:token-type:id-jag",
        "scope": REQUESTED_SCOPE,
        "audience": CUSTOM_AS_AUDIENCE,
    }, timeout=10)
    r.raise_for_status()
    return r.json()["access_token"]  # the ID-JAG


def get_access_token(id_jag: str) -> str:
    """Step 2: exchange the ID-JAG for a scoped access token at the custom AS."""
    r = requests.post(CUSTOM_AS_TOKEN_URL, data={
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion": build_client_assertion(CUSTOM_AS_TOKEN_URL),
        "assertion": id_jag,
    }, timeout=10)
    r.raise_for_status()
    return r.json()["access_token"]  # scoped access token for the resource
```

A few details that this module provides:

* The client assertion function is invoked twice. `build_client_assertion` is called once per step, each time with the `aud` set to the token endpoint it targets: the org token URL for Step 1, and the custom authorization server token URL for Step 2. The `kid` header must match the public JWK registered on the agent.
* The `audience` parameter in Step 1 is the custom authorization server's issuer URL (`https://{yourOktaDomain}/oauth2/{custom-as-id}`), not its token endpoint.
* Step 1 requires an Okta imported AI Agent client. An OIDC app client can't perform this exchange.

> **Note:** For production workloads, cache the ID-JAG and access token in memory until their `exp` claim expires. This avoids a fresh two-step exchange on every user request.

## Integrate the token exchange into your AgentCore agent

This section is specific to Amazon Bedrock AgentCore. Here you call `get_id_jag` and `get_access_token` from your agent and attach the resulting access token to the downstream Bedrock call.

### Add the Bedrock dependencies

Your AgentCore agent needs the following. Add these to the same `requirements.txt`, alongside the token exchange dependencies:

```text
bedrock-agentcore
boto3
botocore[crt]
```

> **Note:** Your agent requires `botocore[crt]` when your AWS credentials use the SSO login credential provider. Without it, the runtime fails at startup with `ModuleNotFoundError: awscrt`.

Install the complete set of dependencies:

```bash
pip install -r requirements.txt
```

### Call the downstream Bedrock agent with the access token

Pass the scoped access token to the downstream Bedrock agent as a session attribute (`oktaAccessToken`). A Lambda action group on the Bedrock agent reads that attribute and forwards it as `Authorization: Bearer <access_token>` to an Okta-protected resource, such as an MCP server.

```python
import os
import boto3

BEDROCK_AGENT_ID = os.environ["BEDROCK_AGENT_ID"]
BEDROCK_AGENT_ALIAS_ID = os.environ["BEDROCK_AGENT_ALIAS_ID"]
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")

def invoke_bedrock_agent(prompt: str, access_token: str, session_id: str) -> str:
    client = boto3.client("bedrock-agent-runtime", region_name=AWS_REGION)
    response = client.invoke_agent(
        agentId=BEDROCK_AGENT_ID,
        agentAliasId=BEDROCK_AGENT_ALIAS_ID,
        sessionId=session_id,
        inputText=prompt,
        sessionState={"sessionAttributes": {"oktaAccessToken": access_token}},
    )
    chunks = []
    for event in response["completion"]:
        if "chunk" in event:
            chunks.append(event["chunk"]["bytes"].decode("utf-8"))
    return "".join(chunks)
```

Two AWS runtime requirements apply:

* The IAM identity running the AgentCore runtime must have the `bedrock:InvokeAgent` permission on the target Bedrock agent.
* You must set both `AWS_REGION` and `AWS_DEFAULT_REGION`, because the `botocore[crt]` credential refresher requires `AWS_DEFAULT_REGION`.

### Wire it into the AgentCore entry point

In your agent's entry point, call the two token exchange functions in order, and then invoke the downstream Bedrock agent with the access token. The following `agent.py` imports the reusable module and adds only the AgentCore-specific wiring:

```python
import uuid
from bedrock_agentcore.runtime import BedrockAgentCoreApp

from token_exchange import get_id_jag, get_access_token
# invoke_bedrock_agent from the previous step

app = BedrockAgentCoreApp()


@app.entrypoint
def handler(payload: dict) -> dict:
    """Expected payload: {"prompt": "...", "id_token": "<okta id_token>"}."""
    id_token = payload["id_token"]
    prompt = payload["prompt"]
    session_id = payload.get("session_id") or str(uuid.uuid4())

    # Okta authentication
    id_jag = get_id_jag(id_token)
    access_token = get_access_token(id_jag)

    # Platform integration (Amazon Bedrock)
    answer = invoke_bedrock_agent(prompt, access_token, session_id)
    return {"answer": answer, "session_id": session_id}


if __name__ == "__main__":
    app.run()
```

## Verify the configuration

After you add the code, verify the Okta-side configuration:

1. Go to **Directory** > **AI Agents** and confirm that the agent appears with **Status: Active** and the expected owners, connections, and user app.
1. (Optional) Go to **Identity Governance** > **Access Certifications** to confirm that the agent's user sign-on app is visible for future certification campaigns.

## Obtain a test ID token

To exercise the flow, you need an ID token from the OIDC app linked to the agent. Complete an OIDC sign-in against that app to obtain one. For a ready-to-run Authorization Code with PKCE sign-in helper, see [Create an app to obtain a test ID token](/docs/guides/ai-agent-third-party-token-exchange/main/#create-an-app-to-obtain-a-test-id-token).

> **Note:** Add the helper's callback URL (for example, `http://localhost:8765/callback`) to the linked OIDC app's **Sign-in redirect URIs** before you run it, and remove it after verification is complete.

## Run an end-to-end invocation

Run the AgentCore runtime locally, then deploy it, passing the test ID token to confirm the full `id_token` → ID-JAG → `access_token` round trip:

```bash
# Start the runtime locally. While this runs, `invoke` hits the local instance.
agentcore dev
agentcore invoke "{\"prompt\": \"Who am I?\", \"id_token\": \"$ID_TOKEN\"}"

# Stop `agentcore dev`, deploy to AWS, then `invoke` hits the deployed instance.
agentcore deploy
agentcore invoke "{\"prompt\": \"Who am I?\", \"id_token\": \"$ID_TOKEN\"}"
```

A successful response appears as follows and confirms the full round trip. Reuse the returned `session_id` on any follow-up invocation to keep the Bedrock conversation state:

```json
{
  "answer": "You are signed in as jessie.smith@example.com.",
  "session_id": "3e4f1b9a-7c26-4d88-9e42-1a0b5c9d2f3e"
}
```

## Troubleshoot your integration

The following errors are specific to the Amazon Bedrock integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| `ResourceNotFoundException` on `InvokeAgent` | Wrong agent ID or alias ID | Verify `BEDROCK_AGENT_ID` and `BEDROCK_AGENT_ALIAS_ID` in the AWS console |
| `ThrottlingException` on `InvokeAgent` | Bedrock model invocation quota exceeded (often `0` on new accounts) | Check **Service Quotas**. A quota of `0` means that the model is disabled for the account |
| `NoRegionError: You must specify a region` | The boto3 SSO credential refresher needs `AWS_DEFAULT_REGION` | Set both `AWS_REGION` and `AWS_DEFAULT_REGION` in the agent runtime environment |
| `ModuleNotFoundError: awscrt` at startup | Missing the CRT extension required by the SSO credential provider | Run `pip install botocore[crt]` |
| `Agent Instruction cannot be null` | The Bedrock agent has no instructions. | In the AWS console, edit the agent to add an instruction, then choose **Prepare** |

## Next steps

Your agent can now authenticate as a user and call Okta-protected resources on their behalf. To define which resources and scopes the agent is permitted to reach, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
* [Amazon Bedrock AgentCore documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html)
