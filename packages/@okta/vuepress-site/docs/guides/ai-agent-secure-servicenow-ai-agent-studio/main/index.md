---
title: Secure a ServiceNow AI Agent Studio agent
excerpt: Learn how to add Okta authentication to an existing ServiceNow AI Agent Studio agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to build a FastAPI wrapper that authenticates users with Okta, performs Okta's two-step token exchange internally, and then calls a ServiceNow AI Agent Studio agent through the AI agent invoke API. Your app owns the full flow: it exchanges the user's identity for a scoped access token that authorizes the call, obtains a separate ServiceNow access token, passes the user's verified identity to the AI agent in the message that it sends, and reads the AI agent's answer from ServiceNow.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the ServiceNow-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what an imported AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your AI agent.
* Authenticate to ServiceNow with the OAuth 2.0 client credentials grant and invoke an AI Agent Studio agent.
* Pass a signed-in user's verified Okta identity to the AI agent and read its answer.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A ServiceNow instance with AI Agent Studio enabled and an active AI agent that you can call. See [Create the AI agent in AI Agent Studio](#create-the-ai-agent-in-ai-agent-studio).
* An existing ServiceNow Universal Directory app integration in your Okta org. See [Import your AI agent from ServiceNow](#import-your-ai-agent-from-servicenow).
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. You add it once as a reusable module. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (ServiceNow-specific). Unlike the other platforms, ServiceNow can't use an Okta-issued token. Your wrapper uses the Okta access token only to authorize the call, and then authenticates to ServiceNow separately with the OAuth 2.0 client credentials grant. It invokes the AI agent, passes the user's name and email from the `id_token` in the message text, and reads the AI agent's answer from the ServiceNow execution tables. See [Integrate the token exchange into your AI Agent Studio agent](#integrate-the-token-exchange-into-your-ai-agent-studio-agent).

<!-- TODO: Replace this text-based diagram with an image.

```text
User
  { "prompt": "...", "id_token": "<okta_id_token>" }
    |
    v
Okta authentication (token_exchange.py)
  Step 1: id_token  ->  ID-JAG        (Org AS:    /oauth2/v1/token)
  Step 2: ID-JAG    ->  access_token  (Custom AS: /oauth2/{custom-as-id}/v1/token)
          The access token authorizes the call. It's never sent to ServiceNow.
    |
    v
Platform integration (ServiceNow: main_servicenow.py)
  Step 3: client_credentials  ->  ServiceNow access token  (SN instance: /oauth_token.do)
  Step 4: invoke the AI agent, with the user's name and email in the message text
          (AI agent invoke API: /api/sn_aia/agenticai/v1/agent/id/{sys_id})
  Step 5: poll for the answer
          (Table API: sn_aia_execution_plan and sn_aia_execution_task)
    |
    v
AI Agent Studio agent answer
```-->

> **Note:** The Okta `access_token` from steps 1 and 2 authorizes the call. If either step fails, your wrapper doesn't call ServiceNow. The token isn't forwarded to ServiceNow. The ID-JAG and Okta access token use Okta's authorization server as their audience, so ServiceNow rejects them if you present them to its token endpoint. The ServiceNow token from step 3 is a separate, service-level credential that authenticates your wrapper (not the user) to ServiceNow. See [Troubleshoot your integration](#troubleshoot-your-integration).

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* A web app integration that signs users in and issues the `id_token` that your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim that matches the app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* The ServiceNow AI agent imported into Okta as an AI agent identity. See [Import your AI agent from ServiceNow](#import-your-ai-agent-from-servicenow).

  > **Note:** Okta doesn't retain the AI agent's private key. Store it in a secrets manager when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Import your AI agent from ServiceNow

Okta can discover and import AI agents directly from a connected ServiceNow instance. Okta reads the active AI Agent Studio agent records through the ServiceNow Table API and authenticates with the OAuth 2.0 client credentials grant. You need the super admin role in Okta and admin access to your ServiceNow instance.

Create an Application Registry for the import:

1. In ServiceNow, follow the steps in [Set up your ServiceNow instance](#set-up-your-servicenow-instance) to enable the client credentials grant, create a service user, and create an Application Registry. Create a separate Application Registry for the import, and another for the wrapper that you build later.
1. In the import registry's **Auth Scopes** section, add **List AI Agents**, and then click **Update**. Without this scope, ServiceNow issues a token but returns a `403` error when Okta lists the AI agents.
1. Copy the registry's **Client ID** and **Client Secret**.

Enable imports for the app:

1. In the Admin Console, go to **Directory** > **AI Agent Providers**, and then select your ServiceNow Universal Directory app integration. If you have multiple ServiceNow app integrations, only configure AI agent imports for one of them.
1. Go to the **AI Agent Import** tab, and select **Enable AI agent imports**.
1. Enter the client ID and client secret of the import registry. Click **Test API Credentials** to validate them, and then click **Save configuration**.

   > **Note:** Okta only imports AI agents that the service user has permission to manage in ServiceNow. Okta imports only active AI agents that have a name.

1. Choose your import schedule, matching criteria, and preview settings, then save the configuration again. Okta runs the import immediately, and on the schedule you chose afterward.

<span style="color: #c0392b;">**TODO:** Engineering hasn't run an import through the Admin Console, so these steps come from the connector code and the ServiceNow Table API calls that engineering ran directly. Confirm the following: where an admin enters the ServiceNow instance URL (the engineering notes say Okta reads it from the app instance's cpc_full_domain custom property, which must be a full https URL with no trailing path), the screen name and navigation for viewing imported or pending-preview AI agents, and how to trigger an on-demand import outside the schedule.</span>

Register the imported AI agent and set up its identity:

1. Go to **Directory** > **AI Agents**, and then register the imported AI agent. Importing an AI agent doesn't create its credentials, so you must register and activate it.
1. On the **User access** tab, link the OIDC web app that signs users in. Either create a new OIDC app linked to this AI agent, or select your existing OIDC app.

   > **Important:** This action permanently links the AI agent to the app. To change the link, delete the AI agent and recreate it. Each app links to one AI agent, and each AI agent links to one app.

1. On the **Client registration** tab, click **Configure** next to **Public/private key**, click **Add public key**, and then click **Generate new key**. Copy the private key and store it in a secrets manager, since Okta shows it only once. Click **Done**.
1. Copy the **Client ID**, which starts with `wlp`, and the public key's **Key ID**. You need them for `AGENT_CLIENT_ID` and `AGENT_KEY_ID`, respectively.
1. On the **Resource connections** tab, click **Add resource connection**. For **Resource type**, select **Authorization server**, and then select your custom authorization server. Under **Scopes**, select **Only allow**, enter your custom scope, for example, `xaa:read`, and then click **Add**.
1. Click **Actions** > **Activate**, and then click **Confirm**.

> **Note:** If you create the OIDC app from the AI agent's **User access** tab, the app shares the AI agent's client ID. In that case, the OIDC client ID and `AGENT_CLIENT_ID` are the same `wlp` value. If you select an existing OIDC app, the two values differ, and the `id_token` `aud` claim holds the OIDC app's client ID.
>
> Don't use the **Machine access** tab. It wires the AI agent as a resource that other callers invoke, which isn't what this guide does.

## Set up your ServiceNow instance

Configure a separate, service-level integration in ServiceNow so that your wrapper can authenticate to ServiceNow and invoke the AI agent. This is independent of the Okta AI agent that you imported in the previous section.

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

<span style="color: #c0392b;">**TODO:** Engineering hasn't established the minimal role set. These two roles worked in testing, but they're broad for a runtime credential. Confirm whether narrower roles work, and update this list.</span>

### Create the Application Registry

1. Go to **System OAuth** > **Application Registry**, and click **New**.
1. Select **Create an OAuth API endpoint for external clients**.
1. Set **Name** to a descriptive name, for example, `ai_agents_poc`.

   > **Note:** If **Default Grant Type** or **OAuth Application User** aren't visible on the form, click the **Additional Actions** menu, select **Configure** > **Form Layout**, and move both fields from **Available** to **Selected**.

1. Set **Default Grant Type** to **Client Credentials**.
1. Set **OAuth Application User** to the service user you created in the previous section.
1. Click **Update**, and then note the **Client ID** and **Client Secret**. You need them for `SN_CLIENT_ID` and `SN_CLIENT_SECRET`.
1. Open the registry again by searching for its client ID. In the **Auth Scopes** section, add **List AI Agents** and `a2aauthscope`, and then click **Update**.

ServiceNow issues a token without these scopes, but the AI agent APIs then return `403` errors. See [Troubleshoot your integration](#troubleshoot-your-integration).

### Create the AI agent in AI Agent Studio

If you don't already have an AI agent to call, create one. In ServiceNow, go to **AI Agent Studio** > **Create and manage**, and use the following settings:

| Setting | Value | Why it matters |
| --- | --- | --- |
| Name and description | For example, `Okta E2E Test Agent` | These fields are mandatory |
| Role and instructions | For example, "You greet users. The message tells you the user's name and email. Reply with one friendly sentence that includes their name." | Defines what the AI agent does with the identity text that your wrapper sends |
| Tool | A **Script** tool, for example, `Greet User`, with an input named `name` (string) that returns `'Hello ' + name + ', ServiceNow received your request through Okta.'`. Set the execution mode to **Autonomous**. | With no tool, the run completes but the AI agent answers that it can't complete the task |
| External discoverable | On | When this is off, which is the default, the AI agent APIs answer *"No agent available"* |
| Active | On | |

Note the AI agent's `sys_id`. Use the AI agent record (`sn_aia_agent`), not an `sn_aia_agent_config` row. You need it for `SN_AGENT_SYS_ID`.

> **Important:** Every tool that the AI agent uses must be accessible to the service user. A Now Assist skill that was attached as a tool was denied for the service user, and every run ended with **Terminated: Security Violation**. A Script tool passed the same check.

<span style="color: #c0392b;">**TODO:** The AI Agent Studio field labels and settings in this table come from engineering's test run on a ServiceNow developer instance. Confirm the labels on a current instance, and add where an admin finds the AI agent's sys_id.</span>

### Collect your configuration values

Your FastAPI app reads these values as environment variables. The token exchange module uses the first group. The second group is specific to ServiceNow.

<AiAgentOktaConfigValues/>

**ServiceNow values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `SN_INSTANCE_URL` | Your ServiceNow instance hostname, for example `example.service-now.com` | The URL bar when you're signed in to your ServiceNow instance |
| `SN_CLIENT_ID` | The Application Registry's client ID | **System OAuth** > **Application Registry** > your registry |
| `SN_CLIENT_SECRET` | The Application Registry's client secret | **System OAuth** > **Application Registry** > your registry |
| `SN_AGENT_SYS_ID` | The `sys_id` of the AI agent that you want to call | The AI agent record in AI Agent Studio. See [Create the AI agent in AI Agent Studio](#create-the-ai-agent-in-ai-agent-studio) |

## Add Okta authentication to your AI agent

The following example `token_exchange.py` module that you create here has no dependency on ServiceNow.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your AI Agent Studio agent

This section is specific to ServiceNow. Here you authenticate to ServiceNow, invoke the AI agent, read its answer, and wire the result into your FastAPI app alongside the token exchange from the previous section.

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
└── .env               # Secrets (gitignored)
```

### Create your environment file

Create a `.env` file with both the Okta values and the ServiceNow values that you collected in [Collect your configuration values](#collect-your-configuration-values).

### Get a ServiceNow access token

Authenticate to ServiceNow with the OAuth 2.0 client credentials grant. This token authenticates your wrapper to ServiceNow. It's a separate, service-level credential, not the user's Okta access token.

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

### Invoke the AI agent

The AI agent invoke API starts a run of a specific AI agent. The URL contains the AI agent's `sys_id`, and the message text carries the signed-in user's verified name and email from the `id_token`.

```python
import uuid

SN_AGENT_SYS_ID = os.environ["SN_AGENT_SYS_ID"]


def invoke_servicenow_agent(sn_headers: dict, prompt: str, user_claims: dict) -> int:
    """Start the AI agent run. Return the start time in milliseconds."""
    message = (
        f"The signed-in user is {user_claims.get('name')} ({user_claims.get('email')}), "
        f"verified by Okta. {prompt}"
    )
    resp = httpx.post(
        f"https://{SN_INSTANCE_URL}/api/sn_aia/agenticai/v1/agent/id/{SN_AGENT_SYS_ID}",
        headers=sn_headers,
        json={
            "request_id": str(uuid.uuid4()),
            "inputs": [{"role": "user", "content": message}],
            "metadata": {},
        },
    )
    resp.raise_for_status()
    return resp.json()["created"]
```

The call is asynchronous. It returns immediately with an empty `result`, so the answer isn't in this response:

```json
{
  "status": "Success",
  "created": 1792650900189,
  "result": [],
  "metadata": {"session_id": "...", "taskId": "...", "provider": "default-external-agent"}
}
```

> **Important:** ServiceNow has other APIs that look like they apply, but they don't reach an AI Agent Studio agent. The Virtual Agent Bot Integration API (`/api/sn_va_as_service/bot/integration`) runs the conversation as a guest on the generic Virtual Agent topic and ignores `userId`. The A2A endpoints (`/api/sn_aia/a2a/v1`) return errors about push notification URLs. Use the AI agent invoke API.

### Read the answer from ServiceNow

Because the invoke call is asynchronous, you read the answer from the ServiceNow execution tables. Find the execution plan that ServiceNow created for your run, wait until its `state` is `completed` or `terminated`, and then read the plan's tasks.

```python
import json
import time
from datetime import datetime, timezone


def _servicenow_timestamp(created_ms: int) -> str:
    # Start 15 seconds before the invoke call to allow for clock differences.
    start = datetime.fromtimestamp(created_ms / 1000 - 15, tz=timezone.utc)
    return start.strftime("%Y-%m-%d %H:%M:%S")


def read_servicenow_answer(sn_headers: dict, created_ms: int, timeout: int = 120) -> dict:
    """Wait for the execution plan to finish, and then return the results of its tasks."""
    table_url = f"https://{SN_INSTANCE_URL}/api/now/table"
    deadline = time.monotonic() + timeout
    plan = None
    while time.monotonic() < deadline:
        resp = httpx.get(
            f"{table_url}/sn_aia_execution_plan",
            headers=sn_headers,
            params={
                "sysparm_query": f"sys_created_on>={_servicenow_timestamp(created_ms)}^ORDERBYsys_created_on",
                "sysparm_fields": "sys_id,state,state_reason",
                "sysparm_limit": 1,
            },
        )
        resp.raise_for_status()
        results = resp.json()["result"]
        if results and results[0]["state"] in ("completed", "terminated"):
            plan = results[0]
            break
        time.sleep(2)

    if plan is None:
        raise TimeoutError("The ServiceNow AI agent didn't finish in time.")
    if plan["state"] == "terminated":
        raise RuntimeError(f"The ServiceNow AI agent run terminated: {plan['state_reason']}")

    resp = httpx.get(
        f"{table_url}/sn_aia_execution_task",
        headers=sn_headers,
        params={
            "sysparm_query": f"execution_plan={plan['sys_id']}",
            "sysparm_fields": "type,output",
        },
    )
    resp.raise_for_status()

    # Each task's output is a JSON string. For a tool task, the result is the tool's return value.
    # For an agent task, the result is the AI agent's closing line.
    answers = {}
    for task in resp.json()["result"]:
        output = json.loads(task["output"]) if task["output"] else {}
        answers[task["type"]] = output.get("result")
    return answers


def ask_servicenow_agent(prompt: str, user_claims: dict) -> dict:
    sn_headers = {
        "Authorization": f"Bearer {get_servicenow_token()}",
        "Content-Type": "application/json",
    }
    created_ms = invoke_servicenow_agent(sn_headers, prompt, user_claims)
    return read_servicenow_answer(sn_headers, created_ms)
```

Use the plan's `state` to know when the run is finished. The `status` of the `agent` task can stay `ongoing` after the answer exists.

> **Important:** Matching the execution plan by start time can pick up another run by the same service user. Until you can link a run to its plan, process one ServiceNow call at a time.

<span style="color: #c0392b;">**TODO:** Engineering ran this sequence as HTTP calls against a live ServiceNow instance, but hasn't run this Python. Confirm the following with a live run: the sys_created_on timestamp format in the query, the plan state values while a run is in progress, and the shape of the task output. Also find a field that links the invoke response's session_id to its execution plan, so that concurrent calls can't read each other's answers.</span>

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
    # Okta authentication. If either step fails, the exception stops the request
    # before your wrapper calls ServiceNow.
    id_jag = get_id_jag(request.id_token)
    get_access_token(id_jag)

    # The org authorization server already validated the id_token in step 1.
    # Decoding it here only reads display claims to identify the user to
    # ServiceNow. It isn't used to make an authorization decision.
    user_claims = jwt.decode(request.id_token, options={"verify_signature": False})

    # Platform integration (ServiceNow)
    answer = ask_servicenow_agent(request.prompt, user_claims)

    return {
        "ok": True,
        "user": user_claims.get("email"),
        "answer": answer,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
```

<span style="color: #c0392b;">**TODO:** Engineering flagged an open security item. This wrapper accepts an id_token in the request body. The exchange proves that the token is valid, not that it came from the caller's own sign-in session, so a stolen id_token can be replayed until it expires. Decide with engineering whether this guide adds checks for the aud, exp, and nonce claims and binds the token to the session, or documents this as a prerequisite before production use.</span>

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Start the entry point locally:

```bash
python3 main_servicenow.py
```

In another terminal, send a request with your test ID token. This confirms the full `id_token`, ID-JAG, `access_token`, and ServiceNow round trip:

```bash
curl -s -X POST http://localhost:8000/invoke \
  -H "Content-Type: application/json" \
  -d "{\"id_token\": \"$ID_TOKEN\", \"prompt\": \"Please greet me.\"}"
```

A successful response includes the AI agent's answer. In this example, the `Greet User` tool uses the name from the `id_token`, and the prompt only asks to be greeted:

```json
{
  "ok": true,
  "user": "jessie.smith@example.com",
  "answer": {
    "tool": {"output": null, "Output Fields": "Hello Jessie Smith, ServiceNow received your request through Okta."},
    "agent": "The agent/action was invoked successfully."
  }
}
```

To see the run in ServiceNow, go to **AI Agent Studio** > **View AI agent activity**. The run shows as **Completed**, created by the service user, with your message as the prompt.

<span style="color: #c0392b;">**TODO:** This sample response is illustrative. It reflects the task results that engineering observed in a direct HTTP run, not the output of this guide's code. Replace it with the real response from a run of the code above.</span>

## Troubleshoot your integration

The following errors are specific to the ServiceNow integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| `401 Unauthorized` from `/oauth_token.do` when presenting an ID-JAG or Okta `access_token` as the `assertion` | ServiceNow validates the JWT's `aud` claim against its own token endpoint. Okta's tokens carry Okta's authorization server as their audience, not ServiceNow's | Don't use the ID-JAG or Okta `access_token` as a JWT bearer assertion against ServiceNow. Authenticate separately with the OAuth 2.0 client credentials grant, using `SN_CLIENT_ID` and `SN_CLIENT_SECRET` |
| Client credentials token request fails even with correct credentials | The `glide.oauth.inbound.client.credential.grant_type.enabled` system property is missing or set to `false` | Set the property to `true` in `sys_properties.list` |
| `403` with `Missing required api access scope: List AI Agents`, while the token request returned `200` | The Application Registry lacks that auth scope | In the registry's **Auth Scopes** section, add **List AI Agents** |
| `403` with `Missing required api access scope` on `/api/sn_aia/...` calls | The Application Registry lacks the `a2aauthscope` auth scope | In the registry's **Auth Scopes** section, add `a2aauthscope` |
| *"No agent available"* from the AI agent APIs | The AI agent isn't **External discoverable** | Turn on **External discoverable** for the AI agent |
| The invoke call returns `status: "Success"` with an empty `result` | The AI agent invoke API is asynchronous | Read the answer from the execution tables. See [Read the answer from ServiceNow](#read-the-answer-from-servicenow) |
| The run ends with **Terminated: Security Violation** | The service user can't run one of the AI agent's tools. This happened with a Now Assist skill attached as a tool | Use a tool that the service user can run, such as a Script tool, or grant the service user access to the tool |
| The run ends with **Terminated: Execution Failed**, and the tool task stays `ongoing` | The Script tool didn't return a value | Return a string from the script, and check that the input name matches |
| The AI agent answers *"I am unable to complete the task since I have no instructions or actions."* | The AI agent has no tool attached | Attach a tool to the AI agent |
| A call to the Virtual Agent Bot Integration API returns `200` but your AI agent never answers | That API runs a generic Virtual Agent conversation as a guest. It doesn't reach the AI Agent Studio agent | Use the AI agent invoke API (`/api/sn_aia/agenticai/v1`) |
| Python client error `CERTIFICATE_VERIFY_FAILED: self-signed certificate in certificate chain` | A TLS-inspecting proxy is in the path, and Python's certificate bundle lacks its root CA | Use the operating system's trust store, for example, with the `truststore` package |
| `invalid_client: The client_assertion signature is invalid.` at the code exchange | The client assertion was signed with a different private key than the one registered for that `kid` | Use the JWK whose `kid` matches the registered public key |
| Import validation rejects a correct client ID | The ServiceNow instance URL has no scheme or has a trailing path | Enter the full URL in the form `https://<instance>.service-now.com` |
| Fewer AI agents are imported than you expected | Okta imports only active AI agents that have a name, and it collapses duplicate records for the same AI agent | Check the AI agents' active status and names in ServiceNow |

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

<span style="color: #c0392b;">**TODO:** Add links to ServiceNow's own AI Agent Studio and Table API documentation. Neither engineering nor the earlier drafting could fetch ServiceNow's documentation site, because it renders in the browser, and the public URLs aren't confirmed.</span>
