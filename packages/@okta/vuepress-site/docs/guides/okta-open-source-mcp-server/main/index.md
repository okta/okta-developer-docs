---
title: Okta Open Source MCP Server overview
meta:
  - name: description
    content: Learn about the Okta Open Source MCP Server, how it compares to the Okta Managed MCP Server, and how to choose the right deployment option.
layout: Guides
---

The Model Context Protocol (MCP) connects AI agents and Large Language Models (LLMs) to your Okta org so you can manage it using natural language commands. Okta offers two ways to deploy an MCP server: the Okta Open Source MCP Server and the Okta Managed MCP Server.

## Okta Open Source MCP Server

The [Okta Open Source MCP Server](/docs/concepts/mcp-server/) is a self-hosted server that you download and run on your own computer or private cloud network. It's best for developers who want full control over the package environment or need to run isolated tests and sandboxes.

* **Hosting**: Self-hosted on local infrastructure that you manage.
* **Best for**: Developer testing, isolated sandboxes, and use cases that need full control over the runtime environment.
* **Get started**: See [Install and initialize the Okta Open Source MCP Server](/docs/guides/mcp-server/main/).

## Okta Managed MCP Server

The Okta Managed MCP Server is a cloud-hosted server where Okta hosts and manages the gateway on your behalf. Your chat client streams instructions over secure HTTPS, which removes the need for local software installation, hosting, and maintenance.

* **Hosting**: Cloud-hosted and managed by Okta.
* **Best for**: Deployment without managing local software dependencies, including nontechnical users, such as Okta Identity Governance (OIG) request approvers, who need a ready-made tool without local configuration. It also supports browser-based tools and lets you run clients and servers in separate containers for greater flexibility.
* **Get started**: See Okta Managed MCP Server documentation.

## Choose a deployment option

| | Okta Open Source MCP Server | Okta Managed MCP Server |
| --- | --- | --- |
| Hosting | Self-hosted (local infrastructure) | Cloud-hosted by Okta |
| Setup | Requires local installation and dependency management | No local installation required |
| Maintenance | You have to manage the updates and runtime environment | Okta manages updates and infrastructure |
| Best for | Developer testing and isolated sandboxes | Fast onboarding, nontechnical users, and browser-based tools |

## Next steps

* To deploy the self-hosted option, see [Install and initialize the Okta Open Source MCP Server](/docs/guides/mcp-server/main/).
* To deploy the cloud-hosted option, see Okta Managed MCP Server documentation.
