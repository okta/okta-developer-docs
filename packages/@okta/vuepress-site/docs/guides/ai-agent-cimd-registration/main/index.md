---
title: Register AI agents with CIMD
excerpt: Learn how to register an AI agent's OAuth client using a Client ID Metadata Document (CIMD) URL instead of a static client ID or key.
layout: Guides
---

<!-- DRAFT: Confirm with Janet/Dipti whether AI_AGENT_CIMD_REGISTRATION is a formally designated EA feature.
     If so, add <ApiLifecycle access="ea" /> here to match the ea-ai-agent-token-exchange guide's convention. -->

Learn how to register an AI agent's OAuth client with a Client ID Metadata Document (CIMD) URL, instead of a static `client_id` or a bring-your-own-key (BYOK) public key.

---

#### Learning outcomes

- Understand what a CIMD is and why it replaces BYOK registration for AI agents.
- Register an AI agent with a CIMD-based OAuth client using the API.
- Use the CIMD client ID in an OAuth token request.

#### What you need

- An Okta org with the following feature flags enabled:
  - `CIMD_CLIENT_METADATA_DOCUMENT`
  - `AI_AGENT_CIMD_REGISTRATION`
- An Okta admin account with the super admin role.
- A CIMD metadata document hosted at an HTTPS URL that you control or that your agent vendor provides. See [CIMD metadata document requirements](#cimd-metadata-document-requirements).

---

## Overview

<!-- DRAFT: Primer section. Keep this as the canonical CIMD explanation--per Antoine, the Agent Gateway concept
     doc's current CIMD mention isn't sufficient on its own, so this guide's overview is meant to be the thing
     other docs (Agent Gateway concept, help.okta.com) link back to, not the other way around. -->

A Client ID Metadata Document (CIMD) lets an OAuth client identify itself with a URL instead of a static, pre-registered `client_id`. The URL hosts a JSON metadata document that Okta fetches at request time.

For AI agents, CIMD replaces bring-your-own-key (BYOK) registration. With BYOK, the agent operator registers a public key with Okta through the API, and rotating that key requires another Okta API call. With CIMD, the agent operator rotates keys on their own infrastructure, and Okta picks up the change automatically the next time an agent requests a token — no Okta API call required.

> **Note:** `oauthClient.type` is set when you create the AI agent and can't be changed afterward. To move an agent from BYOK to CIMD, create a new agent — you can't convert an existing one in place.

## CIMD metadata document requirements

<!-- DRAFT: Cross-reference only, per Bhavik and Em--don't re-document hosting/rotation mechanics that the
     protocol spec already covers. Confirm with Em whether Aaron Parecki/the standards team has existing
     content to link to instead of the placeholders below. -->

The CIMD metadata document itself is defined by the OAuth Client ID Metadata Document specification, not by Okta. Your document must be hosted at an HTTPS URL and meet the requirements described in:

<!-- TODO: link to the IETF OAuth Client ID Metadata Document draft once confirmed -->
<!-- TODO: link to client.dev's CIMD documentation once confirmed -->

Okta fetches this document at request time, so rotating your signing keys is a matter of updating the hosted document — no Okta API call is required.

## Register an AI agent with a CIMD client

To register an AI agent with a CIMD-based OAuth client, send a request to the AI agent registration API with `oauthClient.type` set to `CIMD` and `oauthClient.clientIdMatchPattern` set to your metadata document's URL.

<!-- DRAFT: Request/response shapes below are drafted from the merged okta-oas3 schema (PR #3577, PR #3669)
     and the planning questionnaire--NOT yet verified against a live org. Run the testing pass in the doc plan
     (Section 3) before publishing: confirm field names, the STAGED status, and exact error shapes. -->

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "displayName": "Claude Code",
  "oauthClient": {
    "type": "CIMD",
    "clientIdMatchPattern": "https://example.com/.well-known/cimd/claude-code.json"
  }
}' "https://${yourOktaDomain}/workload-principals/api/v1/ai-agents"
```

Okta returns the created agent with a `STAGED` status. The `oauthClient.clientId` echoes the same URL you provided:

```json
{
  "id": "wlp1a2b3c4d5e6f7g8h9",
  "displayName": "Claude Code",
  "status": "STAGED",
  "oauthClient": {
    "type": "CIMD",
    "clientId": "https://example.com/.well-known/cimd/claude-code.json",
    "clientIdMatchPattern": "https://example.com/.well-known/cimd/claude-code.json"
  }
}
```

CIMD client ID matching is exact-match only. Okta doesn't support pattern or regex matching for CIMD clients.

### The Admin Console doesn't reflect CIMD registration

> **Note:** If you register an AI agent with a CIMD client through the API, the Admin Console's Credentials tab doesn't show CIMD as one of the client registration methods. The console currently surfaces three other registration methods, and gives no indication that an agent is using CIMD. This is expected for the current release — it isn't a sign that registration failed.

## Use the CIMD client ID in a token request

<!-- DRAFT: Pending legal/DCS sign-off on Claude Code/Anthropic example wording (Stephanie, Emily). Wording
     below is a placeholder for review, not cleared for publication. Also pending: confirmation from
     Antoine/engineering on which OAuth flow(s) are actually supported for agent-as-client--the Agent
     Gateway/Claude Code scenario looks machine-to-machine, which may mean this is the only flow this guide
     needs to cover. -->

Okta accepts the CIMD URL as the `client_id` in an OAuth request, just as it would a static client ID.

For example, [Okta Agent Gateway](#see-also) uses this to connect third-party agents without any manual client configuration: an admin registers the agent vendor's CIMD URL (for example, the URL that Anthropic hosts for Claude Code) on the agent, and the agent connects to the gateway automatically. No client ID or client secret needs to be configured by hand.

<div class="full wireframe-border">

  ![Sequence diagram showing an AI agent registering with a CIMD URL and then using that URL as the client ID in a token request](/img/auth/ai-agent-cimd-registration/cimd_registration_and_token_request.svg)

</div>

<!-- DRAFT: Diagram not yet created. File an InfoDev UX Design Request (clone OKTA-1125851) against the
     diagram backlog once this draft is reviewed. See doc plan Section 4. -->

## Troubleshooting

### Registration errors

<!-- DRAFT: Exact error codes/messages below are placeholders pending live-org testing (doc plan Section 3). -->

| Problem | Cause |
| --- | --- |
| Registration request fails validation | The `clientIdMatchPattern` URL isn't HTTPS, is unreachable, or doesn't return a valid CIMD metadata document. |
| Registration succeeds, but the agent can't obtain a token | Confirm the hosted metadata document still matches what Okta expects — Okta re-fetches it at request time, so a change to the hosted document (or an outage at that URL) can break token requests without changing anything in Okta. |

### Token request errors

<!-- DRAFT: Open question--confirm with engineering which OAuth flow(s) are supported for agent-as-client
     using a CIMD client ID. This section may be replaced entirely once that's confirmed, or may turn out to
     be out of scope if the only supported path is the Agent Gateway machine-to-machine flow above. -->

## Refresh token lifetime

<!-- DRAFT: Pending verification. The generic CIMD Platform design uses shorter refresh-token defaults
     (7-day/2-day idle) than standard OAuth clients (90-day/unlimited)--confirm whether that applies
     identically to AI-agent CIMD registrations specifically, or needs its own verification. -->

## See also

<!-- DRAFT: Link to the Agent Gateway concept doc once PR #6290 merges to master (Susan Harper). Don't link
     to /docs/concepts/agent-gateway/ before then--the page doesn't exist on master yet, and check-links would
     flag it. -->
<!-- DRAFT: Link to the AI agent registration OAS3 reference once it publishes (auto-publishes once the
     AI_AGENT_CIMD_REGISTRATION flag opens visibility). -->
<!-- DRAFT: Link to client.dev/IETF draft, same as the CIMD metadata document requirements section above. -->
