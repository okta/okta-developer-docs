---
title: Secure a Google Vertex AI agent
excerpt: Learn how to add Okta authentication to an existing Google Vertex AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to build a Python wrapper that authenticates users with Okta, performs Okta's token exchange, and then calls a Google Vertex AI agent. In Vertex AI, an agent is a Reasoning Engine (the resource type behind Vertex AI Agent Engine and Agent Builder). Your app owns the full flow. It verifies who the user is, exchanges that identity for a scoped access token, and uses that token to create a session with Reasoning Engine. It then sends the user's prompt and polls for the agent's response.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Google Vertex AI-specific code and the configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what a third-party AI agent must do to authenticate as a signed-in user with Okta.
* Add a token exchange module to your agent.
* Create a session with a Vertex AI Reasoning Engine, send a prompt, and poll for the agent's response.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A Google Cloud project with Vertex AI enabled and an existing Reasoning Engine (Vertex AI Agent Engine) that you can call
* A Google account with the **Editor** role or the **AI Platform Editor** (`aiplatform.editor`) role on that project
* An existing Google Workspace app integration in your Okta org. The Google Vertex AI import configuration lives on this app's **AI Agent Import** tab.
* The Google Vertex AI agent imported into Okta as an AI Agent identity. See [Import your agent from Google Vertex AI](#import-your-agent-from-google-vertex-ai).
* [Python](https://www.python.org/) 3.10 or later

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an identity assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any agent. You add it once as a reusable module. See [Add Okta authentication to your agent](#add-okta-authentication-to-your-agent).

* Platform integration (Google Vertex AI-specific). Unlike a single synchronous call, the Vertex AI Reasoning Engine API is session- and event-based. Your wrapper creates a session, appends the user's prompt to it as an event, and polls the session's events until the agent responds. See [Integrate the token exchange into your Vertex AI agent](#integrate-the-token-exchange-into-your-vertex-ai-agent).

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
Platform integration (Google Vertex AI: agent.py)
  Create session       -> POST  .../reasoningEngines/{id}/sessions
  Send prompt as event -> POST  .../sessions/{session_id}:appendEvent
  Poll for response    -> GET   .../sessions/{session_id}/events
    |
    v
Vertex AI Reasoning Engine response
```-->

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you add any integration code. For detailed steps, see [Set up third-party AI Agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` your agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* The Google Vertex AI agent imported into Okta as an AI Agent identity that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the agent. See [Import your agent from Google Vertex AI](#import-your-agent-from-google-vertex-ai).

  > **Note:** Okta doesn't retain the agent's private key. Store it in a secrets manager when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI Agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Import your agent from Google Vertex AI

Importing a Google Vertex AI agent works differently than importing an agent from the other supported platforms. Instead of registering the agent directly with its own key pair, Okta connects to your Google Cloud project through OAuth 2.0 and its Security Token Service (STS) and discovers and imports Reasoning Engines from that project. This setup lives on your org's **Google Workspace** app integration, not under **Directory** > **AI Agents**.

You need an existing Google Workspace app integration in your org (**Applications** > **Applications**). If you don't have one yet, create it before you continue.

1. In the [Google Cloud Console](https://console.cloud.google.com/), select your target project, and then go to **APIs & Services** > **OAuth consent screen**.

   > **Important:** Your Google account needs the **Editor** role or the **AI Platform Editor** (`aiplatform.editor`) role on the project to complete this configuration.

1. Go to the **Clients** tab, and then click **+ Create client**.
1. Set **Application type** to **Web application**, and enter a descriptive name, for example, `Vertex-Agent-Import-Client`.
1. Under **Authorized redirect URIs**, click **Add URI**, and enter `{yourOktaDomain}/oauth2/v1/sts/callback`.
1. Click **Create**. Note the **Client ID** and **Client Secret** that are shown in the confirmation dialog. Okta uses these credentials to discover and import your Reasoning Engines, so store them in a secrets manager.
1. Go to the **Audience** tab.
   * If the consent screen's **User type** is **External**, scroll to **Test users**, click **+ Add users**, and add the email addresses of the accounts that complete the import consent flow.
   * If the **User type** is **Internal**, no additional provisioning is required.
1. In the Admin Console, go to your org's Google Workspace app integration, and open its **AI Agent Import** tab.
1. Enter the client ID, client secret, your Google Cloud project ID, and the location (region) where your Reasoning Engines run, for example, `us-west1`. Click **Test API Credentials** to validate them.

   > **Note:** Okta validates these credentials against Google. If Google requires other consent, Okta returns an interaction URI. You must open that URI and complete the consent flow before validation can succeed.

   > **Important:** Only use a `location` value that's a genuine Google Cloud region for your project (for example, `us-west1`). Okta uses this value to build the request URL it calls with your Google access token attached.

1. Save the configuration, and then trigger the import. Select the Reasoning Engine to import from the discovered list, and complete the import.

## Collect your configuration values

Your Google Vertex AI agent code reads these values as environment variables. The token exchange module consumes the first group. The second group is specific to Google Vertex AI.

<AiAgentOktaConfigValues/>

**Google Vertex AI values (used by the platform integration):**

| Environment variable | Description | Where to find it |
| --- | --- | --- |
| `GCP_PROJECT_ID` | The Google Cloud project that hosts your Reasoning Engine, for example, `imports-testing` | **Google Cloud Console** > project selector |
| `GCP_LOCATION` | The region where your Reasoning Engine runs, for example, `us-west1` | **Google Cloud Console** > **Vertex AI** > **Agent Engine** |
| `GCP_REASONING_ENGINE_ID` | The numeric ID of the Reasoning Engine to call | The trailing segment of the engine's `name` field, for example, `8411791718067732480` in `projects/{project}/locations/{location}/reasoningEngines/8411791718067732480` |

> **Note:** These values identify the Reasoning Engine that you're calling. They're separate from the client ID and client secret that you created in [Import your agent from Google Vertex AI](#import-your-agent-from-google-vertex-ai), which Okta uses only to discover and import agents, not at runtime.

## Add Okta authentication to your agent

The following example `token_exchange.py` module that you create here has no dependency on Google Cloud or Vertex AI.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your Vertex AI agent

This section is specific to Google Vertex AI. Here you call `get_id_jag` and `get_access_token` from your agent, then use the resulting access token to create a session with the Reasoning Engine, send the user's prompt, and poll for a response.

> **Note:** The following examples pass the Okta-issued `access_token` directly to the Vertex AI REST API as a bearer credential. Confirm this against your own Reasoning Engine setup. If your org instead requires exchanging the Okta token for a Google Cloud-native token (for example, through Workforce Identity Federation), add that exchange before the calls that are shown here.

### Add the Vertex AI dependencies

Add these to the same `requirements.txt`, alongside the token exchange dependencies:

```text
requests
python-dotenv
```

Install the complete set of dependencies:

```bash
pip install -r requirements.txt
```

### Create a session

Start a session with the Reasoning Engine. The response includes a `name` field. The last path segment is the session ID that you use in the following steps.

```python
import os
import requests

GCP_PROJECT_ID = os.environ["GCP_PROJECT_ID"]
GCP_LOCATION = os.environ["GCP_LOCATION"]
GCP_REASONING_ENGINE_ID = os.environ["GCP_REASONING_ENGINE_ID"]

BASE_URL = (
    f"https://{GCP_LOCATION}-aiplatform.googleapis.com/v1beta1/projects/{GCP_PROJECT_ID}"
    f"/locations/{GCP_LOCATION}/reasoningEngines/{GCP_REASONING_ENGINE_ID}"
)


def create_session(access_token: str, user_id: str) -> str:
    resp = requests.post(
        f"{BASE_URL}/sessions",
        headers={"Authorization": f"Bearer {access_token}"},
        json={"userId": user_id},
    )
    resp.raise_for_status()
    # "name" looks like ".../reasoningEngines/{id}/sessions/{session_id}"
    return resp.json()["name"].rsplit("/", 1)[-1]
```

> **Note:** The `userId` identifies the session owner to the Reasoning Engine. Use a stable identifier for the signed-in user, such as the `sub` claim from their `id_token`.

### Send the prompt

Append the user's prompt to the session as a `USER` event.

```python
def send_prompt(access_token: str, session_id: str, prompt: str) -> None:
    resp = requests.post(
        f"{BASE_URL}/sessions/{session_id}:appendEvent",
        headers={"Authorization": f"Bearer {access_token}"},
        json={
            "author": "USER",
            "rawEvent": {"text": prompt},
        },
    )
    resp.raise_for_status()
```

### Poll for the response

The Reasoning Engine responds asynchronously. Poll the session's events and scan them for the first one the agent authors.

```python
import time


def get_agent_response(access_token: str, session_id: str, timeout_seconds: int = 30) -> str:
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        resp = requests.get(
            f"{BASE_URL}/sessions/{session_id}/events",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        resp.raise_for_status()
        events = resp.json().get("sessionEvents", [])
        for event in reversed(events):
            if event.get("author") in ("AGENT", "ASSISTANT"):
                return event.get("rawEvent", {}).get("text", "")
        time.sleep(1)
    raise TimeoutError("Timed out waiting for a response from the Reasoning Engine.")
```

> **Note:** Confirm the exact shape of an agent-authored event (whether the response text is always under `rawEvent.text`) against a real response from your Reasoning Engine.

## Wire it into the entry point

In your app's entry point, call the two token exchange functions in order, and then create the session, send the prompt, and poll for the response. The following example `main_vertex.py` imports the reusable token exchange module and adds only the Vertex AI-specific wiring:

```python
import jwt

from token_exchange import get_id_jag, get_access_token
# create_session, send_prompt, get_agent_response from the previous steps


def ask_vertex_agent(id_token: str, prompt: str) -> str:
    # Okta authentication
    id_jag = get_id_jag(id_token)
    access_token = get_access_token(id_jag)

    # The id_token was already verified by the org authorization server in
    # Step 1. Decoding it here only reads the sub claim to identify the
    # session owner. It isn't used to make an authorization decision.
    user_claims = jwt.decode(id_token, options={"verify_signature": False})

    # Platform integration (Google Vertex AI)
    session_id = create_session(access_token, user_claims["sub"])
    send_prompt(access_token, session_id, prompt)
    return get_agent_response(access_token, session_id)


if __name__ == "__main__":
    id_token = input("Paste a test Okta id_token: ").strip()
    prompt = input("💬 Enter custom prompt for vertex ai: ").strip()
    print(ask_vertex_agent(id_token, prompt))
```

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Run the entry point locally, passing a test ID token to confirm the full `id_token` → ID-JAG → `access_token` → Vertex AI round trip:

```bash
python3 main_vertex.py
```

A successful run looks like this, and confirms the full round trip:

```text
💬 Enter custom prompt for vertex ai: Hello
🔄 Initializing identity validation pipeline against Okta API endpoints...
✅ Identity verified and access token generated successfully via Okta!
🚀 Forwarding secure runtime bundle to the Vertex AI Reasoning Engine...
Hello! How can I help you today?
```

## Troubleshoot your integration

<!-- TODO: The source material for this guide didn't include a confirmed table of Google Vertex AI-specific errors, root causes, and fixes (unlike the AWS Bedrock and Salesforce Agentforce guides' "Gotchas" sections). Add one here once available. Likely candidates based on the import flow: a redirect URI mismatch between the Google OAuth client and Okta's callback, missing `aiplatform.editor`/Editor role during import, and a required consent (`interaction_required`) not yet completed by an admin. -->

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
<!-- TODO: Add a link to the Google Vertex AI Agent Engine / Reasoning Engine platform documentation. -->
