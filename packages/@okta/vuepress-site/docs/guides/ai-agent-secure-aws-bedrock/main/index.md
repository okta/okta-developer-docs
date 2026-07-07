---
title: Secure AWS Bedrock Agents with Okta
excerpt: Learn how to secure AWS Bedrock Agents with Okta
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to secure an AWS Bedrock Agent with Okta authentication. Your calling app performs Okta's two-step token exchange, then invokes the Bedrock Agent with the access token and user identity passed as session attributes. Action group Lambda functions read the token from session attributes and use it to call Okta-protected APIs on the signed-in user's behalf.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what a calling app must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your app.
* Set up an AWS Bedrock Agent with an action group Lambda that can call Okta-protected APIs.
* Invoke the Bedrock Agent with the user's Okta identity passed as session attributes.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* An AWS account with Amazon Bedrock available in your region, and foundation model access approved
* The [AWS CLI](https://aws.amazon.com/cli/), configured (`aws configure sso`, or an access key and secret)
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the calling app exchanges the user's identity for a short-lived, narrowly scoped access token. It then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. Your app performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any agent. You add it once as a reusable module. See [Add Okta authentication to your agent](#add-okta-authentication-to-your-agent).

* Platform integration (AWS-specific). Your app invokes the Bedrock Agent, passing the access token and the user's claims as session attributes. An action group Lambda function reads those session attributes and forwards the token as a bearer credential to an Okta-protected API. See [Invoke the Bedrock Agent with the access token](#invoke-the-bedrock-agent-with-the-access-token).

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
Platform integration (main.py, AWS Bedrock Agent)
  invoke_agent(..., sessionAttributes={
    "okta_access_token": access_token,
    "user_name": ..., "user_email": ..., "user_sub": ...,
  })
    |
    v
Action group (Lambda)
  Authorization: Bearer <access_token>
    |
    v
Okta-protected API
```

There's no gateway or interceptor in this pattern. Your calling app owns the full token exchange, and the Bedrock Agent receives a ready-to-use `access_token` in its session attributes.

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` your app exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`. Okta strips system scopes (`openid`, `profile`, `email`) during the ID-JAG exchange and can cause an `invalid_scope` error, so you must request a custom scope instead.
* Your agent imported into Okta as an AI Agent identity that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the agent.

  > **Note:** Okta doesn't retain the agent's private key. Store it in a secrets manager when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI Agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Collect your configuration values

Your app reads these values as environment variables. The token exchange module uses the first group. The second group is specific to AWS Bedrock.

<AiAgentOktaConfigValues/>

**AWS values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `BEDROCK_AGENT_ID` | The Bedrock Agent to invoke | **AWS Console** > **Bedrock** > **Agents** |
| `BEDROCK_AGENT_ALIAS_ID` | The alias of the Bedrock Agent | **AWS Console** > **Bedrock** > **Agents** > **Aliases** |
| `AWS_REGION`, `AWS_DEFAULT_REGION` | The AWS region where the Bedrock Agent runs | **AWS Console** |

> **Note:** Set both `AWS_REGION` and `AWS_DEFAULT_REGION`. Your code passes `AWS_REGION` as `region_name` to the boto3 client. The boto3 internals read `AWS_DEFAULT_REGION` when refreshing SSO credentials. Omitting it causes a `NoRegionError`.

## Add Okta authentication to your agent

The following example `token_exchange.py` module that you create here has no dependency on AWS or Amazon Bedrock.

<AiAgentTokenExchangeModule/>

## Set up your AWS Bedrock Agent

### Enable model access

Foundation models aren't enabled by default. If your model shows as unavailable:

1. In the AWS console, go to **Amazon Bedrock** > **Model access**.
1. Click **Request access** for the model you want, for example `amazon.titan-text-lite-v1`.

> **Note:** There's no CLI command for requesting model access. Use the AWS console. To verify access through CLI after approval:
>
> ```bash
> aws bedrock get-foundation-model \
>   --model-identifier amazon.titan-text-lite-v1 \
>   --region us-east-1
> ```

### Create the agent

1. In the AWS console, go to **Amazon Bedrock** > **Agents** > **Create Agent**.
1. Choose a foundation model.
1. Add **Agent Instructions**. This field can't be empty. Describe what the agent does.
1. (Optional) Add **Action Groups**: Lambda functions the agent can invoke. Inside each Lambda, retrieve the Okta token from session attributes to call Okta-protected APIs:

   ```python
   def lambda_handler(event, context):
       access_token = event.get("sessionAttributes", {}).get("okta_access_token")
       user_email = event.get("sessionAttributes", {}).get("user_email")

       resp = requests.get(
           "https://yourorg.okta.com/api/v1/users/me",
           headers={"Authorization": f"Bearer {access_token}"},
       )
       # ...
   ```

1. Click **Prepare** after any change, before testing.
1. Note the **Agent ID** and create an **Alias**. Note the **Alias ID**.

> **Important:** Scope the Lambda's execution role to least privilege: grant it only the specific downstream APIs it needs to call, run it in a VPC if it needs network isolation, and monitor it with CloudWatch and CloudTrail. See [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) and [Implementing least privilege access for Amazon Bedrock](https://aws.amazon.com/blogs/security/implementing-least-privilege-access-for-amazon-bedrock/).

### Import your Bedrock Agent into Okta

Importing the agent lets it appear in **Directory** > **AI Agents** for visibility and governance, such as access certifications. This is separate from the AI Agent identity that you registered in [Before you begin](#before-you-begin), which is the credential your app uses to perform the token exchange.

1. In AWS, create an IAM user dedicated to the import, for example `okta-ai-agent-import`.
1. Attach an inline policy that grants only read access to list and describe agents:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "OktaAIAgentImport",
         "Effect": "Allow",
         "Action": [
           "sts:GetCallerIdentity",
           "bedrock:GetAgent",
           "bedrock:ListAgents"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

1. Generate an access key for the IAM user and store it in a secrets manager.
1. In the Admin Console, configure the AI agent import with the access key, the AWS regions where your agents run, and **AWS Bedrock Agents** as the platform. Test the connection and save.

## Configure your app

### Project structure

```text
bedrock-agent-app/
├── main.py           # Token exchange + Bedrock Agent invocation
├── token_exchange.py # Okta token exchange module
├── requirements.txt
├── .env              # Secrets (gitignored)
└── .env.example      # Template
```

### Add the Bedrock dependencies

Add these to the same `requirements.txt`, alongside the token exchange dependencies:

```text
boto3>=1.34.0
botocore[crt]
python-dotenv>=1.0.0
```

> **Note:** Your project requires `botocore[crt]` when your AWS credentials use the SSO login credential provider. Without it, the runtime fails at startup with `ModuleNotFoundError: awscrt`.

Install the complete set of dependencies:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Invoke the Bedrock Agent with the access token

After the token exchange, invoke the agent and pass the `access_token` and the user's claims as session attributes. A Lambda action group on the agent reads those attributes and forwards the token as `Authorization: Bearer <access_token>` to an Okta-protected resource.

```python
import os
import uuid
import boto3

BEDROCK_AGENT_ID = os.environ["BEDROCK_AGENT_ID"]
BEDROCK_AGENT_ALIAS_ID = os.environ["BEDROCK_AGENT_ALIAS_ID"]
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")


def invoke_bedrock_agent(prompt: str, user_claims: dict, access_token: str) -> str:
    client = boto3.client("bedrock-agent-runtime", region_name=AWS_REGION)

    response = client.invoke_agent(
        agentId=BEDROCK_AGENT_ID,
        agentAliasId=BEDROCK_AGENT_ALIAS_ID,
        sessionId=str(uuid.uuid4()),  # reuse across turns for multi-turn sessions
        inputText=prompt,
        sessionState={
            "sessionAttributes": {
                "okta_access_token": access_token,
                "user_name": user_claims.get("name", ""),
                "user_email": user_claims.get("email", ""),
                "user_sub": user_claims.get("sub", ""),
            }
        },
    )

    # The response is a streaming EventStream.
    chunks = [
        event["chunk"]["bytes"].decode()
        for event in response["completion"]
        if "chunk" in event
    ]
    return "".join(chunks)
```

> **Note:** The IAM identity running this code needs the `bedrock:InvokeAgent` permission on the target agent. This is a separate, narrower permission than the read-only import policy in [Import your Bedrock Agent into Okta](#import-your-bedrock-agent-into-okta).

## Wire it into an entry point

In your app's entry point, call the two token exchange functions in order, decode the user's identity claims from the `id_token`, and then invoke the Bedrock Agent. The following `main.py` imports the reusable token exchange module and adds only the AWS-specific wiring:

```python
import json
import sys

import jwt

from token_exchange import get_id_jag, get_access_token
# invoke_bedrock_agent from the previous step


def main():
    payload = json.loads(sys.argv[1])
    id_token = payload["id_token"]
    prompt = payload["prompt"]

    # Okta authentication
    id_jag = get_id_jag(id_token)
    access_token = get_access_token(id_jag)

    # The id_token was already verified by the org authorization server in
    # Step 1. Decoding it here only reads display claims for the session
    # attributes. It isn't used to make an authorization decision.
    user_claims = jwt.decode(id_token, options={"verify_signature": False})

    # Platform integration (AWS Bedrock)
    answer = invoke_bedrock_agent(prompt, user_claims, access_token)

    print(json.dumps({
        "ok": True,
        "user": user_claims.get("name"),
        "access_token_prefix": access_token[:10],
        "answer": answer,
    }))


if __name__ == "__main__":
    main()
```

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Run `main.py` locally, passing the test ID token to confirm the full `id_token` → ID-JAG → `access_token` round trip:

```bash
source venv/bin/activate
python main.py "{\"id_token\": \"$ID_TOKEN\", \"prompt\": \"Who am I?\"}"
```

A successful response appears as follows and confirms the full round trip:

```json
{
  "ok": true,
  "user": "Jane Doe",
  "access_token_prefix": "eyJraWQiOiI...",
  "answer": "Hello! How can I help you today?"
}
```

### Useful AWS CLI commands

```bash
# List your Bedrock Agents
aws bedrock list-agents --region us-east-1

# Find an Agent's Alias IDs
aws bedrock list-agent-aliases \
  --agent-id <BEDROCK_AGENT_ID> \
  --region us-east-1

# Invoke the agent directly, bypassing main.py
aws bedrock-agent-runtime invoke-agent \
  --agent-id <BEDROCK_AGENT_ID> \
  --agent-alias-id <BEDROCK_AGENT_ALIAS_ID> \
  --session-id test-session-1 \
  --input-text "Hello" \
  --region us-east-1 \
  outfile.json

# Check Lambda logs for action groups
aws logs tail /aws/lambda/<action-group-function-name> \
  --follow \
  --region us-east-1
```

## Troubleshooting

The following errors are specific to the AWS Bedrock integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| `NoRegionError: You must specify a region` | The boto3 SSO credential refresher needs `AWS_DEFAULT_REGION` | Set both `AWS_REGION` and `AWS_DEFAULT_REGION` in the environment |
| `ModuleNotFoundError: awscrt` at startup | Missing the CRT extension required by the SSO credential provider | Run `pip install botocore[crt]` |
| `ThrottlingException` on `InvokeAgent` | Bedrock model invocation quota exceeded (often `0` on new accounts) | Check **Service Quotas**. A quota of `0` means that the model is disabled for the account |
| `Agent Instruction cannot be null` | The Bedrock agent has no instructions | In the AWS console, edit the agent to add an instruction, then choose **Prepare** |
| `ResourceNotFoundException` on `InvokeAgent` | Wrong agent ID or alias ID | Verify `BEDROCK_AGENT_ID` and `BEDROCK_AGENT_ALIAS_ID` in the AWS console |

The following errors come from the Okta token exchange and are covered in [Set up third-party AI Agent token exchange: Troubleshooting](/docs/guides/ai-agent-third-party-token-exchange/main/#troubleshooting):

* `invalid_scope: openid not allowed`
* `invalid_client: JWKSet not configured`
* `invalid_client: kid is invalid`
* `access_denied: no_matching_policy`
* `Only service apps can use client_credentials`

## Next steps

Your Bedrock Agent can now authenticate as a user and call Okta-protected APIs on their behalf. To define which resources and scopes the agent is permitted to reach, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/) and the Okta for AI Agents documentation on governing access to AI agents.

## See also

* [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/)
* [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/)
* [Amazon Bedrock Agents documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html)
* [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
* [Implementing least privilege access for Amazon Bedrock](https://aws.amazon.com/blogs/security/implementing-least-privilege-access-for-amazon-bedrock/)
