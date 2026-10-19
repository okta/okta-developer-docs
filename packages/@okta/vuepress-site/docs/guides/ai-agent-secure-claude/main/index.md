---
title: Secure a Claude AI agent
excerpt: Learn how to add Okta authentication to an existing Claude AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to secure a Claude AI agent by adding a tool that performs Okta's two-step token exchange. It assumes that you host the loop that drives your Claude AI agent, and that you can modify its code. The service that hosts the loop, called the orchestrator, receives the signed-in user's Okta `id_token`. A tool that the model calls then exchanges that `id_token` for a scoped access token, so the AI agent can call Okta-protected resources on the user's behalf.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Claude-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what an imported AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your AI agent.
* Add a tool to your Claude AI agent loop that performs the token exchange and makes the resulting access token available to your other tools.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* An Anthropic API key that has model access, for the orchestrator that hosts your Claude AI agent loop
* A Claude AI agent imported into Okta as an AI agent identity. See [Import your AI agent from Claude](#import-your-ai-agent-from-claude).
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. You add it once as a reusable module. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (Claude-specific). A Claude AI agent is driven by messages, not by an HTTP handler, so there's no request header for the AI agent to read. Your orchestrator receives the user's `id_token` through its own channel, such as its HTTP layer or a session kickoff. A tool that the model calls performs the exchange and stores the access token for the request. Other tools then read it and attach it to their downstream calls. See [Integrate the token exchange into your Claude AI agent](#integrate-the-token-exchange-into-your-claude-ai-agent).

<!-- TODO: Replace this text-based diagram with an image.

```text
User
  signs in with Okta -> receives id_token
    |
    v
Orchestrator (your service)
  receives the id_token through its own channel
  stores it in a context variable (never a tool argument the model sees)
    |
    v
Claude AI agent loop
  model decides it needs to act as the user -> calls exchange_okta_token()
    |
    v
Okta authentication (token_exchange.py, called from the tool)
  Step 1: id_token  ->  ID-JAG        (Org AS:    /oauth2/v1/token)
  Step 2: ID-JAG    ->  access_token  (Custom AS: /oauth2/{custom-as-id}/v1/token)
    |
    v
Downstream tool call
  Authorization: Bearer <access_token>
    |
    v
Okta-protected resource (API or MCP server)
```-->

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

> **Note:** Importing a Claude AI agent into Okta and securing it with token exchange are independent. Importing an AI agent doesn't configure it for the token exchange, and an AI agent that uses the token exchange doesn't have to be imported. This guide uses the import to create the AI agent identity that the token exchange needs.

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` that your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* The Claude AI agent imported into Okta as an AI agent identity that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the AI agent. See [Import your AI agent from Claude](#import-your-ai-agent-from-claude).

  > **Note:** Okta doesn't retain the AI agent's private key. Store it in a secrets manager when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Import your AI agent from Claude

Okta can discover and import Claude Managed Agents directly from your Anthropic account. Okta authenticates with an Anthropic API key, so no OAuth app setup is needed on the Anthropic side.

> **Important:** The Claude import depends on Anthropic beta APIs that can change or be removed. If you have problems with the setup, contact [Okta Support](https://support.okta.com/help/s/opencase).

You need the super admin role in Okta.

Create an API key in the Claude Console:

1. Sign in to the Claude Console.
1. Go to **Manage** > **API keys**, and then click **Create key**.
1. Enter a descriptive name, for example, `okta-ai-agent-import`, and then click **Add**.
1. Copy the key and store it in a secrets manager. You can't view the key again after you close the dialog.

   > **Note:** If your Anthropic Enterprise account uses Workspaces, create the key in a dedicated Workspace. Okta only needs read access to list AI agents.

Add the Claude app to your org:

1. In the Admin Console, go to **Applications** > **Applications and Resources**, and then click **Browse App Catalog**.
1. Search for **Claude**, which Anthropic publishes in the Okta Integration Network, open the integration, and then click **Add Integration**.
1. Enter an **Application label**, and enter your Anthropic base URL, for example, `https://api.anthropic.com`. Click **Next**, select a sign-on method, and then click **Done**.

   > **Note:** To change the URL later, open the app, go to the **General** tab, and click **Edit** in the **App Setting** section.

<!-- TODO: Confirm the exact field label for the Anthropic URL on the General Settings page in the live Admin Console. The help article calls it Anthropic URL, and an older Confluence page calls it Anthropic API Url. -->

Enable imports for the app:

1. Go to **Directory** > **AI Agent Providers**, and then select your Claude app. If you have multiple Claude app integrations, only configure AI agent imports for one of them.
1. On the **AI Agent Import** tab, select **Enable AI agent imports**.
1. Enter your Anthropic API key, and then click **Test API Credentials**. A **Verified** badge confirms the key works.
1. Optional. Under **Assign AI agent owners**, choose to assign individual owners, assign a group owner, or not pre-assign an owner. Under **Import settings**, set an import schedule.
1. Click **Save configuration**.
1. On the **Imported AI agents** tab, click **Import now**. Okta imports the active AI agents in your Anthropic account. It doesn't import archived AI agents.

For the full list of optional owner, schedule, matching, and preview settings, see [Enable AI agent imports for an app](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-imports-enable.htm).

Register the imported AI agent and set up its identity:

1. Go to **Directory** > **AI Agents**, and then register the imported AI agent.
1. On the **User access** tab, link the OIDC web app that signs users in. Either create a new OIDC app linked to this AI agent, or select your existing OIDC app.

   > **Important:** This action permanently links the AI agent to the app. To change the link, delete the AI agent and recreate it. Each app links to one AI agent, and each AI agent links to one app.

1. On the **Client registration** tab, click **Configure** next to **Public/private key**, click **Add public key**, and then click **Generate new key**. Copy the private key and store it in a secrets manager, since Okta shows it only once. Click **Done**.
1. Note the **Client ID**, which starts with `wlp`, and the public key's **Key ID**. You need them for `AGENT_CLIENT_ID` and `AGENT_KEY_ID`, respectively.
1. On the **Resource connections** tab, click **Add resource connection**. For **Resource type**, select **Authorization server**, and then select your custom authorization server. Under **Scopes**, select **Only allow**, enter your custom scope, for example, `xaa:read`, and then click **Add**.
1. Click **Actions** > **Activate**, and then click **Confirm**.

<!-- TODO: Confirm the exact Admin Console labels and step order for registering an imported Claude AI agent, including where the User access, Client registration, and Resource connections tabs appear after the import. These steps follow the shared manual-registration procedure in the engineering notes, not a Claude-specific source. -->

> **Note:** If you create the OIDC app from the AI agent's **User access** tab, the app shares the AI agent's client ID. In that case, the OIDC client ID and `AGENT_CLIENT_ID` are the same `wlp` value. If you select an existing OIDC app, the two values differ, and the `id_token` `aud` claim holds the OIDC app's client ID.

## Collect your configuration values

Your orchestrator reads these values as environment variables. The token exchange module consumes the first group. The second group is specific to Claude.

<AiAgentOktaConfigValues/>

**Claude values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | The Anthropic API key that your orchestrator uses to call Claude. The Anthropic SDK reads this variable automatically. Don't reuse the key that you gave Okta for imports, because that key only needs permission to list AI agents. | **Claude Console** > **Manage** > **API keys** |

## Add Okta authentication to your AI agent

The `token_exchange.py` module that you create here has no dependency on Claude.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your Claude AI agent

This section is specific to Claude. Here you add a tool that calls `get_id_jag` and `get_access_token`, and then run it in your AI agent loop.

### Choose the integration point

Run the token exchange in a tool that your orchestrator executes. Your orchestrator holds the private key and receives the user's `id_token`. The model only decides when to call the tool.

Keep the following in mind when you design the integration:

* **Supply the `id_token` out of band.** Don't make the `id_token` a tool parameter. A tool argument passes a bearer token through the model's context and the transcript. Instead, your orchestrator stores the `id_token` in a context variable, and the tool takes no arguments.
* **Keep the private key in your orchestrator.** Claude Managed Agents vaults substitute credentials into outgoing requests, and the credentials never enter the sandbox. Signing a `private_key_jwt` happens in your code and the key is never sent in a request, so a vault can't hold it. Store the key in a secrets manager that your orchestrator reads.
* **Return a confirmation, not the token.** The tool stores the access token for the request and returns only a status message, so the token stays out of the transcript.

### Add the Claude dependencies

Add these to your `requirements.txt`, alongside the token exchange dependencies:

```text
anthropic>=0.40.0
PyJWT>=2.8.0
cryptography>=42.0.0
requests>=2.31.0
```

<!-- TODO: Confirm the minimum version of the anthropic package that includes the Tool Runner (client.beta.messages.tool_runner) and the beta_tool decorator. The engineering notes list anthropic>=0.40.0 but don't confirm that version provides them. -->

### Project structure

```text
okta-claude-agent/
├── main_claude.py     # Orchestrator: runs the AI agent loop
├── okta_tool.py       # Tools: token exchange and a protected API call
├── token_exchange.py  # Okta token exchange module
├── requirements.txt
└── .env               # Secrets (gitignored)
```

### Create the token exchange tool

Create `okta_tool.py` next to `token_exchange.py`. It defines two context variables, the tool that performs the exchange, and a sample tool that uses the access token.

```python
from contextvars import ContextVar

import requests
from anthropic.lib.tools import beta_tool

from token_exchange import get_access_token, get_id_jag

# The signed-in user's id_token for this request. The orchestrator sets it out of band.
# It's never a tool argument that the model sees.
_current_id_token: ContextVar[str | None] = ContextVar("current_id_token", default=None)
_okta_access_token: ContextVar[str | None] = ContextVar("okta_access_token", default=None)


def set_current_id_token(id_token: str) -> None:
    _current_id_token.set(id_token)


def get_okta_access_token() -> str | None:
    """Return the user-scoped Okta access token for this request, or None."""
    return _okta_access_token.get()


@beta_tool
def exchange_okta_token() -> str:
    """Exchange the signed-in user's Okta identity for a scoped access token so that this
    AI agent can call Okta-protected APIs on their behalf. Takes no arguments. The host
    supplies the user's identity, not you."""
    id_token = _current_id_token.get()
    if not id_token:
        return "No Okta identity available for this request."

    id_jag = get_id_jag(id_token)
    access_token = get_access_token(id_jag)
    _okta_access_token.set(access_token)

    # Return only a confirmation. Never return the token, which keeps it out of the transcript.
    return "Okta access token obtained. Downstream Okta calls act as the user."


@beta_tool
def call_protected_api() -> str:
    """Call an Okta-protected API on behalf of the signed-in user. Call
    exchange_okta_token first."""
    token = get_okta_access_token()
    if not token:
        return "No Okta access token for this request. Call exchange_okta_token first."
    resp = requests.get(
        "https://api.example.com/resource",  # replace with an API that trusts your custom authorization server
        headers={"Authorization": f"Bearer {token}"},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.text
```

> **Note:** Exchange the token on each request instead of caching it. The access token is valid for 24 hours while the ID-JAG is valid for only five minutes, so a cached user token in memory carries far more risk than the exchange costs. Steps 1 and 2 are also one retryable unit. If step 2 fails, repeat both steps from the `id_token`, because the ID-JAG may have expired.

> **Important:** The access token's audience is your custom authorization server, for example, `api://default`. The Okta Management API (`/api/v1/*`) doesn't accept it. Point `call_protected_api` at an API that trusts your custom authorization server.

<!-- TODO: Engineering hasn't confirmed whether the orchestrator should verify that the id_token subject is the caller before it exchanges the token. The exchange proves that the token is valid, not that the caller is its subject. Decide with engineering whether this guide adds the check or documents it as a prerequisite before production use. -->

### Run the AI agent loop

Create `main_claude.py`. The orchestrator stores the user's `id_token` in the context variable, and then runs the Anthropic Tool Runner with both tools.

```python
import sys

from anthropic import Anthropic

from okta_tool import call_protected_api, exchange_okta_token, set_current_id_token

client = Anthropic()  # reads ANTHROPIC_API_KEY


def handle_request(user_id_token: str, prompt: str) -> str:
    # The orchestrator supplies the id_token out of band. The model never sees it.
    set_current_id_token(user_id_token)

    runner = client.beta.messages.tool_runner(
        model="claude-opus-5-5",
        max_tokens=4096,
        tools=[exchange_okta_token, call_protected_api],
        messages=[{"role": "user", "content": prompt}],
    )
    final = runner.until_done()
    return "".join(block.text for block in final.content if block.type == "text")


if __name__ == "__main__":
    id_token_file, prompt = sys.argv[1], sys.argv[2]
    with open(id_token_file) as f:
        print(handle_request(f.read().strip(), prompt))
```

In a production app, `handle_request` runs inside your own HTTP layer or session handler, which supplies `user_id_token` from the signed-in user's session.

<!-- TODO: The engineering notes verified the token exchange by calling the tool function directly, with no model in the loop. The model-driven loop shown here is unrun. Confirm that the Tool Runner calls the tools in a context where the value set by set_current_id_token is visible, especially if you use async tools. Confirm the model ID and the Tool Runner calls against a live run. -->

### Use a Managed Agents custom tool

If you want Anthropic to host the AI agent loop, declare `exchange_okta_token` as a custom tool on your Claude AI agent. When the AI agent emits an `agent.custom_tool_use` event, your orchestrator runs the same exchange and returns the result in a `user.custom_tool_result` event. The tool body is identical. The difference is who runs the loop. Your orchestrator still holds the private key and the `id_token`.

<!-- TODO: The engineering notes describe this variant but haven't run it. Confirm the event names and the beta header against Anthropic's current Managed Agents documentation, and add working code once it's verified. -->

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Save your test ID token to a file, and then run the orchestrator with a prompt that asks the model to use both tools:

```bash
python3 main_claude.py /tmp/okta-id-token.txt \
  "Call exchange_okta_token to act as me, and then call call_protected_api and tell me the result."
```

Delete the token file after the run.

<!-- TODO: Add a sample successful response after a live model-driven run. Engineering hasn't run the full loop with a model yet. -->

## Troubleshoot your integration

The following errors are specific to the Claude integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| The `id_token` appears in the transcript or the model's context | You passed the `id_token` as a tool argument | Set the `id_token` in a context variable from your orchestrator, and make the tool take no token argument |
| You can't store the private key in a Claude Managed Agents vault | Vault credentials are substituted into outgoing requests and never enter the sandbox. Signing a `private_key_jwt` happens in your code, and the key is never sent | Keep the key in your orchestrator and run the exchange there |
| **Test API Credentials** fails with an authentication error | The Anthropic API key is wrong or empty, or it lacks access to the Workspace | Verify the key in the Claude Console and enter it again |
| An expected AI agent is missing after the import | The AI agent is archived in your Anthropic account. Okta doesn't import archived AI agents | Unarchive the AI agent in the Claude Console, and then run the import again |
| `KeyError` for an Okta environment variable when the orchestrator starts | The `token_exchange.py` module reads its Okta values when it loads | Set all of `OKTA_DOMAIN`, `AGENT_CLIENT_ID`, `AGENT_KEY_ID`, and `AGENT_PRIVATE_KEY_JWK` before you start the orchestrator |
| A downstream call to the Okta Management API returns `400` with the delegated token | The access token's audience is your custom authorization server, for example, `api://default`, and the Okta Management API doesn't accept it. This isn't a token exchange failure | Call an API that trusts your custom authorization server |
| The model never calls `exchange_okta_token` | The model wasn't told to act as the user | Tell the model in your prompt or system instructions to call `exchange_okta_token` before any Okta-protected call |

<!-- TODO: Confirm the Claude-specific errors with engineering after a live model-driven run. The rows above come from the engineering notes and the token exchange verification. -->

The following errors come from the Okta token exchange and are covered in [Set up imported AI agent token exchange: Troubleshooting](/docs/guides/ai-agent-third-party-token-exchange/main/#troubleshooting):

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
* [Configure Claude for AI agent imports](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-claude.htm)
* [Enable AI agent imports for an app](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-imports-enable.htm)
<!-- TODO: Add a link to Anthropic's Claude Managed Agents and Tool Runner documentation once the correct public URLs are confirmed. -->
