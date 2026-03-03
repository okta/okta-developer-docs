---
title: Okta MCP Server API release notes 2026
---

# Okta MCP Server API release notes (2026)

<a href="/rss/mcp.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

These release notes list customer-visible changes to the Okta MCP server.

## March

### Monthly release 2026.03.0
<!-- Published on: 2026-03-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Human oversight for destructive actions]() | March 4, 2026 |
| [Developer documentation updates in 2026.03.0](#developer-documentation-updates-in-2026-03-0) | March 4, 2026 |

#### Human oversight for destructive actions

The Okta Model Context Protocol (MCP) server now integrates the MCP Elicitation API to enforce human oversight on destructive actions. Critical operations, such as deleting apps or deactivating users, now require explicit confirmation before execution. Supported MCP clients display a chat UI dialog for users to accept or decline the request. For clients that don't support elicitation, the server returns a JSON payload for the LLM to handle confirmation. <!-- OKTA-1117761 preview date: March 4, 2026 -->

#### Developer documentation updates in 2026.03.0


## February

### Monthly release 2026.02.0
<!-- Published on: 2026-02-09T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Okta MCP server is GA in Production](#okta-mcp-server-is-ga-in-production) | February 4, 2026 |
| [Developer documentation updates in 2026.02.0](#developer-documentation-updates-in-2026-02-0) | February 4, 2026 |

#### Okta MCP server is GA in Production

The Okta Model Context Protocol (MCP) server is a secure protocol abstraction layer that enables AI agents/Large Language Models (LLMs) to interact with the Okta org. The MCP clients can now communicate with Okta’s scoped management APIs in natural language. This simplifies building context-aware AI workflows while ensuring strict access control and least-privilege security. To learn more and start your implementation, see the [Okta MCP server concept](/docs/concepts/mcp-server/) and [Okta MCP server guide](/docs/guides/mcp-server/main/).

#### Developer documentation updates in 2026.02.0

The Okta developer portal search results now include the API references.
