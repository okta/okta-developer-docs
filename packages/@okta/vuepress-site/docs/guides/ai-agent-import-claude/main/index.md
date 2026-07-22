---
title: Import Anthropic Claude AI agents
excerpt: Learn how to import Anthropic Claude Managed Agents into Okta's AI Agent directory using the API
layout: Guides
---
<ApiLifecycle access="ie" />

This guide shows you how to configure and run an Anthropic Claude Managed Agents import using Okta's AI Agent Provider and AI Agent Registration APIs. Use this guide if you want to automate or script the import instead of using the Admin Console.

> **Note:** To enable AI agent import, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.

> **Note:** Anthropic's Claude Managed Agents API is a public beta feature. Okta's integration pins a specific `anthropic-beta` header version on Anthropic's side. Anthropic can change or remove beta APIs, which can affect import behavior until Managed Agents reaches general availability.

---

#### Learning outcomes

* Understand what the Anthropic Claude AI Agent import does, and how it differs from securing an agent with token exchange.
* Create and validate an AI agent provider for your Anthropic Console workspace.
* Trigger an import and poll its status.
* Retrieve and manage the AI agent records that the import creates in Okta.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled.
* An Okta API token or OAuth 2.0 access token with the `okta.aiAgents.manage` and `okta.aiAgents.read` scopes.
* The **Anthropic Claude** app added to your org as an app instance. See [Configure Claude for Okta](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-claude.htm).
* An Anthropic API key with read access to list agents, generated from the [Anthropic Console](https://console.anthropic.com/). An Admin API key (`sk-ant-admin-...`) gives visibility into every agent in the workspace; a standard key is scoped to the agents its creator can see.

---

## Overview

Anthropic's Claude Managed Agents platform doesn't support OAuth 2.0, and it doesn't expose a way to inject a bearer token into an agent's execution. Because of that, securing a Claude Managed Agent doesn't follow the token-exchange pattern used in [Secure an Amazon Bedrock AgentCore agent](/docs/guides/ai-agent-secure-amazon-bedrock/) or [Secure AWS Bedrock Classic Agents with Okta](/docs/guides/ai-agent-secure-aws-bedrock/). There's no agent code to wrap, and no downstream call to attach an access token to.

What you *can* do is bring your Claude Managed Agents into Okta's AI Agent directory for governance: ownership assignment, lifecycle visibility, and inclusion in access reviews. That's what this guide covers, using two related Okta resources:

* **AI agent provider.** Represents the sync connection to your Anthropic Console workspace: the app instance it authenticates through, the Anthropic API key, who owns imported agents by default, and when the connection last ran.
* **AI agent.** A single imported agent record, created or updated each time the provider runs an import. Its `profile.platform` is `CLAUDE_MANAGED_AGENTS`, and `profile.externalId` holds the Anthropic agent ID (for example, `agent_01HqR2k7vXbZ9mNpL3wYcT8f`) so re-imports update the same record instead of duplicating it.

The import is one-way and full: every active agent in the Anthropic workspace is fetched and reconciled on each run. Anthropic agent name and description are source-mastered — editing them in Okta doesn't push changes back to the Anthropic Console.

<!-- TODO: Replace this text-based diagram with an image.

```text
Anthropic Console workspace
  GET /v1/agents (Okta-managed x-api-key, anthropic-version, anthropic-beta headers)
    |
    v
AI agent provider (Okta)
  POST /workload-principals/api/v1/ai-agent-providers/{providerId}/import
    |
    v
AI agent records (Okta)
  profile.platform = CLAUDE_MANAGED_AGENTS
  profile.externalId = <Anthropic agent id>
    |
    v
Directory > AI Agents (governance, ownership, access reviews)
```-->

For the equivalent Admin Console walkthrough, see [Configure Claude for Okta](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-claude.htm).

## Before you begin

1. Add the **Anthropic Claude** app to your org and set its instance URL (the Anthropic API base, typically `https://api.anthropic.com`). This step happens in the Admin Console; there's no API for creating the app instance itself. See [Configure Claude for Okta](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-claude.htm).
1. Note the app instance's [ORN](/docs/api/openapi/okta-management/guides/roles/#okta-resource-name-orn). You need it as `sourceOrn` in the next section. It has the form:

   ```text
   orn:okta:idp:{yourOrgId}:apps:anthropic-claude:{appInstanceId}
   ```

1. Generate an Anthropic API key in the Anthropic Console (**Settings** > **API Keys** > **Create Key**). Copy it immediately — Anthropic only shows it once.

> **Important:** Store the Anthropic API key in a secrets manager. Okta encrypts it at rest and never returns it in plaintext after you create the provider.

## Configure the AI agent provider

### Validate the connection

Before creating the provider, confirm that Okta can reach the Anthropic API with your key. This calls Anthropic's `GET /v1/agents?limit=1` internally, with the required `anthropic-version` and `anthropic-beta` headers added automatically by Okta.

> **Note:** The `configuration` object is provider-specific and accepts arbitrary properties. The `apiKey` property name shown here is illustrative — confirm the exact property name and whether the Anthropic instance URL belongs in this payload or only on the app instance before you rely on this sample.

```bash
curl -X POST "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/validate" \
  -H "Authorization: SSWS {api_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "sourceOrn": "orn:okta:idp:{yourOrgId}:apps:anthropic-claude:{appInstanceId}",
    "configuration": {
      "apiKey": "sk-ant-admin-..."
    }
  }'
```

A valid connection returns `204 No Content`. A `400` indicates an invalid key, a workspace without Managed Agents beta access, or a malformed request.

### Create the provider

```bash
curl -X POST "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers" \
  -H "Authorization: SSWS {api_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "sourceOrn": "orn:okta:idp:{yourOrgId}:apps:anthropic-claude:{appInstanceId}",
    "configuration": {
      "apiKey": "sk-ant-admin-..."
    },
    "owners": {
      "userOrns": [
        "orn:okta:directory:{yourOrgId}:users:{defaultOwnerUserId}"
      ]
    }
  }'
```

A successful response returns the created `AIAgentProvider`, including its `id` (for example, `aip-1a2b3c4d`) and `status` of `ACTIVE`:

```json
{
  "id": "aip-1a2b3c4d",
  "sourceOrn": "orn:okta:idp:{yourOrgId}:apps:anthropic-claude:{appInstanceId}",
  "sourceId": "{appInstanceId}",
  "sourceName": "Anthropic Claude",
  "sourceType": "apps",
  "status": "ACTIVE",
  "integrationDate": "2026-07-01T12:00:00Z",
  "owners": {
    "userOrns": [
      "orn:okta:directory:{yourOrgId}:users:{defaultOwnerUserId}"
    ]
  },
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d"
    }
  }
}
```

The `owners` value here is the default owner. It's applied to every agent this provider imports that doesn't already have an owner in Okta — it doesn't come from the Anthropic Console, which has no owner or creator field. Note the returned `id`; you need it for every subsequent call.

> **Note:** Okta enforces uniqueness per workspace, not per org. If you connect two Anthropic workspaces (for example, staging and production), create a separate AI agent provider for each — one Anthropic API key is scoped to a single Console workspace.

## Trigger and monitor an import

### Start the import

```bash
curl -X POST "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d/import" \
  -H "Authorization: SSWS {api_token}"
```

A successful call returns `202 Accepted` with a `Location` header pointing to the import operation:

```text
HTTP/1.1 202 Accepted
Location: https://{yourOktaDomain}/workload-principals/api/v1/operations/op-1a2b3c4d
```

The import fetches every active agent from the workspace (`archived_at == null` on the Anthropic side) using cursor-based pagination, and reconciles it against existing Okta records by matching the Anthropic agent `id` to `profile.externalId`:

* No matching record → a new AI agent is created, with the provider's default owner applied.
* A matching record with changed fields → the record is updated.
* An Okta record whose Anthropic agent no longer appears in the response → the record is treated as deleted at the source and removed.

### Poll the operation

```bash
curl "https://{yourOktaDomain}/workload-principals/api/v1/operations/op-1a2b3c4d" \
  -H "Authorization: SSWS {api_token}"
```

Poll until `status` reaches a terminal value. Treat any status other than a successful completion as needing investigation — check the operation response for per-item error detail before re-running the import.

## View and manage imported agents

### List agents from this provider

Filter by platform to see only agents imported from Anthropic Claude:

```bash
curl -g "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents?search=profile.platform+eq+%22CLAUDE_MANAGED_AGENTS%22" \
  -H "Authorization: SSWS {api_token}"
```

Each entry includes the agent's Okta `id`, its `profile.externalId` (the Anthropic agent ID), and a `_links.providers` reference back to the AI agent provider that created it:

```json
{
  "data": [
    {
      "id": "wlpx9jQ16k9V8IFEL0g3",
      "status": "ACTIVE",
      "profile": {
        "name": "Customer Support Agent",
        "description": "Handles Tier-1 customer support queries via chat.",
        "externalId": "agent_01HqR2k7vXbZ9mNpL3wYcT8f",
        "platform": "CLAUDE_MANAGED_AGENTS"
      },
      "_links": {
        "self": {
          "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/wlpx9jQ16k9V8IFEL0g3"
        },
        "providers": [
          {
            "href": "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d"
          }
        ]
      }
    }
  ]
}
```

> **Note:** `name` and `description` are source-mastered from the Anthropic Console. Changing them through the AI agent API doesn't persist — the next import overwrites them with whatever the Console has.

### Retrieve a single agent

```bash
curl "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/wlpx9jQ16k9V8IFEL0g3" \
  -H "Authorization: SSWS {api_token}"
```

<!-- TODO: Confirm whether per-agent owner override is a field on the AI agent resource itself, or a separate call. The Anthropic AI Agent Import spec (FR-OWN-003) describes overriding the default owner for an individual imported agent, but that isn't confirmed against the AI Agent Registration API schema yet. -->

## Check provider status and re-authenticate

```bash
curl "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d" \
  -H "Authorization: SSWS {api_token}"
```

`status` is one of:

| Status | Meaning |
| --- | --- |
| `ACTIVE` | The provider is connected and importing normally. |
| `INACTIVE` | The provider is disabled. Imported agents remain in Okta in their last-imported state; they aren't deleted. |
| `REVALIDATE` | Okta needs to re-check the connection, typically after a configuration change. |
| `REAUTHENTICATE` | The Anthropic API key is invalid or expired. Generate a new key in the Anthropic Console and update the provider's `configuration`. |

To rotate the API key, use a partial update:

```bash
curl -X PATCH "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d" \
  -H "Authorization: SSWS {api_token}" \
  -H "Content-Type: application/merge-patch+json" \
  -d '{
    "configuration": {
      "apiKey": "sk-ant-admin-{new-key}"
    }
  }'
```

## Troubleshooting

| Error | Root cause | Fix |
| --- | --- | --- |
| `400` on `validate` or `create`, "Invalid API key" | The Anthropic API key is wrong, revoked, or expired | Generate a new key in the Anthropic Console and retry |
| `400` on `validate`, "beta feature not available" | The API key's workspace doesn't have Managed Agents beta access | Use an Admin API key, or request Managed Agents beta access from Anthropic |
| `429` from Okta | You've exceeded the AI agent provider API rate limit | Check the `X-Rate-Limit-*` response headers and back off before retrying |
| Provider `status` is `REAUTHENTICATE` | The stored Anthropic API key stopped working (rotated or revoked in the Anthropic Console) | `PATCH` the provider with a new `apiKey`, then re-run the import |
| Import completes but an expected agent is missing | The agent is archived in the Anthropic Console (`archived_at` is non-null) | Archived agents are excluded by design. Unarchive it in the Anthropic Console and re-import |
| Two workspaces import agents with the same name | Uniqueness is enforced per workspace, not per org | Expected behavior. Agents from different Anthropic workspaces are distinct records even if names collide |

## Next steps

Imported Claude Managed Agents now appear in **Directory** > **AI Agents**, where you can assign ownership, review them in access certifications, and track them alongside agents from other platforms. To automate ownership assignment or re-imports on a schedule, see the `owners` and `schedule` properties on the [AI Agent Providers API](/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentproviders).

## See also

* [Configure Claude for Okta](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-claude.htm)
* [Okta for AI Agents API](/docs/api/secures-ai)
* [Secure third-party AI agents](/docs/guides/ai-agent-secure-third-party/)
* [Anthropic Claude Managed Agents documentation](https://docs.anthropic.com/)
