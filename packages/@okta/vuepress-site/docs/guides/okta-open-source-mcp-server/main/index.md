---
title: Okta Open Source MCP Server overview
meta:
  - name: description
    content: Learn about the Okta Open Source MCP Server, how it compares to the Okta Managed MCP Server, and how to choose the right deployment option.
layout: Guides
---

The Model Context Protocol (MCP) connects AI agents and Large Language Models (LLMs) to your Okta org so you can manage it using natural language commands. Okta offers two ways to deploy an MCP server: the Okta Open Source MCP Server and the Okta Managed MCP Server.

## Okta Open Source MCP Server

The [Okta Open Source MCP Server](/docs/concepts/mcp-server/) is a self-hosted server that you download and run on your own computer or private cloud network. It's best if you want full control over the package environment or need to run isolated tests and sandboxes.

## Okta Managed MCP Server

The Okta Managed MCP Server is a cloud-hosted server where Okta hosts and manages the server on your behalf. Your chat client streams instructions over secure HTTPS, which removes the need for local software installation, hosting, and maintenance.

## Choose a deployment option

The following table compares the two hosting options:

| Feature | Okta Open Source MCP Server | Okta Managed MCP Server |
| --- | --- | --- |
| Where it runs | Your infrastructure (a computer, a company container, or a private cloud). | Okta cloud infrastructure. |
| Setup and operation | Install Python packages, clone repositories, configure tooling, and manage infrastructure (OS patches, updates, dependency management). | No installation required. Connect through an HTTPS endpoint. Okta manages infrastructure, updates, scaling, and security patches. |
| Transport protocol | Uses STDIO. | Uses a secure internet connection (HTTPS). |
| User authentication | Device Authorization code flow (interactive users). | OpenID Connect (OIDC) with Proof Key for Code Exchange (PKCE) for interactive users. |
| Service-to-service authentication | JWT private key (API Services for autonomous agents). | JWT private key (API Services for autonomous agents). |
| Cost model | You manage infrastructure, licensing, and operational costs. | Okta managed cloud service. |
| Best for | Developers testing code in a sandbox or using a command-line interface. | Help Desk teams, IT admins, and automated workflows. |

## Next steps

* To deploy the self-hosted option, see [Install and initialize the Okta Open Source MCP Server](/docs/guides/mcp-server/main/).
* To deploy the cloud-hosted option, see Okta Managed MCP Server documentation.
