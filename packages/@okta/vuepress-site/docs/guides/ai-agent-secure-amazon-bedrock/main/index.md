---
title: Secure an Amazon Bedrock AgentCore agent
excerpt: Learn how to add Okta authentication to an existing Amazon Bedrock AgentCore agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide explains how to add Okta authentication to an Amazon Bedrock AgentCore agent that you've already built. It assumes that you have a functional agent and can edit its code. The focus is on the Okta authentication that you add so that the agent can act on a signed-in user's behalf.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Amazon Bedrock-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

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

<AiAgentOktaConfigValues/>

**Amazon Bedrock values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `BEDROCK_AGENT_ID` | The downstream Bedrock agent to invoke | **AWS Console** > **Bedrock** > **Agents** |
| `BEDROCK_AGENT_ALIAS_ID` | The alias of the downstream Bedrock agent | **AWS Console** > **Bedrock** > **Agents** > **Aliases** |
| `AWS_REGION`, `AWS_DEFAULT_REGION` | The AWS region where the Bedrock agent runs | **AWS Console** |

> **Note:** Set both `AWS_REGION` and `AWS_DEFAULT_REGION`. The `botocore[crt]` credential refresher requires `AWS_DEFAULT_REGION`. Omitting this value causes a `NoRegionError`.

## Add Okta authentication to your agent

The following example `token_exchange.py` module that you create here has no dependency on Amazon Bedrock or AWS.

<AiAgentTokenExchangeModule/>

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

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

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
