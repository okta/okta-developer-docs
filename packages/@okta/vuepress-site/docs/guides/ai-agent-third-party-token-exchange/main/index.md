---
title: Set up third-party AI Agent token exchange
excerpt: Learn how to configure token exchange for third-party AI agents to securely access protected resources.
layout: Guides
---
<ApiLifecycle access="ie" />

Okta's AI Agents feature secures third-party AI agents with delegated user identity. When a user authenticates with Okta, your app exchanges the user's identity token for a scoped access token. The AI agent can then call Okta-protected APIs on the user's behalf.

In this guide, learn how to configure token exchange for third-party AI agents.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. See your Okta account team to enable the feature.

---

#### Learning outcomes

- Understand Okta's two-step cross app access (XAA) token exchange flow for AI agents.
- Understand how to set up the token exchange flow.
- Test the third-party token exchange flow.

#### What you need

- An Okta org that's subscribed to Okta for AI Agents.
- An Okta user account with the super admin role.

---

## Overview

Okta's token exchange uses two API calls. The user's ID token is exchanged for an ID-JAG at the org authorization server. The ID-JAG is then exchanged for a scoped access token at the custom authorization server. The calling app passes that token to the AI agent.

For a diagram and step-by-step description of this flow, see [Token Exchange flow](/docs/guides/ai-agent-token-exchange/) in Set up AI agent token exchange.

>**Note:** No gateway or proxy is involved. The calling app owns the full token exchange. The AI agent receives a ready-to-use access token.

The machine identity that signs token exchange requests is the third-party AI Agent imported in the Admin Console. The AI Agent authenticates both steps of the exchange using a private key JWT.

### Supported platforms

The following third-party AI Agent platforms are supported:

| Provider | Platform | Guide |
| --- | --- | --- |
| Amazon Web Services | AWS Bedrock Classic Agents | [AWS Bedrock Classic Agents guide](/docs/guides/ai-agent-secure-aws-bedrock/) |
| Amazon Web Services | AWS Bedrock AgentCore | [AWS Bedrock AgentCore guide](/docs/guides/ai-agent-secure-amazon-bedrock/) |
| Microsoft | Azure AI Foundry | [Azure AI Foundry guide](/docs/guides/ai-agent-secure-azure/) |

## Setting up the third-party token flow

To configure token exchange for third-party AI agents, you must complete the following configurations:

- Create an Okta OIDC web app integration to handle user sign-on and issue ID tokens.
- Add a custom scope for your custom authorization server.
- Import a third-party AI Agent with RSA key-pair authentication.
- Configure the access policy to allow the JWT Bearer grant type.
- Complete the token exchange flow with Okta APIs.

After these configurations, you can create a test app to demonstrate this flow, see [Create an app to test the token exchange flow](#create-an-app-to-test-the-token-exchange-flow).

### Create an OIDC web app integration

An app integration represents your app in your Okta org. Use it to configure how your app connects with Okta services.

1. Open the Admin Console for your org.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Web Application** as the **Application type**, then click **Next**.
1. Enter an **App integration name**. For example, "AI third-party token exchange."
1. Set the following values.
   1. **Grant types**: Authorization Code
   [[style="list-style-type:lower-alpha"]]
   1. **Sign-in redirect URIs**: Enter `http://localhost:5000/callback`

1. Select **Allow everyone in your organization to access** for **Controlled access**.
1. Click **Save** to create the app integration.

The configuration page for the new app integration appears.

Make a note of the client ID and client secret. Both are in the configuration pane for the app integration that you've created:

- **Client ID**: Found on the **General** tab in the **Client Credentials** section.

- **Client Secret**: Found on the **General** tab in the **Client Credentials** section.

> **Note:** For a complete guide to all the options not explained in this guide, see [Create OIDC app integrations](/docs/guides/create-an-app-integration/openidconnect/main/).

### Add a custom scope for your custom authorization server

Your custom authorization server requires a custom scope for the third-party AI Agent token exchange. You can use the default custom authorization server or create your own. See [Create an authorization server](/docs/guides/customize-authz-server/main/#about-the-custom-authorization-server).

>**Note**: System scopes (`openid`, `profile`, `email`) are stripped during the ID-JAG exchange and cause an `invalid_scope` error. Use a custom scope.

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of your authorization server, and then select **Scopes**.
1. Select **Scopes** and then **Add Scope**.
1. Enter a **Name**, for example, `xaa:read`.
1. Optional. Enter a **Display phrase**, for example, "Cross App Access (XAA read-only scope)."
1. Optional. Enter a **Description**, for example, "This scope allows third-party AI Agent token exchange."
1. Click **Save**.

See [Create Scopes](/docs/guides/customize-authz-server/main/#create-scopes).

### Import your AI Agent

The AI Agent is the machine identity that your calling application uses to sign token exchange requests. Import your third-party AI Agent following steps in [AI Agent Imports](https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-imports).

The AI Agent identity is distinct from the OIDC web app integration, which signs users in and issues the ID token. The AI Agent identity authenticates both steps of the exchange.

<!-- See Barbara's docs here: https://preview-4797--regal-biscotti-8ee5d8.netlify.app/oie/en-us/content/topics/ai-agents/ai-agent-imports.htm-->

In a real integration, you import the third-party agent you've already built, for example, a live Amazon Bedrock or Azure AI Foundry agent. That import generates the client ID, key ID, and private key that your agent's integration code uses to sign token exchange requests, as shown in the platform-specific guides listed under [Supported platforms](#supported-platforms).

This guide isn't tied to a specific platform. To walk through the token exchange flow end-to-end, manually register a stand-in AI Agent identity instead:

1. In the Admin Console, go to **Directory** > **AI agents**.
1. Click **Register AI agent** > **Register manually**.
1. Under **Profile**, add a name and description for your AI Agent, for example, "third-party AI Agent."
1. Click **Register**.
1. Under **Owners**, add owners to the AI Agent. Add at least two owners. Click **Save**.
1. Select your AI Agent from the list of AI Agents, and click **Credentials**. Make a note of the AI agent ID.
1. Under **Client Authentication**, generate an RSA key-pair. Click **Add public key** and
**Generate new key** or use your own public key. Click **Done**.
1. From **Actions**, select **Activate**.
1. Click **Delegations**. Under **User sign-on**, click **Add caller**. From **Application**, select your previously created OIDC app integration, for example, "AI third-party token exchange." Click **Add caller**.
1. Under **Non-human identity**, click **Configure**. From **Authorization server**, select your custom authorization server, in this example, use `default`.
1. Add a value for the **Audience/resource URL**. In this test example, use `https://example.com`. Click **Save**.
1. Click **Resource connections**, and then **Add resource connection**. Select the **Authorization server** resource type, and then from **Select Authorization server**, select your custom authorization server, in this example, use `default`. From **The following OAuth scopes**, select the custom scope you added previously, for example, `xaa:read`. Click **Add**.

>**Note:** Make a note of the AI Agent ID. For example, `wlp9k6....GKZ5hAE0g7`.

### Configure the access policy

After you create the AI Agent, configure your custom authorization server's access policy to authenticate your AI Agent.

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of an authorization server (`default` if you're using the default custom authorization server).
1. Select **Access Policies**, and then edit an existing policy. If you need to add a policy, see [Create access policies](/docs/guides/customize-authz-server/main/#create-access-policies).
1. Edit the default rule or create a rule, see [Create Rules for each Access Policy](/docs/guides/customize-authz-server/main/#create-rules-for-each-access-policy).
1. Enable grant type **JWT Bearer**.
1. Save the rule and policy.

## Complete the token exchange flow

Your app makes two API calls directly to Okta's token endpoints. No Okta SDK is required. The flow comprises the following two steps:

1. Exchange the `id_token` for ID-JAG
1. Exchange the ID-JAG for an `access_token`

> **Note:** These two calls implement the **Authorization server** resource type described generically in [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/). The request and response shapes are the same; if you change scopes, grant types, or parameters here, check that guide too so the two stay in sync.

To test this flow, use the following `curl` calls with your configured data.

Use the [Create an app to test the token exchange flow](#create-an-app-to-test-the-token-exchange-flow) to demonstrate the full token exchange flow and display the ID token, ID_JAG token, and access token.

#### Exchange the ID token for ID-JAG

Call the org authorization server's `/token` endpoint. The `client_assertion` is signed with the agent's RSA private key.

Ensure you update the following values in this call: `{yourOktaDomain}`, `{signed JWT}`, `{user id_token}`, and the `audience` URL. See the following parameter table.

To generate an ID token, see [Create an app to obtain a test ID token](#create-an-app-to-obtain-a-test-id-token).

##### Request

```bash
curl -X POST https://{yourOktaDomain}/oauth2/v1/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
  --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  --data-urlencode "client_assertion={signed JWT}" \
  --data-urlencode "subject_token={user id_token}" \
  --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:id_token" \
  --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:id-jag" \
  --data-urlencode "scope=xaa:read" \
  --data-urlencode "audience=https://example.okta.com/oauth2/default"
```

| Parameter | Description and value |
| --- | --- |
| grant_type | Standard OAuth 2.0 token exchange grant. The value must be `urn:ietf:params:oauth:grant-type:token-exchange`. |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| client_assertion | A signed JWT used for client authentication. Sign the JWT using the key created during the AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
| subject_token_type | The value must be `urn:ietf:params:oauth:token-type:id_token`. |
| subject_token | A valid ID token issued to the resource app associated with the AI agent |
| requested_token_type | The value must be `urn:ietf:params:oauth:token-type:id-jag`. |
| scope | A list of scopes at the resource app being requested. This defines the permissions for the final access token.  Use `xaa:read` |
| audience | The issuer URL of the resource app's authorization server. |

##### Response

A successful response returns an `id_jag` token. Pass this token to the next step:

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
 "issued_token_type": "urn:ietf:params:oauth:token-type:id-jag",
 "access_token": "eyJhbGciOiJIUzI1NiIsI...",
 "token_type": "N_A",
 "expires_in": 300
}
```

#### Exchange the ID-JAG for an access token

Call the custom authorization server's token endpoint. The `client_assertion` audience is the custom authorization server token URL.

Ensure you update the following values in this call: `{yourOktaDomain}`, `{custom-as-id}` (`default` in this example), `{signed JWT}`, and the `{ID_JAG}` token. See the following parameter table.

##### Request

```bash
curl -X POST https://{your-okta-domain}/oauth2/{custom-as-id}/v1/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
  --data-urlencode "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
  --data-urlencode "client_assertion={signed-jwt}" \
  --data-urlencode "assertion={id_jag}"
```

| Parameter | Description and value |
| --- | --- |
| grant_type | The value must be `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| assertion | The ID-JAG received in the exchange token ID for resource token [response](#response). |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| client_assertion | A signed JWT used for client authentication. Sign the JWT using the key created during the AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |

##### Response

The response contains the access token that the AI agent uses to access the resource server.

``` http
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJoZnpMS3...tdBbjhHcIXF_OQCsUdkuPXQTaAeq8fQ",
    "scope": "xaa:read"
}
```

## Set up a Python environment

This project demonstrates how to set up and run standalone Python scripts using the `uv` package manager.

### Install uv

Install `uv` using the official installer:

```bash
brew install uv
```

For more installation options (Windows, macOS without curl, and so on), see the [uv installation guide](https://docs.astral.sh/uv/getting-started/installation/).

After installation, verify it works:

```bash
uv --version
```

### Set up the project

Go to the project directory:

```bash
cd /yourProject
```

Initialize the project with `uv init`:

```bash
uv init
```

After initialization, sync the environment:

```bash
uv sync
```

Install the required dependencies:

```bash
uv add python-dotenv flask requests "pyjwt[crypto]"
```

This adds the packages needed by the demo scripts.

## Create an app to obtain a test ID token

This demo script obtains an ID token for testing. See [Exchange the ID token for ID-JAG](#exchange-the-id-token-for-id-jag).

### Create your environment file

Create a `.env` file. The demo script references the values in this file. Include the following details from your OIDC app integration. See [Create an OIDC app integration](#create-an-oidc-web-app-integration) for these values. Add:

```bash
OKTA_DOMAIN=https://{yourOktaDomain}
OIDC_CLIENT_ID={client_id}
OIDC_CLIENT_SECRET={client_secret}
```

For example:

```bash
# OIDC config for oidc.id-token.py
# OKTA_DOMAIN must include https:// and have NO trailing slash
OKTA_DOMAIN=https://example.okta.com
OIDC_CLIENT_ID=0oazte....Vv6aZ1d7
OIDC_CLIENT_SECRET=rPgK0mZi6aqpmRD....
```

### Create the token demo file

Create a `scripts` folder at the root level of your project, and create a file name, for example, `oidc.id-token.py`. Copy the following Python code into the file and save.

```python
# oidc.id-token.py
import os, secrets
from flask import Flask, redirect, request, session
import requests
from dotenv import load_dotenv
load_dotenv()

OKTA_DOMAIN        = os.environ["OKTA_DOMAIN"]
OIDC_CLIENT_ID     = os.environ["OIDC_CLIENT_ID"]
OIDC_CLIENT_SECRET = os.environ["OIDC_CLIENT_SECRET"]
REDIRECT_URI       = "http://localhost:5000/callback"

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", secrets.token_hex(32))

@app.route("/")
def index():
    state = secrets.token_urlsafe(16)
    session["oauth_state"] = state
    return redirect(
        f"{OKTA_DOMAIN}/oauth2/v1/authorize"
        f"?response_type=code&client_id={OIDC_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}&scope=openid+profile+email"
        f"&state={state}"
    )

@app.route("/callback")
def callback():
    # Surface any error Okta sent back instead of crashing on a missing code.
    if "error" in request.args:
        return (
            f"<pre>error: {request.args.get('error')}\n"
            f"description: {request.args.get('error_description')}</pre>",
            400,
        )

    # Validate state to protect against CSRF.
    expected_state = session.pop("oauth_state", None)
    if not expected_state or request.args.get("state") != expected_state:
        return "<pre>error: state mismatch</pre>", 400

    code = request.args.get("code")
    if not code:
        return "<pre>error: no authorization code returned</pre>", 400

    resp = requests.post(f"{OKTA_DOMAIN}/oauth2/v1/token", data={
        "grant_type":    "authorization_code",
        "code":          code,
        "redirect_uri":  REDIRECT_URI,
        "client_id":     OIDC_CLIENT_ID,
        "client_secret": OIDC_CLIENT_SECRET,
    })
    if not resp.ok:
        return f"<pre>token endpoint error ({resp.status_code}):\n{resp.text}</pre>", 400

    id_token = resp.json().get("id_token", "")
    return f"""\
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Okta secures AI</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f5f6f8;
      color: #1d1d21;
      margin: 0;
      padding: 2.5rem;
    }}
    h1 {{
      font-size: 1.6rem;
      font-weight: 600;
      color: #00297a;
      margin: 0 0 1.5rem;
    }}
    table {{
      border-collapse: collapse;
      width: 100%;
      max-width: 960px;
      background: #fff;
      border: 1px solid #d7dae0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }}
    th, td {{
      text-align: left;
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #e6e8ec;
      vertical-align: top;
    }}
    th {{
      background: #00297a;
      color: #fff;
      font-weight: 600;
    }}
    tr:last-child td {{
      border-bottom: none;
    }}
    td.token-name {{
      font-weight: 600;
      white-space: nowrap;
      width: 1%;
    }}
    td.token-value {{
      font-family: "SFMono-Regular", Menlo, Consolas, monospace;
      font-size: 0.85rem;
      word-break: break-all;
    }}
  </style>
</head>
<body>
  <h1>Okta secures AI</h1>
  <table>
    <thead>
      <tr><th>Token</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr>
        <td class="token-name">ID token</td>
        <td class="token-value">{id_token}</td>
      </tr>
    </tbody>
  </table>
</body>
</html>"""

if __name__ == "__main__":
    app.run(port=5000)
```

### Run the demo file

Run the demo file:

```bash
uv run scripts/oidc-id-token.py
```

Then open `http://localhost:5000/` in your browser to start the sign-in flow. After you enter your Okta credentials, the ID token appears on the rendered page. You can use this ID token to test the token exchange flow API calls in [Exchange the ID token for ID-JAG](#exchange-the-id-token-for-id-jag).

To see the full flow, create and run the following demo script.

## Create an app to test the token exchange flow

Use the following Python Flask app to test the token exchange flow. It obtains an ID token and then calls the two-step authentication process as documented in [Complete the token exchange flow](#complete-the-token-exchange-flow).

### Create your environment file

Create an `.env` file (or modify the `.env` from the previous section). The demo script will reference the values in this file. Include the following details from the remainder of your token exchange setup:

```bash
OKTA_DOMAIN=https://{yourOktaDomain}
OIDC_CLIENT_ID={client_id}
OIDC_CLIENT_SECRET={client_secret}
CUSTOM_AS={yourCustomAS}
AGENT_CLIENT_ID={yourAgentID}
AGENT_KEY_ID={yourAgentKID}
AGENT_PRIVATE_KEY_JWK={yourAgentPrivateKey}
```

For example:

```bash
# OIDC config for token-exchange-demo.py`
# OKTA_DOMAIN must include https:// and have NO trailing slash
OKTA_DOMAIN=https://example.okta.com
OIDC_CLIENT_ID=0oazte....Vv6aZ1d7
OIDC_CLIENT_SECRET=rPgK0mZi6aqpmRD....

# --- Token exchange (agent on behalf of user), used by token-exchange-demo.py` ---
# Custom authorization server ID (for example,  "default" or an "ausXXXX..." id)
CUSTOM_AS=default
# The agent's OAuth client id
AGENT_CLIENT_ID=wlpzx5jq6....zGJY1d7
# The "kid" of the agent's signing key (must match a key in the client's JWKS)
AGENT_KEY_ID=98cfd0b41b99b68....fb8868188d2f5
# The agent's PRIVATE key as a single-line JSON JWK, e.g. {"kty":"RSA","n":"...","e":"AQAB","d":"...","p":"...","q":"...","kid":"..."}
AGENT_PRIVATE_KEY_JWK={"alg":"RS256","d":"QtPaeAww4ykVlxafEqZ7A......}
```

### Create the demo file

Create a `scripts` folder at the root level of your project, and create a file name, for example, `token-exchange-demo.py`. Copy the following Python code into the file and save.

```python
# token_demo.py
import os, json, time, uuid, secrets
import jwt
import requests
from flask import Flask, redirect, request, session
from dotenv import load_dotenv

load_dotenv()

# --- OIDC (user login) ---
OKTA_DOMAIN        = os.environ["OKTA_DOMAIN"]
OIDC_CLIENT_ID     = os.environ["OIDC_CLIENT_ID"]
OIDC_CLIENT_SECRET = os.environ["OIDC_CLIENT_SECRET"]
REDIRECT_URI       = "http://localhost:5000/callback"

# --- Token exchange (agent on behalf of user) ---
CUSTOM_AS             = os.environ["CUSTOM_AS"]
SCOPE                 = os.environ.get("SCOPE", "xaa:read")
AGENT_CLIENT_ID       = os.environ["AGENT_CLIENT_ID"]
AGENT_KEY_ID          = os.environ["AGENT_KEY_ID"]
AGENT_PRIVATE_KEY_JWK = json.loads(os.environ["AGENT_PRIVATE_KEY_JWK"])
# PyJWT can't sign with a raw JWK dict; convert it to a key object once.
AGENT_SIGNING_KEY = jwt.PyJWK.from_dict(AGENT_PRIVATE_KEY_JWK).key


def build_client_assertion(audience: str) -> str:
    now = int(time.time())
    return jwt.encode(
        {
            "iss": AGENT_CLIENT_ID,
            "sub": AGENT_CLIENT_ID,
            "aud": audience,
            "iat": now,
            "exp": now + 300,
            "jti": str(uuid.uuid4()),
        },
        AGENT_SIGNING_KEY,
        algorithm="RS256",
        headers={"kid": AGENT_KEY_ID},
    )


def get_id_jag(id_token: str) -> str:
    org_token_url     = f"{OKTA_DOMAIN}/oauth2/v1/token"
    custom_as_issuer  = f"{OKTA_DOMAIN}/oauth2/{CUSTOM_AS}"   # audience = AS issuer, not its token endpoint
    resp = requests.post(org_token_url, data={
        "grant_type":            "urn:ietf:params:oauth:grant-type:token-exchange",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(org_token_url),
        "subject_token":         id_token,
        "subject_token_type":    "urn:ietf:params:oauth:token-type:id_token",
        "requested_token_type":  "urn:ietf:params:oauth:token-type:id-jag",
        "scope":                 SCOPE,
        "audience":              custom_as_issuer,
    })
    if not resp.ok:
        raise RuntimeError(f"id-jag exchange failed ({resp.status_code}) at {org_token_url}:\n{resp.text}")
    return resp.json()["access_token"]


def get_access_token(id_jag: str) -> str:
    custom_as_token_url = f"{OKTA_DOMAIN}/oauth2/{CUSTOM_AS}/v1/token"
    resp = requests.post(custom_as_token_url, data={
        "grant_type":            "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(custom_as_token_url),
        "assertion":             id_jag,
    })
    if not resp.ok:
        raise RuntimeError(f"access-token exchange failed ({resp.status_code}) at {custom_as_token_url}:\n{resp.text}")
    return resp.json()["access_token"]


app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", secrets.token_hex(32))


@app.route("/")
def index():
    state = secrets.token_urlsafe(16)
    session["oauth_state"] = state
    return redirect(
        f"{OKTA_DOMAIN}/oauth2/v1/authorize"
        f"?response_type=code&client_id={OIDC_CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}&scope=openid+profile+email"
        f"&state={state}"
    )


@app.route("/callback")
def callback():
    # Surface any error Okta sent back instead of crashing on a missing code.
    if "error" in request.args:
        return (
            f"<pre>error: {request.args.get('error')}\n"
            f"description: {request.args.get('error_description')}</pre>",
            400,
        )

    # Validate state to protect against CSRF.
    expected_state = session.pop("oauth_state", None)
    if not expected_state or request.args.get("state") != expected_state:
        return "<pre>error: state mismatch</pre>", 400

    code = request.args.get("code")
    if not code:
        return "<pre>error: no authorization code returned</pre>", 400

    resp = requests.post(f"{OKTA_DOMAIN}/oauth2/v1/token", data={
        "grant_type":    "authorization_code",
        "code":          code,
        "redirect_uri":  REDIRECT_URI,
        "client_id":     OIDC_CLIENT_ID,
        "client_secret": OIDC_CLIENT_SECRET,
    })
    resp.raise_for_status()
    id_token = resp.json()["id_token"]

    id_jag = get_id_jag(id_token)
    access_token = get_access_token(id_jag)

    return f"""\
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Okta secures AI</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f5f6f8;
      color: #1d1d21;
      margin: 0;
      padding: 2.5rem;
    }}
    h1 {{
      font-size: 1.6rem;
      font-weight: 600;
      color: #00297a;
      margin: 0 0 1.5rem;
    }}
    table {{
      border-collapse: collapse;
      width: 100%;
      max-width: 960px;
      background: #fff;
      border: 1px solid #d7dae0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }}
    th, td {{
      text-align: left;
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #e6e8ec;
      vertical-align: top;
    }}
    th {{
      background: #00297a;
      color: #fff;
      font-weight: 600;
    }}
    tr:last-child td {{
      border-bottom: none;
    }}
    td.token-name {{
      font-weight: 600;
      white-space: nowrap;
      width: 1%;
    }}
    td.token-value {{
      font-family: "SFMono-Regular", Menlo, Consolas, monospace;
      font-size: 0.85rem;
      word-break: break-all;
    }}
  </style>
</head>
<body>
  <h1>Okta secures AI</h1>
  <table>
    <thead>
      <tr><th>Token</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr>
        <td class="token-name">ID token</td>
        <td class="token-value">{id_token}</td>
      </tr>
      <tr>
        <td class="token-name">ID-JAG</td>
        <td class="token-value">{id_jag}</td>
      </tr>
      <tr>
        <td class="token-name">Access token</td>
        <td class="token-value">{access_token}</td>
      </tr>
    </tbody>
  </table>
</body>
</html>"""


if __name__ == "__main__":
    app.run(port=5000)

```

### Run the demo

> **Note:** This demo script plays both roles shown in the [Token Exchange flow](/docs/guides/ai-agent-token-exchange/) diagram. It signs the user in as the web app that issues the ID token, and then acts as the AI Agent, using the agent's private key to perform both steps of the token exchange. In a production integration, these are typically separate components.

Run the demo file:

```bash
uv run scripts/token-exchange-demo.py
```

Then open `http://localhost:5000/` in your browser to start the sign-in flow. After you enter your Okta credentials, the full flow completes and the following tokens appear on the rendered page: ID token, ID-JAG token, and access token. See [Complete the token exchange flow](#complete-the-token-exchange-flow).

## Troubleshooting

The following errors come from the Okta token exchange module:

| Error | Root cause | Fix |
| --- | --- | --- |
| `invalid_scope: openid not allowed` | System scopes (`openid`/`profile`/`email`) are stripped in the ID-JAG flow | Use a custom scope such as `xaa:read` on the custom AS and the managed connection |
| `invalid_client: JWKSet not configured` | The public key isn't registered on the AI Agent | Register the public JWK at **Directory** > **AI Agents** > *(agent)* > **Credentials** |
| `invalid_grant` / `invalid_token` on Step 1 | The user's `id_token` is expired or was issued by a different OIDC app than the one linked to the agent | Complete a fresh sign-in; confirm the `aud` claim equals the linked OIDC app's client ID |
| `invalid_client: kid is invalid` | The `kid` in the signing code doesn't match the registered key | Copy the `kid` from the agent's **Credentials** into `AGENT_KEY_ID` |
| `access_denied: no_matching_policy` | The custom AS access policy is missing the JWT Bearer grant | In the custom AS access policy rule, enable the JWT Bearer grant |
| `Only service apps can use client_credentials` | Wrong client type at the org AS | Only an Okta client can perform Step 1; OIDC apps can't |
| `token_exchange_invalid_audience` | Wrong flow path (for example, Web SSO instead of token exchange) | Use the AI Agent client for Step 1, not the OIDC app |

## Next steps

If you're integrating a supported third-party platform, apply this flow using the platform-specific guide in [Supported platforms](#supported-platforms).

Authenticating third-party agents with delegated user identity is one part of the Okta for AI Agents framework. To define which resources and scopes an agent can reach, see [Set up AI agent token exchange](/docs/guides/ai-agent-token-exchange/).
