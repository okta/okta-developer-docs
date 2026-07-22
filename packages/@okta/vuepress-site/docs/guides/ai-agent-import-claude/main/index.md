---
title: Import Anthropic Claude AI agents
excerpt: Learn how to import Anthropic Claude Managed Agents into Okta's AI Agent directory using the API
layout: Guides
---
<ApiLifecycle access="research" />

This guide shows you how to configure and run an Anthropic Claude Managed Agents import. It uses Okta's AI Agent Provider API and AI Agent Registration API. Use this guide if you want to automate or script the import instead of using the Admin Console.

> **Notes:**
>
> * To enable AI agent import, you must first subscribe to Okta for AI Agents. Contact your Okta account team to enable the feature.
> * Anthropic's Claude Managed Agents API is a public beta feature. Okta's integration pins a specific `anthropic-beta` header version on Anthropic's side. Anthropic can change or remove beta APIs, which can affect import behavior until Managed Agents reaches general availability.

---

#### Learning outcomes

* Understand what the Anthropic Claude AI Agent import does, and how it differs from securing an agent with token exchange.
* Create and validate an AI agent provider for your Claude Console workspace.
* Trigger an import and poll its status.
* Retrieve and manage the AI agent records that the import creates in Okta.

#### What you need

* An [Identity Engine](/docs/concepts/oie-intro/) org with the Okta for AI Agents feature enabled.
* An Okta API token or OAuth 2.0 access token with the `okta.aiAgents.manage` and `okta.aiAgents.read` scopes.
* Add the **Anthropic Claude** app to your org as an app instance. See [Configure Claude for Okta](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-claude.htm) for the steps.
* An Anthropic API key with read access to list agents. Generate this key from the [Claude Console](https://console.anthropic.com/). An Admin API key (`sk-ant-admin-...`) gives visibility into every agent in the workspace. A standard key only reaches the agents that its creator can see.

---

## Overview

Anthropic's Claude Managed Agents platform doesn't support OAuth 2.0. It also doesn't expose a way to inject a bearer token into an agent's execution. Because of that, securing a Claude Managed Agent skips the usual token-exchange pattern. That pattern appears in [Secure an Amazon Bedrock AgentCore agent](/docs/guides/ai-agent-secure-amazon-bedrock/) and [Secure AWS Bedrock Classic Agents with Okta](/docs/guides/ai-agent-secure-aws-bedrock/). This guide has no agent code to wrap and no downstream call that needs an access token.

You can bring your Claude Managed Agents into Okta's AI Agent directory for governance. This gives you ownership assignment, lifecycle visibility, and inclusion in access reviews. This guide covers that goal using two related Okta resources:

* **AI agent provider.** This resource represents the sync connection to your Claude Console workspace. It stores the app instance that it authenticates through, the Anthropic API key, the default owner for imported agents, and the last import time.
* **AI agent.** Each AI agent is a single imported agent record. The provider creates or updates this record every time it runs an import. Its `profile.platform` is `CLAUDE_MANAGED_AGENTS`, and `profile.externalId` holds the Anthropic agent ID (for example, `agent_01HqR2k7vXbZ9mNpL3wYcT8f`), so re-imports update the same record instead of duplicating it.

Each import is one-way and full. It fetches and reconciles every active agent in the Anthropic workspace on every run. Anthropic agent name and description remain source-mastered. Editing them in Okta doesn't push changes back to the Claude Console.

<!-- TODO: Replace this text-based diagram with an image.

```text
Claude Console workspace
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

1. Add the **Anthropic Claude** app to your org and set its instance URL (the Anthropic API base, typically `https://api.anthropic.com`). This step happens in the Admin Console. There's no API for creating the app instance itself. See [Configure Claude for Okta](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-claude.htm).
1. Note the app instance's [ORN](/docs/api/openapi/okta-management/guides/roles/#okta-resource-name-orn). You need it as `sourceOrn` in the next section. It has the form:

   ```text
   orn:okta:idp:{yourOrgId}:apps:anthropic-claude:{appInstanceId}
   ```

1. Generate an Anthropic API key in the Claude Console (**Settings** > **API Keys** > **Create Key**). Copy it immediately. Anthropic only shows it once.

> **Important:** Store the Anthropic API key in a secrets manager. Okta encrypts it at rest and never returns it in plaintext after you create the provider.

## Configure the AI agent provider

### Validate the connection

Before you create the provider, confirm that Okta can reach the Anthropic API with your key. This step calls Anthropic's `GET /v1/agents?limit=1` internally. Okta adds the required `anthropic-version` and `anthropic-beta` headers automatically.

> **Note:** The `configuration` object is provider-specific and accepts arbitrary properties. This guide uses `apiKey` as an illustrative property name only. Confirm the exact property name before you rely on this sample. Also confirm whether the Anthropic instance URL belongs in this payload or only on the app instance.

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

The `owners` value here sets the default owner. Okta applies this owner to every agent this provider imports, unless the agent already has an owner. The Claude Console has no owner or creator field, so this value never comes from Anthropic. Note the returned `id`, because you need it for every later call.

> **Note:** Okta enforces uniqueness per workspace, not per org. If you connect two Anthropic workspaces, such as staging and production, create a separate AI agent provider for each one. Remember that one Anthropic API key only reaches a single Console workspace.

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

The import fetches every active agent from the workspace, where `archived_at == null` on the Anthropic side. It uses cursor-based pagination to page through the results. Okta then reconciles each agent against existing records by matching the Anthropic agent `id` to `profile.externalId`:

* If no record matches, Okta creates a AI agent and applies the provider's default owner.
* If a matching record has changed fields, Okta updates that record.
* If an Okta record's Anthropic agent no longer appears in the response, Okta removes the record as deleted at the source.

### Poll the operation

```bash
curl "https://{yourOktaDomain}/workload-principals/api/v1/operations/op-1a2b3c4d" \
  -H "Authorization: SSWS {api_token}"
```

Poll until `status` reaches a terminal value. Treat any other status as a sign that something needs investigation. Check the operation response for per-item error detail before you re-run the import.

## View and manage imported agents

### List agents from this provider

Filter by platform to see only agents imported from Anthropic Claude:

```bash
curl -g "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents?search=profile.platform+eq+%22CLAUDE_MANAGED_AGENTS%22" \
  -H "Authorization: SSWS {api_token}"
```

Each entry includes the agent's Okta `id`, its `profile.externalId` (the Anthropic agent ID), and a `_links.providers` reference to the AI agent provider that created it:

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

> **Note:** The Claude Console stays the source of truth for `name` and `description`, so changes to them in Okta don't persist. The next import overwrites them with whatever the Console has.

### Retrieve a single agent

```bash
curl "https://{yourOktaDomain}/workload-principals/api/v1/ai-agents/wlpx9jQ16k9V8IFEL0g3" \
  -H "Authorization: SSWS {api_token}"
```

<!-- TODO: Confirm whether per-agent owner override is a field on the AI agent resource, or whether it needs a separate call. The Anthropic AI Agent Import spec (FR-OWN-003) describes overriding the default owner for an individual imported agent. The AI Agent Registration API schema doesn't confirm this yet. -->

## Check provider status and re-authenticate

```bash
curl "https://{yourOktaDomain}/workload-principals/api/v1/ai-agent-providers/aip-1a2b3c4d" \
  -H "Authorization: SSWS {api_token}"
```

`status` is one of:

| Status | Meaning |
| --- | --- |
| `ACTIVE` | The provider is connected and importing normally. |
| `INACTIVE` | The provider is disabled. Imported agents remain in Okta in their last-imported state, and Okta doesn't delete them. |
| `REVALIDATE` | Okta needs to re-check the connection, typically after a configuration change. |
| `REAUTHENTICATE` | The Anthropic API key is invalid or expired. Generate a new key in the Claude Console and update the provider's `configuration`. |

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
| `400` on `validate` or `create`, "Invalid API key" | The Anthropic API key is wrong, revoked, or expired | Generate a new key in the Claude Console and retry |
| `400` on `validate`, "beta feature not available" | The API key's workspace doesn't have Managed Agents beta access | Use an Admin API key, or request Managed Agents beta access from Anthropic |
| `429` from Okta | You've exceeded the AI agent provider API rate limit | Check the `X-Rate-Limit-*` response headers and back off before retrying |
| Provider `status` is `REAUTHENTICATE` | The stored Anthropic API key no longer works. Someone rotated or revoked it in the Claude Console | `PATCH` the provider with a new `apiKey`, then re-run the import |
| Import completes but an expected agent is missing | The agent is archived in the Claude Console (`archived_at` is non-null) | Okta excludes archived agents by design. Unarchive the agent in the Claude Console and re-import |
| Two workspaces import agents with the same name | Okta enforces uniqueness per workspace, not per org | Expected behavior. Agents from different Anthropic workspaces are distinct records even if names collide |

## Next steps

Imported Claude Managed Agents now appear in **Directory** > **AI Agents**. There you can assign ownership, review them in access certifications, and track them alongside agents from other platforms. To automate ownership assignment or re-imports on a schedule, see the `owners` and `schedule` properties on the [AI Agent Providers API](/docs/api/secures-ai/openapi/secures-ai-workload-principals/tags/agentproviders).

## See also

* [Configure Claude for Okta](https://help.okta.com/oie/en-us/content/topics/ai-agents/ai-agent-configure-claude.htm)
* [Okta for AI Agents API](/docs/api/secures-ai)
* [Secure third-party AI agents](/docs/guides/ai-agent-secure-third-party/)
* [Anthropic Claude Managed Agents documentation](https://docs.anthropic.com/)
