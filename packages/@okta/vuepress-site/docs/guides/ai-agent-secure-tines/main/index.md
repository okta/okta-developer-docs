---
title: Secure a Tines AI agent
excerpt: Learn how to add Okta authentication to an existing Tines AI agent
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to secure a Tines AI agent by adding Okta's two-step token exchange to the Tines story that runs it. A Tines AI agent is an AI Agent action in a story, which is a workflow of connected actions. You add a Webhook action that receives the signed-in user's Okta `id_token` and a Run Script action that exchanges it for a scoped access token. Actions later in the story, such as an HTTP Request action, then call Okta-protected resources on the user's behalf.

The Okta authentication is a two-step token exchange that's the same for any AI agent, regardless of the platform it runs on. This guide first introduces what the integration needs to do and provides sample code functions that implement the authentication. It then shows the Tines-specific code and configuration that consumes it.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

---

#### Learning outcomes

* Understand what an imported AI agent must do to authenticate as a signed-in user with Okta.
* Understand the token exchange logic that your AI agent performs.
* Add a Webhook action and a Run Script action to a Tines story that perform the token exchange and pass the resulting access token to later actions.
* Store the AI agent's credentials as Tines credentials.
* Verify and test the end-to-end flow with a real Okta ID token.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled
* A Tines tenant and a story that you can edit. Your plan must include the Run Script action. Some Tines plans restrict actions that run code.
* A Tines AI agent imported into Okta as an AI agent identity. See [Import your AI agent from Tines](#import-your-ai-agent-from-tines).

---

## Overview

An AI agent has no inherent knowledge of an Okta user. To let it act for a specific user without sharing long-lived credentials, the AI agent exchanges the user's identity for a short-lived, narrowly scoped access token, and then uses that token to call protected resources.

The integration has two parts:

* Okta authentication. The AI agent performs a two-step token exchange:
  1. Exchange the user's `id_token` for an Identity Assertion JWT authorization grant (ID-JAG) at the org authorization server.
  1. Exchange the ID-JAG for a scoped `access_token` at a custom authorization server.

  This logic is identical for any AI agent. See [Add Okta authentication to your AI agent](#add-okta-authentication-to-your-ai-agent).

* Platform integration (Tines-specific). A caller sends the user's `id_token` to a Webhook action in the story, in a request header. A Run Script action reads the header, performs the token exchange, and returns the access token in its event. Later actions in the story read the access token from that event and attach it to their calls. See [Integrate the token exchange into your Tines story](#integrate-the-token-exchange-into-your-tines-story).

<!-- TODO: Replace this text-based diagram with an image.

```text
User
  signs in with Okta -> receives id_token
    |
    v
Caller sends the id_token to the Tines story
  POST <webhook URL>
  X-Okta-Identity-Token: <okta_id_token>
    |
    v
Webhook action
  emits an event with headers.x_okta_identity_token
    |
    v
Run Script action (Python)
  Step 1: id_token  ->  ID-JAG        (Org AS:    /oauth2/v1/token)
  Step 2: ID-JAG    ->  access_token  (Custom AS: /oauth2/{custom-as-id}/v1/token)
    |
    v
HTTP Request action (or another action)
  Authorization: Bearer <access_token>
    |
    v
Okta-protected resource (API or MCP server)
```-->

For the conceptual background on AI agent token exchange, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).

> **Note:** Importing a Tines AI agent into Okta and securing it with token exchange are independent. Importing an AI agent doesn't configure it for the token exchange, and a story that uses the token exchange doesn't have to be imported. This guide uses the import to create the AI agent identity that the token exchange needs.

## Before you begin

The token exchange depends on Okta objects that you configure once per org. Confirm that the following are in place before you build the story. For detailed steps, see [Set up imported AI agent token exchange](/docs/guides/ai-agent-third-party-token-exchange/).

* An OIDC web app integration that signs users in and issues the `id_token` that your AI agent exchanges. Use the Authorization Code grant type and the `openid profile email` scopes. The `id_token` must have an `aud` claim equal to this app's client ID.
* A custom authorization server. Use the built-in `default` server or create one.
* A custom scope on the custom authorization server, such as `xaa:read`.
* The Tines AI agent imported into Okta as an AI agent identity that uses `private_key_jwt` client authentication, with its public key (JWK) registered. Link the OIDC web app, set the custom authorization server, include your custom scope, and activate the AI agent. See [Import your AI agent from Tines](#import-your-ai-agent-from-tines).

  > **Note:** Okta doesn't retain the AI agent's private key. Store it in a Tines credential when it's generated, because it's shown only once.

* An access policy rule on the custom authorization server that enables the JWT bearer grant type (`urn:ietf:params:oauth:grant-type:jwt-bearer`), adds the AI agent as an allowed client, and includes the audience, the custom scope, and a user or group condition.

### Import your AI agent from Tines

Okta can discover and import the AI agents in your Tines tenant. Okta authenticates to Tines with an API key, so no OAuth app setup is needed on the Tines side. Okta imports the AI Agent actions in your tenant, either from all teams or only from the teams that you specify.

You need the tenant owner role in Tines and the super admin role in Okta.

Create an API key in Tines:

1. Sign in to your Tines account with an account admin account.
1. Go to **Settings** > **Access & Security** > **API Keys**, and then click **New**.
1. Select **Tenant owner**.
1. Enter a descriptive name, for example, `okta-ai-agent-import`. Optionally, enter a description.
1. Click **Save**.
1. Copy the token secret and store it in a secrets manager. You can't view the token secret again after you close the dialog.

Add the Tines app to your org:

1. In the Admin Console, go to **Applications** > **Applications and Resources**, and then click **Browse App Catalog**.
1. Search for **Tines**, open the integration, and then click **Add Integration**.

<span style="color: #c0392b;">**TODO:** Document how Okta learns your Tines tenant URL. The engineering notes say the import reads a tenant URL (for example, https://example.tines.com) from a property on the Tines app instance, but the Okta Help Center article for Tines lists only the API key and team IDs as import settings. Confirm where an admin enters the tenant URL and add that step here.</span>

Enable imports for the app:

1. Go to **Directory** > **AI Agent Providers**, and then select your Tines app. If you have multiple Tines app integrations, only configure AI agent imports for one of them.
1. On the **AI Agent Import** tab, select **Enable AI agent imports**.
1. Under **Configuration**, enter the following values:
   * **API key:** The token secret that you generated in Tines
   * **Team IDs:** Optional. Enter one or more Tines team IDs to import AI agents from only those teams. Leave the field empty to import AI agents from all teams.
1. Click **Test API Credentials** to confirm that Okta can reach your Tines tenant.
1. Click **Save configuration**, and then run the import.

For the optional owner, schedule, matching, and preview settings, see [Enable AI agent imports for an app](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-imports-enable.htm). For the Tines-specific steps in the Okta Help Center, see [Configure Tines for AI agent imports](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-tines.htm).

<span style="color: #c0392b;">**TODO:** Confirm with engineering whether customer orgs can see the Tines **AI Agent Import** tab by default. The engineering notes say tinescom isn't in the default list of import-eligible apps (the ai.agents.import.eligible.app.names property), so the tab doesn't appear until Okta adds it. If customers need enablement, add that requirement to What you need or to the troubleshooting table. The Okta Help Center article doesn't mention it. Also confirm the deployment stage (the security review lists it as unknown).</span>

Register the imported AI agent and set up its identity:

1. Go to **Directory** > **AI Agents**, and then register the imported AI agent.
1. On the **User access** tab, link the OIDC web app that signs users in. Either create a new OIDC app linked to this AI agent, or select your existing OIDC app.

   > **Important:** This action permanently links the AI agent to the app. To change the link, delete the AI agent and recreate it. Each app links to one AI agent, and each AI agent links to one app.

1. On the **Client registration** tab, click **Configure** next to **Public/private key**, click **Add public key**, and then click **Generate new key**. Copy the private key and store it in a secrets manager, since Okta shows it only once. Click **Done**.
1. Copy the **Client ID**, which starts with `wlp`, and the public key's **Key ID**. You need them for `AGENT_CLIENT_ID` and `AGENT_KEY_ID`, respectively.
1. On the **Resource connections** tab, click **Add resource connection**. For **Resource type**, select **Authorization server**, and then select your custom authorization server. Under **Scopes**, select **Only allow**, enter your custom scope, for example, `xaa:read`, and then click **Add**.
1. Click **Actions** > **Activate**, and then click **Confirm**.

<span style="color: #c0392b;">**TODO:** Confirm the exact Admin Console labels and step order for registering an imported Tines AI agent, including the label of the button that runs the import and where the User access, Client registration, and Resource connections tabs appear after the import. These steps follow the shared manual-registration procedure in the engineering notes, not a Tines-specific source.</span>

> **Note:** If you create the OIDC app from the AI agent's **User access** tab, the app shares the AI agent's client ID. In that case, the OIDC client ID and `AGENT_CLIENT_ID` are the same `wlp` value. If you select an existing OIDC app, the two values differ, and the `id_token` `aud` claim holds the OIDC app's client ID.

## Collect your configuration values

Tines has no environment variables. You store the secret values as Tines credentials and pass all of the values to the Run Script action as inputs. The first group is the Okta values that the token exchange needs. The second group is specific to Tines.

<AiAgentOktaConfigValues/>

**Tines values (used by the platform integration):**

| Item | Description | Where to find it |
| --- | --- | --- |
| Webhook URL | The URL that callers use to send the `id_token` to your story | Your story > the Webhook action |
| Credential names | Tines credentials that hold `AGENT_CLIENT_ID`, `AGENT_KEY_ID`, and `AGENT_PRIVATE_KEY_JWK`. The examples in this guide use `okta_agent_client_id`, `okta_agent_key_id`, and `okta_agent_private_key_jwk`. | You create these in [Store the AI agent's values as credentials](#store-the-ai-agent-s-values-as-credentials) |

## Add Okta authentication to your AI agent

The token exchange logic has no dependency on Tines. The following module shows the logic as a standalone Python file, which is the reference for the exchange.

> **Note:** A Tines Run Script action runs a single script and has no environment variables, so it can't import `token_exchange.py` or read its configuration from the environment. Skip the steps below that create the file. In [Add the Run Script action](#add-the-run-script-action), you use the same two steps in one script that reads the Okta values from the action's inputs.

<AiAgentTokenExchangeModule/>

## Integrate the token exchange into your Tines story

This section is specific to Tines. Here you store the AI agent's values as credentials, add a Webhook action and a Run Script action to your story, and then call an Okta-protected resource with the access token.

### Choose the integration point

Run the token exchange in a Run Script action that follows a Webhook action. The Webhook action receives the request and exposes its headers. The Run Script action runs Python with outbound HTTPS and access to credentials, so the whole exchange fits in one action.

Follow these rules when you design the story:

* **Send the `id_token` in a header.** A header keeps the `id_token` out of the request body, which Tines retains in events. If the caller can't set a header, you can send the `id_token` in the request body and read it as `body.id_token`, but that increases the risk that Tines retains the token.
* **Use a Run Script action for the exchange.** Signing the `client_assertion` JWT requires code, and Tines has no built-in action that signs a JWT. The AI Agent action runs a model and doesn't expose the inbound request headers.
* **Don't forward a platform token.** Tines doesn't send a platform-issued user token with a webhook request. Only the Okta `id_token` matters.

### Store the AI agent's values as credentials

Store the AI agent's client ID, key ID, and private key in Tines credentials. Never paste them into a script, or into an input as a literal value.

1. In Tines, click your team name in the upper-left menu, and then select **Credentials**.
1. Click **New**, and then select the **Text** credential type.
1. Create one credential for each of the following:

   | Credential name | Value |
   | --- | --- |
   | `okta_agent_client_id` | The AI agent's client ID, which starts with `wlp` |
   | `okta_agent_key_id` | The key ID of the AI agent's public key |
   | `okta_agent_private_key_jwk` | The private key as a single-line JWK, with no surrounding quotes |

1. For each credential, add `run-script` to the domain restrictions so that the Run Script action can read it.

<span style="color: #c0392b;">**TODO:** Confirm the exact labels on the Text credential form, including the name of the domain restrictions field and how you add run-script to it. The Tines Credentials overview page doesn't show the form fields, and the engineering notes describe the restriction without the field label.</span>

### Add the Webhook action

1. In your story, add a **Webhook** action and name it `webhook`.
1. Leave **include_headers** on, which is the default. Make sure that the action accepts `POST` requests.
1. Copy the Webhook URL. Callers send the `id_token` to this URL.

Tines lowercases header names in the emitted event and replaces dashes with underscores. A request header named `X-Okta-Identity-Token` arrives as `headers.x_okta_identity_token`.

> **Important:** By default, anyone who has the Webhook URL can send a request to it, because the URL contains a secret. The exchange proves that the `id_token` is valid, not that the caller is the user it names. Restrict who can call the Webhook action, for example by changing its access control so that callers must present a Tines API key. See [Webhook action](https://www.tines.com/stories/docs/actions/types/webhook/).

<span style="color: #c0392b;">**TODO:** Engineering flagged an open security item. The story doesn't verify that the id_token subject is the caller, so anyone who can reach the webhook can present any valid id_token. Decide with engineering whether this guide adds a check or documents the webhook access control as a prerequisite before production use.</span>

### Add the Run Script action

Connect a **Run Script** action to the Webhook action and name it `okta_xaa`. Configure it as follows:

* **Runtime:** `python3.13`, which is the only supported Python runtime.
* **Networking:** `Standard`. If your tenant restricts outbound traffic, use `Dedicated`, and then allow the dedicated IP addresses in your network. You find them at `https://<your-tenant>.tines.com/info` under `lambda_egress_ips`. The `No networking` setting blocks the Okta token endpoints.
* **Timeout:** The default is 10 seconds and the maximum is 110 seconds. The first run installs the requirements, which can take longer, so raise the timeout if the script times out.
* **Requirements:** Add the following, one per line:

  ```text
  PyJWT>=2.8.0
  cryptography>=42.0.0
  requests>=2.31.0
  ```

* **Inputs:** Add the following keys. A pill is a reference to data from another action or from a credential.

  | Input key | Value |
  | --- | --- |
  | `id_token` | `<<webhook.headers.x_okta_identity_token>>` |
  | `okta_domain` | Your Okta domain, for example, `example.okta.com`, with no `https://` prefix |
  | `custom_as_id` | Your custom authorization server ID, for example, `default` |
  | `scope` | Your custom scope, for example, `xaa:read` |
  | `agent_client_id` | `<<CREDENTIAL.okta_agent_client_id>>` |
  | `agent_key_id` | `<<CREDENTIAL.okta_agent_key_id>>` |
  | `agent_private_key_jwk` | `<<CREDENTIAL.okta_agent_private_key_jwk>>` |

* **Script:** Paste the following script. It performs the same two steps as the token exchange module and reads its values from the inputs.

  ```python
  import time
  import uuid

  import jwt
  import requests
  from jwt.algorithms import RSAAlgorithm

  _FORM_HEADERS = {"Content-Type": "application/x-www-form-urlencoded"}


  def _client_assertion(client_id, key_id, private_jwk, audience):
      """Sign a short-lived private_key_jwt that proves the AI agent's identity to Okta."""
      now = int(time.time())
      claims = {
          "iss": client_id,
          "sub": client_id,
          "aud": audience,
          "iat": now,
          "exp": now + 300,
          "jti": str(uuid.uuid4()),
      }
      private_key = RSAAlgorithm.from_jwk(private_jwk)
      return jwt.encode(claims, private_key, algorithm="RS256", headers={"kid": key_id})


  def main(input):
      id_token = input.get("id_token")
      if not id_token:
          return {"ok": False, "reason": "No id_token header on the request."}

      domain = input["okta_domain"]
      custom_as_id = input["custom_as_id"]
      scope = input["scope"]
      client_id = input["agent_client_id"]
      key_id = input["agent_key_id"]
      private_jwk = input["agent_private_key_jwk"]

      # Step 1: exchange the id_token for an ID-JAG at the org authorization server.
      org_token_url = f"https://{domain}/oauth2/v1/token"
      step1 = requests.post(
          org_token_url,
          headers=_FORM_HEADERS,
          timeout=15,
          data={
              "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
              "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
              "client_assertion": _client_assertion(client_id, key_id, private_jwk, org_token_url),
              "subject_token": id_token,
              "subject_token_type": "urn:ietf:params:oauth:token-type:id_token",
              "requested_token_type": "urn:ietf:params:oauth:token-type:id-jag",
              "scope": scope,
              "audience": f"https://{domain}/oauth2/{custom_as_id}",
          },
      )
      step1.raise_for_status()
      id_jag = step1.json()["access_token"]

      # Step 2: exchange the ID-JAG for an access token at the custom authorization server.
      custom_as_token_url = f"https://{domain}/oauth2/{custom_as_id}/v1/token"
      step2 = requests.post(
          custom_as_token_url,
          headers=_FORM_HEADERS,
          timeout=15,
          data={
              "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
              "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
              "client_assertion": _client_assertion(client_id, key_id, private_jwk, custom_as_token_url),
              "assertion": id_jag,
          },
      )
      step2.raise_for_status()
      access_token = step2.json()["access_token"]

      # Return the token for later actions, and a prefix that is safe to read in logs.
      return {"ok": True, "access_token": access_token, "access_token_prefix": access_token[:20]}
  ```

> **Note:** Exchange the token on each run instead of saving it. The access token is valid for 24 hours while the ID-JAG is valid for only five minutes, so a saved user token carries far more risk than the exchange costs. Don't write the access token to a Tines resource or to a datastore. Steps 1 and 2 are also one retryable unit. If step 2 fails, repeat both steps from the `id_token`, because the ID-JAG may have expired.

> **Important:** The Run Script event contains the full access token, and Tines keeps events. Return only what later actions need, and limit who can view the story's events.

<span style="color: #c0392b;">**TODO:** The engineering notes verified a Webhook action and a Run Script action with this exchange on a live Tines tenant. This guide's script differs slightly: it takes the custom authorization server ID, scope, and a bare Okta domain as inputs, and it uses shared input names. Confirm with a live run that the script as written works.</span>

### Call an Okta-protected resource

Add an **HTTP Request** action after the Run Script action, and set its `Authorization` header to the access token from the Run Script event:

```text
URL:    https://api.example.com/resource
Header: Authorization: Bearer <<okta_xaa.access_token>>
```

Replace the URL with an API that trusts your custom authorization server.

> **Important:** The access token's audience is your custom authorization server, for example, `api://default`. The Okta Management API (`/api/v1/*`) doesn't accept it and returns a `400` error. This isn't a token exchange failure.

<span style="color: #c0392b;">**TODO:** Engineering hasn't confirmed that the AI Agent action can read the access token from the Run Script event through one of its tools (an HTTP-based custom tool or an MCP tool). Confirm this and add the steps, because the AI Agent action is the imported AI agent that this guide secures.</span>

## Verify the configuration

<AiAgentVerifyConfiguration/>

## Obtain a test ID token

<AiAgentObtainTestIdToken/>

## Run an end-to-end invocation

Send a request to the Webhook URL with your test ID token in the `X-Okta-Identity-Token` header:

```bash
curl -s -X POST "https://<your-tenant>.tines.com/webhook/<path>/<secret>" \
  -H "X-Okta-Identity-Token: $ID_TOKEN"
```

A standard webhook returns `201` with `{"status":"ok"}`. That response only confirms that Tines received the request and started the story. It isn't the output of the Run Script action. To confirm that the exchange ran, open the story in Tines, go to **Events**, and select the event from the `okta_xaa` action:

```json
{
  "ok": true,
  "access_token_prefix": "eyJraWQiOiJqX3JSLVhz"
}
```

The event also contains the `access_token`, which this sample omits. A decoded access token shows the user as the subject and the AI agent as the client:

```text
sub          jessie.smith@example.com   <- the user is the subject
cid          wlp...                     <- the AI agent is the client
scp          ["xaa:read"]
act          {sub: "wlp...", sub_profile: "ai_agent web_app"}
```

<span style="color: #c0392b;">**TODO:** The prefix values and the decoded claims above are illustrative. Replace the sample with the output of a live run. To return the Run Script result in the HTTP response instead of an acknowledgment, the story needs a response-enabled webhook. Confirm whether this guide documents that option.</span>

## Troubleshoot your integration

The following errors are specific to the Tines integration:

| Error | Root cause | Fix |
| --- | --- | --- |
| The `id_token` input is empty, or the script returns `No id_token header on the request.` | Tines lowercases header names and replaces dashes with underscores. The input points at the original header name | Use `<<webhook.headers.x_okta_identity_token>>` as the `id_token` input |
| Both token requests fail with a connection error | The Run Script **Networking** setting is `No networking`, or your tenant restricts outbound traffic and blocks your Okta domain | Set **Networking** to `Standard` or `Dedicated`. If your tenant restricts outbound traffic, allow your Okta domain |
| `ModuleNotFoundError` for `jwt` or `cryptography` | The Run Script **Requirements** don't list the packages | Add `PyJWT`, `cryptography`, and `requests` to the **Requirements** |
| The Run Script action can't read a credential | The credential's domain restrictions don't include `run-script` | Edit the credential and add `run-script` to its domain restrictions |
| `Key is not valid JSON` | The private key credential has surrounding quotes or escaped characters | Store the raw single-line JWK as a Text credential, with no outer quotes |
| The script times out | The default Run Script timeout is 10 seconds, and the first run installs the requirements | Raise the timeout. The maximum is 110 seconds |
| The `id_token` appears in the story's events | You sent the `id_token` in the request body instead of a header | Send the `id_token` in the `X-Okta-Identity-Token` header |
| **Test API Credentials** fails | The Tines API key is wrong, or a team ID doesn't exist | Verify the API key. If you entered team IDs, correct them or leave the field empty |
| A call to the Okta Management API returns `400` with the delegated token | The access token's audience is your custom authorization server, and the Okta Management API doesn't accept it | Call an API that trusts your custom authorization server |

<span style="color: #c0392b;">**TODO:** Confirm the Tines-specific errors with engineering after a live run of this guide's script. The rows above come from the engineering notes and the Tines documentation.</span>

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
* [Configure Tines for AI agent imports](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-tines.htm)
* [Enable AI agent imports for an app](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-imports-enable.htm)
* [Tines AI Agent action](https://www.tines.com/stories/docs/actions/types/ai-agent/)
* [Tines Webhook action](https://www.tines.com/stories/docs/actions/types/webhook/)
* [Tines Run Script action](https://www.tines.com/stories/docs/actions/tools/run-script/)
