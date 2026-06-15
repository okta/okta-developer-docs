---
title: Okta MCP server overview
excerpt: Learn about Okta MCP server hosting models and find configuration paths for cloud-managed and local deployments.
layout: Guides
---

# Okta MCP server

The Okta Model Context Protocol (MCP) server connects your AI agents and Large Language Models (LLMs) to your Okta organization. This allows you to manage your Okta organization using natural language commands.

Before starting your deployment, choose the hosting option that matches your Workflow:

* **Okta-hosted (Cloud-based):** Best for a quick deployment without managing local software dependencies or runtime environments.

* **Self-hosted (Local infrastructure):** Best for developer testing and isolated sandboxes.

## Okta-hosted MCP server

With this hosting option, Okta hosts and manages the gateway in the cloud. Your chat client streams instructions over secure HTTPS, which removes local software installations and hosting fees.

This setup simplifies onboarding for nontechnical users, such as Okta Identity Governance (OIG) request approvers, who need a ready-made tool without local configuration. It also supports browser-based tools and lets you run clients and servers on separate containers for better flexibility.

To configure permissions and link your digital assistants, use the native controls inside the Admin Console. See Okta hosted MCP server documentation.

## Self-hosted MCP server

With this hosting option, you download and run the server utility directly on your own computer or private cloud network. Use this setup if you want full control over the underlying package environment or need to run isolated tests. See [self-hosted MCP server](/docs/guides/self-hosted-okta-mcp-server/) documentation.