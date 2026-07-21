---
title: Okta Open Source MCP Server API release notes 2026
---

# Okta Open Source MCP Server API release notes (2026)

<a href="/rss/mcp.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

These release notes list customer-visible changes to the Okta Open Source MCP server.

## June

### Monthly release 2026.06.0
<!-- Published on: 2026-06-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Customization tools for Okta Open Source MCP server is GA in Production](#customization-tools-for-okta-open-source-mcp-server-is-ga-in-production)| June 3, 2026 |
| [Scope-based tool loading for Okta Open Source MCP server is GA in Production](#scope-based-tool-loading-for-okta-open-source-mcp-server-is-ga-in-production)| June 3, 2026 |
| [Device Assurance Policy tools for Okta Open Source MCP server is GA in Production](#device-assurance-policy-tools-for-okta-open-source-mcp-server-is-ga-in-production)| June 3, 2026 |

#### Customization tools for Okta Open Source MCP server is GA in Production

The Okta Open Source MCP server introduces customization tools for AI clients. These tools manage Okta brands, custom domains, sign-in pages, email templates, and themes using natural language. Admins can tailor the end-user identity experience without using the Okta Admin Console. See [Example commands](/docs/guides/start-mcp-server/main/#example-commands).<!-- OKTA-1114953 preview date: June 3, 2026 -->

#### Scope-based tool loading for Okta Open Source MCP server is GA in Production

The Okta Open Source MCP server features scope-based tool loading to enforce least privilege and reduce token usage. The server exposes tools to the AI client based strictly on OAuth scopes and authenticated user privileges. This contextual exposure prevents the LLM from receiving unauthorized or irrelevant capabilities. To learn more about scope-tool mapping and enabling this feature, see [Configure scope-based tool loading](/docs/guides/configure-mcp-authentication/main/#configure-scope-based-tool-loading).
 <!-- OKTA-1157805 preview date: June 3, 2026 -->

#### Device Assurance Policy tools for Okta Open Source MCP server is GA in Production

The Okta Open Source MCP server includes Device Assurance Policy tools for AI agents. These tools programmatically retrieve, configure, and evaluate device posture requirements using natural language. Admins can audit or update prerequisites like OS versions directly within agent-led workflows. See [Example commands](/docs/guides/start-mcp-server/main/#example-commands).
<!-- OKTA-1129472 preview date: June 3, 2026 -->

## March

### Monthly release 2026.03.0
<!-- Published on: 2026-03-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Human oversight for destructive actions](#human-oversight-for-destructive-actions) | March 4, 2026 |
| [Developer documentation update in 2026.03.0](#developer-documentation-update-in-2026-03-0) | March 4, 2026 |

#### Human oversight for destructive actions

The Okta Model Context Protocol (MCP) server now integrates the MCP Elicitation API to enforce human oversight on destructive actions. Critical operations, such as deleting apps or deactivating users, now require explicit confirmation before execution. Supported MCP clients display a chat UI dialog for users to accept or decline the request. For clients that don't support elicitation, the server returns a JSON payload for the LLM to handle confirmation. <!-- OKTA-1117761 preview date: March 4, 2026 -->

#### Developer documentation update in 2026.03.0

Okta's [API reference pages](https://developer.okta.com/docs/api/) are undergoing a migration, which started on February 24. While the look and feel may vary across pages during this time, all technical documentation remains accurate and up to date.

## February

### Monthly release 2026.02.0
<!-- Published on: 2026-02-09T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Okta Open Source MCP server is GA in Production](#okta-open-source-mcp-server-is-ga-in-production) | February 4, 2026 |
| [Developer documentation updates in 2026.02.0](#developer-documentation-updates-in-2026-02-0) | February 4, 2026 |

#### Okta Open Source MCP server is GA in Production

The Okta Model Context Protocol (MCP) server is a secure protocol abstraction layer that enables AI agents/Large Language Models (LLMs) to interact with the Okta org. The MCP clients can now communicate with Okta’s scoped management APIs in natural language. This simplifies building context-aware AI workflows while ensuring strict access control and least-privilege security. To learn more and start your implementation, see the [Okta Open Source MCP server concept](/docs/concepts/mcp-server/) and [Okta Open Source MCP server guide](/docs/guides/mcp-server/main/).

#### Developer documentation updates in 2026.02.0

The Okta developer portal search results now include the API references.
