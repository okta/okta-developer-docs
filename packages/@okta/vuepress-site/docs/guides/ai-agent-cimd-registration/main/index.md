---
title: Register AI agents with a Client ID Metadata Document (CIMD)
excerpt: Learn how to register an AI agent's OAuth client using a Client ID Metadata Document (CIMD) URL instead of a static client ID or key.
layout: Guides
---

<ApiLifecycle access="research" />

Learn how to register an AI agent's OAuth client with a Client ID Metadata Document (CIMD) URL. Use a CIMD URL instead of a static `client_id` or a bring-your-own-key (BYOK) public key.

---

#### Learning outcomes

- Understand what a CIMD is and why it replaces BYOK registration for AI agents.
- Register an AI agent with a CIMD-based OAuth client using the API.
- Configure an existing AI agent as a CIMD client.
- Use the CIMD client ID in an OAuth token request.

#### What you need

- An Okta org that has CIMD-based AI agent registration enabled
- An Okta admin account with the super admin role
- A CIMD metadata document that you host, or that your agent vendor hosts, at an HTTPS URL you control. See [CIMD requirements](#cimd-requirements).

---

## Overview

A CIMD lets an OAuth client identify itself with a URL instead of a static, pre-registered `client_id`. The URL hosts a JSON metadata document that Okta fetches at request time.

For AI agents, CIMD replaces bring-your-own-key (BYOK) registration. With BYOK, the AI agent operator (either your org's admin or the AI agent's vendor) registers a public key with Okta through the API, and rotating that key requires another Okta API call. With CIMD, the AI agent operator rotates keys on their own infrastructure. Okta picks up the change automatically the next time the AI agent requests a token. The AI agent operator doesn't need to make an Okta API call.

> **Note:** Once you set `oauthClient.type` to `CIMD` on an AI agent, you can't change it to a different type. However, you can configure an existing AI agent that doesn't yet use CIMD (for example, one that uses BYOK) as a CIMD client. See [Configure an existing AI agent as a CIMD client](#configure-an-existing-ai-agent-as-a-cimd-client).

## CIMD requirements

Host your CIMD at an HTTPS URL. Okta validates the following fields in the document:

| Field | Requirement |
| --- | --- |
| `client_id` | Must exactly match the URL that Okta requests. This is the same URL you set as `clientIdMatchPattern` when you register the AI agent. |
| `jwks_uri` | A URL to your hosted JSON Web Key Set (JWKS), or an inline `jwks` object. Okta uses this to verify the signature on your `client_assertion` JWT when the AI agent requests a token. |
| `redirect_uris` | Must be a non-empty array, even for AI agents that don't use a redirect-based flow. |

See the following resources for the full OAuth CIMD specification, beyond the fields that Okta requires:

- [OAuth Client ID Metadata Document](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) (IETF Internet-Draft)
- [CIMD - OAuth Client ID Metadata Documents](https://client.dev)

Okta fetches this document at request time. Rotate your signing keys by updating the hosted document, so you don't need to call the Okta API.

## Register an AI agent with a CIMD client

To register an AI agent with a CIMD-based OAuth client, send a request to the AI agent registration API. Set `oauthClient.type` to `CIMD` and `oauthClient.clientIdMatchPattern` to your CIMD URL.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "name": "Claude Code",
    "description": "Claude Code CLI agent"
  },
  "oauthClient": {
    "type": "CIMD",
    "clientIdMatchPattern": "https://example.com/.well-known/cimd/claude-code.json"
  }
}' "https://${yourOktaDomain}/workload-principals/api/v1/ai-agents"
```

Okta processes the registration asynchronously. The response is `202 Accepted` with an empty body, and a `Location` header that points to an operation you can poll for completion:

``` http
Location: https://${yourOktaDomain}/workload-principals/api/v1/operations/{operationId}
```

Once the operation's `status` is `COMPLETED`, use its `resource.id` to retrieve the created AI agent, or list your AI agents and find it by its `oauthClient.clientId`. The AI agent is created with a `STAGED` status. The `oauthClient.clientId` field echoes back the exact URL that you provided in the request:

```json
{
  "id": "wlp1a2b3c4d5e6f7g8h9",
  "status": "STAGED",
  "profile": {
    "name": "Claude Code",
    "description": "Claude Code CLI agent"
  },
  "oauthClient": {
    "clientId": "https://example.com/.well-known/cimd/claude-code.json"
  }
}
```

> **Note:** If you register an AI agent with a CIMD client through the API, it doesn't appear on the **AI agent** > **Credentials** tab in the Admin Console. The tab currently lists only three other registration methods, with no indication that an agent uses CIMD. It doesn't mean that registration failed.

CIMD client ID matching is exact-match only. Okta doesn't support pattern or regex matching for CIMD clients.

## Configure an existing AI agent as a CIMD client

You can configure an AI agent that you've already registered with Okta, but that doesn't yet use CIMD, to use a CIMD OAuth client. Send a PATCH request to the AI agent with the same `oauthClient` object that you'd use at registration:

```bash
curl -v -X PATCH \
-H "Accept: application/json" \
-H "Content-Type: application/merge-patch+json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "oauthClient": {
    "type": "CIMD",
    "clientIdMatchPattern": "https://example.com/.well-known/cimd/claude-code.json"
  }
}' "https://${yourOktaDomain}/workload-principals/api/v1/ai-agents/${agentId}"
```

As with registration, Okta processes this request asynchronously. The response is `202 Accepted` with a `Location` header that points to an operation you can poll for completion.

You can't change a CIMD client's `oauthClient.type` to a different type after you set it.

## Use the CIMD client ID in a token request

Okta accepts the CIMD URL as the `client_id` in an OAuth request, just as it would a static client ID. A CIMD client authenticates with `private_key_jwt`: the AI agent signs a `client_assertion` JWT with its private key, and Okta verifies the signature using the `jwks` or `jwks_uri` from your hosted CIMD.

CIMD clients support the following grant types:

- `urn:ietf:params:oauth:grant-type:token-exchange`
- `urn:ietf:params:oauth:grant-type:jwt-bearer`

CIMD clients don't support the `client_credentials` grant type.

```bash
curl -v -X POST \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
-d "client_id=https://example.com/.well-known/cimd/claude-code.json" \
-d "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer" \
-d "client_assertion=${signed_jwt}" \
"https://${yourOktaDomain}/oauth2/v1/token"
```

Sign `client_assertion` with the private key that matches the public key in your CIMD's JWKS. Set both `iss` and `sub` in the JWT to the CIMD URL.

For example, [Okta Agent Gateway](#see-also) uses this to connect third-party AI agents without any manual client configuration. An admin registers the AI agent vendor's CIMD URL on the agent, such as the URL that Anthropic hosts for Claude Code. Then the AI agent connects to the gateway automatically. You don't need to manually configure a client ID or client secret.

<div class="full wireframe-border">

  ![Sequence diagram showing an AI agent registering with a CIMD URL and then using that URL as the client ID in a token request](/img/auth/ai-agent-cimd-registration/cimd_registration_and_token_request.svg)

</div>

<!-- DRAFT: Diagram not yet created. File an InfoDev UX Design Request (clone OKTA-1125851) against the
     diagram backlog once this draft is reviewed. See doc plan Section 4. -->

## Troubleshoot errors

### Registration errors

| Problem | Cause |
| --- | --- |
| Registration request fails validation | The `clientIdMatchPattern` URL isn't HTTPS, is unreachable, or doesn't return a valid CIMD. |
| Registration succeeds, but the AI agent can't obtain a token | Confirm that the hosted CIMD still matches what Okta expects. Okta re-fetches the document at request time, so a change to it, or an outage at that URL, can break token requests. Nothing changes in Okta. |

### Token request errors

| Problem | Cause |
| --- | --- |
| Token request fails because Okta can't find a matching client | No AI agent is registered with an `oauthClient.clientId` that exactly matches the `client_id` that you sent. Register an AI agent with this CIMD URL first. See [Register an AI agent with a CIMD client](#register-an-ai-agent-with-a-cimd-client). |
| Token request fails signature verification | The `client_assertion` JWT isn't signed with the private key that matches the public key in your CIMD's JWKS, or the CIMD's `jwks_uri` (or inline `jwks`) doesn't resolve to a valid JWKS. |
| Token request fails with an expired or invalid refresh token | The AI agent didn't request a new token before the refresh token's idle window elapsed. See [Refresh token lifetime](#refresh-token-lifetime). |

## Refresh token lifetime

CIMD OAuth clients, including AI agents that are registered with a CIMD OAuth client, use a shorter default refresh token lifetime than standard OAuth clients: seven days, with a two-day idle window. Standard OAuth clients default to a 90-day lifetime with no idle window.

## See also

- [Agent Gateway](/docs/concepts/agent-gateway/)
- [Register an AI agent](https://developer.okta.com/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentregistration)
- [OAuth Client ID Metadata Document](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) (IETF Internet-Draft)
- [CIMD - OAuth Client ID Metadata Documents](https://client.dev)
