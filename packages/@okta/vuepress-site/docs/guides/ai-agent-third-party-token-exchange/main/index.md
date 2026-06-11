---
title: Set up third-party AI Agent token exchange
excerpt: Learn how to configure token exchange for third-party AI agents to securely access protected resources.
layout: Guides
---
<ApiLifecycle access="ie" />

Okta's AI Agents feature secures third-party AI agents with delegated user identity. When a user authenticates with Okta, your application exchanges the user's identity token for a scoped access token. The AI agent can then call Okta-protected APIs on the user's behalf.

In this guide, learn how to configure token exchange for third-party AI agents.

> **Note**: To enable AI agent token exchange, you must first subscribe to Okta for AI Agents. See your Okta account team to enable the feature.

---

#### Learning outcomes

- Understand Okta's two-step cross app access (XAA) token exchange flow for AI agents
- Understand how to set up the token exchange flow.
- Test the third-party token exchange flow.

#### What you need

- An Okta org that's subscribed to Okta for AI Agents.
- An Okta user account with the super admin role.

---

## Overview

Okta's token exchange uses two API calls. The user's ID token is exchanged for an ID-JAG at the org authorization server. The ID-JAG is then exchanged for a scoped access token at the custom authorization server. The calling application passes that token to the AI agent.

<!--diagram below?-->

```bash
Diagram? From Vicky?

User
  authenticates via Okta OIDC web app → receives id_token
  ↓
Application
  Step 1: id_token → ID-JAG        (Org AS — POST /oauth2/v1/token)
  Step 2: ID-JAG  → access_token   (Custom AS — POST /oauth2/{as-id}/v1/token)
  ↓
Third-party AI agent
  receives: access_token + user claims (name, email, sub)
  ↓
Okta-protected API
  Authorization: Bearer <access_token>
```

>**Note:** No gateway or proxy is involved. The calling application owns the full token exchange. The AI agent receives a ready-to-use access token.

The machine identity that signs token exchange requests is an AI Agent created in the Okta Admin Console. The AI Agent authenticates both steps of the exchange using a private key jwt. 

### Supported platforms

After setting up the third-party AI Agent token exchange flow, you can use this flow with the following supported providers and AI agents:

| Provider | Platform | Guide |
| --- | --- | --- |
| Amazon Web Services | AWS Bedrock Agents | AWS Bedrock Agents guide |
| Amazon Web Services | AWS Bedrock AgentCore | AWS Bedrock AgentCore guide |
| Microsoft | Azure AI Foundry | Azure AI Foundry guide |

## Setting up the third-party token flow

The setup for the third-party AI agent token exchange flow involves the following configurations documented in the following sections:

- Create an Okta OIDC web app integration to handle user sign-on and issue ID tokens.
- Add a custom scope for your custom authorization server.
- Create an AI Agent with RSA key-pair authentication.
- Configure the access policy to allow the JWT Bearer grant type
- Complete the token exchange flow with Okta APIs.

After these configurations, you can create a test app to demonstrate this flow, see [Create an app to test the token exchange flow](#create-an-app-to-test-the-token-exchange-flow).

### Create an OIDC web app integration

An app integration represents your app in your Okta org. Use it to configure how your app connects with Okta services.

1. Open the Admin Console for your org.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Click **Create App Integration**.
1. Select **OIDC - OpenID Connect** as the **Sign-in method**.
1. Select **Web Application** as the **Application type**, then click **Next**.
1. Enter an **App integration name**. For example, "AI Third-Party Token Exchange".
1. Set the following values.
   1. **Grant types**: Authorization Code
   [[style="list-style-type:lower-alpha"]]
   1. **Sign-in redirect URIs**: Enter `http://localhost:5000/callback`

1. Select **Allow everyone in your organization to access** for **Controlled access**.
1. Click **Save** to create the app integration.

The configuration page for the new app integration appears.

Make a note of the Client ID and Client secret. Both are in the configuration pane for the app integration that you've created:

- **Client ID**: Found on the **General** tab in the **Client Credentials** section.

- **Client Secret**: Found on the **General** tab in the **Client Credentials** section.

> **Note:** For a complete guide to all the options not explained in this guide, see [Create OIDC app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_App_Integration_Wizard-oidc).

### Add a custom scope for your custom authorization server

Your custom authorization server requires a custom scope for the third-party AI Agent token exchange. You can use the default custom authorization server or create your own. See [Create an authorization server](/docs/guides/customize-authz-server/main/#about-the-custom-authorization-server).

>**Note**: System scopes (`openid`, `profile`, `email`) are stripped during the ID-JAG exchange and cause an `invalid_scope` error. You must use a custom scope.

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of your authorization server, and then select **Scopes**.
1. Select **Scopes** and then **Add Scope**.
1. Enter a **Name**, for example, `xaa:read`.
1. Optional. Enter a **Display phrase**, for example, "Cross App Access (XAA read-only scope)".
1. Optional. Enter a **Description**, for example, "This scope allows token exchange between AI Agents."
1. Click **Save**.

See [Create Scopes](/docs/guides/customize-authz-server/main/#create-scopes).

### Create an AI Agent

The AI Agent is the machine identity your application uses to sign token exchange requests. Its `id` is prefaced by `wlp` and authenticates both steps of the exchange.

1. In the Admin Console, go to **Directory** > **AI agents**.
1. Click **Register AI agent** > **Register manually**.
1. Under **Profile** add a name and description for your AI Agent, for example, "Third-Party AI Agent".
1. Click **Register**.
1. Under **Owners**, add owners to the AI Agent. You must add at least two owners. Click **Save**.
1. Select your AI Agent from the list of AI Agents, and click **Credentials**.
1. Under **Client Authentication**, generate an RSA key-pair. Click **Add public key** and
**Generate new key** or use your own public key.
1. From **Actions**, select **Active**.
1. Click **Delegations**. Under **User sign-on**, click **Add caller**. From **Application**, select your previously created OIDC app integration, for example, "AI Third-Party Token Exchange". Click **Add caller**.
1. Under **Non-human identity**, click **Configure**. From **Authorization server**, select your custom authorization server, in this example, use `default`.
1. Add a value for the **Audience/resource URL**. In this test example, use `https://example.com`. Click **Save**.
1. Click **Resource connections**, and then **Add resource connection**. Select the **Authorization server** resource type, and then from **Select Authorization server**, select your custom authorization server, in this example, use `default`. From **The following OAuth scopes**, select the custom scope you added previously, for example, `xaa:read`.

Make a note of the AI Agent ID. For example, `wlp9k6....GKZ5hAE0g7`.

<!-- Verify this section above in Susan's Trex org-->

### Configure the access policy

After you create the AI Agent, configure your custom authorization server's access policy to authenticate your AI Agent.

1. In the Admin Console, go to **Security** > **API**.
1. On the **Authorization Servers** tab, select the name of an authorization server (`default` if you're using the default custom authorization server).
1. Select **Access Policies**, and then edit an existing policy. If you need to add a policy, see [Create access policies](/docs/guides/customize-authz-server/main/#create-access-policies).
1. Edit the default rule or create a new rule, see [Create Rules for each Access Policy](/docs/guides/customize-authz-server/main/#create-rules-for-each-access-policy).
1. Enable grant type **JWT Bearer**.
1. Save the rule and policy.

### Complete the token exchange flow

Your app makes two API calls directly to Okta's token endpoints. No Okta SDK is required. The flow comprises the following two steps:

1. Exchange the `id_token` for ID-JAG
1. Exchange the ID-JAG for an `access_token`

To test this flow, use the following `curl` calls with your configured data. To generate an ID Token, use the [xyz script] in the [Test section].

Use the [token exchange demo script] to demonstrate the full token exchange flow and display the ID Token, ID_JAG token, and Access token.

#### Exchange the ID token for ID-JAG

Call the org authorization server's `/token` endpoint. The `client_assertion` is signed with the agent's RSA private key.

Ensure you update the following values in this call: `{yourOktaDomain}`, `{signed JWT}`, `{User id_token}`, and the `audience` URL. See the following Parameter table.

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
| client_assertion | A signed JWT used for client authentication. You must sign the JWT using the key created during the AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |
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

Ensure you update the following values in this call: `{yourOktaDomain}`, `custom-as-id` (`default` in this example), `{signed JWT}`, and the `{ID_JAG}` token. See the following Parameter table.

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
| assertion | The ID-JAG received in the Exchange token ID for resource token [response](#response). |
| client_assertion_type | The value must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. |
| client_assertion | A signed JWT used for client authentication. You must sign the JWT using the key created during the AI Agent registration. For more information on building the JWT, see [JWT with private key](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#jwt-with-private-key). |

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

## Create an app to test the token exchange flow

Use the following Python Flask app to test the token exchange flow. It uses the Python package manager [uv](https://docs.astral.sh/uv/) to run this demo app.

### Install uv


### Set up the project


### Create your environment file


### Create the demo file


### Run the demo


## Next steps

<!-- maybe too generic ... focus on the actual platform specific docs below -->

Authenticating imported agents with delegated user identity is one part of the Okta for AI Agents framework. After your agent can call APIs on a user's behalf, you can:

- Authorize access to tools and APIs: Configure brokered consent, MCP integration, and OAuth 2.0 resource server policies to define which resources and scopes agents are permitted to reach.

- Secure agent-to-agent communication: Use A2A flows, ACT claims, and token chaining when one agent delegates work to another.

- Deploy through an agent gateway: Centrally manage, observe, and govern agent traffic through virtual MCP servers and gateway integrations.
